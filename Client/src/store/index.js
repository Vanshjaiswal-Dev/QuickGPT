import { useAuthStore } from './authStore';
import { useChatStore } from './chatStore';
import { useUIStore } from './uiStore';
import axios from './axiosInstance';
import { useNavigate } from 'react-router-dom';

// Custom hook that provides all store values and actions
// This makes it easier to migrate from Context API
export const useAppStore = () => {
  const navigate = useNavigate();
  
  // Auth store
  const { user, token, loadingUser, setUser, setToken, fetchUser, logout, initializeAuth } = useAuthStore();
  
  // Chat store
  const { 
    chats, 
    selectedChat, 
    setChats, 
    setSelectedChat, 
    fetchUsersChats, 
    createNewChat: createNewChatBase,
    deleteChat,
    clearChats 
  } = useChatStore();
  
  // UI store
  const { theme, setTheme, toggleTheme } = useUIStore();

  // Wrapper for createNewChat that includes user check and navigation
  const createNewChat = async () => {
    if (!user) {
      const toast = (await import('react-hot-toast')).default;
      return toast.error("Please login to create a new chat");
    }
    await createNewChatBase(token, navigate);
  };

  return {
    // Navigation
    navigate,
    
    // Auth
    user,
    setUser,
    token,
    setToken,
    loadingUser,
    fetchUser,
    logout,
    initializeAuth,
    
    // Chats
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchUsersChats: () => fetchUsersChats(token),
    createNewChat,
    deleteChat: (chatId) => deleteChat(chatId, token),
    clearChats,
    
    // UI
    theme,
    setTheme,
    toggleTheme,
    
    // Axios instance
    axios
  };
};
