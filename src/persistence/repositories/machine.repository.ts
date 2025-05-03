import { IMachine } from "../../domain/machine"

export interface IMachineRepository {
    getMachines(): Promise<IMachine[]>
    getMachinesWithIPAddress(): Promise<Object[]>
    getMachineById(id: number): Promise<IMachine>
    getMachineByIdWithIPAddress(id: number): Promise<Object>
    createMachine(machine: IMachine): Promise<number>
    updateMachine(id: number, machine: Partial<IMachine>): Promise<IMachine>
    deleteMachine(id: number): Promise<number>
}