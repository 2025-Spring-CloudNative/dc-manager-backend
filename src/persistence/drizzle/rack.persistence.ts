import { IRack } from "../../domain/rack"
import { IRackRepository } from "../repositories/rack.repository"
import { db } from "./index"
import { rackTable } from "./schema/rack.schema"

export class RackDrizzleRepository implements IRackRepository {
    async getRacks() {
        const racks = await db.select().from(rackTable)
        return racks
    }

    async getRackById(id: number) {
        // TODO
    }

    async createRack(rack: IRack) {
        const createdRack = await db
            .insert(rackTable)
            .values(rack)
            .returning({ id: rackTable.id })
        return createdRack[0]?.id as number
    }

    async updateRack(id: number, rack: any) {
        // TODO
    }
    
    async deleteRack(id: number) {
        // TODO
    }
}