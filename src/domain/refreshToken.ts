export interface IRefreshToken {
    id?: number
    userId: number
    token: string
    createdAt?: Date
    expiredAt: Date
}

export class RefreshTokenEntity implements IRefreshToken {
    id?: number
    userId: number
    token: string
    createdAt?: Date
    expiredAt: Date

    constructor(refreshToken: IRefreshToken) {
        this.id = refreshToken.id
        this.userId = refreshToken.userId
        this.token = refreshToken.token
        this.createdAt = refreshToken.createdAt
        this.expiredAt = refreshToken.expiredAt
    }
}