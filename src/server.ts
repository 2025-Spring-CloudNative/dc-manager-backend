import path from "path"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

import express from "express"
import { db } from "./persistence/drizzle"
import dataCenterRoute from "./presentation/server/routes/dataCenter.route"
import roomRoute from "./presentation/server/routes/room.route"
import rackRoute from "./presentation/server/routes/rack.route"
import machineRoute from "./presentation/server/routes/machine.route"
import serviceRoute from "./presentation/server/routes/service.route"
import subnetRoute from "./presentation/server/routes/subnet.route"
import ipPoolRoute from "./presentation/server/routes/ipPool.route"
import ipAddressRoute from "./presentation/server/routes/ipAddress.route"

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../docs/swagger/swagger-output.json"; // 編譯後會在根目錄

const PORT = process.env.PORT || 4000


const server = express()

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

server.use(cors(options));
server.use(express.json())

// TODO: use swagger-autogen, swagger-ui-express in routes
server.use("/data-center", dataCenterRoute)
server.use("/room", roomRoute)
server.use("/rack", rackRoute)
server.use("/machine", machineRoute)
server.use("/service", serviceRoute)
server.use("/subnet", subnetRoute)
server.use("/ip-pool", ipPoolRoute)
server.use("/ip-address", ipAddressRoute)

// disable try it out button
const swaggerUiOptions = {
  swaggerOptions: { supportedSubmitMethods: [] }
}
server.use(
  "/docs`",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, swaggerUiOptions)
)

// server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


server.get("/", (req, res) => {
    console.log(process.env.DATABASE_URL, db)
    res.status(200).json("Hello from server!")
})


server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
