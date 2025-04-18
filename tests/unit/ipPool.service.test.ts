import * as ipPoolService from "../../src/application/services/ipPool.service"
import { IIPPoolRepository } from "../../src/persistence/repositories/ipPool.repository"
import { IIPPool } from "../../src/domain/ipPool"

const mockIpPoolRepo: jest.Mocked<IIPPoolRepository> = {
    getIPPools: jest.fn(),
    getIPPoolById: jest.fn(),
    createIPPool: jest.fn(),
    updateIPPool: jest.fn(),
    deleteIPPool: jest.fn(),
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe("ipPoolService - getIPPools", () => {
    it("should fetch and return all IP pools", async () => {
        const ipPools: IIPPool[] = [
            {
                id: 1,
                name: "Pool1",
                type: "static",
                startIp: "192.168.0.100",
                endIp: "192.168.0.200",
                subnetId: 1,
                createdAt: new Date("2025-04-18T00:00:00Z"),
                updatedAt: null,
            },
            {
                id: 2,
                name: "Pool2",
                type: "dynamic",
                startIp: "10.0.0.10",
                endIp: "10.0.0.50",
                subnetId: 2,
                createdAt: new Date("2025-04-18T01:00:00Z"),
                updatedAt: new Date("2025-04-18T02:00:00Z"),
            },
        ]
        mockIpPoolRepo.getIPPools.mockResolvedValue(ipPools)

        const result = await ipPoolService.getIPPools(mockIpPoolRepo)

        expect(mockIpPoolRepo.getIPPools).toHaveBeenCalled()
        expect(result).toEqual(ipPools)
    })
})

describe("ipPoolService - getIPPoolById", () => {
    it("should fetch and return the IP pool by id", async () => {
        const ipPool: IIPPool = {
            id: 1,
            name: "Pool1",
            type: "static",
            startIp: "192.168.0.100",
            endIp: "192.168.0.200",
            subnetId: 1,
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: null,
        }
        mockIpPoolRepo.getIPPoolById.mockResolvedValue(ipPool)

        const result = await ipPoolService.getIPPoolById(
            mockIpPoolRepo,
            ipPool.id!
        )

        expect(mockIpPoolRepo.getIPPoolById).toHaveBeenCalledWith(ipPool.id!)
        expect(result).toEqual(ipPool)
    })
})

describe("ipPoolService - createIPPool", () => {
    it("should create an IP pool and return its id", async () => {
        const newPool: IIPPool = {
            name: "NewPool",
            type: "static",
            startIp: "172.16.0.1",
            endIp: "172.16.0.254",
            subnetId: 3,
        }
        const createdId = 3
        mockIpPoolRepo.createIPPool.mockResolvedValue(createdId)

        const result = await ipPoolService.createIPPool(mockIpPoolRepo, newPool)

        expect(mockIpPoolRepo.createIPPool).toHaveBeenCalledWith(newPool)
        expect(result).toEqual(createdId)
    })
})

describe("ipPoolService - updateIPPool", () => {
    it("should update and return the updated IP pool", async () => {
        const updates: Partial<IIPPool> = { type: "dynamic" }
        const updatedPool: IIPPool = {
            id: 1,
            name: "Pool1",
            type: "dynamic",
            startIp: "192.168.0.100",
            endIp: "192.168.0.200",
            subnetId: 1,
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: new Date("2025-04-18T03:00:00Z"),
        }
        mockIpPoolRepo.updateIPPool.mockResolvedValue(updatedPool)

        const result = await ipPoolService.updateIPPool(
            mockIpPoolRepo,
            1,
            updates
        )

        expect(mockIpPoolRepo.updateIPPool).toHaveBeenCalledWith(1, updates)
        expect(result).toEqual(updatedPool)
    })
})

describe("ipPoolService - deleteIPPool", () => {
    it("should delete and return the id of deleted IP pool", async () => {
        const deletedId = 1
        mockIpPoolRepo.deleteIPPool.mockResolvedValue(deletedId)

        const result = await ipPoolService.deleteIPPool(
            mockIpPoolRepo,
            deletedId
        )

        expect(mockIpPoolRepo.deleteIPPool).toHaveBeenCalledWith(deletedId)
        expect(result).toEqual(deletedId)
    })
})
