import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import Prism from "prismjs";
import { User, Bot } from 'lucide-react';

const Message = ({ message }) => {

  useEffect(()=>{

    Prism.highlightAll();


  },[message.content])
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
              <img
                src={message.content}
                alt=""
                className="w-full max-w-md mt-2 rounded-md"
              />
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
