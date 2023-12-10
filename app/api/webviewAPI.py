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
        self.window.toggle_fullscreen()
        #webview.windows[0].toggle_fullscreen()

    
    def log(self, message, level="debug"):
        log_levels = {
            'debug': logging.debug,
            'info': logging.info,
            'warning': logging.warning,
            'error': logging.error,
            'critical': logging.critical
        }

        log_function = log_levels.get(level.lower())
        if log_function:
            log_function(message)
        else:
            raise ValueError(f"Invalid log level: {level}")
        
       


    def load_web(self):
        try:
            logging.info("Loading app")
            time.sleep(1.24)#this is just to show the loading animation
            self.window.show()
            time.sleep(0.1)#this is the magic
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

