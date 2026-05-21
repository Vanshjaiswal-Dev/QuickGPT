import express from "express";
import { createChat, deleteChat, getChats } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

chatRouter.post('/', protect, createChat);
chatRouter.get('/', protect, getChats);
chatRouter.delete('/:chatId', protect, deleteChat);

export default chatRouter;
