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
        if (!NetUtils.isIPInsideCIDR(subnet.gateway, subnet.cidr)) {
            throw new Error(
                `Gateway ${subnet.gateway} is outside subnet ${subnet.cidr}`
            )
        }
        if (!NetUtils.prefixMatchesNetmask(subnet.netmask, subnet.cidr)) {
            throw new Error(
                `Netmask ${subnet.netmask} does not match prefix length of ${subnet.cidr}`
            )
        }

        this.id = subnet.id
        this.cidr = subnet.cidr
        this.netmask = subnet.netmask
        this.gateway = subnet.gateway
        this.createdAt = subnet.createdAt
        this.updatedAt = subnet.updatedAt
    }

    static extend(
        newCidr: string,
        newNetmask: string,
        newGateway: string,
        subnetCidrs: string[]
    ): Partial<SubnetEntity> {
        if (!NetUtils.isValidIPv4CIDR(newCidr)) {
            throw new Error(`Invalid CIDR format ${newCidr}.`)
        }
        if (!NetUtils.isValidIPv4Netmask(newNetmask)) {
            throw new Error(`Invalid netmask: ${newNetmask}`)
        }
        if (!NetUtils.isValidIPv4IP(newGateway)) {
            throw new Error(
                `Gateway must be a valid IPv4 address: ${newGateway}`
            )
        }
        if (!NetUtils.isIPInsideCIDR(newGateway, newCidr)) {
            throw new Error(
                `Gateway ${newGateway} is outside subnet ${newCidr}`
            )
        }
        if (!NetUtils.prefixMatchesNetmask(newNetmask, newCidr)) {
            throw new Error(
                `Netmask ${newNetmask} does not match prefix length of ${newCidr}`
            )
        }
        if (!NetUtils.checkCIDROverlap(newCidr, subnetCidrs)) {
            throw new Error(`The CIDR ${newCidr} overlaps with other subnets.`)
        }
        return {
            cidr: newCidr,
            netmask: newNetmask
        }
    }
}
