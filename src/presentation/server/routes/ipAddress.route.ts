import express from "express"
const router = express.Router()

import * as ipAddressController from "../controllers/ipAddress.controller"

router.get("/", ipAddressController.getIPAddresses)
router.post("/", ipAddressController.createIPAddress)

export default router;