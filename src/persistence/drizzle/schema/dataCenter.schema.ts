import { relations } from "drizzle-orm"
import { roomTable } from "./room.schema"
import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const dataCenterTable = pgTable("data_center", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    location: varchar({ length: 255 }).notNull(),
})

export const dataCenterRelations = relations(dataCenterTable, ({ many }) => ({
    rooms: many(roomTable)
}))