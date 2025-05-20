import { IMachine, MachineStatus } from "../../domain/machine"
import { IIPAddressRepository } from "../../persistence/repositories/ipAddress.repository"
import { IMachineRepository } from "../../persistence/repositories/machine.repository"
import { IRackRepository } from "../../persistence/repositories/rack.repository"
import { IServiceRepository } from "../../persistence/repositories/service.repository"
import { SortOrder } from "../../types/common"

export type MachineSortBy = 
    'name' | 'unit' | 'macAddress' | 'status' | 'createdAt'

export interface MachineQueryParams {
    name?: string
    status?: MachineStatus
    macAddress?: string
    sortBy?: MachineSortBy
    sortOrder?: SortOrder
}

export async function getMachines(
    machineRepo: IMachineRepository,
    machineQueryParams: MachineQueryParams
) {
    const machines = await machineRepo.getMachines(machineQueryParams)

    return machines
}

export async function getMachinesWithIPAddress(machineRepo: IMachineRepository) {
    const machinesWithIPAddress = await machineRepo.getMachinesWithIPAddress()

    return machinesWithIPAddress
}

export async function getMachineById(
    machineRepo: IMachineRepository,
    id: number
) {
    const machine = await machineRepo.getMachineById(id)

    return machine
}

export async function getMachinesByIdWithIPAddress(
    machineRepo: IMachineRepository,
    id: number
) {
    const machineWithIPAddress = await machineRepo.getMachineByIdWithIPAddress(id)
    
    return machineWithIPAddress
}

export async function createMachine(
    machineRepo: IMachineRepository,
    ipAddressRepo: IIPAddressRepository,
    rackRepo: IRackRepository,
    serviceRepo: IServiceRepository,
    machine: IMachine
) {
    const rack = await rackRepo.getRackById(machine.rackId)    
    const service = await serviceRepo.getServiceById(rack.serviceId as number)
    const ipAddresses = await ipAddressRepo.getIPAddressesByPoolId(service.poolId as number)

    const createdMachineId = await machineRepo.createMachine(machine)

    for (const ipAddress of ipAddresses) {
        // The ip address is created but not allocated or the ip address is released
        if (ipAddress.id && (!ipAddress.allocatedAt || ipAddress.releasedAt)) {
            await ipAddressRepo.updateIPAddress(ipAddress.id, {
                machineId: createdMachineId, 
                allocatedAt: new Date(),
                releasedAt: null
            })
            break
        }
    }
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
    ipAddressRepo: IIPAddressRepository,
    id: number
) {
    const ipAddress = await ipAddressRepo.getIPAddressByMachineId(id)
    if (ipAddress.id) {
        await ipAddressRepo.updateIPAddress(ipAddress.id, {
            releasedAt: new Date()
        })
    }
    const deletedMachineId = await machineRepo.deleteMachine(id)
    
    return deletedMachineId
}