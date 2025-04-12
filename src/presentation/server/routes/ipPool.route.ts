import express from "express"
const router = express.Router()

import * as ipPoolController from "../controllers/ipPool.controller"

router.get("/", ipPoolController.getIPPools)
router.post("/", ipPoolController.createIPPool)

export default router