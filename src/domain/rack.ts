export interface IRack {
    id?: number
    name: string
    height: number
    tag: string
    createdAt: Date
    updatedAt?: Date | null
    roomId: number   
}

export class RackEntity implements IRack {
    id?: number
    name: string
    height: number
    tag: string
    createdAt: Date
    updatedAt?: Date | null
    roomId: number

    constructor(rack: IRack) {
        this.id = rack.id
        this.name = rack.name
        this.height = rack.height 
        this.tag = rack.tag
        this.createdAt = rack.createdAt
        this.updatedAt = rack.updatedAt
        this.roomId = rack.roomId
    }
}