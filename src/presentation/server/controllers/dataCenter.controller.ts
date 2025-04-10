import { Request, Response } from "express"
import { DataCenterDrizzleRepository } from "../../../persistence/drizzle/dataCenter.persistence"
import * as dataCenterService from "../../../application/services/dataCenter.service"

export async function getDataCenters(req: Request, res: Response) {
    const dataCenterRepo = new DataCenterDrizzleRepository()

    try {
        const dataCenters = await dataCenterService.getDataCenters(dataCenterRepo)
        res.status(200).json(dataCenters)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createDataCenter(req: Request, res: Response) {
    const dataCenterRepo = new DataCenterDrizzleRepository()

    try {
        const createdDataCenterId = await dataCenterService.createDataCenter(
            dataCenterRepo,
            req.body
        )
        res.status(200).json({ id: createdDataCenterId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
