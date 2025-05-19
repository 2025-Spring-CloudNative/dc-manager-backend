import { relations } from "drizzle-orm"
import { pgTable, integer, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { userTable } from "./user.schema"
import { uniqueIndex } from "drizzle-orm/pg-core"

export const refreshTokenTable = pgTable("refresh_token", {
    id: serial().primaryKey().notNull(),
    userId: integer("user_id").notNull().references(() => userTable.id, {onDelete: 'no action'}),
    token: varchar("token", { length: 512 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    expiredAt: timestamp("expired_at").notNull()
}, (table) => [
    uniqueIndex("token_idx").on(table.token)
])

export const refreshTokenRelations = relations(refreshTokenTable, ({ one }) => ({
    user: one(userTable, {
        fields: [refreshTokenTable.userId],
        references: [userTable.id]
    })
}))