//text based ai chat controller
import axios from "axios";
import Chat from "../models/chat.js";
import User from "../models/User.js";
import { generatePollinationsImage } from "../configs/pollinations.js";
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

    // Get the last 20 text messages for context
    const chatHistory = chat.messages
      .filter((msg) => !msg.isImage)
      .slice(-20)
      .map((msg) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      }));

    // Ensure the current prompt is at the end (it was just pushed)
    // Actually, it's already in chat.messages because we pushed it above.
    
    const { choices } = await openai.chat.completions.create({
      model: model,
      messages: chatHistory.length > 0 ? chatHistory : [{ role: "user", content: prompt }],
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


// image generation controller using Pollinations.ai

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

       const {prompt, chatId, isPublished} = req.body;

       if (!prompt || !chatId) {
           return res.status(400).json({success: false, message: "Prompt and chatId are required"});
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

       console.log("Generating image with Pollinations.ai for prompt:", prompt);

       // Generate image URL using Pollinations.ai
       // 🔥🔥 ABSOLUTE MAXIMUM QUALITY - 2K Resolution + Advanced Prompt Engineering
       const qualityKeywords = "extremely detailed, ultra high resolution, 8k uhd quality, razor sharp focus, professional photography, perfect studio lighting, vibrant rich colors, masterpiece quality, award-winning composition, hyper photorealistic, intricate fine details, crystal clear clarity, perfect textures, cinematic lighting, depth of field";
       const enhancedPrompt = `${prompt}, ${qualityKeywords}`;
       
       const generatedImageURL = generatePollinationsImage(enhancedPrompt, {
           width: 2048,        // 🔥🔥 2K RESOLUTION - Maximum quality
           height: 2048,       // 🏆 ULTIMATE quality setting
           model: "flux-pro",  // 🏆 BEST model available
           nologo: true,
           enhance: true,      // AI prompt enhancement ENABLED
       });

       console.log("Generated image URL:", generatedImageURL);

       // Pollinations.ai images are directly accessible via URL
       // No need to download and re-upload, which saves time and resources

       const reply = {
           role: 'assistant',
           content: generatedImageURL,
           timestamp: Date.now(),
           isImage: true,
           isPublished
       };

       res.json({ success: true, reply });

       chat.messages.push(reply);
       await chat.save();

    } catch (error) {
        console.error("Image generation error:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || error.message || "Image generation failed";
        res.status(error.response?.status || 500).json({success: false, message: errorMessage})
    }
}
  
