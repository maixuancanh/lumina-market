# 🌐 Vercel Custom Domain Guide
# Change frontend-eta-gilt-11.vercel.app to lumiamarket.vercel.app

## 🎯 Custom Domain Options

### **Option 1: Use Vercel Subdomain (Free)**
Change project name to get clean subdomain:
```
lumiamarket.vercel.app
```

### **Option 2: Use Custom Domain (Requires domain purchase)**
Use your own domain:
```
lumiamarket.com
app.lumiamarket.com
```

---

## 🚀 Option 1: Change Vercel Project Name

### **Step 1: Vercel Dashboard**
1. **Go to:** https://vercel.com
2. **Login with GitHub**
3. **Select project:** `frontend-eta-gilt-11`

### **Step 2: Change Project Name**
1. **Click "Settings" tab**
2. **Click "General" section**
3. **Change "Name" field:** `lumiamarket`
4. **Click "Save"**

### **Step 3: Update Domain**
1. **Go to "Domains" tab**
2. **Remove old domain:** `frontend-eta-gilt-11.vercel.app`
3. **Add new domain:** `lumiamarket.vercel.app`
4. **Click "Add"**

### **Step 4: Redeploy**
```bash
cd d:\lpagent\frontend
vercel --prod --yes
```

---

## 🌐 Option 2: Custom Domain Setup

### **Step 1: Purchase Domain**
1. **Buy domain:** `lumiamarket.com`
2. **Popular registrars:**
   - Namecheap
   - GoDaddy
   - Cloudflare
   - Google Domains

### **Step 2: Add Custom Domain in Vercel**
1. **Vercel Dashboard** → **Project** → **Domains**
2. **Click "Add"**
3. **Enter domain:** `lumiamarket.com`
4. **Follow DNS instructions**

### **Step 3: Update DNS Records**
1. **Go to domain registrar**
2. **Add DNS records:**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### **Step 4: Verify Domain**
1. **Wait for DNS propagation** (5-30 minutes)
2. **Check SSL certificate**
3. **Test domain access**

---

## 🎯 Quick Method: Project Name Change

### **Fastest Solution (2 minutes):**

1. **Vercel Dashboard** → **Project Settings**
2. **Change name:** `lumiamarket`
3. **Save changes**
4. **Redeploy:**
   ```bash
   cd d:\lpagent\frontend
   vercel --prod --yes
   ```

### **Expected Result:**
```
https://lumiamarket.vercel.app
```

---

## 🚀 Vercel CLI Method

### **Change Project Name via CLI:**
```bash
# Check current project
vercel ls

# Change project name
vercel link lumiamarket

# Deploy with new name
vercel --prod --yes
```

### **Or create new project:**
```bash
# Remove old link
rm -rf .vercel

# Create new project
vercel --prod --yes
# Enter project name: lumiamarket
```

---

## 📱 Domain Verification

### **After changing name:**
1. **Test new URL:** `https://lumiamarket.vercel.app`
2. **Check all pages work:**
   - Home page
   - Builder page
   - Dashboard
   - Marketplace

### **Verify API connection:**
```bash
# Test backend API
curl https://lumiamarket-backend-production.up.railway.app/api/health

# Test frontend API calls
# Open browser dev tools → Network tab
# Check API requests to Railway backend
```

---

## 🎯 Final URLs

### **After successful change:**
- **Frontend:** `https://lumiamarket.vercel.app`
- **Backend:** `https://lumina-market-backend-production.up.railway.app`

### **Demo URLs for Hackathon:**
- **Live Demo:** `https://lumiamarket.vercel.app`
- **API Backend:** `https://lumina-market-backend-production.up.railway.app`
- **GitHub Repo:** `https://github.com/maixuancanh/lumina-market`

---

## 🎬 Professional Presentation

### **Benefits of Clean Domain:**
- ✅ Professional appearance
- ✅ Easy to remember
- ✅ Better for hackathon demo
- ✅ Clean branding

### **Demo Script Update:**
```
"Now I'll show you our live demo at lumiamarket.vercel.app"
```

---

## 🎯 Next Steps

### **1. Change Project Name:**
- Go to Vercel dashboard
- Change project name to "lumiamarket"
- Save changes

### **2. Redeploy:**
```bash
cd d:\lpagent\frontend
vercel --prod --yes
```

### **3. Test Integration:**
- Verify new URL works
- Test API connectivity
- Check all features

---

**Use Option 1 for quick domain change!** 🚀

**You'll have professional demo URL in 2 minutes!** 🎯
