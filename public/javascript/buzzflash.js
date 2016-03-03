var BuzzFlash = (function(window) {
  const dictionary = {
    "82WxOWdT7ZRR": [
    {bcod: "JlJnbNZiNkQ74", weight: 1},
    {bcod: "eL9EJn7hAMvGx", weight: 2},
    {bcod: "qR99qJaTmkLB", weight: 2},
    {bcod: "L71PZgetmWmkj", weight: 2},
    {bcod: "gbQaVX0t2qq2", weight: 2},
    {bcod: "mwJdroRfyBL01", weight: 1},
    {bcod: "Vnv3GryU5EZ4Q", weight: 1},
    {bcod: "EdWeyPLcNZAgN", weight: 1}
    ],
    "M21bX1qTgRLaW": [
    {bcod: "QZQAbwMHbwEJ0", weight: 1},
    {bcod: "4vg7AyGSL0l3x", weight: 2},
    {bcod: "DXMMeLZhMW48G", weight: 2},
    {bcod: "dDdxBQWcGjPdZ", weight: 2},
    {bcod: "ybkN1ratyeLnM", weight: 2},
    {bcod: "LkD1Q9EU2BlQg", weight: 1},
    {bcod: "dJNAwg4UGbeAW", weight: 1},
    {bcod: "rkwmg45SJdMao", weight: 1}
    ],
    "X7Av9AjfdEr5J": [
    {bcod: "Anm5bp7SDmDyl", weight: 1},
    {bcod: "PpLvwZDHGEXDQ", weight: 2},
    {bcod: "WoNNnV8TM9pDW", weight: 2},
    {bcod: "apdx2QjiVmaq8", weight: 2},
    {bcod: "3ewPDjqfpM08k", weight: 2},
    {bcod: "0B2O3DnHkRlVW", weight: 1},
    {bcod: "08yVvR3tlD3w", weight: 1},
    {bcod: "Z5wEWLMTj3Xj3", weight: 1}
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