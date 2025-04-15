import express from "express"
const router = express.Router()

import * as subnetController from "../controllers/subnet.controller"

router.get("/", subnetController.getSubnets)
router.post("/", subnetController.createSubnet)

export default router