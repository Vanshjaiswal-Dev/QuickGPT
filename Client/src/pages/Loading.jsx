import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { assets } from "../assets/assets";

const Loading = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser();
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [fetchUser, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100 relative overflow-hidden">
      
      {/* Sleek animated background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-gradient-to-r from-[#A456F7] to-[#3D81F6] rounded-full blur-[100px] opacity-20 dark:opacity-30 animate-pulse-slow pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo and Spinner Container */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Smooth spinning ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-gray-200 dark:border-[#252525]"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#A456F7] border-r-[#3D81F6] animate-spin"></div>
          
          {/* Center Logo */}
          <img src={assets.logo} alt="QuickGPT Logo" className="w-10 h-10 animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-gray-200">
            QuickGPT
          </h2>
          <div className="flex items-center gap-1.5 mt-1">
             <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
             <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(0.95); }
          50% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        :global(.dark) .animate-pulse-slow {
          animation: pulse-slow-dark 4s ease-in-out infinite;
        }
        @keyframes pulse-slow-dark {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(0.95); }
          50% { opacity: 0.35; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
