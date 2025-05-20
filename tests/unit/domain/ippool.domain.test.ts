import { IPPoolEntity, IIPPool } from "../../../src/domain/ipPool"
import { NetUtils } from "../../../src/domain/utils/net"

// Remove jest.mock and use jest.spyOn for each method in beforeEach

describe("IPPoolEntity", () => {
    const validIPPool: IIPPool = {
        id: 1,
        name: "TestPool",
        type: "static",
        cidr: "192.168.1.0/24",
        subnetId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("constructor", () => {
        beforeEach(() => {
            jest.clearAllMocks()
            jest.spyOn(NetUtils, "isValidIPv4CIDR").mockImplementation(() => true)
            jest.spyOn(NetUtils, "isCIDRWithinSubnet").mockImplementation(() => true)
            jest.spyOn(NetUtils, "checkCIDROverlap").mockImplementation(() => true)
        })

        it("should create an instance when CIDR is valid", () => {
            expect(() => new IPPoolEntity(validIPPool)).not.toThrow()
        })

        it("should throw error when CIDR is invalid", () => {
            const isValidIPv4CIDRSpy = jest.spyOn(NetUtils, "isValidIPv4CIDR").mockReturnValue(false)
            expect(() => new IPPoolEntity(validIPPool)).toThrow(`Invalid CIDR format ${validIPPool.cidr}`)
            isValidIPv4CIDRSpy.mockRestore()
        })
    })

    describe("extend", () => {
        const newCidr = "192.168.2.0/24"
        const subnetCidr = "192.168.0.0/16"
        const ipPoolCidrs = ["192.168.1.0/24"]

        let isValidIPv4CIDRSpy: jest.SpyInstance
        let isCIDRWithinSubnetSpy: jest.SpyInstance
        let checkCIDROverlapSpy: jest.SpyInstance

        beforeEach(() => {
            isValidIPv4CIDRSpy = jest.spyOn(NetUtils, "isValidIPv4CIDR").mockImplementation(() => true)
            isCIDRWithinSubnetSpy = jest.spyOn(NetUtils, "isCIDRWithinSubnet").mockImplementation(() => true)
            checkCIDROverlapSpy = jest.spyOn(NetUtils, "checkCIDROverlap").mockImplementation(() => true)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return new CIDR when all checks pass", () => {
            isValidIPv4CIDRSpy.mockReturnValue(true)
            isCIDRWithinSubnetSpy.mockReturnValue(true)
            checkCIDROverlapSpy.mockReturnValue(true)
            expect(IPPoolEntity.extend(newCidr, subnetCidr, ipPoolCidrs)).toEqual({ cidr: newCidr })
        })

        it("should throw error if newCidr is invalid", () => {
            isValidIPv4CIDRSpy.mockReturnValue(false)
            expect(() => IPPoolEntity.extend(newCidr, subnetCidr, ipPoolCidrs)).toThrow(
                `Invalid CIDR format ${newCidr}.`
            )
        })

        it("should throw error if not within subnet", () => {
            isValidIPv4CIDRSpy.mockReturnValue(true)
            isCIDRWithinSubnetSpy.mockReturnValue(false)
            expect(() => IPPoolEntity.extend(newCidr, subnetCidr, ipPoolCidrs)).toThrow(
                `The CIDR ${newCidr} is not in the range of subnet ${subnetCidr}.`
            )
        })

        it("should throw error if overlaps with other ipPools", () => {
            isValidIPv4CIDRSpy.mockReturnValue(true)
            isCIDRWithinSubnetSpy.mockReturnValue(true)
            checkCIDROverlapSpy.mockReturnValue(false)
            expect(() => IPPoolEntity.extend(newCidr, subnetCidr, ipPoolCidrs)).toThrow(
                `The CIDR ${newCidr} overlaps with other ipPools.`
            )
        })
    })
})