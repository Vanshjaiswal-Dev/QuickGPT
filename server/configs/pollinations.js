// Pollinations.ai configuration
// Free AI image generation service with no limits

const POLLINATIONS_BASE_URL = "https://image.pollinations.ai/prompt";

/**
 * Generate an image URL using Pollinations.ai
 * @param {string} prompt - The text prompt for image generation
 * @param {object} options - Optional parameters
 * @returns {string} - The generated image URL
 */
export const generatePollinationsImage = (prompt, options = {}) => {
  const {
    width = 2048,        // 🔥🔥 ULTRA MAX: 2K resolution (2048x2048)
    height = 2048,       // 🏆 MAXIMUM quality possible with Pollinations
    seed = Date.now(),
    model = "flux-pro",  // 🏆 Best quality model available
    nologo = true,
    enhance = true,      // AI enhancement ON for better prompts
    isPrivate = false,   // Set true if you want images not indexed by search engines
  } = options;

  // Encode the prompt for URL
  const encodedPrompt = encodeURIComponent(prompt);

  // Build query parameters
  const params = new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    seed: seed.toString(),
    model,
    nologo: nologo.toString(),
    enhance: enhance.toString(),
    private: isPrivate.toString(),
  });

  // Construct the full URL
  const imageUrl = `${POLLINATIONS_BASE_URL}/${encodedPrompt}?${params.toString()}`;

  return imageUrl;
};

/**
 * Available models (in order of quality):
 * - flux-pro: 🏆 HIGHEST quality, best for professional images
 * - flux-realism: 📸 Photorealistic images with great detail
 * - flux: ⭐ High-quality default model
 * - flux-anime: 🎌 Anime/manga style images
 * - flux-3d: 🎮 3D-rendered style images
 * - turbo: ⚡ Faster generation, lower quality
 * 
 * Recommended resolutions:
 * - Ultra High: 1792x1792 (3.2 MP) - Best quality
 * - High: 1024x1024 (1 MP) - Good balance
 * - Medium: 768x768 - Faster loading
 * - Low: 512x512 - Quick preview
 */

export default {
  generatePollinationsImage,
};
