$(document).ready(function () {

    $('.thumbnailView').click(function (event) {
        $(this).css("border", "10px solid black").css("box-sizing", "border-box");

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

    $("div#scrollView").smoothDivScroll({
    	autoScrollingMode: "",
    	hotSpotScrolling: false,
    	touchScrolling: true,

    	startAtElementId: "b",
		scrollToAnimationDuration: 2000,
		scrollToEasingFunction: "easeOutBounce",

    	mousewheelScrollingStep: 1,
    	mousewheelScrolling: "horizontal",
    	easingAfterMouseWheelScrolling: true,
    	easingAfterMouseWheelScrollingFunction: "easeOutQuad",
    	easingAfterMouseWheelScrollingDuration: 500,
    });

    $("div#scrollView").smoothDivScroll("scrollToElement", "first");
});
