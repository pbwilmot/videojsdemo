var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var request_helper = require('./request_helper');
var VAST = require('vast-xml');
var shortid = require('shortid');

var genId = function() {
  return shortid.generate();
};
var querystring = require('querystring');

var redirectLibrary = {
  1: '/mediakit/post/tech-post',
  2: '/mediakit/post/business-post',
  3: '/mediakit/post/gaming-post',
  4: '/mediakit/post/male-lifestyle-post',
  5: '/mediakit/post/female-lifestyle-post',
};

app.get('/redirect/:id', function(req, res) {
  var redirectUrl = redirectLibrary[req.params.id];
  res.render('redirect', { redirectUrl: redirectUrl });
});

app.set('view engine', 'jade');

app.use(cors());
app.use('/static', express.static('public'));
app.use('/lib', express.static('lib'));

app.get('/', function(req, res) {
  var social = (req.query.social === 'true');
  res.render('videoindex', { 
    mobile: request_helper.isCallerMobile(req), 
    social: social, 
    type: req.query.type, 
    source: req.query.src, 
    poster: (req.query.poster || 'static/transparent_overlay.png'), 
    tracking: (req.query.tracking || 'xhr'), 
    options: JSON.stringify(request_helper.loadConfig(req.query))});
});

app.get('/crossdomain.xml', function(req,res){
  res.sendFile(path.join(__dirname + "/public/assets/crossdomain.xml"));
});

app.get('/demo', function(req,res){
  res.render('dyn-iframe' , { type: req.query.type, bcod: req.query.bcod });
});

app.get('/setup', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/setup.html'));
});

