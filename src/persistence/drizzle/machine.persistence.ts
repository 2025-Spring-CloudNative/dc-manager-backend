import { IMachine } from "../../domain/machine"
import { IMachineRepository } from "../repositories/machine.repository"
import { db } from "./index"
import { machineTable } from "./schema/machine.schema"

export class MachineDrizzleRepository implements IMachineRepository {
    async getMachines() {
        const machines = await db.select().from(machineTable)
        return machines
    }

    async getMachineById(id: number) {
        // TODO
    }

    async createMachine(machine: IMachine) {
        const createdMachine = await db
            .insert(machineTable)
            .values(machine)
            .returning({ id: machineTable.id })
        return createdMachine[0]?.id as number
    }

    async updateMachine(id: number, machine: any) {
        // TODO
    }

    async deleteMachine(id: number) {
        // TODO
    }
}
