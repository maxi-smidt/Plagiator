import logging
import argparse
import threading
import sqlite3
import subprocess
import os
from app.webviewUI import WebviewUI
from app.legacyUI import LegacyUI
from database import ddl


#  TODO: change
DEFAULT_LOG_LEVEL = logging.DEBUG


def init_database():
    db_path = 'database/.plagiator.db'
    conn = sqlite3.connect(db_path)
    if os.name == 'nt':  # Check if the operating system is Windows
        subprocess.call(['attrib', '+H', db_path])
    cur = conn.cursor()
    cur.execute(ddl.CREATE_TABLE_FILE)
    cur.execute(ddl.CREATE_TABLE_COMPARISON)
    cur.close()
    conn.commit()
    conn.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Plagiator")
    parser.add_argument("--nogui", "-c",  action="store_true", help="Only use the commandline interface.")
    parser.add_argument("--gui", choices=['web', 'legacy'], nargs="?", const='web', default='web',
                        help="Choose whether to use the modern useful and nice GUI or the legacy old and useless "
                             "tkinter GUI. Will be ignored if --nogui is present") #? -> zero or one argument/1 -> one argument
    parser.add_argument('--log-level', dest='log_level', nargs="?", default=DEFAULT_LOG_LEVEL,
                        choices=['debug', 'info', 'warning', 'error', 'critical'],
                        help='Set the logging level (default: info)')
    parser.add_argument("--debug", "-d", action='store_true', help="Enable development mode in webview.")
    
    args = parser.parse_args()

    numeric_log_level = DEFAULT_LOG_LEVEL
    try:
        numeric_log_level = getattr(logging, args.log_level, None)
        if not isinstance(numeric_log_level, int):
            raise ValueError('Invalid log level: %s' % args.loglevel)
    except:
        logging.basicConfig(format='%(asctime)s[%(levelname)s]: %(message)s',
                        filename='plagiator.log',
                        level=numeric_log_level,
                        datefmt='%Y-%m-%d %H:%M:%S',
                        filemode='w')

    database_thread = threading.Thread(target=init_database)

    if args.nogui:
        logging.info("CLI mode")
    else:
        database_thread.start()
        if args.gui == 'web':
            logging.info("Web mode")
            useDebug = args.debug
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
