import type { RequestHandler } from "express"
import { UserDrizzleRepository } from "../../../persistence/drizzle/user.persistence"
import { JWTRepository } from "../../../persistence/repositories/jwt.repository"
import * as authService from "../../../application/services/auth.service"

const PUBLIC_ROUTES = ["/auth/login", "/auth/register", "/auth/refresh"]
const PUBLIC_ROUTES_PREFIXES = ["/docs"]

function isPublicRoute(path: string) {
    // exact matches
    if (PUBLIC_ROUTES.includes(path)) {
        return true
    }
    // prefix matches
    return PUBLIC_ROUTES_PREFIXES.some((p) => path.startsWith(p))
}

export const authenticate: RequestHandler = async function (req, res, next) {
    if (isPublicRoute(req.path)) {
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
    } catch (error: any) {
        console.log(error.message)
        res.status(401).json({ message: "Unauthorized" })
        return
    }
}

import { can } from "../../../domain/rbac/policy"
import { Action, Resource } from "../../../domain/rbac/policy"
import { UserEntity } from "../../../domain/user"

const methodToActionMap: Record<string, Action> = {
    GET: "read",
    POST: "create",
    PATCH: "update",
    DELETE: "delete"
}
const resourceToResourceMap: Record<string, Resource> = {
    "data-center": "DataCenter",
    room: "Room",
    rack: "Rack",
    machine: "Machine",
    service: "Service",
    subnet: "Subnet",
    "ip-pool": "IPPool",
    "ip-address": "IPAddress",
    user: "User",
    auth: "User"
}

export const authorize: RequestHandler = async function (req, res, next) {
    if (isPublicRoute(req.path)) {
        return next()
    }
    try {
        const user = res.locals.user // as SafeUser
        const route = req.path.split("/")[1]
        const action = methodToActionMap[req.method]
        const resource = route
            ? resourceToResourceMap[route as keyof typeof resourceToResourceMap]
            : undefined

        console.log("route", route)
        console.log("action", action)
        console.log("resource", resource)

        if (!action) {
            res.status(400).json({
                message: "Invalid action for authorization"
            })
            return
        }
        if (!resource) {
            res.status(400).json({
                message: "Invalid resource for authorization"
            })
            return
        }

        const userEntity = new UserEntity(user)
        const permissions = can(userEntity, action, resource)
        console.log("can", permissions)
        if (!permissions) {
            res.status(403).json({ message: "Forbidden" })
            return
        } else {
            next()
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(401).json({ message: "Unauthorized" })
        return
    }
}
