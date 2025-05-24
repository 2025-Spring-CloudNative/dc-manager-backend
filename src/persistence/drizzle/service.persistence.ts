import { eq, ilike, desc, asc, and, SQL } from "drizzle-orm"
import { IService } from "../../domain/service"
import { IServiceRepository } from "../repositories/service.repository"
import { db } from "./index"
import { serviceTable } from "./schema/service.schema"
import { ServiceQueryParams } from "../../application/services/service.service"
import { ipAddressTable } from "./schema/ipAddress.schema"

function buildServiceQueryFilters(queryParams?: ServiceQueryParams): SQL[] {
    if (!queryParams) {
        return []
    }
    const filters: SQL[] = []
    if (queryParams.name) {
        filters.push(ilike(serviceTable.name, `%${queryParams.name}%`))
    }
    if (queryParams.poolId) {
        filters.push(eq(serviceTable.poolId, queryParams.poolId))
    }
    if (queryParams.machineIP) {
        filters.push(ilike(ipAddressTable.address, `%${queryParams.machineIP}%`))
    }
    return filters
}

function buildServiceQueryOrder(queryParams?: ServiceQueryParams): SQL[] {
    if (!queryParams || !queryParams.sortBy) {
        return []
    }
    const column = queryParams.sortBy === 'name' ? serviceTable.name : serviceTable.id
    const orderFn = queryParams.sortOrder === 'desc' ? desc : asc
    return [orderFn(column)]
}

export class ServiceDrizzleRepository implements IServiceRepository {
    async getServices(serviceQueryParams?: ServiceQueryParams) {
        const filters = buildServiceQueryFilters(serviceQueryParams)
        const order = buildServiceQueryOrder(serviceQueryParams)

        if (serviceQueryParams?.machineIP) {
            const services = await db
                .select()
                .from(serviceTable)
                .innerJoin(ipAddressTable, eq(ipAddressTable.poolId, serviceTable.poolId))
                .where(filters.length ? and(...filters) : undefined)
                .orderBy(...order)
            return services.map((service) => service.service)
        }

        const services = await db
            .select()
            .from(serviceTable)
            .where(filters.length ? and(...filters) : undefined)
            .orderBy(...order)

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