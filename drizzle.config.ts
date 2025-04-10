import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    out: "./migration",
    schema: "./src/persistence/drizzle/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})
