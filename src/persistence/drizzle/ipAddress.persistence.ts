import { IIPAddress } from "../../domain/ipAddress"
import { IIPAddressRepository } from "../repositories/ipAddress.repository"
import { db } from "./index"
import { ipAddressTable } from "./schema/ipAddress.schema"

export class IPAddressDrizzleRepository implements IIPAddressRepository {
    async getIPAddresses() {
        const ipAddresses = await db.select().from(ipAddressTable)
        return ipAddresses
    }

    async getIPAddressById(id: number) {
        // TODO
    }

    async createIPAddress(ipAddress: IIPAddress) {
        const createdIPAddress = await db
            .insert(ipAddressTable)
            .values(ipAddress)
            .returning({ id: ipAddressTable.id })
        return createdIPAddress[0]?.id as number
    }

    async updateIPAddress(id: number, ipAddress: any) {
        // TODO
    }

    async deleteIPAddress(id: number) {
        // TODO
    }
}