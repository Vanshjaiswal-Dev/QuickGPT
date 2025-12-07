import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";
import { assets } from "../assets/assets.js";
import moment from "moment";
import toast from "react-hot-toast";
import Loading from "../pages/Loading.jsx";

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
    <div className={`flex flex-col h-screen w-full md:min-w-72 md:w-auto p-4 md:p-5 bg-white dark:bg-gradient-to-b dark:from-[#242124]/90 dark:to-[#000000]/90 border-r
     border-gray-200 dark:border-[#80609f]/30 backdrop-blur-3xl transition-all duration-300 max-md:absolute left-0 z-10 ${!isMenuopen && 'max-md:-translate-x-full'}  `}>
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        alt="Logo"
        className="w-full max-w-40 md:max-w-48"
      />

      <button
      onClick={createNewChat}
        className="flex justify-center items-center w-full py-2 mt-8 md:mt-10 
             text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] 
             text-sm rounded-md cursor-pointer active:scale-95 transition-transform"
      >
        <span className="mr-2 text-xl">+</span>New Chat
      </button>

      <div
        className="flex items-center gap-2 p-2 md:p-3 mt-4 border border-gray-300 
             dark:border-white/20 rounded-md bg-white dark:bg-transparent"
      >
        <img src={assets.search_icon} className="w-3.5 md:w-4 invert-0 dark:invert brightness-0 dark:brightness-100" alt="Search" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations"
          className="text-xs md:text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none bg-transparent w-full text-gray-900 dark:text-white"
        />
      </div>

      {chats && chats.length > 0 && <p className="mt-3 md:mt-4 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Recent Chats</p>}
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
              className={`p-2 md:p-2 px-3 md:px-4 ${selectedChat?._id === chat._id ? 'bg-purple-100 dark:bg-[#57317C]/30 border-purple-300 dark:border-[#80609F]/40' : 'bg-gray-50 dark:bg-[#57317C]/10 border-gray-200 dark:border-[#80609F]/15'} border 
             rounded-md cursor-pointer 
             flex justify-between items-center gap-2 group md:hover:bg-gray-100 md:dark:hover:bg-[#57317C]/20 active:bg-gray-100 dark:active:bg-[#57317C]/20 transition-colors`}
            >
              <div onClick={()=> {navigate('/'); setSelectedChat(chat); setIsMenuOpen(false)}} className="flex-1 min-w-0">
                <p className="truncate w-full text-xs md:text-sm text-gray-900 dark:text-white">
                  {chat.messages && chat.messages.length > 0
                    ? chat.messages[0]?.content.slice(0, 28)
                    : chat.name}
                </p>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-[#B1A6C0] mt-0.5">
                  {moment(chat.updatedAt).fromNow()}</p>
              </div>

              <img
                src={assets.bin_icon}
                className="md:hidden md:group-hover:block shrink-0
              w-3.5 h-3.5 md:w-4 md:h-4 cursor-pointer invert-0 dark:invert brightness-0 dark:brightness-100"
                alt="Delete"
                onClick={(e) => toast.promise(deleteChat(e, chat._id), {loading:
                  'Deleting chat...'
                })}
              />
            </div>
          ))}
      </div>


      <div onClick={()=> {navigate("/community"); setIsMenuOpen(false)}} className="flex items-center gap-2 p-3 mt-4 border border-gray-300 
             dark:border-white/15 rounded-md cursor-pointer 
             transition-all bg-white dark:bg-transparent md:hover:bg-gray-50 md:dark:hover:bg-white/5 active:bg-gray-100 dark:active:bg-white/10">
        <img src={assets.gallery_icon} className="w-4 md:w-4.5 invert-0 dark:invert brightness-0 dark:brightness-100" alt="Gallery" />
        <div className="flex flex-col text-xs md:text-sm">
          <p>Community Images</p>
        </div>
      </div>

      <div  className="flex items-center justify-between gap-2 p-2 md:p-3 mt-3 md:mt-4 border border-gray-300 
             dark:border-white/15 rounded-md bg-white dark:bg-transparent">
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <img src={assets.theme_icon} className="w-3.5 md:w-4 invert-0 dark:invert brightness-0 dark:brightness-100" alt="Theme" />
          <p>Dark mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input onClick={toggleTheme} type="checkbox" className="sr-only peer" checked={theme==="dark"} />
          <div className="w-8 h-4 md:w-9 md:h-5 bg-gray-400 rounded-full
          peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-0.5 top-0.5 md:left-1 md:top-1 w-3 h-3 bg-white rounded-full 
             transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* {user account} */}

      <div  className="flex items-center justify-between gap-2 md:gap-3 p-2 md:p-3 mt-3 md:mt-4 border border-gray-300 
             dark:border-white/15 rounded-md group bg-white dark:bg-transparent
             md:hover:bg-gray-50 md:dark:hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <img src={assets.user_icon} className="w-6 h-6 md:w-7 md:h-7 rounded-full shrink-0" alt="User" />
          <p className="text-xs md:text-sm text-gray-900 dark:text-primary truncate">{user ? user.name : 'login account'}</p>
        </div>
        {user && <img onClick={logout} src={assets.logout_icon} className="h-4 md:h-5 cursor-pointer md:hidden md:group-hover:block shrink-0
          invert-0 dark:invert brightness-0 dark:brightness-100"  alt="Logout" /> }
      </div>

      <img onClick={()=> setIsMenuOpen(false)} src={assets.close_icon} className="absolute top-4 right-4 w-6 h-6 cursor-pointer md:hidden invert-0 dark:invert brightness-0 dark:brightness-100 active:scale-90 transition-transform" alt="Close menu" />
    </div>
  );
};

export default Sidebar;
