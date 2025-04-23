export interface IDataCenter {
    id?: number
    name: string
    location: string
    subnetId?: number
}

export class DataCenterEntity implements IDataCenter {
    id?: number
    name: string
    location: string
    subnetId?: number

    constructor(dataCenter: IDataCenter) {
        this.id = dataCenter.id
        this.name = dataCenter.name
        this.location = dataCenter.location
        this.subnetId = dataCenter.subnetId
    }
}
