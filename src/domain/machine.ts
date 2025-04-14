export interface IMachine {
    id?: number
    name: string
    unit: number
    macAddress: string
    createdAt: Date
    rackId: number
    status: string
    serviceId: number
}

export class MachineEntity implements IMachine {
    id?: number
    name: string
    unit: number
    macAddress: string
    createdAt: Date
    rackId: number
    status: string
    serviceId: number

    constructor(machine: IMachine) {
        this.id = machine.id
        this.name = machine.name
        this.unit = machine.unit
        this.macAddress = machine.macAddress
        this.createdAt = machine.createdAt
        this.rackId = machine.rackId
        this.status = machine.status
        this.serviceId = machine.serviceId
    }
}