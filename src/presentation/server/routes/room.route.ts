import express from "express"
const router = express.Router()

import * as roomController from "../controllers/room.controller"

router.get("/", roomController.getRooms)
router.post("/", roomController.createRoom)

export default router