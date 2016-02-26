var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');

app.set('view engine', 'jade');

app.use(cors());
app.use('/static', express.static('public'));

app.get('/', function(req, res) {
  if(req.query.type === 'VIDEO') {
    res.render('videoindex');
  } else {
    res.render('index');
  }
});

app.get('/setup', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/setup.html'));
});

app.get('/womenshealth', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/womenshealth.html'));
});

app.get('/female-lifestyle-post', function(req, res) {
  res.render('female-lifestyle-post', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/tc', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/tc.html'));
});

app.get('/tcpost', function(req, res) {
  res.render('tcpost');
});

app.get('/test', function(req, res) {
  res.render('test', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/test/post/:verticle', function(req, res) {
  res.render(req.params.verticle, { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/aom', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/aom.html'));
});

app.get('/male-lifestyle-post', function(req, res) {
  res.render('male-lifestyle-post', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/cnn', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/cnn.html'));
});

app.get('/business-post', function(req, res) {
  res.render('business-post', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/mt', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/mt.html'));
});

app.get('/auto-post', function(req, res) {
  res.render('auto-post', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/kotaku', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/kotaku.html'));
});

app.get('/kotakupost', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/kotakupost.html'));
});

app.get('/crossdomain.xml', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/crossdomain.xml'));
});

app.listen(process.env.PORT || 8080);
