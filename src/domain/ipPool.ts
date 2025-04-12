export interface IIPPool {
    id?: number
    name: string
    type: string
    startIp: string
    endIp: string
    subnetId: number
    createdAt: Date
    updatedAt?: Date | null
}

export class IPPoolEntity implements IIPPool {
    id?: number
    name: string
    type: string
    startIp: string
    endIp: string
    subnetId: number
    createdAt: Date
    updatedAt?: Date | null
    
    constructor(ipPool: IIPPool) {
        this.id = ipPool.id
        this.name = ipPool.name
        this.type = ipPool.type
        this.startIp = ipPool.startIp
        this.endIp = ipPool.endIp
        this.subnetId = ipPool.subnetId
        this.createdAt = ipPool.createdAt
        this.updatedAt = ipPool.updatedAt
    }
}