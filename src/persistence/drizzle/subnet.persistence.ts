import { eq } from "drizzle-orm"
import { ISubnet } from "../../domain/subnet"
import { ISubnetRepository } from "../repositories/subnet.repository"
import { db } from "./index"
import { subnetTable } from "./schema/subnet.schema"

export class SubnetDrizzleRepository implements ISubnetRepository {
    async getSubnets() {
        const subnets = await db
            .select()
            .from(subnetTable)
        
        return subnets
    }

    async getSubnetById(id: number) {
        const [subnet] = await db
            .select()
            .from(subnetTable)
            .where(eq(subnetTable.id, id))
        
        return subnet as ISubnet
    }

    async getSubnetIdByCidr(cidr: string) {
        const [subnet] = await db
            .select()
            .from(subnetTable)
            .where(eq(subnetTable.cidr, cidr))
            
        return subnet?.id as number
    }

    async createSubnet(subnet: ISubnet) {
        const [createdSubnet] = await db
            .insert(subnetTable)
            .values(subnet)
            .returning({ id: subnetTable.id })

        return createdSubnet?.id as number
    }

    async updateSubnet(id: number, subnet: Partial<ISubnet>) {
        const [updatedSubnet] = await db
            .update(subnetTable)
            .set(subnet)
            .where(eq(subnetTable.id, id))
            .returning()
        
        return updatedSubnet as ISubnet
    }
    
    async deleteSubnet(id: number) {
        const [deletedSubnet] = await db
            .delete(subnetTable)
            .where(eq(subnetTable.id, id))
            .returning({ id: subnetTable.id })

        return deletedSubnet?.id as number
    }
}