import Chat from "../models/chat.js";

export const getAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalChats = await Chat.countDocuments({ userId });

        const aggregatedMessages = await Chat.aggregate([
            { $match: { userId: String(userId) } },
            { $unwind: "$messages" },
            {
                $group: {
                    _id: null,
                    totalMessages: { $sum: 1 },
                    userMessages: {
                        $sum: { $cond: [{ $eq: ["$messages.role", "user"] }, 1, 0] }
                    },
                    aiMessages: {
                        $sum: { $cond: [{ $eq: ["$messages.role", "model"] }, 1, 0] }
                    }
                }
            }
        ]);

        const stats = aggregatedMessages[0] || { totalMessages: 0, userMessages: 0, aiMessages: 0 };

        res.status(200).json({
            success: true,
            analytics: {
                totalChats,
                totalMessages: stats.totalMessages,
                userMessages: stats.userMessages,
                aiMessages: stats.aiMessages
            }
        });
    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch analytics" });
    }
};
