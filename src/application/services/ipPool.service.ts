import { IIPPool, IPPoolEntity } from "../../domain/ipPool"
import { IIPAddressRepository } from "../../persistence/repositories/ipAddress.repository"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"
import { SortOrder } from "../../types/common"
import { NetUtils } from "../../domain/utils/net"
import { IPAddressStatus, IPAddressEntity } from "../../domain/ipAddress"

export type IPPoolSortBy = 
    'name' | 'type' | 'cidr' | 'createdAt' | 'updatedAt'

export interface IPPoolQueryParams {
    name?: string
    type?: string
    cidr?: string
    subnetId?: number
    sortBy?: IPPoolSortBy
    sortOrder?: SortOrder
}

export async function getIPPools(
    ipPoolRepo: IIPPoolRepository,
    ipPoolQueryParams: IPPoolQueryParams
) {
    const ipPools = await ipPoolRepo.getIPPools(ipPoolQueryParams)
    
    return ipPools
}

export async function getIPPoolById(
    ipPoolRepo: IIPPoolRepository,
    id: number
) {
    const ipPool = await ipPoolRepo.getIPPoolById(id)

    return ipPool
}

export async function getIPPoolUtilization(
    ipAddressRepo: IIPAddressRepository,
    id: number
) {
    const ipAddresses = await ipAddressRepo.getIPAddresses({
        poolId: id
    })
    if (!ipAddresses.length) {
        return 0;
    }

    const allocatedIPs = ipAddresses.filter(
        (ip) => ip.allocatedAt && !ip.releasedAt
    ).length
    
    const utilization = allocatedIPs / ipAddresses.length
    return parseFloat(utilization.toFixed(3))
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

    const restrictedFields: (keyof IIPPool)[] = [
        'id', 'createdAt', 'updatedAt', 'cidr'
    ]
    for (const field of restrictedFields) {
        if (ipPool[field] && ipPool[field] !== prevIPPoolEntity[field]) {
            throw new Error(`Cannot update restricted field: ${field}`)
        }
    }

    const updatedIPPool = await ipPoolRepo.updateIPPool(id, ipPool)
    
    return updatedIPPool
}

export async function extendIPPool(
    ipPoolRepo: IIPPoolRepository,
    subnetRepo: ISubnetRepository,
    ipAddressRepo: IIPAddressRepository,
    id: number,
    newCidr: string
) {
    const ipPool = await ipPoolRepo.getIPPoolById(id)
    const subnetId = ipPool.subnetId
    const subnet = await subnetRepo.getSubnetById(subnetId)
    const subnetCidr = subnet.cidr
    
    const ipPoolCidrs = await ipPoolRepo.getOtherIPPoolCIDRs(id, subnetId)

    const patch = IPPoolEntity.extend(ipPool.cidr, newCidr, subnetCidr, ipPoolCidrs)
    const extendedIPPool = await ipPoolRepo.updateIPPool(id, patch)

    const ipAddresses: string[] = NetUtils.getIpAddressesFromCIDR(newCidr)
    const existingIPAddresses = await ipAddressRepo.getIPAddresses({
        poolId: ipPool.id
    })

    for (const ipAddress of ipAddresses) {
        const exists = existingIPAddresses.some(existing => existing.address === ipAddress)
        if (!exists) {
            const ipAddressEntity = new IPAddressEntity({
                address: ipAddress,
                status: IPAddressStatus.Created,
                poolId: ipPool.id!
            })
            await ipAddressRepo.createIPAddress(ipAddressEntity)
        }
    }

    return extendedIPPool
}

export async function deleteIPPool(
    ipPoolRepo: IIPPoolRepository,
    id: number
) {
    const deletedIPPoolId = await ipPoolRepo.deleteIPPool(id)

    return deletedIPPoolId
}