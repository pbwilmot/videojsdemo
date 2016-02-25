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

app.get('/setup', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/setup.html'));
});

app.get('/jade', function(req, res) {
  res.render('video', { query: req.query });
});

app.get('/womenshealth', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/womenshealth.html'));
});

app.get('/womenshealthpost', function(req, res) {
	res.render('womenshealthpost', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/tc', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/tc.html'));
});

app.get('/tcpost', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/tcpost.html'));
});

app.get('/test', function(req, res) {
	res.render('test', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/test/post/:id', function(req, res) {
	var route = "";
	switch (req.params.id) {
		case 'female-lifestyle':
			route = 'womenshealthpost';
			break;
		case 'male':
			route = 'tcpost';
			break;
		default:
			return
	};
	res.render(route, { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/aom', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/aom.html'));
});

app.get('/aompost', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/aompost.html'));
});

app.get('/cnn', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/cnn.html'));
});

app.get('/cnnpost', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/cnnpost.html'));
});

app.get('/mt', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/mt.html'));
});

app.get('/mtpost', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/mtpost.html'));
});

app.get('/kotaku', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/kotaku.html'));
});

app.get('/crossdomain.xml', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/crossdomain.xml'));
});

app.listen(process.env.PORT || 8080);
