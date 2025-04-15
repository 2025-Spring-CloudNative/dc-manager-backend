import { IIPPool } from "../../domain/ipPool"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"

export async function getIPPools(ipPoolRepo: IIPPoolRepository) {
    const ipPools = await ipPoolRepo.getIPPools()
    return ipPools
}

export async function createIPPool(
    ipPoolRepo: IIPPoolRepository,
    ipPool: IIPPool
) {
    const createdIPPoolId = await ipPoolRepo.createIPPool(ipPool)
    
    return createdIPPoolId
}