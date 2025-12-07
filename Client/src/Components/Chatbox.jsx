import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";
import axios from "../store/axiosInstance";
import Message from "./Message";
import toast from "react-hot-toast";
import { ArrowUp, StopCircle, Send } from 'lucide-react';

const Chatbox = ({ isMenuopen }) => {

  const containerRef = useRef(null);
  const { selectedChat, updateChatMessages } = useChatStore();
  const { theme } = useUIStore();
  const { user, token } = useAuthStore();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Rate limiting
  const lastRequestTime = useRef(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!user) return toast.error('Please login to send message');
    if(!prompt.trim()) return;
    
    // Client-side cooldown to prevent rapid requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime.current;
    const minInterval = 5000; // 5 seconds minimum between requests
    
    if (timeSinceLastRequest < minInterval && lastRequestTime.current > 0) {
      const waitTime = Math.ceil((minInterval - timeSinceLastRequest) / 1000);
      toast.error(`Please wait ${waitTime} seconds before sending another message`, {
        icon: '⏱️'
      });
      return;
    }
    
    const promptCopy = prompt; // Store prompt before clearing
    setLoading(true);
    setPrompt(""); // Clear input immediately
    lastRequestTime.current = now; // Update last request time
    
    try {
      // Create user message
      const userMessage = {
        role: "user", 
        content: promptCopy, 
        timestamp: Date.now(),
        isImage: mode === "image"
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      const {data} = await axios.post(`/api/message/${mode}`, {
        chatId: selectedChat._id, 
        prompt: promptCopy, 
        isPublished
      }, {
        headers: {Authorization: token}
      }) 

      if(data.success){
        // Update local state with AI reply
        const updatedMessages = [...messages, userMessage, data.reply];
        setMessages(updatedMessages);
        
        // Update chat messages in store (persists across navigation)
        updateChatMessages(selectedChat._id, updatedMessages);
      }
      else{
        toast.error(data.message);
        setPrompt(promptCopy); // Restore prompt on error
      }
    } catch (error) {
      console.error('Message send error:', error);
      
      // Check if it's a rate limit error (429)
      if (error.response?.status === 429 || error.response?.data?.rateLimitError) {
        const resetTime = error.response?.data?.resetTime || 60;
        toast.error(`⏳ Rate limit reached! Please wait ${resetTime} seconds before sending another message.`, {
          duration: 6000,
          icon: "⚠️"
        });
      } else {
        toast.error(error.response?.data?.message || error.message || "Failed to send message");
      }
      setPrompt(promptCopy); // Restore prompt on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
    }
  }, [selectedChat]);

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  },[messages])

  // Handle scroll to show/hide scroll-to-top button
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      setShowScrollTop(scrollTop > 300); // Show button after scrolling 300px
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      className="flex-1 flex flex-col justify-between m-3 md:m-5 lg:m-10 xl:mx-30 
                max-md:mt-14 2xl:pr-40"
    >
      {/* Chat Header - Show current chat name */}
      {selectedChat && messages.length > 0 && (
        <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-200 dark:border-[#80609F]/20">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[#A456F7] to-[#3D81F6] flex items-center justify-center text-white font-semibold text-sm md:text-base shrink-0">
              {selectedChat.messages && selectedChat.messages.length > 0 
                ? selectedChat.messages[0]?.content.charAt(0).toUpperCase() 
                : 'C'}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white truncate">
                {selectedChat.messages && selectedChat.messages.length > 0
                  ? selectedChat.messages[0]?.content.slice(0, 50)
                  : selectedChat.name || 'Chat'}
              </h2>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div ref={containerRef} onScroll={handleScroll} className="flex-1 mb-3 md:mb-5 overflow-y-scroll relative">
        {messages.length === 0 && (
          <div
            className="h-full flex flex-col items-center justify-center gap-2 px-4
      text-primary"
          >
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              alt=""
              className="w-full max-w-48 sm:max-w-56 md:max-w-68"
            />
            <p
              className="mt-5 text-2xl sm:text-4xl md:text-6xl text-center text-gray-400
        dark:text-white"
            >
              Ask me anything..
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* three dot animation */}

        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
        animate-bounce"
            ></div>
            <div
              className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
        animate-bounce"
            ></div>
            <div
              className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
        animate-bounce"
            ></div>
          </div>
        )}

        {/* Scroll to Top Button - Hidden when mobile menu is open */}
        {showScrollTop && messages.length > 0 && !isMenuopen && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-28 right-6 md:right-10 lg:right-20 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] 
                     text-white p-2 md:p-3 rounded-full shadow-lg 
                     transition-all duration-300 md:hover:shadow-xl md:hover:scale-110 active:scale-95 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>

      {mode === "image" && (
        <label className="inline-flex items-center gap-2 mb-2 md:mb-3 text-xs md:text-sm mx-auto px-4">
          <p className="text-xs md:text-sm">Published Generated Image to Community</p>
          <input type="checkbox" className="cursor-pointer w-4 h-4" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        </label>
      )}

      {/* prompt input box */}

      <form
        onSubmit={onSubmit}
        className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary 
             dark:border-[#80609F]/30 rounded-full w-full max-w-2xl 
             p-2 md:p-3 pl-3 md:pl-4 mx-auto flex gap-2 md:gap-4 items-center"
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-xs md:text-sm pl-2 md:pl-3 pr-1 md:pr-2 outline-none bg-transparent text-gray-900 dark:text-white cursor-pointer"
        >
          <option className="bg-white dark:bg-purple-900 text-gray-900 dark:text-white" value="text">
            Text
          </option>
          <option className="bg-white dark:bg-purple-900 text-gray-900 dark:text-white" value="image">
            Image
          </option>
        </select>
        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="type your prompt here..."
          className="flex-1 w-full text-xs md:text-sm outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          required
        />
        <button disabled={loading} type="submit" className="flex-shrink-0 p-1.5 md:p-2 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] rounded-full transition-all md:hover:shadow-lg active:scale-95 cursor-pointer">
          {loading ? (
            <StopCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
          ) : (
            <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
