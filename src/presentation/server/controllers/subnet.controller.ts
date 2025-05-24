import { Request, Response } from "express"
import { SubnetDrizzleRepository } from "../../../persistence/drizzle/subnet.persistence"
import * as subnetService from "../../../application/services/subnet.service"
import { SortOrder } from "../../../types/common"
import { IPPoolDrizzleRepository } from "../../../persistence/drizzle/ipPool.persistence"
import { IPAddressDrizzleRepository } from "../../../persistence/drizzle/ipAddress.persistence"

export async function getSubnets(req: Request, res: Response) {
    const subnetRepo =  new SubnetDrizzleRepository()
    const subnetQueryParams: subnetService.SubnetQueryParams = {
        cidr: req.query.cidr as string,
        netmask: req.query.netmask as string,
        gateway: req.query.gateway as string,
        sortBy: req.query.sortBy as subnetService.SubnetSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }

    try {
        const subnets = await subnetService.getSubnets(subnetRepo, subnetQueryParams)
        res.status(200).json(subnets)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getSubnetById(req: Request, res: Response) {
    const subnetRepo = new SubnetDrizzleRepository();
    const id = Number(req.params.id)
    const subnetQueryParams: subnetService.SubnetQueryParams = {
        cidr: req.query.cidr as string,
        netmask: req.query.netmask as string,
        gateway: req.query.gateway as string,
        sortBy: req.query.sortBy as subnetService.SubnetSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }

    try {
        const subnet = await subnetService.getSubnetById(subnetRepo, id)
        if (subnet) {
            res.status(200).json(subnet)
        } else {
            res.status(404).json({ message: "Subnet not found" })
        }
        
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getSubnetIPUtilization(req: Request, res: Response) {
    const subnetRepo = new SubnetDrizzleRepository()
    const ipPoolRepo = new IPPoolDrizzleRepository()
    const ipAddressRepo = new IPAddressDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const utilization: number = await subnetService.getSubnetIPUtilization(
            subnetRepo,
            ipPoolRepo,
            ipAddressRepo,
            id
        )   
        res.status(200).json({ utilization })
    } catch(error: any) {
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

export async function extendSubnet(req: Request, res: Response) {
    const subnetRepo = new SubnetDrizzleRepository()
    const id = Number(req.params.id)
    const { cidr, netmask, gateway } = req.body

    try {
        const extendedSubnet = await subnetService.extendSubnet(
            subnetRepo,
            id,
            cidr,
            netmask,
            gateway
        ) 
        res.status(200).json(extendedSubnet)
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