import { eq } from "drizzle-orm"
import { IService } from "../../domain/service"
import { IServiceRepository } from "../repositories/service.repository"
import { db } from "./index"
import { serviceTable } from "./schema/service.schema"

export class ServiceDrizzleRepository implements IServiceRepository {
    async getServices() {
        const services = await db
            .select()
            .from(serviceTable)

        return services
    }

    async getServiceById(id: number) {
        const [service] = await db
            .select()
            .from(serviceTable)
            .where(eq(serviceTable.id, id))
        
        return service as IService
    }

    async createService(service: IService) {
        const [createdService] = await db
            .insert(serviceTable)
            .values(service)
            .returning({ id: serviceTable.id })

        return createdService?.id as number
    }

    async updateService(id: number, service: Partial<IService>) {
        const [updatedService] = await db
            .update(serviceTable)
            .set(service)
            .where(eq(serviceTable.id, id))
            .returning()
        
        return updatedService as IService
    }

    async deleteService(id: number) {
        const [deletedService] = await db
            .delete(serviceTable)
            .where(eq(serviceTable.id, id))
            .returning({ id: serviceTable.id })
        
        return deletedService?.id as number
    }
}