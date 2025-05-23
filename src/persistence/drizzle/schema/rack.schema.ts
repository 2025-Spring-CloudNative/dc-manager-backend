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
    roomId: integer("room_id").notNull().references(() => roomTable.id, { onDelete: 'no action' }),
    serviceId: integer("service_id").references(() => serviceTable.id, { onDelete: 'set null' }),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
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
