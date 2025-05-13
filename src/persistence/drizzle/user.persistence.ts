import { eq } from "drizzle-orm"
import { IUser } from "../../domain/user"
import { IUserRepository } from "../repositories/user.repository"
import { db } from "./index"
import { userTable } from "./schema/user.schema"

export class UserDrizzleRepository implements IUserRepository {
    async getUsers() {
        const users = await db
            .select()
            .from(userTable)
        
        return users
    }

    async getUserById(id: number) {
        const [user] =  await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, id))
        
        return user as IUser
    }

    async createUser(user: IUser) {
        const [createdUser] = await db
            .insert(userTable)
            .values(user)
            .returning({ id: userTable.id })
        
        return createdUser?.id as number
    }

    async updateUser(id: number, user: Partial<IUser>) {
        const [updatedUser] = await db
            .update(userTable)
            .set(user)
            .where(eq(userTable.id, id))
            .returning()

        return updatedUser as IUser
    }

    async deleteUser(id: number) {
        const [deletedUser] = await db
            .delete(userTable)
            .where(eq(userTable.id, id))
            .returning({ id: userTable.id })
        
        return deletedUser?.id as number
    }
}