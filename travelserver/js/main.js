$(document).ready(function () {
	var menuBtn = $('.top_nav-btn');
	var sidebarBtn = $('.left-sidebar-btn');
	var menu = $('.top_nav_menu');
	var sidebarMenu = $('.left-sidebar-menu');

	menuBtn.on('click', function(event) {
		event.preventDefault();
		menu.toggleClass('top_nav_menu-act');
				// menu.slideToggle(400);
			});
	sidebarBtn.on('click', function(event) {
		event.preventDefault();
		sidebarMenu.toggleClass('left-sidebar-menu-act');
				// sidebarMenu.slideToggle(400);
			});

	$(".direction-blocks").slick({
		arrows: false,
		dots: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		}
		]
	});

	// var elem = document.querySelector('.calc-range');
	// var init = new Powerange(elem, { min: 100000, max: 3000000, start: 100000, hideRange: true, step: 100000 });
	// var per, month, result, total, monthly;
	// var money = +$(".calc-range").val();

	// $("input[name='programms']").on("change", function (event) {
	// 	month = +$(this).attr('data-month')
	// 	per = +$(this).attr('data-per')
	// 	result = Math.round(per / 12 * month * money);
	// 	total = result + money;
	// 	monthly = parseInt(result / month);
	// 	$(".calc-total span").text(total.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
	// 	$(".calc-monthly span").text(monthly.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
	// 	$(".calc-total small span").text(month);

	// });

	// $(".calc-range").on("change", function(event){
	// 	$(".calc-summ-invest-num span").text($(this).val().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
	// 	var radio = $("input[name='programms']:checked");
	// 	money = +$(this).val();
	// 	month = +radio.attr('data-month')
	// 	per = +radio.attr('data-per')
	// 	result = Math.round(per / 12 * month * money);
	// 	total = result + money;
	// 	monthly = parseInt(result / month);
	// 	$(".calc-total span").text(total.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
	// 	$(".calc-monthly span").text(monthly.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
	// 	$(".calc-total small span").text(month);
	// });

	$('[data-target="modal"]').on("click", function (event) {
		event.preventDefault();
		$('.modal').show();
	});
	$('.close').on('click', function (event) {
		event.preventDefault();
		$('.modal').hide();
	});

});

