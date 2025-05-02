import { relations } from "drizzle-orm"
import { rackTable } from "./rack.schema"
import { pgTable, pgEnum, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"
import { MachineStatus } from "../../../domain/machine"

export const machineEnum = pgEnum("machine_status", MachineStatus)

export const machineTable = pgTable("machine", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    startUnit: integer("start_unit").notNull(),
    unit: integer().notNull(),
    macAddress: varchar("mac_address", { length: 17 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    rackId: integer("rack_id").notNull().references(() => rackTable.id, { onDelete: 'no action' }),
    status: machineEnum("status").notNull()
})

export const machineRelations = relations(machineTable, ({ one }) => ({
    rack: one(rackTable, {
        fields: [machineTable.rackId], 
        references: [rackTable.id]
    })
}))