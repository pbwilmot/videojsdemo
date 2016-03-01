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

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

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

    if(!mobilecheck()){
      removeOverlay();
    }
    waitUntil(
      function() {
        return typeof Ads == "function";
      }, function() {
        if(mobilecheck()){
          window.document.getElementById('play').addEventListener('click', function(){
            loadIma(adDiv, type, source, adSettings, options);
            removeOverlay();
          });
        } else {
          loadIma(adDiv, type, source, adSettings, options);
        }
        parentWindow.addEventListener('remote-control', function(e){
          remoteControlEventHandler(e);
        }.bind(this), false);
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

function setOverlay(adDiv, options){
  var img =  new Image();
  img.id = 'play';
  img.src = options.poster;
  img.style = 'margin:0; overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px; z-index:300000';
  adDiv.appendChild(img);
}

function removeOverlay(){
  var overlay = window.document.getElementById('play');
  overlay.parentNode.removeChild(overlay);
}

function loadIma(adDiv, type, source, adSettings, options){
  var ads = new Ads(source, adSettings.autoplay, adSettings.automute);
  imaplayer = ads.player;


  if(adSettings.audiohover){
    setHover(adDiv.id, ads.player, AD_TYPES.VIDEO);
  }
  if((adSettings.completionwindow != null) && (adSettings.bcod != null)){
    waitUntil(
      function(){ return (typeof imaplayer.ima.getAdsManager() != 'undefined') && ( imaplayer.ima.getAdsManager().getCurrentAd() != null); },
      function(){ pollImaPlaytime(); }
      );
  }
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
    } else {
      parentWindow.postMessage("twitch::playing", "*");
    }
  }
  function twitchPauseEventHandler() {
    paused = true;
    parentWindow.postMessage("twitch::paused", "*");
  }
  function twitchEndedEventHandler() {
    parentWindow.postMessage("twitch::ended", "*");
  }
  function twitchOnlineEventHandler() {
    console.log('twitch video/stream online');
  }
  function twitchOfflineEventHandler() {
    parentWindow.postMessage("twitch::error", "*");
  }
  function twitchAdStartEventHandler() {
    parentWindow.postMessage("twitch::adstart", "*");
    inPrerollAd = true;
    adTime = tplayer.getCurrentTime();
  }
  function twitchAdEndEventHandler() {
    parentWindow.postMessage("twitch::adend", "*");
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
    if(adSettings.audiohover){
      setHover(player.m.id, player, AD_TYPES.YOUTUBE);
    }
    parentWindow.addEventListener('remote-control', function(e){
      remoteControlEventHandler(e);
    }.bind(this), false);

  }

  function onPlayerError(event) {
    // TODO: error handling
    parentWindow.postMessage("yt::error" + event.data);
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
      parentWindow.postMessage("yt::complete", "*");
      return;
    }
    else if (progress >= 0.75 && !rcvStates.thirdquartile) {
      parentWindow.postMessage("yt::thirdquartile", "*");
      rcvStates.thirdquartile = true;
    }
    else if (progress >= 0.5 && !rcvStates.midpoint) {
      parentWindow.postMessage("yt::midpoint", "*");
      rcvStates.midpoint = true;
    }
    else if (progress >= 0.25 && !rcvStates.firstquartile) {
      parentWindow.postMessage("yt::firstquartile", "*");
      rcvStates.firstquartile = true;
    }

    window.setTimeout(pollGetCurrentTime, 1000);
  }

  var sentBeacon = false;
  function pollImaPlaytime() {
    var adm = imaplayer.ima.getAdsManager();
    var remaining = adm.getRemainingTime();
    if(adm.getCurrentAd() == null){
      return;
    }
    var adlength = adm.getCurrentAd().getDuration();
    var played = 0;
    if (((adlength - remaining) > 0) && (remaining > 0)){
      played = (adlength - remaining);
    }
    var timewindow = 30;
    if (adSettings.completionwindow != null){
      timewindow = adSettings.completionwindow;
    }
    if (played > timewindow && !sentBeacon ){
      var beacon = new BeaconEvent("ima::complete"+timewindow+"::"+adSettings.bcod+"::"+played);
      sentBeacon = true;
      beacon.sendBeacon(function(){
      });
    }

    if( played < adlength ){
      setTimeout(function(){ pollImaPlaytime();}, 1000);
    }
  }

  var BeaconEvent = (function() {
    var _rawEvent, _btyp, _bcod, _bsrc, _bdat, _args;
    var _beaconURI = '//api.buzz.st/v1/track';

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

    var windowTime = 30;
    var progress = twitchPlaytime / windowTime;
    if (progress >= 1 && !rcvStates.complete) {
      parentWindow.postMessage("twitch::complete", "*");
      rcvStates.complete = true;
    }
    else if (progress >= 0.75 && !rcvStates.thirdquartile) {
      parentWindow.postMessage("twitch::thirdquartile", "*");
      rcvStates.thirdquartile = true;
    }
    else if (progress >= 0.5 && !rcvStates.midpoint) {
      parentWindow.postMessage("twitch::midpoint", "*");
      rcvStates.midpoint = true;
    }
    else if (progress >= 0.25 && !rcvStates.firstquartile) {
      parentWindow.postMessage("twitch::firstquartile", "*");
      rcvStates.firstquartile = true;
    }

    setTimeout(function(){pollTwitchPlayTime(false);}, 1000);
  }

  function onPlayerStateChange(event) {
    console.log(event.data);
    switch(event.data) {
      case YT.PlayerState.PLAYING:
      if (player.getCurrentTime() > 0) {
        parentWindow.postMessage("yt::resume", "*");
      } else {
        parentWindow.postMessage("yt::playing", "*");
      }
      pollGetCurrentTime();
      break;
      case YT.PlayerState.PAUSED:
      parentWindow.postMessage("yt::paused", "*");
      break;
      case YT.PlayerState.ENDED:
      parentWindow.postMessage("yt::ended", "*");
      break;
      default:
      console.log('unrecognized state');
    }
  }

  function playContent(){
    switch(adSettings.type) {
      case AD_TYPES.VIDEO:
      imaplayer.ima.resumeAd();
      break;
      case AD_TYPES.YOUTUBE:
      player.playVideo();
      break;
      case AD_TYPES.TWITCH:
      tplayer.play();
      break;
      default:
    }
  }

  function muteContent(){
    switch(adSettings.type) {
      case AD_TYPES.VIDEO:
      imaplayer.ima.getAdsManager().setVolume(0);
      break;
      case AD_TYPES.YOUTUBE:
      player.mute();
      break;
      case AD_TYPES.TWITCH:
      tplayer.setMuted(true);
      break;
      default:
    }
  }


  function unMuteContent(){
    switch(adSettings.type) {
      case AD_TYPES.VIDEO:
      imaplayer.ima.getAdsManager().setVolume(1);
      break;
      case AD_TYPES.YOUTUBE:
      player.unMute();
      break;
      case AD_TYPES.TWITCH:
      tplayer.setMuted(false);
      break;
      default:
    }
  }


  function pauseContent(){
    switch(adSettings.type) {
      case AD_TYPES.VIDEO:
      imaplayer.ima.pauseAd();
      break;
      case AD_TYPES.YOUTUBE:
      player.pauseVideo();
      break;
      case AD_TYPES.TWITCH:
      tplayer.pause();
      break;
      default:
    }
  }

  function remoteControlEventHandler(event){
    switch(event.detail.action) {
      case 'play':
      playContent();
      break;
      case 'pause':
      pauseContent();
      break;
      case 'mute':
      muteContent();
      break;
      case 'unmute':
      unMuteContent();
      break;
      default:
      break;
    }
  }
  window.initPlay = function(){ imaplayer.ima.initializeAdDisplayContainer(); }
  window.play = function() { playContent(); }
  window.addEventListener('remote-control', remoteControlEventHandler, false);
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  return {"BuzzAdManager": BuzzAdManager};
}(window));
