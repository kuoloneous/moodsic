
$(document).ready(function () {



	var selectedImages = new Array();
	var thumbnailCount= 0;
	//Data aggregated from Flickr for 64 images
	var flickrUrlList = new Array(); //title, ownername, url


    $('#playerView').click(function (event) {
            $('#playerView').append("<iframe src=\"https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT,4bi73jCM02fMpkI11Lqmfe\" frameborder=\"0\" width=\"640\" height=\"720\" allowtransparency=\"true\"></iframe>");
    });

	init();

	//getSongsFromQuery("Linkin Park New Divide");
	//getColorInfoFromUrls(["http://farm3.staticflickr.com/2607/4094219225_fff6b1603d_b.jpg", "http://farm8.staticflickr.com/7348/12227966384_c557261b47_b.jpg", "http://farm8.staticflickr.com/7371/12149581744_da519279da_b.jpg"]);

	//getSongsFromQuery("Linkin Park Numb");

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

		$('#playerView').append("<iframe src=\"https://embed.spotify.com/?uri=spotify:trackset:Moodsic:"+song_one_href+","+song_two_href+","+song_three_href+"\" frameborder=\"0\" width=\"640\" height=\"720\" allowtransparency=\"true\"></iframe>");

		$("#homeView").hide(function() {
			});
    	$("#loadingView").hide(function() {
			});
    	$("#playerView").show();

    	$("#loadingImage1").hide();
    	$("#loadingImage2").hide();
    	$("#loadingImage3").hide();

    	//Remove the images from 
		
	}

	function init(){
		//Initialize Photos
		getRandomFlickrPhotos();
		loadImagesObjects();
		loadImagesObjects();
		loadImagesObjects();

		//Initialize Views
		$("loadingView").hide();
		$("playerView").hide();

		$("#scrollViewButton").click(function(event){
		    	$("#loadingView").hide(function() {
					});
		    	$("#playerView").hide(function() {
					});
		    	$("#homeView").show();
		});
		$("#loadingViewButton").click(function(event){ 
		    	$("#homeView").hide(function() {
					});
		    	$("#playerView").hide(function() {
					});
		    	$("#loadingView").show();
		});
		$("#playerViewButton").click(function(event){ 
		    	$("#homeView").hide(function() {
					});
		    	$("#loadingView").hide(function() {
					});
		    	$("#playerView").show();
		});
	    $('#backButton').click(function (event) {
	            $("#loadingView").hide(function() {
	                });
	            $("#playerView").hide(function() {
	                });
	            $("#homeView").show();
	    });

		//load scroller
		$("#scrollView").smoothDivScroll({
    	    autoScrollingMode: "",
    	    hotSpotScrolling: false,
    	    touchScrolling: true,
    	        
    	    startAtElementId: "image1",
    	    scrollToAnimationDuration: 2000,
    	    scrollToEasingFunction: "easeOutBounce",
    	        
    	    mousewheelScrollingStep: 1,
    	    mousewheelScrolling: "horizontal",
    	    easingAfterMouseWheelScrolling: true,
    	    easingAfterMouseWheelScrollingFunction: "easeOutQuad",
    	    easingAfterMouseWheelScrollingDuration: 500,
	    });
	    
	    $("#scrollView").smoothDivScroll("scrollToElement", "first");

	 	//$("#scrollableArea").css("width", 100*(thumbnailCount/8 + 1) + "%" );

	    $('.thumbnailView').click(function (event) {

	     if( $(this).data('clicked') == false || $(this).data('clicked') == null){
		     $(this).data('clicked', true);
		     $(this).css("border", "10px solid black").css("box-sizing", "border-box");
		     addImage($(this).data('url'));
	     } else {
	     	console.log($(this).data('clicked'));	
		     $(this).data('clicked', false);
		     $(this).css("border", "0px").css("box-sizing", "border-box");
		     removeImage($(this).data('url'));
		   	
	   
	     }
	    
	 	});

	}
	function addImage(image_url){
		selectedImages.push( image_url);
		//Check for three images
		if (selectedImages.length == 3){
			console.log("test");
			//If three images change view
	    	$("#homeView").hide(function() {
				});
	    	$("#playerView").hide(function() {
				});
	    	$("#loadingView").show();
	    	//Start analyzing
	    	getColorInfoFromUrls(selectedImages);
	    	$("#loadingImage1").hide();
	    	$("#loadingImage2").hide();
	    	$("#loadingImage3").hide();
	    	$("#loadingImage1").append("<img src='" + selectedImages[0] + "' class='loadingImage' />");
	    	$("#loadingImage2").append("<img src='" + selectedImages[1] + "' class='loadingImage' />");
	    	$("#loadingImage3").append("<img src='" + selectedImages[2] + "' class='loadingImage' />");

	    	//$("#loadingImage1").css("background", "url(" + selectedImages[0] + ") no-repeat center center fixed");
	    	//$("#loadingImage2").css("background", "url(" + selectedImages[1] + ") no-repeat center center fixed");
	    	//$("#loadingImage3").css("background", "url(" + selectedImages[2] + ") no-repeat center center fixed");

	    	cycleBackgrounds();



		}

	}
	var fadeTime = 4000;
	function cycleBackgrounds(){

		$("#loadingImage1").fadeIn(4000, function() {
			//$("#loadingImage3").hide();
			$("#loadingImage1").fadeOut(4000, function() {
				$("#loadingImage2").fadeIn(4000, function() {
					//$("#loadingImage3").hide();
					$("#loadingImage2").fadeOut(4000, function() {
						$("#loadingImage3").fadeIn(4000, function() {
							//$("#loadingImage3").hide();
							$("#loadingImage3").fadeOut(4000, function() {
								cycleBackgrounds();			
							});	
						});
					});
				});
			});
		});
	}


	function removeImage(image_url){
		for(var i = 0; i < selectedImages.length; i++){
			if(selectedImages[i] == image_url){
				selectedImages = selectedImages.splice(i, 1);
			}
		}
	}
	function loadImagesObjects() {
    	//and div to scroll view and then 
    	var upper = thumbnailCount + 8;
    	var newPage = $("<div class='thumbPage' id ='" + thumbnailCount/8 + "'>");
    	for(var i = thumbnailCount; i < upper; i++){
    		
    		var newImage = $("<div class='thumbnailView' id='image" + i + "'  style='background-image:url(" + flickrUrlList[i].url + ")'>");
    		//var newImage = $("<div class='thumbnailView' id='image" + i + "' url='test' style='background: red; box-shadow:inset 0 0 50px 5px #000000;'>");
    		newImage.data('url', flickrUrlList[i].url);
    		newPage.append(newImage);
    		thumbnailCount++;
    		//$("#scrollView").append(newImage);
    		//w8 $("#scrollView").append(toStaticHTML(newImage));
    	}

    	$("#scrollView").append(newPage);
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
    

    /*
     $('.thumbnailView').click(function (event) {
     if( $(this).data('clicked') == false || $(this).data('clicked') == null){
     $(this).data('clicked', true);
     $(this).css("border", "10px solid black").css("box-sizing", "border-box");
     } else {
     $(this).data('clicked', false);
     $(this).css("border", "0px").css("box-sizing", "border-box");
     //remove image from pressed
     }
     
     if ($('.imgSelected').length == 2) {
     
     $(this).addClass("imgSelected");
     
     selected_urls = [];
     
     $(".imgSelected").each(function(obj) {
     
     selected_urls.push($(this).attr("url"));
     
     });
     
     // Now I have all three urls.... What to do?
     console.log(selected_urls);
     } else {
     $(this).addClass("imgSelected");
     }
     */

});



