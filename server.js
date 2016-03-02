var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors')

app.use(cors());
app.use('/static', express.static('public'));
app.use('/lib', express.static('lib'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
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

app.get('/innovidDesktop', function(req, res) {
	res.sendFile(path.join(__dirname + '/innovid_desktop.html'));
});

app.get('/innovidmobile', function(req, res) {
	res.sendFile(path.join(__dirname + '/innovid_mobile.html'));
});

app.get('/flow', function(req, res) {
	res.sendFile(path.join(__dirname + '/flowplayer.html'));
});

app.get('/flow1', function(req, res) {
	res.sendFile(path.join(__dirname + '/flowplayer1.html'));
});


app.get('/flow2', function(req, res) {
	res.sendFile(path.join(__dirname + '/flowplayer2.html'));
});


app.get('/flow3', function(req, res) {
	res.sendFile(path.join(__dirname + '/flowplayer3.html'));
});


app.listen(process.env.PORT || 8080);
