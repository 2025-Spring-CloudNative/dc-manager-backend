import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const dataCenterTable = pgTable("data_center", {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }),
    location: varchar({ length: 255 }),
})
