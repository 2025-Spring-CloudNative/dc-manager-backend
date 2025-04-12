import { IIPAddress } from "../../domain/ipAddress"
import { IIPAddressRepository } from "../../persistence/repositories/ipAddress.repository"

export async function getIPAddresses(ipAddressRepo: IIPAddressRepository) {
    const ipAddresses = await ipAddressRepo.getIPAddresses()

    return ipAddresses
}

export async function createIPAddress(
    ipAddressRepo: IIPAddressRepository,
    ipAddress: IIPAddress
) {
    const createdIPAddressId = await ipAddressRepo.createIPAddress(ipAddress)
    
    return createdIPAddressId
}