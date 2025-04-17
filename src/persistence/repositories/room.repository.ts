import { IRoom } from "../../domain/room"

export interface IRoomRepository {
    getRooms(): Promise<IRoom[]>
    getRoomById(id: number): Promise<IRoom>
    createRoom(room: IRoom): Promise<number>
    updateRoom(id: number, room: Partial<IRoom>): Promise<IRoom>
    deleteRoom(id: number): Promise<number>
}