# 🖼️ Railway URL Step-by-Step Guide
# Detailed instructions with visual guide

## 🎯 Step 1: Mở Railway Dashboard

### **1.1 Vào Railway:**
- **Mở browser:** https://railway.app
- **Login với GitHub**
- **Bạn sẽ thấy dashboard với danh sách projects**

### **1.2 Tìm Project của bạn:**
- **Tìm project:** `lumina-market-backend`
- **Click vào project name**
- **Bạn sẽ vào project dashboard**

---

## 🎯 Step 2: Tìm URL trong Project Dashboard

### **2.1 Look for URL Section:**
Trong project dashboard, tìm:

**📍 Location 1: Top Bar**
- **Right bên cạnh project name**
- **Nút "View" hoặc "Open"**
- **URL hiển thị dưới dạng button**

**📍 Location 2: Settings Tab**
- **Click "Settings" (left sidebar)
- **Tìm "Domain" hoặc "URL" section**
- **URL sẽ hiển thị ở đây**

**📍 Location 3: Deployments Tab**
- **Click "Deployments" (left sidebar)
- **Click vào deployment mới nhất**
- **URL sẽ hiển thị trong deployment details**

---

## 🎯 Step 3: Copy URL

### **3.1 URL Format Đúng:**
```
https://production-builderv3-us-west1-hhgw.up.railway.app
```

### **3.2 Copy Methods:**
- **Click vào URL** → mở trong browser
- **Click "Copy" button** (nếu có)
- **Click chuột phải** → "Copy link address"

---

## 🎯 Step 4: Test URL

### **4.1 Test Health Endpoint:**
```bash
# Thay bằng URL của bạn
curl https://your-actual-url.up.railway.app/api/health
```

### **4.2 Test trong Browser:**
1. **Mở:** `https://your-actual-url.up.railway.app/api/health`
2. **Nên thấy:**
   ```json
   {
     "status": "ok",
     "timestamp": "2024-05-12T...",
     "uptime": 123.456
   }
   ```

---

## 🎯 Step 5: Update Vercel

### **5.1 Vào Vercel Dashboard:**
1. **Mở:** https://vercel.com
2. **Login với GitHub**
3. **Select project:** `lumina-market`

### **5.2 Update Environment Variables:**
1. **Click "Settings" tab**
2. **Click "Environment Variables"**
3. **Update:**
   ```
   NEXT_PUBLIC_API_URL=https://your-actual-railway-url.up.railway.app
   ```
4. **Click "Save"**

### **5.3 Redeploy:**
```bash
cd d:\lpagent\frontend
vercel --prod --yes
```

---

## 🎯 Troubleshooting

### **Nếu không thấy URL:**

**Check 1: Project có đang chạy?**
- **Railway dashboard** → **Project status**
- **Nên thấy "Running" hoặc "Deployed"**
- **Nếu "Failed" → check logs**

**Check 2: Deployment có thành công?**
- **Click "Deployments" tab**
- **Xem latest deployment**
- **Status nên là "Success"**

**Check 3: Environment variables?**
- **Settings** → **Environment Variables**
- **Đảm bảo có:**
  ```
  NODE_ENV=production
  PORT=4002
  ```

---

## 🎯 Quick Commands

### **Railway CLI Commands:**
```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# List projects
railway list

# Open project in browser
cd d:\lumina-market-backend
railway open

# Check status
railway status

# View logs
railway logs
```

---

## 🎯 Expected URLs

### **Based on your build log:**
```
https://production-builderv3-us-west1-hhgw.up.railway.app
```

### **Test URL này:**
1. **Mở:** `https://production-builderv3-us-west1-hhgw.up.railway.app/api/health`
2. **Nếu thấy response → URL đúng!**
3. **Nếu không → tìm trong dashboard**

---

## 🎯 Next Steps

### **1. Tìm Railway URL:**
- Dùng guide trên
- Test với health endpoint
- Copy URL đúng

### **2. Update Vercel:**
- Set NEXT_PUBLIC_API_URL
- Deploy frontend production
- Test full integration

### **3. Test Demo:**
- Frontend + Backend connected
- All features working
- Ready for hackathon

---

**Follow these steps exactly to find your Railway URL!** 🚀
