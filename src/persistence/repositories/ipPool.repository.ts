import { IIPPool } from "../../domain/ipPool"
import { IPPoolQueryParams } from "../../application/services/ipPool.service"

export interface IIPPoolRepository {
    getIPPools(ipPoolQueryParams?: IPPoolQueryParams): Promise<IIPPool[]>
    getAllIPPoolCIDRs(subnetId: number): Promise<string[]>
    getOtherIPPoolCIDRs(id: number, subnetId: number): Promise<string[]>
    getIPPoolById(id: number): Promise<IIPPool>
    createIPPool(ipPool: IIPPool): Promise<number>
    updateIPPool(id: number, ipPool: Partial<IIPPool>): Promise<IIPPool>
    deleteIPPool(id: number): Promise<number>
}