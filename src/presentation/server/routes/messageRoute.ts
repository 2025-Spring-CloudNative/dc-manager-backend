import { Router } from "express";
import { getHello } from "../controllers/messageController";

const router = Router();

router.get("/hello", getHello);

export default router;