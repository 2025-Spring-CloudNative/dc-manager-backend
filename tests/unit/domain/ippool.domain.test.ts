import { IPPoolEntity, IIPPool } from "../../../src/domain/ipPool"
import { NetUtils } from "../../../src/domain/utils/net"

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
        })

        it("should create an instance when CIDR is valid", () => {
            expect(() => new IPPoolEntity(validIPPool)).not.toThrow()
        })

        it("should throw error when CIDR is invalid", () => {
            const isValidIPv4CIDRSpy = jest.spyOn(NetUtils, "isValidIPv4CIDR").mockReturnValue(false)
            expect(() => new IPPoolEntity(validIPPool)).toThrow(`Invalid CIDR format ${validIPPool.cidr}`)
            isValidIPv4CIDRSpy.mockRestore()
        })

        it("should assign all properties correctly", () => {
            const entity = new IPPoolEntity(validIPPool)
            expect(entity.id).toBe(validIPPool.id)
            expect(entity.name).toBe(validIPPool.name)
            expect(entity.type).toBe(validIPPool.type)
            expect(entity.cidr).toBe(validIPPool.cidr)
            expect(entity.subnetId).toBe(validIPPool.subnetId)
            expect(entity.createdAt).toBe(validIPPool.createdAt)
            expect(entity.updatedAt).toBe(validIPPool.updatedAt)
        })
    })

    describe("extend", () => {
        const oldCidr = "192.168.2.0/25"
        const newCidr = "192.168.2.0/24"
        const subnetCidr = "192.168.0.0/16"
        const ipPoolCidrs = ["192.168.1.0/24"]

        let isValidIPv4CIDRSpy: jest.SpyInstance
        let isCIDRWithinSubnetSpy: jest.SpyInstance
        let checkCIDROverlapSpy: jest.SpyInstance
        let isNewCIDRLargerSpy: jest.SpyInstance

        beforeEach(() => {
            isValidIPv4CIDRSpy = jest.spyOn(NetUtils, "isValidIPv4CIDR").mockImplementation(() => true)
            isCIDRWithinSubnetSpy = jest.spyOn(NetUtils, "isCIDRWithinSubnet").mockImplementation(() => true)
            checkCIDROverlapSpy = jest.spyOn(NetUtils, "checkCIDROverlap").mockImplementation(() => false)
            isNewCIDRLargerSpy = jest.spyOn(NetUtils, "isNewCIDRLarger").mockImplementation(() => true)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return new CIDR when all checks pass", () => {
            isValidIPv4CIDRSpy.mockReturnValue(true)
            isCIDRWithinSubnetSpy.mockReturnValue(true)
            checkCIDROverlapSpy.mockReturnValue(false)
            expect(IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)).toEqual({ cidr: newCidr })
        })

        it("should throw error if newCidr is invalid", () => {
            isValidIPv4CIDRSpy.mockReturnValue(false)
            expect(() => IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)).toThrow(
                `Invalid CIDR format ${newCidr}.`
            )
        })

        it("should throw error if not within subnet", () => {
            isCIDRWithinSubnetSpy.mockReturnValue(false)
            expect(() => IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)).toThrow(
                `The CIDR ${newCidr} is not in the range of subnet ${subnetCidr}.`
            )
        })

        it("should throw error if overlaps with other ipPools", () => {
            checkCIDROverlapSpy.mockReturnValue(true)
            expect(() => IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)).toThrow(
                `The CIDR ${newCidr} overlaps with other ipPools.`
            )
        })

        it("should throw error if the new CIDR is smaller than the old CIDR", () => {
            isNewCIDRLargerSpy.mockReturnValue(false)
            expect(() => IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)).toThrow(
                `The new CIDR ${newCidr} must be larger than the old CIDR ${oldCidr}.`
            )
        })

        it("should call NetUtils.isValidIPv4CIDR with correct arguments", () => {
            IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)
            expect(NetUtils.isValidIPv4CIDR).toHaveBeenCalledWith(newCidr)
        })

        it("should call NetUtils.isCIDRWithinSubnet with correct arguments", () => {
            IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)
            expect(NetUtils.isCIDRWithinSubnet).toHaveBeenCalledWith(newCidr, subnetCidr)
        })

        it("should call NetUtils.checkCIDROverlap with correct arguments", () => {
            IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)
            expect(NetUtils.checkCIDROverlap).toHaveBeenCalledWith(newCidr, ipPoolCidrs)
        })

        it("should call NetUtils.isNewCIDRLarger with correct arguments", () => {
            IPPoolEntity.extend(oldCidr, newCidr, subnetCidr, ipPoolCidrs)
            expect(NetUtils.isNewCIDRLarger).toHaveBeenCalledWith(oldCidr, newCidr)
        })
    })
})