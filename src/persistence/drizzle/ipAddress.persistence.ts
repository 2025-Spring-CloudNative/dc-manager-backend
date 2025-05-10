import { eq, ilike, desc, asc, and, SQL } from "drizzle-orm"
import { PgColumn } from "drizzle-orm/pg-core"
import { IIPAddress } from "../../domain/ipAddress"
import { IIPAddressRepository } from "../repositories/ipAddress.repository"
import { db } from "./index"
import { ipAddressTable } from "./schema/ipAddress.schema"
import { IPAddressQueryParams } from "../../application/services/ipAddress.service"

function buildIPAddressQueryFilters(queryParams?: IPAddressQueryParams): SQL[] {
    if (!queryParams) {
        return []
    }
    const filters: SQL[] = []
    if (queryParams.address) {
        filters.push(ilike(ipAddressTable.address, `%${queryParams.address}%`))
    }
    if (queryParams.status) {
        filters.push(ilike(ipAddressTable.status, `%${queryParams.status}%`))
    }
    return filters
}

function buildIPAddressQueryOrder(queryParams?: IPAddressQueryParams): SQL[] {
    if (!queryParams || !queryParams.sortBy) {
        return []
    }
    let column: PgColumn
    switch(queryParams.sortBy) {
        case 'address':
            column = ipAddressTable.address
            break
        case 'status':
            column = ipAddressTable.status
            break
        case 'createdAt':
            column = ipAddressTable.createdAt
            break
        case 'updatedAt':
            column = ipAddressTable.updatedAt
            break
        case 'allocatedAt':
            column = ipAddressTable.allocatedAt
            break
        case 'releasedAt':
            column = ipAddressTable.releasedAt
            break
        default:
            column = ipAddressTable.id
            break
    }
    const orderFn = queryParams.sortOrder === 'desc' ? desc : asc
    return [orderFn(column)]
}

export class IPAddressDrizzleRepository implements IIPAddressRepository {
    async getIPAddresses(ipAddressQueryParams?: IPAddressQueryParams) {
        const filters = buildIPAddressQueryFilters(ipAddressQueryParams)
        const order = buildIPAddressQueryOrder(ipAddressQueryParams)

        const ipAddresses = await db
            .select()
            .from(ipAddressTable)
            .where(filters.length ? and(...filters) : undefined)
            .orderBy(...order)

        return ipAddresses
    }

    async getIPAddressById(id: number) {
        const [ipAddress] = await db
            .select()
            .from(ipAddressTable)
            .where(eq(ipAddressTable.id, id))
            
        return ipAddress as IIPAddress
    }

    async getIPAddressByMachineId(machineId: number) {
        const [ipAddress] = await db
            .select()
            .from(ipAddressTable)
            .where(eq(ipAddressTable.machineId, machineId))

        return ipAddress as IIPAddress
    }

    async getIPAddressesByPoolId(poolId: number) {
        const ipAddresses = await db
            .select()
            .from(ipAddressTable)
            .where(eq(ipAddressTable.poolId, poolId))

        return ipAddresses
    }

    async createIPAddress(ipAddress: IIPAddress) {
        const [createdIPAddress] = await db
            .insert(ipAddressTable)
            .values(ipAddress)
            .returning({ id: ipAddressTable.id })

        return createdIPAddress?.id as number
    }

    async updateIPAddress(id: number, ipAddress: Partial<IIPAddress>) {
        const [updatedIPAddress] = await db
            .update(ipAddressTable)
            .set(ipAddress)
            .where(eq(ipAddressTable.id, id))
            .returning()

        return updatedIPAddress as IIPAddress
    }

    async deleteIPAddress(id: number) {
        const [deletedIPAddress] = await db
            .delete(ipAddressTable)
            .where(eq(ipAddressTable.id, id))
            .returning({ id: ipAddressTable.id })
        
        return deletedIPAddress?.id as number
    }
}