var BUZZADMANAGER = BUZZADMANAGER || (function(window) {
  'use strict';

var VINE_SDK_PATH = "https://platform.vine.co/static/scripts/embed.js";
var YOUTUBE_API = "https://www.youtube.com/iframe_api";

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
  makeAd(adDiv, options.type, options.src, adSettings);
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
  // iframe.width = "300px";
  // iframe.height = "300px";
  iframe.id = "randomid";
  // iframe.setAttribute("src", src);
  iframe.src = source;
  // iframe.onload = BuzzIFrameLoaded(iframe, adSettings);
  parent.appendChild(iframe);
}

function makeAd(adDiv, type, source, adSettings) {
  switch (type) {
    case AD_TYPES.YOUTUBE:
      loadjscssfile(YOUTUBE_API, "js");
      addIFrame(adDiv, '', adSettings);
      src = source;
      return;
    case AD_TYPES.VINE:
    // Load Vine SDK
    loadjscssfile(VINE_SDK_PATH, "js");
    if(adSettings.automute) {
      //TODO only add this if it doesn't already exist
      if(source.indexOf('?') > 0) {
        source += '&audio=1';
      } else {
        source += '?audio=1';
      }
    }
    break;
    // Fall through to youtube and add the iframe
    case AD_TYPES.VIDEO:
    break;
    // Fall through to youtube and add the iframe
    case AD_TYPES.TWITCH:
    // Fall through to youtube and add the iframe          
    break;
  }
  src = source;
  addIFrame(adDiv, source, adSettings);
}

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
    console.log('BOOP ' + src);
    player = new YT.Player(adDiv, {
      videoId: src,
      events: {
        'onReady': function(event) {
          console.log(event);
          if(adSettings.autoplay) {
            player.playVideo();
          }
          if(adSettings.automute) {
            player.mute();
          }
        }
      }
    });
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
return {
  "BuzzAdManager": BuzzAdManager
};
}(window));
