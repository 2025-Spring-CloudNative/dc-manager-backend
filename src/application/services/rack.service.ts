import { IRack, RackEntity } from "../../domain/rack"
import { IRackRepository } from "../../persistence/repositories/rack.repository"
import { SortOrder } from "../../types/common"

export type RackSortBy = 
    'name' | 'tag' | 'height' | 'createdAt' | 'updatedAt'

export interface RackQueryParams {
    name?: string
    tag?: string
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
    rackQueryParams: RackQueryParams,
    id: number
) {
    const rack = await rackRepo.getRackById(id, rackQueryParams)

    return rack
}

export async function createRack(
    rackRepo: IRackRepository,
    rack: IRack
) {
    const rackEntity = new RackEntity(rack)
    const createdRackId = await rackRepo.createRack(rackEntity)

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