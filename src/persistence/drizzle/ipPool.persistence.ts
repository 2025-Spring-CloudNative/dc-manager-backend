import { eq, ne } from "drizzle-orm"
import { IIPPool } from "../../domain/ipPool"
import { IIPPoolRepository } from "../repositories/ipPool.repository"
import { db } from "./index"
import { ipPoolTable } from "./schema/ipPool.schema"

export class IPPoolDrizzleRepository implements IIPPoolRepository {
    async getIPPools() {
        const ipPools = await db
            .select()
            .from(ipPoolTable)
        
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