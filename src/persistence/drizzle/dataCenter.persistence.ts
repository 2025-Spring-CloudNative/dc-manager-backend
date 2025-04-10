import { IDataCenter } from "../../domain/dataCenter"
import { IDataCenterRepository } from "../repositories/dataCenter.repository"
import { db } from "./index"
import { dataCenterTable } from "./schema/dataCenter.schema"

export class DataCenterDrizzleRepository implements IDataCenterRepository {
    async getDataCenters() {
        const dataCenters = await db.select().from(dataCenterTable)

        return dataCenters
    }

    async getDataCenterById(id: number) {
        // TODO
    }

    async createDataCenter(dataCenter: IDataCenter) {
        const createdDataCenters = await db
            .insert(dataCenterTable)
            .values(dataCenter)
            .returning({ id: dataCenterTable.id })

        return createdDataCenters[0]?.id as number
    }

    async updateDataCenter(id: number, dataCenter: any) {
        // TODO
    }

    async deleteDataCenter(id: number) {
        // TODO
    }
}
