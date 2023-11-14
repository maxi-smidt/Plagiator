import webview
from .api.webviewAPI import API



class WebviewUI():
    @staticmethod
    def init(debug=False):
        api = API()
        webview.create_window('Plagiator', './web/dist/index.html', js_api=api, min_size=(600, 450), frameless=False)
        webview.start(debug=debug)
