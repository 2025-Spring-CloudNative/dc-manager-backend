export interface ISubnet {
    id?: number
    cidr: string
    netmask: string
    gateway: string
    createdAt: Date
    updatedAt?: Date | null
}

export class SubnetEntity implements ISubnet {
    id?: number
    cidr: string
    netmask: string
    gateway: string
    createdAt: Date
    updatedAt?: Date | null

    constructor(subnet: ISubnet) {
        this.id = subnet.id
        this.cidr = subnet.cidr
        this.netmask = subnet.netmask
        this.gateway = subnet.gateway
        this.createdAt = subnet.createdAt
        this.updatedAt = subnet.updatedAt
    }
}