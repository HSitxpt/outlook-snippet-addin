# Troubleshooting: Buttons Not Appearing in Outlook Ribbon

## Quick Checklist

If you can't see the "Insert Snippet" button when composing a draft:

### ✅ Step 1: Verify Add-in is Installed

**Outlook Desktop:**
1. Go to **File** → **Options** → **Add-ins**
2. At the bottom, select **"COM Add-ins"** from dropdown → Click **"Go"**
3. Check if "Insert Snippet" is listed
4. Then select **"My Add-ins"** from dropdown → Click **"Go"**
5. Verify "Insert Snippet" appears here and is **Enabled**

**Outlook Web (outlook.office.com):**
1. Click **Settings** (⚙️) → **View all Outlook settings**
2. Go to **Mail** → **Customize actions** → **Add-ins**
3. Check if "Insert Snippet" is listed

### ✅ Step 2: Reinstall the Add-in (IMPORTANT!)

**After updating the manifest, you MUST reinstall:**

1. **Remove the old add-in:**
   - Outlook Desktop: File → Options → Add-ins → My Add-ins → Remove
   - Outlook Web: Settings → Add-ins → Remove

2. **Restart Outlook completely** (close all windows)

3. **Reinstall from the updated manifest:**
   - Outlook Desktop: File → Options → Add-ins → My Add-ins → Add → Add from file → Select `manifest.xml`
   - Outlook Web: Settings → Add-ins → Get add-ins → Add a custom add-in → Add from file → Upload `manifest.xml`

4. **Wait 1-2 minutes** for Outlook to process the new manifest

5. **Restart Outlook again**

### ✅ Step 3: Check Where to Look

The button should appear in the **default ribbon tab** when composing:

1. **Open a new email** (or edit a draft)
2. Look in the **main ribbon tabs** (Message, Insert, etc.)
3. Look for a group labeled **"Insert Snippet"**
4. The button should be inside that group

**Note:** The button appears in the **default tab**, not in a separate "Add-ins" tab.

### ✅ Step 4: Verify Outlook Version

Ribbon buttons require:
- **Outlook 2016 or later** (desktop)
- **Outlook on the web** (any modern browser)
- **Outlook 2019 or later** (for best support)

**Check your Outlook version:**
- Desktop: File → Office Account → About Outlook
- Should show version 16.0 or higher

### ✅ Step 5: Check for Hidden/Collapsed Ribbon

1. **Right-click on the ribbon** → Check if ribbon is minimized
2. **Click the ribbon tabs** to expand if minimized
3. **Look for the "Insert Snippet" group** in the expanded ribbon

### ✅ Step 6: Check Manifest is Valid

Run validation:
```powershell
npx office-addin-manifest validate manifest.xml
```

Should show: **"The manifest is valid."**

### ✅ Step 7: Check URLs are Accessible

The manifest references these URLs - verify they work:
- https://hsitxpt.github.io/outlook-snippet-addin/index.html
- https://hsitxpt.github.io/outlook-snippet-addin/assets/icon-64.png
- https://hsitxpt.github.io/outlook-snippet-addin/assets/icon-128.png

Open these in a browser - they should load without errors.

### ✅ Step 8: Clear Outlook Cache (Last Resort)

**Outlook Desktop:**
1. Close Outlook completely
2. Delete cached manifests:
   - Press `Win + R`
   - Type: `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\`
   - Delete all files in this folder
   - Restart Outlook
   - Reinstall the add-in

**Outlook Web:**
1. Clear browser cache
2. Hard refresh (Ctrl + Shift + R)
3. Reinstall the add-in

## Common Issues

### "I see the add-in listed but no button"
- **Solution:** Reinstall the add-in (remove → restart → reinstall)
- Outlook may have cached the old manifest without ribbon buttons

### "Button appears in read mode but not compose mode"
- Check the manifest has `MessageComposeCommandSurface` (it does)
- Try creating a **brand new email** (not editing a draft)
- Make sure you're in compose mode, not reply mode initially

### "I see the button but clicking does nothing"
- Check the URL in manifest: `https://hsitxpt.github.io/outlook-snippet-addin/index.html`
- Verify the file exists and loads in a browser
- Check browser console (F12) for errors

### "Button appeared but disappeared"
- This can happen if Outlook updates or if there's a manifest error
- Reinstall the add-in
- Check if manifest validation passes

## Still Not Working?

1. **Try installing from URL instead of file:**
   - Use: `https://hsitxpt.github.io/outlook-snippet-addin/manifest.xml`
   - Sometimes URL installation works better than file installation

2. **Check Outlook logs:**
   - Outlook Desktop: File → Options → Advanced → Enable troubleshooting logging
   - Check Event Viewer for Office add-in errors

3. **Verify GitHub Pages is serving the manifest:**
   - Open: https://hsitxpt.github.io/outlook-snippet-addin/manifest.xml
   - Should see the XML content, not a 404 error

4. **Try a different Outlook account** (if possible) to rule out account-specific issues

## What the Button Should Look Like

- **Icon:** Small icon from your assets folder
- **Label:** "Insert Snippet"
- **Location:** In the default ribbon tab (usually "Message" tab)
- **Group:** "Insert Snippet" group
- **Tooltip:** "Open the task pane to insert a predefined snippet into your email."

## Expected Behavior

When you click the button:
1. A task pane should open on the right side
2. The task pane should load `index.html` from GitHub Pages
3. You can then use the add-in functionality

If the task pane doesn't open, check the URL in the manifest and verify the HTML file loads correctly.

