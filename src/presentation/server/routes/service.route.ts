import express from "express"
const router = express.Router()

import * as serviceController from "../controllers/service.controller"

router.get("/", serviceController.getServices)
router.post("/", serviceController.createService)

export default router