import * as serviceService from "../../../src/application/services/service.service"
import { IServiceRepository } from "../../../src/persistence/repositories/service.repository"
import { IService } from "../../../src/domain/service"

const mockServiceRepo: jest.Mocked<IServiceRepository> = {
    getServices: jest.fn(),
    getServiceById: jest.fn(),
    createService: jest.fn(),
    updateService: jest.fn(),
    deleteService: jest.fn()
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe("serviceService - getServices", () => {
    it("should fetch and return all services", async () => {
        const services: IService[] = [
            { id: 1, name: "ServiceA", poolId: 100 },
            { id: 2, name: "ServiceB", poolId: 200 }
        ]
        mockServiceRepo.getServices.mockResolvedValue(services)

        const result = await serviceService.getServices(mockServiceRepo, {} as any)

        expect(mockServiceRepo.getServices).toHaveBeenCalled()
        expect(result).toEqual(services)
    })
})

describe("serviceService - getServiceById", () => {
    it("should fetch and return the service by id", async () => {
        const svc: IService = { id: 1, name: "ServiceA", poolId: 100 }
        mockServiceRepo.getServiceById.mockResolvedValue(svc)

        const result = await serviceService.getServiceById(
            mockServiceRepo,
            svc.id!
        )

        expect(mockServiceRepo.getServiceById).toHaveBeenCalledWith(svc.id!)
        expect(result).toEqual(svc)
    })
})

describe("serviceService - createService", () => {
    it("should create a service and return its id", async () => {
        const newService: IService = { name: "NewService", poolId: 300 }
        const createdId = 3
        mockServiceRepo.createService.mockResolvedValue(createdId)

        // Mock dependencies for createService
        const mockIpAddressRepo = {
            createIPAddress: jest.fn()
        } as any
        const mockIpPoolRepo = {
            getAllIPPoolCIDRs: jest.fn().mockResolvedValue([]),
            createIPPool: jest.fn().mockResolvedValue(123)
        } as any
        const mockSubnetRepo = {
            getSubnetById: jest.fn().mockResolvedValue({ cidr: "10.0.0.0/8" })
        } as any
        const mockDataCenter = { subnetId: 1 } as any
        const cidrFromUser = "10.0.1.0/24"

        // Mock NetUtils static methods if needed
        jest.spyOn(require("../../../src/domain/utils/net").NetUtils, "isCIDRWithinSubnet").mockReturnValue(true)
        jest.spyOn(require("../../../src/domain/utils/net").NetUtils, "checkCIDROverlap").mockReturnValue(false)
        jest.spyOn(require("../../../src/domain/utils/net").NetUtils, "getIpAddressesFromCIDR").mockReturnValue(["10.0.1.1", "10.0.1.2"])
        const result = await serviceService.createService(
            mockServiceRepo,
            mockIpAddressRepo,
            mockIpPoolRepo,
            mockSubnetRepo,
            newService,
            mockDataCenter,
            cidrFromUser
        )

        expect(mockServiceRepo.createService).toHaveBeenCalledWith(expect.anything())
        expect(result).toEqual(createdId)
    })
})

describe("serviceService - updateService", () => {
    it("should update and return the updated service", async () => {
        const updates: Partial<IService> = { name: "UpdatedService" }
        const updatedSvc: IService = {
            id: 1,
            name: "UpdatedService",
            poolId: 100
        }
        mockServiceRepo.updateService.mockResolvedValue(updatedSvc)

        const result = await serviceService.updateService(
            mockServiceRepo,
            1,
            updates
        )

        expect(mockServiceRepo.updateService).toHaveBeenCalledWith(1, updates)
        expect(result).toEqual(updatedSvc)
    })
})

describe("serviceService - deleteService", () => {
    it("should delete and return the id of deleted service", async () => {
        const deletedId = 1
        mockServiceRepo.deleteService.mockResolvedValue(deletedId)

        // Mock dependencies for deleteService
        const mockRackRepo = {
            getRacksByServiceId: jest.fn().mockResolvedValue([]),
            updateRack: jest.fn()
        } as any
        const mockIpPoolRepo = {
            deleteIPPool: jest.fn()
        } as any

        mockServiceRepo.getServiceById.mockResolvedValue({ id: deletedId, name: "ServiceA", poolId: 100 })    
        const result = await serviceService.deleteService(
            mockServiceRepo,
            mockRackRepo,
            mockIpPoolRepo,
            deletedId
        )

        expect(mockServiceRepo.deleteService).toHaveBeenCalledWith(deletedId)
        expect(result).toEqual(deletedId)
    })
})
