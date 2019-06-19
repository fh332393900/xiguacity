(function($) {
	var flag = false;
	$(".select-input").focus(function() {
		flag = true;
		if ($(".draw-content").css("display") == "none") {
			$(".arrow").toggleClass('active');
		}
		if (flag) {
			$(".draw-content").css("display","inline-block");
			$(".draw-content").css("height","400");
		}
		if ($(".draw-content").css("display") == "none") {
			$(".arrow").toggleClass('active');
		}
	});
	$('.arrow').on('click',function(){
		flag = !flag;
		if (flag) {
			$(".draw-content").css("display","inline-block");
			$(".draw-content").css("height","400");
		}else{
			$(".draw-content").css("height","100");
			$(".draw-content").css("display","none");
		}
    $(this).toggleClass('active');
	});
})(jQuery)

