import { NetUtils } from "./utils/net"

export enum IPAddressStatus {
    Created = "created",
    Allocated = "allocated",
    Released = "released"
}

export interface IIPAddress {
    id?: number
    address: string
    status: IPAddressStatus
    poolId: number
    createdAt?: Date
    updatedAt?: Date
    allocatedAt?: Date | null
    releasedAt?: Date | null
    machineId?: number | null
}

export class IPAddressEntity implements IIPAddress {
    id?: number
    address: string
    status: IPAddressStatus
    poolId: number
    machineId?: number | null
    createdAt?: Date
    updatedAt?: Date
    allocatedAt?: Date | null
    releasedAt?: Date | null

    constructor(ipAddress: IIPAddress) {
        if (!NetUtils.isValidIPv4IP(ipAddress.address)) {
            throw new Error(`Invalid IPv4 address: ${ipAddress.address}`)
        }
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
