import logging
import argparse
import threading
from app.webviewUI import WebviewUI
from app.legacyUI import LegacyUI
from database.database_manager import DatabaseManager as dbm

DEFAULT_LOG_LEVEL = logging.INFO


def get_numeric_log_level(level):
    if level == 'info':
        return logging.INFO
    if level == 'warning':
        return logging.WARNING
    if level == 'error':
        return logging.ERROR
    if level == 'critical':
        return logging.CRITICAL
    if level == 'debug':
        return logging.DEBUG
    return DEFAULT_LOG_LEVEL


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Plagiator")
    parser.add_argument("--nogui", "-c",  action="store_true", help="Only use the commandline interface.")
    parser.add_argument("--gui", choices=['web', 'legacy'], nargs="?", const='web', default='web',
                        help="Choose whether to use the modern useful and nice GUI or the legacy old and useless "
                             "tkinter GUI. Will be ignored if --nogui is present") #? -> zero or one argument/1 -> one argument
    parser.add_argument('--loglevel', dest='log_level', nargs="?", default=DEFAULT_LOG_LEVEL,
                        choices=['debug', 'info', 'warning', 'error', 'critical'],
                        help='Set the logging level (default: info)')
    parser.add_argument("--debug", "-d", action='store_true', help="Enable development mode in webview.")
    
    args = parser.parse_args()

    numeric_log_level = get_numeric_log_level(args.log_level)
    log_filename = 'plagiator.log' if numeric_log_level == logging.DEBUG else None
    logging.basicConfig(format='%(asctime)s[%(levelname)s]: %(message)s',
                        filename=log_filename,
                        level=numeric_log_level,
                        datefmt='%Y-%m-%d %H:%M:%S',
                        filemode='w')

    database_thread = threading.Thread(target=dbm.init)

    if args.nogui:
        logging.info("CLI mode")
    else:
        database_thread.start()
        if args.gui == 'web':
            logging.info("Web mode")
            useDebug = True if numeric_log_level == logging.DEBUG else args.debug
            WebviewUI.init(debug=useDebug)
        else:
            logging.info("Legacy mode")
            logging.warning("Running in legacy mode is highly discouraged. If you enabled this by accident, quit the "
                            "execution and restart without the '--gui legacy' flag. If you did this on purpose: Maybe "
                            "take a step back and see where your life is heading. Maybe something is seriously wrong "
                            "with you. I don't know, I'm just a silly programm. But still. Just making sure buddy.")
            LegacyUI().run()
        database_thread.join()
    logging.info("Programm terminated\n")
