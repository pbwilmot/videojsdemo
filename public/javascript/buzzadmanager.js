'use strict';

const VINE_SDK_PATH = "https://platform.vine.co/static/scripts/embed.js";

const AD_TYPES = {
    VIDEO: 'VIDEO',
    YOUTUBE: 'YOUTUBE',
    VINE: 'VINE',
    TWITCH: 'TWITCH',
}

var BuzzAdManager = function(id, options) {
    var adDiv = document.getElementById(id);
    var options = (options || QueryStringToJSON());

    console.log(JSON.stringify(options));
    makeAd(adDiv, options.type, options.src);

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

function makeAd(adDiv, type, src) {
    switch (type) {
        case AD_TYPES.VIDEO:
            break;
        case AD_TYPES.VINE:
            // Load Vine SDK
            loadjscssfile(VINE_SDK_PATH, "js");
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
            adDiv.appendChild(iframe);
            break;
    }
}


function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
};

