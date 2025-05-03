import { relations } from "drizzle-orm"
import { dataCenterTable } from "./dataCenter.schema"
import { rackTable } from "./rack.schema"
import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"

export const roomTable = pgTable("room", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    unit: integer().notNull(),
    dataCenterId: integer("data_center_id").notNull().references(() => dataCenterTable.id, { onDelete: 'no action' })
})

export const roomRelations = relations(roomTable, ({ one, many }) => ({
    dataCenter: one(dataCenterTable, {
        fields: [roomTable.dataCenterId],
        references: [dataCenterTable.id]
    }),
    rack: many(rackTable)
}))