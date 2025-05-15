import { IRefreshToken } from "../../domain/refreshToken";

export interface IRefreshTokenRepository {
    getRefreshTokens(): Promise<IRefreshToken[]>
    getRefreshTokenByToken(token: string): Promise<IRefreshToken>
    createRefreshToken(refreshToken: IRefreshToken): Promise<number>
    updateRefreshToken(token: string, refreshToken: Partial<IRefreshToken>): Promise<IRefreshToken>
    deleteRefreshToken(token: string): Promise<number>
}