# Push Files to Fix 404 Error

## 🚀 Quick Steps

1. **Push to GitHub:**
   ```powershell
   git push
   ```

2. **Wait 1-2 minutes** for GitHub Pages to update

3. **Verify files are accessible:**
   ```powershell
   .\verify-files.ps1
   ```

4. **Or check manually in browser:**
   - https://hsitxpt.github.io/outlook-snippet-addin/taskpane.html
   - https://hsitxpt.github.io/outlook-snippet-addin/taskpane.js
   - https://hsitxpt.github.io/outlook-snippet-addin/taskpane.css

5. **Reinstall the add-in** in Outlook after files are verified

## ✅ What Was Fixed

- Removed query parameters from manifest URLs (they were causing issues)
- Added verification script to check if files are accessible
- Files are ready to push

## ⚠️ Important

**The 404 error will persist until you push the files to GitHub!**

After pushing, wait 1-2 minutes, then verify the files are accessible before reinstalling the add-in.

