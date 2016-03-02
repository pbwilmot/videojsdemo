var BuzzFlash = (function() {

  var initPlayer = function (domtarget, source,  bcod, completionWindow){
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
        provider: 'ima',
        url: source,
        onCuepoint: [[2000], 
        function(clip, cuepoint) { 
          counter += cuepoint;
          if(counter >= completionWindow*1000 && !beacon){
            console.log("fl::comp"+completionWindow+"::"+bcod+"::");
            // var beaconEvent = new BeaconEvent("fl::comp"+completionWindow+"::"+bcod+"::");
            // beaconEvent.sendBeacon(function(){});
            beacon = true;
          }
        }]
      }]
    });

    player.onStart(function(){
      console.log("fl::start::"+bcod+"::");
        // var beaconEvent = new BeaconEvent("fl::start::"+bcod+"::");
        // beaconEvent.sendBeacon(function(){});
      });
    player.onFinish(function(){
      console.log("fl::complete::"+bcod+"::");
        // var beaconEvent = new BeaconEvent("fl::complete::"+bcod+"::");
        // beaconEvent.sendBeacon(function(){});
      });

  };

  return { 'initPlayer': initPlayer};

})();