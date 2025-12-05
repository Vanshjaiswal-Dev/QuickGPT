# 📋 CHECKLIST - Fix 403 Error

Date: ****\_\_****
Time Started: ****\_\_****

---

## Pre-Flight Check

- [ ] I have access to Vercel dashboard
- [ ] I have my GitHub repository
- [ ] I have ImageKit account credentials
- [ ] I have MongoDB connection string

---

## STEP 1: Push Code Changes

- [ ] Opened terminal/PowerShell
- [ ] Navigated to project folder: `cd C:\Users\LENOVO\Desktop\QuickGPT`
- [ ] Ran: `git add .`
- [ ] Ran: `git commit -m "fix: CORS and error handling"`
- [ ] Ran: `git push origin main`
- [ ] Confirmed push was successful

---

## STEP 2: Backend Environment Variables

Go to: Vercel → Backend Project → Settings → Environment Variables

- [ ] Added `MONGODB_URI`
  - Value: ************\_************
  - Selected: Production, Preview, Development ✓
- [ ] Added `JWT_SECRET`
  - Value: (hidden) ✓
  - Selected: Production, Preview, Development ✓
- [ ] Added `IMAGEKIT_PUBLIC_KEY`
  - Value: ************\_************
  - Selected: Production, Preview, Development ✓
- [ ] Added `IMAGEKIT_PRIVATE_KEY`
  - Value: (hidden) ✓
  - Selected: Production, Preview, Development ✓
- [ ] Added `IMAGEKIT_URL_ENDPOINT`
  - Value: https://ik.imagekit.io/****\_****
  - Selected: Production, Preview, Development ✓
- [ ] Added `CLIENT_URL`
  - Value: https://___________________.vercel.app
  - Verified NO trailing slash ✓
  - Selected: Production, Preview, Development ✓

---

## STEP 3: Frontend Environment Variable

Go to: Vercel → Frontend Project → Settings → Environment Variables

- [ ] Added `VITE_SERVER_URL`
  - Value: https://___________________.vercel.app
  - Verified NO trailing slash ✓
  - Selected: Production, Preview, Development ✓

---

## STEP 4: Redeploy Backend

- [ ] Went to Backend project on Vercel
- [ ] Clicked "Deployments" tab
- [ ] Found latest deployment
- [ ] Clicked three dots (⋮)
- [ ] Clicked "Redeploy"
- [ ] Waited for deployment to complete
- [ ] Deployment status: ✅ Ready

---

## STEP 5: Redeploy Frontend

- [ ] Went to Frontend project on Vercel
- [ ] Clicked "Deployments" tab
- [ ] Found latest deployment
- [ ] Clicked three dots (⋮)
- [ ] Clicked "Redeploy"
- [ ] Waited for deployment to complete
- [ ] Deployment status: ✅ Ready

---

## STEP 6: Verify Environment Variables

- [ ] Opened browser
- [ ] Visited: `https://_________________.vercel.app/api/health`
- [ ] Checked response - all values should be `true`:
  ```
  mongodb: true ✓
  jwt: true ✓
  imagekit_public: true ✓
  imagekit_private: true ✓
  imagekit_endpoint: true ✓
  client_url: (should show your frontend URL) ✓
  ```
- [ ] All values are correct

---

## STEP 7: Test Image Generation

- [ ] Opened frontend app: https://____________.vercel.app
- [ ] Logged into account
- [ ] Created/selected a chat
- [ ] Switched to Image mode
- [ ] Entered test prompt: "A beautiful sunset over mountains"
- [ ] Clicked Generate/Send
- [ ] Image generated successfully ✅

---

## If Test Failed - Debugging Steps

- [ ] Pressed F12 to open DevTools
- [ ] Checked Console tab for errors
- [ ] Error message: ****************\_****************
- [ ] Checked Network tab
- [ ] Found `/api/message/image` request
- [ ] Response status: **\_**
- [ ] Response error: ****************\_****************

- [ ] Checked Vercel backend logs
- [ ] Project: Backend → Deployments → Latest → Functions
- [ ] Found error in logs: ****************\_****************

---

## Common Issues to Check

If image generation failed, verify:

- [ ] `CLIENT_URL` has NO trailing slash (must be `https://app.vercel.app` NOT `https://app.vercel.app/`)
- [ ] I'm logged in on the frontend
- [ ] Authorization token is being sent (check Network tab → Headers)
- [ ] ImageKit credentials are correct (test on ImageKit dashboard)
- [ ] Both projects were redeployed AFTER adding env vars
- [ ] Cleared browser cache (Ctrl + Shift + Delete)
- [ ] Tried in incognito/private window

---

## ✅ SUCCESS!

- [ ] Image generation is working
- [ ] No 403 errors
- [ ] Ready to use

Time Completed: ****\_\_****
Total Time Taken: ****\_\_**** minutes

---

## Notes / Issues Encountered:

---

---

---

---
