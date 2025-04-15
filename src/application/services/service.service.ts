import { IService } from "../../domain/service"
import { IServiceRepository } from "../../persistence/repositories/service.repository"

export async function getServices(serviceRepo: IServiceRepository) {
    const services = await serviceRepo.getServices()

    return services
}

export async function createService(
    serviceRepo: IServiceRepository,
    service: IService
) {
    const createdServiceId = await serviceRepo.createService(service)

    return createdServiceId
}