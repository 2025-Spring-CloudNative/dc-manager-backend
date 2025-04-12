import { relations } from "drizzle-orm"
import { rackTable } from "./rack.schema"
import { serviceTable } from "./service.schema"
import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"

export const machineTable = pgTable("machine", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    unit: integer().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    rackId: integer("rack_id").notNull().references(() => rackTable.id),
    status: varchar({ length: 255 }).notNull(),
    serviceId: integer("service_id").notNull().references(() => serviceTable.id)
})

export const machineRelations = relations(machineTable, ({ one }) => ({
    rack: one(rackTable, {
        fields: [machineTable.rackId], 
        references: [rackTable.id]
    })
}))