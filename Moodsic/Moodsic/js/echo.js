function parseEchoResults( data ) {

	var myJSON = $.xml2json(data);
	console.log(myJSON);

	i = 0;
	num_songs = 0;

	while (num_songs < 3 && i < (myJSON.songs.song.length)) {
		q = myJSON.songs.song[i].artist_name+" "+myJSON.songs.song[i].title;
		console.log("num songs is ..."+num_songs+" and q = "+q);
		if (num_songs == 0) {

			song_one_query = q;

			num_songs++;

		} else if (num_songs == 1) {
			if ((q != song_one_query) || (i == (myJSON.songs.song.length-2) )) {

				song_two_query = q;
				num_songs++;

			} 
		} else {
			if (((q != song_one_query) && (q != song_two_query)) || (i == (myJSON.songs.song.length-1) )) {

				song_three_query = q;
				num_songs++;

			} 

		}
		i++;
	}
 	

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