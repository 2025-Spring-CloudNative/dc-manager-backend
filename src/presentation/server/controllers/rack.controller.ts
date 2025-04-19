import { Request, Response } from "express"
import { RackDrizzleRepository } from "../../../persistence/drizzle/rack.persistence"
import * as rackService from "../../../application/services/rack.service"

export async function getRacks(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()

    try {
        const racks = await rackService.getRacks(rackRepo)
        res.status(200).json(racks)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getRackById(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const rack = await rackService.getRackById(
            rackRepo,
            id
        )
        res.status(200).json(rack)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createRack(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    console.log("createRack body:", req.body)

    try {
        const createdRackId = await rackService.createRack(
            rackRepo,
            req.body
        )
        res.status(200).json({ id: createdRackId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateRack(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const updatedRack = await rackService.updateRack(
            rackRepo,
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
        await rackService.deleteRack(
            rackRepo,
            id
        )
        res.status(200).json({ message: "Rack deleted successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}