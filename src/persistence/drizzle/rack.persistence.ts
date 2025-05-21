import { eq, ilike, desc, asc, and, SQL } from "drizzle-orm"
import { PgColumn } from "drizzle-orm/pg-core"
import { IRack } from "../../domain/rack"
import { IRackRepository } from "../repositories/rack.repository"
import { db } from "./index"
import { rackTable } from "./schema/rack.schema"
import { RackQueryParams } from "../../application/services/rack.service"

function buildRackQueryFilters(queryParams?: RackQueryParams): SQL[] {
    if (!queryParams) {
        return []
    }
    const filters: SQL[] = []
    if (queryParams.name) {
        filters.push(ilike(rackTable.name, `%${queryParams.name}%`))
    }
    if (queryParams.tag) {
        filters.push(ilike(rackTable.tag, `%${queryParams.tag}%`))
    }
    if (queryParams.roomId) {
        filters.push(eq(rackTable.roomId, queryParams.roomId))
    }
    return filters
}

function buildRackQueryOrder(queryParams?: RackQueryParams): SQL[] {
    if (!queryParams || !queryParams.sortBy) {
        return []
    }
    let column: PgColumn
    switch (queryParams.sortBy) {
        case 'name':
            column = rackTable.name
            break
        case 'tag':
            column = rackTable.tag
            break
        case 'height':
            column = rackTable.height
            break
        case 'createdAt':
            column = rackTable.createdAt
            break    
        case 'updatedAt':
            column = rackTable.updatedAt
            break
        default:
            column = rackTable.id
            break        
    }
    const orderFn = queryParams.sortOrder === 'desc' ? desc : asc
    return [orderFn(column)]
}

export class RackDrizzleRepository implements IRackRepository {
    async getRacks(rackQueryParams?: RackQueryParams) {
        const filters = buildRackQueryFilters(rackQueryParams)
        const order = buildRackQueryOrder(rackQueryParams)

        const racks = await db
            .select()
            .from(rackTable)
            .where(filters.length ? and(...filters) : undefined)
            .orderBy(...order)

        return racks
    }

    async getRackById(id: number) {
        const [rack] = await db
            .select()
            .from(rackTable)
            .where(eq(rackTable.id, id))
        
        return rack as IRack
    }

    async getRacksByServiceId(serviceId: number) {
        const racks = await db
            .select()
            .from(rackTable)
            .where(eq(rackTable.serviceId, serviceId))
        
        return racks
    }

    async createRack(rack: IRack) {
        const [createdRack] = await db
            .insert(rackTable)
            .values(rack)
            .returning({ id: rackTable.id })

        return createdRack?.id as number
    }

    async updateRack(id: number, rack: Partial<IRack>) {
        const [updatedRack] = await db
            .update(rackTable)
            .set(rack)
            .where(eq(rackTable.id, id))
            .returning()

        return updatedRack as IRack
    }
    
    async deleteRack(id: number) {
        const [deletedRack] = await db
            .delete(rackTable)
            .where(eq(rackTable.id, id))
            .returning({ id: rackTable.id })
        
        return deletedRack?.id as number
    }
}