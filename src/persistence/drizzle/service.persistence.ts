import { IService } from "../../domain/service"
import { IServiceRepository } from "../repositories/service.repository"
import { db } from "./index"
import { serviceTable } from "./schema/service.schema"

export class ServiceDrizzleRepository implements IServiceRepository {
    async getServices() {
        const services = await db.select().from(serviceTable)

        return services
    }

    async getServiceById(id: number) {
        // TODO
    }

    async createService(service: IService) {
        const createdService = await db
            .insert(serviceTable)
            .values(service)
            .returning({ id: serviceTable.id })

        return createdService[0]?.id as number
    }

    async updateService(id: number, service: any) {
        // TODO
    }

    async deleteService(id: number) {
        // TODO
    }
}