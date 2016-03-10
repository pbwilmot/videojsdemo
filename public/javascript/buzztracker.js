var BuzzTracker = (function(){
	var tracking;
	var supportedTypes = ['xhr','iframe','pixel'];

	function BuzzTracker(trackingType){
		if(supportedTypes.indexOf(trackingType) >= 0){
			tracking = trackingType;
		} else {
			new TypeError("unsupported tracking type: "+trackingType);
		}
	}

	BuzzTracker.prototype.track = function(uri) {
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
	};

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
	return BuzzTracker;
})();