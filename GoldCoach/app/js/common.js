$(window).resize(function() {
	if ($(window).width() >= 768) {
		var left = document.querySelector(".left_column");
		var right = document.querySelector(".right_column");
		function equalHeight() {
			left.style.height = "auto";
			right.style.height = "auto";
			var leftH = left.offsetHeight;
			var rightH = right.offsetHeight;
			var max = Math.max(leftH, rightH);
			left.style.height = max + "px";
			right.style.height = max + "px";
		}
		equalHeight();
		window.onresize = equalHeight;
	}
});