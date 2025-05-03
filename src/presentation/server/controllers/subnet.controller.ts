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

export async function getSubnetById(req: Request, res: Response) {
    const subnetRepo = new SubnetDrizzleRepository();
    const id = Number(req.params.id)
    try {
        const subnet = await subnetService.getSubnetById(
            subnetRepo,
            id
        );
        if (subnet) {
            res.status(200).json(subnet);
        } else {
            res.status(404).json({ message: "Subnet not found" });
        }
        
    } catch (error: any) {
        res.status(500).json({ message: error.message });
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

export async function updateSubnet(req: Request, res: Response) {
    const subnetRepo =  new SubnetDrizzleRepository()
    const id = Number(req.params.id)
    try {
        const updatedSubnet = await subnetService.updateSubnet(
            subnetRepo,
            id,
            req.body
        )
        res.status(200).json(updatedSubnet)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteSubnet(req: Request, res: Response) {
    const subnetRepo =  new SubnetDrizzleRepository()
    const id = Number(req.params.id)
    try {
        const deletedSubnetId = await subnetService.deleteSubnet(
            subnetRepo,
            id
        )
        res.status(200).json({ id: deletedSubnetId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}