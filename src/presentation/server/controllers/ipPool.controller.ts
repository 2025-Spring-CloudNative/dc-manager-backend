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