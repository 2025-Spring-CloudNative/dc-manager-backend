import { IDataCenter } from "../../domain/dataCenter"
import { DataCenterQueryParams } from "../../application/services/dataCenter.service"

export interface IDataCenterRepository {
    getDataCenters(queryParams?: DataCenterQueryParams): Promise<IDataCenter[]>
    getDataCentersWithSubnet(): Promise<any[]>
    getDataCenterById(id: number): Promise<IDataCenter>
    getDataCenterByIdWithSubnet(id: number): Promise<any>
    createDataCenter(dataCenter: IDataCenter): Promise<number>
    updateDataCenter(id: number, dataCenter: Partial<IDataCenter>): Promise<IDataCenter>
    deleteDataCenter(id: number): Promise<number>
}
