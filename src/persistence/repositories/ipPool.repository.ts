import { IIPPool } from "../../domain/ipPool"

export interface IIPPoolRepository {
    getIPPools(): Promise<IIPPool[]>
    getAllIPPoolCIDRs(): Promise<string[]>
    getOtherIPPoolCIDRs(id: number): Promise<string[]>
    getIPPoolById(id: number): Promise<IIPPool>
    createIPPool(ipPool: IIPPool): Promise<number>
    updateIPPool(id: number, ipPool: Partial<IIPPool>): Promise<IIPPool>
    deleteIPPool(id: number): Promise<number>
}