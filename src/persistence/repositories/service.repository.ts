import { IService } from "../../domain/service"

// TODO
export interface IServiceRepository {
    getServices(): Promise<IService[]>
    // getServiceById(id: number): Promise<IService>
    createService(service: IService): Promise<number>
    // updateService(id: number, service: IService): Promise<IService>
    // deleteService(id: number): Promise<number>
}