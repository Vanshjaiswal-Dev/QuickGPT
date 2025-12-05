# Step-by-Step Fix for 403 Error - QuickGPT

Follow these steps **IN ORDER** to fix your image generation 403 error on Vercel.

---

## ✅ STEP 1: Commit and Push Your Code Changes

The code has been updated to fix the CORS issue. Now push it to GitHub:

```powershell
cd C:\Users\LENOVO\Desktop\QuickGPT
git add .
git commit -m "Fix: CORS configuration and error handling for image generation"
git push origin main
```

**Why?** This pushes the fixed code to your repository so Vercel can deploy it.

---

## ✅ STEP 2: Add Environment Variables to Backend (Server)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Backend/Server** project
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Add these variables **one by one**:

### Variables to Add:

| Name                    | Value                            | Where to Get It                                              |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `MONGODB_URI`           | Your MongoDB connection string   | MongoDB Atlas Dashboard → Connect → Drivers                  |
| `JWT_SECRET`            | Any long random string           | Generate: `openssl rand -base64 32` or use your existing one |
| `IMAGEKIT_PUBLIC_KEY`   | Your ImageKit public key         | ImageKit Dashboard → Developer Options → API Keys            |
| `IMAGEKIT_PRIVATE_KEY`  | Your ImageKit private key        | ImageKit Dashboard → Developer Options → API Keys            |
| `IMAGEKIT_URL_ENDPOINT` | `https://ik.imagekit.io/YOUR_ID` | ImageKit Dashboard → URL-endpoint                            |
| `CLIENT_URL`            | Your frontend Vercel URL         | Example: `https://your-app.vercel.app` (NO trailing slash!)  |

### Important Notes:

- ⚠️ **CLIENT_URL should NOT have a trailing slash** (❌ Wrong: `https://app.vercel.app/`, ✅ Correct: `https://app.vercel.app`)
- ⚠️ Make sure to copy values **exactly** - no extra spaces
- ⚠️ Select **Production, Preview, and Development** for each variable

**Screenshot Guide:**

- Click "Add New" button
- Enter Name (e.g., `MONGODB_URI`)
- Enter Value
- Check all environments (Production, Preview, Development)
- Click "Save"

---

## ✅ STEP 3: Add Environment Variable to Frontend (Client)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Frontend/Client** project
3. Click **Settings** → **Environment Variables**
4. Add this variable:

| Name              | Value                                                                 |
| ----------------- | --------------------------------------------------------------------- |
| `VITE_SERVER_URL` | Your backend Vercel URL (e.g., `https://your-backend-api.vercel.app`) |

**Important:** NO trailing slash!

---

## ✅ STEP 4: Get Your ImageKit Credentials

If you don't have your ImageKit credentials handy:

1. Go to [ImageKit.io](https://imagekit.io/dashboard)
2. Log in to your account
3. Click **Developer Options** (left sidebar)
4. Click **API Keys**
5. You'll see:
   - **Public Key** - Copy this
   - **Private Key** - Click "Show" then copy
   - **URL-endpoint** - Copy this (format: `https://ik.imagekit.io/your_id`)

**Note:** Make sure your ImageKit account is active and has image generation enabled.

---

## ✅ STEP 5: Redeploy Backend

After adding environment variables, you MUST redeploy:

1. Go to your **Backend** project on Vercel
2. Click **Deployments** tab
3. Click the **three dots (⋮)** next to the latest deployment
4. Click **Redeploy**
5. Wait for deployment to complete (usually 1-2 minutes)

**Alternative Method:**

- Just push any commit to GitHub, and Vercel will auto-deploy

---

## ✅ STEP 6: Redeploy Frontend

1. Go to your **Frontend** project on Vercel
2. Click **Deployments** tab
3. Click the **three dots (⋮)** next to the latest deployment
4. Click **Redeploy**
5. Wait for deployment to complete

---

## ✅ STEP 7: Verify Environment Variables (IMPORTANT!)

Check if your backend has all the environment variables:

1. Open your browser
2. Go to: `https://your-backend-url.vercel.app/api/health`
3. You should see something like:

```json
{
  "status": "ok",
  "timestamp": "2025-12-05T...",
  "environment": {
    "mongodb": true,
    "jwt": true,
    "imagekit_public": true,
    "imagekit_private": true,
    "imagekit_endpoint": true,
    "client_url": "https://your-frontend.vercel.app"
  }
}
```

**If any value is `false`:** That environment variable is missing! Go back to Step 2.

---

## ✅ STEP 8: Test Image Generation

1. Open your frontend app: `https://your-frontend.vercel.app`
2. Log in to your account
3. Create a new chat or select existing chat
4. Switch to **Image mode** (look for image/gallery icon)
5. Type a prompt like: "A beautiful sunset over mountains"
6. Click Send/Generate

### Expected Result:

✅ Image should generate successfully

### If You Still Get 403 Error:

**A. Check Browser Console:**

1. Press `F12` to open DevTools
2. Go to **Console** tab
3. Look for error messages
4. Take a screenshot and check the error

**B. Check Network Tab:**

1. Press `F12` → **Network** tab
2. Try generating image again
3. Find the request to `/api/message/image`
4. Click on it
5. Check:
   - Request Headers → Is `Authorization` header present?
   - Response → What's the error message?

**C. Check Vercel Backend Logs:**

1. Go to Vercel Dashboard → Your Backend Project
2. Click **Deployments**
3. Click on the latest deployment
4. Click **Functions** tab
5. Look for error logs when you tried to generate image

---

## ✅ STEP 9: Common Fixes

### Problem: "Not authorized, no token"

**Solution:**

- Your frontend isn't sending the auth token
- Try logging out and logging back in
- Clear browser cache/cookies

### Problem: "ImageKit configuration error"

**Solution:**

- One or more ImageKit env vars are missing
- Go back to Step 2 and verify all ImageKit variables

### Problem: Still getting 403

**Solution:**

- Check `CLIENT_URL` matches your frontend URL EXACTLY
- No trailing slash!
- Must start with `https://`

### Problem: Timeout error

**Solution:**

- Image generation takes time
- This might be a Vercel timeout (free plan = 10s limit)
- Consider upgrading Vercel plan

---

## 🎯 Quick Verification Checklist

Before testing, verify:

- [ ] All code changes pushed to GitHub
- [ ] Backend has 6 environment variables set
- [ ] Frontend has 1 environment variable set
- [ ] Both projects redeployed after adding env vars
- [ ] `/api/health` endpoint shows all `true` values
- [ ] `CLIENT_URL` has NO trailing slash
- [ ] You're logged in to the frontend
- [ ] Browser cache cleared (Ctrl+Shift+Delete)

---

## 🆘 Still Not Working?

If you've followed all steps and still get 403:

1. **Check ImageKit Account:**

   - Go to ImageKit dashboard
   - Verify your account is active
   - Check if you have API usage limits

2. **Test Locally First:**

   ```powershell
   # Backend
   cd C:\Users\LENOVO\Desktop\QuickGPT\server
   # Create .env file with all variables
   npm start

   # Frontend (new terminal)
   cd C:\Users\LENOVO\Desktop\QuickGPT\Client
   # Create .env file with VITE_SERVER_URL=http://localhost:3000
   npm run dev
   ```

3. **Share Error Details:**
   - Screenshot of browser console error
   - Screenshot of `/api/health` response
   - Error message from Vercel logs

---

## 📞 Need Help?

If stuck, provide:

1. Your backend Vercel URL
2. Screenshot of `/api/health` response
3. Error message from browser console
4. Error from Vercel backend logs

Good luck! 🚀
