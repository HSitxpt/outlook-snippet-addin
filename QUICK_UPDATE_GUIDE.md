# Quick Update Guide - No More Cache Clearing!

## 🚀 Automated Update Process

Instead of manually clearing cache every time, use the automated update script:

### Option 1: Full Automated Update (Recommended)

```powershell
.\update-and-push.ps1
```

This script will:
1. ✅ Update the manifest version automatically
2. ✅ Add cache-busting query parameters
3. ✅ Stage and commit your changes
4. ✅ Give you the push command

Then just run:
```powershell
git push
```

### Option 2: Just Update Manifest (Manual Git)

```powershell
.\update-addin.ps1
```

Then manually:
```powershell
git add manifest-itxpt.xml
git commit -m "Update add-in"
git push
```

## 📋 After Pushing to GitHub

1. **Wait 1-2 minutes** for GitHub Pages to update
2. **In Outlook:**
   - Remove the add-in (Settings → Add-ins → Remove)
   - Reinstall using `manifest-itxpt.xml`
3. **Done!** The new version will load automatically

## 🔍 How It Works

The script:
- Generates a unique timestamp for cache-busting
- Updates the manifest version number
- Adds `?v=timestamp` to all HTML file URLs
- This forces Outlook to reload the files

## ⚡ Why This Works

Outlook caches add-ins aggressively. By:
1. **Changing the version number** - Outlook sees it as a new version
2. **Adding query parameters** - Browser treats it as a different file
3. **Meta tags in HTML** - Prevents browser caching

You get automatic updates without manual cache clearing!

## 🐛 Troubleshooting

**Still seeing old version?**
1. Make sure you pushed to GitHub
2. Wait 2-3 minutes for GitHub Pages
3. Remove and reinstall the add-in (the version change forces reload)
4. Check the manifest version in Outlook (should show the new version)

**Script won't run?**
- Make sure PowerShell execution policy allows scripts:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

