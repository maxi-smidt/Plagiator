Write-Host "Building the Web..." -ForegroundColor White 
Set-Location .\web
npm install
npm run build
Set-Location ..
Write-Host "Installing requirements in virtual environment..." -ForegroundColor White
python -m venv venv
Start-Process powershell.exe -ArgumentList "-File ./venv/Scripts/activate.ps1" -NoNewWindow -Wait
pip install -r .\requirements.txt #--force-reinstall
Write-Host "Done!" -ForegroundColor Green
