(Get-Content ".\venv\Lib\site-packages\webview\util.py") |
    Foreach-Object {
        if ($_ -match "^        window.evaluate_js") 
        {
            "        try:`n            window.evaluate_js(code)`n`        except:`n`            pass`n"
        }else{
            $_
        }
    } | Set-Content ".\venv\Lib\site-packages\webview\util.py"
    


