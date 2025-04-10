import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

import express from "express"
import { db } from "./persistence/drizzle"
import dataCenterRoute from "./presentation/server/routes/dataCenter.route"

const PORT = process.env.PORT || 4000

const server = express()
server.use(express.json())

// TODO: use swagger-autogen, swagger-ui-express in routes
server.use("/data-center", dataCenterRoute)

server.get("/hello", (req, res) => {
    console.log(process.env.DATABASE_URL, db)
    res.status(200).json("Hello from server!")
})

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${4000}`)
})
