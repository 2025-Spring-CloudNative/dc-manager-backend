import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"

console.log(process.env.DATABASE_URL)

// TODO: use singleton for this db instance / connection pool throughout the project
export const db = drizzle({
    connection: process.env.DATABASE_URL!,
    casing: "snake_case", // this will convert camelCase (in our schema definition) to snake_case (in actual db)
})
