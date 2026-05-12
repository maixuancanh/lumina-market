# 🔧 Railway Build Fix Guide
# Fix Railway deployment issues

## 🚨 Current Issue

Railway không nhận diện đúng Node.js project vì có cả frontend và backend trong cùng repository.

**Lỗi:** `Railpack could not determine how to build the app`

**Nguyên nhân:** Railway đang phân tích toàn bộ repository thay vì chỉ backend/

---

## 🎯 Solutions

### **Solution 1: Create Backend Repository (Recommended)**
Tách backend thành repository riêng:

1. **Tạo repository mới:** `lumina-market-backend`
2. **Chỉ copy backend folder:**
   ```
   d:\lpagent\backend\* → lumina-market-backend\*
   ```
3. **Deploy riêng** trên Railway

### **Solution 2: Fix Railway Configuration**
Sử dụng Railway configuration để chỉ build backend:

1. **Đã tạo railway.toml** ✅
2. **Đã tạo .railwayignore** ✅  
3. **Cấu hình root directory** trong Railway dashboard

### **Solution 3: Use Dockerfile**
Railway sẽ dùng Dockerfile thay vì detect tự động:

1. **Dockerfile đã có** ✅
2. **Railway sẽ build theo Docker** ✅

---

## 🔧 Railway Dashboard Configuration

### **Trong Railway Dashboard:**
1. **Go to:** https://railway.app
2. **Select project:** `maixuancanh/lumina-market`
3. **Settings → Build Settings**
4. **Root Directory:** `backend/`
5. **Build Command:** `npm install && npm run build`
6. **Start Command:** `npm start`
7. **Node Version:** `18.x`

### **Environment Variables:**
```bash
NODE_ENV=production
PORT=4002
LP_AGENT_API_URL=https://api.lp-agent.com
LP_AGENT_API_KEY=your_api_key_here
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:12b
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

---

## 🚀 Deploy Commands

### **Option 1: Retry Web Deploy**
1. **Vào Railway Dashboard**
2. **Edit Project Settings**
3. **Set Root Directory:** `backend/`
4. **Click Redeploy**

### **Option 2: Use Railway CLI với config**
```bash
# Railway sẽ dùng railway.toml
cd d:\lpagent\backend
railway up
```

### **Option 3: Force Docker Build**
```bash
# Trong Railway dashboard, chọn Dockerfile
# Hoặc tạo Docker Compose
```

---

## 🎯 Testing After Fix

### **Kiểm tra deployment:**
1. **Health Check:** `https://your-app.up.railway.app/api/health`
2. **LP Agent API:** `https://your-app.up.railway.app/api/lp-agent/pools`
3. **AI Agent Status:** `https://your-app.up.railway.app/api/ai-agent/status`

### **Frontend Integration:**
```bash
# Update Vercel với Railway URL
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app
```

---

## 📱 Files Đã Tạo

✅ **railway.toml** - Railway configuration
✅ **.railwayignore** - Exclude frontend files
✅ **Dockerfile** - Container build
✅ **Environment guide** - Complete setup

---

## 🎯 Next Steps

### **Bạn muốn tôi làm gì?**

**A. Tách backend thành repository riêng** (Clean nhất)
**B. Fix Railway configuration** (Nhanh nhất)
**C. Deploy với Docker** (Khó hơn)

**Tôi recommend Solution B** - Fix Railway configuration trong dashboard!

**Bạn chọn solution nào?** 🚀
