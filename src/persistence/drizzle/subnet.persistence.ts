import { ISubnet } from "../../domain/subnet"
import { ISubnetRepository } from "../repositories/subnet.repository"
import { db } from "./index"
import { subnetTable } from "./schema/subnet.schema"

export class SubnetDrizzleRepository implements ISubnetRepository {
    async getSubnets() {
        const subnets = await db.select().from(subnetTable)
        return subnets
    }

    async getSubnetById(id: number) {
        // TODO
    }

    async createSubnet(subnet: ISubnet) {
        const createdSubnet = await db
            .insert(subnetTable)
            .values(subnet)
            .returning({ id: subnetTable.id })
        return createdSubnet[0]?.id as number
    }

    async updateSubnet(id: number, rack: any) {
        // TODO
    }
    
    async deleteSubnet(id: number) {
        // TODO
    }
}