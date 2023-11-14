import tkinter as tk
from tkinter import filedialog


class LegacyUI:
    def read_file(file_path, text_widget):
        try:
            with open(file_path, 'r') as file:
                content = file.read()
                text_widget.delete(1.0, tk.END)  # Clear previous content
                text_widget.insert(tk.END, content)  # Display file content
        except FileNotFoundError:
            text_widget.delete(1.0, tk.END)  # Clear previous content
            text_widget.insert(tk.END, "File not found!")
    def display_result():
        result_label.config(text="Processing...")
    
    
    def browse_file1():
        global file1_path
        file1_path = filedialog.askopenfilename(filetypes=[("Matlab", "*.m")])
        #file1_label.config(text="File 1: " + file1_path)
        
    def browse_file2():
        global file2_path
        file2_path = filedialog.askopenfilename(filetypes=[("Matlab", "*.m")])
        #file2_label.config(text="File 2: " + file2_path)
    
    @staticmethod
    def run():    
        root = tk.Tk()
        root.title("Plagiator (legacy)")
    # Create File Select Buttons
        global file1_path
        global file2_path

        browse_file1 = ""
        browse_file2 = ""
        display_result = ""
        file1_button = tk.Button(root, text="Select File 1", command=browse_file1)
        file1_button.pack()

        file2_button = tk.Button(root, text="Select File 2", command=browse_file2)
        file2_button.pack()

        # Create Text Windows
        text1_label = tk.Label(root, text="File 1 Content:")
        text1_label.pack()

        text1_widget = tk.Text(root, height=10, width=40)
        text1_widget.pack()

        text2_label = tk.Label(root, text="File 2 Content:")
        text2_label.pack()

        text2_widget = tk.Text(root, height=10, width=40)
        text2_widget.pack()

        # Create Result Banner
        result_label = tk.Label(root, text="", fg="green")
        result_label.pack()

        # Create a button to trigger processing
        process_button = tk.Button(root, text="Process Files", command=display_result)
        process_button.pack()

        # Start the Tkinter main loop
        root.mainloop()


