var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');

app.set('view engine', 'jade');

app.use(cors());
app.use('/static', express.static('public'));

app.get('/', function(req, res) {
  if(req.query.type === 'VIDEO') {
    res.render('videoindex', { poster: req.query.poster});
  } else {
    res.render('index');
  }
});

app.get('/setup', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/setup.html'));
});

app.get('/mediakit', function(req, res) {
  res.render('test', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/mediakit/post/:verticle', function(req, res) {
  res.render(req.params.verticle, { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/crossdomain.xml', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/crossdomain.xml'));
});

app.listen(process.env.PORT || 8080);
