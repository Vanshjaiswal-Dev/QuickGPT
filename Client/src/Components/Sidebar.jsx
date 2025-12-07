import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";
import { assets } from "../assets/assets.js";
import moment from "moment";
import toast from "react-hot-toast";
import Loading from "../pages/Loading.jsx";
import { Search, Trash2, Images, Sun, Moon, User, LogOut, X } from 'lucide-react';

const Sidebar = ({isMenuopen, setIsMenuOpen}) => {
  const navigate = useNavigate();
  const { chats, setSelectedChat, fetchUsersChats, deleteChat: deleteChatFromStore, selectedChat } = useChatStore();
  const { theme, toggleTheme, setTheme } = useUIStore();
  const { user, token, logout } = useAuthStore();

  const [search, setSearch] = useState("");

  const createNewChat = async () => {
    if (!user) {
      return toast.error("Please login to create a new chat");
    }
    navigate('/');
    await useChatStore.getState().createNewChat(token, navigate);
  };

  const deleteChat = async (e, chatId) => {
    e.stopPropagation();
    await deleteChatFromStore(chatId, token);
  };

  return (
    <div className={`flex flex-col h-screen w-full md:min-w-72 md:w-auto p-4 md:p-5 bg-white dark:bg-[#121212] border-r
     border-gray-200 dark:border-[#252525] transition-all duration-300 max-md:absolute left-0 z-10 shadow-xl dark:shadow-black/50 ${!isMenuopen && 'max-md:-translate-x-full'}  `}>
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        alt="Logo"
        className="w-full max-w-40 md:max-w-48"
      />

      <button
      onClick={createNewChat}
        className="flex justify-center items-center w-full py-2.5 mt-8 md:mt-10 
             text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] 
             text-base md:text-sm rounded-md cursor-pointer active:scale-95 transition-all duration-200
             hover:shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-purple-500/30"
      >
        <span className="mr-2 text-xl md:text-2xl">+</span>New Chat
      </button>

      <div
        className="flex items-center gap-2 p-2.5 md:p-3 mt-4 border border-gray-300 
             dark:border-[#252525] rounded-md bg-white dark:bg-[#1a1a1a] transition-colors duration-200"
      >
        <Search className="w-4 md:w-4 text-gray-900 dark:text-gray-400" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations"
          className="text-sm md:text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none bg-transparent w-full text-gray-900 dark:text-gray-300"
        />
      </div>

      {chats && chats.length > 0 && <p className="mt-3 md:mt-4 text-sm md:text-sm font-medium text-gray-600 dark:text-gray-400">Recent Chats</p>}
      <div className="flex-1 overflow-y-scroll mt-2 md:mt-3 text-sm space-y-2 md:space-y-3">
        {chats && chats
          .filter((chat) =>
            chat.messages && chat.messages.length > 0 && chat.messages[0]
              ? chat.messages[0]?.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name?.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div 
              key={chat._id}
              className={`p-2 md:p-2 px-3 md:px-4 ${selectedChat?._id === chat._id ? 'bg-purple-100 dark:bg-[#252525] border-purple-300 dark:border-[#3a3a3a]' : 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#252525]'} border 
             rounded-md cursor-pointer 
             flex justify-between items-center gap-2 group md:hover:bg-gray-100 md:dark:hover:bg-[#1f1f1f] active:bg-gray-100 dark:active:bg-[#1f1f1f] transition-all duration-200`}
            >
              <div onClick={()=> {navigate('/'); setSelectedChat(chat); setIsMenuOpen(false)}} className="flex-1 min-w-0">
                <p className="truncate w-full text-sm md:text-sm text-gray-900 dark:text-gray-300">
                  {chat.messages && chat.messages.length > 0
                    ? chat.messages[0]?.content.slice(0, 28)
                    : chat.name}
                </p>
                <p className="text-xs md:text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                  {moment(chat.updatedAt).fromNow()}</p>
              </div>

              <Trash2
                className="md:hidden md:group-hover:block shrink-0
              w-4 h-4 md:w-4 md:h-4 cursor-pointer text-gray-900 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                onClick={(e) => toast.promise(deleteChat(e, chat._id), {loading:
                  'Deleting chat...'
                })}
              />
            </div>
          ))}
      </div>


      <div onClick={()=> {navigate("/community"); setIsMenuOpen(false)}} className="flex items-center gap-2 p-3 mt-4 border border-gray-300 
             dark:border-[#252525] rounded-md cursor-pointer 
             transition-all duration-200 bg-white dark:bg-[#1a1a1a] md:hover:bg-gray-50 md:dark:hover:bg-[#1f1f1f] active:bg-gray-100 dark:active:bg-[#1f1f1f]">
        <Images className="w-5 md:w-4.5 text-gray-900 dark:text-gray-400" />
        <div className="flex flex-col text-sm md:text-sm">
          <p className="dark:text-gray-300">Community Images</p>
        </div>
      </div>

      <div  className="flex items-center justify-between gap-2 p-2.5 md:p-3 mt-3 md:mt-4 border border-gray-300 
             dark:border-[#252525] rounded-md bg-white dark:bg-[#1a1a1a] transition-colors duration-200">
        <div className="flex items-center gap-2 text-sm md:text-sm">
          {theme === "dark" ? <Moon className="w-4 md:w-4 text-gray-900 dark:text-gray-400" /> : <Sun className="w-4 md:w-4 text-gray-900 dark:text-gray-400" />}
          <p className="dark:text-gray-300">Dark mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input onClick={toggleTheme} type="checkbox" className="sr-only peer" checked={theme==="dark"} />
          <div className="w-8 h-4 md:w-9 md:h-5 bg-gray-400 dark:bg-gray-600 rounded-full
          peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-0.5 top-0.5 md:left-1 md:top-1 w-3 h-3 bg-white rounded-full 
             transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* {user account} */}

      <div  className="flex items-center justify-between gap-2 md:gap-3 p-2.5 md:p-3 mt-3 md:mt-4 border border-gray-300 
             dark:border-[#252525] rounded-md group bg-white dark:bg-[#1a1a1a]
             md:hover:bg-gray-50 md:dark:hover:bg-[#1f1f1f] transition-all duration-200">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="w-7 h-7 md:w-7 md:h-7 rounded-full shrink-0 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] flex items-center justify-center">
            <User className="w-4.5 h-4.5 md:w-4.5 md:h-4.5 text-white" />
          </div>
          <p className="text-sm md:text-sm text-gray-900 dark:text-gray-300 truncate">{user ? user.name : 'login account'}</p>
        </div>
        {user && <LogOut onClick={logout} className="h-5 md:h-5 cursor-pointer md:hidden md:group-hover:block shrink-0 text-gray-900 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors" /> }
      </div>

      <X onClick={()=> setIsMenuOpen(false)} className="absolute top-4 right-4 w-6 h-6 cursor-pointer md:hidden text-gray-900 dark:text-gray-400 active:scale-90 transition-transform hover:text-red-500 dark:hover:text-red-400" />
    </div>
  );
};

export default Sidebar;
