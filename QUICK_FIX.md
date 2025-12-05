# 🚀 QUICK START - Fix 403 Error in 3 Minutes

## The Fastest Way to Fix Your Issue:

### 1️⃣ PUSH YOUR CODE (30 seconds)

```powershell
cd C:\Users\LENOVO\Desktop\QuickGPT
git add .
git commit -m "fix: CORS and error handling"
git push
```

### 2️⃣ ADD BACKEND ENV VARS (2 minutes)

Go to: Vercel → Your Backend Project → Settings → Environment Variables

Add these 6 variables:

```
MONGODB_URI = (from MongoDB Atlas)
JWT_SECRET = (any long random string)
IMAGEKIT_PUBLIC_KEY = (from ImageKit dashboard)
IMAGEKIT_PRIVATE_KEY = (from ImageKit dashboard)
IMAGEKIT_URL_ENDPOINT = https://ik.imagekit.io/your_id
CLIENT_URL = https://your-frontend.vercel.app
```

⚠️ **CLIENT_URL must NOT end with /** ⚠️

### 3️⃣ ADD FRONTEND ENV VAR (30 seconds)

Go to: Vercel → Your Frontend Project → Settings → Environment Variables

Add this 1 variable:

```
VITE_SERVER_URL = https://your-backend.vercel.app
```

### 4️⃣ REDEPLOY BOTH (1 minute)

- Backend: Vercel → Backend Project → Deployments → ⋮ → Redeploy
- Frontend: Vercel → Frontend Project → Deployments → ⋮ → Redeploy

### 5️⃣ VERIFY (30 seconds)

Open: `https://your-backend.vercel.app/api/health`

Should see all `true` values.

### 6️⃣ TEST (30 seconds)

- Open your app
- Try generating an image
- Should work! ✅

---

## 💡 Most Common Mistakes:

❌ `CLIENT_URL = https://myapp.vercel.app/` (has trailing slash)
✅ `CLIENT_URL = https://myapp.vercel.app` (correct!)

❌ Forgetting to redeploy after adding env vars
✅ Always redeploy after changing environment variables

❌ Using wrong ImageKit credentials
✅ Double-check by visiting ImageKit dashboard

---

## 🆘 If Still Broken:

1. Check: `your-backend-url.vercel.app/api/health`
2. Press F12 in browser → Console tab → Look for errors
3. Check Vercel backend logs for detailed error

---

For detailed instructions, see: **STEP_BY_STEP_FIX.md**
