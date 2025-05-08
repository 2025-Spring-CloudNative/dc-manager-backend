import { IMachine } from "../../domain/machine"
import { MachineQueryParams } from "../../application/services/machine.service"

export interface IMachineRepository {
    getMachines(machineQueryParams?: MachineQueryParams): Promise<IMachine[]>
    getMachinesWithIPAddress(): Promise<Object[]>
    getMachineById(id: number, machineQueryParams?: MachineQueryParams): Promise<IMachine>
    getMachineByIdWithIPAddress(id: number): Promise<Object>
    createMachine(machine: IMachine): Promise<number>
    updateMachine(id: number, machine: Partial<IMachine>): Promise<IMachine>
    deleteMachine(id: number): Promise<number>
}