import * as subnetService from "../../../src/application/services/subnet.service"
import { ISubnetRepository } from "../../../src/persistence/repositories/subnet.repository"
import { ISubnet } from "../../../src/domain/subnet"

const mockSubnetRepo: jest.Mocked<ISubnetRepository> = {
    getSubnets: jest.fn(),
    getOtherSubnetCIDRs: jest.fn(),
    getSubnetById: jest.fn(),
    createSubnet: jest.fn(),
    updateSubnet: jest.fn(),
    deleteSubnet: jest.fn()
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe("subnetService - getSubnets", () => {
    it("should fetch and return all subnets", async () => {
        const subnets: ISubnet[] = [
            {
                id: 1,
                cidr: "192.168.0.0/24",
                netmask: "255.255.255.0",
                gateway: "192.168.0.1",
                createdAt: new Date("2025-04-18T00:00:00Z"),
                updatedAt: new Date("2025-04-18T02:00:00Z")
            },
            {
                id: 2,
                cidr: "10.0.0.0/16",
                netmask: "255.255.0.0",
                gateway: "10.0.0.1",
                createdAt: new Date("2025-04-18T01:00:00Z"),
                updatedAt: new Date("2025-04-18T02:00:00Z")
            }
        ]
        mockSubnetRepo.getSubnets.mockResolvedValue(subnets)

        const result = await subnetService.getSubnets(mockSubnetRepo, {} as any)

        expect(mockSubnetRepo.getSubnets).toHaveBeenCalled()
        expect(result).toEqual(subnets)
    })
})

describe("subnetService - getSubnetById", () => {
    it("should fetch and return the subnet by id", async () => {
        const subnet: ISubnet = {
            id: 1,
            cidr: "192.168.0.0/24",
            netmask: "255.255.255.0",
            gateway: "192.168.0.1",
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: new Date("2025-04-18T00:00:00Z")
        }
        mockSubnetRepo.getSubnetById.mockResolvedValue(subnet)

        const result = await subnetService.getSubnetById(
            mockSubnetRepo,
            subnet.id!
        )

        expect(mockSubnetRepo.getSubnetById).toHaveBeenCalledWith(subnet.id!)
        expect(result).toEqual(subnet)
    })
})

describe("subnetService - createSubnet", () => {
    it("should create a subnet and return its id", async () => {
        const newSubnet: ISubnet = {
            cidr: "172.16.0.0/12",
            netmask: "255.240.0.0",
            gateway: "172.16.0.1"
        }
        const createdId = 3
        mockSubnetRepo.createSubnet.mockResolvedValue(createdId)

        const result = await subnetService.createSubnet(
            mockSubnetRepo,
            newSubnet
        )

        expect(mockSubnetRepo.createSubnet).toHaveBeenCalledWith(newSubnet)
        expect(result).toEqual(createdId)
    })
})

describe("subnetService - updateSubnet", () => {
    it("should update and return the updated subnet", async () => {
        const updates: Partial<ISubnet> = { gateway: "192.168.0.254" }
        const updatedSubnet: ISubnet = {
            id: 1,
            cidr: "192.168.0.0/24",
            netmask: "255.255.255.0",
            gateway: "192.168.0.254",
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: new Date("2025-04-18T03:00:00Z")
        }
        mockSubnetRepo.getSubnetById.mockResolvedValue({
            id: 1,
            cidr: "192.168.0.0/24",
            netmask: "255.255.255.0",
            gateway: "192.168.0.1",
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: new Date("2025-04-18T00:00:00Z")
        })
        mockSubnetRepo.updateSubnet.mockResolvedValue(updatedSubnet)

        const result = await subnetService.updateSubnet(
            mockSubnetRepo,
            1,
            updates
        )

        expect(mockSubnetRepo.updateSubnet).toHaveBeenCalledWith(1, updates)
        expect(result).toEqual(updatedSubnet)
    })
})

describe("subnetService - deleteSubnet", () => {
    it("should delete and return the id of deleted subnet", async () => {
        const deletedId = 1
        mockSubnetRepo.deleteSubnet.mockResolvedValue(deletedId)

        const result = await subnetService.deleteSubnet(
            mockSubnetRepo,
            deletedId
        )

        expect(mockSubnetRepo.deleteSubnet).toHaveBeenCalledWith(deletedId)
        expect(result).toEqual(deletedId)
    })
})
