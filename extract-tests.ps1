# PowerShell script to extract tests from Excel file
# This script reads the Sequoia Excel file and outputs test data as JSON

# Try to find the Excel file
$excelFile = Get-ChildItem -Path . -Filter "*Sequoia*.xlsx" | Select-Object -First 1

if (-not $excelFile) {
    Write-Host "Error: Sequoia Excel file not found in current directory" -ForegroundColor Red
    Write-Host "Looking for files matching: *Sequoia*.xlsx" -ForegroundColor Yellow
    Get-ChildItem -Path . -Filter "*.xlsx" | ForEach-Object { Write-Host "Found: $($_.Name)" }
    exit 1
}

$excelFilePath = $excelFile.FullName
Write-Host "Found Excel file: $($excelFile.Name)" -ForegroundColor Green

try {
    # Create Excel COM object
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    
    # Open the workbook
    $workbook = $excel.Workbooks.Open($excelFilePath)
    
    Write-Host "Reading Excel file: $($excelFile.Name)"
    Write-Host ""
    
    # List all worksheets
    Write-Host "Worksheets in file:"
    Write-Host "=" * 80
    for ($i = 1; $i -le $workbook.Worksheets.Count; $i++) {
        $ws = $workbook.Worksheets.Item($i)
        Write-Host "$i. $($ws.Name)"
    }
    Write-Host ""
    
    # Search each worksheet for test data
    for ($wsIndex = 1; $wsIndex -le $workbook.Worksheets.Count; $wsIndex++) {
        $worksheet = $workbook.Worksheets.Item($wsIndex)
        Write-Host "=" * 80
        Write-Host "Worksheet: $($worksheet.Name)"
        Write-Host "=" * 80
        
        # Find the last row and column with data
        $usedRange = $worksheet.UsedRange
        if ($usedRange) {
            $lastRow = $usedRange.Rows.Count
            $lastCol = $usedRange.Columns.Count
            
            Write-Host "Data range: Rows 1-$lastRow, Columns 1-$lastCol"
            Write-Host ""
            
            # Look for rows that might contain test data
            # Search for keywords like "test", "check", "verify", "compliance", etc.
            $testKeywords = @("test", "check", "verify", "compliance", "service", "module", "base", "package")
            
            Write-Host "Searching for test-related rows..."
            Write-Host ""
            
            # Read all rows and look for test patterns
            $foundTests = @()
            for ($row = 1; $row -le $lastRow; $row++) {
                $rowData = @()
                $hasTestKeyword = $false
                
                for ($col = 1; $col -le [Math]::Min($lastCol, 10); $col++) {
                    $cellValue = $worksheet.Cells.Item($row, $col).Text
                    if ($cellValue) {
                        $rowData += $cellValue
                        # Check if cell contains test-related keywords
                        $cellLower = $cellValue.ToLower()
                        foreach ($keyword in $testKeywords) {
                            if ($cellLower.Contains($keyword)) {
                                $hasTestKeyword = $true
                                break
                            }
                        }
                    }
                }
                
                # If row has test keywords or looks like test data, display it
                if ($hasTestKeyword -or ($rowData.Count -ge 2 -and $row -gt 10)) {
                    $rowText = $rowData -join " | "
                    if ($rowText.Trim().Length -gt 0) {
                        Write-Host "Row $row : $rowText"
                        $foundTests += [PSCustomObject]@{
                            Row = $row
                            Data = $rowText
                        }
                    }
                }
            }
            
            # Also show first 30 rows to understand structure
            Write-Host ""
            Write-Host "First 30 rows (to understand structure):"
            Write-Host "-" * 80
            for ($row = 1; $row -le [Math]::Min(30, $lastRow); $row++) {
                $rowData = @()
                for ($col = 1; $col -le [Math]::Min($lastCol, 8); $col++) {
                    $cellValue = $worksheet.Cells.Item($row, $col).Text
                    if ($cellValue) {
                        $rowData += $cellValue
                    }
                }
                if ($rowData.Count -gt 0) {
                    Write-Host "Row $row : $($rowData -join ' | ')"
                }
            }
        }
    }
    
    # Close Excel
    $workbook.Close($false)
    $excel.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
    
    Write-Host ""
    Write-Host "Extraction complete. Please review the structure above."
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Stack trace: $($_.ScriptStackTrace)" -ForegroundColor Red
    if ($excel) {
        $excel.Quit()
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
    }
    exit 1
}

