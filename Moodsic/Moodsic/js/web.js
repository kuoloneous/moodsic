
$(document).ready(function () {



	var selectedImages = new Array();
	var thumbnailCount= 0;
	var flickrUrlList = new Array(); //title, ownername, url



	init();
	playerViewCycleBackgrounds(0);
	//functions
	//loadScrollView
	//LoadingView
	//Load

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

		$('#playerBG').mousemove(function( event ) {
			if($('#playerBGInfo').css("display") == 'none'){
				$('#playerBGInfo').show(1500);	
			}
			
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
	    


	 	//Check for click drag
	 	clickedThumbnailListener();

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
	    	$("#loadingImage1").css("background", "url(" + selectedImages[0] + ") no-repeat center center fixed" ).css("background-size", "cover");
	    	$("#loadingImage2").css("background", "url(" + selectedImages[1] + ") no-repeat center center fixed" ).css("background-size", "cover");
	    	$("#loadingImage3").css("background", "url(" + selectedImages[2] + ") no-repeat center center fixed" ).css("background-size", "cover");

	    	//$("#loadingImage1").css("background", "url(" + selectedImages[0] + ") no-repeat center center fixed");
	    	//$("#loadingImage2").css("background", "url(" + selectedImages[1] + ") no-repeat center center fixed");
	    	//$("#loadingImage3").css("background", "url(" + selectedImages[2] + ") no-repeat center center fixed");

	    	cycleBackgrounds();



		}

	}
	function clickedThumbnailListener(){
		var dragged = false
		var timeout;
		$('.scrollableArea').mousedown(function(){
			timeout = setTimeout(function() {
				dragged = true;
			}, 100);
		}).mouseup(function(){
			if(!dragged){
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
			} else {
				console.log("dragged...");
			}
			dragged = false;
			clearTimeout(timeout);
		});

			    

    }
	var fadeTime = 8000;
	function cycleBackgrounds(){

			$("#loadingImage1").fadeIn(4000, function() {

					$("#loadingImage2").fadeIn(4000, function() {

							$("#loadingImage3").fadeIn(4000, function() {
				
							});
						
					});
		
			});

	}

	function playerViewCycleBackgrounds(picIndex ){

		if(picIndex < flickrUrlList.length){
			console.log(flickrUrlList[picIndex]);
			$("#playerBG").css("background", "url(" + flickrUrlList[picIndex].url + ") no-repeat center center fixed" ).css("background-size", "cover");
			$("#playerBGInfo").text(flickrUrlList[picIndex].title + " by " + flickrUrlList[picIndex].ownername);
			$("#playerBG").fadeIn(fadeTime, function(){
				$("#playerBG").fadeOut(fadeTime, function(){
					$("#playerBGInfo").hide();
					 playerViewCycleBackgrounds(picIndex + 1);
				});
			});			
			
		} else if(picIndex == flickrUrlList.length) {
			playerViewCycleBackgrounds(0);
		}
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
    	var flickr_url = 'http://api.flickr.com/services/rest/?&method=flickr.groups.pools.getPhotos&api_key=fab0b8729460ee819e440ee3fb03381a&group_id=364847@N20&extras=url_l&format=json&nojsoncallback=1&per_page=100&page=';
        
        
    	flickr_url = flickr_url	+ Math.floor((Math.random()*251)+1);
    	//$.getJSON(flickr_url, function(data){


        $.ajax({
        url: flickr_url,
        async:false,
        success: function(result){
            console.log(result);
            
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

		$('#playerView').append("<iframe src=\"https://embed.spotify.com/?uri=spotify:trackset:Moodsic:"+song_one_href+","+song_two_href+","+song_three_href+"\" frameborder=\"0\"  allowtransparency=\"true\"></iframe>");

		$("#homeView").hide();
    	$("#loadingView").hide();
    	$("#playerView").show();

    	$("#loadingImage1").hide();
    	$("#loadingImage2").hide();
    	$("#loadingImage3").hide();

    	//Remove the images from 
		
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



