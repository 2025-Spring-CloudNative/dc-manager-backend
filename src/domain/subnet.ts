import { NetUtils } from "./utils/net"

export interface ISubnet {
    id?: number
    cidr: string
    netmask: string
    gateway: string
    createdAt?: Date
    updatedAt?: Date
}

export class SubnetEntity implements ISubnet {
    id?: number
    cidr: string
    netmask: string
    gateway: string
    createdAt?: Date
    updatedAt?: Date

    constructor(subnet: ISubnet) {
        // validate
        if (!NetUtils.isValidIPv4CIDR(subnet.cidr)) {
            throw new Error(`Invalid CIDR notation: ${subnet.cidr}`)
        }
        if (!NetUtils.isValidIPv4Netmask(subnet.netmask)) {
            throw new Error(`Invalid netmask: ${subnet.netmask}`)
        }
        if (!NetUtils.isValidIPv4IP(subnet.gateway)) {
            throw new Error(
                `Gateway must be a valid IPv4 address: ${subnet.gateway}`
            )
        }
        // if (!NetUtils.isIPInsideCIDR(subnet.gateway, subnet.cidr)) {
        //     throw new Error(
        //         `Gateway ${subnet.gateway} is outside subnet ${subnet.cidr}`
        //     )
        // }
        if (!NetUtils.prefixMatchesNetmask(subnet.netmask, subnet.cidr)) {
            throw new Error(
                `Netmask ${subnet.netmask} does not match prefix length of ${subnet.cidr}`
            )
        }

        // assign
        this.id = subnet.id
        this.cidr = subnet.cidr
        this.netmask = subnet.netmask
        this.gateway = subnet.gateway
        this.createdAt = subnet.createdAt
        this.updatedAt = subnet.updatedAt
    }
}
