var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors')

app.use(cors());
app.use('/static', express.static('public'));

app.get('/ob', function(req, res) {
    res.sendFile(path.join(__dirname + '/odorblocker.html'));
});

app.get('/dd', function(req, res) {
    res.sendFile(path.join(__dirname + '/dirtdestroyer.html'));
});

app.get('/odorblocker', function(req, res) {
	res.end('<iframe src="./ob" style="border:none"></iframe>')
})

app.get('/dirtdestroyer', function(req, res) {
	res.end('<iframe src="./dd" style="border:none"></iframe>')
})

app.get('/test', function(req, res) {
	res.end('<iframe src="./dd" style="border:none"></iframe>')
})

app.listen(process.env.PORT || 8080);