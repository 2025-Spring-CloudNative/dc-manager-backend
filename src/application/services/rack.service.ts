import { IRack } from "../../domain/rack"
import { IRackRepository } from "../../persistence/repositories/rack.repository"

export async function getRacks(rackRepo: IRackRepository) {
    const racks = await rackRepo.getRacks()
    
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
    rack: IRack
) {
    const createdRackId = await rackRepo.createRack(rack)

    return createdRackId
}

export async function updateRack(
    rackRepo: IRackRepository,
    id: number,
    rack: Partial<IRack>
) {
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