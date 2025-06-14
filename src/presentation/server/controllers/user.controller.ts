import { Request, Response } from "express"
import { UserDrizzleRepository } from "../../../persistence/drizzle/user.persistence"
import { IUser } from "../../../domain/user"
import * as userService from "../../../application/services/user.service"
import { PasswordHasherRepository } from "../../../persistence/repositories/hash.repository"

export async function updateUser(req: Request, res: Response) {
    const actor = res.locals.user as IUser
    const userRepo = new UserDrizzleRepository()
    const userId = Number(req.params.id)

    try {
        const updatedUser = await userService.updateUser(
            actor,
            userRepo,
            userId,
            req.body
        )
        res.status(200).json(updatedUser)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateUserPassword(req: Request, res: Response) {
    const actor = res.locals.user as IUser
    const userRepo = new UserDrizzleRepository()
    const passwordHasherRepo = new PasswordHasherRepository()
    const userId = Number(req.params.id)

    try {
        await userService.updateUserPassword(
            actor,
            userRepo,
            passwordHasherRepo,
            userId,
            req.body.oldPassword,
            req.body.newPassword
        )
        res.status(200).json({ message: "Password updated successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
