import { IRoom, RoomEntity } from "../../domain/room"
import { IRoomRepository } from "../../persistence/repositories/room.repository"
import { SortOrder } from "../../types/common"

export type RoomSortBy = 'name' | 'unit'

export interface RoomQueryParams {
    name?: string
    sortBy?: RoomSortBy
    sortOrder?: SortOrder
}

export async function getRooms(
    roomRepo: IRoomRepository,
    roomQueryParams: RoomQueryParams
) {
    
    const rooms = await roomRepo.getRooms(roomQueryParams)
    
    return rooms
}

export async function getRoomById(
    roomRepo: IRoomRepository,
    roomQueryParams: RoomQueryParams,
    id: number
) {
    const room = await roomRepo.getRoomById(id, roomQueryParams)

    return room
}

export async function createRoom(
    roomRepo: IRoomRepository,
    room: IRoom
) {
    const roomEntity = new RoomEntity(room)
    const createdRoomId = await roomRepo.createRoom(roomEntity)

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