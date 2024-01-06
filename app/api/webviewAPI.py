import time
import logging

from ..scanner.moss_scanner import MossScanner


class API:
    def __init__(self):
        self.window = None
        self.loading_window = None

    def set_window(self, window):
        self.window = window

    def set_loading_window(self, loading_window):
        self.loading_window = loading_window

    def toggle_fullscreen(self):
        self.window.toggle_fullscreen()

    @classmethod
    def log(cls, message, level="debug"):
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
            time.sleep(1.24)  # this is just to show the loading animation
            self.window.show()
            time.sleep(0.2)  # this is the magic is
            self.loading_window.destroy()
            # webview.windows[0].toggle_transparent = False # todo clean comments
            # webview.windows[0].hide()
            # webview.windows[0].load_url('./web/dist/index.html')
            # time.sleep(1.5)
            # webview.windows[0].show()
            self.window.on_top = True
            self.window.on_top = False
            logging.info("Switched to web")
        except Exception as e:
            logging.critical(f"Could not switch to web: {e}")

    def kill(self):
        logging.info("Received termination from web")
        return self.window.destroy()

    @classmethod
    def health(cls):
        logging.info("Health Received")

    @classmethod
    def compute_comparison(cls, files):
        files = [obj['content'] for obj in files]
        m = MossScanner()
        return m.compare(files)

    @classmethod
    def send_log(cls, message):
        print(message)
