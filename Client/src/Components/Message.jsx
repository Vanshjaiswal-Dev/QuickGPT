import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import Prism from "prismjs";

const Message = ({ message }) => {

  useEffect(()=>{

    Prism.highlightAll();


  },[message.content])
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div
            className="flex flex-col gap-2 p-2 px-3 md:px-4 bg-slate-50 dark:bg-[#57317C]/30 
                border border-gray-200 dark:border-[#80609F]/30 rounded-md max-w-[85%] md:max-w-2xl"
          >
            <p className="text-xs md:text-sm text-gray-900 dark:text-primary break-words">{message.content}</p>

            <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <img src={assets.user_icon} alt="" className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0" />
        </div>
      ) : (
        <div
          className="inline-flex flex-col gap-2 p-2 px-3 md:px-4 max-w-[90%] md:max-w-2xl bg-primary/20 
                dark:bg-[#57317C]/30 border border-gray-200 dark:border-[#80609F]/30 
                rounded-md my-4"
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
            <div className="text-xs md:text-sm text-gray-900 dark:text-primary reset-tw break-words">
              <Markdown>{message.content}</Markdown>
            </div>
          )}

          <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">{moment(message.timestamp).fromNow()}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
