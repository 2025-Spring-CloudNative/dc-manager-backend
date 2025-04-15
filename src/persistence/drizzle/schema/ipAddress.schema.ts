import { relations } from "drizzle-orm"
import { ipPoolTable } from "./ipPool.schema"
import { machineTable } from "./machine.schema"
import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"

export const ipAddressTable = pgTable("ip_address", {
    id: serial().primaryKey().notNull(),
    address: varchar({ length: 15 }).notNull(),
    status: varchar({ length: 255 }).notNull(),
    poolId: integer("pool_id").notNull().references(() => ipPoolTable.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
    allocatedAt: timestamp("allocated_at"),
    releasedAt: timestamp("released_at"),
    machineId: integer("machine_id").notNull().references(() => machineTable.id)
})

export const ipAddressRelations = relations(ipAddressTable, ({ one }) => ({
    ipPool: one(ipPoolTable, {
        fields: [ipAddressTable.poolId],
        references: [ipPoolTable.id]
    }),
    machine: one(machineTable, {
        fields: [ipAddressTable.machineId],
        references: [machineTable.id]
    })
}))