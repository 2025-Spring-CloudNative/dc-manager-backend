import * as machineService from "../../../src/application/services/machine.service"
import { IMachineRepository } from "../../../src/persistence/repositories/machine.repository"
import { IMachine, MachineStatus } from "../../../src/domain/machine"

const mockMachineRepo: jest.Mocked<IMachineRepository> = {
    getMachines: jest.fn(),
    getMachinesWithIPAddress: jest.fn(),
    getMachineById: jest.fn(),
    getMachineByIdWithIPAddress: jest.fn(),
    createMachine: jest.fn(),
    updateMachine: jest.fn(),
    deleteMachine: jest.fn()
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe("machineService - getMachines", () => {
    it("should fetch and return all machines", async () => {
        const machines: IMachine[] = [
            {
                id: 1,
                name: "Machine1",
                startUnit: 101,
                unit: 101,
                macAddress: "AA:BB:CC:DD:EE:FF",
                createdAt: new Date("2025-04-18T00:00:00Z"),
                rackId: 10,
                status: MachineStatus.Active
            },
            {
                id: 2,
                name: "Machine2",
                startUnit: 102,
                unit: 102,
                macAddress: "11:22:33:44:55:66",
                createdAt: new Date("2025-04-18T01:00:00Z"),
                rackId: 20,
                status: MachineStatus.Inactive
            }
        ]
        mockMachineRepo.getMachines.mockResolvedValue(machines)

        const result = await machineService.getMachines(mockMachineRepo, {} as any)

        expect(mockMachineRepo.getMachines).toHaveBeenCalled()
        expect(result).toEqual(machines)
    })
})

describe("machineService - getMachineById", () => {
    it("should fetch and return the machine by id", async () => {
        const machine: IMachine = {
            id: 1,
            name: "Machine1",
            startUnit: 101,
            unit: 101,
            macAddress: "AA:BB:CC:DD:EE:FF",
            createdAt: new Date("2025-04-18T00:00:00Z"),
            rackId: 10,
            status: MachineStatus.Active
        }
        mockMachineRepo.getMachineById.mockResolvedValue(machine)

        const result = await machineService.getMachineById(
            mockMachineRepo,
            machine.id!
        )

        expect(mockMachineRepo.getMachineById).toHaveBeenCalledWith(machine.id!)
        expect(result).toEqual(machine)
    })
})

describe("machineService - createMachine", () => {
    it("should create a machine and return its id", async () => {
        const machine: IMachine = {
            name: "NewMachine",
            startUnit: 103,
            unit: 103,
            macAddress: "FF:EE:DD:CC:BB:AA",
            rackId: 30,
            status: MachineStatus.Active,
        }
        const createdId = 1
        mockMachineRepo.createMachine.mockResolvedValue(createdId)

        // Mock dependencies required by createMachine
        const mockIpAddressRepo = {
            getIPAddresses: jest.fn().mockResolvedValue([]),
            getIPAddressesByPoolId: jest.fn().mockResolvedValue([]),
            updateIPAddress: jest.fn()
        } as any
        const mockRackRepo = {
            getRackById: jest.fn().mockResolvedValue({ serviceId: 1 })
        } as any
        const mockServiceRepo = {
            getServiceById: jest.fn().mockResolvedValue({ poolId: 1 })
        } as any
        const result = await machineService.createMachine(
            mockMachineRepo,
            mockIpAddressRepo,
            mockRackRepo,
            mockServiceRepo,
            machine
        )

        expect(mockMachineRepo.createMachine).toHaveBeenCalledWith(machine)
        expect(result).toEqual(createdId)
    })
})

describe("machineService - updateMachine", () => {
    it("should update and return the updated machine", async () => {
        const updates: Partial<IMachine> = { status: MachineStatus.Inactive }
        const updatedMachine: IMachine = {
            id: 1,
            name: "Machine1",
            startUnit: 101,
            unit: 101,
            macAddress: "AA:BB:CC:DD:EE:FF",
            createdAt: new Date("2025-04-18T00:00:00Z"),
            rackId: 10,
            status: MachineStatus.Inactive
        }
        mockMachineRepo.getMachineById.mockResolvedValue({
            id: 1,
            name: "Machine1",
            startUnit: 101,
            unit: 101,
            macAddress: "AA:BB:CC:DD:EE:FF",
            createdAt: new Date("2025-04-18T00:00:00Z"),
            rackId: 10,
            status: MachineStatus.Active
        })
        mockMachineRepo.updateMachine.mockResolvedValue(updatedMachine)

        const result = await machineService.updateMachine(
            mockMachineRepo,
            1,
            updates
        )

        expect(mockMachineRepo.updateMachine).toHaveBeenCalledWith(1, updates)
        expect(result).toEqual(updatedMachine)
    })
})

describe("machineService - deleteMachine", () => {
    it("should delete and return the id of deleted machine", async () => {
        const deletedId = 1
        mockMachineRepo.deleteMachine.mockResolvedValue(deletedId)

        // Mock ipAddressRepo with required methods
        const mockIpAddressRepo = {
            getIPAddressByMachineId: jest.fn().mockResolvedValue({}),
            updateIPAddress: jest.fn()
        } as any

        const result = await machineService.deleteMachine(
            mockMachineRepo,
            mockIpAddressRepo,
            deletedId
        )

        expect(mockMachineRepo.deleteMachine).toHaveBeenCalledWith(deletedId)
        expect(result).toEqual(deletedId)
    })
})
