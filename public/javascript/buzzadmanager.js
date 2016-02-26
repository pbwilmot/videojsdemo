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

var BuzzAdManager = function(id, opts) {
  adDiv = document.getElementById(id);
  var options = (opts || QueryStringToJSON());

  console.log(JSON.stringify(options));
  adSettings = makeAdSettings(options);
  console.log('Parsed adSettings : ' + JSON.stringify(adSettings));
  makeAd(adDiv, options.type, options.src, adSettings, options);
  // activateDiv(adDiv);
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

function makeAd(adDiv, type, source, adSettings, options) {
  switch (type) {
    case AD_TYPES.YOUTUBE:
      loadjscssfile(YOUTUBE_API, "js");
      addIFrame(adDiv, '', adSettings);
      src = source;
      return;
    case AD_TYPES.VINE:
      // Load Vine SDK
      loadjscssfile(VINE_SDK_PATH, "js");

      // set vine audio
      var audio = "1";
      if (typeof options.mute === 'undefined' && adSettings.automute) {
        audio = "0";
      }
      source = updateQueryStringParams(source, "audio", audio);

      var autoplay = "1";
      if (!adSettings.autoplay) {
        autoplay = "0";
      }
      source = updateQueryStringParams(source, "autoplay", autoplay);
    break;
    // Fall through to youtube and add the iframe
    case AD_TYPES.VIDEO:
    loadjscssfile(VIDEO_API, "js");
    waitUntil(
      function() {
        return typeof Ads == "function";
      }, function() {
        new Ads(source, adSettings.autoplay, adSettings.automute);
      });
    break;
    // Fall through to youtube and add the iframe
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


function loadjscssfile(filename, filetype) {
  console.log(filename);
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
  }


  function twitchPlayEventHandler() {
    paused = false;
    pollTwitchPlayTime(true);
    if (twitchPlaytime > 0) {
      parent.postMessage("twitch::resume", "*");
    } else {
      parent.postMessage("twitch::playing", "*");
    }
  }
  function twitchPauseEventHandler() {
    parent.postMessage("twitch::pause event handler::" + tplayer.getCurrentTime(), "*");
    paused = true;
    parent.postMessage("twitch::paused", "*");
  }
  function twitchEndedEventHandler() {
    parent.postMessage("twitch::ended", "*");
  }
  function twitchOnlineEventHandler() {
    console.log('twitch video/stream online');
  }
  function twitchOfflineEventHandler() {
    parent.postMessage("twitch::error", "*");
  }
  function twitchAdStartEventHandler() {
    parent.postMessage("twitch::adstart", "*");
    inPrerollAd = true;
    adTime = tplayer.getCurrentTime();
  }
  function twitchAdEndEventHandler() {
    parent.postMessage("twitch::adend", "*");
    inPrerollAd = false;
    adTime += (tplayer.getCurrentTime() - adTime);
    pollTwitchPlayTime(false);
  }


/*
  function activateDiv(adDiv) {
    var closeFrame = document.getElementById('close-iframe');
    var toggleSlider = document.getElementById('toggle-slider');
    var slider = document.getElementById('slider');
    var closeBtn = document.getElementById('toggle-close');
    var contentVideo = document.getElementById('content_video');
    var adMuted = false;

    toggleSlider.addEventListener('click', function(){
      showHide();
    });

    closeFrame.addEventListener('click', function() {
      showHide();
    });

    closeBtn.addEventListener('click', function() {
      toggleCloseBtn();
    });

    function showHide() {
      if (slider) {
        if (slider.style.height === '0px') {
          slider.style.height = 364;
        } else {
          slider.style.height = 0;
        }
      }
    }

    function toggleCloseBtn() {
      if (closeFrame.style.display === 'none') {
        closeFrame.style.display = 'block';
      } else {
        closeFrame.style.display = 'none';
      }
    }

    window.addEventListener('scroll', function() {
      startInView();
    });

    function startInView() {
      if (viewability.vertical(document.getElementById('slider')).value <= 0.50) {
      }
    }
  }
  */
  function BuzzIFrameLoaded(iframe, adSettings) {
    console.log('IFrame Loaded : ' + JSON.stringify(adSettings));
    var type = AD_TYPES.VINE;
    switch (adSettings.type) {
      case AD_TYPES.YOUTUBE:
      break;
      case AD_TYPES.VINE:
      break;
      case AD_TYPES.VIDEO:
      break;
      case AD_TYPES.TWITCH:
      break;
    }
  }

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player(adDiv, {
      videoId: src,
      events: {
        'onReady': function(event) {
          if(adSettings.autoplay) {
            player.playVideo();
          }
          if(adSettings.automute) {
            player.mute();
          }
        },
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    });
  }

  function onPlayerError(event) {
    // TODO: error handling
    parent.postMessage("yt::error" + event.data);
  }

  var rcvStates = {
    complete: false,
    thirdquartile: false,
    midpoint: false,
    firstquartile: false
  };
  function pollGetCurrentTime() {
    var progress = player.getCurrentTime() / player.getDuration();
    if (progress >= 1) {
      parent.postMessage("yt::complete", "*");
      return;
    }
    else if (progress >= 0.75 && !rcvStates.thirdquartile) {
      parent.postMessage("yt::thirdquartile", "*");
      rcvStates.thirdquartile = true;
    }
    else if (progress >= 0.5 && !rcvStates.midpoint) {
      parent.postMessage("yt::midpoint", "*");
      rcvStates.midpoint = true;
    }
    else if (progress >= 0.25 && !rcvStates.firstquartile) {
      parent.postMessage("yt::firstquartile", "*");
      rcvStates.firstquartile = true;
    }

    window.setTimeout(pollGetCurrentTime, 1000);
  }

  function pollTwitchPlayTime(restart){
    if (!restart){
      twitchPlaytime = tplayer.getCurrentTime() + prevTwitchPlaytime - adTime;
    }
    if (paused || inPrerollAd) {
      // kill poll when paused, save playtime
      prevTwitchPlaytime = twitchPlaytime;
      return;
    }

    var windowTime = 30;
    var progress = twitchPlaytime / windowTime;
    if (progress >= 1 && !rcvStates.complete) {
      parent.postMessage("twitch::complete", "*");
      rcvStates.complete = true;
    }
    else if (progress >= 0.75 && !rcvStates.thirdquartile) {
      parent.postMessage("twitch::thirdquartile", "*");
      rcvStates.thirdquartile = true;
    }
    else if (progress >= 0.5 && !rcvStates.midpoint) {
      parent.postMessage("twitch::midpoint", "*");
      rcvStates.midpoint = true;
    }
    else if (progress >= 0.25 && !rcvStates.firstquartile) {
      parent.postMessage("twitch::firstquartile", "*");
      rcvStates.firstquartile = true;
    }

    setTimeout(function(){pollTwitchPlayTime(false);}, 1000);
  }
  function onPlayerStateChange(event) {
    console.log(event.data);
    switch(event.data) {
      case YT.PlayerState.PLAYING:
        if (player.getCurrentTime() > 0) {
          parent.postMessage("yt::resume", "*");
        } else {
          parent.postMessage("yt::playing", "*");
        }
        pollGetCurrentTime();
        break;
      case YT.PlayerState.PAUSED:
        parent.postMessage("yt::paused", "*");
        break;
      case YT.PlayerState.ENDED:
        parent.postMessage("yt::ended", "*");
        break;
      default:
        console.log('unrecognized state');
    }
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  return {"BuzzAdManager": BuzzAdManager};
}(window));
