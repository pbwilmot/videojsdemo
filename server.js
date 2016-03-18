var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var VAST = require('vast-xml');
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

function isCallerMobile(req) {
  var ua = req.headers['user-agent'].toLowerCase(),
    isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
  return !!isMobile;
}


app.set('view engine', 'jade');

app.use(cors());
app.use('/static', express.static('public'));
app.use('/lib', express.static('lib'));

app.get('/', function(req, res) {
  var social = (req.query.social === 'true');
  if(req.query.test === 'twitch'){
      res.render('twitch');
  } else {
    if(req.query.type === 'VIDEO') {
        console.log(req.headers['user-agent']);
        if(isCallerMobile(req)){
          res.render('ima-mobile', { poster: (req.query.poster || 'static/transparent_overlay.png')});
        } else {
          res.render('videoindex', { social: social, type: req.query.type, source: req.query.src, poster: req.query.poster, tracking: (req.query.tracking || 'xhr')});
        }
    } else if (req.query.type === 'FLASH') {
      res.render('flow', { completionWindow: req.query.completionWindow, bcod: req.query.bcod, src: req.query.src });
    } else if (req.query.type === 'VIDEO360' ) {
      res.render('video360', { autoplay: req.query.autoplay, automute: req.query.automute });
    } else {
      res.render('index', { social: social, type: req.query.type, source: req.query.src, tracking: (req.query.tracking || 'pixel'), options: JSON.stringify({}) });
    }
  }
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
    res.render('index', { type: options.type, social: social, tracking: (req.query.tracking || 'pixel'), options: JSON.stringify(options) })
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

app.listen(process.env.PORT || 8080);
