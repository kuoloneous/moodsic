$(document).ready(function () {


    $('.thumbnailView').click(function (event) {
        $(this).css("border", "10px solid black").css("box-sizing", "border-box");
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
