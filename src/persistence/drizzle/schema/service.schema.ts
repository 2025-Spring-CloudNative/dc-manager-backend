import { name, relations } from "drizzle-orm"
import { machineTable } from "./machine.schema"
import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const serviceTable = pgTable("service", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull()
})

export const serviceRelations = relations(serviceTable, ({ one }) => ({
    machine: one(machineTable, {
        fields: [serviceTable.id],
        references: [machineTable.serviceId]
    })
}))
