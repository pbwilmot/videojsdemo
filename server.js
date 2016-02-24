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

app.get('/jade', function(req, res) {
  res.render('video', { query: req.query });
});

app.get('/womenshealth', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/womenshealth.html'));
});

app.get('/womenshealthpost', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/womenshealthpost.html'));
});

app.get('/tc', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/tc.html'));
});

app.get('/tcpost', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/tcpost.html'));
});

app.listen(process.env.PORT || 8080);
