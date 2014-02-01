$(document).ready(function () {
    $('.thumbnailView').click(function (event) {
        $(this).css("border", "10px solid black").css("box-sizing", "border-box");

        someUrls = ["http://farm4.staticflickr.com/3781/11833198064_b3c13fa1a9_b.jpg", "http://farm8.staticflickr.com/7315/9348986404_cd31fe5e8f_b.jpg"];
        get_color_info_from_urls(someUrls);

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

    });



});
