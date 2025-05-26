import { eq } from "drizzle-orm"
import { IRefreshToken } from "../../domain/refreshToken"
import { IRefreshTokenRepository } from "../repositories/refreshToken.repository"
import { db } from "./index"
import { refreshTokenTable } from "./schema/refreshToken.schema"

export class RefreshTokenDrizzleRepository implements IRefreshTokenRepository {
    async getRefreshTokens() {
        const refreshTokens = await db
            .select()
            .from(refreshTokenTable)
        
        return refreshTokens
    }

    async getRefreshTokenByToken(token: string) {
        const [refreshToken] = await db
            .select()
            .from(refreshTokenTable)
            .where(eq(refreshTokenTable.token, token))

        return refreshToken as IRefreshToken
    }

    async createRefreshToken(refreshToken: IRefreshToken) {
        const [createdRefreshToken] = await db
            .insert(refreshTokenTable)
            .values(refreshToken)
            .returning({ id: refreshTokenTable.id })
        
        return createdRefreshToken?.id as number
    }

    async updateRefreshToken(token: string, refreshToken: Partial<IRefreshToken>) {
        const [updatedRefreshToken] = await db
            .update(refreshTokenTable)
            .set(refreshToken)
            .where(eq(refreshTokenTable.token, token))
            .returning()

        return updatedRefreshToken as IRefreshToken
    }

    async deleteRefreshToken(token: string) {
        const [deletedRefreshToken] = await db
            .delete(refreshTokenTable)
            .where(eq(refreshTokenTable.token, token))
            .returning({ id: refreshTokenTable.id })

        return deletedRefreshToken?.id as number
    }

}