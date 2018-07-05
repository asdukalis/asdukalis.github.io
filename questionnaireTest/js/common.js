$(function() {
for (i = new Date().getFullYear(); i > 1950; i--) {
	$('#yearpicker').append($('<option />').val(i).html(i));
}
});
