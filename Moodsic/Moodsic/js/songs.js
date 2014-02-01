function parseQueryResults( data ) {

	var myJSON = $.xml2json(data);
	console.log(myJSON);
	
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