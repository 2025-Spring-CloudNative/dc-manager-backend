import { IIPAddress, IPAddressStatus } from "../../domain/ipAddress"
import { IIPAddressRepository } from "../../persistence/repositories/ipAddress.repository"
import { SortOrder } from "../../types/common"

export type IPAddressSortBy = 
    'address' | 'status' | 'createdAt' | 'updatedAt' | 'allocatedAt' | 'releasedAt'

export interface IPAddressQueryParams {
    address?: string,
    status?: IPAddressStatus,
    sortBy?: IPAddressSortBy,
    sortOrder?: SortOrder
}

export async function getIPAddresses(
    ipAddressRepo: IIPAddressRepository,
    ipAddressQueryParams: IPAddressQueryParams
) {
    const ipAddresses = await ipAddressRepo.getIPAddresses(ipAddressQueryParams)

    return ipAddresses
}

export async function getIPAddressById(
    ipAddressRepo: IIPAddressRepository,
    id: number
) {
    const ipAddress = await ipAddressRepo.getIPAddressById(id)

    return ipAddress
}

export async function createIPAddress(
    ipAddressRepo: IIPAddressRepository,
    ipAddress: IIPAddress
) {
    const createdIPAddressId = await ipAddressRepo.createIPAddress(ipAddress)
    
    return createdIPAddressId
}

export async function updateIPAddress(
    ipAddressRepo: IIPAddressRepository,
    id: number,
    ipAddress: Partial<IIPAddress>
) {
    const updatedIPAddress = await ipAddressRepo.updateIPAddress(id, ipAddress)

    return updatedIPAddress
}

export async function deleteIPAddress(
    ipAddressRepo: IIPAddressRepository,
    id: number
) {
    const deletedIPAddressId = await ipAddressRepo.deleteIPAddress(id)

    return deletedIPAddressId
}