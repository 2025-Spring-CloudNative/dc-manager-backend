import { Request, Response } from "express"
import { IPPoolDrizzleRepository } from "../../../persistence/drizzle/ipPool.persistence"
import * as ipPoolService from "../../../application/services/ipPool.service"

export async function getIPPools(req: Request, res: Response) {
    const ipPoolRepo = new IPPoolDrizzleRepository()

    try {
        const ipPools = await ipPoolService.getIPPools(ipPoolRepo)
        res.status(200).json(ipPools)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getIPPoolById(req: Request, res: Response) {
    const ipPoolRepo = new IPPoolDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const ipPool = await ipPoolService.getIPPoolById(
            ipPoolRepo,
            id
        )
        res.status(200).json(ipPool)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createIPPool(req: Request, res: Response) {
    const ipPoolRepo = new IPPoolDrizzleRepository()

    try {
        const createdIPPoolId = await ipPoolService.createIPPool(
            ipPoolRepo,
            req.body
        )
        res.status(200).json({ id: createdIPPoolId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateIPPool(req: Request, res: Response) {
    const ipPoolRepo = new IPPoolDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const updatedIPPool = await ipPoolService.updateIPPool(
            ipPoolRepo,
            id,
            req.body
        )
        res.status(200).json(updatedIPPool)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteIPPool(req: Request, res: Response) {
    const ipPoolRepo = new IPPoolDrizzleRepository()
    const id = Number(req.params.id)

    try {
        await ipPoolService.deleteIPPool(
            ipPoolRepo,
            id
        )
        res.status(200).json({ message: "IP Pool deleted successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
