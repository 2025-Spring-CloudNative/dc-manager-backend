export interface IIPAddress {
    id?: number
    address: string
    status: string
    poolId: number
    createdAt: Date
    updatedAt?: Date | null
    allocatedAt?: Date | null
    releasedAt?: Date | null
    machineId: number
}

export class IPAddressEntity implements IIPAddress {
    id?: number
    address: string
    status: string
    poolId: number
    createdAt: Date
    updatedAt?: Date | null
    allocatedAt?: Date | null
    releasedAt?: Date | null
    machineId: number

    constructor(ipAddress: IIPAddress) {
        this.id = ipAddress.id
        this.address = ipAddress.address
        this.status = ipAddress.status
        this.poolId = ipAddress.poolId
        this.createdAt = ipAddress.createdAt
        this.updatedAt = ipAddress.updatedAt
        this.allocatedAt = ipAddress.allocatedAt
        this.releasedAt = ipAddress.releasedAt
        this.machineId = ipAddress.machineId
    }
}