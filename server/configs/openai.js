import {OpenAI} from "openai";

// Support multiple AI providers
// Priority: GROQ > OpenAI > Gemini

let openai;

if (process.env.GROQ_API_KEY) {
    console.log("✅ Using GROQ AI (Free & Fast)");
    openai = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1"
    });
} else if (process.env.OPENAI_API_KEY) {
    // OpenAI - $5 free credit
    console.log("✅ Using OpenAI");
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
} else if (process.env.GEMINI_API_KEY) {
    // Gemini - 15 requests per minute limit
    console.log("✅ Using Gemini AI");
    openai = new OpenAI({
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });
} else {
    console.error(" No AI API key found! Add GROQ_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to .env");
}

export default openai;