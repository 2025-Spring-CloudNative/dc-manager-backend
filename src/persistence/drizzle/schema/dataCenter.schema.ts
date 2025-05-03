import { relations } from "drizzle-orm"
import { roomTable } from "./room.schema"
import { subnetTable } from "./subnet.schema"
import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"

export const dataCenterTable = pgTable("data_center", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    location: varchar({ length: 255 }).notNull(),
    subnetId: integer("subnet_id").references(() => subnetTable.id, { onDelete: 'no action' })
})

export const dataCenterRelations = relations(dataCenterTable, ({ one, many }) => ({
    subnet: one(subnetTable, {
        fields: [dataCenterTable.subnetId],
        references: [subnetTable.id]
    }),
    room: many(roomTable)
}))