import { ISubnet } from "../../domain/subnet"
import { ISubnetRepository } from "../../persistence/repositories/subnet.repository"

export async function getSubnets(subnetRepo: ISubnetRepository) {
    const subnets = await subnetRepo.getSubnets()

    return subnets
}

export async function createSubnet(
    subnetRepo: ISubnetRepository,
    subnet: ISubnet
) {
    const createdSubnetId = await subnetRepo.createSubnet(subnet)

    return createdSubnetId
}