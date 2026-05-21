import express from "express";
import { protect } from "../middlewares/auth.js";
import { streamMessageController } from "../controllers/streamController.js";

const router = express.Router();

router.post("/", protect, streamMessageController);

export default router;
