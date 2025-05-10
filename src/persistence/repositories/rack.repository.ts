import { IRack } from "../../domain/rack"
import { RackQueryParams } from "../../application/services/rack.service"

export interface IRackRepository {
    getRacks(rackQueryParams?: RackQueryParams): Promise<IRack[]>
    getRackById(id: number): Promise<IRack>
    getRacksByServiceId(serviceId: number): Promise<IRack[]>
    createRack(rack: IRack): Promise<number>
    updateRack(id: number, rack: Partial<IRack>): Promise<IRack>
    deleteRack(id: number): Promise<number>
}