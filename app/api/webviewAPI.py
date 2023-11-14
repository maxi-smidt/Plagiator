import webview
from ..plagiatscan.scan import computeComparison


class API:
    def toggleFullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def health(self):
        print("Application works!")

    def computeComparison(self, fileL, fileR):
        print("File One")
        print(fileL)
        return computeComparison(fileL, fileR)

