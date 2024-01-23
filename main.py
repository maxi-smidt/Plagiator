import logging
import argparse
import threading
import json
from app.webviewUI import WebviewUI
from app.legacyUI import LegacyUI
from database.database_manager import DatabaseManager as dbm
from app.scanner.moss_scanner import MossScanner

DEFAULT_LOG_LEVEL = logging.INFO
useDebug = False


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


def run_cli(file_1_path, file_2_path):
    file_1 = resolve_file(file_1_path)
    file_2 = resolve_file(file_2_path)
    result = json.loads(MossScanner().compare([file_1, file_2]))
    if result['error'] != '':
        print(f"Error: {result['error']}")
    else:
        print(f"Match first file: {result['data'][0]['match']}%, match second file: {result['data'][1]['match']}%")


def log(msg, severity):
    if not useDebug:
        return
    if severity == 'debug':
        logging.debug(msg)
    elif severity == 'info':
        logging.info(msg)
    elif severity == 'error':
        logging.error(msg)
    elif severity == 'warning':
        logging.warning(msg)


def resolve_file(path):
    try:
        with open(path, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: The file '{path}' does not exist.")
        log(f"Error: The file '{path}' does not exist.", 'error')
    except PermissionError:
        print(f"Error: No permission to open '{path}'")
        log(f"Error: No permission to open '{path}'", 'error')
    except TypeError:
        print(f"Error: No path provided")
        log(f"Error: No path provided", 'error')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Plagiator")
    parser.add_argument("--nogui", "-c",  action="store_true", help="Only use the commandline interface.")
    parser.add_argument("--gui", choices=['web', 'legacy'], nargs="?", const='web', default='web',
                        help="Choose whether to use the modern useful and nice GUI or the legacy old and useless "
                             "tkinter GUI. Will be ignored if --nogui is present")
    parser.add_argument('--loglevel', dest='log_level', nargs="?", default=DEFAULT_LOG_LEVEL,
                        choices=['debug', 'info', 'warning', 'error', 'critical'],
                        help='Set the logging level (default: info)')
    parser.add_argument("--debug", "-d", action='store_true', help="Enable development mode in webview.")
    parser.add_argument("file1", type=str, help="Path to the first file.")
    parser.add_argument("file2", type=str, help="Path to the second file.")

    args = parser.parse_args()

    numeric_log_level = get_numeric_log_level(args.log_level)
    log_filename = 'plagiator.log' if numeric_log_level == logging.DEBUG or args.debug else None
    logging.basicConfig(format='%(asctime)s[%(levelname)s]: %(message)s',
                        filename=log_filename,
                        level=numeric_log_level,
                        datefmt='%Y-%m-%d %H:%M:%S',
                        filemode='w')

    database_thread = threading.Thread(target=dbm.init)
    useDebug = True if numeric_log_level == logging.DEBUG else args.debug

    if args.nogui:
        log("CLI mode", 'info')
        run_cli(args.file1, args.file2)
    else:
        database_thread.start()
        if args.gui == 'web':
            log("Web mode", 'info')
            WebviewUI.init(debug=useDebug)
        else:
            log("Legacy mode", 'info')
            log("Running in legacy mode is highly discouraged. If you enabled this by accident, quit the "
                "execution and restart without the '--gui legacy' flag. If you did this on purpose: Maybe "
                "take a step back and see where your life is heading. Maybe something is seriously wrong "
                "with you. I don't know, I'm just a silly programm. But still. Just making sure buddy.", 'warning')
            LegacyUI().run()
        database_thread.join()
    log("Programm terminated", 'info')
