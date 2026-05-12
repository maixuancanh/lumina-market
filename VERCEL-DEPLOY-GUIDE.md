# 🚀 Vercel Deployment Guide for Lumina Market

## 📋 Prerequisites

### **Required Accounts:**
- [x] GitHub account with repository: `maixuancanh/lumina-market`
- [ ] Vercel account (free tier sufficient)
- [ ] Backend service running (port 4002)

### **Current Status:**
- ✅ Repository updated with latest demo materials
- ✅ Frontend configured for Next.js 14
- ✅ Vercel configuration file created
- ✅ Ready for deployment

---

## 🎯 Step-by-Step Deployment

### **Step 1: Connect Vercel to GitHub**

1. **Go to Vercel:** https://vercel.com
2. **Sign up/login** with GitHub account
3. **Click "New Project"**
4. **Import repository:** `maixuancanh/lumina-market`
5. **Select framework:** Next.js (auto-detected)

### **Step 2: Configure Environment Variables**

In Vercel dashboard, add these environment variables:

```bash
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_APP_NAME=Lumina Market
NEXT_PUBLIC_APP_DESCRIPTION=AI-Powered Liquidity Strategy Marketplace

# Optional: If you have a backend deployed
NEXT_PUBLIC_API_URL=https://lumina-market-backend.vercel.app
```

### **Step 3: Configure Build Settings**

Vercel should auto-detect these settings:
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### **Step 4: Deploy**

1. **Click "Deploy"**
2. **Wait for build** (2-3 minutes)
3. **Get deployment URL:** `https://lumina-market-xxx.vercel.app`

---

## 🔧 Backend Configuration

### **Option 1: Keep Local Backend**
```bash
# Keep backend running locally
cd d:\lpagent\backend
npm run dev
# Frontend will connect to: http://localhost:4002
```

### **Option 2: Deploy Backend to Vercel**
```bash
# Create backend vercel.json
{
  "functions": {
    "api/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### **Option 3: Use Railway/Render**
- Deploy backend to Railway: https://railway.app
- Get backend URL and update Vercel env vars

---

## 🎯 Deployment Verification

### **After Deployment, Test:**

1. **Frontend URL:** `https://lumina-market-xxx.vercel.app`
2. **Check pages:**
   - Home page loads ✅
   - Builder page works ✅
   - Dashboard shows data ✅
   - Marketplace displays strategies ✅

3. **API Connectivity:**
   - Backend health check: `/api/health`
   - LP Agent data: `/api/lp-agent/pools`
   - AI Agent status: `/api/ai-agent/status`

---

## 🚨 Troubleshooting

### **Common Issues:**

**1. Build Fails:**
```bash
# Check package.json dependencies
npm install
npm run build
```

**2. API Connection Failed:**
```bash
# Check environment variables
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**3. CORS Issues:**
```bash
# In backend, ensure CORS is configured
app.use(cors({ origin: true, credentials: true }));
```

**4. Static Assets:**
```bash
# Ensure SVG files are in public folder
public/system_workflow_diagram.svg
public/system_architecture_diagram.svg
```

---

## 🎯 Custom Domain (Optional)

### **Setup Custom Domain:**
1. **In Vercel Dashboard:** Settings → Domains
2. **Add domain:** `lumina-market.com` (or your domain)
3. **Update DNS:** Point to Vercel nameservers
4. **SSL Certificate:** Auto-provisioned by Vercel

---

## 📱 Mobile Optimization

### **Vercel Analytics:**
- Enable Vercel Analytics for performance monitoring
- Check Core Web Vitals
- Optimize images and loading

---

## 🔄 Continuous Deployment

### **Automatic Deployments:**
- **Push to GitHub** → Auto-deploy to Vercel
- **Pull Requests** → Preview deployments
- **Main branch** → Production deployment

### **Deployment Hooks:**
```bash
# Add to package.json scripts
"vercel-build": "npm run build",
"postbuild": "echo 'Build completed successfully'"
```

---

## 🎯 Production Checklist

### **Before Going Live:**
- [ ] Backend API is accessible
- [ ] Environment variables set correctly
- [ ] All pages load without errors
- [ ] API endpoints respond correctly
- [ ] Mobile responsive design works
- [ ] Performance metrics are good

### **After Deployment:**
- [ ] Test all user flows
- [ ] Monitor error logs in Vercel
- [ ] Check analytics and performance
- [ ] Update README with live URL

---

## 🚀 Quick Deploy Commands

### **One-Click Deploy (if Vercel CLI installed):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd d:\lpagent\frontend
vercel --prod

# Link to existing project
vercel link
vercel --prod
```

### **Manual Deploy via Web:**
1. Go to https://vercel.com
2. Import GitHub repository
3. Configure settings
4. Click Deploy

---

## 📞 Support

### **Vercel Documentation:**
- https://vercel.com/docs
- https://vercel.com/docs/concepts/projects/overview

### **Next.js Deployment:**
- https://nextjs.org/docs/deployment

### **Common Issues:**
- Check Vercel logs for build errors
- Verify environment variables
- Ensure API endpoints are accessible

---

**Ready to deploy Lumina Market to Vercel!** 🚀

**Your live demo will be available at:** `https://lumina-market-xxx.vercel.app`
