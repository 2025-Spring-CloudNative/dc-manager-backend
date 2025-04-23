import { relations } from "drizzle-orm"
import { roomTable } from "./room.schema"
import { machineTable } from "./machine.schema"
import { serviceTable } from "./service.schema"
import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"

export const rackTable = pgTable("rack", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    height: integer().notNull(),
    tag: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
    roomId: integer("room_id").notNull().references(() => roomTable.id),
    serviceId: integer("service_id").references(() => serviceTable.id)
})

export const rackRelations = relations(rackTable, ({ one, many }) => ({
    room: one(roomTable, {
        fields: [rackTable.roomId],
        references: [roomTable.id]
    }),
    service: one(serviceTable, {
        fields: [rackTable.serviceId],
        references: [serviceTable.id]
    }),
    machine: many(machineTable)
}))
