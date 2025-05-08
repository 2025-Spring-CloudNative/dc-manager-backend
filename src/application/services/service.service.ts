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

export type ServiceSortBy = 'name'

export interface ServiceQueryParams {
    name?: string
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
    serviceQueryParams: ServiceQueryParams,
    id: number
) {
    const service = await serviceRepo.getServiceById(id, serviceQueryParams)

    return service
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

    const existingIPPoolCIDRs = await ipPoolRepo.getAllIPPoolCIDRs()
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
        await rackRepo.updateRack(rack.id as number, {
            serviceId: null,
        })
    }

    await ipPoolRepo.deleteIPPool(poolId as number)

    return deletedServiceId
}