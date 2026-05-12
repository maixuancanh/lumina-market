# 🚀 Railway Backend Deployment Guide
# Deploy Lumina Market Backend to Railway

## 📋 Prerequisites

### **Required Accounts:**
- [x] GitHub account with repository: `maixuancanh/lumina-market`
- [ ] Railway account (free tier sufficient)
- [ ] Backend code ready for deployment

### **Current Status:**
- ✅ Backend running locally on port 4002
- ✅ All API endpoints working
- ✅ Environment variables configured
- ✅ Ready for Railway deployment

---

## 🎯 Step-by-Step Railway Deployment

### **Step 1: Connect Railway to GitHub**

1. **Go to Railway:** https://railway.app
2. **Sign up/login** with GitHub account
3. **Click "New Project"** → "Deploy from GitHub repo"
4. **Select repository:** `maixuancanh/lumina-market`
5. **Choose service:** Select backend directory

### **Step 2: Configure Railway Service**

1. **Service Name:** `lumina-market-backend`
2. **Root Directory:** `backend/` (important!)
3. **Build Command:** `npm install && npm run build`
4. **Start Command:** `npm start`
5. **Node Version:** `18.x` (or latest)

### **Step 3: Set Environment Variables**

In Railway dashboard, add these environment variables:

```bash
# Database (if using)
DATABASE_URL=postgresql://username:password@host:port/database

# LP Agent API
LP_AGENT_API_URL=https://api.lp-agent.com
LP_AGENT_API_KEY=your_api_key_here

# Server Configuration
PORT=4002
NODE_ENV=production

# AI Configuration
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:12b

# CORS Configuration
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

### **Step 4: Deploy**

1. **Click "Deploy"**
2. **Wait for build** (2-3 minutes)
3. **Get deployment URL:** `https://lumina-market-backend.up.railway.app`

---

## 🔧 Backend Configuration for Railway

### **Update package.json for Railway:**
```json
{
  "name": "stratlp-backend",
  "version": "1.0.0",
  "description": "Backend for AI LP Strategist Marketplace",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "lint": "eslint src/**/*.ts"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### **Create railway.json file:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **Create Dockerfile (Optional but recommended):**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 4002

CMD ["npm", "start"]
```

---

## 🎯 Railway Environment Variables

### **Required Variables:**
```bash
# Server Configuration
NODE_ENV=production
PORT=4002

# LP Agent API
LP_AGENT_API_URL=https://api.lp-agent.com
LP_AGENT_API_KEY=your_api_key_here

# AI Configuration
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:12b

# CORS Configuration
CORS_ORIGIN=https://your-vercel-app.vercel.app

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database
```

---

## 🚀 Deployment Commands

### **Option 1: Web Deploy (Recommended)**
1. **Go to:** https://railway.app
2. **Login with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. **Select:** `maixuancanh/lumina-market`
5. **Root Directory:** `backend/`
6. **Build Command:** `npm install && npm run build`
7. **Start Command:** `npm start`
8. **Node Version:** `18.x`

### **Option 2: Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd d:\lpagent\backend
railway up
```

---

## 🔍 Testing Railway Deployment

### **After Deployment, Test:**
1. **Health Check:** `https://your-app.up.railway.app/api/health`
2. **LP Agent API:** `https://your-app.up.railway.app/api/lp-agent/pools`
3. **AI Agent Status:** `https://your-app.up.railway.app/api/ai-agent/status`

### **Update Vercel Frontend:**
```bash
# Update Vercel environment variables
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app
```

---

## 🚨 Troubleshooting

### **Common Issues:**

**1. Build Fails:**
```bash
# Check if TypeScript compiles
npm run build
# Check if all dependencies installed
npm install
```

**2. Port Issues:**
```bash
# Railway uses PORT environment variable
# Ensure app listens on process.env.PORT or 4002
```

**3. CORS Issues:**
```bash
# Update CORS origin to your Vercel URL
app.use(cors({ 
  origin: process.env.CORS_ORIGIN || true,
  credentials: true 
}));
```

**4. Environment Variables:**
```bash
# Check Railway dashboard for all required variables
# Ensure LP_AGENT_API_KEY is set
```

---

## 🎯 Production URLs

### **Expected URLs:**
- **Frontend:** `https://lumina-market-xxx.vercel.app`
- **Backend:** `https://lumina-market-backend.up.railway.app`

### **Full Integration:**
```bash
# Frontend connects to Railway backend
NEXT_PUBLIC_API_URL=https://lumina-market-backend.up.railway.app

# Backend serves frontend API
# Railway handles all backend logic
# Vercel handles frontend deployment
```

---

## 📱 Monitoring & Logs

### **Railway Dashboard:**
- **View logs:** Real-time application logs
- **Monitor metrics:** CPU, Memory, Network
- **Environment variables:** Secure management
- **Deploy history:** Track deployment changes

### **Health Monitoring:**
```bash
# Add health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

---

## 🎯 Next Steps After Deployment

### **1. Update Frontend:**
- Set `NEXT_PUBLIC_API_URL` to Railway URL
- Test API connectivity
- Verify all features work

### **2. Test Full Application:**
- Builder page → Backend API
- Dashboard → Real-time data
- Marketplace → Strategy listings

### **3. Monitor Performance:**
- Check Railway logs
- Monitor API response times
- Test error handling

---

## 🎱 Quick Commands Summary

```bash
# 1. Deploy backend to Railway
railway up

# 2. Check deployment status
railway status

# 3. View logs
railway logs

# 4. Open deployed app
railway open

# 5. Update frontend environment
# Update Vercel dashboard with Railway URL
```

---

**Ready to deploy backend to Railway!** 🚀

**After deployment, update Vercel with Railway URL for full production setup!**
<tool_call>read_file
<arg_key>file_path</arg_key>
<arg_value>d:\lpagent\backend\package.json
