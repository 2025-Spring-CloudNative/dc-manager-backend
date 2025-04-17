import { IRack } from "../../domain/rack"

export interface IRackRepository {
    getRacks(): Promise<IRack[]>
    getRackById(id: number): Promise<IRack>
    createRack(rack: IRack): Promise<number>
    updateRack(id: number, rack: Partial<IRack>): Promise<IRack>
    deleteRack(id: number): Promise<number>
}