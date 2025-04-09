import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    out: "./migrations",
    schema: "./src/persistence/drizzle/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})
