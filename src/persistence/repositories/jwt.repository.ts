import { IUser } from "../../domain/user"
import jwt, { JwtPayload } from "jsonwebtoken"

const ACCESS_EXPIRED_IN = '15m'
const REFRESH_EXPIRED_IN = '30d'

export interface IJWTRepository {
    signAccess(user: IUser): string
    signRefresh(user: IUser): string
    verifyAccess(token: string): number
    verifyRefresh(token: string): number
}

export class JWTRepository implements IJWTRepository {

    constructor(
        private readonly accessSecret: string,
        private readonly refreshSecret: string,
    ) {
        if (!accessSecret || !refreshSecret) {
            throw new Error('Access secret and refresh secret must be provided')
        }

        this.accessSecret = accessSecret
        this.refreshSecret = refreshSecret
    }

    signAccess(user: IUser) {
        return jwt.sign({ 
            id: user.id, 
            email: user.email,
            role: user.role
        }, this.accessSecret, { expiresIn: ACCESS_EXPIRED_IN })
    }

    signRefresh(user: IUser) {
        return jwt.sign({ 
            id: user.id,
            email: user.email,
            role: user.role 
        }, this.refreshSecret, { expiresIn: REFRESH_EXPIRED_IN })
    }

    verifyAccess(token: string) {
        const decoded = jwt.verify(token, this.accessSecret) as JwtPayload
        if (typeof decoded.userId === 'number')
            return decoded.userId
        throw new Error('Invalid access token')
    }

    verifyRefresh(token: string) {
        const decoded = jwt.verify(token, this.refreshSecret) as JwtPayload
        if (typeof decoded.userId === 'number')
            return decoded.userId
        throw new Error('Invalid refresh token')
    }
}