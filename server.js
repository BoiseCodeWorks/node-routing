const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes.router);

app.listen(3000, function () {
	console.log('The magic happens on port 3000!');
});