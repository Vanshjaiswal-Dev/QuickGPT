import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Chatbox from "./Components/Chatbox";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import { assets } from "./assets/assets";
import './assets/prism.css'
import Loading from "./pages/Loading";
import { useAuthStore } from "./store/authStore";
import { useChatStore } from "./store/chatStore";
import Login from "./pages/Login";
import {Toaster} from 'react-hot-toast';
import { Menu } from 'lucide-react';
import { useUIStore } from "./store/uiStore";

const App = () => {

  const { user, loadingUser, token, initializeAuth } = useAuthStore();
  const { fetchUsersChats, clearChats } = useChatStore();
  const { isLoginModalOpen } = useUIStore();

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
    {!isMenuopen && <Menu className="absolute top-4 left-4 w-8 h-8 cursor-pointer md:hidden text-gray-900 dark:text-white z-20 drop-shadow-sm active:scale-90 transition-transform" onClick={()=> setIsMenuOpen(true)} />}

    <div className="bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>

    {isLoginModalOpen && <Login />}

      
    </>
  );
};

export default App;
