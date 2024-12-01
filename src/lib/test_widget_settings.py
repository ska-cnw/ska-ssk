from functools import partial
import tkinter as tk
import yaml


class Appliction(tk.Frame):

	def __init__(self, master=None):
		super().__init__(master)
		self.master: tk.Tk = master
		self.master.title("ttest")
		self.create_widgets()

	def create_widgets(self):
		self.frame = tk.Frame(self.master)
		self.frame.pack()

		self.data_num = 3
		self.path_settings = "test_widget_settings.yml"

		with open(self.path_settings) as yml:
			self.yml_data = yaml.safe_load(yml)

		self.is_checked: list[tk.BooleanVar] = []
		self.checkbutton: list[tk.Checkbutton] = []

		settings = self.yml_data["settings"]
		for i in range(self.data_num):
			self.is_checked.append(tk.BooleanVar())
			self.checkbutton.append(
				tk.Checkbutton(
					self.frame,
					text="No." + str(i+1),
					variable=self.is_checked[i],
					command=partial(self.on_checkbutton_click, i)
				)
			)
			self.is_checked[i].set(settings[i]["checked"])
			self.checkbutton[i].pack()

	def on_checkbutton_click(self, num):
		self.yml_data["settings"][num]["checked"] = self.is_checked[num].get()
		with open(self.path_settings, "w") as yml:
			yaml.dump(self.yml_data, yml, default_flow_style=False)


def quit_me(root_window: tk.Tk):
	root_window.quit()
	root_window.destroy()

if __name__ == "__main__":
	root = tk.Tk()
	root.geometry("200x200+100+100")
	root.protocol("WM_DELETE_WINDOW", lambda: quit_me(root))
	app = Appliction(master=root)
	app.mainloop()
