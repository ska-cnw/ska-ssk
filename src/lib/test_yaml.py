import yaml

with open("test_data.yaml") as yml:
	config = yaml.safe_load(yml)
	# print(config['settings'][0])
	# print(type(config['settings'][0]))

# print(config['settings'][0]['config']['checked'])
# cons = config['settings']
# for c in cons:
# 	print(c['config'])

# print(config)
# settings:
# - config:
#     checked: true
#     color: blue
#     number: 1
# - config:
#     checked: false
#     color: red
#     number: 2
# - config:
#     checked: true
#     color: yellow
#     number: 3

with open("test_data2.yml", "w") as yml:
	yaml.dump(config, yml, default_flow_style=False)
