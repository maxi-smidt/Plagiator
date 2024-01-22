import time
import logging

from ..scanner.moss_scanner import MossScanner
from database.database_manager import DatabaseManager as dbm


class API:
    def __init__(self, debug):
        self.window = None
        self.loading_window = None
        self.debug = debug

    def set_window(self, window):
        self.window = window

    def set_loading_window(self, loading_window):
        self.loading_window = loading_window

    def toggle_fullscreen(self):
        self.window.toggle_fullscreen()
    
    def minimize(self):
        self.window.minimize()

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
        file_1, file_2 = files
        # m = MossScanner()
        # result = m.compare([file_1['content'], file_2['content']]) TODO activate moss again
        result = '{"error": "", "data": [{"file_index": "0", "match": "95", "match_history": [{"start": "1", "end": "14", "match": "95"}]}, {"file_index": "1", "match": "95", "match_history": [{"start": "1", "end": "11", "match": "95"}]}]}'
        dbm.insert_into_comparison({'name': file_1['path'], 'content': file_1['content']},
                                   {'name': file_2['path'], 'content': file_2['content']}, result)
        return result

    @classmethod
    def get_history(cls):
        return dbm.get_history()

    @classmethod
    def send_log(cls, message):
        print(message)

    def get_log(self):
        if not self.debug:
            return
        with open('plagiator.log', 'r') as file:
            return [self.__parse_log_line(line) for line in file.readlines()]

    @staticmethod
    def __parse_log_line(line):
        split = line.split('[')
        time_stamp = split[0]
        split = split[1].split(']')
        severity = split[0]
        message = split[1].replace(": ", "", 1).strip()
        return {'time_stamp': time_stamp, 'severity': severity, 'message': message}

