# Troubleshooting Installation Issues

## Common Installation Errors

### Error: "Package Type Not Identified"
This usually means:
- The manifest file is not being recognized
- Try installing from the **file directly** instead of URL
- Or ensure the manifest is accessible via HTTPS

### Error: "Invalid manifest"
This could mean:
- XML syntax error
- Missing required elements
- Invalid URLs

### Error: "Add-in failed to load"
This usually means:
- URLs in manifest are not accessible
- Files referenced don't exist on GitHub Pages
- CORS or security issues

## Solutions

### Option 1: Use the Simplified Manifests

I've created simplified versions without FormSettings conflicts:
- `manifest-simple.xml` - For Insert Snippet
- `manifest-itxpt-simple.xml` - For ITXPT Templates

Try installing these instead.

### Option 2: Use the Original Manifests (Without VersionOverrides)

If the ribbon buttons aren't critical, you can use the original manifests that worked before. They use FormSettings which makes them appear automatically when opening emails.

### Option 3: Check These Things

1. **Manifest file is valid XML:**
   ```powershell
   # Test XML validity
   [xml]$xml = Get-Content manifest.xml
   ```

2. **All URLs are accessible:**
   - https://hsitxpt.github.io/outlook-snippet-addin/index.html
   - https://hsitxpt.github.io/outlook-snippet-addin/taskpane.html
   - https://hsitxpt.github.io/outlook-snippet-addin/commands.html
   - https://hsitxpt.github.io/outlook-snippet-addin/assets/icon-64.png
   - https://hsitxpt.github.io/outlook-snippet-addin/assets/icon-128.png

3. **Installation method:**
   - Try installing from **file** instead of URL
   - Or try installing from **URL** instead of file
   - Make sure you're using the correct manifest file

4. **Outlook version:**
   - VersionOverrides require Outlook 2016 or later
   - Or Outlook on the web
   - Older versions might not support ribbon buttons

## What Error Did You Get?

Please share:
1. The **exact error message** from Outlook
2. **Where** you're installing (Desktop, Web, Mobile)
3. **How** you're installing (file, URL, etc.)

This will help me provide a more specific solution.

## Quick Fix: Use Original Working Manifests

If you just need the add-ins to work, you can revert to the original manifests that installed successfully. They won't have ribbon buttons, but they'll work via FormSettings.

