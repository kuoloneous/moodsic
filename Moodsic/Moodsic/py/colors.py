import my_vars
from imagga.color import ColorAPIClient
import math

class Color:
	def __init__(self, r, g, b, p):
		self.red = r
		self.green = g
		self.blue = b
		self.red_quadrant = (self.red/128)
		self.green_quadrant = (self.green/128)
		self.blue_quadrant = (self.blue/128)
		self.brightness = (self.red+self.blue+self.green)/77
		self.percentage = float(p)


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
			colorsForImage.append(Color(red, green, blue, percentage))
		myColors.append(colorsForImage)

	return myColors


class Mood:
	def __init__(self, dramatic,calming,epic,reflective,angry,rebellious,aggressive,light,brightness):
		self.dramatic = dramatic
		self.calming = calming
		self.epic = epic
		self.reflective = reflective
		self.angry = angry
		self.rebellious = rebellious
		self.aggressive = aggressive
		self.light = light
		self.brightness = brightness

	def query_string(self):
		q = []

		if self.dramatic > 0:
			q.append("mood=dramatic^"+str(self.dramatic))
		if self.calming > 0:
			q.append("mood=calming^"+str(self.calming))
		if self.epic > 0:
			q.append("mood=epic^"+str(self.epic))
		if self.reflective > 0:
			q.append("mood=reflective^"+str(self.reflective))
		if self.angry > 0:
			q.append("mood=angry^"+str(self.angry))
		if self.rebellious > 0:
			q.append("mood=rebellious^"+str(self.rebellious))
		if self.aggressive > 0:
			q.append("mood=aggressive^"+str(self.aggressive))
		if self.light > 0:
			q.append("mood=light^"+str(self.light))

		min_tempo = ""
		max_tempo = ""
		if self.brightness <= 4:
			min_tempo = "60"
			max_tempo = str(int(math.floor(180 - ((4-self.brightness) * 20))))
		else :
			min_tempo = str(int(math.floor(((self.brightness - 4) * 10) + 60)))
			max_tempo = "180"

		q.append("min_tempo="+min_tempo)
		q.append("max_tempo="+max_tempo)

		return "&".join(q)


def get_mood_info_from_colors(colors):
	dramatic  = 0
	calming = 0
	epic = 0
	reflective = 0
	angry = 0
	rebellious = 0
	aggressive = 0
	light = 0
	brightness = 0

	for image in colors: #for an image in colors
		for color in image: #for a color in that image do ...
			if color.red_quadrant == 0 and color.green_quadrant == 0 and color.blue_quadrant == 0 :
				dramatic += color.percentage / (len(colors)*100)
			elif color.red_quadrant == 0 and color.green_quadrant == 0 and color.blue_quadrant == 1 :
				calming += color.percentage / (len(colors)*100)
			elif color.red_quadrant == 0 and color.green_quadrant == 1 and color.blue_quadrant == 0 :
				epic += color.percentage / (len(colors)*100)
			elif color.red_quadrant == 0 and color.green_quadrant == 1 and color.blue_quadrant == 1 :
				reflective += color.percentage / (len(colors)*100)
			elif color.red_quadrant == 1 and color.green_quadrant == 0 and color.blue_quadrant == 0 :
				angry += color.percentage / (len(colors)*100)
			elif color.red_quadrant == 1 and color.green_quadrant == 0 and color.blue_quadrant == 1 :
				rebellious += color.percentage / (len(colors)*100)
			elif color.red_quadrant == 1 and color.green_quadrant == 1 and color.blue_quadrant == 0 :
				aggressive += color.percentage / (len(colors)*100)
			else:
				light += color.percentage / (len(colors)*100)
			brightness += color.brightness
		brightness = brightness / (len(image))

	brightness = brightness / len(colors)

	mood = Mood(dramatic,calming,epic,reflective,angry,rebellious,aggressive,light,brightness)

	return mood
