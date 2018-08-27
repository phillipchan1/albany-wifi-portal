var url =
	'https://script.google.com/macros/s/AKfycbxPaGYk-3B8Z6XHY059p3SmLdt6beUHlkezvQg6nHO1zh5Ango/exec';

var $form = $('form#wifi-form');

$('#submit-form').on('click', function(e) {
	var formData = $form.serializeObject();
	formData.dateAccessed = new Date();

	e.preventDefault();

	var freeTime = $.ajax({
		url: '/free_time.cgi',
		method: 'POST',
		data: formData,
		error: function(err) {
			console.log(err);
		},
		complete: function() {
			var jqxhr = $.ajax({
				url: url,
				method: 'GET',
				dataType: 'json',
				data: formData,
				complete: function() {
					window.location = '/welcome.html';
				}
			}).success();
		}
	}).success();
});
