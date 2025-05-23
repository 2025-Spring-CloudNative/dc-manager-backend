import { Request, Response } from 'express'
import { ServiceDrizzleRepository } from "../../../persistence/drizzle/service.persistence"
import * as serviceService from "../../../application/services/service.service"
import { IPAddressDrizzleRepository } from "../../../persistence/drizzle/ipAddress.persistence"
import { IPPoolDrizzleRepository } from "../../../persistence/drizzle/ipPool.persistence"
import { SubnetDrizzleRepository } from "../../../persistence/drizzle/subnet.persistence"
import { RackDrizzleRepository } from '../../../persistence/drizzle/rack.persistence'


export async function getServices(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()

    try {
        const services = await serviceService.getServices(serviceRepo)
        res.status(200).json(services)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getServiceById(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()
    const id = Number(req.params.id)
    try {
        const service = await serviceService.getServiceById(
            serviceRepo,
            id
        )
        res.status(200).json(service)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createService(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()
    const ipAddressRepo = new IPAddressDrizzleRepository()
    const ipPoolRepo = new IPPoolDrizzleRepository()
    const subnetRepo =  new SubnetDrizzleRepository()
    try {
        const { service, dataCenter, cidrFromUser } = req.body
        const createdServiceId = await serviceService.createService(
            serviceRepo,
            ipAddressRepo,
            ipPoolRepo,
            subnetRepo,
            service,
            dataCenter,
            cidrFromUser
        )
        res.status(200).json({ id: createdServiceId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateService(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const updatedService = await serviceService.updateService(
            serviceRepo,
            id,
            req.body
        )
        res.status(200).json(updatedService)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteService(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()
    const rackRepo = new RackDrizzleRepository()
    const ipPoolRepo = new IPPoolDrizzleRepository()
    
    const id = Number(req.params.id)

    try {
        const deletedServiceId = await serviceService.deleteService(
            serviceRepo,
            rackRepo,
            ipPoolRepo,
            id
        )
        res.status(200).json({ id: deletedServiceId })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}