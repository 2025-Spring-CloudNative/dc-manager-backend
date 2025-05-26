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

// Automatically fill accessToken into Swagger UI's Authorize field ?
export async function userLogin(req: Request, res: Response) {
    const userRepo = new UserDrizzleRepository()
    const passwordHasherRepo = new PasswordHasherRepository()

    const JWTRepo = new JWTRepository(
        process.env.ACCESS_SECRET as string,
        process.env.REFRESH_SECRET as string
    )
    const refreshTokenRepo = new RefreshTokenDrizzleRepository()
    try {
        const userLoginInfo = req.body
        const { accessToken, refreshToken, user } = await authService.userLogin(
            userRepo,
            passwordHasherRepo,
            JWTRepo,
            refreshTokenRepo,
            userLoginInfo
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })

        res.status(200).json({
            accessToken,
            user,
        })
    } catch(error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function userLogout(req: Request, res: Response) {
    const refreshTokenRepo = new RefreshTokenDrizzleRepository()
    const refreshToken = req.cookies.refreshToken
    try {
        if (!refreshToken) {
            res.status(401).json({ message: "No refresh token provided" })
            return
        }
        await authService.userLogout(
            refreshTokenRepo,
            refreshToken
        )
        res.clearCookie('refreshToken')
        res.status(200).json({ message: "Logged out successfully" })
    }
    catch(error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function refreshAccessToken(req: Request, res: Response) {
    const userRepo = new UserDrizzleRepository()
    const JWTRepo = new JWTRepository(
        process.env.ACCESS_SECRET as string,
        process.env.REFRESH_SECRET as string
    )
    const refreshTokenRepo = new RefreshTokenDrizzleRepository()
    const refreshToken = req.cookies.refreshToken
    try {
        if (!refreshToken) {
            res.status(401).json({ message: "No refresh token provided" })
            return
        }
        const { accessToken, user } = await authService.refreshAccessToken(
            userRepo,
            JWTRepo,
            refreshTokenRepo,
            refreshToken
        )
        res.status(200).json({
            accessToken,
            user
        })
    } catch (error: any) {
        res.status(401).json({ message: error.message })
    }
}

export async function getSession(req: Request, res: Response) {
    const userRepo = new UserDrizzleRepository()
    const JWTRepo = new JWTRepository(
        process.env.ACCESS_SECRET as string,
        process.env.REFRESH_SECRET as string
    )

    const accessToken = req.headers?.authorization?.split(" ")[1]
    try {
        if (!accessToken) {
            res.status(401).json({ message: "No access token provided" })
            return
        }
        const user = await authService.getSession(
            userRepo,
            JWTRepo,
            accessToken
        )
        res.status(200).json(user)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}