# How to Clear Outlook Add-in Cache and See Updates

If you've updated the add-in but don't see the changes, follow these steps:

## Method 1: Clear Browser Cache (Outlook Web)

1. **Open Outlook Web** (outlook.office.com)
2. **Press F12** to open Developer Tools
3. **Right-click the refresh button** in the browser
4. Select **"Empty Cache and Hard Reload"**
5. **Close and reopen Outlook Web**

## Method 2: Clear Office Cache (Desktop Outlook)

### Windows:
1. **Close Outlook completely**
2. **Press Windows + R** to open Run dialog
3. Type: `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\`
4. **Delete all files** in this folder (or just the cache subfolder)
5. **Restart Outlook**

### Alternative Windows path:
- `C:\Users\[YourUsername]\AppData\Local\Microsoft\Office\16.0\Wef\`

## Method 3: Reinstall the Add-in

1. **Remove the add-in completely:**
   - Outlook Web: Settings → Mail → Customize actions → Add-ins → Remove
   - Outlook Desktop: File → Options → Add-ins → Manage → Remove

2. **Wait 5-10 minutes** (to clear server-side cache)

3. **Reinstall the add-in** using `manifest-itxpt.xml`

4. **Restart Outlook**

## Method 4: Force Refresh (Quick Fix)

1. **Open a new email** in Outlook
2. **Press Ctrl + Shift + R** (hard refresh)
3. **Or press F5** multiple times

## Method 5: Check Manifest Version

The manifest version has been updated to **1.1.0.0** to force Outlook to reload.

If you still don't see updates:
- Make sure you're using `manifest-itxpt.xml` (not `manifest.xml`)
- Check that the files are published to GitHub Pages
- Verify the URLs in the manifest match your GitHub Pages URL

## Verify the Update Worked

After clearing cache, you should see:
- **Workflow Snippets** section at the top
- Options for: Documentation Request, Remote Session Setup, Lab Shipping Instructions, Test Results Report
- The new workflow snippet templates

