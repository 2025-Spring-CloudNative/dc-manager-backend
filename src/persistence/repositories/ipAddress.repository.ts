import { IIPAddress } from "../../domain/ipAddress"

export interface IIPAddressRepository {
    getIPAddresses(): Promise<IIPAddress[]>
    getIPAddressById(id: number): Promise<IIPAddress>
    getIPAddressByMachineId(machineId: number): Promise<IIPAddress>
    createIPAddress(ipAddress: IIPAddress): Promise<number>
    updateIPAddress(id: number, ipAddress: Partial<IIPAddress>): Promise<IIPAddress>
    deleteIPAddress(id: number): Promise<number>
}