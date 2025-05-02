import { relations } from "drizzle-orm"
import { rackTable } from "./rack.schema"
import { ipPoolTable } from "./ipPool.schema"
import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"

export const serviceTable = pgTable("service", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    poolId: integer("pool_id").references(() => ipPoolTable.id, { onDelete: 'set null' })
})

export const serviceRelations = relations(serviceTable, ({ one }) => ({
    machine: one(rackTable, {
        fields: [serviceTable.id],
        references: [rackTable.serviceId]
    })
}))
