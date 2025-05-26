import { Request, Response } from "express"
import { RoomDrizzleRepository } from "../../../persistence/drizzle/room.persistence"
import * as roomService from "../../../application/services/room.service"
import { SortOrder } from "../../../types/common"
import { RackDrizzleRepository } from "../../../persistence/drizzle/rack.persistence"

export async function getRooms(req: Request, res: Response) {
    const roomRepo = new RoomDrizzleRepository()
    const roomQueryParams : roomService.RoomQueryParams = {
        name: req.query.name as string,
        dataCenterId: Number(req.query.dataCenterId),
        sortBy: req.query.sortBy as roomService.RoomSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }

    try {
        const rooms = await roomService.getRooms(roomRepo, roomQueryParams)
        res.status(200).json(rooms)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getRoomById(req: Request, res: Response) {
    const roomRepo = new RoomDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const room = await roomService.getRoomById(roomRepo, id)
        if (room) {
            res.status(200).json(room)
        }else {
            res.status(404).json({ message: "Room not found." })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createRoom(req: Request, res: Response) {
    const roomRepo = new RoomDrizzleRepository()

    try {
        const createdRoomId = await roomService.createRoom(
            roomRepo,
            req.body
        )
        res.status(201).json({ id: createdRoomId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateRoom(req: Request, res: Response) {
    const roomRepo = new RoomDrizzleRepository()
    const rackRepo = new RackDrizzleRepository()

    const id = Number(req.params.id)

    try {
        const updatedRoom = await roomService.updateRoom(
            roomRepo, 
            rackRepo,
            id, 
            req.body
        )
        res.status(200).json(updatedRoom)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteRoom(req: Request, res: Response) { 
    const roomRepo = new RoomDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const deletedRoomId = await roomService.deleteRoom(
            roomRepo, 
            id
        )
        res.status(200).json({ id: deletedRoomId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}