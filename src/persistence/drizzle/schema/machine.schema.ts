import { relations } from "drizzle-orm"
import { rackTable } from "./rack.schema"
import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"

export const machineTable = pgTable("machine", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    startUnit: integer("start_unit").notNull(),
    unit: integer().notNull(),
    macAddress: varchar("mac_address", { length: 17 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    rackId: integer("rack_id").notNull().references(() => rackTable.id),
    status: varchar({ length: 255 }).notNull(),
})

export const machineRelations = relations(machineTable, ({ one }) => ({
    rack: one(rackTable, {
        fields: [machineTable.rackId], 
        references: [rackTable.id]
    })
}))