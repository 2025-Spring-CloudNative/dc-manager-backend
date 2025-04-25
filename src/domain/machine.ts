export interface IMachine {
    id?: number
    name: string
    startUnit: number
    unit: number
    macAddress: string
    createdAt?: Date
    rackId: number
    status: string
}

export class MachineEntity implements IMachine {
    id?: number
    name: string
    startUnit: number
    unit: number
    macAddress: string
    createdAt?: Date
    rackId: number
    status: string

    constructor(machine: IMachine) {
        this.id = machine.id
        this.name = machine.name
        this.startUnit = machine.startUnit
        this.unit = machine.unit
        this.macAddress = machine.macAddress
        this.createdAt = machine.createdAt
        this.rackId = machine.rackId
        this.status = machine.status
    }
}
