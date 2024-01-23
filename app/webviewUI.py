import os
import webview
from .api.webviewAPI import API


class WebviewUI:

    @staticmethod
    def init(debug):
        api = API(debug)

        window = webview.create_window('Plagiator',
                                       './web/dist/index.html',
                                       js_api=api,
                                       hidden=True,
                                       min_size=(1000, 600),
                                       background_color='#21252B',
                                       transparent=False,
                                       draggable=True,
                                       frameless=True)

        with open(os.path.join(os.path.dirname(__file__), './loading_screen/loading_screen.html'), 'r') as html:
            loading_html = html.read()

        loading = webview.create_window('PlagiatorLoading',
                                        html=loading_html,
                                        min_size=(1000, 600),
                                        background_color='#21252B',
                                        transparent=False,
                                        on_top=True,
                                        frameless=True,
                                        easy_drag=False
                                        )
        api.set_window(window)
        api.set_loading_window(loading)
        webview.start(api.load_web, debug=debug)
