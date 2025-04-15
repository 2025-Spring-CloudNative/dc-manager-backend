import { IIPPool } from "../../domain/ipPool"

// TODO
export interface IIPPoolRepository {
    getIPPools(): Promise<IIPPool[]>
    // getIPPoolById(id: number): Promise<IIPPool>
    createIPPool(ipPool: IIPPool): Promise<number>
    // updateIPPool(id: number, ipPool: IIPPool): Promise<IIPPool>
    // deleteIPPool(id: number): Promise<number>
}