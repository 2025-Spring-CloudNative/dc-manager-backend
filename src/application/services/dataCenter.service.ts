import { IDataCenter } from "../../domain/dataCenter"
import { IDataCenterRepository } from "../../persistence/repositories/dataCenter.repository"

export async function getDataCenters(dataCenterRepo: IDataCenterRepository) {
    const dataCenters = await dataCenterRepo.getDataCenters()

    return dataCenters
}

export async function createDataCenter(
    dataCenterRepo: IDataCenterRepository,
    dataCenter: IDataCenter
) {
    const createdDataCenterId = await dataCenterRepo.createDataCenter(dataCenter)

    return createdDataCenterId
}
