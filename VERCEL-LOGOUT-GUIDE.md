# 🚪 Vercel CLI Logout Guide
# How to logout from Vercel CLI

## 🎯 Quick Logout Methods

### **Method 1: Vercel CLI Command**
```bash
vercel logout
```

### **Method 2: Manual Logout**
```bash
# Remove Vercel credentials
rm -rf ~/.config/vercel

# On Windows
rmdir /s %USERPROFILE%\.config\vercel

# Or delete specific files
del %USERPROFILE%\.config\vercel\auth.json
```

### **Method 3: Clear Session**
```bash
# Clear Vercel session
vercel logout --force

# Or remove all Vercel data
vercel logout --all
```

---

## 🔍 Check Current Login Status

### **Check if logged in:**
```bash
vercel whoami
```

### **Check current team:**
```bash
vercel teams list
```

### **List current projects:**
```bash
vercel ls
```

---

## 🎯 Login with Different Account

### **After logout:**
```bash
# Login with new account
vercel login

# Or login with specific team
vercel login --team=your-team-name
```

### **Login options:**
- **GitHub** (recommended)
- **GitLab**
- **Bitbucket**
- **Email**

---

## 🚀 Troubleshooting

### **If logout fails:**
```bash
# Force logout
vercel logout --force

# Clear all data
rm -rf ~/.config/vercel

# Restart terminal
# Then try login again
```

### **If still logged in:**
```bash
# Check multiple auth locations
ls ~/.config/vercel/
ls ~/.vercel/

# Remove all auth files
rm -rf ~/.vercel/
rm -rf ~/.config/vercel/
```

---

## 🎯 Re-login Steps

### **1. Logout current account:**
```bash
vercel logout
```

### **2. Verify logout:**
```bash
vercel whoami
# Should show "Not logged in"
```

### **3. Login with new account:**
```bash
vercel login
# Choose your preferred method
```

### **4. Verify new login:**
```bash
vercel whoami
# Should show new account details
```

---

## 📱 Quick Commands Summary

```bash
# Logout
vercel logout

# Check status
vercel whoami

# Login new account
vercel login

# List projects
vercel ls

# Deploy with new account
vercel --prod --yes
```

---

## 🎯 Next Steps

### **After successful logout:**
1. **Login with correct account**
2. **Verify project access**
3. **Deploy frontend to Vercel**
4. **Test Railway integration**

### **For your current setup:**
- Backend: Railway URL working
- Frontend: Ready for Vercel deployment
- Integration: Railway + Vercel connection

---

**Use `vercel logout` to logout and login with correct account!** 🚀
