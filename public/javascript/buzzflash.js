var BuzzFlash = (function(window) {
  var dictionary = {
    "82WxOWdT7ZRR": [
    {bcod: "82WxOWdT2ZAg5", weight: 13},
    {bcod: "M21bX1qTRN3G7", weight: 1},
    {bcod: "Qe1b41lhPX5EG", weight: 1},
    {bcod: "O21bA17TlVVvB", weight: 1},
    {bcod: "omdZldMsPOZ2q", weight: 1},
    {bcod: "2rw8Gw2Fap50g", weight: 13},
    {bcod: "Dq1bm19ukL487", weight: 13},
    {bcod: "kmrGqrWskALrn", weight: 13},
    {bcod: "7XoV3NoU5Zn09", weight: 52},
    {bcod: "VebyxG9fWglpk", weight: 4}
    ],
    "M21bX1qTgRLaW": [
    {bcod: "5NLJBLRcQnEaA", weight: 13},
    {bcod: "Vr1bd1XFr5qMR", weight: 1},
    {bcod: "NB1bX1kh2eZaq", weight: 1},
    {bcod: "v7dMxdmfXjmLy", weight: 1},
    {bcod: "ypdwEd0TwjOO", weight: 1},
    {bcod: "BD1bJ1gcvDlQ", weight: 13},
    {bcod: "mmdX7dWsy0Wrl", weight: 13},
    {bcod: "2rw8Gw2FW2EVe", weight: 13},
    {bcod: "1rb29Bbu4WZw8", weight: 52},
    {bcod: "EDbQ5oNsAmlZ", weight: 4}
    ],
    "X7Av9AjfdEr5J": [
    {bcod: "7N89O8dcOD97", weight: 13},
    {bcod: "Dq1bm19uJGqP", weight: 1},
    {bcod: "rodNGdMfJQbJy", weight: 1},
    {bcod: "BD1bJ1gckjpVe", weight: 1},
    {bcod: "X7Av9Ajf9bl0", weight: 1},
    {bcod: "AG1bv1df5B0L", weight: 13},
    {bcod: "Dq1bm19uPJrg", weight: 13},
    {bcod: "Wk1b91atGqWy3", weight: 13},
    {bcod: "bVyOAgyIvjW2", weight: 52},
    {bcod: "o7ZpgbNT50vMV", weight: 4}
    ],
    "qpkEjQ5F1M154": [
    {bcod: "qpkEjQ5F1M154", weight: 13},
    {bcod: "PpLvwZDHLQX9p", weight: 1},
    {bcod: "13aarLACb3L5Q", weight: 1},
    {bcod: "D01rPD9HMQJqq", weight: 1},
    {bcod: "jbQaM05tBZxM", weight: 1},
    {bcod: "2vbw1QnHgqvbm", weight: 13},
    {bcod: "pmqAbWyhDm8Z", weight: 13},
    {bcod: "Eexg4pXFaQqRG", weight: 13},
    {bcod: "4vkBjl5ig2ApR", weight: 52},
    {bcod: "lrVVPLnSXBJm7", weight: 4}
    ],
    "34XkWwoTewbOm": [
    {bcod: "34XkWwoTewbOm", weight: 13},
    {bcod: "MMmmgd4TR1Ljn", weight: 1},
    {bcod: "QG1DgwliyBV3", weight: 1},
    {bcod: "D01rPD9HMQJqq", weight: 1},
    {bcod: "bO2p7lGiGA2BD", weight: 1},
    {bcod: "pwxdygVf9aoyX", weight: 13},
    {bcod: "5A918NQUG8Xp", weight: 13},
    {bcod: "AAe0grkcqqLoR", weight: 13},
    {bcod: "aXyAxljSLAPNO", weight: 52},
    {bcod: "nPmmrLNcdMP04", weight: 4}
    ]
  };

  const paid_uri = "https://magnetic.domdex.com/ahtm?mp=2&n=11192&c=105340&b=116758&sz=88x31&s=&id=&a=";
  const av_uri = "https://magnetic.domdex.com/ahtm?mp=2&n=11193&c=105341&b=116759&sz=88x31&s=&id=&a=";

  function getTotalWeight(pubtag){
    var tagList = dictionary[pubtag];

    if(!tagList){
      return 0;
    }

    var weight = tagList.map(function(obj){return obj.weight;}).reduce(function(previousValue, currentValue, currentIndex, array) {
      return previousValue + currentValue;
    });

    return weight;

  }
  function getThirdpartyUri(org, repl){
    var bucket = dictionary[org];
    if(!bucket){
      return null;
    }

    for(i = 0; i < bucket.length; i++){
      if(bucket[i].bcod == repl){
        switch(bucket[i].weight){
          case 1:
            return av_uri;
            break;
          case 4:
            return av_uri;
            break;
          case 13:
            return paid_uri;
            break;
          case 52:
            return paid_uri;
            break;
          default:
            return null;
        }
      }
    }
    return null;
  }

  function replacebcod(bcod){
    if (!dictionary[bcod]){
      return bcod;
    }

    var w = getTotalWeight(bcod);

    var arr = dictionary[bcod];
    var rn = Math.floor(Math.random()*w);
    var c = 0;
    for(i = 0; i < arr.length; i++){
      c += arr[i].weight;
      if(rn < c){
        return arr[i].bcod;
      }
    }
    return bcod;
  }

  var options, tracking, source, completionWindow, autoplay;
  var orgbcod;

  var initPlayer = function (domtarget, bcod){
    orgbcod = bcod;
    bcod = replacebcod(bcod);

    options = QueryStringToJSON();
    tracking = (options.tracking || 'xhr');
    source = (options.src || '//buzz.st/v1/ads/'+bcod+'/vast');
    autoplay = options.autoplay === 'true';
    completionWindow = (options.completionWindow || 60);
    var beacon = false;
    var counter = 0;
    var player = flowplayer(domtarget, "/lib/flowplayer-3.2.18.swf", {
      plugins: {
        controls: null,
        ima: {
          url: "/lib/flowplayer.ima-3.2.7.swf"
        },
      },
      playlist: [{
        autoPlay: autoplay,
        provider: 'ima',
        url: source,
        onCuepoint: [[2000], 
        function(clip, cuepoint) { 
          counter += cuepoint;
          if(completionWindow != null && counter >= completionWindow*1000 && !beacon){
            var beaconEvent = new BeaconEvent("fl::comp"+completionWindow+"::"+bcod+"::");
            beaconEvent.sendBeacon(function(){});
            thirdpartyGet(options.bill);
            beacon = true;
          }
        }]
      }]
    });

    player.onStart(function(){
      var beaconEvent = new BeaconEvent("fl::start::"+bcod+"::");
      beaconEvent.sendBeacon(function(){});
      sendXHR(getThirdpartyUri(orgbcod, bcod));
      thirdpartyGet(options.start);
    });
    player.onFinish(function(){
      var beaconEvent = new BeaconEvent("fl::complete::"+bcod+"::");
      beaconEvent.sendBeacon(function(){});
      thirdpartyGet(options.end);
    });

  };

  function QueryStringToJSON() {
    var pairs = location.search.slice(1).split('&');
    var result = {};
    pairs.forEach(function(pair) {
      pair = pair.split('=');
      if(pair.length >= 1 && pair[1].length > 0){
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      }
    });
    return JSON.parse(JSON.stringify(result));
  }

  function thirdpartyGet(uri) {

    if(uri != null){
      switch(tracking) {
        case 'xhr':
          sendXHR(uri);
          break;
        case 'iframe':
          sendIframe(uri);
          break;
        case 'pixel':
          sendPixel(uri);
          break;
        default:
      }
    }
  }

  function sendXHR(uri){
    var req = new XMLHttpRequest();
    req.open('GET', uri , true);
    req.send();
  }

  function sendIframe(uri){
    var iframe = document.createElement('iframe');
    iframe.src = uri;
    iframe.width = 1;
    iframe.height = 1;
    document.body.appendChild(iframe);
  }

  function sendPixel(uri){
    var img = document.createElement('img');
    img.src = uri;
    img.width = 1;
    img.height = 1;
    document.body.appendChild(img);
  }

  return { 'initPlayer': initPlayer};

})(window);