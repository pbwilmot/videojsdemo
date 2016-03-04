var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var uaParser = require('user-agent-parser');
var parser = new uaParser();
console.log("boom");
app.set('view engine', 'jade');

app.use(cors());
app.use('/static', express.static('public'));
app.use('/lib', express.static('lib'));

app.get('/', function(req, res) {


  if(req.query.test === 'twitch'){
      res.render('twitch');
  } else {
    if(req.query.type === 'VIDEO') {
        var deviceType = parser.setUA(req.headers['user-agent']).getDevice().type;
        console.log(req.headers['user-agent']);
        if( deviceType === 'mobile' ||  deviceType === 'tablet'){
          res.render('ima-mobile', { poster: req.query.poster});
        } else {
          res.render('videoindex', { poster: req.query.poster});
        }

    } else if (req.query.type === 'FLASH') {
      res.render('flow', { completionWindow: req.query.completionWindow, bcod: req.query.bcod, src: req.query.src });
    } else {
      res.render('index');
    }
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
	// res.sendFile(path.join(__dirname + '/innovid_mobile.html'));

  res.render('iframe', { poster: req.query.poster});
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
