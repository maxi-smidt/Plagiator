#import webview
import argparse
from app.webviewUI import WebviewUI
from app.legacyUI import LegacyUI

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Plagiator")
    parser.add_argument("--nogui", "-c",  action="store_true", help="Only use the commandline interface.")
    parser.add_argument("--gui", choices=['web', 'legacy'], nargs="?", const='web', default='web', help="Choose whether to use the modern useful and nice GUI or the legacy old and useless tkinter GUI. Will be ignored if --nogui is present")
    parser.add_argument("--debug", "-d", action='store_true', help="Enable development mode in webview.")
    args = parser.parse_args()
    if args.nogui:
        print("[INFO]: CLI mode")
    else:
        if args.gui == 'web':
            useDebug = args.debug
            WebviewUI.init(debug=useDebug)
        else:
            print("[Warning]: Running in legacy mode is highly discouraged. If you enabled this by accident, quit the execution and restart without the '--gui legacy' flag. If you did this on purpose: Maybe take a step back and see where your life is heading. Maybe something is seriously wrong with you. I don't know, I'm just a silly programm. But still. Just making sure buddy.")
            LegacyUI.run()
    