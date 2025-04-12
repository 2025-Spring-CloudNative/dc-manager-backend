import express from "express"
const router = express.Router()

import * as machineController from "../controllers/machine.controller"

router.get("/", machineController.getMachines)
router.post("/", machineController.createMachine)

export default router