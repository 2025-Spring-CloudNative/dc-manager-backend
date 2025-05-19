import type { RequestHandler } from "express"
import { UserDrizzleRepository } from "../../../persistence/drizzle/user.persistence"
import { JWTRepository } from "../../../persistence/repositories/jwt.repository"
import * as authService from "../../../application/services/auth.service"


export const authenticate: RequestHandler = async function (req, res, next) {
    // console.log("authenticate middleware")
    if (
        req.path === "/auth/login" ||
        req.path === "/auth/register" ||
        req.path === "/docs/" ||
        
        req.path ==="/docs/swagger-ui.css" ||
        req.path ==="/docs/swagger-ui-bundle.js" ||
        req.path ==="/docs/swagger-ui-init.js" ||
        req.path ==="/docs/swagger-ui-standalone-preset.js" ||
        req.path ==="/docs/favicon-32x32.png"         
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

import {can} from "../../../domain/rbac/policy"
import { Action, Resource } from "../../../domain/rbac/policy"
import { IUser, UserEntity, SafeUser } from "../../../domain/user"

const methodToActionMap: Record<string, Action> = {
  "GET": "read",
  "POST": "create",
  "PATCH": "update",
  "DELETE": "delete"
}
const resourceToResourceMap: Record<string, Resource> = {
  "data-center": "DataCenter",
  "room": "Room",
  "rack": "Rack",
  "machine": "Machine",
  "service": "Service",
  "subnet": "Subnet"
}

export const authorize: RequestHandler = async function (req, res, next) {
    // console.log("authorize middleware")
    if (
        req.path === "/auth/login" ||
        req.path === "/auth/register" ||
        req.path === "/docs/" ||
        
        req.path === "/docs/swagger-ui.css" ||
        req.path === "/docs/swagger-ui-bundle.js" ||
        req.path === "/docs/swagger-ui-init.js" ||
        req.path === "/docs/swagger-ui-standalone-preset.js" ||
        req.path === "/docs/favicon-32x32.png" 
    ) {
        return next()
    }
    try{
        const user = res.locals.user
        const route = req.path.split("/")[1]
        const action = methodToActionMap[req.method]
        const resource = route ? resourceToResourceMap[route as keyof typeof resourceToResourceMap] : undefined
        
        console.log("action", action)
        console.log("resource", resource)

        if (!action) {
            res.status(400).json({ message: "Invalid action for authorization" })
            return
        }
        if (!resource) {
            res.status(400).json({ message: "Invalid resource for authorization" })
            return
        }
        
        const userEntity = new UserEntity(user)
        const permissions = can(userEntity, action, resource)
        console.log(permissions)
        if(!permissions){
            res.status(403).json({message: "Forbidden"})
            return
        }
        else {
            next()
        }
    }catch (error) {
        res.status(401).json({ message: "error" })
        return
    }
}