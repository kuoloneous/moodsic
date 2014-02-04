var mood = "Moodsic";
var loaded = false;
function hereAreSongIds(ids) {

		var song_one_href = "";
		var song_two_href = "";
		var song_three_href = "";

		$.each(ids, function (index, value) {

			if (index == 1) {
				// split value
				// get [2]
				parts = value.split(":");
				song_one_href = parts[2];

			} else if (index == 2) {

				parts = value.split(":");
				song_two_href = parts[2];

			} else {

				parts = value.split(":");
				song_three_href = parts[2];

			}

		});

		$('#playerView').append("<iframe id='spotifyPlayer' src=\"https://embed.spotify.com/?uri=spotify:trackset:"+mood+":"+song_one_href+","+song_two_href+","+song_three_href+"\" frameborder=\"0\" height='560' width='480' allowtransparency=\"true\"></iframe>");

		$("#homeView").hide(function() {
			});
    	$("#loadingView").hide(function() {
			});

    	$("#playerView").show();
    	loaded = true;
  	
		
	}

function setMood(passedMood) {

	mood = "You are listening to a "+passedMood+" playlist.";

}

