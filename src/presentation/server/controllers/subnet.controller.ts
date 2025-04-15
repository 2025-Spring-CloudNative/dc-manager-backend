import { Request, Response } from "express"
import { SubnetDrizzleRepository } from "../../../persistence/drizzle/subnet.persistence"
import * as subnetService from "../../../application/services/subnet.service"

export async function getSubnets(req: Request, res: Response) {
    const subnetRepo =  new SubnetDrizzleRepository()

    try {
        const subnets = await subnetService.getSubnets(subnetRepo)
        res.status(200).json(subnets)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createSubnet(req: Request, res: Response) {
    const subnetRepo =  new SubnetDrizzleRepository()

    try {
        const createdSubnetId = await subnetService.createSubnet(
            subnetRepo,
            req.body
        )
        res.status(200).json({ id: createdSubnetId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}