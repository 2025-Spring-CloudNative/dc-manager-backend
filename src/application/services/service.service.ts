import { IService, ServiceEntity } from "../../domain/service"
import { IDataCenter } from "../../domain/dataCenter"
import { IPPoolEntity } from "../../domain/ipPool"
import { IServiceRepository } from "../../persistence/repositories/service.repository"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"
import { IIPAddressRepository } from "../../persistence/repositories/ipAddress.repository"
import { NetUtils } from "../../domain/utils/net"
import { IPAddressEntity, IPAddressStatus } from "../../domain/ipAddress"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"
import { IRackRepository } from "../../persistence/repositories/rack.repository"
import { SortOrder } from "../../types/common"
import { IMachineRepository } from "../../persistence/repositories/machine.repository"
import { MachineStatus } from "../../domain/machine"

export type ServiceSortBy = 'name' | 'faultRate'

export interface ServiceQueryParams {
    name?: string
    poolId?: number
    machineIP?: string
    sortBy?: ServiceSortBy
    sortOrder?: SortOrder
}

export async function getServices(
    serviceRepo: IServiceRepository,
    serviceQueryParams: ServiceQueryParams
) {
    const services = await serviceRepo.getServices(serviceQueryParams)

    return services
}


export async function getServiceById(
    serviceRepo: IServiceRepository,
    id: number
) {
    const service = await serviceRepo.getServiceById(id)

    return service
}

export async function getServiceRackUtilization(
    rackRepo: IRackRepository,
    machineRepo: IMachineRepository,
    id: number
) {
    const racks = await rackRepo.getRacksByServiceId(id)

    let totalRackUnits = 0, occupiedRackUnits = 0
    for (const rack of racks) {
        const machines = await machineRepo.getMachines({
            rackId: rack.id!
        })
        const totalMachineUnits = machines.reduce(
            (total, machine) => total + machine.unit, 0
        )
        occupiedRackUnits += totalMachineUnits
        totalRackUnits += rack.height
    }
    
    const utilization = occupiedRackUnits / totalRackUnits
    return parseFloat(utilization.toFixed(3))
}

export async function getServiceFaultRateById(
    rackRepo: IRackRepository,
    machineRepo: IMachineRepository,
    id: number
) {
    const racks = await rackRepo.getRacksByServiceId(id)

    let totalMachines = 0, totalMalfunctionMachines = 0
    for (const rack of racks) {
        const machines = await machineRepo.getMachines({
            rackId: rack.id
        })
        const malfunctionMachines = machines.filter(
            (machine) => machine.status === MachineStatus.Malfunction
        )
        totalMalfunctionMachines += malfunctionMachines.length
        totalMachines += machines.length
    }

    const faultRate = totalMalfunctionMachines / totalMachines
    return parseFloat(faultRate.toFixed(3))
}

export async function getServicesFaultRateSorted(
    serviceRepo: IServiceRepository,
    rackRepo: IRackRepository,
    machineRepo: IMachineRepository,
    serviceQueryParams: ServiceQueryParams
) {
    const services = await serviceRepo.getServices()
    const servicesFaultRate = []

    for (const service of services) {
        const racks = await rackRepo.getRacksByServiceId(service.id!)

        let totalMachines = 0, totalMalfunctionMachines = 0
        for (const rack of racks) {
            const machines = await machineRepo.getMachines({
                rackId: rack.id!
            })
            const malfunctionMachines = machines.filter(
                (machine) => machine.status === MachineStatus.Malfunction
            )
            totalMalfunctionMachines += malfunctionMachines.length
            totalMachines += machines.length
        }
        const faultRate = totalMalfunctionMachines / totalMachines

        servicesFaultRate.push({
            service,
            faultRate: parseFloat(faultRate.toFixed(3))
        })
    }

    if (serviceQueryParams.sortOrder === 'desc') {
        servicesFaultRate.sort((a, b) => b.faultRate - a.faultRate)
    } else if (serviceQueryParams.sortOrder === 'asc') {
        servicesFaultRate.sort((a, b) => a.faultRate - b.faultRate)
    }
    return servicesFaultRate
}

export async function createService(
    serviceRepo: IServiceRepository,
    ipAddressRepo: IIPAddressRepository,
    ipPoolRepo: IIPPoolRepository,
    subnetRepo: ISubnetRepository,
    service: IService,
    dataCenter: IDataCenter,
    cidrFromUser: string
) {
    const subnetId = dataCenter.subnetId
    if (!subnetId) {
        throw new Error("Unable to retrieve the subnet of the datacenter.")
    }    

    const subnet = await subnetRepo.getSubnetById(subnetId)
    if (!NetUtils.isCIDRWithinSubnet(cidrFromUser, subnet.cidr)) {
        throw new Error(`The cidr ${cidrFromUser} is not in the subnet range.`)
    }

    const existingIPPoolCIDRs = await ipPoolRepo.getAllIPPoolCIDRs(subnetId)
    if (NetUtils.checkCIDROverlap(cidrFromUser, existingIPPoolCIDRs)) {
        throw new Error(`The cidr ${cidrFromUser} overlaps with other ip-pools.`)
    }   

    const serviceEntity = new ServiceEntity(service)
    const createdServiceId = await serviceRepo.createService(serviceEntity)

    const ipPoolEntity = new IPPoolEntity({
        name: `Service-${createdServiceId}-ippool`,
        type: 'static', // or dynamic
        cidr: cidrFromUser,
        subnetId: subnetId
    })
    
    const createdIPPoolId = await ipPoolRepo.createIPPool(ipPoolEntity)

    await serviceRepo.updateService(createdServiceId, {
        poolId: createdIPPoolId
    })

    const ipAddresses: string[] = NetUtils.getIpAddressesFromCIDR(cidrFromUser)
    for (const ipAddr of ipAddresses) {
        const ipAddressEntity = new IPAddressEntity({
            address: ipAddr,
            status: IPAddressStatus.Created,
            poolId: createdIPPoolId
        })
        await ipAddressRepo.createIPAddress(ipAddressEntity)
    }
    return createdServiceId
}

export async function updateService(
    serviceRepo: IServiceRepository,
    id: number,
    service: Partial<IService>
) {
    const prevService = await serviceRepo.getServiceById(id)
    const prevServiceEntity = new ServiceEntity(prevService)

    const restrictedField: (keyof IService) = 'id'
    if (service[restrictedField] && service[restrictedField] !== prevServiceEntity[restrictedField]) {
        throw new Error(`Cannot update restricted field: ${restrictedField}`)
    }
    const updatedService = await serviceRepo.updateService(id, service)

    return updatedService
}

export async function deleteService(
    serviceRepo: IServiceRepository,
    rackRepo: IRackRepository,
    ipPoolRepo: IIPPoolRepository,
    id: number
) {
    const poolId = (await serviceRepo.getServiceById(id)).poolId
    const deletedServiceId = await serviceRepo.deleteService(id)

    const racks = await rackRepo.getRacksByServiceId(deletedServiceId)
    for (const rack of racks) {
        await rackRepo.updateRack(rack.id!, {
            serviceId: null,
        })
    }

    await ipPoolRepo.deleteIPPool(poolId!)

    return deletedServiceId
}