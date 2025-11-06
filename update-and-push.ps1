# Complete update script: Updates manifest, commits, and provides push instructions
# Run this script every time you make changes to the add-in

param(
    [string]$ManifestFile = "manifest-itxpt.xml",
    [string]$CommitMessage = "Update add-in with cache-busting"
)

Write-Host "🚀 Starting add-in update process..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Update manifest
Write-Host "Step 1: Updating manifest..." -ForegroundColor Yellow
& "$PSScriptRoot\update-addin.ps1" -ManifestFile $ManifestFile

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to update manifest" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Check git status
Write-Host "Step 2: Checking git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Changes detected:" -ForegroundColor Green
    Write-Host $gitStatus
    
    # Step 3: Stage changes
    Write-Host "`nStep 3: Staging changes..." -ForegroundColor Yellow
    git add $ManifestFile
    git add taskpane.html
    git add taskpane.js
    git add taskpane.css
    
    # Step 4: Commit
    Write-Host "Step 4: Committing changes..." -ForegroundColor Yellow
    git commit -m $CommitMessage
    Write-Host "✅ Committed changes" -ForegroundColor Green
    
    # Step 5: Push instructions
    Write-Host "`n📤 Ready to push!" -ForegroundColor Cyan
    Write-Host "Run this command to push to GitHub:" -ForegroundColor White
    Write-Host "  git push" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After pushing:" -ForegroundColor Yellow
    Write-Host "1. Wait 1-2 minutes for GitHub Pages to update" -ForegroundColor White
    Write-Host "2. In Outlook: Remove the add-in" -ForegroundColor White
    Write-Host "3. Reinstall using the updated manifest-itxpt.xml" -ForegroundColor White
    Write-Host "4. The new version will automatically load!" -ForegroundColor White
} else {
    Write-Host "ℹ️  No changes to commit" -ForegroundColor Gray
}

Write-Host "`n✨ Update process complete!" -ForegroundColor Cyan

