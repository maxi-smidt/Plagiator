import webview
from app.api.webview_api import Api


if __name__ == '__main__':
    api = Api()
    webview.create_window('Plagiator', 'web/dist/index.html', js_api=api, min_size=(600, 450), frameless=False)
    webview.start(debug=True)