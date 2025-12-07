import express from "express";
import { protect } from "../middlewares/auth.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { imageMessageController, textMessageController } from "../controllers/messageController.js";

const messageRouter = express.Router();

// Rate limiter enabled - 12 requests per minute, 5 seconds between requests
messageRouter.post('/text', protect, rateLimiter, textMessageController);
messageRouter.post('/image', protect, rateLimiter, imageMessageController);

export default messageRouter;