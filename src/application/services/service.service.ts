import { IService, ServiceEntity } from "../../domain/service"
import { IRack } from "../../domain/rack"
import { IPPoolEntity } from "../../domain/ipPool"
import { IServiceRepository } from "../../persistence/repositories/service.repository"
import { IRackRepository } from "../../persistence/repositories/rack.repository"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"
import { IIPAddressRepository } from "../../persistence/repositories/ipAddress.repository"
import { IRoomRepository } from "../../persistence/repositories/room.repository"
import { IDataCenterRepository } from "../../persistence/repositories/dataCenter.repository"
import { NetUtils } from "../../domain/utils/net"
import { IPAddressEntity } from "../../domain/ipAddress"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"

export async function getServices(serviceRepo: IServiceRepository) {
    const services = await serviceRepo.getServices()

    return services
}

export async function getServiceById(
    serviceRepo: IServiceRepository,
    id: number
) {
    const service = await serviceRepo.getServiceById(id)

    return service
}

export async function createService(
    serviceRepo: IServiceRepository,
    rackRepo: IRackRepository,
    roomRepo: IRoomRepository,
    dataCenterRepo: IDataCenterRepository,
    ipAddressRepo: IIPAddressRepository,
    ipPoolRepo: IIPPoolRepository,
    subnetRepo: ISubnetRepository,
    service: IService,
    racks: IRack[],
    cidrFromUser: string
) {
    const serviceEntity = new ServiceEntity(service)
    const createdServiceId = await serviceRepo.createService(serviceEntity)
    // update serviceId of rack
    for (const rack of racks) {
        if (rack.id) {
            await rackRepo.updateRack(rack.id, {
                ...rack,
                serviceId: createdServiceId,
            });
        }
    }

    const firstRack = racks[0] as IRack
    const room = await roomRepo.getRoomById(firstRack.roomId)
    const dataCenter = await dataCenterRepo.getDataCenterById(room.dataCenterId)
    const subnetId = dataCenter.subnetId
    if (!subnetId) {
        throw new Error("Unable to retrieve the subnet of the datacenter.")
    }    

    const subnet = await subnetRepo.getSubnetById(subnetId)
    if (!NetUtils.isCIDRWithinSubnet(cidrFromUser, subnet.cidr)) {
        throw new Error(`The cidr ${cidrFromUser} is not in the subnet range.`)
    }

    const existingIPPoolCIDRs = await ipPoolRepo.getIPPoolCIDRs()
        if (!NetUtils.checkCIDROverlap(cidrFromUser, existingIPPoolCIDRs)) {
        throw new Error(`The cidr ${cidrFromUser} overlaps with other ip-pools.`)
    }   

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
            status: 'created',
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
    id: number
) {
    const deletedServiceId = await serviceRepo.deleteService(id)

    return deletedServiceId
}