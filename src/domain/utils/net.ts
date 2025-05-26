import * as ipaddr from "ipaddr.js"
import IPCIDR from "ip-cidr"

export class NetUtils {
    static isValidIPv4CIDR(cidr: string): boolean {
        return ipaddr.IPv4.isValidCIDR(cidr) && cidr.split(".").length === 4
    }

    static isValidIPv4Netmask(netmask: string): boolean {
        if (!this.isValidIPv4IP(netmask)) return false
        const prefix = ipaddr.IPv4.parse(netmask).prefixLengthFromSubnetMask()
        return prefix !== null
    }

    static isValidIPv4IP(ip: string): boolean {
        return ipaddr.IPv4.isValid(ip) && ip.split(".").length === 4
    }

    static isIPInsideCIDR(gateway: string, cidr: string): boolean {
        const [networkAddr, prefixLength] = ipaddr.parseCIDR(cidr)
        return ipaddr.parse(gateway).match(networkAddr, prefixLength)
    }

    static prefixMatchesNetmask(netmask: string, cidr: string): boolean {
        const num_ones = ipaddr.parse(netmask).prefixLengthFromSubnetMask()
        const [_, prefixLength] = ipaddr.parseCIDR(cidr)
        return num_ones === prefixLength
    }

    static getIpAddressesFromCIDR(cidr: string, options = { includeNetworkAndBroadcast: false }): string[] {
        const cidrInstance = new IPCIDR(cidr);
        if (!this.isValidIPv4CIDR(cidr)) {
            throw new Error(`Invalid CIDR format ${cidr}`)
        }
        const total = Number(cidrInstance.size)
        if (total <= 2 && !options.includeNetworkAndBroadcast) {
            return []
        }
        const from = options.includeNetworkAndBroadcast ? 0 : 1
        const limit = options.includeNetworkAndBroadcast ? total : total - 2
        return cidrInstance.toArray({ from, limit })
    }

    static isNewCIDRLarger(oldCidr: string, newCidr: string): boolean {
        const [oldAddr, oldPrefix] = ipaddr.parseCIDR(oldCidr)
        const [newAddr, newPrefix] = ipaddr.parseCIDR(newCidr)
        return newPrefix < oldPrefix
    }

    static isCIDRWithinSubnet(ipPoolCidr: string, subnetCidr: string): boolean {
        if (!this.isValidIPv4CIDR(ipPoolCidr)) {
            throw new Error(`Invalid ipPool CIDR format ${ipPoolCidr}`)
        }
        if (!this.isValidIPv4CIDR(subnetCidr)) {
            throw new Error(`Invalid subnet CIDR format ${subnetCidr}`)
        }

        const [ipPoolAddr, ipPoolPrefix] = ipaddr.parseCIDR(ipPoolCidr)
        const [subnetAddr, subnetPrefix] = ipaddr.parseCIDR(subnetCidr)

        // IP Pool must be fully inside subnet
        return (
            ipPoolAddr.match(subnetAddr, subnetPrefix) && 
            ipPoolPrefix >= subnetPrefix
        )
    }

    static checkCIDROverlap(newCidr: string, existingCidrs: string[]): boolean {
        if (!this.isValidIPv4CIDR(newCidr)) {
            throw new Error(`Invalid CIDR format ${newCidr}`)
        }

        const [newAddr, newPrefix] = ipaddr.parseCIDR(newCidr)

        for (const existing of existingCidrs) {
            if (!this.isValidIPv4CIDR(existing)) {
                throw new Error(`Invalid CIDR format ${existing}`)
            }

            const [existAddr, existPrefix] = ipaddr.parseCIDR(existing)

            // Check bidirectional overlap
            const overlapA = newAddr.match(existAddr, existPrefix)
            const overlapB = existAddr.match(newAddr, newPrefix)

            if (overlapA || overlapB) {
                return true
            }
        }
        return false
    }
}
