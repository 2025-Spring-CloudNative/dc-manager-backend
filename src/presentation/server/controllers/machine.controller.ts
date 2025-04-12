import { Request, Response } from "express"
import { MachineDrizzleRepository } from "../../../persistence/drizzle/machine.persistence"
import * as machineService from "../../../application/services/machine.service"

export async function getMachines(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()

    try {
        const machines = await machineService.getMachines(machineRepo)
        res.status(200).json(machines)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createMachine(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()

    try {
        const createdMachineId = await machineService.createMachine(
            machineRepo,
            req.body
        )
        res.status(200).json({ id: createdMachineId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}