var myHrefs = [];

function parseQueryResults( data ) {

	var myJSON = $.xml2json(data);
	console.log(myJSON);
	
	if (myJSON.totalResults == 1) {
		var track_href = myJSON.track.href;

	} else if (myJSON.totalResults == 0) {
		var track_href = "spotify:track:0x6NRv1pZBsiu32w9sPAiX"

	} else {

		var track_href = myJSON.track[0].href;
	}

	console.log(track_href);

	myHrefs.push(track_href);
	checkHrefs();
}

function checkHrefs(){
	console.log("Checking hrefs");
	if(myHrefs.length > 2){
		console.log("Got enough hrefs");
		hereAreSongIds(myHrefs);
	}

}


function getSongsFromQuery(query) {

	  	
	myUrl = "http://www.devonmeyer.com/projects/spderp/one_more.php?q="+query;

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
}