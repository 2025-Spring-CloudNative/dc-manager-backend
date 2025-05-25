import { IRoom, RoomEntity } from "../../domain/room"
import { IRackRepository } from "../../persistence/repositories/rack.repository"
import { IRoomRepository } from "../../persistence/repositories/room.repository"
import { SortOrder } from "../../types/common"

export type RoomSortBy = 'name' | 'unit'

export interface RoomQueryParams {
    name?: string
    dataCenterId?: number
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
    id: number
) {
    const room = await roomRepo.getRoomById(id)

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
    rackRepo: IRackRepository,
    id: number,
    room: Partial<IRoom>
) {
    const prevRoom = await roomRepo.getRoomById(id)
    const prevRoomEntity = new RoomEntity(prevRoom)

    // if the room unit is changed, then do the following check
    if (room.unit && prevRoomEntity.unit !== room.unit) {
        const racks  = await rackRepo.getRacks({
            roomId: id
        })
        for (const rack of racks) {
            if (rack.height > room.unit) {
                throw new Error("The updated unit of room is smaller than the rack height.")
            }
        }
    }

    const restrictedField: (keyof IRoom) = 'id'
    if (room[restrictedField] && room[restrictedField] !== prevRoomEntity[restrictedField]) {
        throw new Error(`Cannot update restricted field: ${restrictedField}`)
    }


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