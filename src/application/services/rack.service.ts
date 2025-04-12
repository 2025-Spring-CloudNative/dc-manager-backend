import { IRack } from "../../domain/rack"
import { IRackRepository } from "../../persistence/repositories/rack.repository"

export async function getRacks(rackRepo: IRackRepository) {
    const racks = await rackRepo.getRacks()
    
    return racks
}

export async function createRack(
    rackRepo: IRackRepository,
    rack: IRack
) {
    const createdRackId = await rackRepo.createRack(rack)

    return createdRackId
}