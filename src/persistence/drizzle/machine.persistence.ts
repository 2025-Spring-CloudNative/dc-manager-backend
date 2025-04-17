import { eq } from "drizzle-orm"
import { IMachine } from "../../domain/machine"
import { IMachineRepository } from "../repositories/machine.repository"
import { db } from "./index"
import { machineTable } from "./schema/machine.schema"

export class MachineDrizzleRepository implements IMachineRepository {
    async getMachines() {
        const machines = await db
            .select()
            .from(machineTable)

        return machines
    }

    async getMachineById(id: number) {
        const [machine] = await db
            .select()
            .from(machineTable)
            .where(eq(machineTable.id, id))
        
        return machine as IMachine
    }

    async createMachine(machine: IMachine) {
        const [createdMachine] = await db
            .insert(machineTable)
            .values(machine)
            .returning({ id: machineTable.id })

        return createdMachine?.id as number
    }

    async updateMachine(id: number, machine: Partial<IMachine>) {
        const [updatedMachine] = await db
            .update(machineTable)
            .set(machine)
            .where(eq(machineTable.id, id))
            .returning()
        
        return updatedMachine as IMachine
    }

    async deleteMachine(id: number) {
        const [deletedMachine] = await db
            .delete(machineTable)
            .where(eq(machineTable.id, id))
            .returning({ id: machineTable.id })
        
        return deletedMachine?.id as number
    }
}
