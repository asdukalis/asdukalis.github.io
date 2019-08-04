$(document).ready(function() {
	$("#my-icon").click(function() {
		$(this).toggleClass("is-active");
	});

	$(".mnu li").click(function(){
		$(".mnu").fadeOut(600);
		$("#my-icon").toggleClass("is-active");
	});

	$("#my-icon").click(function(){
		if($(".mnu").is(":visible")) {
			$(".mnu").fadeOut(600);
		} else{
				$(".mnu").fadeIn(600);
		}	
	});
});
