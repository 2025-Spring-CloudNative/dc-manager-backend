import { Request, Response } from "express"
import { DataCenterDrizzleRepository } from "../../../persistence/drizzle/dataCenter.persistence"
import * as dataCenterService from "../../../application/services/dataCenter.service"
import { SubnetDrizzleRepository } from "../../../persistence/drizzle/subnet.persistence"
import { SortOrder } from "../../../types/common"

export async function getDataCenters(req: Request, res: Response) {
    const dataCenterRepo = new DataCenterDrizzleRepository()
    const dataCenterQueryParams: dataCenterService.DataCenterQueryParams = {
        name: req.query.name as string,
        location: req.query.location as string,
        sortBy: req.query.sortBy as dataCenterService.DataCenterSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }

    try {
        const dataCenters = await dataCenterService.getDataCenters(
            dataCenterRepo,
            dataCenterQueryParams
        )
        res.status(200).json(dataCenters)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getDataCenterById(req: Request, res: Response) {
    const dataCenterRepo = new DataCenterDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const dataCenter = await dataCenterService.getDataCenterById(dataCenterRepo, id)
        if (dataCenter) {
            res.status(200).json(dataCenter)
        } else {
            res.status(404).json({ message: "Data center not found" })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createDataCenter(req: Request, res: Response) {
    const dataCenterRepo = new DataCenterDrizzleRepository()
    const subnetRepo = new SubnetDrizzleRepository()
    try {
        const { dataCenter, subnetId } = req.body
        const createdDataCenterId = await dataCenterService.createDataCenter(
            dataCenterRepo,
            subnetRepo,
            dataCenter,
            subnetId
        )
        res.status(200).json({ id: createdDataCenterId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateDataCenter(req: Request, res: Response) {
    const dataCenterRepo = new DataCenterDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const updatedDataCenter = await dataCenterService.updateDataCenter(
            dataCenterRepo, 
            id, 
            req.body
        )
        res.status(200).json(updatedDataCenter)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteDataCenter(req: Request, res: Response) {
    const dataCenterRepo = new DataCenterDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const deletedId = await dataCenterService.deleteDataCenter(
            dataCenterRepo, 
            id
        )
        if (deletedId) {
            res.status(200).json({ id: deletedId })
        } else {
            res.status(404).json({ message: "Data center not found" })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}