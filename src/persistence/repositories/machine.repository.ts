import { IMachine } from "../../domain/machine"

export interface IMachineRepository {
    getMachines(): Promise<IMachine[]>
    getMachineById(id: number): Promise<IMachine>
    createMachine(machine: IMachine): Promise<number>
    updateMachine(id: number, machine: Partial<IMachine>): Promise<IMachine>
    deleteMachine(id: number): Promise<number>
}