import { Request, Response } from 'express'
import { ServiceDrizzleRepository } from "../../../persistence/drizzle/service.persistence"
import * as serviceService from "../../../application/services/service.service"
import { IPAddressDrizzleRepository } from "../../../persistence/drizzle/ipAddress.persistence"
import { IPPoolDrizzleRepository } from "../../../persistence/drizzle/ipPool.persistence"
import { SubnetDrizzleRepository } from "../../../persistence/drizzle/subnet.persistence"
import { RackDrizzleRepository } from '../../../persistence/drizzle/rack.persistence'
import { MachineDrizzleRepository } from '../../../persistence/drizzle/machine.persistence'
import { SortOrder } from '../../../types/common'


export async function getServices(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()
    const serviceQueryParams: serviceService.ServiceQueryParams = {
        name: req.query.name as string,
        poolId: Number(req.query.poolId),
        sortBy: req.query.sortBy as serviceService.ServiceSortBy,
        sortOrder: req.query.sortOrder as SortOrder
    }

    try {
        if (req.query.machineIP) {
            const ipPoolRepo = new IPPoolDrizzleRepository()
            const ipAddressRepo = new IPAddressDrizzleRepository()
            const services = await serviceService.getServicesByMachineIP(
                serviceRepo,
                ipPoolRepo,
                ipAddressRepo,
                req.query.machineIP as string
            )
            res.status(200).json(services)
        }else {
            const services = await serviceService.getServices(serviceRepo, serviceQueryParams)
            res.status(200).json(services)
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getServiceById(req: Request, res: Response) {
    const serviceRepo = new ServiceDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const service = await serviceService.getServiceById(serviceRepo, id)
        res.status(200).json(service)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getServiceRackUtilization(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const machineRepo = new MachineDrizzleRepository()
    const id = Number(req.params.id)

    try {
        const utilization = await serviceService.getServiceRackUtilization(
            rackRepo,
            machineRepo,
            id
        )
        res.status(200).json({ utilization })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getServiceFaultRate(req: Request, res: Response) {
    const rackRepo = new RackDrizzleRepository()
    const machineRepo = new MachineDrizzleRepository()
    const id = Number(req.params.id)
    
    try {
        const faultRate = await serviceService.getServiceFaultRate(
            rackRepo,
            machineRepo,
            id
        )
        res.status(200).json({ faultRate })
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