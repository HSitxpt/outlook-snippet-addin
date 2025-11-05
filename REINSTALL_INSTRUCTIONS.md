# Reinstall Instructions for Updated Add-ins

## What Changed

The add-in manifests have been updated to include **ribbon buttons** that will appear in the Outlook ribbon. This makes them much easier to access!

## Steps to Reinstall

### Option 1: Outlook Web App (outlook.office.com)

1. **Open Outlook Web App** in your browser
2. Click the **Settings gear icon** (⚙️) → **View all Outlook settings**
3. Go to **Mail** → **Customize actions** → **Add-ins**
4. **Remove** the existing add-ins:
   - Find "Insert Snippet" → Click "..." → Remove
   - Find "ITXPT Labeling Templates" → Click "..." → Remove
5. **Reinstall:**
   - Click **"Get add-ins"** or **"+"**
   - Select **"Add a custom add-in"** → **"Add from file"**
   - Upload `manifest.xml` or `manifest-itxpt.xml`
   - Or use the URL: `https://hsitxpt.github.io/outlook-snippet-addin/manifest.xml`

### Option 2: Outlook Desktop

1. **Open Outlook Desktop**
2. Go to **File** → **Options** → **Add-ins**
3. At the bottom, select **"My Add-ins"** from the dropdown
4. Click **"Go"** or **"Manage"**
5. **Remove** the existing add-ins
6. **Reinstall:**
   - Click **"+"** or **"Add"**
   - Select **"Add from file"**
   - Browse to and select `manifest.xml` or `manifest-itxpt.xml`

### Option 3: Direct Installation URL

If you have the manifest files hosted, you can also install via URL:
- For "Insert Snippet": Use the URL to `manifest.xml`
- For "ITXPT Templates": Use the URL to `manifest-itxpt.xml`

## After Reinstallation

Once reinstalled, you should see:

1. **Ribbon buttons** in the Outlook ribbon when:
   - Composing a new email
   - Reading an existing email

2. **Button locations:**
   - In the default ribbon tab
   - In groups labeled "Insert Snippet" or "ITXPT Templates"

3. **How to use:**
   - Simply click the button in the ribbon
   - The task pane will open automatically
   - No need to hunt through menus!

## Troubleshooting

### Buttons don't appear

1. **Wait a few minutes** - Outlook may need time to load the new manifest
2. **Restart Outlook** - Close and reopen Outlook
3. **Check Outlook version** - Ribbon buttons require Outlook 2016 or later, or Outlook on the web
4. **Verify installation** - Check that the add-ins are listed in Settings → Add-ins

### Can't reinstall

1. **Clear Outlook cache** (if needed):
   - Close Outlook
   - Delete cached manifests (usually in AppData)
   - Restart Outlook

2. **Check manifest URL** - Ensure GitHub Pages is serving the files correctly

3. **Try manual file installation** - Use "Add from file" instead of URL

## What the Ribbon Buttons Look Like

- **Icon**: Small square icon (using your icon files)
- **Label**: "Insert Snippet" or "ITXPT Templates"
- **Location**: In the main ribbon tab when composing/reading emails
- **Tooltip**: Hover to see description

## Benefits of the Update

✅ **Easier access** - Buttons right in the ribbon  
✅ **No menu hunting** - Direct access from email window  
✅ **Better UX** - Standard Office Add-in experience  
✅ **Works everywhere** - Desktop, Web, and Mobile (if enabled)

