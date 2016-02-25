var Ads = function(tag) {
  console.log('ads loaded with tag : ' + tag);

  var player = videojs('content_video');

  var options = {
    id: 'content_video',
    adTagUrl: tag
  };

  var events = [
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
    google.ima.AdEvent.Type.CLICK,
    google.ima.AdEvent.Type.COMPLETE,
    google.ima.AdEvent.Type.FIRST_QUARTILE,
    google.ima.AdEvent.Type.LOADED,
    google.ima.AdEvent.Type.MIDPOINT,
    google.ima.AdEvent.Type.PAUSED,
    google.ima.AdEvent.Type.STARTED,
    google.ima.AdEvent.Type.THIRD_QUARTILE
  ];

  var bind = function(thisObj, fn) {
    return function() {
      fn.apply(thisObj, arguments);
    };
  };

  var adsManagerLoadedCallback = function() {
    log('adsManagerLoadedCallback')
    for (var index = 0; index < events.length; index++) {
      player.ima.addEventListener(
          events[index],
          bind(this, onAdEvent));
    }
    player.ima.start();
  };

  player.ima(
        options,
        bind(this, adsManagerLoadedCallback));

  var addTracker = function(path) {
    log('addTracker: ' + path)
    var img = new Image();
    var div = document.getElementById('content_video');

    img.onload = function() {
      div.appendChild(img);
    };

    img.src = path;
  }

  var onAdEvent = function(event) {
    log('Ad event: ' + event.type);
    switch(event.type) {
      case google.ima.AdEvent.Type.STARTED:
        log('AdStarted')
        addTracker('//clickserv.sitescout.com/conv/1b6b1eff2c522caf');
      break;
      case   google.ima.AdEvent.Type.COMPLETE:
        log('AdCompleted')
        addTracker('//clickserv.sitescout.com/conv/3a5d71631ff1e5df');
      break;
    }
  };

  var log = function(message) {
    // console.log(message);
  }

  // Remove controls from the player on iPad to stop native controls from stealing
  // our click
  var contentPlayer =  document.getElementById('content_video_html5_api');
  if ((navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) &&
      contentPlayer.hasAttribute('controls')) {
    contentPlayer.removeAttribute('controls');
  }

  // Initialize the ad container when the video player is clicked, but only the
  // first time it's clicked.
  var startEvent = 'click';
  if (navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) {
    console.log('Mobile device.  Setting StartEvent to be tap');
    startEvent = 'tap';
  }

  player.one(startEvent, function() {
      console.log('Start Event found');
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      player.play();
  });
}
