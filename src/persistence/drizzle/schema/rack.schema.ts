import { relations } from "drizzle-orm"
import { roomTable } from "./room.schema"
import { machineTable } from "./machine.schema"
import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"

export const rackTable = pgTable("rack", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    height: integer().notNull(),
    tag: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
    roomId: integer("room_id").notNull().references(() => roomTable.id)
})

export const rackRelations = relations(rackTable, ({ one, many }) => ({
    room: one(roomTable, {
        fields: [rackTable.roomId],
        references: [roomTable.id]
    }),
    machine: many(machineTable)
}))
