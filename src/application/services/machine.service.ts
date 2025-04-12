import { IMachine } from "../../domain/machine"
import { IMachineRepository } from "../../persistence/repositories/machine.repository"

export async function getMachines(machineRepo: IMachineRepository) {
    const machines = await machineRepo.getMachines()

    return machines
}

export async function createMachine(
    machineRepo: IMachineRepository,
    machine: IMachine
) {
    const createdMachineId = await machineRepo.createMachine(machine)
    
    return createdMachineId
}