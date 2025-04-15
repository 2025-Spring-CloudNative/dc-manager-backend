import { IRoom } from "../../domain/room"
import { IRoomRepository } from "../repositories/room.repository"
import { db } from "./index"
import { roomTable } from "./schema/room.schema"

export class RoomDrizzleRepository implements IRoomRepository {
    async getRooms() {
        const room = await db.select().from(roomTable)
        return room
    }

    async getRoomById(id: number) {
        // TODO
    }

    async createRoom(room: IRoom) {
        const createdRoom = await db
            .insert(roomTable)
            .values(room)
            .returning({ id: roomTable.id })
        return createdRoom[0]?.id as number
    }

    async updateRoom(id: number, room: any) {
        // TODO
    }

    async deleteRoom(id: number) {
        // TODO 
    }
}