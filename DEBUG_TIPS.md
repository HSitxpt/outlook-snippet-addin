# Debug Tips for Add-in Issues

## If Buttons Don't Work

1. **Open Developer Tools:**
   - Outlook Web: Press F12
   - Outlook Desktop: File → Options → Advanced → Enable script debugging

2. **Check Console for Errors:**
   - Look for red error messages
   - Check if Office.js is loaded
   - Verify event listeners are attached

3. **Test the Button:**
   - Click the "Insert Workflow Snippet" button
   - Check console for: "Insert workflow snippet button clicked"
   - If you don't see this, the event listener isn't attached

4. **Verify Office.js:**
   - In console, type: `Office.context.mailbox.item`
   - Should return the email item object
   - If it's null, Office.js isn't ready

5. **Check Email Mode:**
   - Make sure you're composing a NEW email (not replying)
   - The add-in works best in compose mode

## Common Issues

### "Button clicked but nothing happens"
- Check console for errors
- Make sure you're in compose mode
- Try clicking in the email body first, then insert

### "Office.js not available"
- Wait a few seconds for Office.js to load
- Refresh the add-in pane
- Restart Outlook

### "No email item found"
- Make sure you have an email open or are composing
- Try creating a new email

## Quick Test

1. Open a new email
2. Open the add-in
3. Select a snippet type (e.g., "Documentation Request")
4. Fill in the fields
5. Click "Insert Workflow Snippet"
6. Check the console (F12) for any errors

