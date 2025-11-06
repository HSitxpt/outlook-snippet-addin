# Script to verify all add-in files are accessible on GitHub Pages

$baseUrl = "https://hsitxpt.github.io/outlook-snippet-addin"
$files = @(
    "taskpane.html",
    "taskpane.js",
    "taskpane.css",
    "assets/icon-64.png",
    "assets/icon-128.png"
)

Write-Host "🔍 Verifying files on GitHub Pages..." -ForegroundColor Cyan
Write-Host ""

$allGood = $true

foreach ($file in $files) {
    $url = "$baseUrl/$file"
    Write-Host "Checking: $url" -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host " ✅ OK" -ForegroundColor Green
        } else {
            Write-Host " ❌ Status: $($response.StatusCode)" -ForegroundColor Red
            $allGood = $false
        }
    } catch {
        Write-Host " ❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

if ($allGood) {
    Write-Host "✅ All files are accessible!" -ForegroundColor Green
} else {
    Write-Host "❌ Some files are missing or not accessible" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Make sure all files are committed and pushed to GitHub" -ForegroundColor White
    Write-Host "2. Verify GitHub Pages is enabled:" -ForegroundColor White
    Write-Host "   https://github.com/HSitxpt/outlook-snippet-addin/settings/pages" -ForegroundColor Cyan
    Write-Host "3. Wait 1-2 minutes after pushing for GitHub Pages to update" -ForegroundColor White
    Write-Host "4. Run this script again to verify" -ForegroundColor White
}

