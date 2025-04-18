import { IRoom } from "../../domain/room"
import { IRoomRepository } from "../../persistence/repositories/room.repository"

export async function getRooms(roomRepo: IRoomRepository) {
    const rooms = await roomRepo.getRooms()
    
    return rooms
}

export async function getRoomById(
    roomRepo: IRoomRepository,
    id: number
) {
    const room = await roomRepo.getRoomById(id)

    return room
}

export async function createRoom(
    roomRepo: IRoomRepository,
    room: IRoom
) {
    const createdRoomId = await roomRepo.createRoom(room)

    return createdRoomId
}

export async function updateRoom(
    roomRepo: IRoomRepository,
    id: number,
    room: Partial<IRoom>
) {
    const updatedRoom = await roomRepo.updateRoom(id, room)

    return updatedRoom
}

export async function deleteRoom(
    roomRepo: IRoomRepository,
    id: number
) {
    const deletedRoomId = await roomRepo.deleteRoom(id)

    return deletedRoomId
}