param (
    [switch]${skip-web},
    [switch]${skip-app},
    [switch]${force-package-reinstall}
    [switch]${force-recreate-venv}
)

if(-not ${skip-web}){
    Write-Host "Installing & Building web..." -ForegroundColor Yellow 
    Set-Location .\web
    npm install
    npm run build
    Set-Location ..
}else{ Write-Host "Skipping web" -ForegroundColor DarkGray }
if(-not ${skip-app}){
    Write-Host "Installing app requirements in virtual environment..." -ForegroundColor Yellow
    if (-not(Test-Path -Path "./venv/") -or ${force-recreate-venv}) {
        Remove-Item -Path "./venv/" -Recurse -Force
        python -m venv venv
    }
    Start-Process powershell.exe -ArgumentList "-File ./venv/Scripts/activate.ps1" -NoNewWindow -Wait
    if(${force-package-reinstall}){
        pip install -r .\requirements.txt --force-reinstall
    }else{
        pip install -r .\requirements.txt #--force-reinstall
    }
}else{ Write-Host "Skipping app" -ForegroundColor DarkGray }

Write-Host "Applying library hotfix" -ForegroundColor Yellow
Start-Process powershell.exe -ArgumentList "-File .\scripts\libraryfix.ps1" -NoNewWindow -Wait
Write-Host "Done!" -ForegroundColor Green
