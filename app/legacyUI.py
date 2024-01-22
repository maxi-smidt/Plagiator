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
        self.file_1 = None
        self.file_2 = None
        self.__init_ui()

    def __init_ui(self):
        self.root = tk.Tk()
        self.root.title("Plagiator (legacy)")

        # Left file
        self.btn_file_1 = tk.Button(self.root, text="Select File 1", command=self.__browse_file1)
        self.btn_file_1.grid(row=0, column=0, padx=5, pady=5)

        self.lbl_text_1 = tk.Label(self.root, text="File 1 Content:")
        self.lbl_text_1.grid(row=1, column=0, padx=5, pady=5)

        self.wgt_text_1 = tk.Text(self.root, height=40, width=80)
        self.wgt_text_1.config(state=tk.DISABLED)
        self.wgt_text_1.grid(row=2, column=0, padx=5, pady=5)

        self.lbl_result_1 = tk.Label(self.root)
        self.lbl_result_1.grid(row=3, column=0, pady=5)

        # Right file
        self.btn_file_2 = tk.Button(self.root, text="Select File 2", command=self.__browse_file2)
        self.btn_file_2.grid(row=0, column=1, padx=5, pady=5)

        self.lbl_text_2 = tk.Label(self.root, text="File 2 Content:")
        self.lbl_text_2.grid(row=1, column=1, padx=5, pady=5)

        self.wgt_text_2 = tk.Text(self.root, height=40, width=80)
        self.wgt_text_2.config(state=tk.DISABLED)
        self.wgt_text_2.grid(row=2, column=1, padx=5, pady=5)

        self.lbl_result_2 = tk.Label(self.root)
        self.lbl_result_2.grid(row=3, column=1, pady=5)

        self.lbl_info = tk.Label(self.root, text="", fg="green")
        self.lbl_info.grid(row=4, column=0, columnspan=2, pady=5)

        self.process_button = tk.Button(self.root, text="Process Files", command=self.__compute_comparison)
        self.process_button.grid(row=5, column=0, columnspan=2, pady=5)

    def __browse_file1(self):
        self.file_1 = self.__browse_file(self.lbl_text_1, self.wgt_text_1)

    def __browse_file2(self):
        self.file_2 = self.__browse_file(self.lbl_text_2, self.wgt_text_2)

    @staticmethod
    def __browse_file(label, widget):
        file_path = filedialog.askopenfilename(filetypes=[("Matlab", "*.m")])
        label.config(text=f"File: {file_path.split('/')[-1]}")
        return LegacyUI.__read_file(file_path, widget)

    @staticmethod
    def __read_file(file_path, text_widget):
        try:
            with open(file_path, 'r') as file:
                content = file.read()
                text_widget.config(state=tk.NORMAL)
                text_widget.delete(1.0, tk.END)
                text_widget.insert(tk.END, content)
                text_widget.config(state=tk.DISABLED)
                return content
        except FileNotFoundError:
            text_widget.delete(1.0, tk.END)
            text_widget.insert(tk.END, "File not found!")

    def __compute_comparison(self):
        if self.file_1 is None or self.file_2 is None:
            self.lbl_info.config(text="You have to submit both files", fg="red")
            return
        m = MossScanner()
        self.lbl_info.config(text="Loading ...")
        self.__evaluate_result(json.loads(m.compare([self.file_1, self.file_2])))

    def __evaluate_result(self, result):
        error = result['error']
        if error != '':
            self.__handle_error(error)
            return
        self.lbl_info.config(text='')
        self.__print_result_and_mark_lines(result['data'])

    def __print_result_and_mark_lines(self, data):
        self.__print_result_and_mark_lines_single(self.lbl_result_1, self.wgt_text_1, data[0])
        self.__print_result_and_mark_lines_single(self.lbl_result_2, self.wgt_text_2, data[1])

    @staticmethod
    def __print_result_and_mark_lines_single(label, widget, data):
        label.config(text=f"Match: {data['match']}%")
        widget.config(state=tk.NORMAL)
        widget.tag_config("red", foreground="red")
        for mh in data['match_history']:
            widget.tag_add("red", f"{int(mh['start'])}.0", f"{int(mh['end'])}.end")
        widget.config(state=tk.DISABLED)

    def __handle_error(self, error):
        self.lbl_info.config(text=error, fg="red")

    def run(self):
        self.root.mainloop()
