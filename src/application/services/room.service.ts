import { IRoom } from "../../domain/room"
import { IRoomRepository } from "../../persistence/repositories/room.repository"

export async function getRooms(roomRepo: IRoomRepository) {
    const room = await roomRepo.getRooms()
    
    return room
}

export async function createRoom(
    roomRepo: IRoomRepository,
    room: IRoom
) {
    const createdRoomId = await roomRepo.createRoom(room)

    return createdRoomId
}