Start-Process powershell.exe -ArgumentList "-File .\scripts\install.ps1" -NoNewWindow -Wait
pyinstaller --onefile --noconsole --icon='./web/dist/favicon.ico' --add-data='./web/dist/:./web/dist/' main.py
Write-Host "Build .exe can be found in ./dist/" -ForegroundColor Green
