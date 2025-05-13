import { relations } from "drizzle-orm"
import { pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { UserRole } from "../../../domain/user"
import { refreshTokenTable } from "./refreshToken.schema"

export const userRoleEnum = pgEnum("user_role", UserRole)

export const userTable = pgTable("user", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    role: userRoleEnum("role").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date())
})

export const userRelations = relations(userTable, ({ many }) => ({
    refreshToken: many(refreshTokenTable)
}))