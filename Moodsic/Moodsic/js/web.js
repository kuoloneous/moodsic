$(document).ready(function () {
    var pressedButtons;
	var imageObjects = [];

	//Data aggregated from Flickr for 64 images
	var flickrUrlList = new Array(); //title, ownername, url

	init();

    $('.thumbnailView').click(function (event) {
    	if( $(this).data('clicked') == false || $(this).data('clicked') == null){
	    	$(this).data('clicked', true);
	        $(this).css("border", "10px solid black").css("box-sizing", "border-box");
    	} else {
			$(this).data('clicked', false);
		    $(this).css("border", "0px").css("box-sizing", "border-box");
		    //remove image from pressed
    	}

    });
   


	function init(){

		getRandomFlickrPhotos();
		loadImagesObjects(imageObjects);

	}

    function loadImagesObjects(loadedImageObjects) {

		
	}

	function getRandomFlickrPhotos(){
		var flickr_url = 'http://api.flickr.com/services/rest/?&method=flickr.groups.pools.getPhotos&api_key=fab0b8729460ee819e440ee3fb03381a&group_id=364847@N20&extras=url_l&format=json&nojsoncallback=1&per_page=64&page=';
		

		flickr_url = flickr_url	+ Math.floor((Math.random()*392)+1); 
    	//$.getJSON(flickr_url, function(data){
		$.ajax({
			url: flickr_url,
			async:false,
			success: function(result){


				var photosList = result.photos.photo;

				for (var i = 0; i < photosList.length; i++){
					if(photosList[i].url_l != null &&
					photosList[i].title != null &&
					photosList[i].ownername != null){
						flickrUrlList.push({
							title: photosList[i].title,
							url: photosList[i].url_l,
							ownername: photosList[i].ownername,
						});
					}

				}
			}
		});

	}

});
