import * as rackService from "../../src/application/services/rack.service"
import { IRackRepository } from "../../src/persistence/repositories/rack.repository"
import { IRack } from "../../src/domain/rack"

const mockRackRepo: jest.Mocked<IRackRepository> = {
    getRacks: jest.fn(),
    getRackById: jest.fn(),
    createRack: jest.fn(),
    updateRack: jest.fn(),
    deleteRack: jest.fn(),
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe("rackService - getRacks", () => {
    it("should fetch and return all racks", async () => {
        const racks: IRack[] = [
            {
                id: 1,
                name: "Rack1",
                height: 42,
                tag: "R1",
                createdAt: new Date("2025-04-18T00:00:00Z"),
                updatedAt: null,
                roomId: 100,
                serviceId: 200,
            },
            {
                id: 2,
                name: "Rack2",
                height: 45,
                tag: "R2",
                createdAt: new Date("2025-04-18T01:00:00Z"),
                updatedAt: new Date("2025-04-18T02:00:00Z"),
                roomId: 101,
                serviceId: 201,
            },
        ]
        mockRackRepo.getRacks.mockResolvedValue(racks)

        const result = await rackService.getRacks(mockRackRepo)

        expect(mockRackRepo.getRacks).toHaveBeenCalled()
        expect(result).toEqual(racks)
    })
})

describe("rackService - getRackById", () => {
    it("should fetch and return the rack by id", async () => {
        const rack: IRack = {
            id: 1,
            name: "Rack1",
            height: 42,
            tag: "R1",
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: null,
            roomId: 100,
            serviceId: 200,
        }
        mockRackRepo.getRackById.mockResolvedValue(rack)

        const result = await rackService.getRackById(mockRackRepo, rack.id!)

        expect(mockRackRepo.getRackById).toHaveBeenCalledWith(rack.id!)
        expect(result).toEqual(rack)
    })
})

describe("rackService - createRack", () => {
    it("should create a rack and return its id", async () => {
        const newRack: IRack = {
            name: "NewRack",
            height: 40,
            tag: "NR",
            roomId: 102,
            serviceId: 202,
        }
        const createdId = 3
        mockRackRepo.createRack.mockResolvedValue(createdId)

        const result = await rackService.createRack(mockRackRepo, newRack)

        expect(mockRackRepo.createRack).toHaveBeenCalledWith(newRack)
        expect(result).toEqual(createdId)
    })
})

describe("rackService - updateRack", () => {
    it("should update and return the updated rack", async () => {
        const updates: Partial<IRack> = { tag: "UpdatedTag" }
        const updatedRack: IRack = {
            id: 1,
            name: "Rack1",
            height: 42,
            tag: "UpdatedTag",
            createdAt: new Date("2025-04-18T00:00:00Z"),
            updatedAt: new Date("2025-04-18T04:00:00Z"),
            roomId: 100,
            serviceId: 200,
        }
        mockRackRepo.updateRack.mockResolvedValue(updatedRack)

        const result = await rackService.updateRack(mockRackRepo, 1, updates)

        expect(mockRackRepo.updateRack).toHaveBeenCalledWith(1, updates)
        expect(result).toEqual(updatedRack)
    })
})

describe("rackService - deleteRack", () => {
    it("should delete and return the id of deleted rack", async () => {
        const deletedId = 1
        mockRackRepo.deleteRack.mockResolvedValue(deletedId)

        const result = await rackService.deleteRack(mockRackRepo, deletedId)

        expect(mockRackRepo.deleteRack).toHaveBeenCalledWith(deletedId)
        expect(result).toEqual(deletedId)
    })
})
