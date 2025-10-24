# ⚡ Quick Start Guide - MusicFlow

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
# Backend
cd Backend
npm install

# Frontend
cd "../Music Web Application"
npm install

# Admin
cd ../admin
npm install
```

### Step 2: Environment Variables (1 minute)

**All .env files are already created with your credentials!**

✅ `Backend/.env` - Database and API configured
✅ `Music Web Application/.env` - API URL set
✅ `admin/.env` - API URL set

### Step 3: Start Everything (1 minute)

Open 3 terminals:

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
```
✅ Backend runs on `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
cd "Music Web Application"
npm run dev
```
✅ Frontend runs on `http://localhost:3000` (or next available port)

**Terminal 3 - Admin:**
```bash
cd admin
npm run dev
```
✅ Admin runs on `http://localhost:5173`

---

## 🎯 Quick Test

1. **Open Frontend**: `http://localhost:3000`
   - Click "Sign Up" and create an account
   - Browse songs and play music
   
2. **Open Admin**: `http://localhost:5173`
   - Add new songs and albums
   - Manage content

---

## 🌐 Deploy to Production (5 minutes)

### Quick Deploy Script

```bash
# 1. Deploy Backend to Vercel
cd Backend
npx vercel --prod

# 2. Copy the backend URL you get (e.g., https://your-backend.vercel.app)

# 3. Update frontend .env
cd "../Music Web Application"
# Edit .env and set VITE_API_URL=https://your-backend.vercel.app

# 4. Deploy Frontend
npx vercel --prod

# 5. Deploy Admin
cd ../admin
# Edit .env and set VITE_API_URL=https://your-backend.vercel.app
npx vercel --prod

# 6. Update CORS in Backend .env
# Add your frontend and admin URLs to ALLOWED_ORIGINS
# Then redeploy backend: npx vercel --prod
```

---

## 📚 Full Documentation

- **[README.md](./README.md)** - Complete project documentation
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Detailed deployment guide
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Production readiness checklist

---

## 🆘 Troubleshooting

### Backend won't start?
- Check if MongoDB connection string is correct
- Verify Cloudinary credentials
- Make sure port 4000 is not in use

### Frontend can't connect to backend?
- Check VITE_API_URL in .env
- Ensure backend is running on localhost:4000
- Check browser console for CORS errors

### Admin panel not working?
- Same as frontend troubleshooting
- Verify you're uploading valid image/audio files

---

## ✅ What's Already Configured

- ✅ Environment variables set
- ✅ Security features enabled
- ✅ CORS configured
- ✅ Rate limiting active
- ✅ JWT authentication ready
- ✅ Database connected
- ✅ File storage ready
- ✅ Deployment configs created

---

## 🎉 You're Ready!

Your MusicFlow application is fully configured and ready to run!

**Start the servers and enjoy your music streaming platform! 🎵**

