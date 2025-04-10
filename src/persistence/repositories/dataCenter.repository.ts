import { IDataCenter } from "../../domain/dataCenter"

// TODO
export interface IDataCenterRepository {
    getDataCenters(): Promise<IDataCenter[]>
    // getDataCenterById(id: number): Promise<IDataCenter>
    createDataCenter(dataCenter: IDataCenter): Promise<number>
    // updateDataCenter(id: number, dataCenter: IDataCenter): Promise<IDataCenter>
    // deleteDataCenter(id: number): Promise<number>
}