app.get('/mediakit', function(req, res) {
  res.render('test', { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/mediakit/:vertical', function(req, res) {
  res.render(req.params.vertical, { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/mediakit/post/:vertical', function(req, res) {
  res.render(req.params.vertical, { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
});

app.get('/innovidmobile', function(req, res) {
  res.render('iframe', { poster: req.query.poster});
});

app.get('/kotaku', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/kotaku.html'));
});


app.get('/pbcod/:bcode', function(req,res){
  var time = (new Date()).getTime();
  var usa = {
    autoplay: "false",
    automute: "false",
    completionwindow: (req.query.completionwindow || 30) ,
    billwindow: 3,
    src: 'Lirik',
    type: 'TWITCH',
    clickout: "true",
    trackercode: 'ZBNDploS8qgv4',
    pub_tracking: (req.query.pub_tracking || 'pixel'),
    pub_start: req.query.pub_start,
    pub_bill: req.query.pub_bill,
    pub_end: req.query.pub_end,
    advtracking: 'pixel',
    adv_start: null,
    adv_bill: '//bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=16993262&PluID=0&ord='+time+'&rtu=-1',
    adv_end: null,
    startsplash: null,
    endsplash: "//da2hw5uyqeo5b.cloudfront.net/imgs/hitman_twitch_end.jpg"
  }
  var ca = {
    autoplay: "false",
    automute: "false",
    completionwindow: (req.query.completionwindow || 30) ,
    billwindow: 3,
    src: 'Lirik',
    type: 'TWITCH',
    clickout: "true",
    trackercode: '5Erej1UrOlvo',
    pub_tracking: (req.query.pub_tracking || 'pixel'),
    pub_start: req.query.pub_start,
    pub_bill: req.query.pub_bill,
    pub_end: req.query.pub_end,
    advtracking: 'pixel',
    adv_start: null,
    adv_bill: '//bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=16993266&PluID=0&ord='+time+'&rtu=-1',
    adv_end: null,
    startsplash: null,
    endsplash: "//da2hw5uyqeo5b.cloudfront.net/imgs/hitman_twitch_end.jpg"
  }
  var demo = {
    autoplay: ( req.query.autoplay || "false"),
    automute: ( req.query.automute || "false"),
    completionwindow: (req.query.completionwindow || 30) ,
    billwindow: ( req.query.billwindow || 3),
    src: ( req.query.src || 'monstercat'),
    type: 'TWITCH',
    clickout: ( req.query.clickout || "true" ),
    trackercode: ( req.query.clickout || '7p29mjMcmegQd'),
    pub_tracking: (req.query.pub_tracking || 'pixel'),
    pub_start: req.query.pub_start,
    pub_bill: req.query.pub_bill,
    pub_end: req.query.pub_end,
    advtracking: 'pixel',
    adv_start: req.query.adv_start,
    adv_bill: req.query.adv_bill,
    adv_end: req.query.adv_end,
    startsplash: null,
    endsplash: req.query.endsplash
  }
  var dictionary = {
    'Nx7WGpjUpOwNP' : usa,
    '9gB9EQWI92vdx' : usa,
    'prwXp84SOD5a' : usa,
    'djV7vXrtGB5Zp' : usa,
    '94BxgDlF3WJ19' : ca,
    'EkJ2dRNhpWrbR' : ca,
    'j4QrbvEtoaoX2' : ca,
    'ALRq08GuDpBrP' : ca,
    '7p29mjMcmegQd' : demo,
  }
  var social = (req.query.social === 'true');
  var options = dictionary[req.params.bcode];
  if(options){
    options.bcod = req.params.bcode;
    options.clickouturl = "//buzz.st/r/"+options.trackercode+"?bref=buzz.st"
    res.render('videoindex', { mobile: request_helper.isCallerMobile(req), social: social, type: options.type, source: req.query.src, poster: (req.query.poster || 'static/transparent_overlay.png'), tracking: (req.query.tracking || 'pixel'), options: JSON.stringify(options)});

  } else {
    res.status(404).send('Not Found');
  }
});

app.get("/vast/:bcod", function(req,res){
    var protocol = req.headers['x-forwarded-proto'];
    var events = [
      'creativeView'
    , 'start'
    , 'firstQuartile'
    , 'midpoint'
    , 'thirdQuartile'
    , 'complete'
    , 'mute'
    , 'unmute'
    , 'pause'
    , 'rewind'
    , 'resume'
    , 'fullscreen'
    , 'exitFullscreen'
    , 'expand'
    , 'collapse'
    , 'acceptInvitationLinear'
    , 'closeLinear'
    , 'skip'
  ];

  var vast = new VAST();
  var tag = protocol+'://buzz.st/v1/ads/'+req.params.bcod+'/vast';
  var ad = vast.attachAd({
    id: req.params.bcod
  , structure : 'wrapper'
  , AdSystem : 'BuzzStarter'
  , Error: protocol+"://metrics.buzz.st/v0/track?bsrc=vast&bcod="+req.params.bcod+"&btyp=error&"+querystring.stringify(req.query)
  , VASTAdTagURI : tag
  }).attachImpression({ id: Date.now(), url : protocol+"://metrics.buzz.st/v0/track?bsrc=vast&bcod="+req.params.bcod+"&btyp=impression&"+querystring.stringify(req.query) })

  var creative = ad.attachCreative('Linear',{ Duration : '00:00:00'});
  creative.attachVideoClick("ClickTracking", protocol+"://metrics.buzz.st/v0/track?bsrc=vast&bcod="+req.params.bcod+"&btyp=click&"+querystring.stringify(req.query));

  events.forEach(function(event){ creative.attachTrackingEvent(event,protocol+"://metrics.buzz.st/v0/track?bsrc=vast&bcod="+req.params.bcod+"&btyp="+event+"&"+querystring.stringify(req.query)); });

  res.end(vast.xml({ pretty : true, indent : '  ', newline : '\n' }));
});

app.get("/genId", function(req, res) {
  res.end(genId());
});

app.get("/kickmeto", function(req,res){
  res.set('referrer','buzz.st');
  res.redirect('https://www.twitch.tv/Lirik');
});
app.listen(process.env.PORT || 8080);
