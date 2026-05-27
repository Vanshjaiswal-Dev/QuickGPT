import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { BarChart3, MessageSquare, Bot, User, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { token } = useAuthStore();
    const [analytics, setAnalytics] = useState({
        totalChats: 0,
        totalMessages: 0,
        userMessages: 0,
        aiMessages: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/analytics`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success) {
                    setAnalytics(res.data.analytics);
                }
            } catch (error) {
                console.error("Error fetching analytics", error);
                toast.error("Failed to load analytics");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchAnalytics();
        }
    }, [token]);

    const statCards = [
        { title: 'Total Chats', value: analytics.totalChats, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Total Messages', value: analytics.totalMessages, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { title: 'User Messages', value: analytics.userMessages, icon: User, color: 'text-green-500', bg: 'bg-green-500/10' },
        { title: 'AI Responses', value: analytics.aiMessages, icon: Bot, color: 'text-orange-500', bg: 'bg-orange-500/10' }
    ];

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                <div className="flex items-center gap-3 mb-8">
                    <BarChart3 className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold">Your Analytics Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div key={idx} className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">{card.title}</h3>
                                    <div className={`p-3 rounded-xl ${card.bg}`}>
                                        <Icon className={`w-6 h-6 ${card.color}`} />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold">
                                    {card.value.toLocaleString()}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Interaction Overview</h2>
                    <div className="h-64 flex items-end gap-8 pt-8">
                        {/* Simple CSS-based bar visualization */}
                        <div className="flex-1 flex flex-col items-center gap-4">
                            <div className="w-full bg-blue-500/20 rounded-t-lg relative group transition-all duration-500" 
                                 style={{ height: `${Math.max(10, (analytics.totalChats / (analytics.totalMessages || 1)) * 100)}%` }}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded">
                                    {analytics.totalChats}
                                </div>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">Chats</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-4">
                            <div className="w-full bg-green-500/20 rounded-t-lg relative group transition-all duration-500" 
                                 style={{ height: `${Math.max(10, (analytics.userMessages / (analytics.totalMessages || 1)) * 100)}%` }}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded">
                                    {analytics.userMessages}
                                </div>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">User Msgs</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-4">
                            <div className="w-full bg-orange-500/20 rounded-t-lg relative group transition-all duration-500" 
                                 style={{ height: `${Math.max(10, (analytics.aiMessages / (analytics.totalMessages || 1)) * 100)}%` }}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded">
                                    {analytics.aiMessages}
                                </div>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">AI Msgs</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
