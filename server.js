var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');

app.set('view engine', 'jade');

app.use(cors());
app.use('/static', express.static('public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/testpage', function(req, res) {
	res.sendfile('public/testpage.html');
});

app.get('/jade', function(req, res) {
  res.render('video', { query: req.query });
});

app.listen(process.env.PORT || 8080);
