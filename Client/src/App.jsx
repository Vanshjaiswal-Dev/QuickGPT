import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Chatbox from "./Components/Chatbox";
import Community from "./pages/Community";
import { assets } from "./assets/assets";
import './assets/prism.css'
import Loading from "./pages/Loading";
import { useAuthStore } from "./store/authStore";
import { useChatStore } from "./store/chatStore";
import Login from "./pages/Login";
import {Toaster} from 'react-hot-toast';
import { Menu } from 'lucide-react';

const App = () => {

  const { user, loadingUser, token, initializeAuth } = useAuthStore();
  const { fetchUsersChats, clearChats } = useChatStore();

  const [isMenuopen , setIsMenuOpen] = useState(false)
  const {pathname} = useLocation()

  // Initialize authentication on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Fetch chats when user is authenticated
  useEffect(() => {
    if (user && token) {
      fetchUsersChats(token);
    } else {
      clearChats();
    }
  }, [user, token]);

  if(pathname === '/loading' || loadingUser) return <Loading/>

  return (
    <>
    <Toaster/>
    {!isMenuopen && <Menu className="absolute top-4 left-4 w-7 h-7 cursor-pointer md:hidden text-gray-900 dark:text-white z-20 drop-shadow-sm active:scale-90 transition-transform" onClick={()=> setIsMenuOpen(true)} />}

    {user ? (
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-[#242124] dark:to-[#000000]
      text-gray-900 dark:text-white min-h-screen">
        <div className="flex h-screen w-screen relative">
          {/* Mobile sidebar backdrop */}
          {isMenuopen && (
            <div 
              className="fixed inset-0 bg-black/50 z-[9] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          <Sidebar isMenuopen={isMenuopen} setIsMenuOpen={setIsMenuOpen} />
          <Routes>
            <Route path="/" element={<Chatbox isMenuopen={isMenuopen} />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    ) : (
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-[#242124] dark:to-[#000000] flex
      items-center justify-center h-screen w-screen">
        <Login/>
      </div>
    )}

      
    </>
  );
};

export default App;
