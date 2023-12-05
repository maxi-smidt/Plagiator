import webview
import time
from .api.webviewAPI import API


loading_html="""
<!DOCTYPE html><html><head><style>body{background-color:#21252b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;overflow:hidden}.lds{display:inline-block;position:relative;width:240px;height:70px}.lds div{display:inline-block;position:absolute;left:8px;font-weight:700;justify-content:center;align-items:middle;width:16px;background:0 0;color:#fff;animation:lds 2.2s cubic-bezier(0,.5,.5,1) infinite}.lds div:nth-child(1){left:8px;animation-delay:-.96s}.lds div:nth-child(2){left:32px;animation-delay:-.84s}.lds div:nth-child(3){left:56px;animation-delay:-.72s}.lds div:nth-child(4){left:80px;animation-delay:-.6s}.lds div:nth-child(5){left:104px;animation-delay:-.48s}.lds div:nth-child(6){left:128px;animation-delay:-.36s}.lds div:nth-child(7){left:152px;animation-delay:-.24s}.lds div:nth-child(8){left:200px;animation-delay:0s}.lds div:nth-child(9){left:224px;animation-delay:.12s}@keyframes lds{0%{top:8px;height:64px}100%,50%{top:24px;height:32px}}</style></head><body><div class="blk"><div class="lds"><div>L</div><div>O</div><div>A</div><div>D</div><div>I</div><div>N</div><div>G</div><div>U</div><div>I</div></div></div></body></html>

"""

class WebviewUI():
    
    @staticmethod
    def init(debug):
      api = API()
      window = webview.create_window('Plagiator', 
                              './web/dist/index.html', 
                              js_api=api,
                              html=loading_html,
                              #minimized=True,
                              min_size=(1000, 600), 
                              background_color='#21252B',
                              transparent=False,
                              draggable=True,
                              frameless=True)
      api.set_window(window)
      webview.start(api.load_web, debug=debug)

      