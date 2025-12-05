import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";
import axios from "../store/axiosInstance";
import Message from "./Message";
import toast from "react-hot-toast";

const Chatbox = () => {

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

  const onSubmit = async (e) => {
    try {
    e.preventDefault();
      if(!user) return toast('login to send message')
        setLoading(true);
      const promptCopy = prompt;
      setPrompt("");
      
      // Create user message
      const userMessage = {
        role: "user", 
        content: prompt, 
        timestamp: Date.now(),
        isImage: false
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      const {data} = await axios.post(`/api/message/${mode}`, {chatId:
        selectedChat._id, prompt, isPublished}, {headers: {Authorization : token }
      }) 

      if(data.success){
        // Update local state with AI reply
        const updatedMessages = [...messages, userMessage, data.reply];
        setMessages(updatedMessages);
        
        // Update chat messages in store (persists across navigation)
        updateChatMessages(selectedChat._id, updatedMessages);
      }
      else{
        toast.error(data.message)
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setPrompt("");
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
      className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 
                max-md:mt-14 2xl:pr-40"
    >
      {/* Chat Messages */}
      <div ref={containerRef} onScroll={handleScroll} className="flex-1 mb-5 overflow-y-scroll relative">
        {messages.length === 0 && (
          <div
            className="h-full flex flex-col items-center justify-center gap-2
      text-primary"
          >
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              alt=""
              className="w-full max-w-56 sm:max-w-68"
            />
            <p
              className="mt-5 text-4xl sm:text-6xl text-center text-gray-400
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

        {/* Scroll to Top Button */}
        {showScrollTop && messages.length > 0 && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] 
                     text-white p-2 rounded-full shadow-lg hover:shadow-xl 
                     transition-all duration-300 hover:scale-110 z-50"
            aria-label="Scroll to top"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </button>
        )}
      </div>

      {mode === "image" && (
        <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto">
          <p className="text-xs">Published Generated Image to Community</p>
          <input type="checkbox" className="cursor-pointer" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        </label>
      )}

      {/* prompt input box */}

      <form
        onSubmit={onSubmit}
        className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary 
             dark:border-[#80609F]/30 rounded-full w-full max-w-2xl 
             p-3 pl-4 mx-auto flex gap-4 items-center"
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-sm pl-3 pr-2 outline-none bg-transparent text-gray-900 dark:text-white cursor-pointer"
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
          placeholder="type your propt here..."
          className="flex-1 w-full text-sm outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          required
        />
        <button disabled={loading}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="w-8 cursor-pointer"
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
