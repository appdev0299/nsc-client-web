# PowerShell script to migrate files to [locale] structure
# Run this from the project root: d:\nsc-client-web

Write-Host "Starting migration to [locale] structure..." -ForegroundColor Green

# Create [locale] directory if not exists
$localeDir = "src\app\[locale]"
if (-not (Test-Path $localeDir)) {
    New-Item -ItemType Directory -Path $localeDir -Force
    Write-Host "Created $localeDir" -ForegroundColor Yellow
}

# Function to copy directory recursively
function Copy-DirectoryStructure {
    param (
        [string]$Source,
        [string]$Destination
    )
    
    if (Test-Path $Source) {
        Write-Host "Copying $Source to $Destination..." -ForegroundColor Cyan
        
        # Create destination if not exists
        if (-not (Test-Path $Destination)) {
            New-Item -ItemType Directory -Path $Destination -Force | Out-Null
        }
        
        # Copy all items
        Copy-Item -Path "$Source\*" -Destination $Destination -Recurse -Force
        Write-Host "✓ Copied $Source" -ForegroundColor Green
    } else {
        Write-Host "⚠ Source not found: $Source" -ForegroundColor Yellow
    }
}

# Migrate (app) folder
Write-Host "`n=== Migrating (app) folder ===" -ForegroundColor Magenta
Copy-DirectoryStructure -Source "src\app\(app)" -Destination "src\app\[locale]\(app)"

# Migrate (auth) folder
Write-Host "`n=== Migrating (auth) folder ===" -ForegroundColor Magenta
Copy-DirectoryStructure -Source "src\app\(auth)" -Destination "src\app\[locale]\(auth)"

# Migrate dashboard folder
Write-Host "`n=== Migrating dashboard folder ===" -ForegroundColor Magenta
Copy-DirectoryStructure -Source "src\app\dashboard" -Destination "src\app\[locale]\dashboard"

Write-Host "`n=== Migration Complete! ===" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Review the migrated files in src\app\[locale]\" -ForegroundColor White
Write-Host "2. Test the application: npm run dev" -ForegroundColor White
Write-Host "3. If everything works, you can delete the old folders:" -ForegroundColor White
Write-Host "   - src\app\(app)" -ForegroundColor Gray
Write-Host "   - src\app\(auth)" -ForegroundColor Gray
Write-Host "   - src\app\dashboard" -ForegroundColor Gray
Write-Host "`nNote: API routes (src\app\api) are NOT migrated as they don't need localization." -ForegroundColor Cyan
