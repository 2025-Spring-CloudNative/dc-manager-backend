import { Request, Response } from "express"
import { MachineDrizzleRepository } from "../../../persistence/drizzle/machine.persistence"
import * as machineService from "../../../application/services/machine.service"
import { IPAddressDrizzleRepository } from "../../../persistence/drizzle/ipAddress.persistence"
import { RackDrizzleRepository } from "../../../persistence/drizzle/rack.persistence"
import { ServiceDrizzleRepository } from "../../../persistence/drizzle/service.persistence"
import { MachineStatus } from "../../../domain/machine"
import { SortOrder } from "../../../types/common"

export async function getMachines(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()
    const machineQueryParams: machineService.MachineQueryParams = {
        name: req.query.name as string,
        status: req.query.status as MachineStatus,
        macAddress: req.query.macAddress as string,
        sortBy: req.query.sortBy as machineService.MachineSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }

    try {
        const machines = await machineService.getMachines(machineRepo, machineQueryParams)
        res.status(200).json(machines)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getMachineById(req: Request, res: Response) {
    const machineRepo = new MachineDrizzleRepository()
    const id = Number(req.params.id)
    const machineQueryParams: machineService.MachineQueryParams = {
        name: req.query.name as string,
        status: req.query.status as MachineStatus,
        macAddress: req.query.macAddress as string,
        sortBy: req.query.sortBy as machineService.MachineSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }

    try {
        const machine = await machineService.getMachineById(
            machineRepo,
            machineQueryParams,
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
    const rackRepo = new RackDrizzleRepository()
    const serviceRepo = new ServiceDrizzleRepository()

    try {
        const createdMachineId = await machineService.createMachine(
            machineRepo,
            ipAddressRepo,
            rackRepo,
            serviceRepo,
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
    const ipAddressRepo = new IPAddressDrizzleRepository()

    const id = Number(req.params.id)

    try {
        await machineService.deleteMachine(
            machineRepo,
            ipAddressRepo,
            id
        )
        res.status(200).json({ message: "Machine deleted successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}