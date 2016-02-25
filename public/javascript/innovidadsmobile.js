var Ads = function(tag) {
  this.placeholder = document.getElementById('ima-sample-placeholder');
  this.placeholder.addEventListener('click', this.bind(this, this.init));

  this.options = {
    id: 'content_video',
    adTagUrl: tag,
    nativeControlsForTouch: false
  };

  this.events = [
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
    google.ima.AdEvent.Type.CLICK,
    google.ima.AdEvent.Type.COMPLETE,
    google.ima.AdEvent.Type.FIRST_QUARTILE,
    google.ima.AdEvent.Type.LOADED,
    google.ima.AdEvent.Type.MIDPOINT,
    google.ima.AdEvent.Type.PAUSED,
    google.ima.AdEvent.Type.STARTED,
    google.ima.AdEvent.Type.THIRD_QUARTILE,
    google.ima.AdEvent.Type.THIRD_QUARTILE,
    google.ima.AdErrorEvent
  ];

  this.console = document.getElementById('ima-sample-console');
};

Ads.prototype.init = function() {
  // Create the player
  this.createPlayer();
  this.player = videojs('content_video');

  // Initialize the IMA plugin
  this.player.ima(
      this.options,
      this.bind(this, this.adsManagerLoadedCallback));
  this.player.ima.initializeAdDisplayContainer();

  // Request ads and play the video
  this.player.ima.requestAds();
  this.player.play();
};

Ads.prototype.createPlayer = function() {
  var dumbPlayer = document.createElement('video');
  dumbPlayer.id = 'content_video';
  dumbPlayer.className = 'video-js vjs-default-skin';
  dumbPlayer.setAttribute('width', '640px');
  dumbPlayer.setAttribute('height', '360px');
  var contentSrc = document.createElement('source');
  contentSrc.setAttribute('src', 'static/blank.mp4');
  contentSrc.setAttribute('type', 'video/mp4');
  dumbPlayer.appendChild(contentSrc);
  this.placeholder.parentNode.appendChild(dumbPlayer);
  this.placeholder.parentNode.removeChild(this.placeholder);
}

Ads.prototype.adsManagerLoadedCallback = function() {
  for (var index = 0; index < this.events.length; index++) {
    this.player.ima.addEventListener(
        this.events[index],
        this.bind(this, this.onAdEvent));
  }
  this.player.ima.start();
};

Ads.prototype.onAdEvent = function(event) {
  this.console.innerHTML =
      this.console.innerHTML + '<br/>Ad event: ' + event.type;
};

Ads.prototype.bind = function(thisObj, fn) {
  return function() {
    fn.apply(thisObj, arguments);
  };
};