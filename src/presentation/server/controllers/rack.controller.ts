import { Request, Response } from "express"
import { RackDrizzleRepository } from "../../../persistence/drizzle/rack.persistence"
import * as rackService from "../../../application/services/rack.service"
import { SortOrder } from "../../../types/common"
import { RoomDrizzleRepository } from "../../../persistence/drizzle/room.persistence"
import { MachineDrizzleRepository } from "../../../persistence/drizzle/machine.persistence"

export async function getRacks(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const rackQueryParams: rackService.RackQueryParams = {
        name: req.query.name as string,
        tag: req.query.tag as string,
        roomId: Number(req.query.roomId),
        sortBy: req.query.sortBy as rackService.RackSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }

    try {
        const racks = await rackService.getRacks(rackRepo, rackQueryParams)
        res.status(200).json(racks)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getRackById(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const rack = await rackService.getRackById(rackRepo, id)
        res.status(200).json(rack)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getRackUtilization(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const machineRepo = new MachineDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const utilization = await rackService.getRackUtilization(
            rackRepo,
            machineRepo,
            id
        )
        res.status(200).json({ utilization })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getRackFaultRateById(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const faultRate = await rackService.getRackFaultRateById(
            machineRepo,
            id
        )
        res.status(200).json({ faultRate })
    } catch(error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createRack(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const roomRepo = new RoomDrizzleRepository()

    try {
        const createdRackId = await rackService.createRack(
            rackRepo,
            roomRepo,
            req.body
        )
        res.status(200).json({ id: createdRackId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateRack(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const machineRepo = new MachineDrizzleRepository()
    const roomRepo = new RoomDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const updatedRack = await rackService.updateRack(
            rackRepo,
            machineRepo,
            roomRepo,
            id,
            req.body
        )
        res.status(200).json(updatedRack)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
    
}
export async function deleteRack(req: Request, res: Response) { 
    const rackRepo = new RackDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const deletedRackId = await rackService.deleteRack(
            rackRepo,
            id
        )
        res.status(200).json({ id: deletedRackId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}