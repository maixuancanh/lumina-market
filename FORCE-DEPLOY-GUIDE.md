# 🚀 Force Deploy Guide
# Fix frontend 404 error by force deploying latest changes

## 🚨 Current Issue

**Error:** Frontend vẫn báo "Failed to load strategies: API Request failed with status 404"
**Problem:** Vercel có thể đang chạy version cũ hoặc cache chưa được clear

---

## 🔍 Root Cause

### **Possible Issues:**
1. **Vercel Cache:** Frontend build cũ vẫn được serve
2. **Environment Variables:** Chưa được update đúng
3. **Build Cache:** Frontend build chưa được rebuild
4. **Network:** Frontend vẫn gọi localhost URL

---

## 🚀 Force Deploy Steps

### **Step 1: Vercel Dashboard Force Deploy**

1. **Go to:** https://vercel.com
2. **Login với GitHub**
3. **Select project:** `lumina-market`
4. **Click "Deployments" tab**
5. **Click "Redeploy"** (Force new build)
6. **Wait 2-3 phút**

### **Step 2: Clear Cache**

**Vercel Cache Clear:**
1. **Project Settings** → **Build & Development Settings**
2. **Build Command:** `npm run build`
3. **Node Version:** `18.x`
4. **Save và redeploy**

### **Step 3: Verify Environment Variables**

**Double-check Vercel Environment:**
1. **Settings** → **Environment Variables**
2. **Verify:**
   ```
   NEXT_PUBLIC_API_URL=https://lumina-market-backend-production.up.railway.app
   NEXT_PUBLIC_APP_NAME=Lumina Market
   NEXT_PUBLIC_APP_DESCRIPTION=AI-Powered Liquidity Strategy Marketplace
   ```

---

## 🔍 Test After Deploy

### **Test Commands:**
```powershell
# Test frontend API calls
Invoke-RestMethod -Uri "https://lumiamarketlpagent.vercel.app/api/strategies" -Method GET

# Test backend API
Invoke-RestMethod -Uri "https://lumina-market-backend-production.up.railway.app/api/strategies" -Method GET
```

### **Browser Test:**
1. **Mở:** `https://lumiamarketlpagent.vercel.app`
2. **F12** → **Network tab**
3. **Refresh page** (Ctrl+R)
4. **Kiểm tra request đến `/api/strategies`**

---

## 🎯 Expected Results

### **Success Indicators:**
- Frontend trả về strategies data
- Không có 404 error
- Network requests thành công
- Marketplace hiển thị strategies

### **Debug Info:**
- Request URL: `https://lumina-market-backend-production.up.railway.app/api/strategies`
- Response status: 200 OK
- Response data: Strategies array

---

## 🚀 Quick Fix Commands

### **If vẫn lỗi:**
```bash
# Force rebuild frontend
cd d:\lpagent\frontend
npm run build
npm run start

# Test local connection
curl http://localhost:3000/api/strategies
```

### **Vercel CLI Alternative:**
```bash
# Force deploy với CLI
cd d:\lpagent\frontend
vercel --prod --force
```

---

## 📱 Troubleshooting Checklist

### **✅ Kiểm tra:**
- [ ] Vercel deployment status
- [ ] Environment variables đúng
- [ ] Frontend build thành công
- [ ] Backend API working
- [ ] Network connection thành công

### **🔧 Fix Steps:**
1. Force redeploy Vercel
2. Clear browser cache
3. Test lại API calls
4. Verify strategies loading

---

**Force deploy Vercel để fix 404 error!** 🚀
