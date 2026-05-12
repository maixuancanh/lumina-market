# 🔍 AI URL Error Fix Guide
# Fix "ai url kìa" error

## 🚨 Current Issue

**Error:** `ai url kìa`
**Problem:** Frontend không thể kết nối đến AI service

---

## 🔍 Root Cause Analysis

### **Possible Issues:**

**1. AI Service URL sai**
- Frontend đang gọi sai AI endpoint
- Ollama API URL không đúng
- Environment variable sai

**2. AI Service không chạy**
- Backend AI service có thể bị lỗi
- Ollama model không available
- API key sai

**3. Frontend AI calls sai**
- Frontend đang gọi sai endpoint
- Request format sai
- Response handling sai

---

## 🎯 Debug Steps

### **Step 1: Kiểm tra AI Service Backend**

**Test AI endpoint:**
```bash
# Test AI status
curl https://lumina-market-backend-production.up.railway.app/api/ai-agent/status

# Test AI analysis
curl -X POST https://lumina-market-backend-production.up.railway.app/api/strategies/analyze \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Test AI analysis"}'
```

### **Step 2: Kiểm tra Frontend AI Calls**

**Mở browser dev tools:**
1. **Mở:** `https://lumiamarketlpagent.vercel.app`
2. **F12** → **Network tab**
3. **Tìm request AI endpoint**
4. **Kiểm tra URL và response**

### **Step 3: Kiểm tra Environment Variables**

**Backend (.env):**
```bash
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:12b
```

**Frontend (Vercel):**
```bash
NEXT_PUBLIC_API_URL=https://lumina-market-backend-production.up.railway.app
```

---

## 🔧 Quick Fixes

### **Fix 1: Update AI Service URL**

**Nếu Ollama API URL sai:**
```typescript
// Trong src/services/ollamaService.ts
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434';
```

### **Fix 2: Check AI Model Available**

**Test Ollama model:**
```bash
# Test local Ollama
curl http://localhost:11434/api/generate

# Test model availability
curl http://localhost:11434/api/tags
```

### **Fix 3: Update Frontend AI Calls**

**Nếu frontend gọi sai endpoint:**
```typescript
// Đảm bảo gọi đúng URL
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-agent/status`);
```

---

## 🚀 Test Commands

### **Backend AI Test:**
```bash
# Test AI service
curl https://lumina-market-backend-production.up.railway.app/api/ai-agent/status

# Test strategy analysis
curl -X POST https://lumina-market-backend-production.up.railway.app/api/strategies/analyze \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Test AI analysis"}'
```

### **Frontend Debug:**
```bash
# Kiểm tra environment variables
echo $NEXT_PUBLIC_API_URL

# Test API calls từ frontend
# Mở browser và kiểm tra console
```

---

## 📱 Expected Results

### **AI Service Working:**
```json
{
  "success": true,
  "data": {
    "isRunning": true,
    "lastCheck": "2024-05-12T...",
    "strategiesChecked": 3
  }
}
```

### **Frontend Loading:**
- AI status hiển thị đúng
- Strategy analysis working
- Không có "ai url kìa" error

---

## 📱 Next Steps

### **1. Test AI Service**
- Verify backend AI endpoints
- Check Ollama model availability
- Test strategy analysis

### **2. Debug Frontend**
- Kiểm tra browser console
- Verify API calls
- Fix environment variables

### **3. Update Configuration**
- Update AI service URLs
- Fix frontend API calls
- Test full integration

---

**Follow these steps to fix "ai url kìa" error!** 🚀
