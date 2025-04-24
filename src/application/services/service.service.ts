import { IService, ServiceEntity } from "../../domain/service"
import { IRack } from "../../domain/rack"
import { IServiceRepository } from "../../persistence/repositories/service.repository"
import { IRackRepository } from "../../persistence/repositories/rack.repository"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"
import { IIPAddressRepository } from "../../persistence/repositories/ipAddress.repository"
import { IRoomRepository } from "../../persistence/repositories/room.repository"
import { IDataCenterRepository } from "../../persistence/repositories/dataCenter.repository"

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
    ipPoolRepo: IIPPoolRepository,
    ipAddressRepo: IIPAddressRepository,
    roomRepo: IRoomRepository,
    dataCenterRepo: IDataCenterRepository,
    service: IService,
    racks: IRack[]
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
        throw new Error("Unable to retrieve the subnet of the datacenter")
    }
    // getNextAvailableCIDR
    
    const createdIPPoolId = await ipPoolRepo.createIPPool({
        name: `Service-${createdServiceId}-ippool`,
        type: 'static',
        cidr: '',
        subnetId: subnetId
    })
    // const createdIPPoolId = await ipPoolRepo.createIPPool()

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