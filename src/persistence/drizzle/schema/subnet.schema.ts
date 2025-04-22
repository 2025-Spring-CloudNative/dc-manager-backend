import { relations } from "drizzle-orm"
import { ipPoolTable } from "./ipPool.schema"
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"

export const subnetTable = pgTable("subnet", {
    id: serial().primaryKey().notNull(),
    cidr: varchar({ length: 18 }).notNull(),
    netmask: varchar({ length: 15 }).notNull(),
    gateway: varchar({ length: 15 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date())
})

export const subnetRelations = relations(subnetTable, ({ many }) => ({
    ipPool: many(ipPoolTable)
}))
