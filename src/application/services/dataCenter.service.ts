import { IDataCenter, DataCenterEntity } from "../../domain/dataCenter"
import { SubnetEntity } from "../../domain/subnet"
import { IDataCenterRepository } from "../../persistence/repositories/dataCenter.repository"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"
import { SortOrder } from "../../types/common"

export type DataCenterSortBy = 'name' | 'location'

export interface DataCenterQueryParams {
    name?: string
    location?: string
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

export async function getDataCentersWithSubnet(dataCenterRepo: IDataCenterRepository) {
    const dataCentersWithSubnet = await dataCenterRepo.getDataCentersWithSubnet()

    return dataCentersWithSubnet
}

export async function getDataCenterById(
    dataCenterRepo: IDataCenterRepository,
    id: number
) {
    const dataCenter = await dataCenterRepo.getDataCenterById(id)

    return dataCenter
}

export async function getDataCenterByIdWithSubnet(
    dataCenterRepo: IDataCenterRepository,
    id: number
) {
    const dataCenterWithSubnet = await dataCenterRepo.getDataCenterByIdWithSubnet(id)

    return dataCenterWithSubnet
}

export async function createDataCenter(
    dataCenterRepo: IDataCenterRepository,
    subnetRepo: ISubnetRepository,
    dataCenter: IDataCenter,
    subnetCidr?: string
) {
    const dataCenterEntity = new DataCenterEntity(dataCenter)
    // if the user selects a subnet, then assign the subnetId to the datacenter
    if (subnetCidr) {
        //! TODO: Assigning subnet CIDR is ambiguous when creating dataCenter
        const subnetId = await subnetRepo.getSubnetIdByCidr(subnetCidr)
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
    const updatedDataCenter = await dataCenterRepo.updateDataCenter(id, dataCenter)

    return updatedDataCenter
}

export async function deleteDataCenter(
    dataCenterRepo: IDataCenterRepository,
    id: number
) {
    const deletedDataCenterId  = await dataCenterRepo.deleteDataCenter(id)

    return deletedDataCenterId
}