import express from "express"
const router = express.Router()

import * as dataCenterController from "../controllers/dataCenter.controller"

router.get("/", dataCenterController.getDataCenters)
router.post("/", dataCenterController.createDataCenter)

export default router
