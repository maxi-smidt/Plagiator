Write-Host "Building the Web..." -ForegroundColor White 
Set-Location .\web
npm install
npm run build
Set-Location ..
Write-Host "Installing requirements in virtual environment..." -ForegroundColor White
python -m venv venv
.\venv\Scripts\activate
pip install -r .\requirements.txt
Write-Host "Done!" -ForegroundColor Green
