import colors

myUrls = ["http://www.colorhexa.com/ff00ff.png"]

myColors = colors.get_color_info_from_urls(myUrls)

# myColors[0] corresponds to the list of colors found in image 0
# myColors[0][0] corresponds to the most prominent color in image 0

myMood = colors.get_mood_info_from_colors(myColors)

#myMood holds all moods 
#myMood['dramatic'] holds the value for dramatic^value

print myColors[0][0].red_quadrant

print myMood.dramatic

print myMood.query_string()