try:  # TODO is it really possible that tkinter doesnt exist ?
    import tkinter as tk
    from tkinter import filedialog
except ImportError:
    TK_FLAG = False
else:
    TK_FLAG = True

import logging
import json
from .scanner.moss_scanner import MossScanner


class LegacyUI:
    def __init__(self):
        if not TK_FLAG:
            logging.critical("Unable to import tkinter, likely because python was installed without tkinter.")
            return
        self.path_file_1 = ''
        self.path_file_2 = ''
        self.file_1 = None
        self.file_2 = None
        self.result = None
        self.__init_ui()

    def __init_ui(self):
        self.root = tk.Tk()
        self.root.title("Plagiator (legacy)")

        self.btn_file_1 = tk.Button(self.root, text="Select File 1", command=self.__browse_file1)
        self.btn_file_1.grid(row=0, column=0, padx=5, pady=5)

        self.lbl_text_1 = tk.Label(self.root, text="File 1 Content:")
        self.lbl_text_1.grid(row=1, column=0, padx=5, pady=5)

        self.wgt_text_1 = tk.Text(self.root, height=40, width=80)
        self.wgt_text_1.config(state=tk.DISABLED)
        self.wgt_text_1.grid(row=2, column=0, padx=5, pady=5)

        self.btn_file_2 = tk.Button(self.root, text="Select File 2", command=self.__browse_file2)
        self.btn_file_2.grid(row=0, column=1, padx=5, pady=5)

        self.lbl_text_2 = tk.Label(self.root, text="File 2 Content:")
        self.lbl_text_2.grid(row=1, column=1, padx=5, pady=5)

        self.wgt_text_2 = tk.Text(self.root, height=40, width=80)
        self.wgt_text_2.config(state=tk.DISABLED)
        self.wgt_text_2.grid(row=2, column=1, padx=5, pady=5)

        self.lbl_result = tk.Label(self.root, text="", fg="green")
        self.lbl_result.grid(row=3, column=0, columnspan=2, pady=5)

        self.process_button = tk.Button(self.root, text="Process Files", command=self.__compute_comparison)
        self.process_button.grid(row=4, column=0, columnspan=2, pady=5)

    def __display_result(self, text):
        self.lbl_result.config(text=text)

    def __browse_file1(self):
        self.path_file_1 = filedialog.askopenfilename(filetypes=[("Matlab", "*.m")])
        self.lbl_text_1.config(text=f"File: {self.path_file_1.split('/')[-1]}")
        self.file_1 = self.__read_file(self.path_file_1, self.wgt_text_1)

    def __browse_file2(self):
        self.path_file_2 = filedialog.askopenfilename(filetypes=[("Matlab", "*.m")])
        self.lbl_text_2.config(text=f"File: {self.path_file_2.split('/')[-1]}")
        self.file_2 = self.__read_file(self.path_file_2, self.wgt_text_2)

    @staticmethod
    def __read_file(file_path, text_widget):
        try:
            with open(file_path, 'r') as file:
                content = file.read()
                text_widget.delete(1.0, tk.END)
                text_widget.config(state=tk.NORMAL)
                text_widget.insert(tk.END, content)
                text_widget.config(state=tk.DISABLED)
                return content
        except FileNotFoundError:
            text_widget.delete(1.0, tk.END)
            text_widget.insert(tk.END, "File not found!")

    def __compute_comparison(self):
        if self.file_1 is None or self.file_2 is None:
            self.lbl_result.config(text="You have to submit both files", fg="red")
        m = MossScanner()
        self.result = json.loads(m.compare([self.file_1, self.file_2]))
        print(self.result)
        self.lbl_result.config(text=f"Match: {self.result['data'][0]['match']}%")  # TODO decide what match to take

    def run(self):
        self.root.mainloop()
