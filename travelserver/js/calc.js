$(document).ready(function () {
	var elem = document.querySelector('.calc-range');
	var init = new Powerange(elem, { min: 100000, max: 3000000, start: 100000, hideRange: true, step: 100000 });
	var per, month, result, total, monthly;
	var money = +$(".calc-range").val();

	$("input[name='programms']").on("change", function (event) {
		month = +$(this).attr('data-month')
		per = +$(this).attr('data-per')
		result = Math.round(per / 12 * month * money);
		total = result + money;
		monthly = parseInt(result / month);
		$(".calc-total span").text(total.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		$(".calc-monthly span").text(monthly.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		$(".calc-total small span").text(month);

	});

	$(".calc-range").on("change", function(event){
		$(".calc-summ-invest-num span").text($(this).val().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		var radio = $("input[name='programms']:checked");
		money = +$(this).val();
		month = +radio.attr('data-month')
		per = +radio.attr('data-per')
		result = Math.round(per / 12 * month * money);
		total = result + money;
		monthly = parseInt(result / month);
		$(".calc-total span").text(total.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		$(".calc-monthly span").text(monthly.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		$(".calc-total small span").text(month);
	});
});