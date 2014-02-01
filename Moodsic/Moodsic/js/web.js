
$(document).ready(function () {



	var selectedImages = new Array();
	var thumbnailCount= 0;
	//Data aggregated from Flickr for 64 images
	var flickrUrlList = new Array(); //title, ownername, url

	init();
    
	function init(){
		//Initialize Photos
		getRandomFlickrPhotos();
		loadImagesObjects();
		loadImagesObjects();
		loadImagesObjects();

		//Initialize Views
		$("loadingView").hide();
		$("playerView").hide();

		//Initialize Dev Buttons
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

	 	$("#scrollableArea").css("width", 100*(thumbnailCount/8 + 1) + "%" );

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
	     console.log(selectedImages);
	 	});

	}
	function addImage(image_url){
		selectedImages.push({
			url: image_url,
		});

	}

	function removeImage(image_url){
		for(var i = 0; i < selectedImages.length; i++){
			if(selectedImages[i].url == image_url){
				selectedImages = selectedImages.splice(i, 1);
			}
		}
	}
	function loadImagesObjects() {
    	//and div to scroll view and then 
    	var upper = thumbnailCount + 8;
    	var newPage = $("<div class='thumbPage' id ='" + thumbnailCount/8 + "'>");
    	for(var i = thumbnailCount; i < upper; i++){
    		//var newImage = "<div class='thumbnailView' id='image" + i + "' url='" + flickrUrlList[i].url + "' style='background-image:url(" + flickrUrlList[i].url + ")'>";
    		var newImage = $("<div class='thumbnailView' id='image" + i + "' url='test' style='background: red; box-shadow:inset 0 0 50px 5px #000000;'>");
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
     
     $("div#scrollView").transition({
     opacity: '0',
     perspective: '1000px',
     rotateX: '90deg',
     }, 500, "easeOutQuad");
     });
     */

});

