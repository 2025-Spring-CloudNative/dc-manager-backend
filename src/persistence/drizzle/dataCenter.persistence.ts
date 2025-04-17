import { eq } from "drizzle-orm"
import { IDataCenter } from "../../domain/dataCenter"
import { IDataCenterRepository } from "../repositories/dataCenter.repository"
import { db } from "./index"
import { dataCenterTable } from "./schema/dataCenter.schema"

export class DataCenterDrizzleRepository implements IDataCenterRepository {
    async getDataCenters() {
        const dataCenters = await db
            .select()
            .from(dataCenterTable)

        return dataCenters
    }

    async getDataCenterById(id: number) {
        const [dataCenter] = await db
            .select()
            .from(dataCenterTable)
            .where(eq(dataCenterTable.id, id))
    
        return dataCenter as IDataCenter
    }

    async createDataCenter(dataCenter: IDataCenter) {
        const [createdDataCenters] = await db
            .insert(dataCenterTable)
            .values(dataCenter)
            .returning({ id: dataCenterTable.id })

        return createdDataCenters?.id as number
    }

    async updateDataCenter(id: number, dataCenter: Partial<IDataCenter>) {
        const [updatedDataCenter] = await db
            .update(dataCenterTable)
            .set(dataCenter)
            .where(eq(dataCenterTable.id, id))
            .returning()
        
        return updatedDataCenter as IDataCenter
    }

    async deleteDataCenter(id: number) {
        const [deletedDataCenter] = await db
            .delete(dataCenterTable)
            .where(eq(dataCenterTable.id, id))
            .returning({ id: dataCenterTable.id })
        
        return deletedDataCenter?.id as number
    }
}
