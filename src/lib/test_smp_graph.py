import tkinter as tk
import tkinter.filedialog
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk


class Application(tk.Frame):
	def __init__(self, master=None):
		super().__init__(master)
		self.master: tk.Tk = master
		self.master.title("tttest")
		self.pack()

		self.fig = plt.Figure()
		self.org_data = [[0, 1, 2], [0, 5, 0]]
		self.ax = self.fig.add_subplot()
		self.ax.plot(self.org_data[0], self.org_data[1])

		self.create_widgets()

	def create_widgets(self):
		# --------
		self.select_component = tk.Frame(self.master)
		self.select_component.pack(side=tk.TOP, padx=10, pady=10)

		self.select_button = tk.Button(self.select_component, text="Select", command=lambda: self.on_select_data(self.select_entry))
		self.select_button.pack(side=tk.LEFT, padx=10)

		self.select_entry = tk.Entry(self.select_component, width=100)
		self.select_entry.pack(side=tk.LEFT)

		# --------
		self.graph_component = tk.Frame(self.master)
		self.graph_component.pack(side=tk.LEFT, padx=10, pady=10)

		self.canvas = FigureCanvasTkAgg(self.fig, self.graph_component)
		self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=True)

		self.toolbar = NavigationToolbar2Tk(self.canvas, self.graph_component)
		self.canvas.get_tk_widget().pack(side=tk.TOP)

	def on_select_data(self, entry: tk.Entry):
		file_path = tkinter.filedialog.askopenfilename()
		lst = pd.read_csv(file_path, header=None).values.tolist()
		lst_t = np.array(lst).T.tolist()
		# print(lst_t)
		# print(file_path)
		entry.delete(0, tk.END)
		entry.insert(tk.END, file_path)


def quit_me(root_window: tk.Tk):
	root_window.quit()
	root_window.destroy()


if __name__ == "__main__":
	root = tk.Tk()
	root.protocol("WM_DELETE_WINDOW", lambda: quit_me(root))
	app = Application(master=root)
	app.mainloop()
