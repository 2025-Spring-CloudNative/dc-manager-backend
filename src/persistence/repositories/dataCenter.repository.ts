import { IDataCenter } from "../../domain/dataCenter"

export interface IDataCenterRepository {
    getDataCenters(): Promise<IDataCenter[]>
    getDataCentersWithSubnet(): Promise<Object[]>
    getDataCenterById(id: number): Promise<IDataCenter>
    getDataCenterByIdWithSubnet(id: number): Promise<Object>
    createDataCenter(dataCenter: IDataCenter): Promise<number>
    updateDataCenter(id: number, dataCenter: Partial<IDataCenter>): Promise<IDataCenter>
    deleteDataCenter(id: number): Promise<number>
}
