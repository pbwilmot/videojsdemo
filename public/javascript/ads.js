var Ads = function() {

  this.player = videojs('content_video');

  this.adTagInput = document.getElementById('tagInput');
  this.sampleAdTag = document.getElementById('sampleAdTag');
  this.sampleAdTag.addEventListener(
      'click',
      this.bind(this, this.onSampleAdTagClick_),
      false);

  // Remove controls from the player on iPad to stop native controls from stealing
  // our click
  var contentPlayer =  document.getElementById('content_video_html5_api');
  if ((navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/Android/i)) &&
      contentPlayer.hasAttribute('controls')) {
    contentPlayer.removeAttribute('controls');
  }

  // Start ads when the video player is clicked, but only the first time it's
  // clicked.
  var startEvent = 'click';
  if (navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) {
    startEvent = 'tap';
  }
  this.player.one(startEvent, this.bind(this, this.init));

  this.options = {
    id: 'content_video'
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
    google.ima.AdEvent.Type.THIRD_QUARTILE
  ];

  this.player.ima(
      this.options,
      this.bind(this, this.adsManagerLoadedCallback));
};

Ads.prototype.SAMPLE_AD_TAG = '//svastx.moatads.com/buzzstartervpaid67711111384/Buzzstarter128413474.xml';

Ads.prototype.init = function() {
  this.player.ima.initializeAdDisplayContainer();
  if (this.adTagInput.value == '') {
    this.log('Error: no ad tag specified.  Using default tag');
    this.player.ima.setContent(null, this.SAMPLE_AD_TAG, true);
  } else {
    this.player.ima.setContent(null, this.adTagInput.value, true);
  }
  this.player.ima.requestAds();
  this.player.play();
};

Ads.prototype.onSampleAdTagClick_ = function() {
  this.adTagInput.value = this.SAMPLE_AD_TAG;
};

Ads.prototype.adsManagerLoadedCallback = function() {
  for (var index = 0; index < this.events.length; index++) {
    this.player.ima.addEventListener(
        this.events[index],
        this.bind(this, this.onAdEvent));
  }
  this.player.ima.start();
};

Ads.prototype.onAdEvent = function(event) {
  this.log('Ad event: ' + event.type);
};

Ads.prototype.log = function(message) {
  console.log(message)
}

Ads.prototype.bind = function(thisObj, fn) {
  return function() {
    fn.apply(thisObj, arguments);
  };
};

