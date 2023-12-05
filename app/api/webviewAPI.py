import webview
import json
import time
from ..plagiatscan.scan import excute_comparison


class API():

    def __init__(self):
        self.window = None

    def set_window(self,window):
        self.window = window

    def toggle_fullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def load_web(self):
        time.sleep(0.5)
        try:
            webview.windows[0].load_url('./web/dist/index.html')
        except:
            print("Closed Captain!")


    def kill(self):
        try:
            return self.window.destroy()
        except:
            pass
    def health(self):
        print("Application works!")

    def compute_comparison(self, fileL, fileR):
        """ print("File One")
        print(fileL)
        print("File Two")
        print(fileR) """
        result = excute_comparison(fileL["content"], fileR["content"])
        return result

