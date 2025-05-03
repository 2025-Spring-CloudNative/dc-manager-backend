import { ISubnet } from "../../domain/subnet"

export interface ISubnetRepository {
    getSubnets(): Promise<ISubnet[]>
    getSubnetById(id: number): Promise<ISubnet>
    getSubnetIdByCidr(cidr: string): Promise<number>
    createSubnet(subnet: ISubnet): Promise<number>
    updateSubnet(id: number, subnet: Partial<ISubnet>): Promise<ISubnet>
    deleteSubnet(id: number): Promise<number>
}