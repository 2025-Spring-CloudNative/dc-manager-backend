import { SubnetEntity, ISubnet } from "../../../src/domain/subnet"
import { NetUtils } from "../../../src/domain/utils/net"

describe("SubnetEntity", () => {
    const validSubnet: ISubnet = {
        id: 1,
        cidr: "192.168.10.0/24",
        netmask: "255.255.255.0",
        gateway: "192.168.10.1",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("constructor", () => {
        beforeEach(() => {
        jest.clearAllMocks()
        jest.spyOn(NetUtils, "isValidIPv4CIDR").mockImplementation(() => true)
        jest.spyOn(NetUtils, "isValidIPv4Netmask").mockImplementation(() => true)
        jest.spyOn(NetUtils, "isValidIPv4IP").mockImplementation(() => true)
        jest.spyOn(NetUtils, "isIPInsideCIDR").mockImplementation(() => true)
        jest.spyOn(NetUtils, "prefixMatchesNetmask").mockImplementation(() => true)
        })

    it("should create an instance when all fields are valid", () => {
        expect(() => new SubnetEntity(validSubnet)).not.toThrow()
    })

    it("should throw error when CIDR is invalid", () => {
        const isValidIPv4CIDRSpy = jest.spyOn(NetUtils, "isValidIPv4CIDR").mockReturnValue(false)
        expect(() => new SubnetEntity(validSubnet)).toThrow(`Invalid CIDR format: ${validSubnet.cidr}`)
        isValidIPv4CIDRSpy.mockRestore()
    })

    it("throws when netmask is invalid", () => {
        const isValidIPv4NetmaskSpy = jest.spyOn(NetUtils, "isValidIPv4Netmask").mockReturnValue(false)
        expect(() => new SubnetEntity(validSubnet)).toThrow(`Invalid netmask: ${validSubnet.netmask}`)
        isValidIPv4NetmaskSpy.mockRestore()
    })

    it("throws when gateway IP is invalid", () => {
        const isValidIPv4IPSpy = jest.spyOn(NetUtils, "isValidIPv4IP").mockReturnValue(false)
        expect(() => new SubnetEntity(validSubnet)).toThrow(
            `Gateway must be a valid IPv4 address: ${validSubnet.gateway}`
        )
        isValidIPv4IPSpy.mockRestore()
    })

    it("throws when gateway is outside the subnet", () => {
        const isIPInsideCIDRSpy = jest.spyOn(NetUtils, "isIPInsideCIDR").mockReturnValue(false)
        expect(() => new SubnetEntity(validSubnet)).toThrow(
            `Gateway ${validSubnet.gateway} is outside subnet ${validSubnet.cidr}`
        )
        isIPInsideCIDRSpy.mockRestore()
    })

    it("throws when netmask/prefix mismatch", () => {
        const prefixMatchesNetmaskSpy = jest.spyOn(NetUtils, "prefixMatchesNetmask").mockReturnValue(false)
        expect(() => new SubnetEntity(validSubnet)).toThrow(
            `Netmask ${validSubnet.netmask} does not match prefix length of ${validSubnet.cidr}`
        )
        prefixMatchesNetmaskSpy.mockRestore()
    })

    it("assigns all properties correctly", () => {
        const entity = new SubnetEntity(validSubnet)
        expect(entity.id).toBe(validSubnet.id)
        expect(entity.cidr).toBe(validSubnet.cidr)
        expect(entity.netmask).toBe(validSubnet.netmask)
        expect(entity.gateway).toBe(validSubnet.gateway)
        expect(entity.createdAt).toBe(validSubnet.createdAt)
        expect(entity.updatedAt).toBe(validSubnet.updatedAt)
    })
  })

  describe("extend", () => {
    const oldCidr = "192.168.20.0/25"
    const newCidr = "192.168.20.0/24"
    const newNetmask = "255.255.255.0"
    const newGateway = "192.168.20.1"

    let isValidIPv4CIDRSpy: jest.SpyInstance
    let isValidIPv4NetmaskSpy: jest.SpyInstance
    let isValidIPv4IPSpy: jest.SpyInstance
    let isIPInsideCIDRSpy: jest.SpyInstance
    let prefixMatchesNetmaskSpy: jest.SpyInstance
    let isNewCIDRLargerSpy: jest.SpyInstance

    beforeEach(() => {
        isValidIPv4CIDRSpy = jest.spyOn(NetUtils, "isValidIPv4CIDR").mockImplementation(() => true)
        isValidIPv4NetmaskSpy = jest.spyOn(NetUtils, "isValidIPv4Netmask").mockImplementation(() => true)
        isValidIPv4IPSpy = jest.spyOn(NetUtils, "isValidIPv4IP").mockImplementation(() => true)
        isIPInsideCIDRSpy = jest.spyOn(NetUtils, "isIPInsideCIDR").mockImplementation(() => true)
        prefixMatchesNetmaskSpy = jest.spyOn(NetUtils, "prefixMatchesNetmask").mockImplementation(() => true)
        isNewCIDRLargerSpy = jest.spyOn(NetUtils, "isNewCIDRLarger").mockImplementation(() => true)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return updated fields when all checks pass", () => {
        isValidIPv4CIDRSpy.mockReturnValue(true)
        isValidIPv4NetmaskSpy.mockReturnValue(true)
        isValidIPv4IPSpy.mockReturnValue(true)
        isIPInsideCIDRSpy.mockReturnValue(true)
        prefixMatchesNetmaskSpy.mockReturnValue(true)
        isNewCIDRLargerSpy.mockReturnValue(true)
        expect(SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)
        ).toEqual({
            cidr: newCidr,
            netmask: newNetmask,
            gateway: newGateway,
        })
    })

    it("should throw error if new CIDR is invalid", () => {
        isValidIPv4CIDRSpy.mockReturnValue(false)
        expect(() => SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)).toThrow(
            `Invalid CIDR format ${newCidr}.`
        )
    })

    it("should throw error if new netmask is invalid", () => {
        isValidIPv4NetmaskSpy.mockReturnValue(false)
        expect(() => SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)).toThrow(
            `Invalid netmask: ${newNetmask}`
        )
    })

    it("should throw error if new gateway IP is invalid", () => {
        isValidIPv4IPSpy.mockReturnValue(false)
        expect(() => SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)).toThrow(
            `Gateway must be a valid IPv4 address: ${newGateway}`
        )
    })

    it("should throw error if gateway not inside the new CIDR", () => {
        isIPInsideCIDRSpy.mockReturnValue(false)
        expect(() => SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)).toThrow(
            `Gateway ${newGateway} is outside subnet ${newCidr}`
        )
    })

    it("should throw error if netmask/prefix mismatch", () => {
        prefixMatchesNetmaskSpy.mockReturnValue(false)
        expect(() => SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)).toThrow(
            `Netmask ${newNetmask} does not match prefix length of ${newCidr}`
        )
    })

    it("should throw error if the new CIDR is not larger", () => {
        isNewCIDRLargerSpy.mockReturnValue(false)
        expect(() => SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)).toThrow(
            "The new CIDR must be larger than the old CIDR."
        )
    })

    it("calls isValidIPv4CIDR with newCidr", () => {
        SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)
        expect(NetUtils.isValidIPv4CIDR).toHaveBeenCalledWith(newCidr)
    })

    it("calls isValidIPv4Netmask with newNetmask", () => {
        SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)
        expect(NetUtils.isValidIPv4Netmask).toHaveBeenCalledWith(newNetmask)
    })

    it("calls isValidIPv4IP with newGateway", () => {
        SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)
        expect(NetUtils.isValidIPv4IP).toHaveBeenCalledWith(newGateway)
    })

    it("calls isIPInsideCIDR with gateway & newCidr", () => {
        SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)
        expect(NetUtils.isIPInsideCIDR).toHaveBeenCalledWith(newGateway, newCidr)
    })

    it("calls prefixMatchesNetmask with netmask & newCidr", () => {
        SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)
        expect(NetUtils.prefixMatchesNetmask).toHaveBeenCalledWith(newNetmask, newCidr)
    })

    it("calls isNewCIDRLarger with correct args", () => {
        SubnetEntity.extend(oldCidr, newCidr, newNetmask, newGateway)
        expect(NetUtils.isNewCIDRLarger).toHaveBeenCalledWith(oldCidr, newCidr)
    })
  })
})
