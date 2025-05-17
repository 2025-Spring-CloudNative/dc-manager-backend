import type { RequestHandler } from "express"
import { UserDrizzleRepository } from "../../../persistence/drizzle/user.persistence"
import { JWTRepository } from "../../../persistence/repositories/jwt.repository"
import * as authService from "../../../application/services/auth.service"

export const authenticate: RequestHandler = async function (req, res, next) {
    if (
        req.path === "/auth/login" ||
        req.path === "/auth/register" ||
        req.path.startsWith("/docs")
    ) {
        return next()
    }

    const userRepo = new UserDrizzleRepository()
    const JWTRepo = new JWTRepository(
        process.env.ACCESS_SECRET as string,
        process.env.REFRESH_SECRET as string
    )

    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            throw new Error("No Authorization Header")
        }
        const [scheme, accessToken] = authHeader.split(" ")
        if (scheme !== "Bearer" || !accessToken) {
            throw new Error("Invalid Authorization Header")
        }

        const user = await authService.getSession(
            userRepo,
            JWTRepo,
            accessToken!
        )
        res.locals.user = user
        return next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
}
