import { relations } from "drizzle-orm"
import { ipPoolTable } from "./ipPool.schema"
import { machineTable } from "./machine.schema"
import { pgTable, pgEnum, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"
import { IPAddressStatus } from "../../../domain/ipAddress"

export const ipAddressEnum = pgEnum("ip_address_status", IPAddressStatus)

export const ipAddressTable = pgTable("ip_address", {
    id: serial().primaryKey().notNull(),
    address: varchar({ length: 15 }).notNull(),
    status: ipAddressEnum("status").notNull(),
    poolId: integer("pool_id").notNull().references(() => ipPoolTable.id),
    machineId: integer("machine_id").references(() => machineTable.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    allocatedAt: timestamp("allocated_at"),
    releasedAt: timestamp("released_at")
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