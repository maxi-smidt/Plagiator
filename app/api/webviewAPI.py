import webview
import json
import time
from ..plagiatscan.scan import excute_comparison
import logging


class API():

    def __init__(self):
        self.window = None

    def set_window(self,window):
        self.window = window
    def set_lwindow(self, lwindow):
        self.lwindow = lwindow

    def toggle_fullscreen(self):
        self.lwindow.toggle_fullscreen()
        #webview.windows[0].toggle_fullscreen()

    def load_web(self):
        try:
            logging.info("Loading app")
            time.sleep(1.24*2)
            self.window.show()
            time.sleep(0.1)
            self.lwindow.destroy()
            #webview.windows[0].toggle_transparent = False
            #webview.windows[0].hide()
            #webview.windows[0].load_url('./web/dist/index.html')
            #time.sleep(1.5)
            #webview.windows[0].show()
            self.window.on_top = True
            self.window.on_top = False            
            logging.info("Switched to web")
        except:
            logging.critical("Could not switch to web")


    def kill(self):
        logging.info("Received termination from web")
        try:
            return self.window.destroy()
        except:
            pass
    
    def health(self):
        logging.info("Health Received")

    def compute_comparison(self, fileL, fileR):
        result = excute_comparison(fileL["content"], fileR["content"])
        return result

