# 🔐 Environment Setup Instructions

## ✅ `.env` Files Created!

All three `.env` files have been created with templates. You need to add your credentials to make the app work.

---

## 📝 What You Need to Update

### 1️⃣ **Backend/.env**

Replace these placeholders with your actual credentials:

#### **MongoDB** 🗄️
```
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net
```

**How to get it:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account (if you don't have one)
3. Create a new cluster (free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<username>` with your database user
7. Replace `<password>` with your database password

#### **Cloudinary** ☁️
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**How to get it:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Go to Dashboard
4. Copy your:
   - Cloud Name
   - API Key
   - API Secret

#### **JWT Secret** 🔑
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**How to create it:**
Replace with any long random string. You can use:
- Online generator: [RandomKeygen](https://randomkeygen.com/)
- Or run in terminal: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

### 2️⃣ **Music Web Application/.env**

Already configured! ✅
```
VITE_API_URL=http://localhost:4000
```
*(Only change this if you deploy to production)*

---

### 3️⃣ **admin/.env**

Already configured! ✅
```
VITE_API_URL=http://localhost:4000
```
*(Only change this if you deploy to production)*

---

## 🚀 After Setting Up

Once you've added your credentials to `Backend/.env`:

1. **Install Dependencies** (if not done):
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

2. **Start All Services**:

   **Terminal 1 - Backend:**
   ```bash
   cd Backend
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd "Music Web Application"
   npm run dev
   ```

   **Terminal 3 - Admin:**
   ```bash
   cd admin
   npm run dev
   ```

3. **Access the Apps**:
   - 🎵 **Frontend**: http://localhost:5173 (or next available port)
   - 🎛️ **Admin**: http://localhost:5174 (or next available port)
   - 🔌 **Backend API**: http://localhost:4000

---

## ⚠️ Important Notes

- Never commit `.env` files to Git (they're in `.gitignore`)
- `.env.example` files are safe to commit (no sensitive data)
- MongoDB free tier has 512MB storage limit
- Cloudinary free tier has 25GB storage/month

---

## 🆘 Need Help?

Check these files for more info:
- `QUICK_START.md` - Quick setup guide
- `START_HERE.md` - Detailed project overview
- `DEPLOYMENT_GUIDE.md` - Production deployment

---

**Status: Ready to configure! 🎉**

