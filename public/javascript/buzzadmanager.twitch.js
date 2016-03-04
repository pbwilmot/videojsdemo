var BUZZADMANAGER = BUZZADMANAGER || (function(window) {
  'use strict';

  var VINE_SDK_PATH = "https://platform.vine.co/static/scripts/embed.js";
  var YOUTUBE_API = "https://www.youtube.com/iframe_api";
  var TWITCH_API = "http://player.twitch.tv/js/embed/v1.js";
  var VIDEO_API = "/static/javascript/videojsads.js";


  var AD_TYPES = {
    VIDEO: 'VIDEO',
    YOUTUBE: 'YOUTUBE',
    VINE: 'VINE',
    TWITCH: 'TWITCH',
  };

  var adDiv;
  var adSettings;
  var src;
  var tracking;
  var options;

  var windowTime;

  var BuzzAdManager = function(id) {
    adDiv = document.getElementById(id);
    options = QueryStringToJSON();
    adSettings = makeAdSettings(options);
    tracking = (options.tracking || 'xhr');
    windowTime = (options.completionwindow || 30 );
    makeAd(adDiv, options.type, options.src, adSettings, options);
};

/**
 *
 */
 function QueryStringToJSON() {
  var pairs = location.search.slice(1).split('&');

  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
}

function updateQueryStringParams(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function makeAdSettings(options) {
  var rv = {};

  var skipDuration = Number.parseInt(options.skipduration);
  if (skipDuration >= 0) {
    // add <span id="close-iframe">x</span>
  }
  rv.bcod = options.bcod
  rv.completionwindow = options.completionwindow
  rv.audiohover =  (options.audiohover === 'true')
  rv.autoplay = (options.autoplay === 'true');
  rv.automute = (options.automute === 'true');
  rv.autoclose = (options.autoclose === 'true');
  rv.impressionpixel = (options.impressionpixel === 'true');
  rv.type = options.type;

  return rv;
}

function addIFrame(parent, source, adSettings) {
  var iframe = document.createElement('iframe');
  iframe.frameBorder = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100vh";
  iframe.id = "randomid";
  iframe.src = source;
  parent.appendChild(iframe);
}
var imaplayer;

function makeAd(adDiv, type, source, adSettings, options) {
  switch (type) {
    case AD_TYPES.TWITCH:
    loadjscssfile(TWITCH_API,"js");
    src = source;
    waitUntil(
      function() {
        return typeof Twitch == "object";},
        function() {loadTwitch(source);}
        );
    return;
  }
  src = source;
  addIFrame(adDiv, source, adSettings);
}

function waitUntil(check,onComplete,delay,timeout) {
  // if the check returns true, execute onComplete immediately
  if (check()) {
    onComplete();
    return;
  }

  if (!delay) delay=100;

  var timeoutPointer;
  var intervalPointer=setInterval(function () {
      if (!check()) return; // if check didn't return true, means we need another check in the next interval

      // if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
      clearInterval(intervalPointer);
      if (timeoutPointer) clearTimeout(timeoutPointer);
      onComplete();
    },delay);
  // if after timeout milliseconds function doesn't return true, abort
  if (timeout) timeoutPointer=setTimeout(function () {
    clearInterval(intervalPointer);
  },timeout);
}

function getTopLevelWindow() {
    var currentWindow = window;
    while( currentWindow.parent != currentWindow ) {
        currentWindow = currentWindow.parent;
        if (typeof currentWindow.parent == 'undefined'){
            return currentWindow.ownerDocument.defaultView;
          }
        }
        return currentWindow;
      }
      var parentWindow = getTopLevelWindow();

      function loadjscssfile(filename, filetype) {
        var fileref;
    if (filetype == "js") { //if filename is a external JavaScript file
      fileref = document.createElement('script');
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filename);
    } else if (filetype == "css") { //if filename is an external CSS file
      fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref);
  }

  var tplayer;
  var twitchPlaytime = 0;
  var prevTwitchPlaytime = 0;
  var paused = false;
  var inPrerollAd = false;
  var adTime = 0;
  function loadTwitch(channel){
    var options = {
      autoplay: false,
      muted: adSettings.automute,
      channel: channel
    };
    tplayer = new Twitch.Player(adDiv, options);
    if (adDiv.children.length > 0) {
      adDiv.children[0].style = "height:100vh; width: 100%";
    }

    tplayer.addEventListener("play", twitchPlayEventHandler);
    tplayer.addEventListener("pause", twitchPauseEventHandler);
    tplayer.addEventListener("ended", twitchEndedEventHandler);
    tplayer.addEventListener("online", twitchOnlineEventHandler);
    tplayer.addEventListener("offline", twitchOfflineEventHandler);
    tplayer.addEventListener("adstart", twitchAdStartEventHandler);
    tplayer.addEventListener("adend", twitchAdEndEventHandler);

    if (adSettings.autoplay) {
      tplayer.play();
    }
    if(adSettings.audiohover){
      setHover(adDiv.id, tplayer, AD_TYPES.TWITCH);
    }
    parentWindow.addEventListener('remote-control', function(e){
      remoteControlEventHandler(e);
    }.bind(this), false);
  }

  function setHover(elementId, vplayer, playerType){
    var element = window.document.getElementById(elementId);
    switch(playerType){
      case AD_TYPES.YOUTUBE:
      element.onmouseenter = function(){ vplayer.unMute(); };
      element.onmouseleave = function(){ vplayer.mute(); };
      break;
      case AD_TYPES.VIDEO:
      element.onmouseenter = function(){ vplayer.ima.getAdsManager().setVolume(1); };
      element.onmouseleave = function(){ vplayer.ima.getAdsManager().setVolume(0); };
      break;
      case AD_TYPES.TWITCH:
      element.onmouseenter = function(){ vplayer.setMuted(false); };
      element.onmouseleave = function(){ vplayer.setMuted(true); };
      break;
      default:
      console.log('unknown sethover for video type '+playerType);
    }
  }

  function twitchPlayEventHandler() {
    paused = false;
    pollTwitchPlayTime(true);
    if (twitchPlaytime > 0) {
      parentWindow.postMessage("twitch::resume", "*");
      var beacon = new BeaconEvent("twitch::resume::"+adSettings.bcod+"::");
      sentBeacon = true;
      beacon.sendBeacon(function(){});
    } else {
      thirdpartyGet(options.start);
      parentWindow.postMessage("twitch::playing", "*");
      var beacon = new BeaconEvent("twitch::playing::"+adSettings.bcod+"::");
      sentBeacon = true;
      beacon.sendBeacon(function(){});
    }
  }
  function twitchPauseEventHandler() {
    paused = true;
    parentWindow.postMessage("twitch::paused", "*");
    var beacon = new BeaconEvent("twitch::paused::"+adSettings.bcod+"::");
    sentBeacon = true;
    beacon.sendBeacon(function(){});
  }
  function twitchEndedEventHandler() {
    parentWindow.postMessage("twitch::ended", "*");
        var beacon = new BeaconEvent("twitch::ended::"+adSettings.bcod+"::");
    sentBeacon = true;
    beacon.sendBeacon(function(){});
  }
  function twitchOnlineEventHandler() {
    console.log('twitch video/stream online');
  }
  function twitchOfflineEventHandler() {
    parentWindow.postMessage("twitch::error", "*");
  }
  function twitchAdStartEventHandler() {
    parentWindow.postMessage("twitch::adstart", "*");
        var beacon = new BeaconEvent("twitch::adstart::"+adSettings.bcod+"::");
    sentBeacon = true;
    beacon.sendBeacon(function(){});
    inPrerollAd = true;
    adTime = tplayer.getCurrentTime();
  }
  function twitchAdEndEventHandler() {
    parentWindow.postMessage("twitch::adend", "*");
    var beacon = new BeaconEvent("twitch::adend::"+adSettings.bcod+"::");
    sentBeacon = true;
    beacon.sendBeacon(function(){});
    inPrerollAd = false;
    adTime += (tplayer.getCurrentTime() - adTime);
    pollTwitchPlayTime(false);
  }



  var rcvStates = {
    complete: false,
    thirdquartile: false,
    midpoint: false,
    firstquartile: false
  };

  var sentBeacon = false;
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


  var BeaconEvent = (function() {
  var _rawEvent, _btyp, _bcod, _bsrc, _bdat, _args;
  var _beaconURI = '//gor.buzz.st/v1/track';

  function BeaconEvent(rawEvent) {
    _rawEvent = rawEvent;
    var components = rawEvent.split("::");
    if (components.length >= 2) {
      _bsrc = components[0];
      _btyp = components[1];
      _bcod = components[2];
      _bdat = components[3];
    } else {
      throw TypeError("can't parse event from raw event: " + rawEvent);
    }
  }

  BeaconEvent.prototype.updateQueryParams = function(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  };

  BeaconEvent.prototype.toJSONString = function() {
    return JSON.stringify(this.toJSON());
  };

  BeaconEvent.prototype.toJSON = function() {
    return {
      // temporary since beacon only accepts vast right now
      "btyp": _btyp,
      "bcod": _bcod,
      "bsrc": _bsrc,
      "bdat": _bdat
    };
  };

  BeaconEvent.prototype.buildRequestURI = function() {
    var jsonRepr = this.toJSON();
    var rv = _beaconURI;
    for (var k in jsonRepr) {
      rv = this.updateQueryParams(rv, k, jsonRepr[k]);
    }
    return rv;
  };

  BeaconEvent.prototype.sendBeacon = function(callback) {
    // async perform beacon GET /v1/track
    var req = new XMLHttpRequest();
    req.open('GET', this.buildRequestURI(), true);
    req.onreadystatechange = function() {
      // call callback upon success
      if (typeof callback === 'function' && req.status == 201) {
        callback();
      }
    };
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(this.toJSONString());
  };
return BeaconEvent;
})();


  function pollTwitchPlayTime(restart){
    if (!restart){
      twitchPlaytime = tplayer.getCurrentTime() + prevTwitchPlaytime - adTime;
    }
    if (paused || inPrerollAd) {
      // kill poll when paused, save playtime
      prevTwitchPlaytime = twitchPlaytime;
      return;
    }

    var progress = twitchPlaytime / windowTime;
    if (progress >= 1 && !rcvStates.complete) {
      parentWindow.postMessage("twitch::complete", "*");
      var beacon = new BeaconEvent("twitch::complete::"+adSettings.bcod+"::");
      sentBeacon = true;
      beacon.sendBeacon(function(){});
      thirdpartyGet(options.end);
      rcvStates.complete = true;
    }
    else if (progress >= 0.75 && !rcvStates.thirdquartile) {
      parentWindow.postMessage("twitch::thirdquart", "*");
      var beacon = new BeaconEvent("twitch::thirdquart::"+adSettings.bcod+"::");
      sentBeacon = true;
      beacon.sendBeacon(function(){});
      rcvStates.thirdquartile = true;
    }
    else if (progress >= 0.5 && !rcvStates.midpoint) {
      parentWindow.postMessage("twitch::midpoint", "*");
      var beacon = new BeaconEvent("twitch::midpoint::"+adSettings.bcod+"::");
      sentBeacon = true;
      beacon.sendBeacon(function(){});
      rcvStates.midpoint = true;
    }
    else if (progress >= 0.25 && !rcvStates.firstquartile) {
      parentWindow.postMessage("twitch::firstquart", "*");
      // debugger;
      var beacon = new BeaconEvent("twitch::firstquart::"+adSettings.bcod+"::");
      sentBeacon = true;
      beacon.sendBeacon(function(){});
      rcvStates.firstquartile = true;
    }

    setTimeout(function(){pollTwitchPlayTime(false);}, 1000);
  }


  return {"BuzzAdManager": BuzzAdManager};
}(window));
