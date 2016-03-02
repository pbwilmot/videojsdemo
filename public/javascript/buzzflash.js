var BuzzFlash = (function(window) {

  var options, tracking, source, completionWindow, autoplay;
  var initPlayer = function (domtarget, bcod){
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