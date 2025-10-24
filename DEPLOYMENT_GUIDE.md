# 🚀 MusicFlow Deployment Guide

This guide will help you deploy your MusicFlow application to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ MongoDB Atlas account with connection string
- ✅ Cloudinary account with API credentials
- ✅ All environment variables ready
- ✅ Tested the application locally
- ✅ Production builds work without errors

---

## 🔐 Environment Variables

### Backend Environment Variables

Required for production:

```env
PORT=4000
NODE_ENV=production
MONGO_URI=mongodb+srv://your_username:password@cluster.mongodb.net/musicflow
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_super_secret_jwt_key_change_in_production
ALLOWED_ORIGINS=https://your-frontend-url.com,https://your-admin-url.com
```

### Frontend Environment Variables

```env
VITE_API_URL=https://your-backend-url.com
```

### Admin Panel Environment Variables

```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🌐 Deployment Options

### Option 1: Deploy Backend to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to Backend folder:
```bash
cd Backend
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel --prod
```

5. Set environment variables in Vercel Dashboard:
   - Go to your project settings
   - Add all environment variables from `.env.example`
   - Deploy again after adding variables

**Backend URL**: `https://your-backend.vercel.app`

---

### Option 2: Deploy Backend to Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize project:
```bash
cd Backend
railway init
```

4. Add environment variables:
```bash
railway variables set MONGO_URI="your_mongo_uri"
railway variables set CLOUDINARY_CLOUD_NAME="your_cloud_name"
railway variables set CLOUDINARY_API_KEY="your_api_key"
railway variables set CLOUDINARY_API_SECRET="your_api_secret"
railway variables set JWT_SECRET="your_jwt_secret"
railway variables set NODE_ENV="production"
```

5. Deploy:
```bash
railway up
```

**Backend URL**: `https://your-backend.railway.app`

---

### Option 3: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: musicflow-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Root Directory**: `Backend`

5. Add environment variables in Render dashboard
6. Click "Create Web Service"

**Backend URL**: `https://your-backend.onrender.com`

---

### Deploy Frontend to Vercel

1. Navigate to frontend folder:
```bash
cd "Music Web Application"
```

2. Set environment variable:
```bash
# Create .env.production file
echo "VITE_API_URL=https://your-backend-url.com" > .env.production
```

3. Build the project:
```bash
npm run build
```

4. Deploy to Vercel:
```bash
vercel --prod
```

5. In Vercel Dashboard, add environment variable:
   - `VITE_API_URL` = Your backend URL

**Frontend URL**: `https://your-frontend.vercel.app`

---

### Deploy Frontend to Netlify

1. Build the project:
```bash
cd "Music Web Application"
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

4. Set environment variable in Netlify Dashboard:
   - `VITE_API_URL` = Your backend URL

**Frontend URL**: `https://your-frontend.netlify.app`

---

### Deploy Admin Panel (Same as Frontend)

Follow the same steps as frontend deployment, but use the `admin` folder instead.

**Admin URL**: `https://your-admin.vercel.app`

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings

After deploying frontend and admin, update your backend `.env`:

```env
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-admin.vercel.app
```

Redeploy the backend after updating CORS origins.

### 2. Update Frontend URLs

Update `.env` files in both frontend and admin with your production backend URL.

### 3. Test Everything

- ✅ Test user registration and login
- ✅ Test music playback
- ✅ Test playlist creation
- ✅ Test admin panel uploads
- ✅ Test all API endpoints

---

## 🗄️ Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for all IPs)
5. Get your connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add `/musicflow` at the end: `mongodb+srv://user:pass@cluster.mongodb.net/musicflow`

---

## ☁️ File Storage Setup (Cloudinary)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Go to Dashboard
4. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret
5. Add these to your backend environment variables

---

## 🔒 Security Best Practices

### 1. Generate Strong JWT Secret

