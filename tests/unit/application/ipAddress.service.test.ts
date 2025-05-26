import * as ipAddressService from "../../../src/application/services/ipAddress.service"
import { IIPAddressRepository } from "../../../src/persistence/repositories/ipAddress.repository"
import { IIPAddress, IPAddressStatus } from "../../../src/domain/ipAddress"

const mockIpAddressRepo: jest.Mocked<IIPAddressRepository> = {
    getIPAddresses: jest.fn(),
    getIPAddressById: jest.fn(),
    createIPAddress: jest.fn(),
    updateIPAddress: jest.fn(),
    deleteIPAddress: jest.fn(),
    getIPAddressByMachineId: jest.fn()
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe("ipAddressService - getIPAddresses", () => {
    it("should fetch and return all IP addresses", async () => {
        const ipAddresses: IIPAddress[] = [
            {
                id: 1,
                address: "192.168.0.10",
                status: IPAddressStatus.Allocated,
                poolId: 100,
                machineId: 200,
                createdAt: new Date("2025-04-18T00:00:00Z"),
                updatedAt: undefined,
                allocatedAt: new Date("2025-04-18T01:00:00Z"),
                releasedAt: null
            },
            {
                id: 2,
                address: "192.168.0.11",
                status: IPAddressStatus.Released,
                poolId: 100,
                machineId: 201,
                createdAt: new Date("2025-04-18T02:00:00Z"),
                updatedAt: new Date("2025-04-18T03:00:00Z"),
                allocatedAt: new Date("2025-04-18T04:00:00Z"),
                releasedAt: new Date("2025-04-18T05:00:00Z")
            }
        ]
        mockIpAddressRepo.getIPAddresses.mockResolvedValue(ipAddresses)

        const result = await ipAddressService.getIPAddresses(mockIpAddressRepo, {} as any)

        expect(mockIpAddressRepo.getIPAddresses).toHaveBeenCalled()
        expect(result).toEqual(ipAddresses)
    })
})

describe("ipAddressService - getIPAddressById", () => {
    it("should fetch and return the IP address by id", async () => {
        const ip: IIPAddress = {
            id: 1,
            address: "192.168.0.10",
            status: IPAddressStatus.Allocated,
            poolId: 100,
            machineId: 200,
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: undefined,
            allocatedAt: new Date("2025-04-18T01:00:00Z"),
            releasedAt: null
        }
        mockIpAddressRepo.getIPAddressById.mockResolvedValue(ip)

        const result = await ipAddressService.getIPAddressById(
            mockIpAddressRepo,
            ip.id!
        )

        expect(mockIpAddressRepo.getIPAddressById).toHaveBeenCalledWith(ip.id!)
        expect(result).toEqual(ip)
    })
})

describe("ipAddressService - createIPAddress", () => {
    it("should create an IP address and return its id", async () => {
        const newIp: IIPAddress = {
            address: "10.0.0.1",
            status: IPAddressStatus.Allocated,
            poolId: 200,
            machineId: 0
        }
        const createdId = 3
        mockIpAddressRepo.createIPAddress.mockResolvedValue(createdId)

        const result = await ipAddressService.createIPAddress(
            mockIpAddressRepo,
            newIp
        )

        expect(mockIpAddressRepo.createIPAddress).toHaveBeenCalledWith(newIp)
        expect(result).toEqual(createdId)
    })
})

describe("ipAddressService - updateIPAddress", () => {
    it("should update and return the updated IP address", async () => {
        const updates: Partial<IIPAddress> = {
            status: IPAddressStatus.Allocated,
            machineId: 300
        }
        const updatedIp: IIPAddress = {
            id: 1,
            address: "10.0.0.1",
            status: IPAddressStatus.Allocated,
            poolId: 200,
            machineId: 300,
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: new Date("2025-04-18T06:00:00Z"),
            allocatedAt: new Date("2025-04-18T07:00:00Z"),
            releasedAt: null
        }
        mockIpAddressRepo.getIPAddressById.mockResolvedValue({
            id: 1,
            address: "10.0.0.1",
            status: IPAddressStatus.Allocated,
            poolId: 200,
            machineId: 300,
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: new Date("2025-04-18T06:00:00Z"),
            allocatedAt: new Date("2025-04-18T07:00:00Z"),
            releasedAt: null
        })
        mockIpAddressRepo.updateIPAddress.mockResolvedValue(updatedIp)

        const result = await ipAddressService.updateIPAddress(
            mockIpAddressRepo,
            1,
            updates
        )

        expect(mockIpAddressRepo.updateIPAddress).toHaveBeenCalledWith(
            1,
            updates
        )
        expect(result).toEqual(updatedIp)
    })
})

describe("ipAddressService - deleteIPAddress", () => {
    it("should delete and return the id of deleted IP address", async () => {
        const deletedId = 1
        mockIpAddressRepo.deleteIPAddress.mockResolvedValue(deletedId)

        const result = await ipAddressService.deleteIPAddress(
            mockIpAddressRepo,
            deletedId
        )

        expect(mockIpAddressRepo.deleteIPAddress).toHaveBeenCalledWith(
            deletedId
        )
        expect(result).toEqual(deletedId)
    })
})