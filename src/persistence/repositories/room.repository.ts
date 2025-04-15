import { IRoom } from "../../domain/room"

// TODO 
export interface IRoomRepository {
    getRooms(): Promise<IRoom[]>
    // getRoomById(id: number): Promise<IRoom>
    createRoom(room: IRoom): Promise<number>
    // updateRoom(id: number, room: IRoom): Promise<IRoom>
    // deleteRoom(id: number): Promise<number>
}