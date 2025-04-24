import * as ipaddr from "ipaddr.js"
import IPCIDR from "ip-cidr"
import { IPv4CidrRange } from "ip-num"
// https://www.npmjs.com/package/ipaddr.js/v/2.2.0

export class NetUtils {
    /*
    Validate IPv4 CIDR notation (rejects IPv6)
    */
    static isValidIPv4CIDR(cidr: string): boolean {
        return ipaddr.IPv4.isValidCIDR(cidr) && cidr.split(".").length === 4
    }

    /*
    Validate IPv4 netmask (rejects IPv6)
    */
    static isValidIPv4Netmask(netmask: string): boolean {
        if (!this.isValidIPv4IP(netmask)) return false // netmask is not a valid IPv4 address
        const prefix = ipaddr.IPv4.parse(netmask).prefixLengthFromSubnetMask()
        return prefix !== null // && netmask.split(".").length === 4
    }

    /*
    Validate an IPv4 address (rejects IPv6)
    */
    static isValidIPv4IP(ip: string): boolean {
        return ipaddr.IPv4.isValid(ip) && ip.split(".").length === 4
    }

    /*
    Check whether a IP is inside the given CIDR block
    */
    static isIPInsideCIDR(gateway: string, cidr: string): boolean {
        const [networkAddr, prefixLength] = ipaddr.parseCIDR(cidr)
        return ipaddr.parse(gateway).match(networkAddr, prefixLength)
    }

    /*
    Ensure dotted‑decimal netmask corresponds to the CIDR prefix length
    E.g. 255.255.255.0 => 24
    */
    static prefixMatchesNetmask(netmask: string, cidr: string): boolean {
        const num_ones = ipaddr.parse(netmask).prefixLengthFromSubnetMask()
        const [_, prefixLength] = ipaddr.parseCIDR(cidr)
        return num_ones === prefixLength
    }

    static getIpAddressesFromCIDR(cidr: string, options = { includeNetworkAndBroadcast: false }): string[] {
        const cidrInstance = new IPCIDR(cidr);
        if (!IPCIDR.isValidCIDR(cidr)) {
            throw new Error("Invalid CIDR")
        }
        const total = Number(cidrInstance.size)
        if (total <= 2 && !options.includeNetworkAndBroadcast) {
            return [];
        }
      
        const from = options.includeNetworkAndBroadcast ? 0 : 1;
        const limit = options.includeNetworkAndBroadcast
            ? total
            : total - 2;
      
        return cidrInstance.toArray({ from, limit });
    }
    
    static isCIDRWithinSubnet(ipPoolCidr: string, subnetCidr: string): boolean {
        const ipPoolRange = IPv4CidrRange.fromCidr(ipPoolCidr)
        const subnetRange = IPv4CidrRange.fromCidr(subnetCidr)

        return (
            subnetRange.contains(ipPoolRange)
        )
    }

    static checkCIDROverlap(newCidr: string, existingCidrs: string[]): boolean {
        const newRange = IPv4CidrRange.fromCidr(newCidr)
        for (const existing of existingCidrs) {
            const existingRange = IPv4CidrRange.fromCidr(existing)
            if (newRange.isOverlapping(existingRange)) {
                return true
            }
        }
        return false
    }
    
}
