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

    async getRefreshTokenById(id: number) {
        const [refreshToken] = await db
            .select()
            .from(refreshTokenTable)
            .where(eq(refreshTokenTable.id, id))

        return refreshToken as IRefreshToken
    }

    async createRefreshToken(refreshToken: IRefreshToken) {
        const [createdRefreshToken] = await db
            .insert(refreshTokenTable)
            .values(refreshToken)
            .returning({ id: refreshTokenTable.id })
        
        return createdRefreshToken?.id as number
    }

    async updateRefreshToken(id: number, refreshToken: Partial<IRefreshToken>) {
        const [updatedRefreshToken] = await db
            .update(refreshTokenTable)
            .set(refreshToken)
            .returning()

        return updatedRefreshToken as IRefreshToken
    }

    async deleteRefreshToken(id: number) {
        const [deletedRefreshToken] = await db
            .delete(refreshTokenTable)
            .where(eq(refreshTokenTable.id, id))
            .returning({ id: refreshTokenTable.id })

        return deletedRefreshToken?.id as number
    }

}