# Vercel Deployment Guide - MusicFlow Backend

## ✅ Pre-Deployment Checklist

Your Express backend is now properly configured for Vercel deployment.

### What Was Fixed:
1. ✅ Removed conflicting `routes` property from `vercel.json`
2. ✅ Removed redundant `headers` (CORS already handled in Express)
3. ✅ Using `rewrites` instead for proper routing
4. ✅ Health check endpoint already exists at `/api/health`
5. ✅ Server exports app without `app.listen()` (Vercel compatible)

---

## 📦 Step-by-Step Deployment Instructions

### 1. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. **IMPORTANT:** Set the **Root Directory** to `Backend/`
   - Click on "Edit" next to Root Directory
   - Enter: `Backend`
   - This tells Vercel to treat the Backend folder as the project root

### 2. Configure Build Settings

Vercel should auto-detect these settings, but verify:

```
Framework Preset: Other
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: npm install
```

### 3. Add Environment Variables

In the Vercel project settings, go to **Settings → Environment Variables** and add:

| Variable Name              | Value                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------------|
| `NODE_ENV`                | `production`                                                                                   |
| `PORT`                    | `4000` (not used by Vercel, but good for compatibility)                                       |
| `MONGO_URI`               | `mongodb+srv://music:123music786@cluster0.t3xznkg.mongodb.net/musicflow?retryWrites=true&w=majority` |
| `CLOUDINARY_CLOUD_NAME`   | `drh8jsrbs`                                                                                    |
| `CLOUDINARY_API_KEY`      | `615513696998496`                                                                              |
| `CLOUDINARY_API_SECRET`   | `vTqMfwOUz57jruYH2tD8ePEZWF8`                                                                   |
| `JWT_SECRET`              | `anyrandomsecret` ⚠️ **Use a stronger secret in production!**                                  |
| `ALLOWED_ORIGINS`         | `https://your-frontend-domain.vercel.app` (update after frontend deployment)                  |

**⚠️ Security Notes:**
- The `JWT_SECRET` should be a long, random string in production
- Update `ALLOWED_ORIGINS` to include your actual frontend URL
- For all environments, select: **Production**, **Preview**, **Development**

### 4. Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (usually 1-2 minutes)
3. You'll get a deployment URL like: `https://your-project-name.vercel.app`

---

## 🧪 Verification Commands

After deployment, test your backend API:

### 1. Basic Health Check
```bash
curl https://your-project-name.vercel.app/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "database": "Connected",
  "timestamp": "2025-10-24T...",
  "models": ["Song", "Album", "Playlist", "User"]
}
```

### 2. Test Basic Endpoint
```bash
curl https://your-project-name.vercel.app/api/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Backend is working!",
  "timestamp": "2025-10-24T..."
}
```

### 3. Test Root Route
```bash
curl https://your-project-name.vercel.app/
```

**Expected Response:**
```
API Working
```

### 4. Test Authentication Endpoint (should return error without credentials)
```bash
curl -X POST https://your-project-name.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

---

## 🔧 Troubleshooting

### Issue: Build Fails
- **Solution:** Ensure `Backend/` is set as Root Directory in Vercel settings

### Issue: Environment Variables Not Working
- **Solution:** 
  1. Go to Settings → Environment Variables
  2. Make sure all variables are set for Production, Preview, and Development
  3. Redeploy after adding variables

### Issue: CORS Errors
- **Solution:** Update `ALLOWED_ORIGINS` environment variable with your frontend URL
  ```
  ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend-preview.vercel.app
  ```

### Issue: MongoDB Connection Fails
- **Solution:** 
  1. Verify `MONGO_URI` is correct
  2. Check MongoDB Atlas allows connections from `0.0.0.0/0` (Vercel uses dynamic IPs)
  3. Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere

### Issue: 500 Internal Server Error
- **Solution:** Check Vercel deployment logs:
  1. Go to your project dashboard
  2. Click on the failed deployment
  3. Check "Functions" tab for error logs

---

## 📝 Post-Deployment Steps

1. **Update Frontend Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-name.vercel.app
   ```

2. **Update Backend ALLOWED_ORIGINS:**
   - Add your frontend Vercel URL to `ALLOWED_ORIGINS` environment variable
   - Redeploy if necessary

3. **Configure Custom Domain (Optional):**
   - Go to Settings → Domains
   - Add your custom domain

4. **Set Up Monitoring:**
   - Enable Vercel Analytics for performance monitoring
   - Set up error tracking (e.g., Sentry)

---

## 🎯 Final Verification Checklist

- [ ] Backend deploys successfully
- [ ] `/api/health` returns connected status
- [ ] `/api/test` returns success message
- [ ] MongoDB connection works (check database status in health endpoint)
- [ ] Cloudinary credentials are configured (test image upload)
- [ ] Frontend can make API calls (update ALLOWED_ORIGINS)
- [ ] Authentication endpoints work
- [ ] CORS is properly configured

---

## 🚀 Your Deployment URL

After deployment, your API will be available at:
```
https://your-project-name.vercel.app
```

All your endpoints will be accessible:
- `https://your-project-name.vercel.app/api/health`
- `https://your-project-name.vercel.app/api/auth/*`
- `https://your-project-name.vercel.app/api/song/*`
- `https://your-project-name.vercel.app/api/album/*`
- `https://your-project-name.vercel.app/api/playlist/*`

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Express Apps on Vercel](https://vercel.com/guides/using-express-with-vercel)
- [Environment Variables on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

