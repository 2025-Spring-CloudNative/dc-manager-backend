import { ISubnet, SubnetEntity } from "../../domain/subnet"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"
import { SortOrder } from "../../types/common"
import { NetUtils } from "../../domain/utils/net"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"
import { IIPAddressRepository } from "../../persistence/repositories/ipAddress.repository"

export type SubnetSortBy = 'cidr' | 'createdAt' | 'updatedAt'

export interface SubnetQueryParams {
    cidr?: string
    netmask?: string
    gateway?: string
    sortBy?: SubnetSortBy
    sortOrder?: SortOrder
}

export async function getSubnets(
    subnetRepo: ISubnetRepository,
    subnetQueryParams: SubnetQueryParams
) {
    const subnets = await subnetRepo.getSubnets(subnetQueryParams)

    return subnets
}

export async function getSubnetById(
    subnetRepo: ISubnetRepository,
    id: number
) {
    const subnet = await subnetRepo.getSubnetById(id)

    return subnet
}

export async function getSubnetIPUtilization(
    subnetRepo: ISubnetRepository,
    ipPoolRepo: IIPPoolRepository,
    ipAddressRepo: IIPAddressRepository,
    id: number
) {
    const subnet = await subnetRepo.getSubnetById(id)
    const allIPAddresses: string[] = NetUtils.getIpAddressesFromCIDR(subnet.cidr)
    const ipPools = await ipPoolRepo.getIPPools({
        subnetId: id
    })
    let allocatedIPs = 0
    for (const ipPool of ipPools) {
        const ipAddresses = await ipAddressRepo.getIPAddresses({
            poolId: ipPool.id
        })
        allocatedIPs += ipAddresses.filter(
            (ip) => ip.allocatedAt && !ip.releasedAt
        ).length
    }
    const utilization = allocatedIPs / allIPAddresses.length
    return parseFloat(utilization.toFixed(3))
}

export async function createSubnet(
    subnetRepo: ISubnetRepository,
    subnet: ISubnet
) {
    const subnetEntity = new SubnetEntity(subnet)
    const createdSubnetId = await subnetRepo.createSubnet(subnetEntity)

    return createdSubnetId
}

export async function updateSubnet(
    subnetRepo: ISubnetRepository,
    id: number,
    subnet: Partial<ISubnet>
) {
    const prevSubnet = await subnetRepo.getSubnetById(id)
    const prevSubnetEntity = new SubnetEntity(prevSubnet)

    const restrictedFields: (keyof ISubnet)[] = [
        'id', 'createdAt', 'updatedAt', 'cidr', 'netmask'
    ]

    for (const field of restrictedFields) {
        if (subnet[field] && subnet[field] !== prevSubnetEntity[field]) {
            throw new Error(`Cannot update restricted field: ${field}`)
        }
    }

    if (subnet.gateway && subnet.gateway !== prevSubnet.gateway) {
        if (!NetUtils.isIPInsideCIDR(subnet.gateway, prevSubnetEntity.cidr)) {
            throw new Error(`Cannot update gateway to ${subnet.gateway} since it is not the subnet's cidr.`)
        }
    }

    const updatedSubnet = await subnetRepo.updateSubnet(id, subnet)

    return updatedSubnet
}

export async function extendSubnet(
    subnetRepo: ISubnetRepository,
    id: number,
    newCidr: string,
    newNetmask: string,
    newGateway: string
) {    
    const patch = await SubnetEntity.extend(newCidr, newNetmask, newGateway)
    const extendedSubnet = await subnetRepo.updateSubnet(id, patch)
    
    return extendedSubnet
}

export async function deleteSubnet(subnetRepo: ISubnetRepository, id: number) {
    const deletedSubnetId = await subnetRepo.deleteSubnet(id)

    return deletedSubnetId
}
