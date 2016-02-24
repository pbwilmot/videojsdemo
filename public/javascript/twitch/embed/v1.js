!
function(t, e) {
  function n(t) {
    for (var e = {
      strictMode: !1,
      key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
      q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    }, n = e.parser[e.strictMode ? "strict" : "loose"].exec(t), r = {}, i = 14; i--;) r[e.key[i]] = n[i] || "";
    return r[e.q.name] = {}, r[e.key[12]].replace(e.q.parser, function(t, n, i) {
      n && (r[e.q.name][n] = i)
    }), r
  }(function() {
    "use strict";

    function t() {}
    function e(t, e) {
      for (var n = t.length; n--;) if (t[n].listener === e) return n;
      return -1
    }
    function n(t) {
      return function() {
        return this[t].apply(this, arguments)
      }
    }
    var r = t.prototype,
        i = this,
        o = i.EventEmitter;
    r.getListeners = function(t) {
      var e, n, r = this._getEvents();
      if (t instanceof RegExp) {
        e = {};
        for (n in r) r.hasOwnProperty(n) && t.test(n) && (e[n] = r[n])
      } else e = r[t] || (r[t] = []);
      return e
    }, r.flattenListeners = function(t) {
      var e, n = [];
      for (e = 0; e < t.length; e += 1) n.push(t[e].listener);
      return n
    }, r.getListenersAsObject = function(t) {
      var e, n = this.getListeners(t);
      return n instanceof Array && (e = {}, e[t] = n), e || n
    }, r.addListener = function(t, n) {
      var r, i = this.getListenersAsObject(t),
          o = "object" == typeof n;
      for (r in i) i.hasOwnProperty(r) && -1 === e(i[r], n) && i[r].push(o ? n : {
        listener: n,
        once: !1
      });
      return this
    }, r.on = n("addListener"), r.addOnceListener = function(t, e) {
      return this.addListener(t, {
        listener: e,
        once: !0
      })
    }, r.once = n("addOnceListener"), r.defineEvent = function(t) {
      return this.getListeners(t), this
    }, r.defineEvents = function(t) {
      for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
      return this
    }, r.removeListener = function(t, n) {
      var r, i, o = this.getListenersAsObject(t);
      for (i in o) o.hasOwnProperty(i) && (r = e(o[i], n), -1 !== r && o[i].splice(r, 1));
      return this
    }, r.off = n("removeListener"), r.addListeners = function(t, e) {
      return this.manipulateListeners(!1, t, e)
    }, r.removeListeners = function(t, e) {
      return this.manipulateListeners(!0, t, e)
    }, r.manipulateListeners = function(t, e, n) {
      var r, i, o = t ? this.removeListener : this.addListener,
          u = t ? this.removeListeners : this.addListeners;
      if ("object" != typeof e || e instanceof RegExp) for (r = n.length; r--;) o.call(this, e, n[r]);
      else
      for (r in e) e.hasOwnProperty(r) && (i = e[r]) && ("function" == typeof i ? o.call(this, r, i) : u.call(this, r, i));
      return this
    }, r.removeEvent = function(t) {
      var e, n = typeof t,
          r = this._getEvents();
      if ("string" === n) delete r[t];
      else if (t instanceof RegExp) for (e in r) r.hasOwnProperty(e) && t.test(e) && delete r[e];
      else delete this._events;
      return this
    }, r.removeAllListeners = n("removeEvent"), r.emitEvent = function(t, e) {
      var n, r, i, o, u = this.getListenersAsObject(t);
      for (i in u) if (u.hasOwnProperty(i)) for (r = u[i].length; r--;) n = u[i][r], n.once === !0 && this.removeListener(t, n.listener), o = n.listener.apply(this, e || []), o === this._getOnceReturnValue() && this.removeListener(t, n.listener);
      return this
    }, r.trigger = n("emitEvent"), r.emit = function(t) {
      var e = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(t, e)
    }, r.setOnceReturnValue = function(t) {
      return this._onceReturnValue = t, this
    }, r._getOnceReturnValue = function() {
      return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, r._getEvents = function() {
      return this._events || (this._events = {})
    }, t.noConflict = function() {
      return i.EventEmitter = o, t
    }, "function" == typeof define && define.amd ? define(function() {
      return t
    }) : "object" == typeof module && module.exports ? module.exports = t : i.EventEmitter = t
  }).call(this), function(t, e, n) {
    e[t] = e[t] || n(), "undefined" != typeof module && module.exports ? module.exports = e[t] : "function" == typeof define && define.amd && define(function() {
      return e[t]
    })
  }("Promise", "undefined" != typeof global ? global : this, function() {
    "use strict";

    function t(t, e) {
      p.add(t, e), l || (l = d(p.drain))
    }
    function e(t) {
      var e, n = typeof t;
      return null == t || "object" != n && "function" != n || (e = t.then), "function" == typeof e ? e : !1
    }
    function n() {
      for (var t = 0; t < this.chain.length; t++) r(this, 1 === this.state ? this.chain[t].success : this.chain[t].failure, this.chain[t]);
      this.chain.length = 0
    }
    function r(t, n, r) {
      var i, o;
      try {
        n === !1 ? r.reject(t.msg) : (i = n === !0 ? t.msg : n.call(void 0, t.msg), i === r.promise ? r.reject(TypeError("Promise-chain cycle")) : (o = e(i)) ? o.call(i, r.resolve, r.reject) : r.resolve(i))
      } catch (u) {
        r.reject(u)
      }
    }
    function i(r) {
      var u, c, s = this;
      if (!s.triggered) {
        s.triggered = !0, s.def && (s = s.def);
        try {
          (u = e(r)) ? (c = new a(s), u.call(r, function() {
            i.apply(c, arguments)
          }, function() {
            o.apply(c, arguments)
          })) : (s.msg = r, s.state = 1, s.chain.length > 0 && t(n, s))
        } catch (f) {
          o.call(c || new a(s), f)
        }
      }
    }
    function o(e) {
      var r = this;
      r.triggered || (r.triggered = !0, r.def && (r = r.def), r.msg = e, r.state = 2, r.chain.length > 0 && t(n, r))
    }
    function u(t, e, n, r) {
      for (var i = 0; i < e.length; i++)!
      function(i) {
        t.resolve(e[i]).then(function(t) {
          n(i, t)
        }, r)
      }(i)
    }
    function a(t) {
      this.def = t, this.triggered = !1
    }
    function c(t) {
      this.promise = t, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
    }
    function s(e) {
      if ("function" != typeof e) throw TypeError("Not a function");
      if (0 !== this.__NPO__) throw TypeError("Not a promise");
      this.__NPO__ = 1;
      var r = new c(this);
      this.then = function(e, i) {
        var o = {
          success: "function" == typeof e ? e : !0,
          failure: "function" == typeof i ? i : !1
        };
        return o.promise = new this.constructor(function(t, e) {
          if ("function" != typeof t || "function" != typeof e) throw TypeError("Not a function");
          o.resolve = t, o.reject = e
        }), r.chain.push(o), 0 !== r.state && t(n, r), o.promise
      }, this["catch"] = function(t) {
        return this.then(void 0, t)
      };
      try {
        e.call(void 0, function(t) {
          i.call(r, t)
        }, function(t) {
          o.call(r, t)
        })
      } catch (u) {
        o.call(r, u)
      }
    }
    var f, l, p, h = Object.prototype.toString,
        d = "undefined" != typeof setImmediate ?
        function(t) {
        return setImmediate(t)
        } : setTimeout;
    try {
      Object.defineProperty({}, "x", {}), f = function(t, e, n, r) {
        return Object.defineProperty(t, e, {
          value: n,
          writable: !0,
          configurable: r !== !1
        })
      }
    } catch (v) {
      f = function(t, e, n) {
        return t[e] = n, t
      }
    }
    p = function() {
      function t(t, e) {
        this.fn = t, this.self = e, this.next = void 0
      }
      var e, n, r;
      return {
        add: function(i, o) {
          r = new t(i, o), n ? n.next = r : e = r, n = r, r = void 0
        },
        drain: function() {
          var t = e;
          for (e = n = l = void 0; t;) t.fn.call(t.self), t = t.next
        }
      }
    }();
    var g = f({}, "constructor", s, !1);
    return f(s, "prototype", g, !1), f(g, "__NPO__", 0, !1), f(s, "resolve", function(t) {
      var e = this;
      return t && "object" == typeof t && 1 === t.__NPO__ ? t : new e(function(e, n) {
        if ("function" != typeof e || "function" != typeof n) throw TypeError("Not a function");
        e(t)
      })
    }), f(s, "reject", function(t) {
      return new this(function(e, n) {
        if ("function" != typeof e || "function" != typeof n) throw TypeError("Not a function");
        n(t)
      })
    }), f(s, "all", function(t) {
      var e = this;
      return "[object Array]" != h.call(t) ? e.reject(TypeError("Not an array")) : 0 === t.length ? e.resolve([]) : new e(function(n, r) {
        if ("function" != typeof n || "function" != typeof r) throw TypeError("Not a function");
        var i = t.length,
            o = Array(i),
            a = 0;
        u(e, t, function(t, e) {
          o[t] = e, ++a === i && n(o)
        }, r)
      })
    }), f(s, "race", function(t) {
      var e = this;
      return "[object Array]" != h.call(t) ? e.reject(TypeError("Not an array")) : new e(function(n, r) {
        if ("function" != typeof n || "function" != typeof r) throw TypeError("Not a function");
        u(e, t, function(t, e) {
          n(e)
        }, r)
      })
    }), s
  }), function() {
    function t(t) {
      function e(e, n, r, i, o, u) {
        for (; o >= 0 && u > o; o += t) {
          var a = i ? i[o] : o;
          r = n(r, e[a], a, e)
        }
        return r
      }
      return function(n, r, i, o) {
        r = b(r, o, 4);
        var u = !k(n) && m.keys(n),
            a = (u || n).length,
            c = t > 0 ? 0 : a - 1;
        return arguments.length < 3 && (i = n[u ? u[c] : c], c += t), e(n, r, i, u, c, a)
      }
    }
    function e(t) {
      return function(e, n, r) {
        n = w(n, r);
        for (var i = O(e), o = t > 0 ? 0 : i - 1; o >= 0 && i > o; o += t) if (n(e[o], o, e)) return o;
        return -1
      }
    }
    function n(t, e, n) {
      return function(r, i, o) {
        var u = 0,
            a = O(r);
        if ("number" == typeof o) t > 0 ? u = o >= 0 ? o : Math.max(o + a, u) : a = o >= 0 ? Math.min(o + 1, a) : o + a + 1;
        else if (n && o && a) return o = n(r, i), r[o] === i ? o : -1;
        if (i !== i) return o = e(f.call(r, u, a), m.isNaN), o >= 0 ? o + u : -1;
        for (o = t > 0 ? u : a - 1; o >= 0 && a > o; o += t) if (r[o] === i) return o;
        return -1
      }
    }
    function r(t, e) {
      var n = P.length,
          r = t.constructor,
          i = m.isFunction(r) && r.prototype || a,
          o = "constructor";
      for (m.has(t, o) && !m.contains(e, o) && e.push(o); n--;) o = P[n], o in t && t[o] !== i[o] && !m.contains(e, o) && e.push(o)
    }
    var i = this,
        o = i._,
        u = Array.prototype,
        a = Object.prototype,
        c = Function.prototype,
        s = u.push,
        f = u.slice,
        l = a.toString,
        p = a.hasOwnProperty,
        h = Array.isArray,
        d = Object.keys,
        v = c.bind,
        g = Object.create,
        y = function() {},
        m = function(t) {
        return t instanceof m ? t : this instanceof m ? void(this._wrapped = t) : new m(t)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : i._ = m, m.VERSION = "1.8.3";
    var b = function(t, e, n) {
      if (void 0 === e) return t;
      switch (null == n ? 3 : n) {
      case 1:
        return function(n) {
          return t.call(e, n)
        };
      case 2:
        return function(n, r) {
          return t.call(e, n, r)
        };
      case 3:
        return function(n, r, i) {
          return t.call(e, n, r, i)
        };
      case 4:
        return function(n, r, i, o) {
          return t.call(e, n, r, i, o)
        }
      }
      return function() {
        return t.apply(e, arguments)
      }
    },
        w = function(t, e, n) {
        return null == t ? m.identity : m.isFunction(t) ? b(t, e, n) : m.isObject(t) ? m.matcher(t) : m.property(t)
        };
    m.iteratee = function(t, e) {
      return w(t, e, 1 / 0)
    };
    var _ = function(t, e) {
      return function(n) {
        var r = arguments.length;
        if (2 > r || null == n) return n;
        for (var i = 1; r > i; i++) for (var o = arguments[i], u = t(o), a = u.length, c = 0; a > c; c++) {
          var s = u[c];
          e && void 0 !== n[s] || (n[s] = o[s])
        }
        return n
      }
    },
        E = function(t) {
        if (!m.isObject(t)) return {};
        if (g) return g(t);
        y.prototype = t;
        var e = new y;
        return y.prototype = null, e
        },
        j = function(t) {
        return function(e) {
          return null == e ? void 0 : e[t]
        }
        },
        x = Math.pow(2, 53) - 1,
        O = j("length"),
        k = function(t) {
        var e = O(t);
        return "number" == typeof e && e >= 0 && x >= e
        };
    m.each = m.forEach = function(t, e, n) {
      e = b(e, n);
      var r, i;
      if (k(t)) for (r = 0, i = t.length; i > r; r++) e(t[r], r, t);
      else {
        var o = m.keys(t);
        for (r = 0, i = o.length; i > r; r++) e(t[o[r]], o[r], t)
      }
      return t
    }, m.map = m.collect = function(t, e, n) {
      e = w(e, n);
      for (var r = !k(t) && m.keys(t), i = (r || t).length, o = Array(i), u = 0; i > u; u++) {
        var a = r ? r[u] : u;
        o[u] = e(t[a], a, t)
      }
      return o
    }, m.reduce = m.foldl = m.inject = t(1), m.reduceRight = m.foldr = t(-1), m.find = m.detect = function(t, e, n) {
      var r;
      return r = k(t) ? m.findIndex(t, e, n) : m.findKey(t, e, n), void 0 !== r && -1 !== r ? t[r] : void 0
    }, m.filter = m.select = function(t, e, n) {
      var r = [];
      return e = w(e, n), m.each(t, function(t, n, i) {
        e(t, n, i) && r.push(t)
      }), r
    }, m.reject = function(t, e, n) {
      return m.filter(t, m.negate(w(e)), n)
    }, m.every = m.all = function(t, e, n) {
      e = w(e, n);
      for (var r = !k(t) && m.keys(t), i = (r || t).length, o = 0; i > o; o++) {
        var u = r ? r[o] : o;
        if (!e(t[u], u, t)) return !1
      }
      return !0
    }, m.some = m.any = function(t, e, n) {
      e = w(e, n);
      for (var r = !k(t) && m.keys(t), i = (r || t).length, o = 0; i > o; o++) {
        var u = r ? r[o] : o;
        if (e(t[u], u, t)) return !0
      }
      return !1
    }, m.contains = m.includes = m.include = function(t, e, n, r) {
      return k(t) || (t = m.values(t)), ("number" != typeof n || r) && (n = 0), m.indexOf(t, e, n) >= 0
    }, m.invoke = function(t, e) {
      var n = f.call(arguments, 2),
          r = m.isFunction(e);
      return m.map(t, function(t) {
        var i = r ? e : t[e];
        return null == i ? i : i.apply(t, n)
      })
    }, m.pluck = function(t, e) {
      return m.map(t, m.property(e))
    }, m.where = function(t, e) {
      return m.filter(t, m.matcher(e))
    }, m.findWhere = function(t, e) {
      return m.find(t, m.matcher(e))
    }, m.max = function(t, e, n) {
      var r, i, o = -(1 / 0),
          u = -(1 / 0);
      if (null == e && null != t) {
        t = k(t) ? t : m.values(t);
        for (var a = 0, c = t.length; c > a; a++) r = t[a], r > o && (o = r)
      } else e = w(e, n), m.each(t, function(t, n, r) {
        i = e(t, n, r), (i > u || i === -(1 / 0) && o === -(1 / 0)) && (o = t, u = i)
      });
      return o
    }, m.min = function(t, e, n) {
      var r, i, o = 1 / 0,
          u = 1 / 0;
      if (null == e && null != t) {
        t = k(t) ? t : m.values(t);
        for (var a = 0, c = t.length; c > a; a++) r = t[a], o > r && (o = r)
      } else e = w(e, n), m.each(t, function(t, n, r) {
        i = e(t, n, r), (u > i || i === 1 / 0 && o === 1 / 0) && (o = t, u = i)
      });
      return o
    }, m.shuffle = function(t) {
      for (var e, n = k(t) ? t : m.values(t), r = n.length, i = Array(r), o = 0; r > o; o++) e = m.random(0, o), e !== o && (i[o] = i[e]), i[e] = n[o];
      return i
    }, m.sample = function(t, e, n) {
      return null == e || n ? (k(t) || (t = m.values(t)), t[m.random(t.length - 1)]) : m.shuffle(t).slice(0, Math.max(0, e))
    }, m.sortBy = function(t, e, n) {
      return e = w(e, n), m.pluck(m.map(t, function(t, n, r) {
        return {
          value: t,
          index: n,
          criteria: e(t, n, r)
        }
      }).sort(function(t, e) {
        var n = t.criteria,
            r = e.criteria;
        if (n !== r) {
          if (n > r || void 0 === n) return 1;
          if (r > n || void 0 === r) return -1
        }
        return t.index - e.index
      }), "value")
    };
    var A = function(t) {
      return function(e, n, r) {
        var i = {};
        return n = w(n, r), m.each(e, function(r, o) {
          var u = n(r, o, e);
          t(i, r, u)
        }), i
      }
    };
    m.groupBy = A(function(t, e, n) {
      m.has(t, n) ? t[n].push(e) : t[n] = [e]
    }), m.indexBy = A(function(t, e, n) {
      t[n] = e
    }), m.countBy = A(function(t, e, n) {
      m.has(t, n) ? t[n]++ : t[n] = 1
    }), m.toArray = function(t) {
      return t ? m.isArray(t) ? f.call(t) : k(t) ? m.map(t, m.identity) : m.values(t) : []
    }, m.size = function(t) {
      return null == t ? 0 : k(t) ? t.length : m.keys(t).length
    }, m.partition = function(t, e, n) {
      e = w(e, n);
      var r = [],
          i = [];
      return m.each(t, function(t, n, o) {
        (e(t, n, o) ? r : i).push(t)
      }), [r, i]
    }, m.first = m.head = m.take = function(t, e, n) {
      return null != t ? null == e || n ? t[0] : m.initial(t, t.length - e) : void 0
    }, m.initial = function(t, e, n) {
      return f.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
    }, m.last = function(t, e, n) {
      return null != t ? null == e || n ? t[t.length - 1] : m.rest(t, Math.max(0, t.length - e)) : void 0
    }, m.rest = m.tail = m.drop = function(t, e, n) {
      return f.call(t, null == e || n ? 1 : e)
    }, m.compact = function(t) {
      return m.filter(t, m.identity)
    };
    var L = function(t, e, n, r) {
      for (var i = [], o = 0, u = r || 0, a = O(t); a > u; u++) {
        var c = t[u];
        if (k(c) && (m.isArray(c) || m.isArguments(c))) {
          e || (c = L(c, e, n));
          var s = 0,
              f = c.length;
          for (i.length += f; f > s;) i[o++] = c[s++]
        } else n || (i[o++] = c)
      }
      return i
    };
    m.flatten = function(t, e) {
      return L(t, e, !1)
    }, m.without = function(t) {
      return m.difference(t, f.call(arguments, 1))
    }, m.uniq = m.unique = function(t, e, n, r) {
      m.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = w(n, r));
      for (var i = [], o = [], u = 0, a = O(t); a > u; u++) {
        var c = t[u],
            s = n ? n(c, u, t) : c;
        e ? (u && o === s || i.push(c), o = s) : n ? m.contains(o, s) || (o.push(s), i.push(c)) : m.contains(i, c) || i.push(c)
      }
      return i
    }, m.union = function() {
      return m.uniq(L(arguments, !0, !0))
    }, m.intersection = function(t) {
      for (var e = [], n = arguments.length, r = 0, i = O(t); i > r; r++) {
        var o = t[r];
        if (!m.contains(e, o)) {
          for (var u = 1; n > u && m.contains(arguments[u], o); u++);
          u === n && e.push(o)
        }
      }
      return e
    }, m.difference = function(t) {
      var e = L(arguments, !0, !0, 1);
      return m.filter(t, function(t) {
        return !m.contains(e, t)
      })
    }, m.zip = function() {
      return m.unzip(arguments)
    }, m.unzip = function(t) {
      for (var e = t && m.max(t, O).length || 0, n = Array(e), r = 0; e > r; r++) n[r] = m.pluck(t, r);
      return n
    }, m.object = function(t, e) {
      for (var n = {}, r = 0, i = O(t); i > r; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
      return n
    }, m.findIndex = e(1), m.findLastIndex = e(-1), m.sortedIndex = function(t, e, n, r) {
      n = w(n, r, 1);
      for (var i = n(e), o = 0, u = O(t); u > o;) {
        var a = Math.floor((o + u) / 2);
        n(t[a]) < i ? o = a + 1 : u = a
      }
      return o
    }, m.indexOf = n(1, m.findIndex, m.sortedIndex), m.lastIndexOf = n(-1, m.findLastIndex), m.range = function(t, e, n) {
      null == e && (e = t || 0, t = 0), n = n || 1;
      for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), o = 0; r > o; o++, t += n) i[o] = t;
      return i
    };
    var T = function(t, e, n, r, i) {
      if (!(r instanceof e)) return t.apply(n, i);
      var o = E(t.prototype),
          u = t.apply(o, i);
      return m.isObject(u) ? u : o
    };
    m.bind = function(t, e) {
      if (v && t.bind === v) return v.apply(t, f.call(arguments, 1));
      if (!m.isFunction(t)) throw new TypeError("Bind must be called on a function");
      var n = f.call(arguments, 2),
          r = function() {
          return T(t, r, e, this, n.concat(f.call(arguments)))
          };
      return r
    }, m.partial = function(t) {
      var e = f.call(arguments, 1),
          n = function() {
          for (var r = 0, i = e.length, o = Array(i), u = 0; i > u; u++) o[u] = e[u] === m ? arguments[r++] : e[u];
          for (; r < arguments.length;) o.push(arguments[r++]);
          return T(t, n, this, this, o)
          };
      return n
    }, m.bindAll = function(t) {
      var e, n, r = arguments.length;
      if (1 >= r) throw new Error("bindAll must be passed function names");
      for (e = 1; r > e; e++) n = arguments[e], t[n] = m.bind(t[n], t);
      return t
    }, m.memoize = function(t, e) {
      var n = function(r) {
        var i = n.cache,
            o = "" + (e ? e.apply(this, arguments) : r);
        return m.has(i, o) || (i[o] = t.apply(this, arguments)), i[o]
      };
      return n.cache = {}, n
    }, m.delay = function(t, e) {
      var n = f.call(arguments, 2);
      return setTimeout(function() {
        return t.apply(null, n)
      }, e)
    }, m.defer = m.partial(m.delay, m, 1), m.throttle = function(t, e, n) {
      var r, i, o, u = null,
          a = 0;
      n || (n = {});
      var c = function() {
        a = n.leading === !1 ? 0 : m.now(), u = null, o = t.apply(r, i), u || (r = i = null)
      };
      return function() {
        var s = m.now();
        a || n.leading !== !1 || (a = s);
        var f = e - (s - a);
        return r = this, i = arguments, 0 >= f || f > e ? (u && (clearTimeout(u), u = null), a = s, o = t.apply(r, i), u || (r = i = null)) : u || n.trailing === !1 || (u = setTimeout(c, f)), o
      }
    }, m.debounce = function(t, e, n) {
      var r, i, o, u, a, c = function() {
        var s = m.now() - u;
        e > s && s >= 0 ? r = setTimeout(c, e - s) : (r = null, n || (a = t.apply(o, i), r || (o = i = null)))
      };
      return function() {
        o = this, i = arguments, u = m.now();
        var s = n && !r;
        return r || (r = setTimeout(c, e)), s && (a = t.apply(o, i), o = i = null), a
      }
    }, m.wrap = function(t, e) {
      return m.partial(e, t)
    }, m.negate = function(t) {
      return function() {
        return !t.apply(this, arguments)
      }
    }, m.compose = function() {
      var t = arguments,
          e = t.length - 1;
      return function() {
        for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);
        return r
      }
    }, m.after = function(t, e) {
      return function() {
        return --t < 1 ? e.apply(this, arguments) : void 0
      }
    }, m.before = function(t, e) {
      var n;
      return function() {
        return --t > 0 && (n = e.apply(this, arguments)), 1 >= t && (e = null), n
      }
    }, m.once = m.partial(m.before, 2);
    var S = !{
      toString: null
    }.propertyIsEnumerable("toString"),
        P = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function(t) {
      if (!m.isObject(t)) return [];
      if (d) return d(t);
      var e = [];
      for (var n in t) m.has(t, n) && e.push(n);
      return S && r(t, e), e
    }, m.allKeys = function(t) {
      if (!m.isObject(t)) return [];
      var e = [];
      for (var n in t) e.push(n);
      return S && r(t, e), e
    }, m.values = function(t) {
      for (var e = m.keys(t), n = e.length, r = Array(n), i = 0; n > i; i++) r[i] = t[e[i]];
      return r
    }, m.mapObject = function(t, e, n) {
      e = w(e, n);
      for (var r, i = m.keys(t), o = i.length, u = {}, a = 0; o > a; a++) r = i[a], u[r] = e(t[r], r, t);
      return u
    }, m.pairs = function(t) {
      for (var e = m.keys(t), n = e.length, r = Array(n), i = 0; n > i; i++) r[i] = [e[i], t[e[i]]];
      return r
    }, m.invert = function(t) {
      for (var e = {}, n = m.keys(t), r = 0, i = n.length; i > r; r++) e[t[n[r]]] = n[r];
      return e
    }, m.functions = m.methods = function(t) {
      var e = [];
      for (var n in t) m.isFunction(t[n]) && e.push(n);
      return e.sort()
    }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function(t, e, n) {
      e = w(e, n);
      for (var r, i = m.keys(t), o = 0, u = i.length; u > o; o++) if (r = i[o], e(t[r], r, t)) return r
    }, m.pick = function(t, e, n) {
      var r, i, o = {},
          u = t;
      if (null == u) return o;
      m.isFunction(e) ? (i = m.allKeys(u), r = b(e, n)) : (i = L(arguments, !1, !1, 1), r = function(t, e, n) {
        return e in n
      }, u = Object(u));
      for (var a = 0, c = i.length; c > a; a++) {
        var s = i[a],
            f = u[s];
        r(f, s, u) && (o[s] = f)
      }
      return o
    }, m.omit = function(t, e, n) {
      if (m.isFunction(e)) e = m.negate(e);
      else {
        var r = m.map(L(arguments, !1, !1, 1), String);
        e = function(t, e) {
          return !m.contains(r, e)
        }
      }
      return m.pick(t, e, n)
    }, m.defaults = _(m.allKeys, !0), m.create = function(t, e) {
      var n = E(t);
      return e && m.extendOwn(n, e), n
    }, m.clone = function(t) {
      return m.isObject(t) ? m.isArray(t) ? t.slice() : m.extend({}, t) : t
    }, m.tap = function(t, e) {
      return e(t), t
    }, m.isMatch = function(t, e) {
      var n = m.keys(e),
          r = n.length;
      if (null == t) return !r;
      for (var i = Object(t), o = 0; r > o; o++) {
        var u = n[o];
        if (e[u] !== i[u] || !(u in i)) return !1
      }
      return !0
    };
    var N = function(t, e, n, r) {
      if (t === e) return 0 !== t || 1 / t === 1 / e;
      if (null == t || null == e) return t === e;
      t instanceof m && (t = t._wrapped), e instanceof m && (e = e._wrapped);
      var i = l.call(t);
      if (i !== l.call(e)) return !1;
      switch (i) {
      case "[object RegExp]":
      case "[object String]":
        return "" + t == "" + e;
      case "[object Number]":
        return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
      case "[object Date]":
      case "[object Boolean]":
        return +t === +e
      }
      var o = "[object Array]" === i;
      if (!o) {
        if ("object" != typeof t || "object" != typeof e) return !1;
        var u = t.constructor,
            a = e.constructor;
        if (u !== a && !(m.isFunction(u) && u instanceof u && m.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1
      }
      n = n || [], r = r || [];
      for (var c = n.length; c--;) if (n[c] === t) return r[c] === e;
      if (n.push(t), r.push(e), o) {
        if (c = t.length, c !== e.length) return !1;
        for (; c--;) if (!N(t[c], e[c], n, r)) return !1
      } else {
        var s, f = m.keys(t);
        if (c = f.length, m.keys(e).length !== c) return !1;
        for (; c--;) if (s = f[c], !m.has(e, s) || !N(t[s], e[s], n, r)) return !1
      }
      return n.pop(), r.pop(), !0
    };
    m.isEqual = function(t, e) {
      return N(t, e)
    }, m.isEmpty = function(t) {
      return null == t ? !0 : k(t) && (m.isArray(t) || m.isString(t) || m.isArguments(t)) ? 0 === t.length : 0 === m.keys(t).length
    }, m.isElement = function(t) {
      return !(!t || 1 !== t.nodeType)
    }, m.isArray = h ||
    function(t) {
      return "[object Array]" === l.call(t)
    }, m.isObject = function(t) {
      var e = typeof t;
      return "function" === e || "object" === e && !! t
    }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(t) {
      m["is" + t] = function(e) {
        return l.call(e) === "[object " + t + "]"
      }
    }), m.isArguments(arguments) || (m.isArguments = function(t) {
      return m.has(t, "callee")
    }), "function" != typeof / . / && "object" != typeof Int8Array && (m.isFunction = function(t) {
      return "function" == typeof t || !1
    }), m.isFinite = function(t) {
      return isFinite(t) && !isNaN(parseFloat(t))
    }, m.isNaN = function(t) {
      return m.isNumber(t) && t !== +t
    }, m.isBoolean = function(t) {
      return t === !0 || t === !1 || "[object Boolean]" === l.call(t)
    }, m.isNull = function(t) {
      return null === t
    }, m.isUndefined = function(t) {
      return void 0 === t
    }, m.has = function(t, e) {
      return null != t && p.call(t, e)
    }, m.noConflict = function() {
      return i._ = o, this
    }, m.identity = function(t) {
      return t
    }, m.constant = function(t) {
      return function() {
        return t
      }
    }, m.noop = function() {}, m.property = j, m.propertyOf = function(t) {
      return null == t ?
      function() {} : function(e) {
        return t[e]
      }
    }, m.matcher = m.matches = function(t) {
      return t = m.extendOwn({}, t), function(e) {
        return m.isMatch(e, t)
      }
    }, m.times = function(t, e, n) {
      var r = Array(Math.max(0, t));
      e = b(e, n, 1);
      for (var i = 0; t > i; i++) r[i] = e(i);
      return r
    }, m.random = function(t, e) {
      return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    }, m.now = Date.now ||
    function() {
      return (new Date).getTime()
    };
    var I = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;"
    },
        D = m.invert(I),
        R = function(t) {
        var e = function(e) {
          return t[e]
        },
            n = "(?:" + m.keys(t).join("|") + ")",
            r = RegExp(n),
            i = RegExp(n, "g");
        return function(t) {
          return t = null == t ? "" : "" + t, r.test(t) ? t.replace(i, e) : t
        }
        };
    m.escape = R(I), m.unescape = R(D), m.result = function(t, e, n) {
      var r = null == t ? void 0 : t[e];
      return void 0 === r && (r = n), m.isFunction(r) ? r.call(t) : r
    };
    var M = 0;
    m.uniqueId = function(t) {
      var e = ++M + "";
      return t ? t + e : e
    }, m.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
    var q = /(.)^/,
        C = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
        },
        F = /\\|'|\r|\n|\u2028|\u2029/g,
        B = function(t) {
        return "\\" + C[t]
        };
    m.template = function(t, e, n) {
      !e && n && (e = n), e = m.defaults({}, e, m.templateSettings);
      var r = RegExp([(e.escape || q).source, (e.interpolate || q).source, (e.evaluate || q).source].join("|") + "|$", "g"),
          i = 0,
          o = "__p+='";
      t.replace(r, function(e, n, r, u, a) {
        return o += t.slice(i, a).replace(F, B), i = a + e.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : u && (o += "';\n" + u + "\n__p+='"), e
      }), o += "';\n", e.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
      try {
        var u = new Function(e.variable || "obj", "_", o)
      } catch (a) {
        throw a.source = o, a
      }
      var c = function(t) {
        return u.call(this, t, m)
      },
          s = e.variable || "obj";
      return c.source = "function(" + s + "){\n" + o + "}", c
    }, m.chain = function(t) {
      var e = m(t);
      return e._chain = !0, e
    };
    var V = function(t, e) {
      return t._chain ? m(e).chain() : e
    };
    m.mixin = function(t) {
      m.each(m.functions(t), function(e) {
        var n = m[e] = t[e];
        m.prototype[e] = function() {
          var t = [this._wrapped];
          return s.apply(t, arguments), V(this, n.apply(m, t))
        }
      })
    }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
      var e = u[t];
      m.prototype[t] = function() {
        var n = this._wrapped;
        return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], V(this, n)
      }
    }), m.each(["concat", "join", "slice"], function(t) {
      var e = u[t];
      m.prototype[t] = function() {
        return V(this, e.apply(this._wrapped, arguments))
      }
    }), m.prototype.value = function() {
      return this._wrapped
    }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function() {
      return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
      return m
    })
  }.call(this), function(t, e) {
    function n(t) {
      var n = e[t];
      e[t] = function(t) {
        return i(n(t))
      }
    }
    function r(e, n, r) {
      return (r = this).attachEvent("on" + e, function(e) {
        var e = e || t.event;
        e.preventDefault = e.preventDefault ||
        function() {
          e.returnValue = !1
        }, e.stopPropagation = e.stopPropagation ||
        function() {
          e.cancelBubble = !0
        }, n.call(r, e)
      })
    }
    function i(t, e) {
      if (e = t.length) for (; e--;) t[e].addEventListener = r;
      else t.addEventListener = r;
      return t
    }
    t.addEventListener || (i([e, t]), "Element" in t ? t.Element.prototype.addEventListener = r : (e.attachEvent("onreadystatechange", function() {
      i(e.all)
    }), n("getElementsByTagName"), n("getElementById"), n("createElement"), i(e.all)))
  }(t, e);
  var r = {};
  r.parse = function(t) {
    for (var e = {}, n = t.split("&"), r = 0; r < n.length; r++) {
      var i = /^(.+?)(?:=(.+))?$/.exec(n[r]);
      if (i) {
        var o = i[1],
            u = i[2];
        "true" === u ? u = !0 : "false" === u ? u = !1 : void 0 !== u ? u = decodeURIComponent(u) : "!" === o[0] ? (o = o.substring(1), u = !1) : u = !0, e[o] = u
      }
    }
    return e
  }, r.toString = function(t) {
    var e = [];
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = t[n];
      n = encodeURIComponent(n), r === !0 ? e.push(n) : r === !1 ? e.push("!" + n) : (r = encodeURIComponent(r), e.push(n + "=" + r))
    }
    return e.join("&")
  }, t.Params = r;
  var i = function() {
    "use strict";
    var t = this;
    t.promise = new Promise(function(e, n) {
      t.resolve = e, t.reject = n
    })
  },
      o = {};
  o.domain = "twitch.tv", o.twitchHost = "//twitch.tv", o.apiHost = "https://api.twitch.tv", o.spectreHost = "//spectre.twitch.tv", o.usherHost = "http://usher.justin.tv", o.valveApiHost = o.apiHost + "/steam/watching", o.playerHost = function() {
    var t = e.currentScript,
        r = e.getElementsByTagName("script");
    if (!t) {
      var i = _.filter(r, function(t) {
        return t.src && t.src.match(/player(?:\.\w+)?\.js$/i)
      });
      t = 1 === i.length ? i[0] : r[r.length - 1]
    }
    var o = n(t.src);
    return o.protocol + "://" + o.authority
  }(), o.apiTimeout = 1e4, o.trackingPlatform = "web", o.mixpanelHost = "//api.mixpanel.com", o.mixpanelToken = "809576468572134f909dffa6bd0dcfcf", o.mixpanelIgnore = ["minute-buffered", "x_untrusted_video_init", "x_untrusted_video-play", "x_untrusted_minute-watched", "x_untrusted_buffer-empty", "x_untrusted_buffer-refill", "network_profile"], o.spadeHost = "//spade.twitch.tv", o.spadeIgnore = [], o.countessHost = "//countess.twitch.tv", o.experiments = {
    NETWORK_PROFILE_COLLECTION: "5fbb67a0-b4ff-4775-b836-e9a348a87481",
    ABS_V1: "424531b4-e23d-47d2-87c7-9b90a23ddd06",
    PREROLL_ADS: "4e61c5c6-8cfb-485e-87f1-fc21c0d03068"
  }, o.gamePath = o.twitchHost + "/directory/game", o.popoutSize = {
    width: 853,
    height: 480
  }, o.chromecastId = "358E83DC", o.version = "0.5.7", o.bufferPollDelay = 1e3, o.qualityText = {
    chunked: "Source",
    high: "High",
    medium: "Medium",
    low: "Low",
    mobile: "Mobile",
    auto: "Auto"
  }, o.qualityChangeDuration = 6e3, o.initialControlsDelay = 8e3, o.hoverControlsDelay = 5e3, o.reportHideDelay = 2e3, o.mediaEvents = ["loadstart", "progress", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "durationchange", "timeupdate", "play", "pause", "ratechange", "volumechange"], o.customEvents = ["adcompanionrendered", "castingchange", "bufferedchange", "statschange", "qualitychange", "qualitieschange", "adstart", "adend", "init", "loadedchannel", "loadedvideo", "viewerschange", "fullscreenchange", "restricted", "segmentchange", "isspectre", "theatrechange", "online", "offline"], o.allEvents = _.union(o.mediaEvents, o.customEvents), o.chromecastStates = ["unavailable", "available", "connecting", "connected", "error"], o.mutedSegmentsMessage = "Audio for portions of this video has been muted as it appears to contain copyrighted content owned or controlled by a third party.", o.embedEvents = ["blur", "focus", "keydown", "keypress", "keyup", "resize"], o.embedParameters = ["channel", "video", "muted", "autoplay", "time", "t", "debug", "html5", "quality", "controls"], o.volumeStepAmount = .1, o.flashTimeout = 5e3, o.doubleClickUrl = "//pubads.g.doubleclick.net/gampad/ads", o.leaveDialog = {}, o.leaveDialog.enabled = !1, o.leaveDialog.sinceEnded = 45, o.leaveDialog.viewerThreshold = 5e4, o.leaveDialog.text = "Don't panicBasket. The broadcast is down, but don't refresh just yet. When the broadcast is back, the player will automatically reload for you.", o.leaveDialog.refreshTimeout = 20, o.leaveDialog.warningDuration = 45, o.hotkeySeekAmount = 5, o.cancelResumeAmount = 10, o.flashError = "No supported video backend available; Flash is not installed", o.channelError = "Channel could not be found, or has been deleted by its owner", o.videoError = "Video could not be found, or has been deleted by its owner", o.unknownError = "An unknown error has occured";
  var u = function(e) {
    "use strict";
    var n = this,
        r = new EventEmitter,
        o = new i,
        u = null,
        a = function() {
        t.addEventListener("message", f), c("subscribe")
        },
        c = function(t) {
        var n = {
          namespace: "player.embed.server",
          method: t,
          args: Array.prototype.slice.call(arguments, 1)
        };
        e.postMessage(n, "*")
        },
        s = function() {
        var t = arguments;
        o.promise.then(function() {
          c.apply(this, t)
        })
        },
        f = function(t) {
        if (_.isObject(t.data)) {
          var e = t.data.namespace;
          if ("player.embed.client" === e) {
            var n = t.data.method,
                i = t.data.args;
            switch (n) {
            case "ready":
              o.resolve();
              break;
            case "playerStateUpdate":
              u = i[0];
              break;
            case "playerEvent":
              r.emit(i[0])
            }
          }
        }
        };
    n.addEventListener = function(t, e) {
      r.on(t, e)
    }, n.removeEventListener = function(t, e) {
      r.off(t, e)
    }, n.getChannel = function() {
      return u.channelName
    }, n.getCurrentTime = function() {
      return u.currentTime
    }, n.getDuration = function() {
      return u.duration
    }, n.getEnded = function() {
      return "endedVOD" === u.playback || "endedChannel" === u.playback
    }, n.getMuted = function() {
      return u.muted
    }, n.getPlaybackStats = function() {
      return u.stats
    }, n.isPaused = function() {
      return "pausedVOD" === u.playback || "pausedChannel" === u.playback
    }, n.getQuality = function() {
      return u.quality
    }, n.getQualities = function() {
      return u.qualitiesAvailable
    }, n.getVideo = function() {
      return u.videoID
    }, n.getViewers = function() {
      return u.viewers
    }, n.getVolume = function() {
      return u.volume
    }, n.play = function() {
      s("play")
    }, n.pause = function() {
      s("pause")
    }, n.seek = function(t) {
      s("currentTime=", t)
    }, n.setVolume = function(t) {
      s("volume=", t)
    }, n.setMuted = function(t) {
      s("muted=", t)
    }, n.setChannel = function(t) {
      s("channel=", t)
    }, n.setVideo = function(t) {
      s("video=", t)
    }, n.setQuality = function(t) {
      s("quality=", t)
    }, a()
  },
      a = function(t, n) {
      "use strict";
      var i = this,
          a = _.omit(n, "width", "height"),
          c = r.toString(a),
          s = o.playerHost + "/?" + c,
          f = e.createElement("iframe");
      f.setAttribute("src", s), void 0 !== n.width && f.setAttribute("width", n.width), void 0 !== n.height && f.setAttribute("height", n.height), f.setAttribute("frameBorder", "0"), f.setAttribute("allowFullScreen", ""), f.setAttribute("scrolling", "no"), ("string" == typeof t || t instanceof String) && (t = e.getElementById(t)), t.appendChild(f);
      var l = f.contentWindow;
      u.apply(i, [l]), i.destroy = function() {
        t.removeChild(f)
      }
      };
  t.Twitch = t.Twitch || {}, t.Twitch.Player = a
}(window, document);