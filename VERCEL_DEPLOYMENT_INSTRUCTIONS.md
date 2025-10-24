# 🚀 Vercel Deployment Instructions for MusicFlow

## ⚠️ Important: You have 3 separate applications to deploy

Your project has:
1. **Backend** (API Server) - `Backend/` folder
2. **Frontend** (User App) - `Music Web Application/` folder  
3. **Admin Panel** - `admin/` folder

You need to deploy them **separately** on Vercel.

---

## 📋 Deployment Order

### Step 1: Deploy Backend API

1. **Navigate to Backend folder:**
```bash
cd Backend
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add these variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-admin.vercel.app
   ```

5. **Copy the deployed URL** (e.g., `https://musicflow-backend-xyz.vercel.app`)

---

### Step 2: Deploy Frontend (User App)

1. **Navigate to Frontend folder:**
```bash
cd "Music Web Application"
```

2. **Create `.env.production` file:**
```bash
echo VITE_API_URL=https://your-backend-url.vercel.app > .env.production
```

3. **Test build locally first:**
```bash
npm run build
```

4. **Deploy to Vercel:**
```bash
vercel --prod
```

5. **Set Environment Variable** in Vercel Dashboard:
   - `VITE_API_URL` = Your backend URL from Step 1

6. **Copy the deployed URL** (e.g., `https://musicflow-frontend-xyz.vercel.app`)

---

### Step 3: Deploy Admin Panel

1. **Navigate to Admin folder:**
```bash
cd admin
```

2. **Create `.env.production` file:**
```bash
echo VITE_API_URL=https://your-backend-url.vercel.app > .env.production
```

3. **Test build locally:**
```bash
npm run build
```

4. **Deploy to Vercel:**
```bash
vercel --prod
```

5. **Set Environment Variable** in Vercel Dashboard:
   - `VITE_API_URL` = Your backend URL from Step 1

---

### Step 4: Update CORS on Backend

After deploying frontend and admin, update your Backend environment variables in Vercel:

```env
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,https://your-admin-url.vercel.app
```

Then redeploy the backend:
```bash
cd Backend
vercel --prod
```

---

## 🔍 Troubleshooting Common Issues

### Issue 1: "Module not found" or "Cannot find module"

**Solution:**
- Ensure all file paths use consistent casing
- Check that all imports match actual file names exactly
- Run `npm install` before building

### Issue 2: Build fails with "PlaylistItem" error

**Fixed!** All imports are now consistent. If you still see this:
- Clear build cache: `rm -rf dist node_modules && npm install`
- Rebuild: `npm run build`

### Issue 3: CORS Errors

**Solution:**
- Verify `ALLOWED_ORIGINS` in Backend includes your frontend URL
- Make sure frontend has correct `VITE_API_URL`
- Check browser console for exact error

### Issue 4: "Serverless Function Timeout"

**Solution:**
- Vercel free tier has 10s timeout
- Optimize database queries
- Add indexes to MongoDB collections
- Consider upgrading Vercel plan if needed

### Issue 5: Environment Variables Not Working

**Solution:**
- Set variables in Vercel Dashboard (not just CLI)
- Redeploy after adding/changing variables
- For Vite apps, variables must start with `VITE_`

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Backend health check: `https://your-backend-url.vercel.app/api/health`
- [ ] Frontend loads without errors
- [ ] User can register and login
- [ ] Songs play correctly
- [ ] Admin can upload songs/albums
- [ ] Playlists work
- [ ] Search works
- [ ] No CORS errors in browser console

---

## 📊 Monitoring Your Deployment

### Backend Health Check
```bash
curl https://your-backend-url.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "database": "Connected",
  "timestamp": "2024-10-24T...",
  "models": ["Song", "Album", "Playlist", "User"]
}
```

### Check Vercel Logs
- Go to Vercel Dashboard
- Select your project
- Click "Deployments" → Latest deployment → "View Function Logs"

---

## 🎯 Quick Deploy Commands (After Initial Setup)

```bash
# Deploy all three at once (run from project root)

# Backend
cd Backend && vercel --prod && cd ..

# Frontend
cd "Music Web Application" && vercel --prod && cd ..

# Admin
cd admin && vercel --prod && cd ..
```

---

## 💡 Best Practices

1. **Use Environment Variables**: Never hardcode URLs or secrets
2. **Test Locally First**: Always run `npm run build` before deploying
3. **Monitor Logs**: Check Vercel logs for errors
4. **Database Indexes**: Add indexes for frequently queried fields
5. **CDN for Assets**: Use Cloudinary for images and audio
6. **Rate Limiting**: Already configured in backend (100 req/15min)

---

## 🆘 Still Having Issues?

1. **Check build logs** in Vercel Dashboard
2. **Verify all environment variables** are set correctly
3. **Test API endpoints** using Postman or curl
4. **Check MongoDB connection** in Atlas dashboard
5. **Verify Cloudinary credentials**

---

## ✨ Success!

Once deployed, you'll have:
- **Backend API**: `https://musicflow-backend-xyz.vercel.app`
- **Frontend**: `https://musicflow-xyz.vercel.app`
- **Admin Panel**: `https://musicflow-admin-xyz.vercel.app`

Your music streaming platform is live! 🎵🎉

