$(document).ready(function () {
    $('.thumbnailView').click(function (event) {
        $(this).css("border", "10px solid black").css("box-sizing", "border-box");
    });
    $("div#scrollView").smoothDivScroll({
    	autoScrollingMode: "onStart",
    	hotSpotScrolling: false,
    	touchScrolling: true,

    	mousewheelScrollingStep: 1,
    	mousewheelScrolling: "horizontal",
    	easingAfterMouseWheelScrolling: true,
    	easingAfterMouseWheelScrollingFunction: "easeOutQuint",
    	easingAfterMouseWheelScrollingDuration: 500
    });
});
