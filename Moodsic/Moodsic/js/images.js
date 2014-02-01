var myColors = [];
var myQuery = "";

function Color(red, green, blue) {

	this.redValue = parseInt(red);
	this.greenValue = parseInt(green);
	this.blueValue = parseInt(blue);
	this.redScaled = Math.floor(red/115);
	this.greenScaled = Math.floor(green/115);
	this.blueScaled = Math.floor(blue/115);
	this.brightnessValue = this.redValue+this.greenValue+this.blueValue;
	this.brightnessScaled = Math.floor(this.brightnessValue/(77));
	this.isRed = function() {
		return this.redScaled > 0;
	};
	this.isGreen = function() {
		return this.greenScaled > 0;
	};
	this.isBlue = function() {
		return this.blueScaled > 0;
	};

}

function getMoodQuery() {

	q = [];

	if (this.dramatic > 0) {
		q.push("mood=dramatic^"+this.dramatic);
	} else if (this.calming > 0) {
		q.push("mood=calming^"+this.calming);
	} else if (this.epic > 0) {
		q.push("mood=epic^"+this.epic);
	} else if (this.reflective > 0) {
		q.push("mood=reflective^"+this.reflective);
	} else if (this.angry > 0) {
		q.push("mood=angry^"+this.angry);
	} else if (this.rebellious > 0) {
		q.push("mood=rebellious^"+this.rebellious);
	} else if (this.aggressive > 0) {
		q.push("mood=aggressive^"+this.aggressive);
	} else if (this.light > 0) {
		q.push("mood=light^"+this.light);
	}

	if (this.brightness <= 4) {

		min_tempo = "60";
		max_tempo = 180 - ((4-this.brightness) * 20);

	} else {

		min_tempo = 60 + (((this.brightness) - 4) * 10);
		max_tempo = "180";

	}

	q.push("min_tempo="+min_tempo);
	q.push("max_tempo="+max_tempo);

	return q.join("&");

}

function Mood(colors) {

	this.dramatic = 0;
	this.calming = 0;
	this.epic = 0;
	this.reflective = 0;
	this.angry = 0;
	this.rebellious = 0;
	this.aggressive = 0;
	this.light = 0;
	this.brightness = 0;

	myMood = this;

	$.each(colors, function( index, value ) {

		console.log(this);
		if (!value.isRed() && !value.isGreen() && !value.isBlue()) {
			// rgb = 000
			myMood.dramatic += 1;
		} else if (!value.isRed() && !value.isGreen() && value.isBlue()) {
			// rgb = 001
			myMood.calming += 1;
		} else if (!value.isRed() && value.isGreen() && !value.isBlue()) {
			// rgb = 010
			myMood.epic += 1;
		} else if (!value.isRed() && value.isGreen() && value.isBlue()) {
			// rgb = 011
			myMood.reflective += 1;
		} else if (value.isRed() && !value.isGreen() && !value.isBlue()) {
			// rgb = 100
			myMood.angry += 1;
		} else if (value.isRed() && !value.isGreen() && value.isBlue()) {
			// rgb = 101
			myMood.rebellious += 1;
		} else if (value.isRed() && value.isGreen() && !value.isBlue()) {
			// rgb = 110
			myMood.aggressive += 1;
		} else {
			// rgb = 111
			myMood.light += 1;
		}

		myMood.brightness += this.brightnessScaled;

	});

	myMood.brightness = myMood.brightness / colors.length;

	console.log(this);

	this.getQuery = getMoodQuery;

}

function parseColor( data ) {

	var myJSON = $.xml2json(data);
	console.log(myJSON);
	red = myJSON.variable[3].statistic[0].value;
	green = myJSON.variable[4].statistic[0].value;
	blue = myJSON.variable[5].statistic[0].value;
	console.log("red average : "+red);
	console.log("green average : "+green);
	console.log("blue average : "+blue);

	var myColor = new Color(red, green, blue);
	myColors.push(myColor);
	checkColorsReady();

}

function getColorInfoFromUrls(urls) {

	$.each(urls, function( index, value ) {
	  	
		myUrl = "http://www.devonmeyer.com/projects/spderp/please.php?url="+value;

		console.log(myUrl);

		$.ajax({
		    url: myUrl,
		 
		    // the name of the callback parameter, as specified by the YQL service
		    jsonp: "callback",
		 
		    // tell jQuery we're expecting JSONP
		    dataType: "jsonp",
		 
		    // work with the response
		    success: function (response) {

		    },

		});
	});
}

function checkColorsReady() {

	if (myColors.length == 3) {

		performColorQuery();

	}

}

function performColorQuery() {

	var myMood = new Mood(myColors);

	var moods = [];

	if (myMood.dramatic > 0) {

		if (myMood.dramatic > 1) {
			moods.push("very dramatic");
		} else {
			moods.push("dramatic");
		}

	} if (myMood.calming > 0) {

		if (myMood.calming > 1) {
			moods.push("very calming");
		} else {
			moods.push("calming");
		}

	} if (myMood.epic > 0) {

		if (myMood.epic > 1) {
			moods.push("very epic");
		} else {
			moods.push("epic");
		}

	} if (myMood.reflective > 0) {

		if (myMood.reflective > 1) {
			moods.push("very reflective");
		} else {
			moods.push("reflective");
		}

	} if (myMood.angry > 0) {

		if (myMood.angry > 1) {
			moods.push("very angry");
		} else {
			moods.push("angry");
		}

	} if (myMood.rebellious > 0) {

		if (myMood.rebellious > 1) {
			moods.push("very rebellious");
		} else {
			moods.push("rebellious");
		}

	} if (myMood.aggressive > 0) {

		if (myMood.aggressive > 1) {
			moods.push("very aggressive");
		} else {
			moods.push("aggressive");
		}

	} if (myMood.light > 0) {

		if (myMood.light > 1) {
			moods.push("very light");
		} else {
			moods.push("light");
		}

	} 

	setMood(moods.join(", "));

	getEchoListFromQueryString(myMood.getQuery());

}








