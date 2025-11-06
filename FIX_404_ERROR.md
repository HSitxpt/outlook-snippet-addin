# Fix 404 Error - Files Not Found

## 🔍 Problem
You're getting 404 errors when the add-in tries to load files from GitHub Pages.

## ✅ Quick Fix Steps

### Step 1: Verify Files Are Pushed to GitHub

```powershell
# Check git status
git status

# If there are uncommitted changes, commit and push:
git add .
git commit -m "Update add-in files"
git push
```

### Step 2: Verify Files Are on GitHub Pages

Run the verification script:
```powershell
.\verify-files.ps1
```

Or manually check these URLs in your browser:
- https://hsitxpt.github.io/outlook-snippet-addin/taskpane.html
- https://hsitxpt.github.io/outlook-snippet-addin/taskpane.js
- https://hsitxpt.github.io/outlook-snippet-addin/taskpane.css

**If you get 404:**
- Files aren't pushed to GitHub
- GitHub Pages isn't enabled
- Wait 1-2 minutes after pushing

### Step 3: Enable GitHub Pages (If Not Already)

1. Go to: https://github.com/HSitxpt/outlook-snippet-addin/settings/pages
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `(root)`
4. Click **Save**
5. Wait 1-2 minutes

### Step 4: Check GitHub Actions

1. Go to: https://github.com/HSitxpt/outlook-snippet-addin/actions
2. Look for "pages build and deployment"
3. Should be "completed" (green)

### Step 5: Reinstall Add-in

After files are verified:
1. Remove the add-in from Outlook
2. Wait 1 minute
3. Reinstall using `manifest-itxpt.xml`

## 🔧 What I Fixed

I removed the query parameters (`?v=1.2`) from the manifest URLs temporarily to avoid any caching issues. Once files are on GitHub Pages, we can add them back.

## 📋 Checklist

- [ ] All files committed to git
- [ ] Files pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Files accessible via browser (no 404)
- [ ] Add-in reinstalled

## 🐛 Still Getting 404?

1. **Check the exact URL** in the browser's Network tab (F12)
2. **Verify the file exists** in your GitHub repo
3. **Check GitHub Pages settings** - make sure it's deploying from `main` branch
4. **Wait 2-3 minutes** after pushing - GitHub Pages needs time to update

