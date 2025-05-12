export interface IRefreshToken {
    id?: number
    userId: number
    tokenHash: string
    createdAt?: Date
    expiredAt?: Date
}

export class RefreshTokenEntity implements IRefreshToken {
    id?: number
    userId: number
    tokenHash: string
    createdAt?: Date
    expiredAt?: Date

    constructor(refreshToken: IRefreshToken) {
        this.id = refreshToken.id
        this.userId = refreshToken.userId
        this.tokenHash = refreshToken.tokenHash
        this.createdAt = refreshToken.createdAt
        this.expiredAt = refreshToken.expiredAt
    }
}