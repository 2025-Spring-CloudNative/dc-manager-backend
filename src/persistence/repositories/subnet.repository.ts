import { ISubnet } from "../../domain/subnet"

// TODO
export interface ISubnetRepository {
    getSubnets(): Promise<ISubnet[]>
    // getSubnetById(id: number): Promise<ISubnet>
    createSubnet(subnet: ISubnet): Promise<number>
    // updateSubnet(id: number, subnet: ISubnet): Promise<ISubnet>
    // deleteSubnet(id: number): Promise<number>
}