import { ISubnet } from "../../domain/subnet"
import { SubnetQueryParams } from "../../application/services/subnet.service"

export interface ISubnetRepository {
    getSubnets(subnetQueryParams?: SubnetQueryParams): Promise<ISubnet[]>
    getOtherSubnetCIDRs(id: number): Promise<string[]>
    getSubnetById(id: number): Promise<ISubnet>
    createSubnet(subnet: ISubnet): Promise<number>
    updateSubnet(id: number, subnet: Partial<ISubnet>): Promise<ISubnet>
    deleteSubnet(id: number): Promise<number>
}