var url =
	'https://script.google.com/macros/s/AKfycbzY7e5k4BapaRkuSvgzBIH-3liunNmSvgT7sEdgW1-FuBS28Bg/exec';

var $form = $('form#wifi-form');

$('#submit-form').on('click', function(e) {
	e.preventDefault();
	var jqxhr = $.ajax({
		url: url,
		method: 'GET',
		dataType: 'json',
		data: $form.serializeObject()
	}).success();
});
