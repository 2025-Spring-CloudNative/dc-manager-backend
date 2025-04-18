import { IDataCenter } from "../../domain/dataCenter"
import { IDataCenterRepository } from "../../persistence/repositories/dataCenter.repository"

export async function getDataCenters(dataCenterRepo: IDataCenterRepository) {
    const dataCenters = await dataCenterRepo.getDataCenters()

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
    dataCenter: IDataCenter
) {
    const createdDataCenterId = await dataCenterRepo.createDataCenter(dataCenter)

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