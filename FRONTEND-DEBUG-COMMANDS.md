# 🔍 Frontend Debug Commands
# Test frontend API connection with different curl commands

## 🚨 PowerShell curl Issues

PowerShell `curl` command đang bị lỗi với parameter `-X`. Tôi sẽ cung cấp các command thay thế.

---

## 🎯 Working Debug Commands

### **Method 1: PowerShell Invoke-RestMethod**
```powershell
# Test GET request
Invoke-RestMethod -Uri "https://lumiamarketlpagent.vercel.app/api/strategies" -Method GET

# Test POST request
Invoke-RestMethod -Uri "https://lumiamarketlpagent.vercel.app/api/strategies" -Method POST -Body '{"test": "data"}'
```

### **Method 2: PowerShell WebRequest**
```powershell
# Test GET request
$response = Invoke-WebRequest -Uri "https://lumiamarketlpagent.vercel.app/api/strategies" -Method GET
$response.Content

# Test POST request
$body = '{"test": "data"}'
$response = Invoke-WebRequest -Uri "https://lumiamarketlpagent.vercel.app/api/strategies" -Method POST -Body $body -ContentType "application/json"
$response.Content
```

### **Method 3: Use Browser Dev Tools**
1. **Mở:** `https://lumiamarketlpagent.vercel.app`
2. **F12** → **Network tab**
3. **Tìm request đến `/api/strategies`**
4. **Kiểm tra:**
   - URL có đúng không?
   - Status code là gì?
   - Response content là gì?

### **Method 4: Test Backend Directly**
```bash
# Test Railway backend
curl https://lumina-market-backend-production.up.railway.app/api/strategies

# Test Vercel frontend
curl https://lumiamarketlpagent.vercel.app/api/strategies
```

---

## 🔍 Expected Results

### **Backend Working:**
```json
{
  "success": true,
  "data": [...strategies],
  "message": "Strategies retrieved successfully"
}
```

### **Frontend Issues:**
- **404 Error:** Frontend không tìm thấy endpoint
- **500 Error:** Frontend gọi sai URL
- **CORS Error:** Frontend bị block

---

## 🎯 Debug Steps

### **Step 1: Test Backend**
```powershell
Invoke-RestMethod -Uri "https://lumina-market-backend-production.up.railway.app/api/strategies" -Method GET
```

### **Step 2: Test Frontend**
```powershell
Invoke-RestMethod -Uri "https://lumiamarketlpagent.vercel.app/api/strategies" -Method GET
```

### **Step 3: Compare Results**
- Backend trả về 200 OK với data
- Frontend có thể 404 hoặc 500
- Xác định vấn đề chính xác

---

## 🚀 Quick Fix Commands

### **If Frontend 404:**
1. **Vercel Dashboard** → **Deployments**
2. **Redeploy** để update environment variables
3. **Wait 2-3 phút**

### **If Frontend 500:**
1. **Kiểm tra Vercel logs**
2. **Kiểm tra environment variables**
3. **Fix lỗi trong code**

### **If CORS Issue:**
1. **Backend CORS:** Đảm bảo `origin: ['https://lumiamarketlpagent.vercel.app']`
2. **Frontend calls:** Đảm bảo gọi đúng URL

---

**Sử dụng các command này để debug frontend!** 🔍
