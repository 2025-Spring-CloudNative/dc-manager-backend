import { eq } from "drizzle-orm"
import { IRoom } from "../../domain/room"
import { IRoomRepository } from "../repositories/room.repository"
import { db } from "./index"
import { roomTable } from "./schema/room.schema"

export class RoomDrizzleRepository implements IRoomRepository {
    async getRooms() {
        const rooms = await db
            .select()
            .from(roomTable)

        return rooms
    }

    async getRoomById(id: number) {
        const [room] = await db
            .select()
            .from(roomTable)
            .where(eq(roomTable.id, id))
        
        return room as IRoom
    }

    async createRoom(room: IRoom) {
        const [createdRoom] = await db
            .insert(roomTable)
            .values(room)
            .returning({ id: roomTable.id })

        return createdRoom?.id as number
    }

    async updateRoom(id: number, room: Partial<IRoom>) {
        const [updatedRoom] = await db
            .update(roomTable)
            .set(room)
            .where(eq(roomTable.id, id))
            .returning()

        return updatedRoom as IRoom
    }

    async deleteRoom(id: number) {
        const [deletedRoom] = await db
            .delete(roomTable)
            .where(eq(roomTable.id, id))
            .returning({ id: roomTable.id })
        
        return deletedRoom?.id as number
    }
}