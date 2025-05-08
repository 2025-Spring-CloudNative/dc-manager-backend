import { IService } from "../../domain/service"
import { ServiceQueryParams } from "../../application/services/service.service"

export interface IServiceRepository {
    getServices(serviceQueryParams?: ServiceQueryParams): Promise<IService[]>
    getServiceById(id: number, serviceQueryParams?: ServiceQueryParams): Promise<IService>
    createService(service: IService): Promise<number>
    updateService(id: number, service: Partial<IService>): Promise<IService>
    deleteService(id: number): Promise<number>
}