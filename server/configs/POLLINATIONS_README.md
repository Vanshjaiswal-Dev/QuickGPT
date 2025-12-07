# Pollinations.ai Integration

## Overview

This project now uses **Pollinations.ai** for free, unlimited AI image generation. Pollinations.ai is a completely free service that provides high-quality AI-generated images without any API keys or rate limits.

## Why Pollinations.ai?

- ✅ **Completely Free** - No API keys required
- ✅ **No Rate Limits** - Generate unlimited images
- ✅ **High Quality** - Uses state-of-the-art models like FLUX
- ✅ **Fast** - Direct image URLs, no download/upload needed
- ✅ **Multiple Models** - Support for different art styles

## Available Models

### 1. **flux** (Default)

Best all-around model for high-quality images.

### 2. **flux-realism**

Perfect for photorealistic images and portraits.

### 3. **flux-anime**

Specialized for anime and manga-style artwork.

### 4. **flux-3d**

Creates 3D-rendered style images.

### 5. **turbo**

Faster generation with slightly lower quality.

## How It Works

### Configuration

The `pollinations.js` file provides a simple function to generate image URLs:

```javascript
import { generatePollinationsImage } from "./configs/pollinations.js";

// Generate an image URL
const imageUrl = generatePollinationsImage(
  "a beautiful sunset over mountains",
  {
    width: 1024,
    height: 1024,
    model: "flux-realism",
    nologo: true,
    enhance: true,
  }
);
```

### Parameters

- **prompt** (required): Text description of the image to generate
- **width**: Image width in pixels (default: 1024)
- **height**: Image height in pixels (default: 1024)
- **model**: AI model to use (default: "flux")
- **nologo**: Remove Pollinations logo (default: true)
- **enhance**: AI-enhance the prompt for better results (default: true)
- **seed**: Random seed for reproducible results (default: current timestamp)

## Usage in Controllers

The image generation is implemented in `messageController.js`:

```javascript
export const imageMessageController = async (req, res) => {
  const { prompt, chatId, isPublished } = req.body;

  // Generate image URL
  const generatedImageURL = generatePollinationsImage(prompt, {
    width: 1024,
    height: 1024,
    model: "flux",
    nologo: true,
    enhance: true,
  });

  // Save and respond with the URL
  const reply = {
    role: "assistant",
    content: generatedImageURL,
    timestamp: Date.now(),
    isImage: true,
    isPublished,
  };

  res.json({ success: true, reply });
};
```

## Benefits Over ImageKit

### Before (ImageKit):

1. Required API keys and account setup
2. Free tier had strict limits
3. Had to download image from generation service
4. Had to upload to ImageKit for hosting
5. Two-step process was slower
6. Could hit rate limits

### After (Pollinations.ai):

1. No API keys or setup required
2. Completely unlimited and free
3. Direct URL generation
4. No upload needed
5. Instant response
6. Never hit rate limits

## Examples

### Basic Usage

```javascript
const url = generatePollinationsImage("a cat sitting on a windowsill");
```

### High-Quality Portrait

```javascript
const url = generatePollinationsImage(
  "professional headshot of a business woman",
  {
    model: "flux-realism",
    width: 1024,
    height: 1024,
  }
);
```

### Anime Style

```javascript
const url = generatePollinationsImage("anime girl with blue hair", {
  model: "flux-anime",
  width: 1024,
  height: 1024,
});
```

### 3D Rendered

```javascript
const url = generatePollinationsImage("futuristic robot", {
  model: "flux-3d",
  width: 1024,
  height: 1024,
});
```

## API Endpoint Format

The generated URLs follow this pattern:

```
https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&model=flux&nologo=true&enhance=true&seed=1234567890
```

## Migration Notes

### Removed Dependencies

- `imagekit` package
- `@imagekit/nodejs` package

### Removed Environment Variables

- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_URL_ENDPOINT`

### Updated Files

- `configs/pollinations.js` - New configuration file
- `controllers/messageController.js` - Updated image generation logic
- `server.js` - Updated health check endpoint
- `package.json` - Removed ImageKit dependencies

## Performance

Pollinations.ai provides:

- **Instant URL generation** - No wait time
- **CDN-backed images** - Fast loading worldwide
- **Persistent URLs** - Images remain accessible
- **High resolution** - Up to 2048x2048 pixels

## Support

For more information about Pollinations.ai, visit:

- Website: https://pollinations.ai
- Documentation: https://pollinations.ai/p/api-reference

## License

Pollinations.ai is free to use for all purposes.
