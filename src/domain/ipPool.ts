export interface IIPPool {
    id?: number
    name: string
    type: string
    cidr: string
    subnetId: number
    createdAt?: Date
    updatedAt?: Date | null
}

export class IPPoolEntity implements IIPPool {
    id?: number
    name: string
    type: string
    cidr: string
    subnetId: number
    createdAt?: Date
    updatedAt?: Date | null

    constructor(ipPool: IIPPool) {
        this.id = ipPool.id
        this.name = ipPool.name
        this.type = ipPool.type
        this.cidr = ipPool.cidr
        this.subnetId = ipPool.subnetId
        this.createdAt = ipPool.createdAt
        this.updatedAt = ipPool.updatedAt
    }
}
