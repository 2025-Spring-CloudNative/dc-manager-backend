export interface IRack {
    id?: number
    name: string
    height: number
    tag: string
    createdAt?: Date
    updatedAt?: Date
    roomId: number
    serviceId?: number | null
}

export class RackEntity implements IRack {
    id?: number
    name: string
    height: number
    tag: string
    createdAt?: Date
    updatedAt?: Date
    roomId: number
    serviceId?: number | null

    constructor(rack: IRack) {
        this.id = rack.id
        this.name = rack.name
        this.height = rack.height
        this.tag = rack.tag
        this.createdAt = rack.createdAt
        this.updatedAt = rack.updatedAt
        this.roomId = rack.roomId
        this.serviceId = rack.serviceId
    }
}
