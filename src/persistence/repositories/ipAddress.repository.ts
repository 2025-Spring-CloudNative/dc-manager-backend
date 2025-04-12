import { IIPAddress } from "../../domain/ipAddress"

// TODO
export interface IIPAddressRepository {
    getIPAddresses(): Promise<IIPAddress[]>
    // getIPAddressById(id: number): Promise<IIPAddress>
    createIPAddress(ipAddress: IIPAddress): Promise<number>
    // updateIPAddress(id: number, ipAddress: IIPAddress): Promise<IIPAddress>
    // deleteIPAddress(id: number): Promise<number>
}