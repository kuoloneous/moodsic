var myHrefs = [];

function parseQueryResults( data ) {

	var myJSON = $.xml2json(data);
	console.log(myJSON);
	
	var track = "";

	var track_href = myJSON.track[0].href;

	console.log(track_href);

	myHrefs.push(track_href);
}

function checkHrefs(myHrefs){
	if(myHrefs.length > 2){
		hereAreSongIds(myHrefs);
		$("#homeView").hide(function() {
			});
    	$("#loadingView").hide(function() {
			});
    	$("#playerView").show();
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