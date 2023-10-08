import os
import webview

"""
An example of serverless app architecture
"""


class Api:
    def toggleFullscreen(self):
        webview.windows[0].toggle_fullscreen()


if __name__ == '__main__':
    api = Api()
    webview.create_window('Plagiator', 'web/dist/index.html', js_api=api, min_size=(600, 450), frameless=False)
    webview.start()