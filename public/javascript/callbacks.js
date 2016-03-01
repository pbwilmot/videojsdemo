window.addEventListener("message", handleEvent, false);
function eventJSON(rawEvent) {
}

var Event = (function() {
  var _rawEvent, _btyp, _bcod, _bsrc, _bdat, _args;
  var _beaconURI = '//api.buzz.st/v1/track';

  function Event(rawEvent) {
    _rawEvent = rawEvent;
    components = rawEvent.split("::");
    if (components.length >= 2) {
      _bsrc = components[0];
      _btyp = components[1];
      //_bcode = components[2];
      _bdat = components[2];
    } else {
      throw TypeError("can't parse event from raw event: " + rawEvent);
    }
  }

  Event.prototype.updateQueryParams = function(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  };

  Event.prototype.toJSONString = function() {
    return JSON.stringify(this.toJSON());
  };

  Event.prototype.toJSON = function() {
    return {
      // temporary since beacon only accepts vast right now
      "btyp": "vast" + _btyp[0].toUpperCase() + _btyp.slice(1, _btyp.length),
      "bcod": _bcod,
      "bsrc": _bsrc,
      "bdat": _args
    };
  };

  Event.prototype.buildRequestURI = function() {
    var jsonRepr = this.toJSON();
    var rv = _beaconURI;
    for (var k in jsonRepr) {
      rv = this.updateQueryParams(rv, k, jsonRepr[k]);
    }
    return rv;
  };

  Event.prototype.sendBeacon = function(callback) {
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
return Event;
})();

function handleEvent(e){
  var event = new Event(e.data);
  var type = event.toJSON().btyp.split('vast')[1];
  var metric = document.getElementById('event-' + type);
  if (metric) {
    metric.className += ' event-fired';
  }

  // event.sendBeacon(function() {console.log('success');});
}

// supported actions: {play|pause|mute|unmute}
function player(action, adType){
  window.dispatchEvent(new CustomEvent('remote-control', { detail: { "action" : action, "type": adType}}));
}
