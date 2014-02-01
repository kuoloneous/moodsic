
$(document).ready(function () {

	var pressedButtons;
	var thumbnailCount= 0;
	//Data aggregated from Flickr for 64 images
	var flickrUrlList = new Array(); //title, ownername, url


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
	init();

	function init(){
		getRandomFlickrPhotos();
		loadImagesObjects(thumbnailCount);

	}


	function loadImagesObjects(tc) {
    	//and div to scroll view and then 
    	var upper = tc + 8;
    	for(var i = tc; i < upper; i++){
    		var newImage = "<div class='thumbnailView' id='" + i + "' url='" + flickrUrlList[i].url + "' style='background-image:url(" + flickrUrlList[i].url + ")'>";
    		//$("#scrollView").append(newImage);
    		//w8 $("#scrollView").append(toStaticHTML(newImage));
 


    	}

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

    	$("#scrollView").smoothDivScroll({
    		autoScrollingMode: "",
    		hotSpotScrolling: false,
    		touchScrolling: true,

    		startAtElementId: "1",
    		scrollToAnimationDuration: 2000,
    		scrollToEasingFunction: "easeOutBounce",

    		mousewheelScrollingStep: 1,
    		mousewheelScrolling: "horizontal",
    		easingAfterMouseWheelScrolling: true,
    		easingAfterMouseWheelScrollingFunction: "easeOutQuad",
    		easingAfterMouseWheelScrollingDuration: 500,
    	});

    	$("#scrollView").smoothDivScroll("scrollToElement", "first");


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
        /*
        $("#scrollView").transition({
        	opacity: '0',
        	perspective: '1000px',
        	rotateX: '90deg',
		}, 500, "easeOutQuad");
*/
    });




});

