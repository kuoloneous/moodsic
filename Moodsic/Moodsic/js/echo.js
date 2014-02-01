function parseEchoResults( data ) {

	var myJSON = $.xml2json(data);
	console.log(myJSON);

	song_one_query = myJSON.songs.song[0].artist_name+" "+myJSON.songs.song[0].title;
	song_two_query = myJSON.songs.song[1].artist_name+" "+myJSON.songs.song[1].title;
	song_three_query = myJSON.songs.song[2].artist_name+" "+myJSON.songs.song[2].title;


	console.log(song_one_query);
	console.log(song_two_query);
	console.log(song_three_query);

	getSongsFromQuery(song_one_query);
	getSongsFromQuery(song_two_query);
	getSongsFromQuery(song_three_query);
	
}


function getEchoListFromQueryString(query) {
	  	
	myUrl = "http://www.devonmeyer.com/projects/spderp/echo.php?"+query;

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