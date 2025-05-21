import { IRack, RackEntity } from "../../domain/rack"
import { IMachineRepository } from "../../persistence/repositories/machine.repository"
import { IRackRepository } from "../../persistence/repositories/rack.repository"
import { IRoomRepository } from "../../persistence/repositories/room.repository"
import { SortOrder } from "../../types/common"

export type RackSortBy = 
    'name' | 'tag' | 'height' | 'createdAt' | 'updatedAt'

export interface RackQueryParams {
    name?: string
    tag?: string
    roomId?: number
    sortBy?: RackSortBy
    sortOrder?: SortOrder
}

export async function getRacks(
    rackRepo: IRackRepository,
    rackQueryParams: RackQueryParams
) {
    const racks = await rackRepo.getRacks(rackQueryParams)
    
    return racks
}

export async function getRackById(
    rackRepo: IRackRepository,
    id: number
) {
    const rack = await rackRepo.getRackById(id)

    return rack
}

export async function createRack(
    rackRepo: IRackRepository,
    roomRepo: IRoomRepository,
    rack: IRack
) {
    const rackEntity = new RackEntity(rack)
    const room = await roomRepo.getRoomById(rackEntity.roomId)
    if (rackEntity.height > room.unit) {
        throw new Error("The rack height exceeds the room unit")
    }
    const createdRackId = await rackRepo.createRack(rackEntity)

    return createdRackId
}

export async function updateRack(
    rackRepo: IRackRepository,
    machineRepo: IMachineRepository,
    roomRepo: IRoomRepository,
    id: number,
    rack: Partial<IRack>
) {
    const prevRack = await rackRepo.getRackById(id)
    if (rack.height && prevRack.height !== rack.height) {
        const machines = await machineRepo.getMachines({
            rackId: id
        })
        for (const machine of machines) {
            if (machine.startUnit + machine.unit > rack.height) {
                throw new Error("The updated height of rack is smaller than the machine height.")
            }
        }
        const room = await roomRepo.getRoomById(prevRack.roomId);
        if (rack.height > room.unit) {
            throw new Error("The updated rack height exceeds the room unit.")
        }
    }
    const updatedRack = await rackRepo.updateRack(id, rack)

    return updatedRack
}

export async function deleteRack(
    rackRepo: IRackRepository,
    id: number
) {
    const deletedRackId = await rackRepo.deleteRack(id)

    return deletedRackId
}