var BuzzFlash = (function(window) {
  const dictionary = {
    "82WxOWdT7ZRR": [
    {bcod: "82WxOWdT2ZAg5", weight: 1},
    {bcod: "M21bX1qTRN3G7", weight: 2},
    {bcod: "Qe1b41lhPX5EG", weight: 2},
    {bcod: "O21bA17TlVVvB", weight: 2},
    {bcod: "omdZldMsPOZ2q", weight: 2},
    {bcod: "2rw8Gw2Fap50g", weight: 1},
    {bcod: "Dq1bm19ukL487", weight: 1},
    {bcod: "kmrGqrWskALrn", weight: 1}
    ],
    "M21bX1qTgRLaW": [
    {bcod: "5NLJBLRcQnEaA", weight: 1},
    {bcod: "Vr1bd1XFr5qMR", weight: 2},
    {bcod: "NB1bX1kh2eZaq", weight: 2},
    {bcod: "v7dMxdmfXjmLy", weight: 2},
    {bcod: "ypdwEd0TwjOO", weight: 2},
    {bcod: "BD1bJ1gcvDlQ", weight: 1},
    {bcod: "mmdX7dWsy0Wrl", weight: 1},
    {bcod: "2rw8Gw2FW2EVe", weight: 1}
    ],
    "X7Av9AjfdEr5J": [
    {bcod: "7N89O8dcOD97", weight: 1},
    {bcod: "Dq1bm19uJGqP", weight: 2},
    {bcod: "rodNGdMfJQbJy", weight: 2},
    {bcod: "BD1bJ1gckjpVe", weight: 2},
    {bcod: "X7Av9Ajf9bl0", weight: 2},
    {bcod: "AG1bv1df5B0L", weight: 1},
    {bcod: "Dq1bm19uPJrg", weight: 1},
    {bcod: "Wk1b91atGqWy3", weight: 1}
    ]
  };

  function replacebcod(bcod){

    if (!dictionary[bcod]){
      return bcod;
    }

    var = arr = dictionary[bcod];
    var rn = Math.floor(Math.random()*12);
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
  var initPlayer = function (domtarget, bcod){

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
          var req = new XMLHttpRequest();
          req.open('GET', uri , true);
          req.send();
          break;
        case 'iframe':
          var iframe = document.createElement('iframe');
          iframe.src = uri;
          iframe.width = 1;
          iframe.height = 1;
          document.body.appendChild(iframe);
          break;
        case 'pixel':
          var img = document.createElement('img');
          img.src = uri;
          img.width = 1;
          img.height = 1;
          document.body.appendChild(img);
          break;
        default:
      }
    }
  }

  return { 'initPlayer': initPlayer};

})(window);