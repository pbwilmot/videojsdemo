/**
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var player = videojs('content_video');

var options = {
  id: 'content_video',
  adTagUrl: 'https://svastx.moatads.com/buzzstartervpaid67711111384/Buzzstarter128413474.xml'
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
  this.log('Ad event: ' + event.type);
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
  startEvent = 'tap';
}

player.one(startEvent, function() {
    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();
    player.play();
});