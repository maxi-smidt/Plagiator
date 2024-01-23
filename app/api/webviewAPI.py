import time
import logging
import re

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
        m = MossScanner()
        result = m.compare([file_1['content'], file_2['content']])
        dbm.insert_into_comparison(file_1, file_2, result)
        return result

    @classmethod
    def get_history(cls):
        return dbm.get_history()

    def get_log(self):
        if not self.debug:
            return
        with open('plagiator.log', 'r') as file:
            return [self.__parse_log_line(line) for line in file.readlines()]

    @staticmethod
    def __parse_log_line(line):
        pattern = r'^(.*?)\[(.*?)\]:\s*(.*)$'
        match = re.match(pattern, line)
        time_stamp, severity, message = match.groups()
        return {'time_stamp': time_stamp, 'severity': severity, 'message': message}

    @classmethod
    def get_files(cls, file_1_name, file_2_name):
        return [dbm.get_file_by_name(file_1_name), dbm.get_file_by_name(file_2_name)]
