# How to Use the Outlook Add-ins

## Overview

You have two add-ins installed:

1. **Insert Snippet** - Simple snippet inserter
2. **ITXPT Labeling Templates** - Advanced template form for labeling workflows

## How to Access the Add-ins

### ⚠️ IMPORTANT: Reinstall the Add-ins

**The manifests have been updated with ribbon buttons!** You need to **reinstall** the add-ins for the buttons to appear:

1. **Remove the old add-ins:**
   - Outlook Web: Settings → Mail → Customize actions → Add-ins → Remove
   - Outlook Desktop: File → Options → Add-ins → Manage → Remove

2. **Reinstall using the updated manifest files:**
   - Use the same method you used before (from file or URL)
   - The new manifests include **ribbon buttons** that will appear automatically

### Where to Find the Add-ins (After Reinstall)

After reinstalling, you'll see **ribbon buttons** in the Outlook ribbon:

- **When composing a new email:** Look for "Insert Snippet" or "ITXPT Templates" button in the ribbon
- **When reading an email:** Look for the same buttons in the Message ribbon tab

The buttons will be in a group labeled:
- **"Insert Snippet"** for the simple snippet add-in
- **"ITXPT Templates"** for the labeling templates add-in

### Method 1: From Outlook Web App (outlook.office.com)

1. **Open Outlook Web App** in your browser
2. **Click "New Message"** to compose an email
3. Look for **three dots (...) or "..."** in the email toolbar
4. Click it to see **"Get Add-ins"** or look for your add-in in the toolbar
5. Click the add-in to open the task pane

### Method 2: From Outlook Desktop

1. **Open Outlook Desktop application**
2. **Click "New Email"** to compose a new message
3. In the ribbon, look for your add-ins:
   - They may appear in the **"Add-ins"** tab
   - Or click **"Get Add-ins"** button in the ribbon
4. Click the add-in to open the task pane

### Method 3: Manual Access via Settings

**Outlook Web App:**
1. Click the **Settings gear icon** (⚙️)
2. Go to **"View all Outlook settings"**
3. Navigate to **Mail** → **Customize actions** → **Add-ins**
4. Find your add-in and click it

**Outlook Desktop:**
1. Go to **File** → **Options** → **Add-ins**
2. At the bottom, select **"COM Add-ins"** or **"My Add-ins"** from dropdown
3. Click **"Go"** or **"Manage"**
4. Find your add-in and ensure it's enabled

### Quick Access Tip

Once you've used an add-in, Outlook may remember it and show it in:
- The **"..." (More options)** menu in the email compose window
- The **Add-ins** section of the ribbon

## Using "Insert Snippet" Add-in

1. **Open or compose an email**
2. **Open the task pane** (using one of the methods above)
3. Click the **"Insert sample snippet"** button
4. The snippet will be inserted into your email body:
   ```
   Compliance Snippet
   Result: PASS
   Notes: ...
   ```

## Using "ITXPT Labeling Templates" Add-in

This add-in provides a form to create structured labeling templates:

### Step-by-Step:

1. **Open or compose an email**
2. **Open the ITXPT Labeling Templates task pane**
3. **Fill in the form:**
   - **Deadline Information:**
     - Select a labeling deadline date
     - Select a time
   
   - **Processsteg (Process Stage):**
     - Select current step: Planering, Förberedelse, Testning pågår, Granskning, Finalisering, or Klart
     - Enter Planner Ticket ID (e.g., LAB-123)
   
   - **Genomförda Tester (Completed Tests):**
     - Click "Lägg till test" to add tests
     - Fill in test information for each test
   
   - **Ytterligare information (Additional Notes):**
     - Add any additional notes or information

4. **Click "Infoga Template i Email"** to insert the formatted template into your email
5. **Click "Rensa formulär"** to clear the form and start over

## Troubleshooting

### Add-in doesn't appear

1. **Refresh Outlook:** Close and reopen Outlook
2. **Check internet connection:** Add-ins load from GitHub Pages (https://hsitxpt.github.io)
3. **Verify installation:** 
   - Go to File → Options → Add-ins
   - Check if add-ins are listed under "My Add-ins"
4. **Reinstall if needed:**
   - Remove the add-in
   - Install again using the manifest file

### Task pane doesn't open

1. **Check email mode:** Make sure you're in compose or edit mode
2. **Check permissions:** The add-in needs ReadWriteItem permissions
3. **Check browser console:** Press F12 in Outlook Web App to see any errors

### Content doesn't insert

1. **Make sure you're in compose/edit mode:** Read-only emails won't allow insertion
2. **Place your cursor** where you want the content inserted (the ITXPT add-in inserts at cursor position)
3. **Check if email is in draft:** Save as draft if needed
4. **Try refreshing:** Close and reopen the task pane

### Insertion works at cursor position

- **ITXPT Labeling Templates:** Inserts the formatted template **at your cursor position** in the email
- **Insert Snippet:** Replaces the entire email body (be careful!)

**Tip:** For ITXPT add-in, place your cursor where you want the template before clicking "Infoga Template i Email"

## Tips

- **Save drafts frequently** when composing emails with templates
- **Use the ITXPT add-in** for structured labeling workflows
- **Use the Insert Snippet add-in** for quick, simple snippets
- Both add-ins work in **Outlook Desktop**, **Outlook Web App**, and **Outlook Mobile** (if enabled)

## Next Steps

If you need to customize the templates or add more functionality, you can:
- Edit `taskpane.html` and `taskpane.js` for ITXPT templates
- Edit `index.html` for the simple snippet inserter
- Push changes to GitHub to update the live add-ins

