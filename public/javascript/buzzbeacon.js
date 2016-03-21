var BeaconEvent = (function() {
    var _rawEvent, _btyp, _bcod, _bsrc, _bdat;
    var _beaconURI = '//api.buzz.st/v1/track';
    var _metricsURI = '//metrics.buzz.st/v0/track';

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

      BeaconEvent.prototype.buildMetricURI = function() {
        var jsonRepr = this.toJSON();
        var rv = _metricsURI;
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
        try {
          this.sendMetrics();
        } catch (e) {
          console.log(e);
        }
      };

      BeaconEvent.prototype.sendMetrics = function() {
        // async perform beacon GET /v0/track
        var req = new XMLHttpRequest();
        req.open('GET', this.buildMetricURI(), true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(this.toJSONString());
      };


    return BeaconEvent;
})();
