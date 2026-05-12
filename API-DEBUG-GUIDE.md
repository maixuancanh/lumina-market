# 🔍 API 404 Error Debug Guide
# Fix "Failed to load strategies: API Request failed with status 404"

## 🚨 Current Issue

**Error:** `Failed to load strategies: API Request failed with status 404`

**Problem:** Frontend không thể kết nối đến backend API endpoint

---

## 🔍 Root Cause Analysis

### **Possible Issues:**

**1. Railway Backend URL sai**
- Frontend đang gọi sai URL
- Railway URL có thể đã thay đổi
- Environment variable chưa được update

**2. API Endpoint không tồn tại**
- Backend không có `/api/strategies` endpoint
- Route chưa được định nghĩa

**3. CORS Issues**
- Frontend không thể gọi API từ domain khác
- CORS configuration sai

**4. Backend không chạy**
- Railway deployment có thể failed
- Server không response

---

## 🎯 Debug Steps

### **Step 1: Kiểm tra Railway Backend URL**

**Test Railway URL hiện tại:**
```bash
# Test health endpoint
curl https://lumina-market-backend-production.up.railway.app/api/health

# Test strategies endpoint
curl https://lumina-market-backend-production.up.railway.app/api/strategies
```

**Nếu 404 → Railway URL sai**

### **Step 2: Kiểm tra Railway Dashboard**

1. **Go to:** https://railway.app
2. **Select project:** `lumina-market-backend`
3. **Copy đúng URL** từ dashboard
4. **Update Vercel environment**

### **Step 3: Kiểm tra Frontend API Calls**

**Mở browser dev tools:**
1. **Mở:** `https://lumiamarketlpagent.vercel.app`
2. **F12** → **Network tab**
3. **Tìm request đến `/api/strategies`**
4. **Kiểm tra URL và response**

---

## 🔧 Quick Fixes

### **Fix 1: Update Railway URL**

**Nếu Railway URL đã thay đổi:**
1. **Find đúng URL** trong Railway dashboard
2. **Update Vercel:**
   ```
   NEXT_PUBLIC_API_URL=https://ĐÚNG-RAILWAY-URL.up.railway.app
   ```
3. **Redeploy Vercel:**
   ```bash
   cd d:\lpagent\frontend
   vercel --prod --yes
   ```

### **Fix 2: Check Backend Routes**

**Kiểm tra backend routes:**
```typescript
// Trong src/app.ts, đảm bảo có:
app.use('/api/strategies', strategyRoutes);

// Trong src/routes/strategyRoutes.ts:
router.get('/', async (req, res) => {
  // Return strategies
});
```

### **Fix 3: Verify CORS**

**CORS configuration:**
```typescript
// Trong src/app.ts
app.use(cors({
  origin: ['https://lumiamarketlpagent.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

---

## 🚀 Test Commands

### **Test Backend Directly:**
```bash
# Test all endpoints
curl https://your-railway-url.up.railway.app/api/health
curl https://your-railway-url.up.railway.app/api/strategies
curl https://your-railway-url.up.railway.app/api/lp-agent/pools
```

### **Test Frontend Integration:**
```bash
# Kiểm tra environment variables
echo $NEXT_PUBLIC_API_URL

# Test API call từ frontend
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/strategies`)
```

---

## 🎯 Expected Results

### **Backend Working:**
```json
{
  "success": true,
  "data": [...strategies],
  "message": "Strategies retrieved successfully"
}
```

### **Frontend Loading:**
- Strategies hiển thị trong marketplace
- Không có 404 error
- API calls thành công

---

## 📱 Next Steps

### **1. Find Correct Railway URL**
- Railway dashboard → Copy URL
- Test với curl commands
- Verify endpoints working

### **2. Update Frontend**
- Vercel environment variables
- Redeploy frontend
- Test integration

### **3. Verify Full System**
- Frontend ↔ Backend connected
- All API endpoints working
- No 404 errors

---

**Follow these steps to fix the 404 API error!** 🚀
