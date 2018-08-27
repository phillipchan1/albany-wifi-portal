var url =
	'https://script.google.com/macros/s/AKfycbzY7e5k4BapaRkuSvgzBIH-3liunNmSvgT7sEdgW1-FuBS28Bg/exec';

var $form = $('form#wifi-form');

$('#submit-form').on('click', function(e) {
	var formData = $form.serializeObject();
	formData.dateAccessed = new Date();

	e.preventDefault();
	var jqxhr = $.ajax({
		url: url,
		method: 'GET',
		dataType: 'json',
		data: formData,
		complete: function() {
			console.log('should redirect');
			window.location = '/welcome.php';
		}
	}).success();
});
