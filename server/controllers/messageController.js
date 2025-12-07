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

    // Auto-detect model based on which API key is being used
    const model = process.env.GROQ_API_KEY 
      ? "llama-3.3-70b-versatile"  // GROQ's best model
      : process.env.OPENAI_API_KEY 
      ? "gpt-3.5-turbo"              // OpenAI's model
      : "gemini-2.0-flash-exp";           // Gemini's model

    const { choices } = await openai.chat.completions.create({
      model: model,
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
    console.error("Text message error:", error);
    
    // Handle rate limit errors specifically
    if (error.status === 429 || error.message?.includes('429')) {
      return res.status(429).json({ 
        success: false, 
        message: "Rate limit exceeded. Gemini free tier allows 15 requests per minute. Please wait a moment and try again.",
        rateLimitError: true
      });
    }
    
    res.status(500).json({ success: false, message: error.message });
  }
};


// image generation controller

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

       const {prompt, chatId, isPublished} = req.body;

       if (!prompt || !chatId) {
           return res.status(400).json({success: false, message: "Prompt and chatId are required"});
       }

       // Verify ImageKit credentials
       if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
           console.error("ImageKit credentials missing");
           return res.status(500).json({success: false, message: "ImageKit configuration error"});
       }

       const chat = await Chat.findOne({userId, _id:chatId});

       if (!chat) {
           return res.status(404).json({success: false, message: "Chat not found"});
       }

         chat.messages.push({
           role: "user",
           content: prompt,
           timestamp: Date.now(),
           isImage: true,
       });

       // encode the prompt

       const encodedPrompt = encodeURIComponent(prompt);

       const generatedImageURL = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/QuickGPT/${Date.now()}.png?tr=w-800,h-800`;

       console.log("Fetching image from:", generatedImageURL);

      const aiImageResponse =  await axios.get(generatedImageURL, {
          responseType:"arraybuffer",
          timeout: 30000 // 30 second timeout
      });

      // conver to base64

      const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString("base64")}`;

        console.log("Uploading to ImageKit...");

        // upload to imagekit

        const uploadResponse = await imageKit.upload({
            file: base64Image,
            fileName:`${Date.now()}.png`,
            folder:"AuraCoreAI"
        });

        console.log("Image uploaded successfully:", uploadResponse.url);

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
        console.error("Image generation error:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || error.message || "Image generation failed";
        res.status(error.response?.status || 500).json({success: false, message: errorMessage})
        
    }
}
  
