import { relations } from "drizzle-orm"
import { dataCenterTable } from "./dataCenter.schema"
import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"

export const roomTable = pgTable("room", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    unit: integer().notNull(),
    dataCenterId: integer().notNull().references(() => dataCenterTable.id)
})

export const roomRelations = relations(roomTable, ({ one, many }) => ({
    dataCenter: one(dataCenterTable, {
        fields: [roomTable.dataCenterId],
        references: [dataCenterTable.id]
    }),
    
}))