// Simple in-memory rate limiter for Gemini API
// Gemini free tier: 15 requests per minute (RPM)
// Using slightly lower limit (12) to be safe and prevent hitting API limit

const requestCounts = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 12; // Set to 12 to stay safely under 15 RPM limit
const MIN_INTERVAL = 5000; // Minimum 5 seconds between requests

export const rateLimiter = (req, res, next) => {
  const userId = req.user._id.toString();
  const now = Date.now();
  
  // Get user's request history
  if (!requestCounts.has(userId)) {
    requestCounts.set(userId, []);
  }
  
  const userRequests = requestCounts.get(userId);
  
  // Filter out requests older than 1 minute
  const recentRequests = userRequests.filter(timestamp => now - timestamp < WINDOW_MS);
  
  // Check minimum interval between requests (prevent rapid fire)
  if (recentRequests.length > 0) {
    const lastRequest = Math.max(...recentRequests);
    const timeSinceLastRequest = now - lastRequest;
    
    if (timeSinceLastRequest < MIN_INTERVAL) {
      const waitTime = Math.ceil((MIN_INTERVAL - timeSinceLastRequest) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitTime} seconds between messages to avoid hitting rate limits.`,
        rateLimitError: true,
        resetTime: waitTime
      });
    }
  }
  
  // Check if user has exceeded max requests per minute
  if (recentRequests.length >= MAX_REQUESTS) {
    const oldestRequest = Math.min(...recentRequests);
    const resetTime = Math.ceil((WINDOW_MS - (now - oldestRequest)) / 1000);
    
    return res.status(429).json({
      success: false,
      message: `Rate limit exceeded. You can make ${MAX_REQUESTS} requests per minute. Please try again in ${resetTime} seconds.`,
      rateLimitError: true,
      resetTime
    });
  }
  
  // Add current request
  recentRequests.push(now);
  requestCounts.set(userId, recentRequests);
  
  next();
};

// Cleanup old entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [userId, requests] of requestCounts.entries()) {
    const recentRequests = requests.filter(timestamp => now - timestamp < WINDOW_MS);
    if (recentRequests.length === 0) {
      requestCounts.delete(userId);
    } else {
      requestCounts.set(userId, recentRequests);
    }
  }
}, 5 * 60 * 1000);
