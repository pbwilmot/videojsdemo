var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080

app.use('/static', express.static('public'));

app.get('/OdorBlocker', function(req, res) {
    res.sendFile(path.join(__dirname + '/odorblocker.html'));
});

app.get('/DirtDestroyer', function(req, res) {
    res.sendFile(path.join(__dirname + '/dirtdestroyer.html'));
});

app.get('/test', function(req, res) {
	res.end('<iframe src="http://localhost:8000/dirtdestroyer"></iframe>')
})
// app.listen(8080);
app.listen(8000);