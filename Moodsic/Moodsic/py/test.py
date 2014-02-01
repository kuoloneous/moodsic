import colors

myUrls = ["http://miriadna.com/desctopwalls/images/max/Ideal-landscape.jpg"]

myColors = colors.get_color_info_from_urls(myUrls)

# myColors[0] corresponds to the list of colors found in image 0
# myColors[0][0] corresponds to the most prominent color in image 0

myMood = colors.get_mood_info_from_colors(myColors)

#myMood holds all moods 
#myMood['dramatic'] holds the value for dramatic^value

myQuery = colors.get_string_info_from_mood(myMood)

print myColors[0][0].red_quadrant

print myMood.dramatic

print myQuery.query