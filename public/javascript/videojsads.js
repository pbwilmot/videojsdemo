var Ads = function(adTag, autoplay, automute) {

  console.log('AdManager created w/ tag: ' + adTag + ' : autoplay :' + autoplay + ' : automute :' + automute);
  this.adTag = adTag;
  this.autoplay = autoplay;
  this.automute = automute;
  this.player = videojs('content_video');

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
    google.ima.AdEvent.Type.RESUMED,
    google.ima.AdEvent.Type.STARTED,
    google.ima.AdEvent.Type.THIRD_QUARTILE
  ];

  this.player.ima(
      this.options,
      this.bind(this, this.adsManagerLoadedCallback));

  if(this.autoplay === true) {
    console.log('Autoplay starting');
    this.init();
  } else {
    console.log('Setting up Click to play listener');
    this.player.one(startEvent, this.bind(this, this.init));
  }
};

Ads.prototype.SAMPLE_AD_TAG = '//svastx.moatads.com/buzzstartervpaid67711111384/Buzzstarter128413474.xml';

Ads.prototype.init = function() {
  console.log('init called');
  if (this.adTag.value === '') {
    this.log('Error: no ad tag specified.  Using default tag');
  }
  this.player.ima.setContent(null, this.adTag || this.SAMPLE_AD_TAG, true);
  this.player.ima.requestAds();
  this.player.ima.initializeAdDisplayContainer();
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
  var grandparent = parent.parent;
  switch (event.type) {
    case google.ima.AdEvent.Type.LOADED:
      if(this.automute === true) {
        this.player.ima.getAdsManager().setVolume(0)
      }
      break;
    case google.ima.AdEvent.Type.STARTED:
      grandparent.postMessage("ima::playing", "*");
      break;
    case google.ima.AdEvent.Type.PAUSED:
      grandparent.postMessage("ima::paused", "*");
      break;
    case google.ima.AdEvent.Type.RESUMED:
      grandparent.postMessage("ima::resume", "*");
      break;
    case google.ima.AdEvent.Type.CLICK:
      grandparent.postMessage("ima::click", "*");
      break;
    case google.ima.AdEvent.Type.FIRST_QUARTILE:
      grandparent.postMessage("ima::firstquartile", "*");
      break;
    case google.ima.AdEvent.Type.MIDPOINT:
      grandparent.postMessage("ima::midpoint", "*");
      break;
    case google.ima.AdEvent.Type.THIRD_QUARTILE:
      grandparent.postMessage("ima::thirdquartile", "*");
      break;
    case google.ima.AdEvent.Type.COMPLETE:
      grandparent.postMessage("ima::complete", "*");
      break;
    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
      grandparent.postMessage("ima::alladscompleted", "*");
      break;
  }
};

Ads.prototype.log = function(message) {
  console.log(message);
};

Ads.prototype.bind = function(thisObj, fn) {
  return function() {
    fn.apply(thisObj, arguments);
  };
};
