param (
    [switch]${skip-install}
)
if(-not ${skip-install}){
Start-Process powershell.exe -ArgumentList "-File .\scripts\install.ps1" -NoNewWindow -Wait
}
pyinstaller --onefile --noconsole --icon='./web/dist/favicon.ico' --add-data='./web/dist/:./web/dist/' main.py
Move-Item -Path ".\dist\main.exe" -Destination ".\dist\plagiator.exe" -force
Write-Host "Build 'plagiator.exe' can be found in ./dist/" -ForegroundColor Green
