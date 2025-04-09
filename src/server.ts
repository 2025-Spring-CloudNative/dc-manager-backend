import express from "express"
import dotenv from "dotenv"
import path from "path"
import { db } from "./persistence/drizzle"

dotenv.config({ path: path.resolve(__dirname, "../.env") })

const server = express()
server.use(express.json())

const PORT = process.env.PORT || 4000

server.use("/hello", (req, res) => {
    console.log(process.env.DATABASE_URL, db)
    res.status(200).json("Hello from server!")
})

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${4000}`)
})
