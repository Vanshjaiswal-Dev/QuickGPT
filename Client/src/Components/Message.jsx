import React, { useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import Prism from "prismjs";
import { User, Bot, X } from 'lucide-react';

const Message = ({ message }) => {
  // Track if image has been loaded at least once
  const hasLoadedRef = useRef(false);
  
  // Check if message is recent (less than 10 seconds old)
  const isRecentMessage = message.timestamp && (Date.now() - message.timestamp) < 10000;
  
  // Only show loading for new images that are recent and haven't loaded yet
  const [imageLoading, setImageLoading] = useState(
    message.isImage && isRecentMessage && !hasLoadedRef.current
  );
  const [imageError, setImageError] = useState(false);
  
  // Modal state for viewing image in full size
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(()=>{
    Prism.highlightAll();
  },[message.content])

  // Reset loading state only when message content changes (new image URL)
  useEffect(() => {
    if (message.isImage) {
      // Check if this is a new image URL and recent message
      const isNewImage = !hasLoadedRef.current && isRecentMessage;
      if (isNewImage) {
        setImageLoading(true);
        setImageError(false);
      }
    }
  }, [message.content, message.isImage])
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div
            className="flex flex-col gap-2 p-3 px-4 md:px-4 bg-slate-50 dark:bg-[#1a1a1a] 
                border border-gray-200 dark:border-[#252525] rounded-md max-w-[85%] md:max-w-2xl"
          >
            <p className="text-sm md:text-sm text-gray-900 dark:text-gray-300 break-words leading-relaxed">{message.content}</p>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <div className="w-8 h-8 md:w-8 md:h-8 rounded-full flex-shrink-0 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] flex items-center justify-center">
            <User className="w-5 h-5 md:w-5 md:h-5 text-white" />
          </div>
        </div>
      ) : (
        <div className="flex items-start my-4 gap-2">
          <div className="w-8 h-8 md:w-8 md:h-8 rounded-full flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="w-5 h-5 md:w-5 md:h-5 text-white" />
          </div>
          <div
            className="flex flex-col gap-2 p-3 px-4 md:px-4 max-w-[90%] md:max-w-2xl bg-primary/20 
                dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#252525] 
                rounded-md"
          >
          {message.isImage ? (
            <>
              <div className="relative">
                {/* Loading animation while image is loading */}
                {imageLoading && !imageError && (
                  <div className="flex flex-col items-center justify-center p-8 gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-purple-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Generating image...</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">This may take a few seconds</p>
                    </div>
                  </div>
                )}
                
                {/* Show error if image fails to load */}
                {imageError && (
                  <div className="flex flex-col items-center justify-center p-6 gap-2 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">Failed to load image</p>
                    <button 
                      onClick={() => {
                        setImageError(false);
                        setImageLoading(true);
                      }}
                      className="text-xs text-red-600 dark:text-red-400 underline hover:no-underline"
                    >
                      Try again
                    </button>
                  </div>
                )}
                
                {/* Actual image - hidden until loaded */}
                <img
                  src={message.content}
                  alt="Generated image"
                  className={`w-full max-w-md mt-2 rounded-md transition-opacity duration-300 cursor-pointer hover:opacity-90 ${
                    imageLoading ? 'opacity-0 absolute' : 'opacity-100'
                  }`}
                  onClick={() => setShowImageModal(true)}
                  onLoad={() => {
                    hasLoadedRef.current = true;
                    setImageLoading(false);
                    setImageError(false);
                  }}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                />
              </div>
              
              {/* Image Modal - Full Size View */}
              {showImageModal && (
                <div 
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowImageModal(false)}
                >
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  
                  <img
                    src={message.content}
                    alt="Generated image - Full size"
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-sm md:text-sm text-gray-900 dark:text-gray-300 reset-tw break-words leading-relaxed">
              <Markdown>{message.content}</Markdown>
            </div>
          )}

          <span className="text-xs text-gray-400 dark:text-gray-500">{moment(message.timestamp).fromNow()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
