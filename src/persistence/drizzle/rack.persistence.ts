import { eq } from "drizzle-orm"
import { IRack } from "../../domain/rack"
import { IRackRepository } from "../repositories/rack.repository"
import { db } from "./index"
import { rackTable } from "./schema/rack.schema"

export class RackDrizzleRepository implements IRackRepository {
    async getRacks() {
        const racks = await db
            .select()
            .from(rackTable)

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