export interface IService {
    id?: number
    name: string
}

export class ServiceEntity implements IService {
    id?: number
    name: string

    constructor(service: IService) {
        this.id = service.id
        this.name = service.name
    }
}