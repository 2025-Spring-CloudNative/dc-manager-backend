export interface IDataCenter {
    id?: number
    name: string
    location: string
}

export class DataCenterEntity implements IDataCenter {
    id?: number
    name: string
    location: string

    constructor(dataCenter: IDataCenter) {
        this.id = dataCenter.id
        this.name = dataCenter.name
        this.location = dataCenter.location
    }
}
