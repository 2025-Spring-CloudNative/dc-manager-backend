import { Request, Response } from "express"
import { MachineDrizzleRepository } from "../../../persistence/drizzle/machine.persistence"
import * as machineService from "../../../application/services/machine.service"
import { IPAddressDrizzleRepository } from "../../../persistence/drizzle/ipAddress.persistence"

export async function getMachines(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()

    try {
        const machines = await machineService.getMachines(machineRepo)
        res.status(200).json(machines)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getMachineById(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const machine = await machineService.getMachineById(
            machineRepo,
            id
        )
        res.status(200).json(machine)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createMachine(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()
    const ipAddressRepo = new IPAddressDrizzleRepository()

    try {
        const createdMachineId = await machineService.createMachine(
            machineRepo,
            ipAddressRepo,
            req.body
        )
        res.status(200).json({ id: createdMachineId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateMachine(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const updatedMachine = await machineService.updateMachine(
            machineRepo,
            id,
            req.body
        )
        res.status(200).json(updatedMachine)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteMachine(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()
    const id = Number(req.params.id)

    try {
        await machineService.deleteMachine(
            machineRepo,
            id
        )
        res.status(200).json({ message: "Machine deleted successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}