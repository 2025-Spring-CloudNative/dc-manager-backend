import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"

console.log(process.env.DATABASE_URL)

// TODO: use singleton for this db instance / connection pool throughout the project
export const db = drizzle(process.env.DATABASE_URL!)
