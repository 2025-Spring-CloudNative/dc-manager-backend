export interface IDataCenter {
    id?: number
    name: string
    location: string
    subnetId?: number | null
}

export class DataCenterEntity implements IDataCenter {
    id?: number
    name: string
    location: string
    subnetId?: number | null

    constructor(dataCenter: IDataCenter) {
        this.id = dataCenter.id
        this.name = dataCenter.name
        this.location = dataCenter.location
        this.subnetId = dataCenter.subnetId
    }
}
