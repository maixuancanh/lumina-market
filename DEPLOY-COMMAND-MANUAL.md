# 🚀 Vercel Deploy Command Manual
# Deploy frontend to production manually

## 🎯 Current Issue

Vercel CLI command đang bị timeout/error. Tôi sẽ hướng dẫn deploy thủ công.

---

## 🔧 Manual Deploy Steps

### **Step 1: Vercel Dashboard Deploy**

1. **Go to:** https://vercel.com
2. **Login với GitHub**
3. **Select project:** `lumina-market`
4. **Click "Deployments" tab**
5. **Click "Redeploy"** (hoặc "Deploy")
6. **Wait for deployment** (2-3 phút)

### **Step 2: Check Environment Variables**

1. **Settings** → **Environment Variables**
2. **Verify:**
   ```
   NEXT_PUBLIC_API_URL=https://lumina-market-backend-production.up.railway.app
   NEXT_PUBLIC_APP_NAME=Lumina Market
   NEXT_PUBLIC_APP_DESCRIPTION=AI-Powered Liquidity Strategy Marketplace
   ```

### **Step 3: Verify Deployment**

1. **Check deployment URL:** `https://lumiamarketlpagent.vercel.app`
2. **Test API calls:** Mở browser dev tools → Network tab
3. **Verify strategies loading:** Marketplace page

---

## 🎯 Alternative: GitHub Auto-Deploy

### **Enable GitHub Integration:**

1. **Vercel Dashboard** → **Project** → **Settings**
2. **Git Integration** → **Connected**
3. **Auto-deploy on push:** Enable
4. **Push latest commit:** Trigger auto-deploy

---

## 🔍 Troubleshooting

### **Nếu CLI vẫn lỗi:**

**Option 1: Reinstall Vercel CLI**
```bash
# Uninstall
npm uninstall -g vercel

# Reinstall
npm install -g vercel@latest

# Login
vercel login

# Deploy
vercel --prod --yes
```

**Option 2: Use Web Dashboard**
- Deploy qua Vercel web interface
- Không cần CLI
- Đáng tin cậy hơn

**Option 3: Check PowerShell Execution Policy**
```bash
# Kiểm tra execution policy
Get-ExecutionPolicy

# Nếu restricted, set cho current user
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🎯 Expected Results

### **Sau khi deploy thành công:**
```
✅  Production: https://lumiamarketlpagent.vercel.app
🔗  Inspect: https://vercel.com/maixuancanh/lumina-market/xxxxx
📱  Functions: 0 functions in the package.json
```

### **Frontend Features:**
- ✅ Home page với Railway API integration
- ✅ Marketplace với strategies loading
- ✅ Builder với AI analysis
- ✅ Dashboard với real-time data

---

## 📱 Quick Commands

### **Test local build:**
```bash
cd d:\lpagent\frontend
npm run build
npm run start
```

### **Check environment:**
```bash
echo $NEXT_PUBLIC_API_URL
```

### **Verify API connection:**
```bash
curl https://lumina-market-backend-production.up.railway.app/api/strategies
```

---

**Sử dụng Vercel Dashboard để deploy production!** 🚀

**CLI có thể bị lỗi do system configuration.** 🔧
