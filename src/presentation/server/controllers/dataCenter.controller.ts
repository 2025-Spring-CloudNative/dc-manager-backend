import { Request, Response } from "express"
import { DataCenterDrizzleRepository } from "../../../persistence/drizzle/dataCenter.persistence"
import * as dataCenterService from "../../../application/services/dataCenter.service"

export async function getDataCenters(req: Request, res: Response) {
    /* 
        #swagger.tags = ['data-center']
        #swagger.summary = 'Retrieve all data centers'
        #swagger.responses[200] = {
            description: 'An array of DataCenter objects',
            schema: [{ $ref: '#/definitions/DataCenter' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    const dataCenterRepo = new DataCenterDrizzleRepository()

    try {
        const dataCenters = await dataCenterService.getDataCenters(
            dataCenterRepo
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
        const dataCenter = await dataCenterService.getDataCenterById(
            dataCenterRepo, 
            id
        )
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
    /* 
        #swagger.tags = ['data-center']
        #swagger.summary = 'create a data center'
        #swagger.requestBody = {
            required: true,
            description: 'Data center object',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/DataCenterInput' }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'id of the created data center',
            schema: {id: 'number'}
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    const dataCenterRepo = new DataCenterDrizzleRepository()
    console.log("dataCenterRepo", dataCenterRepo)
    console.log("req.body", req.body)
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