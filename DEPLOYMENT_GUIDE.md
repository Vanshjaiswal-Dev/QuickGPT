# Vercel Deployment Guide - Fix 403 Error

## Issues Fixed

1. ✅ CORS configuration updated with proper origins
2. ✅ Environment variable validation added
3. ✅ Better error logging
4. ✅ Proper HTTP methods in Vercel routes

## Required Environment Variables

### Backend (Server on Vercel)

You need to add these environment variables in your Vercel backend project settings:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
CLIENT_URL=https://your-frontend-domain.vercel.app
PORT=3000
```

### Frontend (Client on Vercel)

Add this environment variable in your Vercel frontend project settings:

```
VITE_SERVER_URL=https://your-backend-domain.vercel.app
```

## Steps to Fix 403 Error on Vercel

### 1. Update Environment Variables

Go to your Vercel project → Settings → Environment Variables

**For Backend Project:**

- Add all the variables listed above
- Make sure `CLIENT_URL` points to your frontend URL (e.g., `https://quickgpt-frontend.vercel.app`)
- Double-check `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, and `IMAGEKIT_URL_ENDPOINT`

**For Frontend Project:**

- Add `VITE_SERVER_URL` pointing to your backend URL (e.g., `https://quickgpt-server.vercel.app`)

### 2. Verify ImageKit Setup

1. Go to [ImageKit Dashboard](https://imagekit.io/dashboard)
2. Navigate to Developer Options → API Keys
3. Copy your:
   - Public Key
   - Private Key
   - URL Endpoint (format: `https://ik.imagekit.io/your_imagekit_id`)
4. Make sure these match what's in your Vercel environment variables

### 3. Check CORS Settings

The backend now includes proper CORS configuration:

- Allows requests from your frontend domain
- Includes Authorization header
- Supports all necessary HTTP methods

### 4. Redeploy Both Projects

After updating environment variables:

```bash
# Trigger a new deployment
# Either push a new commit or use Vercel dashboard to redeploy
```

### 5. Test the Image Generation

1. Open your deployed frontend
2. Try generating an image
3. Check browser console for any errors
4. Check Vercel backend logs (Runtime Logs) for server errors

## Common Issues & Solutions

### Issue 1: Still Getting 403 Error

**Solution:**

- Verify `CLIENT_URL` in backend env vars matches your exact frontend URL
- Make sure there's no trailing slash in `CLIENT_URL`
- Check if Authorization token is being sent from frontend

### Issue 2: "ImageKit configuration error"

**Solution:**

- Verify all ImageKit environment variables are set
- Make sure they don't have extra spaces or quotes
- Test ImageKit credentials using their API testing tool

### Issue 3: Image URL returns 403

**Solution:**

- Check if your ImageKit account has image generation enabled
- Verify the URL endpoint format: `https://ik.imagekit.io/your_id`
- Ensure ImageKit pricing plan supports your usage

### Issue 4: Timeout Errors

**Solution:**

- Vercel serverless functions have a 10-60 second timeout (depending on plan)
- Consider upgrading Vercel plan if you need longer execution time
- Or implement background job processing

## Debugging on Vercel

### View Backend Logs:

1. Go to Vercel Dashboard
2. Select your backend project
3. Click "Deployments"
4. Click on the latest deployment
5. Click "Functions" tab
6. View runtime logs

### View Frontend Logs:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try image generation
4. Check the request to `/api/message/image`
5. Look at response status and error message

## Test Locally First

Before deploying, test locally:

```bash
# Backend
cd server
npm install
# Create .env file with all environment variables
npm start

# Frontend (in another terminal)
cd Client
npm install
# Create .env file with VITE_SERVER_URL=http://localhost:3000
npm run dev
```

## Contact Support

If issues persist:

1. Check ImageKit dashboard for API usage/errors
2. Review Vercel runtime logs
3. Verify MongoDB connection is working
4. Test each API endpoint individually using Postman/Thunder Client

## Quick Checklist

- [ ] All environment variables added to Vercel
- [ ] CLIENT_URL matches frontend domain exactly
- [ ] IMAGEKIT credentials are correct
- [ ] Backend redeployed after env var changes
- [ ] Frontend redeployed after env var changes
- [ ] Browser cache cleared
- [ ] Tested in incognito/private window
