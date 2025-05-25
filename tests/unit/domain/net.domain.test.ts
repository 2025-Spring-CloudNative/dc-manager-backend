import { NetUtils } from "../../../src/domain/utils/net"

describe("NetUtils", () => {
    describe("isValidIPv4CIDR", () => {
        it("returns true for valid IPv4 CIDR notations", () => {
            expect(NetUtils.isValidIPv4CIDR("192.168.0.0/24")).toBe(true)
            expect(NetUtils.isValidIPv4CIDR("10.0.0.0/8")).toBe(true)
        })

        it("returns false for IPv6 or malformed CIDR strings", () => {
            expect(NetUtils.isValidIPv4CIDR("2001:db8::/32")).toBe(false)
            expect(NetUtils.isValidIPv4CIDR("192.168.0.0/33")).toBe(false)
            expect(NetUtils.isValidIPv4CIDR("192.168.0.0")).toBe(false)
            expect(NetUtils.isValidIPv4CIDR("not-a-cidr")).toBe(false)
        })
    })

    describe("isValidIPv4Netmask", () => {
        it("returns true for standard IPv4 netmasks", () => {
            expect(NetUtils.isValidIPv4Netmask("255.255.255.0")).toBe(true)
            expect(NetUtils.isValidIPv4Netmask("255.255.0.0")).toBe(true)
        })

        it("returns false for invalid netmask strings", () => {
            expect(NetUtils.isValidIPv4Netmask("255.0.255.0")).toBe(false)
            expect(NetUtils.isValidIPv4Netmask("::ffff:0.0.0.0")).toBe(false)
            expect(NetUtils.isValidIPv4Netmask("not-a-mask")).toBe(false)
        })
    })

    describe("isValidIPv4IP", () => {
        it("returns true for valid IPv4 addresses", () => {
            expect(NetUtils.isValidIPv4IP("192.168.1.1")).toBe(true)
            expect(NetUtils.isValidIPv4IP("8.8.8.8")).toBe(true)
        })

        it("returns false for IPv6 or malformed IPs", () => {
            expect(NetUtils.isValidIPv4IP("::1")).toBe(false)
            expect(NetUtils.isValidIPv4IP("256.1.1.1")).toBe(false)
            expect(NetUtils.isValidIPv4IP("192.168.1")).toBe(false)
            expect(NetUtils.isValidIPv4IP("not-an-ip")).toBe(false)
        })
    })

    describe("isIPInsideCIDR", () => {
        it("returns true when IP is inside the CIDR block", () => {
            expect(
                NetUtils.isIPInsideCIDR("192.168.0.5", "192.168.0.0/24")
            ).toBe(true)
            expect(NetUtils.isIPInsideCIDR("10.0.1.42", "10.0.0.0/16")).toBe(
                true
            )
        })

        it("returns false when IP is outside the CIDR block", () => {
            expect(
                NetUtils.isIPInsideCIDR("192.168.1.5", "192.168.0.0/24")
            ).toBe(false)
            expect(NetUtils.isIPInsideCIDR("10.1.0.1", "10.0.0.0/16")).toBe(
                false
            )
        })
    })

    describe("prefixMatchesNetmask", () => {
        it("returns true when netmask prefix matches CIDR prefix length", () => {
            expect(
                NetUtils.prefixMatchesNetmask("255.255.255.0", "192.168.0.0/24")
            ).toBe(true)
            expect(
                NetUtils.prefixMatchesNetmask("255.0.0.0", "10.0.0.0/8")
            ).toBe(true)
        })

        it("returns false when they do not match", () => {
            expect(
                NetUtils.prefixMatchesNetmask("255.255.0.0", "192.168.0.0/24")
            ).toBe(false)
            expect(
                NetUtils.prefixMatchesNetmask("255.255.255.0", "10.0.0.0/16")
            ).toBe(false)
        })
    })
    describe("getIpAddressesFromCIDR", () => {
        it("returns all IPs including network and broadcast addresses when includeNetworkAndBroadcast is true", () => {
            const ips = NetUtils.getIpAddressesFromCIDR("192.168.1.0/30", { includeNetworkAndBroadcast: true });
            expect(ips).toEqual([
                "192.168.1.0",
                "192.168.1.1",
                "192.168.1.2",
                "192.168.1.3"
            ]);
        });

        it("returns only usable IPs when includeNetworkAndBroadcast is false", () => {
            const ips = NetUtils.getIpAddressesFromCIDR("192.168.1.0/30", { includeNetworkAndBroadcast: false });
            expect(ips).toEqual([
                "192.168.1.1",
                "192.168.1.2"
            ]);
        });

        it("returns empty array for /31 or /32 when includeNetworkAndBroadcast is false", () => {
            expect(NetUtils.getIpAddressesFromCIDR("192.168.1.0/31", { includeNetworkAndBroadcast: false })).toEqual([]);
            expect(NetUtils.getIpAddressesFromCIDR("192.168.1.0/32", { includeNetworkAndBroadcast: false })).toEqual([]);
        });

        it("throws error for invalid CIDR", () => {
            expect(() => NetUtils.getIpAddressesFromCIDR("not-a-cidr")).toThrow("Invalid CIDR");
        });
    });

    describe("isCIDRWithinSubnet", () => {
        it("returns true when subnet is within ipPoolCidr", () => {
            expect(NetUtils.isCIDRWithinSubnet("192.168.1.128/25", "192.168.1.0/24")).toBe(true);
        });

        it("returns false when subnet is not within ipPoolCidr", () => {
            expect(NetUtils.isCIDRWithinSubnet("192.168.2.0/24", "192.168.1.0/24")).toBe(false);
        });
    });

    describe("checkCIDROverlap", () => {
        it("returns true when newCidr overlaps with existingCidrs", () => {
            expect(NetUtils.checkCIDROverlap("192.168.1.0/24", ["192.168.1.128/25", "10.0.0.0/8"])).toBe(true);
        });

        it("returns false when newCidr does not overlap with any existingCidrs", () => {
            expect(NetUtils.checkCIDROverlap("192.168.2.0/24", ["192.168.1.0/24", "10.0.0.0/8"])).toBe(false);
        });
    });
})
