import { IRefreshToken } from "../../domain/refreshToken";

export interface IRefreshTokenRepository {
    getRefreshTokens(): Promise<IRefreshToken[]>
    getRefreshTokenById(id: number): Promise<IRefreshToken>
    createRefreshToken(refreshToken: IRefreshToken): Promise<number>
    updateRefreshToken(id: number, refreshToken: Partial<IRefreshToken>): Promise<IRefreshToken>
    deleteRefreshToken(id: number): Promise<number>
}