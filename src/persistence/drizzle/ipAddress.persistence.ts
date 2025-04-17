import { eq } from "drizzle-orm"
import { IIPAddress } from "../../domain/ipAddress"
import { IIPAddressRepository } from "../repositories/ipAddress.repository"
import { db } from "./index"
import { ipAddressTable } from "./schema/ipAddress.schema"

export class IPAddressDrizzleRepository implements IIPAddressRepository {
    async getIPAddresses() {
        const ipAddresses = await db
            .select()
            .from(ipAddressTable)
        
            return ipAddresses
    }

    async getIPAddressById(id: number) {
        const [ipAddress] = await db
            .select()
            .from(ipAddressTable)
            .where(eq(ipAddressTable.id, id))

        return ipAddress as IIPAddress
    }

    async createIPAddress(ipAddress: IIPAddress) {
        const [createdIPAddress] = await db
            .insert(ipAddressTable)
            .values(ipAddress)
            .returning({ id: ipAddressTable.id })

        return createdIPAddress?.id as number
    }

    async updateIPAddress(id: number, ipAddress: Partial<IIPAddress>) {
        const [updatedIPAddress] = await db
            .update(ipAddressTable)
            .set(ipAddress)
            .where(eq(ipAddressTable.id, id))
            .returning()

        return updatedIPAddress as IIPAddress
    }

    async deleteIPAddress(id: number) {
        const [deletedIPAddress] = await db
            .delete(ipAddressTable)
            .where(eq(ipAddressTable.id, id))
            .returning({ id: ipAddressTable.id })
        
        return deletedIPAddress?.id as number
    }
}