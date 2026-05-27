import { InferenceClient } from "@huggingface/inference";
import imagekit from "./imageKit.js";

/**
 * Generate an image using Hugging Face official SDK and upload to ImageKit
 * Uses router.huggingface.co (resolvable) instead of api-inference.huggingface.co
 * @param {string} prompt - The text prompt for image generation
 * @returns {Promise<string>} - The permanent image URL from ImageKit
 */
export const generateImage = async (prompt) => {
  const HF_TOKEN = process.env.HF_API_TOKEN;

  if (!HF_TOKEN) {
    throw new Error("HF_API_TOKEN is not set in environment variables");
  }

  // Step 1: Generate image via Hugging Face official SDK
  console.log("🎨 Generating image with Hugging Face for prompt:", prompt);

  const client = new InferenceClient(HF_TOKEN);

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      const imageBlob = await client.textToImage({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        inputs: prompt,
        parameters: {
          width: 1024,
          height: 1024,
        },
      });

      // Convert Blob to Buffer
      const arrayBuffer = await imageBlob.arrayBuffer();
      const imageBuffer = Buffer.from(arrayBuffer);

      console.log("✅ Image generated, uploading to ImageKit...");

      // Step 2: Upload to ImageKit for a permanent CDN URL
      const uploadResponse = await imagekit.upload({
        file: imageBuffer,
        fileName: `quickgpt_${Date.now()}.png`,
        folder: "/quickgpt-images",
      });

      console.log("✅ Image uploaded:", uploadResponse.url);
      return uploadResponse.url;

    } catch (error) {
      // Handle model loading (503)
      if (error.message?.includes("503") || error.message?.includes("loading")) {
        retries++;
        const waitTime = 20;
        console.log(`⏳ Model loading, retry ${retries}/${maxRetries} in ${waitTime}s...`);
        await new Promise((r) => setTimeout(r, waitTime * 1000));
        continue;
      }
      throw error;
    }
  }

  throw new Error("Image model failed to load after multiple retries. Please try again later.");
};

export default { generateImage };
