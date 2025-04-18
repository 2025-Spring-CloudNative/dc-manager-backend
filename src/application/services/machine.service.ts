import { IMachine } from "../../domain/machine"
import { IMachineRepository } from "../../persistence/repositories/machine.repository"

export async function getMachines(machineRepo: IMachineRepository) {
    const machines = await machineRepo.getMachines()

    return machines
}

export async function getMachineById(
    machineRepo: IMachineRepository,
    id: number
) {
    const machine = await machineRepo.getMachineById(id)

    return machine
}

export async function createMachine(
    machineRepo: IMachineRepository,
    machine: IMachine
) {
    const createdMachineId = await machineRepo.createMachine(machine)
    
    return createdMachineId
}

export async function updateMachine(
    machineRepo: IMachineRepository,
    id: number,
    machine: Partial<IMachine>
) {
    const updatedMachine = await machineRepo.updateMachine(id, machine)

    return updatedMachine
}

export async function deleteMachine(
    machineRepo: IMachineRepository,
    id: number
) {
    const deletedMachineId = await machineRepo.deleteMachine(id)

    return deletedMachineId
}