export interface IRoom {
    id?: number
    name: string
    unit: number
    dataCenterId: number
}

export class RoomEntity implements IRoom {
    id?: number
    name: string
    unit: number
    dataCenterId: number

    constructor (room: IRoom) {
        this.name = room.name
        this.unit = room.unit
        this.dataCenterId = room.dataCenterId
    }
}