import { IIPPool } from "../../domain/ipPool"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"

export async function getIPPools(ipPoolRepo: IIPPoolRepository) {
    const ipPools = await ipPoolRepo.getIPPools()
    
    return ipPools
}

export async function getIPPoolById(
    ipPoolRepo: IIPPoolRepository,
    id: number
) {
    const ipPool = await ipPoolRepo.getIPPoolById(id)

    return ipPool
}

export async function createIPPool(
    ipPoolRepo: IIPPoolRepository,
    ipPool: IIPPool
) {
    const createdIPPoolId = await ipPoolRepo.createIPPool(ipPool)
    
    return createdIPPoolId
}

export async function updateIPPool(
    ipPoolRepo: IIPPoolRepository,
    id: number,
    ipPool: Partial<IIPPool>
) {
    const updatedIPPool = await ipPoolRepo.updateIPPool(id, ipPool)

    return updatedIPPool
}

export async function deleteIPPool(
    ipPoolRepo: IIPPoolRepository,
    id: number
) {
    const deletedIPPoolId = await ipPoolRepo.deleteIPPool(id)

    return deletedIPPoolId
}