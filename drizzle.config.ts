import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/persistence/drizzle/schema",
    out: "./migration",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    strict: true,
})
