export interface IService {
    id?: number
    name: string
    poolId: number
}

export class ServiceEntity implements IService {
    id?: number
    name: string
    poolId: number

    constructor(service: IService) {
        this.id = service.id
        this.name = service.name
        this.poolId = service.poolId
    }
}