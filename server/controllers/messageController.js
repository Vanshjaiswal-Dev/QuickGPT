//text based ai chat controller
import axios from "axios";
import Chat from "../models/chat.js";
import User from "../models/User.js";
import imageKit from "../configs/imageKit.js";
import openai from "../configs/openai.js";

export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    res.json({ success: true, reply });

    chat.messages.push(reply);
    await chat.save();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// image generation controller

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

       const {prompt, chatId, isPublished} = req.body;

       const chat = await Chat.findOne({userId, _id:chatId});

         chat.messages.push({
           role: "user",
           content: prompt,
           timestamp: Date.now(),
           isImage: true,
       });

       // encode the prompt

       const encodedPrompt = encodeURIComponent(prompt);

       const generatedImageURL = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/AuraCoreAI/${Date.now()}.png?tr=w-800,
       h-800`;

      const aiImageResponse =  await axios.get(generatedImageURL, {responseType:"arraybuffer"});

      // conver to base64

      const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString("base64")}`;


        // upload to imagekit

        const uploadResponse = await imageKit.upload({
            file: base64Image,
            fileName:`${Date.now()}.png`,
            folder:"AuraCoreAI"
        });

        const reply = {
      role : 'assistant',
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished
    };

    res.json({ success: true, reply });

    chat.messages.push(reply)
    await chat.save()

       
    } catch (error) {
        res.json({success: false , message: error.message})
        
    }
}
  
