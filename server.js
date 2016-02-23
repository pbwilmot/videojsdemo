var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors')

app.set('view engine', 'jade');

app.use(cors());
app.use('/static', express.static('public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/jade', function(req, res) {
  res.render('video', { tag: req.query.tag, autoplay: req.query.autoplay});
});

app.get('/odorblocker', function(req, res) {
	res.sendFile(path.join(__dirname + '/odorblocker.html'));
});

app.get('/dirtdestroyer', function(req, res) {
	res.sendFile(path.join(__dirname + '/dirtdestroyer.html'));
});

app.get('/vine', function(req, res) {
	res.sendFile(path.join(__dirname + '/vine.html'));
});

app.get('/twitch', function(req, res) {
	res.sendFile(path.join(__dirname + '/twitch.html'));
});

app.get('/youtube', function(req, res) {
	res.sendFile(path.join(__dirname + '/youtube.html'));
});

app.listen(process.env.PORT || 8080);
