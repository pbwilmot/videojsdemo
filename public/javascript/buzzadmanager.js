'use strict';

var BuzzAdManager = function(id, options) {
	var adDiv = document.getElementById(id);
	var options = (options || QueryStringToJSON());

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
	var iframe = document.createElement('iframe');
	iframe.frameBorder=0;
	iframe.width="100%";
	iframe.height="100vh";
	iframe.id="randomid";
	iframe.setAttribute("src", src);
	iframe.frameborder="0";

	switch(type) {
		case AD_TYPES.VIDEO:
		break;
		case AD_TYPES.YOUTUBE:
		break;
		case AD_TYPES.VINE:
		// Load Vine SDK
		break;
		case AD_TYPES.TWITCH:
		break;
	}
	adDiv.appendChild(iframe);
}

const AD_TYPES = {
    VIDEO: 'VIDEO',
    YOUTUBE: 'YOUTUBE',
    VINE: 'VINE',
    TWITCH: 'TWITCH',
}
