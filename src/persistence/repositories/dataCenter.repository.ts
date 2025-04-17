import { IDataCenter } from "../../domain/dataCenter"

export interface IDataCenterRepository {
    getDataCenters(): Promise<IDataCenter[]>
    getDataCenterById(id: number): Promise<IDataCenter>
    createDataCenter(dataCenter: IDataCenter): Promise<number>
    updateDataCenter(id: number, dataCenter: Partial<IDataCenter>): Promise<IDataCenter>
    deleteDataCenter(id: number): Promise<number>
}
