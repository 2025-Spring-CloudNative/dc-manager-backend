import { eq, ilike, desc, asc, and, SQL } from "drizzle-orm"
import { IRoom } from "../../domain/room"
import { IRoomRepository } from "../repositories/room.repository"
import { db } from "./index"
import { roomTable } from "./schema/room.schema"
import { RoomQueryParams } from "../../application/services/room.service"

function buildRoomQueryFilters(queryParams?: RoomQueryParams): SQL[] {
    if (!queryParams) {
        return []
    }
    const filters: SQL[] = []
    if (!queryParams.name) {
        filters.push(ilike(roomTable.name, `%${queryParams.name}%`))
    }
    return filters
}

function buildRoomQueryOrder(queryParams: RoomQueryParams): SQL[] {
    if (!queryParams || !queryParams.sortBy) {
        return []
    }
    const column = queryParams.sortBy === 'name' ? roomTable.name
        : queryParams.sortBy === 'unit' ? roomTable.unit
        : roomTable.id
    const orderFn = queryParams.sortOrder === 'desc' ? desc : asc
    return [orderFn(column)]
}

export class RoomDrizzleRepository implements IRoomRepository {
    async getRooms(roomQueryParams: RoomQueryParams) {
        const filters = buildRoomQueryFilters(roomQueryParams)
        const order = buildRoomQueryOrder(roomQueryParams)

        const rooms = await db
            .select()
            .from(roomTable)
            .where(filters.length ? and(...filters) : undefined)
            .orderBy(...order)

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