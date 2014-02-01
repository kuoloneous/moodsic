function hereAreSongIds(ids) {

		var song_one_href = "";
		var song_two_href = "";
		var song_three_href = "";

		alert("Got to here!");

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

		$('#playerView').append("<iframe src=\"https://embed.spotify.com/?uri=spotify:trackset:Moodsic:"+song_one_href+","+song_two_href+","+song_three_href+"\" frameborder=\"0\" width=\"640\" height=\"720\" allowtransparency=\"true\"></iframe>");

		$("#homeView").hide(function() {
			});
    	$("#loadingView").hide(function() {
			});
    	$("#playerView").show();
		
	}