$("document").ready(function () {
	var menuBtn = $(".top_nav-btn");
	var sidebarBtn = $(".left-sidebar-btn");
	var menu = $(".top_nav_menu");
	var sidebarMenu = $(".left-sidebar-menu");

	menuBtn.on("click", function (event) {
		event.preventDefault();
		menu.toggleClass("top_nav_menu-act");
	});
	sidebarBtn.on("click", function (event) {
		event.preventDefault();
		sidebarMenu.toggleClass("left-sidebar-menu-act");
	});

	var navPos, winPos, navHeight;

	function refreshVar() {
		navPos = $('nav').offset().top;
		navHeight = $('nav').outerHeight(true);
	}

	refreshVar();
	$(document).resize(refreshVar);

	$(document).scroll(function () {
		winPos = $(window).scrollTop();
		if($(document).width()> 992){
			if (winPos >= navPos) {
				$('nav').addClass('fixed');
				$('.clone-nav').show();
			}
			else {
				$('nav').removeClass('fixed');
				$('.clone-nav').hide();
			}
		}
		
	});
});


