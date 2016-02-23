'use strict';

var VINE_SDK_PATH = "https://platform.vine.co/static/scripts/embed.js";

var AD_TYPES = {
    VIDEO: 'VIDEO',
    YOUTUBE: 'YOUTUBE',
    VINE: 'VINE',
    TWITCH: 'TWITCH',
};

var BuzzAdManager = function(id, opts) {
    var adDiv = document.getElementById(id);
    var options = (opts || QueryStringToJSON());

    console.log(JSON.stringify(options));
    var adSettings = makeAdSettings(options);
    makeAd(adDiv, options.type, options.src, adSettings);
    activateDiv(adDiv);
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

function makeAdSettings(options) {
  var rv = {};

  var skipDuration = Number.parseInt(options.skipduration);
  if (skipDuration >= 0) {
    // add <span id="close-iframe">x</span>
  }

  if (options.autoplay === 'true') {
    rv.autoplay = true;
  }

  if (options.autosound === 'true') {
    rv.autosound = true;
  }

  if (options.autoclose === 'true') {
    rv.autoclose = true;
  }

  if (options.impressionpixel === 'true') {
    rv.impressionpixel = true;
  }

  return rv;
}

function makeAd(adDiv, type, src, adSettings) {
  switch (type) {
      case AD_TYPES.VINE:
          // Load Vine SDK
          loadjscssfile(VINE_SDK_PATH, "js");
          // Fall through to youtube and add the iframe
      case AD_TYPES.VIDEO:
          // Fall through to youtube and add the iframe
      case AD_TYPES.TWITCH:
          // Fall through to youtube and add the iframe
      case AD_TYPES.YOUTUBE:
          var iframe = document.createElement('iframe');
          iframe.frameBorder = 0;
          iframe.style.width = "100%";
          iframe.style.height = "100vh";
          iframe.id = "randomid";
          iframe.setAttribute("src", src);
          iframe.frameborder = "0";
          iframe.src = src;
          //<iframe data-ad-settings="{"autoplay": true}"></iframe>
          adDiv.appendChild(iframe);
          break;
  }
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