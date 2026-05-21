import Chat from "../models/chat.js";




export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        }
        await Chat.create(chatData);
        res.status(201).json({success: true, message: "Chat created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} 

// API controller for getting all chats

export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

        res.json({success: true, chats });
       
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} 

// API controller for deleting a chat

export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.params;

        await Chat.deleteOne({ _id: chatId, userId });

        
        res.json({success: true, message: "Chat deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} 