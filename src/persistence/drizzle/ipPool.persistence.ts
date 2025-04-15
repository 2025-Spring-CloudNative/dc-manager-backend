import { IIPPool } from "../../domain/ipPool"
import { IIPPoolRepository } from "../repositories/ipPool.repository"
import { db } from "./index"
import { ipPoolTable } from "./schema/ipPool.schema"

export class IPPoolDrizzleRepository implements IIPPoolRepository {
    async getIPPools() {
        const ipPools = await db.select().from(ipPoolTable)
        return ipPools
    }

    async getIPPoolById(id: number) {
        // TODO
    }

    async createIPPool(ipPool: IIPPool) {
        const createdIPPool = await db
            .insert(ipPoolTable)
            .values(ipPool)
            .returning({ id: ipPoolTable.id })
        return createdIPPool[0]?.id as number
    }

    async updateIPPool(id: number, ipPool: any) {
        // TODO
    }

    async deleteIPPool(id: number) {
        // TODO
    }
}