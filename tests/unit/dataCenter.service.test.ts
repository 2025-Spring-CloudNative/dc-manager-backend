import * as dataCenterService from "../../src/application/services/dataCenter.service"
import { IDataCenterRepository } from "../../src/persistence/repositories/dataCenter.repository"

const mockDataCenterRepo: jest.Mocked<IDataCenterRepository> = {
    getDataCenters: jest.fn(),
    getDataCenterById: jest.fn(),
    createDataCenter: jest.fn(),
    updateDataCenter: jest.fn(),
    deleteDataCenter: jest.fn()
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe("dataCenterService - getDataCenters", () => {
    it("should fetch and return all data centers", async () => {
        const dataCenters = [
            { id: 1, name: "DC1", location: "Loc1", subnetId: 10 },
            { id: 2, name: "DC2", location: "Loc2", subnetId: 20 }
        ]
        mockDataCenterRepo.getDataCenters.mockResolvedValue(dataCenters)

        const result =
            await dataCenterService.getDataCenters(mockDataCenterRepo)

        expect(mockDataCenterRepo.getDataCenters).toHaveBeenCalled()
        expect(result).toEqual(dataCenters)
    })
})

describe("dataCenterService - getDataCenterById", () => {
    it("should fetch and return the data center by id", async () => {
        const dc = { id: 1, name: "DC1", location: "Loc1", subnetId: 10 }
        mockDataCenterRepo.getDataCenterById.mockResolvedValue(dc)

        const result = await dataCenterService.getDataCenterById(
            mockDataCenterRepo,
            dc.id
        )

        expect(mockDataCenterRepo.getDataCenterById).toHaveBeenCalledWith(dc.id)
        expect(result).toEqual(dc)
    })
})

describe("dataCenterService - createDataCenter", () => {
    it("should create a data center and return its id", async () => {
        const dataCenter = {
            name: "Test Data Center",
            location: "Test Location",
            subnetId: 1
        }
        const createdId = 1
        mockDataCenterRepo.createDataCenter.mockResolvedValue(createdId)

        const result = await dataCenterService.createDataCenter(
            mockDataCenterRepo,
            dataCenter
        )

        expect(mockDataCenterRepo.createDataCenter).toHaveBeenCalledWith(
            dataCenter
        )
        expect(result).toEqual(createdId)
    })
})

describe("dataCenterService - updateDataCenter", () => {
    it("should update and return the updated data center", async () => {
        const updatedFields = { location: "NewLoc" }
        const updatedDC = {
            id: 1,
            name: "DC1",
            location: "NewLoc",
            subnetId: 10
        }
        mockDataCenterRepo.updateDataCenter.mockResolvedValue(updatedDC)

        const result = await dataCenterService.updateDataCenter(
            mockDataCenterRepo,
            1,
            updatedFields
        )

        expect(mockDataCenterRepo.updateDataCenter).toHaveBeenCalledWith(
            1,
            updatedFields
        )
        expect(result).toEqual(updatedDC)
    })
})

describe("dataCenterService - deleteDataCenter", () => {
    it("should delete and return the id of deleted data center", async () => {
        const deletedId = 1
        mockDataCenterRepo.deleteDataCenter.mockResolvedValue(deletedId)

        const result = await dataCenterService.deleteDataCenter(
            mockDataCenterRepo,
            deletedId
        )

        expect(mockDataCenterRepo.deleteDataCenter).toHaveBeenCalledWith(
            deletedId
        )
        expect(result).toEqual(deletedId)
    })
})
