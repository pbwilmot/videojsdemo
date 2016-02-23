var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors')

app.set('view engine', 'jade');

app.use(cors());

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/jade', function(req, res) {
  res.render('video', { tag: req.query.tag, autoplay: req.query.autoplay, poster: req.query.poster});
});

app.listen(process.env.PORT || 8080);
