import my_vars
from imagga.color import ColorAPIClient

class Color:
	def __init__(self, r, g, b, p):
		self.red = r
		self.green = g
		self.blue = b
		self.red_quadrant = (self.red/128)
		self.green_quadrant = (self.green/128)
		self.blue_quadrant = (self.blue/128)
		self.brightness = (self.red+self.blue+self.green)/77
		self.percentage = p




def get_color_info_from_urls(urls):

	myClient = ColorAPIClient(api_key=my_vars.API_KEY, api_secret=my_vars.API_SECRET, endpoint=my_vars.API_ENDPOINT)

	"""

		Expecting a list of urls... Turning these into "URL Objects"

	"""

	urlList = []

	for url in urls:
		urlList.append({"url" : url})

	ret = myClient.colors_by_urls(urlList)

	myColors = []

	for image in ret['colors']:
		colorsForImage = []
		for color in image['info']['image_colors']:
			red = int(color['r'])
			blue = int(color['b'])
			green = int(color['g'])
			percentage = color['percent']
			colorsForImage.append(Color(red, blue, green, percentage))
		myColors.append(colorsForImage)

	return myColors
