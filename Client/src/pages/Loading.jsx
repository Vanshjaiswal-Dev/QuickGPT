import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Loading = () => {
  const navigate = useNavigate();

  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser();
      navigate("/");
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className="bg-gradient-to-br from-[#531B81] via-[#3d1660] to-[#29184B] 
                  flex items-center justify-center h-screen w-screen text-white 
                  overflow-hidden relative"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Spinner container with glow effect */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-purple-400 border-r-pink-400 animate-spin"></div>
          
          {/* Middle rotating ring - opposite direction */}
          <div className="absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-transparent border-b-blue-400 border-l-cyan-400 animate-spin-reverse"></div>
          
          {/* Inner pulsing circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          
          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500 rounded-full filter blur-2xl opacity-30 animate-pulse"></div>
        </div>

        {/* Loading text with gradient */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-pulse">
            QuickGPT
          </h2>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-400"></span>
          </div>
          <p className="text-sm text-gray-300 font-light">Loading your experience...</p>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Loading;
