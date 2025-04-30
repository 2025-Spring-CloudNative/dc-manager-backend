import { IIPPool, IPPoolEntity } from "../../domain/ipPool"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"
import { NetUtils } from "../../domain/utils/net"

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
    const prevIPPool = await ipPoolRepo.getIPPoolById(id)
    const prevIPPoolEntity = new IPPoolEntity(prevIPPool)
    if (ipPool.cidr && (ipPool.cidr !== prevIPPoolEntity.cidr)) {
        throw new Error("Cannot extend IPPool using the updateIPPool api.")
    }

    const updatedIPPool = await ipPoolRepo.updateIPPool(id, ipPool)
    
    return updatedIPPool
}

export async function extendIPPool(
    ipPoolRepo: IIPPoolRepository,
    subnetRepo: ISubnetRepository,
    id: number,
    newCidr: string
) {
    const ipPool = await ipPoolRepo.getIPPoolById(id)
    const subnetId = ipPool.subnetId
    const subnet = await subnetRepo.getSubnetById(subnetId)
    const subnetCidr = subnet.cidr
    
    const ipPoolCidrs = await ipPoolRepo.getOtherIPPoolCIDRs(id)

    const patch = IPPoolEntity.extend(newCidr, subnetCidr, ipPoolCidrs)
    let extendedIPPool = await ipPoolRepo.updateIPPool(id, patch)

    return extendedIPPool
}

export async function deleteIPPool(
    ipPoolRepo: IIPPoolRepository,
    id: number
) {
    const deletedIPPoolId = await ipPoolRepo.deleteIPPool(id)

    return deletedIPPoolId
}