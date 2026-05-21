import Chat from "../models/chat.js";
import openai from "../configs/openai.js";

export const streamMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    if (!prompt || !chatId) {
      return res.status(400).json({ success: false, message: "Prompt and chatId are required" });
    }

    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    // Save user message to database
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });
    // We don't save the full chat yet because we will save the AI's response after stream ends

    // Set headers for Server-Sent Events (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // flush the headers to establish SSE connection immediately

    const model = process.env.GROQ_API_KEY 
      ? "llama-3.3-70b-versatile"
      : process.env.OPENAI_API_KEY 
      ? "gpt-3.5-turbo"
      : "gemini-2.0-flash-exp";

    // Get the last 20 text messages for context
    const chatHistory = chat.messages
      .filter((msg) => !msg.isImage)
      .slice(-20)
      .map((msg) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      }));

    let fullResponse = "";

    try {
      const stream = await openai.chat.completions.create({
        model: model,
        messages: chatHistory,
        stream: true, // Enable streaming
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          // Send chunk to client
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      // Stream completed
      res.write(`data: [DONE]\n\n`);
      res.end();

      // Save the AI's response to the database
      chat.messages.push({
        role: "assistant",
        content: fullResponse,
        timestamp: Date.now(),
        isImage: false,
      });
      await chat.save();

    } catch (streamError) {
      console.error("OpenAI stream error:", streamError);
      
      let errorMessage = streamError.message || "An error occurred during generation.";
      if (streamError.status === 429 || streamError.message?.includes('429')) {
        errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
      }

      // If stream has started, we can't change HTTP status code, so send error as data
      res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
      res.end();
    }
  } catch (error) {
    console.error("Stream setup error:", error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.end();
    }
  }
};
