import { DataCenterEntity, IDataCenter } from "../../domain/dataCenter"
import { ISubnet, SubnetEntity } from "../../domain/subnet"
import { IDataCenterRepository } from "../../persistence/repositories/dataCenter.repository"

export async function getDataCenters(dataCenterRepo: IDataCenterRepository) {
    const dataCenters = await dataCenterRepo.getDataCenters()

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

export async function createDataCenter(
    dataCenterRepo: IDataCenterRepository,
    dataCenter: IDataCenter,
    subnet?: ISubnet
) {
    const dataCenterEntity = new DataCenterEntity(dataCenter)
    if (subnet) {
        const subnetEntity = new SubnetEntity(subnet)
        dataCenterEntity.subnetId = subnetEntity.id as number
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