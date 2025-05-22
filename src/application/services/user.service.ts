import { IUser, UserEntity, SafeUser } from "../../domain/user"
import { IUserRepository } from "../../persistence/repositories/user.repository"
import { IPasswordHasherRepository } from "../../persistence/repositories/hash.repository"

export async function updateUser(
    actor: IUser,
    userRepo: IUserRepository,
    userId: number,
    data: Partial<IUser>
): Promise<SafeUser> {
    const prevUser = await userRepo.getUserById(userId)
    if (!prevUser) {
        throw new Error("User not found")
    }
    if (data.passwordHash) {
        throw new Error("Cannot update password using the updateUser api.")
    }

    const actorEntity = new UserEntity(actor)
    const prevUserEntity = new UserEntity(prevUser)

    // check owner and role
    if (!actorEntity.canUpdateUser(prevUserEntity, data)) {
        throw new Error("Forbidden")
    }

    const updatedUser = await userRepo.updateUser(userId, data)
    const { passwordHash, ...safeUser } = updatedUser

    return safeUser
}

export async function updateUserPassword(
    actor: IUser,
    userRepo: IUserRepository,
    passwordHasherRepo: IPasswordHasherRepository,
    userId: number,
    oldPassword: string,
    newPassword: string
): Promise<void> {
    const prevUser = await userRepo.getUserById(userId)
    if (!prevUser) {
        throw new Error("User not found")
    }

    const actorEntity = new UserEntity(actor)
    const prevUserEntity = new UserEntity(prevUser)

    // check owner and role
    if (
        !actorEntity.canUpdateUser(prevUserEntity, {
            passwordHash: newPassword
        })
    ) {
        throw new Error("Forbidden")
    }

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
