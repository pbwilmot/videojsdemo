var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var request_helper = require('./request_helper');
var VAST = require('vast-xml');
var shortid = require('shortid');
// var redis_url = "redis://127.0.0.1:6379";
var redis_url = process.env.REDIS_URL;
// var redis_url = "redis://h:p85mev7bk2lfif4jnkf3htn2d2@ec2-54-227-250-102.compute-1.amazonaws.com:9069";
var redis = require('redis');

var genId = function() {
  return shortid.generate();
};
var querystring = require('querystring');
var redisClient = null;
var redisConn = function(){
  if(!redisClient){
    redisClient = redis.createClient(redis_url);
  }
  return redisClient;
}

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

app.get('/rd/:bcod', function(req, res) {
  var redirectUrl = redisConn().get(req.params.bcod, function(err, data){
    if(!err){
      var target = data;
      res.render('rd', { target: target, bcod: req.params.bcod });
    }else{
      res.status(404).send('Not Found');
    }
  });
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
  if(req.query.shared === 'true') {
    res.render(req.params.vertical, { shared: req.query.shared, src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
  } else {
    res.render(req.params.vertical, { src:  req.query.src, type: req.query.type, autoplay: req.query.autoplay, automute: req.query.automute });
  }
});

app.get('/innovidmobile', function(req, res) {
  res.render('iframe', { poster: req.query.poster});
});

app.get('/kotaku', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/kotaku.html'));
});


app.get('/pbcod/:bcode', function(req,res){
  redisConn().on("error",function(err){
    console.log("Error connecting to redis", err);
    res.status(404).send("Cant retrieve campaign data");
  });
  redisConn().get(req.params.bcode, function(err, data){
    if(!err){
      var options = JSON.parse(data);
      options = request_helper.sanitize(req, options);
      res.render('videoindex', {
        mobile: request_helper.isCallerMobile(req),
        social: options.social,
        type: options.type,
        source: req.query.src,
        poster: (req.query.poster || 'static/transparent_overlay.png'),
        tracking: (req.query.tracking || 'pixel'),
        options: JSON.stringify(options)});
    }else{
      res.status(404).send('Not Found');
    }
  });
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
  var tag = protocol+'://api.buzz.st/v1/ads/'+req.params.bcod+'/vast';
  var ad = vast.attachAd({
    id: req.params.bcod
  , structure : 'wrapper'
  , AdSystem : 'BuzzStarter'
  , Error: protocol+"://metric1.buzz.st/v0/track?bsrc=vast&bcod="+req.params.bcod+"&btyp=error&"+querystring.stringify(req.query)
  , VASTAdTagURI : tag
  }).attachImpression({ id: Date.now(), url : protocol+"://metric1.buzz.st/v0/track?bsrc=vast&bcod="+req.params.bcod+"&btyp=impression&"+querystring.stringify(req.query) });

  var creative = ad.attachCreative('Linear',{ Duration : '00:00:00'});
  creative.attachVideoClick("ClickTracking", protocol+"://metric1.buzz.st/v0/track?bsrc=vast&bcod="+req.params.bcod+"&btyp=click&"+querystring.stringify(req.query));

  events.forEach(function(event){ creative.attachTrackingEvent(event,protocol+"://metric1.buzz.st/v0/track?bsrc=vast&bcod="+req.params.bcod+"&btyp="+event+"&"+querystring.stringify(req.query)); });

  res.end(vast.xml({ pretty : true, indent : '  ', newline : '\n' }));
});

app.get("/genId", function(req, res) {
  res.end(genId());
});

app.get("/ads/:play_list_id", function(req,res){
  var images = [{
    bcod: "VQM7bEEInere"
  , img: "//cdn.buzzstarter.com/pitts/pittsburgh1.jpg"
  }
  ,{
    bcod: "J28PpPxfNmPLb"
  , img: "//cdn.buzzstarter.com/pitts/pittsburgh2.jpg"
  }];

  var creative = images[Math.floor(Math.random()*images.length)];
  var cnf = {};
  cnf.img = creative.img;
  cnf.bcod = creative.bcod;
  cnf.pub_clk = req.query.pub_click
  cnf.dfa_imp = "//ad.doubleclick.net/ddm/trackimp/N30602.1355588DOUBLECLICK.COMB57/B9617427.130617330;dc_trk_aid=303420272;dc_trk_cid=69986920;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
  cnf.dfa_clk = "//ad.doubleclick.net/ddm/trackclk/N30602.1355588DOUBLECLICK.COMB57/B9617427.130617330;dc_trk_aid=303420272;dc_trk_cid=69986920;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=";
  cnf.ttn_imp = "//metrics.buzz.st/v0/track?bsrc=cpc&btyp=impression&bcod="+creative.bcod+"&cb="+(new Date()).getTime()+"&pub_id="+req.query.pub_id+"&plid="+req.params.play_list_id;
  cnf.ttn_clk = "//metrics.buzz.st/v0/track?bsrc=cpc&btyp=click&bcod="+creative.bcod+"&cb="+(new Date()).getTime()+"&pub_id="+req.query.pub_id+"&plid="+req.params.play_list_id;
  res.render('templates/pittsburgh', {cnf: cnf });
});

app.listen(process.env.PORT || 8080);
