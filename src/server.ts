import path from "path"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

import swaggerUi from "swagger-ui-express"
import swaggerFile from "../docs/swagger/swagger-output.json"

import express from "express"
import cookieParser from "cookie-parser"

import { db } from "./persistence/drizzle"
import dataCenterRoute from "./presentation/server/routes/dataCenter.route"
import roomRoute from "./presentation/server/routes/room.route"
import rackRoute from "./presentation/server/routes/rack.route"
import machineRoute from "./presentation/server/routes/machine.route"
import serviceRoute from "./presentation/server/routes/service.route"
import subnetRoute from "./presentation/server/routes/subnet.route"
import ipPoolRoute from "./presentation/server/routes/ipPool.route"
import ipAddressRoute from "./presentation/server/routes/ipAddress.route"
import userRoute from "./presentation/server/routes/user.route"
import authRoute from "./presentation/server/routes/auth.route"
import { authenticate } from "./presentation/server/middleware/auth.middleware"
import { authorize } from "./presentation/server/middleware/auth.middleware"

const PORT = process.env.PORT || 4000

const server = express()

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://dc-manager-frontend-703684363125.asia-east1.run.app"
]

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true
}

server.use(cors(options))
server.use(express.json())
server.use(cookieParser())
server.use(authenticate)
server.use(authorize)

// swagger-autogen + swagger-ui-express
const swaggerUiOptions = {
    swaggerOptions: { supportedSubmitMethods: [] }
}
server.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, swaggerUiOptions)
)
// server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
server.use("/auth", authRoute)
server.use("/user", userRoute)

server.use("/data-center", dataCenterRoute)
server.use("/room", roomRoute)
server.use("/rack", rackRoute)
server.use("/machine", machineRoute)
server.use("/service", serviceRoute)

server.use("/subnet", subnetRoute)
server.use("/ip-pool", ipPoolRoute)
server.use("/ip-address", ipAddressRoute)

server.get("/", (req, res) => {
    res.status(200).json("Hello from server!")
})

server.listen(PORT, () => {
    console.log("NODE_ENV", process.env.NODE_ENV)
    console.log("DATABASE_URL", process.env.DATABASE_URL, db)
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
