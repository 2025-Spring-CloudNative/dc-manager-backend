import { relations } from "drizzle-orm"
import { subnetTable } from "./subnet.schema"
import { ipAddressTable } from "./ipAddress.schema"
import { pgTable, serial, integer, varchar, timestamp, cidr } from "drizzle-orm/pg-core"

export const ipPoolTable = pgTable("ip_pool", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 255 }).notNull(),
    cidr: cidr().notNull(),
    subnetId: integer("subnet_id").notNull().references(() => subnetTable.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date())
})

export const ipPoolRelations = relations(ipPoolTable, ({ one, many }) => ({
    subnet: one(subnetTable, {
        fields: [ipPoolTable.subnetId], 
        references: [subnetTable.id]
    }),
    ipAddress: many(ipAddressTable)
}))