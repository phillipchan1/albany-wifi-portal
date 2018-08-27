/*jslint node: true */

'use strict';
var express = require('express');

// create instance of the server to variable app
var app = express();

app.use('/', express.static('./'));

// direct all other routes to client-side app
app.all('/*', function(req, res) {
	res.status(200)
		.set({ 'content-type': 'text/html; charset=utf-8' })
		.sendFile(process.cwd() + '/index.html');
});

// have our app listen on port 3000
app.listen(process.env.PORT || 3000, function() {
	console.log('Service on running on 3000');
});
