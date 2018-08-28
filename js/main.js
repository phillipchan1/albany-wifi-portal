var url =
	'https://script.google.com/macros/s/AKfycbxPaGYk-3B8Z6XHY059p3SmLdt6beUHlkezvQg6nHO1zh5Ango/exec';

var $form = $('form#wifi-form');

var presentValidation = function(value) {
	if (value.length > 0) {
		return true;
	} else {
		return false;
	}
}

var emailValidation = function(value) {
	if (value.includes('@') && value.includes('.')) {
		return true
	} else {
		return false;
	}
}

var rules = {
	firstName: {
		validationFunction: presentValidation,
		errorMessage: 'First Name required'
	},
	lastName: {
		validationFunction: presentValidation,
		errorMessage: 'Last name required'
	},
	email: {
		validationFunction: emailValidation,
		errorMessage: 'Provide proper email address'
	}
}


var validate = function(formData, callback) {
	var errors = 0;
	var errorMessages = [];

	for (var key in formData) {
		if (rules[key]) {
			if (!rules[key]['validationFunction'](formData[key])) {
				// count how many rules
				errors++;

				// append error messaging
				errorMessages.push(rules[key]['errorMessage']);

			}
		}
	}

	if (errors === 0) {
		callback(true);
		showErrorMessages(errorMessages);
	} else {
		callback(false);
		showErrorMessages(errorMessages);
	}
}

var showErrorMessages = function(messagesArray) {
	var errorMessageContainer = document.querySelector('.error-messages');
	var errorMessageList = document.querySelector('.error-message-list');
	var listHTML = '';

	if (messagesArray.length === 0) {
		errorMessageContainer.style.display = 'none';
	} else {
		errorMessageContainer.style.display = 'block';

		messagesArray.forEach(function(message) {
			listHTML += '<li>' + message + '</li>'
		});

		errorMessageList.innerHTML = listHTML;
	}
}

$('#submit-form').on('click', function(e) {
	var formData = $form.serializeObject();
	formData.dateAccessed = new Date();

	e.preventDefault();

	validate(formData, function(success) {
		if (success) {
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
		} else {
			console.log('failed validation');
		}
	});


});
