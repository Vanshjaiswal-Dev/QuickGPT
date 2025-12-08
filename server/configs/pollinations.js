

const POLLINATIONS_BASE_URL = "https://image.pollinations.ai/prompt";

/**
 * Generate an image URL using Pollinations.ai
 * @param {string} prompt - The text prompt for image generation
 * @param {object} options - Optional parameters
 * @returns {string} - The generated image URL
 */
export const generatePollinationsImage = (prompt, options = {}) => {
  const {
    width = 2048,        
    height = 2048,       
    seed = Date.now(),
    model = "flux-pro",  
    nologo = true,
    enhance = true,      
    isPrivate = false,   
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



export default {
  generatePollinationsImage,
};
