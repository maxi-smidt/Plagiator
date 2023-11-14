import webview
from app.plagiatscan.plag_scan import computeComparison


class Api:
    def toggleFullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def health(self):
        print("Application works!")

    def computeComparison(self, fileL, fileR):
        print("File One")
        print(fileL)
        return computeComparison(fileL, fileR)

