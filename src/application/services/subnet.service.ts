import { ISubnet, SubnetEntity } from "../../domain/subnet"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"
import { SortOrder } from "../../types/common"

export type SubnetSortBy = 'cidr' | 'createdAt' | 'updatedAt'

export interface SubnetQueryParams {
    cidr?: string
    netmask?: string
    gateway?: string
    sortBy?: SubnetSortBy
    sortOrder?: SortOrder
}

export async function getSubnets(
    subnetRepo: ISubnetRepository,
    subnetQueryParams: SubnetQueryParams
) {
    const subnets = await subnetRepo.getSubnets(subnetQueryParams)

    return subnets
}

export async function getSubnetById(
    subnetRepo: ISubnetRepository,
    id: number
) {
    const subnet = await subnetRepo.getSubnetById(id)

    return subnet
}

export async function createSubnet(
    subnetRepo: ISubnetRepository,
    subnet: ISubnet
) {
    const subnetEntity = new SubnetEntity(subnet)
    const createdSubnetId = await subnetRepo.createSubnet(subnetEntity)

    return createdSubnetId
}

export async function updateSubnet(
    subnetRepo: ISubnetRepository,
    id: number,
    subnet: Partial<ISubnet>
) {
    const prevSubnet = await subnetRepo.getSubnetById(id)
    const prevSubnetEntity = new SubnetEntity(prevSubnet)

    const restrictedFields: (keyof ISubnet)[] = [
        'createdAt', 'updatedAt'
    ]

    for (const field of restrictedFields) {
        if (subnet[field] && subnet[field] !== prevSubnetEntity[field]) {
            throw new Error(`Cannot update restricted field: ${field}`)
        }
    }

    const updatedSubnet = await subnetRepo.updateSubnet(id, subnet)

    return updatedSubnet
}

export async function deleteSubnet(subnetRepo: ISubnetRepository, id: number) {
    const deletedSubnetId = await subnetRepo.deleteSubnet(id)

    return deletedSubnetId
}
