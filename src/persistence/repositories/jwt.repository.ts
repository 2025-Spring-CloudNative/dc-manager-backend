import { IUser, UserRole } from "../../domain/user"
import jwt, { JwtPayload } from "jsonwebtoken"

const ACCESS_EXPIRED_IN = '15m'
const REFRESH_EXPIRED_IN = '30d'

export interface IJWTRepository {
    signAccess(user: IUser): string
    signRefresh(user: IUser): string
    verifyAccess(token: string): number
    verifyRefresh(token: string): number
    decode(token: string): JwtPayload
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
        if (typeof decoded.id === 'number' || typeof decoded.email === 'string'
            || decoded.role === UserRole.User || decoded.role === UserRole.Admin)
        {
            return decoded.id
        }
        throw new Error('Invalid access token')
    }

    verifyRefresh(token: string) {
        const decoded = jwt.verify(token, this.refreshSecret) as JwtPayload
        if (typeof decoded.id === 'number' || typeof decoded.email === 'string'
            || decoded.role === UserRole.User || decoded.role === UserRole.Admin)
        {
            return decoded.id
        }
        throw new Error('Invalid refresh token')
    }

    decode(token: string) {
        const decoded = jwt.decode(token) as JwtPayload
        return decoded
    }

}