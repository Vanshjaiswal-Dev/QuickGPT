import express from "express";
import { createChat, deleteChat, getChats, renameChat, pinChat } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

chatRouter.post('/', protect, createChat);
chatRouter.get('/', protect, getChats);
chatRouter.delete('/:chatId', protect, deleteChat);
chatRouter.put('/:chatId/rename', protect, renameChat);
chatRouter.put('/:chatId/pin', protect, pinChat);

export default chatRouter;
