export interface IService {
    id?: number
    name: string
    poolId: number | null
}

export class ServiceEntity implements IService {
    id?: number
    name: string
    poolId: number | null

    constructor(service: IService) {
        this.id = service.id
        this.name = service.name
        this.poolId = service.poolId
    }
}