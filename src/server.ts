import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

import express from "express"
import { db } from "./persistence/drizzle"
import dataCenterRoute from "./presentation/server/routes/dataCenter.route"
import roomRoute from "./presentation/server/routes/room.route"
import rackRoute from "./presentation/server/routes/rack.route"
import machineRoute from "./presentation/server/routes/machine.route"
import serviceRoute from "./presentation/server/routes/service.route"

const PORT = process.env.PORT || 4000

const server = express()
server.use(express.json())

// TODO: use swagger-autogen, swagger-ui-express in routes
server.use("/data-center", dataCenterRoute)
server.use("/room", roomRoute)
server.use("/rack", rackRoute)
server.use("/machine", machineRoute)
server.use("/service", serviceRoute)

server.get("/hello", (req, res) => {
    console.log(process.env.DATABASE_URL, db)
    res.status(200).json("Hello from server!")
})

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
