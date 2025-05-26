import { eq, ne, ilike, desc, asc, and, SQL } from "drizzle-orm"
import { PgColumn } from "drizzle-orm/pg-core"
import { ISubnet } from "../../domain/subnet"
import { ISubnetRepository } from "../repositories/subnet.repository"
import { db } from "./index"
import { subnetTable } from "./schema/subnet.schema"
import { SubnetQueryParams } from "../../application/services/subnet.service"

function buildSubnetQueryFilters(queryParams?: SubnetQueryParams): SQL[] {
    if (!queryParams) {
        return []
    }
    const filters: SQL[] = []
    if (queryParams.cidr) {
        filters.push(ilike(subnetTable.cidr, `%${queryParams.cidr}%`))
    }
    if (queryParams.gateway) {
        filters.push(ilike(subnetTable.gateway, `%${queryParams.gateway}%`))
    }
    if (queryParams.netmask) {
        filters.push(ilike(subnetTable.netmask, `%${queryParams.netmask}%`))
    }
    return filters
}

function buildSubnetQueryOrder(queryParams?: SubnetQueryParams): SQL[] {
    if (!queryParams || !queryParams.sortBy) {
        return []
    }
    let column: PgColumn
    switch(queryParams.sortBy) {
        case 'cidr':
            column = subnetTable.cidr
            break
        case 'createdAt':
            column = subnetTable.createdAt
            break
        case 'updatedAt':
            column = subnetTable.updatedAt
            break
        default:
            column = subnetTable.id
            break
    }
    const orderFn = queryParams.sortOrder === 'desc' ? desc : asc
    return [orderFn(column)]
}

export class SubnetDrizzleRepository implements ISubnetRepository {
    async getSubnets(subnetQueryParams?: SubnetQueryParams) {
        const filters = buildSubnetQueryFilters(subnetQueryParams)
        const order = buildSubnetQueryOrder(subnetQueryParams)

        const subnets = await db
            .select()
            .from(subnetTable)
            .where(filters.length ? and(...filters) : undefined)
            .orderBy(...order)

        return subnets
    }

    async getOtherSubnetCIDRs(id: number) {
        const subnetCidrs = await db
            .select({ cidr: subnetTable.cidr })
            .from(subnetTable)
            .where(ne(subnetTable.id, id))

        return subnetCidrs.map(subnet => subnet.cidr)
    }

    async getSubnetById(id: number) {
        const [subnet] = await db
            .select()
            .from(subnetTable)
            .where(eq(subnetTable.id, id))
        
        return subnet as ISubnet
    }

    async createSubnet(subnet: ISubnet) {
        const [createdSubnet] = await db
            .insert(subnetTable)
            .values(subnet)
            .returning({ id: subnetTable.id })

        return createdSubnet?.id as number
    }

    async updateSubnet(id: number, subnet: Partial<ISubnet>) {
        const [updatedSubnet] = await db
            .update(subnetTable)
            .set(subnet)
            .where(eq(subnetTable.id, id))
            .returning()
        
        return updatedSubnet as ISubnet
    }
    
    async deleteSubnet(id: number) {
        const [deletedSubnet] = await db
            .delete(subnetTable)
            .where(eq(subnetTable.id, id))
            .returning({ id: subnetTable.id })

        return deletedSubnet?.id as number
    }
}