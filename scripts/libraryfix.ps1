(Get-Content ".\venv\Lib\site-packages\webview\util.py") |
    Foreach-Object {
        if ($_ -match "^        window.evaluate_js") 
        {
            "        try:`n            window.evaluate_js(code)`n`        except:`n`            pass`n"
        }else{
            $_
        }
    } | Set-Content ".\venv\Lib\site-packages\webview\util.py"


(Get-Content ".\venv\Lib\site-packages\webview\platforms\edgechromium.py") |
    Foreach-Object {
        if ($_ -match "^        self.syncContextTaskScheduler = TaskScheduler.FromCurrentSynchronizationContext()") 
        {
            "        self.syncContextTaskScheduler = TaskScheduler.FromCurrentSynchronizationContext()`n        self.web_view.DefaultBackgroundColor = Color.FromArgb(255, int(window.background_color.lstrip(`"#`")[0:2], 16), int(window.background_color.lstrip(`"#`")[2:4], 16), int(window.background_color.lstrip(`"#`")[4:6], 16))"
        }else{
            $_
        }
    } | Set-Content ".\venv\Lib\site-packages\webview\platforms\edgechromium.py"
    