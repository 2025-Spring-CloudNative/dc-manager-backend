import { IService } from "../../domain/service"
import { IServiceRepository } from "../../persistence/repositories/service.repository"

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
    service: IService
) {
    const createdServiceId = await serviceRepo.createService(service)

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