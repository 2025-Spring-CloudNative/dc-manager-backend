import { IDataCenter, DataCenterEntity } from "../../domain/dataCenter"
import { SubnetEntity } from "../../domain/subnet"
import { IDataCenterRepository } from "../../persistence/repositories/dataCenter.repository"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"
import { IIPPoolRepository } from "../../persistence/repositories/ipPool.repository"
import { IServiceRepository } from "../../persistence/repositories/service.repository"
import { SortOrder } from "../../types/common"

export type DataCenterSortBy = 'name' | 'location'

export interface DataCenterQueryParams {
    name?: string
    location?: string
    subnetId?: number
    sortBy?: DataCenterSortBy
    sortOrder?: SortOrder
}

export async function getDataCenters(
    dataCenterRepo: IDataCenterRepository, 
    dataCenterQueryParams: DataCenterQueryParams
) {
    const dataCenters = await dataCenterRepo.getDataCenters(dataCenterQueryParams)

    return dataCenters
}

export async function getDataCenterById(
    dataCenterRepo: IDataCenterRepository,
    id: number
) {
    const dataCenter = await dataCenterRepo.getDataCenterById(id)

    return dataCenter
}

export async function createDataCenter(
    dataCenterRepo: IDataCenterRepository,
    subnetRepo: ISubnetRepository,
    dataCenter: IDataCenter,
    subnetId?: number
) {
    const dataCenterEntity = new DataCenterEntity(dataCenter)
    // if the user selects a subnet, then assign the subnetId to the datacenter
    if (subnetId) {
        dataCenterEntity.subnetId = subnetId
    }else {
        const subnetEntity = new SubnetEntity({
            cidr: "192.168.0.0/16",
            netmask: "255.255.0.0",
            gateway: "192.168.0.1"
        })
        const createdSubnetId = await subnetRepo.createSubnet(subnetEntity)
        dataCenterEntity.subnetId = createdSubnetId
    }
    const createdDataCenterId = await dataCenterRepo.createDataCenter(dataCenterEntity)

    return createdDataCenterId
}

export async function updateDataCenter(
    dataCenterRepo: IDataCenterRepository,
    id: number,
    dataCenter: Partial<IDataCenter>
) {
    const prevDataCenter = await dataCenterRepo.getDataCenterById(id)
    const prevDataCenterEntity = new DataCenterEntity(prevDataCenter)

    const restrictedField: (keyof IDataCenter) = 'id'
    if (dataCenter[restrictedField] && dataCenter[restrictedField] !== prevDataCenterEntity[restrictedField]) {
        throw new Error(`Cannot update restricted field: ${restrictedField}`)
    }
    
    const updatedDataCenter = await dataCenterRepo.updateDataCenter(id, dataCenter)

    return updatedDataCenter
}

export async function deleteDataCenter(
    dataCenterRepo: IDataCenterRepository,
    subnetRepo: ISubnetRepository,
    ipPoolRepo: IIPPoolRepository,
    serviceRepo: IServiceRepository,
    id: number
) {
    const dataCenter = await dataCenterRepo.getDataCenterById(id)
    const subnet = await subnetRepo.getSubnetById(dataCenter.subnetId!)
    const ipPools = await ipPoolRepo.getIPPools({
        subnetId: subnet.id!
    })
    for (const ipPool of ipPools) {
        const [service] = await serviceRepo.getServices({
            poolId: ipPool.id!
        })
        await serviceRepo.deleteService(service?.id!)
        await ipPoolRepo.deleteIPPool(ipPool.id!)
    }

    const deletedDataCenterId  = await dataCenterRepo.deleteDataCenter(id)
    return deletedDataCenterId
}