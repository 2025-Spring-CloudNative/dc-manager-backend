import { eq, ilike, asc, desc, and, SQL } from "drizzle-orm"
import { IDataCenter } from "../../domain/dataCenter"
import { IDataCenterRepository } from "../repositories/dataCenter.repository"
import { db } from "./index"
import { dataCenterTable } from "./schema/dataCenter.schema"
import { DataCenterQueryParams } from "../../application/services/dataCenter.service"

function buildDataCenterQueryFilters(queryParams?: DataCenterQueryParams): SQL[] {
    if (!queryParams) {
        return []
    }
    const filters: SQL[] = []
    if (queryParams.name) {
        filters.push(ilike(dataCenterTable.name, `%${queryParams.name}%`))
    }
    if (queryParams.location) {
        filters.push(ilike(dataCenterTable.location, `%${queryParams.location}%`))
    }
    return filters;
}

function buildDataCenterQueryOrder(queryParams?: DataCenterQueryParams): SQL[] {
    if (!queryParams || !queryParams.sortBy) {
        return []
    }
    const column = queryParams.sortBy === 'name' ? dataCenterTable.name
        : queryParams.sortBy === 'location' ? dataCenterTable.location
        : dataCenterTable.id
    const orderFn = queryParams.sortOrder === 'desc' ? desc : asc
    return [orderFn(column)]
}

export class DataCenterDrizzleRepository implements IDataCenterRepository {
    async getDataCenters(dataCenterQueryParams?: DataCenterQueryParams) {       
        const filters = buildDataCenterQueryFilters(dataCenterQueryParams)
        const order = buildDataCenterQueryOrder(dataCenterQueryParams)
        
        const dataCenters = await db
            .select()
            .from(dataCenterTable)
            .where(filters.length ? and(...filters) : undefined)    
            .orderBy(...order)
        
        return dataCenters
    }

    async getDataCentersWithSubnet() {
        const dataCentersWithSubnet = await db.query.dataCenterTable.findMany({
            with: {
                subnet: true
            }
        })
        return dataCentersWithSubnet
    }

    async getDataCenterById(id: number, dataCenterQueryParams?: DataCenterQueryParams) {
        const filters = buildDataCenterQueryFilters(dataCenterQueryParams)
        const order = buildDataCenterQueryOrder(dataCenterQueryParams)

        const [dataCenter] = await db
            .select()
            .from(dataCenterTable)
            .where(filters.length ? and(...filters, eq(dataCenterTable.id, id)) : eq(dataCenterTable.id, id))
            .orderBy(...order)

        return dataCenter as IDataCenter
    }

    async getDataCenterByIdWithSubnet(id: number) {
        const dataCenterWithSubnet = await db.query.dataCenterTable.findFirst({
            with: {
              subnet: true,
            },
            where: eq(dataCenterTable.id, id)
        })
        
        return dataCenterWithSubnet as Object
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
