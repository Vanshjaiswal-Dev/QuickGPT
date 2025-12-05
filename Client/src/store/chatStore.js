import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const useChatStore = create((set, get) => ({
  // State
  chats: [],
  selectedChat: null,

  // Actions
  setChats: (chats) => set({ chats }),
  
  setSelectedChat: (chat) => set({ selectedChat: chat }),

  fetchUsersChats: async (token) => {
    try {
      const { data } = await axios.get('/api/chat/get', {
        headers: { Authorization: token }
      });
      if (data.success) {
        set({ chats: data.chats });
        if (data.chats.length === 0) {
          await get().createNewChat(token);
          return get().fetchUsersChats(token);
        } else {
          set({ selectedChat: data.chats[0] });
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  },

  createNewChat: async (token, navigate) => {
    try {
      if (navigate) {
        navigate('/');
      }
      await axios.get('/api/chat/create', {
        headers: { Authorization: token }
      });
      await get().fetchUsersChats(token);
    } catch (error) {
      toast.error(error.message);
    }
  },

  deleteChat: async (chatId, token) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this chat?");
      if (!confirm) return;
      
      const { data } = await axios.post('/api/chat/delete', 
        { chatId }, 
        { headers: { Authorization: token } }
      );
      
      if (data.success) {
        set((state) => ({
          chats: state.chats.filter(chat => chat._id !== chatId)
        }));
        await get().fetchUsersChats(token);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  },

  // Update messages in a specific chat
  updateChatMessages: (chatId, newMessages) => {
    set((state) => ({
      chats: state.chats.map(chat => 
        chat._id === chatId 
          ? { ...chat, messages: newMessages }
          : chat
      ),
      selectedChat: state.selectedChat?._id === chatId
        ? { ...state.selectedChat, messages: newMessages }
        : state.selectedChat
    }));
  },

  clearChats: () => set({ chats: [], selectedChat: null })
}));
