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

// API controller for renaming a chat
export const renameChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.params;
        const { customName } = req.body;

        const chat = await Chat.findOneAndUpdate(
            { _id: chatId, userId },
            { customName },
            { new: true }
        );

        if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });

        res.json({ success: true, message: "Chat renamed successfully", chat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API controller for pinning a chat
export const pinChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.params;
        const { isPinned } = req.body;

        const chat = await Chat.findOneAndUpdate(
            { _id: chatId, userId },
            { isPinned },
            { new: true }
        );

        if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });

        res.json({ success: true, message: "Chat pin status updated", chat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}