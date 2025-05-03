import { Request, Response } from "express"
import { RoomDrizzleRepository } from "../../../persistence/drizzle/room.persistence"
import * as roomService from "../../../application/services/room.service"

export async function getRooms(req: Request, res: Response) {
    const roomRepo = new RoomDrizzleRepository()

    try {
        const rooms = await roomService.getRooms(roomRepo)
        res.status(200).json(rooms)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getRoomById(req: Request, res: Response) {
    const roomRepo = new RoomDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const room = await roomService.getRoomById(
            roomRepo, 
            id
        )
        res.status(200).json(room)
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
        res.status(200).json({ id: createdRoomId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateRoom(req: Request, res: Response) {
    const roomRepo = new RoomDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const updatedRoom = await roomService.updateRoom(
            roomRepo, 
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
        await roomService.deleteRoom(
            roomRepo, 
            id
        )
        res.status(200).json({ message: "Room deleted successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}