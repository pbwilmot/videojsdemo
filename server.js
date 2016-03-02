var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');

app.set('view engine', 'jade');

app.use(cors());
app.use('/static', express.static('public'));
app.use('/lib', express.static('lib'));

app.get('/', function(req, res) {
  if(req.query.type === 'VIDEO') {
    res.render('videoindex', { poster: req.query.poster});
  } else if (req.query.type === 'FLASH') {
  	res.render('flow', { completionWindow: req.query.completionWindow, bcod: req.query.bcod, src: req.query.src });
  } else {
    res.render('index');
  }
});

app.get('/setup', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/setup.html'));
});

app.get('/test', function(req, res) {
  res.render('test', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/test/post/:verticle', function(req, res) {
  res.render(req.params.verticle, { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/crossdomain.xml', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/crossdomain.xml'));
});

app.get('/innovidDesktop', function(req, res) {
	res.sendFile(path.join(__dirname + '/innovid_desktop.html'));
});

app.get('/innovidmobile', function(req, res) {
	res.sendFile(path.join(__dirname + '/innovid_mobile.html'));
});

app.get('/demo/toyota', function(req, res) {
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
