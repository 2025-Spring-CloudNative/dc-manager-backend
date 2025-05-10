import { IRoom } from "../../domain/room"
import { RoomQueryParams } from "../../application/services/room.service"

export interface IRoomRepository {
    getRooms(roomQueryParams?: RoomQueryParams): Promise<IRoom[]>
    getRoomById(id: number): Promise<IRoom>
    createRoom(room: IRoom): Promise<number>
    updateRoom(id: number, room: Partial<IRoom>): Promise<IRoom>
    deleteRoom(id: number): Promise<number>
}