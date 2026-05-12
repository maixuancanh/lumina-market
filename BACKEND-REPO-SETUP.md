# 🚀 Backend Repository Setup Guide
# Create separate backend repository for Railway deployment

## 📋 Why Separate Repository?

### **Current Issues:**
- Railway không detect đúng Node.js project
- Mixed frontend/backend trong cùng repository
- Build errors với railpack
- Cần configuration phức tạp

### **Benefits of Separate Repo:**
- ✅ Clean Node.js project detection
- ✅ Simplified Railway deployment
- ✅ Independent backend scaling
- ✅ Clear separation of concerns

---

## 🎯 Step-by-Step Repository Setup

### **Step 1: Create New Repository**

1. **Go to:** https://github.com/maixuancanh
2. **Click "New repository"**
3. **Repository name:** `lumina-market-backend`
4. **Description:** "Backend for AI LP Strategist Marketplace"
5. **Visibility:** Public (for hackathon)
6. **Click "Create repository"**

### **Step 2: Copy Backend Files**

```bash
# Tạo thư mục mới
mkdir d:\lumina-market-backend

# Copy tất cả backend files
xcopy d:\lpagent\backend\* d:\lumina-market-backend\ /E /I /H

# Hoặc dùng git
cd d:\lumina-market-backend
git init
git remote add origin https://github.com/maixuancanh/lumina-market-backend.git
```

### **Step 3: Initialize Git in Backend**

```bash
cd d:\lumina-market-backend

# Initialize git
git init

# Add remote
git remote add origin https://github.com/maixuancanh/lumina-market-backend.git

# Add all files
git add .

# Commit
git commit -m "Initial backend commit

🚀 Backend Features:
- Express.js server with TypeScript
- LP Agent API integration
- AI Agent monitoring
- Strategy management
- Zap in/out operations
- Real-time data processing

📁 Structure:
- src/controllers/ - API endpoints
- src/services/ - Business logic
- src/models/ - Data models
- src/routes/ - Route definitions
- dist/ - Compiled JavaScript

✅ Ready for Railway deployment!"

# Push to GitHub
git push -u origin master
```

### **Step 4: Configure Railway**

1. **Go to:** https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. **Select:** `maixuancanh/lumina-market-backend`
4. **Settings:**
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Node Version:** `18.x`

### **Step 5: Set Environment Variables**

```bash
# Railway Environment Variables
NODE_ENV=production
PORT=4002
LP_AGENT_API_URL=https://api.lp-agent.com
LP_AGENT_API_KEY=your_api_key_here
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:12b
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

---

## 🔧 Files to Include

### **Backend Structure:**
```
lumina-market-backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
├── railway.json
├── Dockerfile
└── .gitignore
```

### **Essential Files:**
- ✅ `package.json` - Dependencies và scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `railway.json` - Railway deployment config
- ✅ `Dockerfile` - Container setup
- ✅ `.gitignore` - Exclude unnecessary files

---

## 🚀 Deployment Commands

### **Option 1: Railway Web (Recommended)**
1. **Railway Dashboard** → **New Project**
2. **Import GitHub repo:** `lumina-market-backend`
3. **Auto-detect Node.js** ✅
4. **Deploy** (2-3 phút)

### **Option 2: Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy from backend directory
cd d:\lumina-market-backend
railway up
```

---

## 🎯 Expected Results

### **After Successful Deployment:**
- **Backend URL:** `https://lumina-market-backend.up.railway.app`
- **Health Check:** `https://lumina-market-backend.up.railway.app/api/health`
- **API Endpoints:** All working with real data
- **Environment:** Production ready

### **Frontend Integration:**
```bash
# Update Vercel environment
NEXT_PUBLIC_API_URL=https://lumina-market-backend.up.railway.app
```

---

## 📱 Repository Benefits

### **For Hackathon:**
- ✅ Clean backend showcase
- ✅ Independent deployment
- ✅ Scalable architecture
- ✅ Professional setup
- ✅ Easy judge evaluation

### **For Production:**
- ✅ Separate scaling
- ✅ Independent updates
- ✅ Clear responsibilities
- ✅ Better monitoring

---

## 🎯 Next Steps

### **1. Create Repository:**
- Go to GitHub now
- Create `lumina-market-backend`
- Copy backend files

### **2. Deploy to Railway:**
- Use Railway dashboard
- Set environment variables
- Test all endpoints

### **3. Update Frontend:**
- Update Vercel with Railway URL
- Test full integration
- Prepare for demo

---

## 📱 Quick Commands

```bash
# 1. Create backend repo
mkdir d:\lumina-market-backend
cd d:\lumina-market-backend
git init
git remote add origin https://github.com/maixuancanh/lumina-market-backend.git

# 2. Copy files
xcopy d:\lpagent\backend\* d:\lumina-market-backend\ /E /I /H

# 3. Commit and push
git add .
git commit -m "Initial backend commit"
git push -u origin master

# 4. Deploy to Railway
railway up
```

---

**Ready to create separate backend repository!** 🚀

**This will solve Railway deployment issues completely!**
