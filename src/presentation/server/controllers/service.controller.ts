import { Request, Response } from 'express'
import { ServiceDrizzleRepository } from "../../../persistence/drizzle/service.persistence"
import * as serviceService from "../../../application/services/service.service"

export async function getServices(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()

    try {
        const services = await serviceService.getServices(serviceRepo)
        res.status(200).json(services)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createService(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()

    try {
        const createdServiceId = await serviceService.createService(
            serviceRepo,
            req.body
        )
        res.status(200).json({ id: createdServiceId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}