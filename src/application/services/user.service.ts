import { IUser, UserEntity, SafeUser } from "../../domain/user"
import { IUserRepository } from "../../persistence/repositories/user.repository"
import { IPasswordHasherRepository } from "../../persistence/repositories/hash.repository"

export async function updateUser(
    userRepo: IUserRepository,
    userId: number,
    user: Partial<IUser>
): Promise<SafeUser> {
    const prevUser = await userRepo.getUserById(userId)
    if (!prevUser) {
        throw new Error("User not found")
    }

    // const prevUserEntity = new UserEntity(prevUser)
    if (user.passwordHash) {
        throw new Error("Cannot update password using the updateUser api.")
    }

    // TODO: check owner and role when updating role

    const updatedUser = await userRepo.updateUser(userId, user)
    const { passwordHash, ...safeUser } = updatedUser

    return safeUser
}

export async function updateUserPassword(
    userRepo: IUserRepository,
    passwordHasherRepo: IPasswordHasherRepository,
    userId: number,
    oldPassword: string,
    newPassword: string
): Promise<void> {
    // TODO: check owner and role
    const prevUser = await userRepo.getUserById(userId)
    if (!prevUser) {
        throw new Error("User not found")
    }

    const prevUserEntity = new UserEntity(prevUser)
    const isValidPassword = await passwordHasherRepo.compare(
        oldPassword,
        prevUserEntity.passwordHash
    )
    if (!isValidPassword) {
        throw new Error("Invalid password")
    }

    const update: Partial<IUser> = {
        passwordHash: await passwordHasherRepo.hash(newPassword)
    }
    await userRepo.updateUser(userId, update)

    return
}
