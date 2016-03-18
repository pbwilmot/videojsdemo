var BUZZADMANAGER = BUZZADMANAGER || (function(window) {
  'use strict';

  // Setup Vine creatives in the format : https://vine.co/v/#{VINE_ID}/embed/simple
  var VINE_STRING_ROOT = 'https://vine.co/v/';
  var VINE_STRING_SUFFIX = '/embed/simple';
  var pubtracker;
  var advtracker;

  var AD_TYPES = {
    VIDEO: 'VIDEO',
    YOUTUBE: 'YOUTUBE',
    VINE: 'VINE',
    TWITCH: 'TWITCH',
    VIDEO360: 'VIDEO360'
  };

  var adDiv;
  var adSettings;
  var src;
  var isMobile = false;

  var BuzzAdManager = function(id, mobile, settings) {
    adDiv = document.getElementById(id);
    isMobile = mobile;
    adSettings = settings;
    pubtracker = new BuzzTracker(adSettings.pub_tracking);
    advtracker = new BuzzTracker(adSettings.adv_tracking);
    makeAd(adDiv, adSettings.type, adSettings.src, adSettings);
};

var openSplash;

function toggleStartSplash(){
  if(adSettings.startsplash){
    var splashStyles = 'background-color: black; width: 100%; height: 100vh; background-position: center; background-repeat: no-repeat; background-size: contain; background-image: url("'+adSettings.startsplash+'")';
    openSplash = createOverlay(null, adDiv, 'start-splash', splashStyles);
  }
}

function toggleEndSplash(){
  if(adSettings.endsplash){
    removeElement('click-out');
    var endsplashStyles = 'background-color: black; width: 100%; height: 100vh; background-position: center; background-repeat: no-repeat; background-size: contain; background-image: url("'+adSettings.endsplash+'")';
    createOverlay(adSettings.clickouturl, adDiv, 'end-splash', endsplashStyles)
    .addEventListener('click', function(){
      playerControl('pause');
    });
  }
}

function removeElement(id){
  try {
    var overlay = document.getElementById(id);
    overlay.parentNode.removeChild(overlay);
  } catch(err){
  }
}

function toggleClickout(){
  removeElement('start-splash');
  createOverlay(adSettings.clickouturl, adDiv, 'click-out', "color: white; background-color: transparent; width: 100%; height: 80% ")
  .addEventListener('click', function(){
    removeElement('click-out');
    playerControl('pause');
  });
}

function createOverlay( clickurl, parent, id , styles ){
  var element = document.createElement('a');
  element.id = id;
  element.href = clickurl;
  element.target = "_blank";
  var defaultstyles = "z-index: 1; position: absolute;top: 0;left: 0px";
  element.style = defaultstyles + ";" + styles;
  parent.appendChild(element);
  return element;
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

function makeAd(adDiv, type, source, adSettings) {
  switch (type) {
    case AD_TYPES.YOUTUBE:
    addIFrame(adDiv, '', adSettings);
    src = source;
    return;
    case AD_TYPES.VINE:
      source = VINE_STRING_ROOT + source + VINE_STRING_SUFFIX;
      var audio = "1";
      if (adSettings.automute) {
        audio = "0";
      }
      source = updateQueryStringParams(source, "audio", audio);
      var autoplay = "1";
      if (!adSettings.autoplay) {
        autoplay = "0";
      }
      source = updateQueryStringParams(source, "autoplay", autoplay);
      break;
    case AD_TYPES.VIDEO:
      if(isMobile){
        window.document.getElementById('mobile-play-overlay').addEventListener('click', function(){
          loadIma(adDiv, type, source, adSettings);
          removeOverlay();
        });
      } else {
        loadIma(adDiv, type, source, adSettings);
      }
      parentWindow.addEventListener('remote-control', function(e){
        remoteControlEventHandler(e);
      }.bind(this), false);
    break;
    case AD_TYPES.TWITCH:
    src = source;
    loadTwitch(source);
    return;
  }
  src = source;
  addIFrame(adDiv, source, adSettings);
}

function pubTrackEvent(uri){ trackEvent(uri, pubtracker); }
function advTrackEvent(uri){ trackEvent(uri, advtracker); }

function trackEvent(uri, tracker){
  if(uri){
    waitUntil(
      function(){ return (typeof tracker == 'object'); },
      function(){ tracker.track(uri); }
    );
  }
}


function setOverlay(adDiv, poster){
  var img =  new Image();
  img.id = 'play';
  img.src = poster;
  img.style = 'margin:0; overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px; z-index:300000';
  adDiv.appendChild(img);
}

function removeOverlay(){
  var overlay = window.document.getElementById('mobile-play-overlay');
  overlay.parentNode.removeChild(overlay);
}

function loadIma(adDiv, type, source, adSettings){
  var ads = new Ads(source, adSettings.autoplay, adSettings.automute);
  imaplayer = ads.player;

  if(adSettings.audiohover){
    setHover(adDiv.id, ads.player, AD_TYPES.VIDEO);
  }
  if(adSettings.completionwindow && adSettings.bcod){
    waitUntil(
      function(){ return (typeof imaplayer.ima.getAdsManager() != 'undefined') && imaplayer.ima.getAdsManager().getCurrentAd(); },
      function(){ pollImaPlaytime(); }
      );
  }
}

function waitUntil(check, onComplete ,delay ,timeout) {
  if (check()) {
    onComplete();
    return;
  }
  if (!delay){ delay=100; }
  var timeoutPointer;
  var intervalPointer=setInterval(function () {
      if (!check()){ return; }
      clearInterval(intervalPointer);
      if (timeoutPointer){ clearTimeout(timeoutPointer); }
      onComplete();
    },delay);
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
    if(adSettings.startsplash && !adSettings.autoplay){
      toggleStartSplash();
      openSplash.addEventListener('click', function(e){
        e.preventDefault();
        playerControl('play');
      });
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
    if(adSettings.clickout){
      toggleClickout();
    }
    if (twitchPlaytime > 0) {
      parentWindow.postMessage("twitch::resume", "*");
    } else {
      parentWindow.postMessage("twitch::playing", "*");
      pubTrackEvent(adSettings.pub_start);
      advTrackEvent(adSettings.adv_start);
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
      setHover(player.l.id, player, AD_TYPES.YOUTUBE);
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
    firstquartile: false,
    billed: false
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
    if(!adm.getCurrentAd()){
      return;
    }
    var adlength = adm.getCurrentAd().getDuration();
    var played = 0;
    if (((adlength - remaining) > 0) && (remaining > 0)){
      played = (adlength - remaining);
    }
    var timewindow = 30;
    if (adSettings.completionwindow){
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

  function triggerBeacon(eventString, bcod){
    var fullEvent = eventString+"::"+bcod+"::";
    var beacon = new BeaconEvent(fullEvent);
    beacon.sendBeacon(function(){});
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
    var billwindow = adSettings.billwindow;

    if((twitchPlaytime >= billwindow) && !rcvStates.billed){
      triggerBeacon("twitch::comp"+billwindow, adSettings.bcod);
      advTrackEvent(adSettings.adv_bill);
      pubTrackEvent(adSettings.pub_bill);
      rcvStates.billed = true;
    }

    var windowTime = ( adSettings.completionwindow || 30);
    var progress = twitchPlaytime / windowTime;
    if (progress >= 1 && !rcvStates.complete) {
      parentWindow.postMessage("twitch::complete", "*");
      triggerBeacon("twitch::complete", adSettings.bcod);
      advTrackEvent(adSettings.adv_end);
      pubTrackEvent(adSettings.pub_end);
      rcvStates.complete = true;
      toggleEndSplash();
    }
    else if (progress >= 0.75 && !rcvStates.thirdquartile) {
      parentWindow.postMessage("twitch::thirdquartile", "*");
      triggerBeacon("twitch::thirdquart", adSettings.bcod);
      rcvStates.thirdquartile = true;
    }
    else if (progress >= 0.5 && !rcvStates.midpoint) {
      parentWindow.postMessage("twitch::midpoint", "*");
      triggerBeacon("twitch::midpoint", adSettings.bcod);
      rcvStates.midpoint = true;
    }
    else if (progress >= 0.25 && !rcvStates.firstquartile) {
      parentWindow.postMessage("twitch::firstquartile", "*");
      triggerBeacon("twitch::firstquart", adSettings.bcod);
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
        triggerBeacon("yt::resume", adSettings.bcod);
      } else {
        parentWindow.postMessage("yt::playing", "*");
        triggerBeacon("yt::playing", adSettings.bcod);
      }
      pollGetCurrentTime();
      break;
      case YT.PlayerState.PAUSED:
      parentWindow.postMessage("yt::paused", "*");
      triggerBeacon("yt::paused", adSettings.bcod);
      break;
      case YT.PlayerState.ENDED:
      parentWindow.postMessage("yt::complete", "*");
      triggerBeacon("yt::complete", adSettings.bcod);
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

  function playerControl(action){
    window.dispatchEvent(new CustomEvent('remote-control', { detail: { "action" : action }}));
  }
  window.initPlay = function(){ imaplayer.ima.initializeAdDisplayContainer(); };
  window.play = function() { playContent(); };
  window.addEventListener('remote-control', remoteControlEventHandler, false);
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  return {"BuzzAdManager": BuzzAdManager};
}(window));
