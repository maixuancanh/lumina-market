# 🔍 Railway Debug Guide
# Fix "Cannot GET" error on Railway deployment

## 🚨 Current Issue

**URL:** `https://lumina-market-backend-production.up.railway.app/`
**Error:** `Cannot GET`

**Problem:** Backend không trả về response cho root path `/`

---

## 🔍 Root Cause Analysis

### **1. Backend không có root route**
- Express server chỉ có API routes
- Không có route cho `/` path
- Browser request `/` → 404/Cannot GET

### **2. Port hoặc path issues**
- Server có thể đang chạy trên port khác
- Health check endpoint có thể ở path khác

---

## 🎯 Debug Steps

### **Step 1: Test Health Endpoint**
```bash
# Test health endpoint
curl https://lumina-market-backend-production.up.railway.app/api/health

# Test trong browser
https://lumina-market-backend-production.up.railway.app/api/health
```

### **Step 2: Test API Endpoints**
```bash
# Test LP Agent API
curl https://lumina-market-backend-production.up.railway.app/api/lp-agent/pools

# Test trong browser
https://lumina-market-backend-production.up.railway.app/api/lp-agent/pools
```

### **Step 3: Check Railway Logs**
1. **Go to:** https://railway.app
2. **Select project:** `lumina-market-backend`
3. **Click "Deployments" tab**
4. **Click latest deployment**
5. **View "Logs" section**
6. **Look for:**
   - Server startup messages
   - Port binding messages
   - Error messages

---

## 🔧 Quick Fixes

### **Fix 1: Add Root Route**
Add this to `src/app.ts`:
```typescript
// Add root route for health check
app.get('/', (req, res) => {
  res.json({
    message: 'Lumina Market Backend API',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      lpAgent: '/api/lp-agent/*',
      aiAgent: '/api/ai-agent/*',
      strategies: '/api/strategies/*'
    }
  });
});
```

### **Fix 2: Check Server Port**
Ensure server listens on Railway port:
```typescript
// In src/index.ts
const PORT = process.env.PORT || 4002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

### **Fix 3: Verify Environment Variables**
```bash
# Railway should have:
NODE_ENV=production
PORT=4002
```

---

## 🚀 Apply Fix 1: Add Root Route
<tool_call>read_file
<arg_key>file_path</arg_key>
<arg_value>d:\lumina-market-backend\src\app.ts
