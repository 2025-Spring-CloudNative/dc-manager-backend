export interface IIPAddress {
    id?: number
    address: string
    status: string
    poolId: number
    createdAt?: Date
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
    machineId: number
    createdAt?: Date
    updatedAt?: Date | null
    allocatedAt?: Date | null
    releasedAt?: Date | null

    constructor(ipAddress: IIPAddress) {
        this.id = ipAddress.id
        this.address = ipAddress.address
        this.status = ipAddress.status
        this.poolId = ipAddress.poolId
        this.machineId = ipAddress.machineId
        this.createdAt = ipAddress.createdAt
        this.updatedAt = ipAddress.updatedAt
        this.allocatedAt = ipAddress.allocatedAt
        this.releasedAt = ipAddress.releasedAt
    }
}
