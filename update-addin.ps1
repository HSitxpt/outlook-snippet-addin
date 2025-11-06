# PowerShell script to automatically update the add-in manifest with cache-busting
# This forces Outlook to reload the add-in without manual cache clearing

param(
    [string]$ManifestFile = "manifest-itxpt.xml"
)

Write-Host "🔄 Updating add-in manifest for cache-busting..." -ForegroundColor Cyan

# Generate timestamp for cache-busting
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$version = Get-Date -Format "1.yyyy.MMdd.HHmm"

# Read the manifest
$manifestPath = Join-Path $PSScriptRoot $ManifestFile
if (-not (Test-Path $manifestPath)) {
    Write-Host "❌ Error: Manifest file not found: $manifestPath" -ForegroundColor Red
    exit 1
}

[xml]$manifest = Get-Content $manifestPath

# Update version number
$manifest.OfficeApp.Version = $version
Write-Host "✅ Updated version to: $version" -ForegroundColor Green

# Update all HTML file URLs with cache-busting query parameter
$htmlFiles = @("taskpane.html", "index.html", "commands.html")

# Update FormSettings SourceLocation
foreach ($form in $manifest.OfficeApp.FormSettings.Form) {
    if ($form.DesktopSettings.SourceLocation) {
        $url = $form.DesktopSettings.SourceLocation.DefaultValue
        if ($url -match "\.html") {
            $newUrl = if ($url -match "\?") { "$url&v=$timestamp" } else { "$url?v=$timestamp" }
            $form.DesktopSettings.SourceLocation.DefaultValue = $newUrl
            Write-Host "✅ Updated FormSettings URL: $newUrl" -ForegroundColor Green
        }
    }
}

# Update VersionOverrides TaskPane.Url
$taskPaneUrl = $manifest.SelectSingleNode("//bt:Url[@id='TaskPane.Url']", 
    (New-Object System.Xml.XmlNamespaceManager($manifest.NameTable)))
if ($taskPaneUrl) {
    $url = $taskPaneUrl.DefaultValue
    $newUrl = if ($url -match "\?") { "$url&v=$timestamp" } else { "$url?v=$timestamp" }
    $taskPaneUrl.DefaultValue = $newUrl
    Write-Host "✅ Updated TaskPane.Url: $newUrl" -ForegroundColor Green
}

# Save the updated manifest
$manifest.Save($manifestPath)
Write-Host "✅ Manifest saved: $manifestPath" -ForegroundColor Green

Write-Host "`n📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Commit and push the updated manifest to GitHub" -ForegroundColor White
Write-Host "2. Wait 1-2 minutes for GitHub Pages to update" -ForegroundColor White
Write-Host "3. In Outlook: Remove the add-in and reinstall it" -ForegroundColor White
Write-Host "   (The new version will force Outlook to reload)" -ForegroundColor White
Write-Host "`n✨ Done! The add-in will now reload with the new version." -ForegroundColor Cyan

