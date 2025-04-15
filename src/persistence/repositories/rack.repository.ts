import { IRack } from "../../domain/rack"

// TODO
export interface IRackRepository {
    getRacks(): Promise<IRack[]>
    // getRackById(id: number): Promise<IRack>
    createRack(rack: IRack): Promise<number>
    // updateRack(id: number, rack: IRack): Promise<IRack>
    // deleteRack(id: number): Promise<number>
}