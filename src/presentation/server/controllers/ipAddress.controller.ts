import { Request, Response } from "express"
import { IPAddressDrizzleRepository } from "../../../persistence/drizzle/ipAddress.persistence"
import * as ipAddressService from "../../../application/services/ipAddress.service"
import { IPAddressStatus } from "../../../domain/ipAddress"
import { SortOrder } from "../../../types/common"

export async function getIPAddresses(req: Request, res: Response) {
    const ipAddressRepo = new IPAddressDrizzleRepository()
    const ipAddressQueryParams: ipAddressService.IPAddressQueryParams = {
        address: req.query.address as string,
        status: req.query.status as IPAddressStatus,
        poolId: Number(req.query.poolId),
        machineId: Number(req.query.machineId),
        sortBy: req.query.sortBy as ipAddressService.IPAddressSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }
    try {
        const ipAddresses = await ipAddressService.getIPAddresses(ipAddressRepo, ipAddressQueryParams)
        res.status(200).json(ipAddresses)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getIPAddressById(req: Request, res: Response) {
    const ipAddressRepo = new IPAddressDrizzleRepository()
    const id = Number(req.params.id)
    try {
        const ipAddress = await ipAddressService.getIPAddressById(ipAddressRepo, id)
        if (ipAddress) {
            res.status(200).json(ipAddress)
        }else {
            res.status(404).json({ message: "IP Address not found." })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createIPAddress(req: Request, res: Response) {
    const ipAddressRepo = new IPAddressDrizzleRepository()

    try {
        const createdIPAddressId = await ipAddressService.createIPAddress(
            ipAddressRepo,
            req.body
        )
        res.status(201).json({ id: createdIPAddressId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateIPAddress(req: Request, res: Response) {
    const ipAddressRepo = new IPAddressDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const updatedIPAddress = await ipAddressService.updateIPAddress(
            ipAddressRepo,
            id,
            req.body
        )
        res.status(200).json(updatedIPAddress)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteIPAddress(req: Request, res: Response) {
    const ipAddressRepo = new IPAddressDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const deletedIPAddressId = await ipAddressService.deleteIPAddress(
            ipAddressRepo, 
            id
        )
        res.status(200).json({ id: deletedIPAddressId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}