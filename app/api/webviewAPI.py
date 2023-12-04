import webview
from ..plagiatscan.scan import computeComparison


class API:
    def toggle_fullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def health(self):
        print("Application works!")

    def compute_comparison(self, fileL, fileR):
        print("File One")
        print(fileL)
        print("File Two")
        print(fileR)
        return computeComparison(fileL, fileR)

