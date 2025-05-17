import { Request, Response } from "express"
import { UserDrizzleRepository } from "../../../persistence/drizzle/user.persistence"
import { PasswordHasherRepository } from "../../../persistence/repositories/hash.repository"
import { JWTRepository } from "../../../persistence/repositories/jwt.repository"
import { RefreshTokenDrizzleRepository } from "../../../persistence/drizzle/refreshToken.persistence"
import * as authService from "../../../application/services/auth.service"

export async function userRegister(req: Request, res: Response) {
    const userRepo = new UserDrizzleRepository()
    const passwordHasherRepo = new PasswordHasherRepository()

    const JWTRepo = new JWTRepository(
        process.env.ACCESS_SECRET as string,
        process.env.REFRESH_SECRET as string
    )
    const refreshTokenRepo = new RefreshTokenDrizzleRepository()
    try {
        const user = req.body
        const { accessToken, refreshToken, user: createdUser } = await authService.userRegister(
            userRepo,
            passwordHasherRepo,
            JWTRepo,
            refreshTokenRepo,
            user
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })
        res.status(201).json({
            accessToken,
            user: createdUser
        })
    } catch(error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function userLogin(req: Request, res: Response) {

}

export async function userLogout(req: Request, res: Response) {

}

export async function refreshAccessToken(req: Request, res: Response) {

}

export async function getSession(req: Request, res: Response) {
    
}