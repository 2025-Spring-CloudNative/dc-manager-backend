import * as roomService from "../../../src/application/services/room.service"
import { IRoomRepository } from "../../../src/persistence/repositories/room.repository"
import { IRoom } from "../../../src/domain/room"

const mockRoomRepo: jest.Mocked<IRoomRepository> = {
    getRooms: jest.fn(),
    getRoomById: jest.fn(),
    createRoom: jest.fn(),
    updateRoom: jest.fn(),
    deleteRoom: jest.fn()
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe("roomService - getRooms", () => {
    it("should fetch and return all rooms", async () => {
        const rooms: IRoom[] = [
            { id: 1, name: "RoomA", unit: 10, dataCenterId: 1 },
            { id: 2, name: "RoomB", unit: 20, dataCenterId: 1 }
        ]
        mockRoomRepo.getRooms.mockResolvedValue(rooms)

        const result = await roomService.getRooms(mockRoomRepo, {} as any)

        expect(mockRoomRepo.getRooms).toHaveBeenCalled()
        expect(result).toEqual(rooms)
    })
})

describe("roomService - getRoomById", () => {
    it("should fetch and return the room by id", async () => {
        const room: IRoom = { id: 1, name: "RoomA", unit: 10, dataCenterId: 1 }
        mockRoomRepo.getRoomById.mockResolvedValue(room)

        const result = await roomService.getRoomById(mockRoomRepo, room.id!)

        expect(mockRoomRepo.getRoomById).toHaveBeenCalledWith(room.id!)
        expect(result).toEqual(room)
    })
})

describe("roomService - createRoom", () => {
    it("should create a room and return its id", async () => {
        const newRoom: IRoom = { name: "NewRoom", unit: 30, dataCenterId: 2 }
        const createdId = 3
        mockRoomRepo.createRoom.mockResolvedValue(createdId)

        const result = await roomService.createRoom(mockRoomRepo, newRoom)

        expect(mockRoomRepo.createRoom).toHaveBeenCalledWith(newRoom)
        expect(result).toEqual(createdId)
    })
})

describe("roomService - updateRoom", () => {
    it("should update and return the updated room", async () => {
        const updates: Partial<IRoom> = { unit: 15 }
        const updatedRoom: IRoom = {
            id: 1,
            name: "RoomA",
            unit: 15,
            dataCenterId: 1
        }
        mockRoomRepo.updateRoom.mockResolvedValue(updatedRoom)

        const result = await roomService.updateRoom(mockRoomRepo, 1, updates)

        expect(mockRoomRepo.updateRoom).toHaveBeenCalledWith(1, updates)
        expect(result).toEqual(updatedRoom)
    })
})

describe("roomService - deleteRoom", () => {
    it("should delete and return the id of deleted room", async () => {
        const deletedId = 1
        mockRoomRepo.deleteRoom.mockResolvedValue(deletedId)

        const result = await roomService.deleteRoom(mockRoomRepo, deletedId)

        expect(mockRoomRepo.deleteRoom).toHaveBeenCalledWith(deletedId)
        expect(result).toEqual(deletedId)
    })
})
