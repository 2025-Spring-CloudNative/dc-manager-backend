import express from "express"
const router = express.Router()

import * as rackController from "../controllers/rack.controller"

router.get("/", rackController.getRacks)
router.post("/", rackController.createRack)

export default router