import { NetUtils } from "./utils/net"

export interface IIPPool {
    id?: number
    name: string
    type: string
    cidr: string
    subnetId: number
    createdAt?: Date
    updatedAt?: Date
}

export class IPPoolEntity implements IIPPool {
    id?: number
    name: string
    type: string
    cidr: string
    subnetId: number
    createdAt?: Date
    updatedAt?: Date

    constructor(ipPool: IIPPool) {
        if (!NetUtils.isValidIPv4CIDR(ipPool.cidr)) {
            throw new Error(`Invalid CIDR format ${ipPool.cidr}`)
        }
        this.id = ipPool.id
        this.name = ipPool.name
        this.type = ipPool.type
        this.cidr = ipPool.cidr
        this.subnetId = ipPool.subnetId
        this.createdAt = ipPool.createdAt
        this.updatedAt = ipPool.updatedAt
    }

    static extend(
        newCidr: string,
        subnetCidr: string, 
        ipPoolCidrs: string[]
    ): Partial<IPPoolEntity> {
        if (!NetUtils.isValidIPv4CIDR(newCidr)) {
            throw new Error(`Invalid CIDR format ${newCidr}.`)
        }
        if (!NetUtils.isCIDRWithinSubnet(newCidr, subnetCidr)) {
            throw new Error(`The CIDR ${newCidr} is not in the range of subnet ${subnetCidr}.`)
        }
        if (NetUtils.checkCIDROverlap(newCidr, ipPoolCidrs)) {
            throw new Error(`The CIDR ${newCidr} overlaps with other ipPools.`)
        }
        return {cidr: newCidr};
    } 
}
