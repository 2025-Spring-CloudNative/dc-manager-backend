import { relations } from "drizzle-orm"
import { pgTable, integer, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { userTable } from "./user.schema"

export const refreshTokenTable = pgTable("refresh_token", {
    id: serial().primaryKey().notNull(),
    userId: integer().notNull().references(() => userTable.id, {onDelete: 'no action'}),
    tokenHash: varchar("token_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    expiredAt: timestamp("expired_at").notNull()
})

export const refreshTokenRelations = relations(refreshTokenTable, ({ one }) => ({
    user: one(userTable, {
        fields: [refreshTokenTable.userId],
        references: [userTable.id]
    })
}))