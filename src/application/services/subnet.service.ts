import { ISubnet, SubnetEntity } from "../../domain/subnet"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"

export async function getSubnets(subnetRepo: ISubnetRepository) {
    const subnets = await subnetRepo.getSubnets()

    return subnets
}

export async function getSubnetById(subnetRepo: ISubnetRepository, id: number) {
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
    const updatedSubnet = await subnetRepo.updateSubnet(id, subnet)

    return updatedSubnet
}

export async function deleteSubnet(subnetRepo: ISubnetRepository, id: number) {
    const deletedSubnetId = await subnetRepo.deleteSubnet(id)

    return deletedSubnetId
}
