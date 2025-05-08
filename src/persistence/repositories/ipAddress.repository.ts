import { IIPAddress } from "../../domain/ipAddress"
import { IPAddressQueryParams } from "../../application/services/ipAddress.service"

export interface IIPAddressRepository {
    getIPAddresses(ipAddressQueryParams?: IPAddressQueryParams): Promise<IIPAddress[]>
    getIPAddressById(id: number, ipAddressQueryParams?: IPAddressQueryParams): Promise<IIPAddress>
    getIPAddressByMachineId(machineId: number): Promise<IIPAddress>
    getIPAddressesByPoolId(poolId: number): Promise<IIPAddress[]>
    createIPAddress(ipAddress: IIPAddress): Promise<number>
    updateIPAddress(id: number, ipAddress: Partial<IIPAddress>): Promise<IIPAddress>
    deleteIPAddress(id: number): Promise<number>
}