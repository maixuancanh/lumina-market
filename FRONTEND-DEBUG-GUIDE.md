# 🔍 Frontend Debug Guide
# Fix "Failed to fetch: Failed to fetch" error

## 🚨 Current Issue

**Error:** `Failed to fetch: Failed to fetch`
**Problem:** Frontend không thể gọi API từ backend

---

## 🔍 Root Cause Analysis

### **Possible Issues:**

**1. Frontend API URL sai**
- `NEXT_PUBLIC_API_URL` vẫn sai
- Frontend đang gọi sai Railway URL
- Environment variable chưa được update đúng

**2. Network/CORS Issues**
- Frontend không thể kết nối đến Railway
- CORS configuration sai
- Network block

**3. Backend API response sai**
- Backend có thể trả về error thay vì data
- API endpoint có vấn đề

**4. Frontend build cache**
- Frontend build cũ vẫn được deploy
- Environment variable không được update

---

## 🎯 Debug Steps

### **Step 1: Kiểm tra Frontend Environment**

**Mở browser dev tools:**
1. **Mở:** `https://lumiamarketlpagent.vercel.app`
2. **F12** → **Console** tab
3. **Tìm error messages**
4. **Kiểm tra network requests**

### **Step 2: Kiểm tra API Calls**

**Trong Network tab:**
1. **Tìm request đến `/api/strategies`**
2. **Kiểm tra URL:** có đúng không?
3. **Kiểm tra response:** 404 hay 500?
4. **Kiểm tra headers:** CORS OK?

### **Step 3: Kiểm tra Environment Variables**

**Trong Vercel dashboard:**
1. **Settings** → **Environment Variables**
2. **Verify:**
   ```
   NEXT_PUBLIC_API_URL=https://lumina-market-backend-production.up.railway.app
   ```

### **Step 4: Test Backend Directly**

**Test Railway API:**
```bash
# Test strategies endpoint
curl https://lumina-market-backend-production.up.railway.app/api/strategies

# Test health endpoint
curl https://lumina-market-backend-production.up.railway.app/api/health
```

---

## 🔧 Quick Fixes

### **Fix 1: Force Clear Frontend Cache**

**Vercel Dashboard:**
1. **Deployments** → **Latest deployment**
2. **Click "Redeploy"** để force update
3. **Wait 2-3 phút**

### **Fix 2: Update Frontend Environment**

**Nếu environment variable sai:**
1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. **Update:** 
   ```
   NEXT_PUBLIC_API_URL=https://lumina-market-backend-production.up.railway.app
   ```
3. **Save và redeploy**

### **Fix 3: Check Frontend Code**

**Trong frontend API calls:**
```typescript
// Đảm bảo gọi đúng URL
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/strategies`);

// Kiểm tra response
if (!response.ok) {
  console.error('API call failed:', response.status, response.statusText);
}
```

---

## 🚀 Test Commands

### **Frontend Debug:**
```bash
# Kiểm tra environment variable
cd d:\lpagent\frontend
echo $NEXT_PUBLIC_API_URL

# Build và test local
npm run build
npm run start
```

### **Backend Debug:**
```bash
# Test tất cả endpoints
curl https://lumina-market-backend-production.up.railway.app/api/health
curl https://lumina-market-backend-production.up.railway.app/api/strategies
curl https://lumina-market-backend-production.up.railway.app/api/lp-agent/pools
```

---

## 📱 Expected Results

### **Frontend Working:**
- Strategies load trong marketplace
- Không có "Failed to fetch" error
- API calls thành công

### **Backend Working:**
- Tất cả endpoints trả về 200 OK
- Data đúng được trả về
- CORS headers đúng

---

## 🎯 Next Steps

### **1. Debug Frontend:**
- Kiểm tra browser console
- Verify API URL
- Test network requests

### **2. Update Environment:**
- Vercel dashboard environment variables
- Force redeploy frontend

### **3. Verify Integration:**
- Test full application
- Kiểm tra tất cả features

---

**Follow these steps to fix "Failed to fetch" error!** 🔍
