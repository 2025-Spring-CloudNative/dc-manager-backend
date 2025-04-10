import { Request, Response } from "express"
import * as dataCenterService from "../../../application/services/dataCenter.service"

export async function getDataCenters(req: Request, res: Response) {
    try {
        const dataCenters = await dataCenterService.getDataCenters()
        res.status(200).json(dataCenters)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
