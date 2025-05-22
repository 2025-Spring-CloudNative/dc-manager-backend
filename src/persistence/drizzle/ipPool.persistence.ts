import { eq, ne, ilike, desc, asc, and, SQL } from "drizzle-orm"
import { PgColumn } from "drizzle-orm/pg-core"
import { IIPPool } from "../../domain/ipPool"
import { IIPPoolRepository } from "../repositories/ipPool.repository"
import { db } from "./index"
import { ipPoolTable } from "./schema/ipPool.schema"
import { IPPoolQueryParams } from "../../application/services/ipPool.service"

function buildIPPoolQueryFilters(queryParams?: IPPoolQueryParams): SQL[] {
    if (!queryParams) {
        return []
    }
    const filters: SQL[] = []
    if (queryParams.name) {
        filters.push(ilike(ipPoolTable.name, `%${queryParams.name}%`))
    }
    if (queryParams.type) {
        filters.push(ilike(ipPoolTable.type, `%${queryParams.type}%`))
    }
    if (queryParams.cidr) {
        filters.push(ilike(ipPoolTable.cidr, `%${queryParams.cidr}%`))
    }
    if (queryParams.subnetId) {
        filters.push(eq(ipPoolTable.subnetId, queryParams.subnetId))
    }
    return filters
}

function buildIPPoolQueryOrder(queryParams?: IPPoolQueryParams): SQL[] {
    if (!queryParams || !queryParams.sortBy) {
        return []
    }
    let column: PgColumn
    switch(queryParams.sortBy) {
        case 'name':
            column = ipPoolTable.name
            break
        case 'type':
            column = ipPoolTable.type
            break
        case 'cidr':
            column = ipPoolTable.cidr
            break
        case 'createdAt':
            column = ipPoolTable.createdAt
            break
        case 'updatedAt':
            column = ipPoolTable.updatedAt
            break
        default:
            column = ipPoolTable.id
            break
    }
    const orderFn = queryParams.sortOrder === 'desc' ? desc : asc
    return [orderFn(column)]
}

export class IPPoolDrizzleRepository implements IIPPoolRepository {
    async getIPPools(ipPoolQueryParams?: IPPoolQueryParams) {
        const filters = buildIPPoolQueryFilters(ipPoolQueryParams)
        const order = buildIPPoolQueryOrder(ipPoolQueryParams)

        const ipPools = await db
            .select()
            .from(ipPoolTable)
            .where(filters.length ? and(...filters) : undefined)
            .orderBy(...order)

        return ipPools
    }

    async getAllIPPoolCIDRs() {
        const ipPoolCidrs = await db
            .select({ cidr: ipPoolTable.cidr })
            .from(ipPoolTable)
        
        return ipPoolCidrs.map(pool => pool.cidr)
    }

    async getOtherIPPoolCIDRs(id: number) {
        const ipPoolCidrs = await db
            .select({ cidr: ipPoolTable.cidr })
            .from(ipPoolTable)
            .where(ne(ipPoolTable.id, id))

        return ipPoolCidrs.map(pool => pool.cidr)
    }

    async getIPPoolById(id: number) {
        const [ipPool] = await db
            .select()
            .from(ipPoolTable)
            .where(eq(ipPoolTable.id, id))
        
        return ipPool as IIPPool
    }

    async createIPPool(ipPool: IIPPool) {
        const [createdIPPool] = await db
            .insert(ipPoolTable)
            .values(ipPool)
            .returning({ id: ipPoolTable.id })

        return createdIPPool?.id as number
    }

    async updateIPPool(id: number, ipPool: Partial<IIPPool>) {
        const [updatedIPPool] = await db
            .update(ipPoolTable)
            .set(ipPool)
            .where(eq(ipPoolTable.id, id))
            .returning()
        
        return updatedIPPool as IIPPool
    }

    async deleteIPPool(id: number) {
        const [deletedIPPool] = await db
            .delete(ipPoolTable)
            .where(eq(ipPoolTable.id, id))
            .returning({ id: ipPoolTable.id })
        
        return deletedIPPool?.id as number
    }
}