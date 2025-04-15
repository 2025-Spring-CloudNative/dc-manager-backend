import { relations } from "drizzle-orm"
import { subnetTable } from "./subnet.schema"
import { ipAddressTable } from "./ipAddress.schema"
import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"

export const ipPoolTable = pgTable("ip_pool", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 255 }).notNull(),
    startIp: varchar("start_ip", { length: 15 }).notNull(),
    endIp: varchar("end_ip", { length: 15 }).notNull(),
    subnetId: integer("subnet_id").notNull().references(() => subnetTable.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
})

export const ipPoolRelations = relations(ipPoolTable, ({ one, many }) => ({
    subnet: one(subnetTable, {
        fields: [ipPoolTable.subnetId], 
        references: [subnetTable.id]
    }),
    ipAddress: many(ipAddressTable)
}))