```bash
# Use a strong random string generator
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. CORS Configuration

Only allow your actual frontend URLs in production:

```env
ALLOWED_ORIGINS=https://musicflow.com,https://admin.musicflow.com
```

### 3. Rate Limiting

The app includes rate limiting (100 requests per 15 minutes per IP). Adjust in `server.js` if needed.

### 4. Environment Variables

- Never commit `.env` files to Git
- Use secure methods to store production secrets
- Rotate credentials periodically

---

## 📊 Monitoring and Maintenance

### Backend Health Check

Visit: `https://your-backend-url.com/api/health`

Should return:
```json
{
  "status": "OK",
  "database": "Connected",
  "timestamp": "2024-10-24T12:00:00.000Z"
}
```

### Common Issues

**1. CORS Errors**
- Ensure backend `ALLOWED_ORIGINS` includes your frontend URLs
- Check that frontend is using correct backend URL

**2. Database Connection Fails**
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

**3. File Uploads Not Working**
- Verify Cloudinary credentials
- Check API key limits
- Ensure proper file size limits

**4. Authentication Issues**
- Verify JWT_SECRET is set
- Check token expiration settings
- Ensure cookies/localStorage are working

---

## 🚀 Quick Deploy Commands

### Full Deployment Script

```bash
# Deploy Backend
cd Backend
vercel --prod
cd ..

# Deploy Frontend
cd "Music Web Application"
npm run build
vercel --prod
cd ..

# Deploy Admin
cd admin
npm run build
vercel --prod
cd ..
```

---

## 📝 Deployment Checklist

### Before Going Live

- [ ] All environment variables configured
- [ ] MongoDB Atlas cluster created and accessible
- [ ] Cloudinary account set up
- [ ] Backend deployed and health check passes
- [ ] Frontend deployed and connects to backend
- [ ] Admin panel deployed and working
- [ ] CORS properly configured
- [ ] All features tested in production
- [ ] Error tracking set up (optional)
- [ ] SSL/HTTPS enabled (automatic with Vercel/Netlify)

### After Deployment

- [ ] Test user registration and login
- [ ] Test music playback
- [ ] Test file uploads from admin panel
- [ ] Test playlist creation and management
- [ ] Test liked songs functionality
- [ ] Test search functionality
- [ ] Verify responsive design on mobile
- [ ] Check console for any errors
- [ ] Monitor API performance
- [ ] Set up regular database backups

---

## 🔄 Continuous Deployment

### Connect to GitHub (Recommended)

1. Push your code to GitHub
2. In Vercel/Netlify dashboard:
   - Connect your GitHub repository
   - Enable automatic deployments
   - Every push to main branch will auto-deploy

### Environment Variables in CI/CD

Add all environment variables in your hosting platform's dashboard under:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Build & deploy → Environment
- Railway: Variables tab
- Render: Environment tab

---

## 💡 Additional Tips

### Free Tier Limits

**Vercel**: 
- 100GB bandwidth/month
- Serverless functions timeout: 10s (upgrade for more)

**Netlify**:
- 100GB bandwidth/month
- 300 build minutes/month

**MongoDB Atlas**:
- 512MB storage (free tier)
- Upgrade when you need more

**Cloudinary**:
- 25 credits/month (free tier)
- ~25GB storage and bandwidth

### Scaling Considerations

When your app grows:
1. Upgrade MongoDB cluster for better performance
2. Consider CDN for static assets
3. Add caching layer (Redis)
4. Implement database indexes
5. Use serverless functions for heavy operations

---

## 🆘 Support

If you encounter issues:

1. Check logs in your hosting platform dashboard
2. Verify all environment variables are set correctly
3. Test API endpoints using Postman
4. Check database connection in MongoDB Atlas
5. Verify Cloudinary uploads in their dashboard

---

## ✅ Success!

Your MusicFlow application is now deployed and ready for production use! 🎉

**Your deployed URLs:**
- Backend API: `https://your-backend.vercel.app`
- Frontend App: `https://your-frontend.vercel.app`
- Admin Panel: `https://your-admin.vercel.app`

Share your music streaming platform with the world! 🎵

