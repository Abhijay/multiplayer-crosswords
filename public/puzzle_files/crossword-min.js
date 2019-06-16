(function(a, d) {
    "object" == typeof exports && "object" == typeof module ? module.exports = d() : "function" == typeof define && define.amd ? define([], d) : "object" == typeof exports ? exports.io = d() : a.io = d()
}
)(this, function() {
    return function(a) {
        function d(c) {
            if (g[c])
                return g[c].exports;
            var e = g[c] = {
                exports: {},
                id: c,
                loaded: !1
            };
            return a[c].call(e.exports, e, e.exports, d),
            e.loaded = !0,
            e.exports
        }
        var g = {};
        return d.m = a,
        d.c = g,
        d.p = "",
        d(0)
    }([function(a, d, g) {
        function c(a, b) {
            "object" === ("undefined" == typeof a ? "undefined" : e(a)) && (b = a,
            a = void 0);
            b = b || {};
            var m;
            a = h(a);
            var c = a.source
              , y = a.id
              , x = a.path;
            x = w[y] && x in w[y].nsps;
            return b.forceNew || b["force new connection"] || !1 === b.multiplex || x ? (p("ignoring socket cache for %s", c),
            m = C(c, b)) : (w[y] || (p("new io instance for %s", c),
            w[y] = C(c, b)),
            m = w[y]),
            a.query && !b.query && (b.query = a.query),
            m.socket(a.path, b)
        }
        var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
            return typeof a
        }
        : function(a) {
            return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        }
          , h = g(1)
          , b = g(7)
          , C = g(12)
          , p = g(3)("socket.io-client");
        a.exports = d = c;
        var w = d.managers = {};
        d.protocol = b.protocol;
        d.connect = c;
        d.Manager = g(12);
        d.Socket = g(36)
    }
    , function(a, d, g) {
        var c = g(2)
          , e = g(3)("socket.io-client:url");
        a.exports = function(a, b) {
            var d = a;
            b = b || "undefined" != typeof location && location;
            null == a && (a = b.protocol + "//" + b.host);
            "string" == typeof a && ("/" === a.charAt(0) && (a = "/" === a.charAt(1) ? b.protocol + a : b.host + a),
            /^(https?|wss?):\/\//.test(a) || (e("protocol-less url %s", a),
            a = "undefined" != typeof b ? b.protocol + "//" + a : "https://" + a),
            e("parse %s", a),
            d = c(a));
            d.port || (/^(http|ws)$/.test(d.protocol) ? d.port = "80" : /^(http|ws)s$/.test(d.protocol) && (d.port = "443"));
            d.path = d.path || "/";
            a = -1 !== d.host.indexOf(":") ? "[" + d.host + "]" : d.host;
            return d.id = d.protocol + "://" + a + ":" + d.port,
            d.href = d.protocol + "://" + a + (b && b.port === d.port ? "" : ":" + d.port),
            d
        }
    }
    , function(a, d) {
        var g = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
          , c = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");
        a.exports = function(a) {
            var d = a
              , b = a.indexOf("[")
              , e = a.indexOf("]");
            -1 != b && -1 != e && (a = a.substring(0, b) + a.substring(b, e).replace(/:/g, ";") + a.substring(e, a.length));
            a = g.exec(a || "");
            for (var p = {}, w = 14; w--; )
                p[c[w]] = a[w] || "";
            return -1 != b && -1 != e && (p.source = d,
            p.host = p.host.substring(1, p.host.length - 1).replace(/;/g, ":"),
            p.authority = p.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
            p.ipv6uri = !0),
            p
        }
    }
    , function(a, d, g) {
        (function(c) {
            function e() {
                try {
                    var a = d.storage.debug
                } catch (p) {}
                return !a && "undefined" != typeof c && "env"in c && (a = c.env.DEBUG),
                a
            }
            d = a.exports = g(5);
            d.log = function() {
                return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }
            ;
            d.formatArgs = function(a) {
                var b = this.useColors;
                if (a[0] = (b ? "%c" : "") + this.namespace + (b ? " %c" : " ") + a[0] + (b ? "%c " : " ") + "+" + d.humanize(this.diff),
                b) {
                    b = "color: " + this.color;
                    a.splice(1, 0, b, "color: inherit");
                    var c = 0
                      , x = 0;
                    a[0].replace(/%[a-zA-Z%]/g, function(a) {
                        "%%" !== a && (c++,
                        "%c" === a && (x = c))
                    });
                    a.splice(x, 0, b)
                }
            }
            ;
            d.save = function(a) {
                try {
                    null == a ? d.storage.removeItem("debug") : d.storage.debug = a
                } catch (p) {}
            }
            ;
            d.load = e;
            d.useColors = function() {
                return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }
            ;
            var h = d;
            if ("undefined" != typeof chrome && "undefined" != typeof chrome.storage)
                var b = chrome.storage.local;
            else
                a: {
                    try {
                        b = window.localStorage;
                        break a
                    } catch (C) {}
                    b = void 0
                }
            h.storage = b;
            d.colors = "#0000CC #0000FF #0033CC #0033FF #0066CC #0066FF #0099CC #0099FF #00CC00 #00CC33 #00CC66 #00CC99 #00CCCC #00CCFF #3300CC #3300FF #3333CC #3333FF #3366CC #3366FF #3399CC #3399FF #33CC00 #33CC33 #33CC66 #33CC99 #33CCCC #33CCFF #6600CC #6600FF #6633CC #6633FF #66CC00 #66CC33 #9900CC #9900FF #9933CC #9933FF #99CC00 #99CC33 #CC0000 #CC0033 #CC0066 #CC0099 #CC00CC #CC00FF #CC3300 #CC3333 #CC3366 #CC3399 #CC33CC #CC33FF #CC6600 #CC6633 #CC9900 #CC9933 #CCCC00 #CCCC33 #FF0000 #FF0033 #FF0066 #FF0099 #FF00CC #FF00FF #FF3300 #FF3333 #FF3366 #FF3399 #FF33CC #FF33FF #FF6600 #FF6633 #FF9900 #FF9933 #FFCC00 #FFCC33".split(" ");
            d.formatters.j = function(a) {
                try {
                    return JSON.stringify(a)
                } catch (p) {
                    return "[UnexpectedJSONParseError]: " + p.message
                }
            }
            ;
            d.enable(e())
        }
        ).call(d, g(4))
    }
    , function(a, d) {
        function g() {
            throw Error("setTimeout has not been defined");
        }
        function c() {
            throw Error("clearTimeout has not been defined");
        }
        function e(a) {
            if (x === setTimeout)
                return setTimeout(a, 0);
            if ((x === g || !x) && setTimeout)
                return x = setTimeout,
                setTimeout(a, 0);
            try {
                return x(a, 0)
            } catch (I) {
                try {
                    return x.call(null, a, 0)
                } catch (Qa) {
                    return x.call(this, a, 0)
                }
            }
        }
        function h(a) {
            if (m === clearTimeout)
                return clearTimeout(a);
            if ((m === c || !m) && clearTimeout)
                return m = clearTimeout,
                clearTimeout(a);
            try {
                return m(a)
            } catch (I) {
                try {
                    return m.call(null, a)
                } catch (Qa) {
                    return m.call(this, a)
                }
            }
        }
        function b() {
            y && T && (y = !1,
            T.length ? H = T.concat(H) : ca = -1,
            H.length && C())
        }
        function C() {
            if (!y) {
                var a = e(b);
                y = !0;
                for (var m = H.length; m; ) {
                    T = H;
                    for (H = []; ++ca < m; )
                        T && T[ca].run();
                    ca = -1;
                    m = H.length
                }
                T = null;
                y = !1;
                h(a)
            }
        }
        function p(a, b) {
            this.fun = a;
            this.array = b
        }
        function w() {}
        a = a.exports = {};
        try {
            var x = "function" == typeof setTimeout ? setTimeout : g
        } catch (W) {
            x = g
        }
        try {
            var m = "function" == typeof clearTimeout ? clearTimeout : c
        } catch (W) {
            m = c
        }
        var T, H = [], y = !1, ca = -1;
        a.nextTick = function(a) {
            var b = Array(arguments.length - 1);
            if (1 < arguments.length)
                for (var m = 1; m < arguments.length; m++)
                    b[m - 1] = arguments[m];
            H.push(new p(a,b));
            1 !== H.length || y || e(C)
        }
        ;
        p.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ;
        a.title = "browser";
        a.browser = !0;
        a.env = {};
        a.argv = [];
        a.version = "";
        a.versions = {};
        a.on = w;
        a.addListener = w;
        a.once = w;
        a.off = w;
        a.removeListener = w;
        a.removeAllListeners = w;
        a.emit = w;
        a.prependListener = w;
        a.prependOnceListener = w;
        a.listeners = function(a) {
            return []
        }
        ;
        a.binding = function(a) {
            throw Error("process.binding is not supported");
        }
        ;
        a.cwd = function() {
            return "/"
        }
        ;
        a.chdir = function(a) {
            throw Error("process.chdir is not supported");
        }
        ;
        a.umask = function() {
            return 0
        }
    }
    , function(a, d, g) {
        function c(a) {
            var b, c = 0;
            for (b in a)
                c = (c << 5) - c + a.charCodeAt(b),
                c |= 0;
            return d.colors[Math.abs(c) % d.colors.length]
        }
        function e(a) {
            function b() {
                if (b.enabled) {
                    var a = +new Date;
                    b.diff = a - (e || a);
                    b.prev = e;
                    e = b.curr = a;
                    var c = Array(arguments.length);
                    for (a = 0; a < c.length; a++)
                        c[a] = arguments[a];
                    c[0] = d.coerce(c[0]);
                    "string" != typeof c[0] && c.unshift("%O");
                    var m = 0;
                    c[0] = c[0].replace(/%([a-zA-Z%])/g, function(a, e) {
                        if ("%%" === a)
                            return a;
                        m++;
                        e = d.formatters[e];
                        "function" == typeof e && (a = e.call(b, c[m]),
                        c.splice(m, 1),
                        m--);
                        return a
                    });
                    d.formatArgs.call(b, c);
                    (b.log || d.log || console.log.bind(console)).apply(b, c)
                }
            }
            var e;
            return b.namespace = a,
            b.enabled = d.enabled(a),
            b.useColors = d.useColors(),
            b.color = c(a),
            b.destroy = h,
            "function" == typeof d.init && d.init(b),
            d.instances.push(b),
            b
        }
        function h() {
            var a = d.instances.indexOf(this);
            return -1 !== a && (d.instances.splice(a, 1),
            !0)
        }
        d = a.exports = e.debug = e["default"] = e;
        d.coerce = function(a) {
            return a instanceof Error ? a.stack || a.message : a
        }
        ;
        d.disable = function() {
            d.enable("")
        }
        ;
        d.enable = function(a) {
            d.save(a);
            d.names = [];
            d.skips = [];
            var b, c = ("string" == typeof a ? a : "").split(/[\s,]+/), e = c.length;
            for (b = 0; b < e; b++)
                c[b] && (a = c[b].replace(/\*/g, ".*?"),
                "-" === a[0] ? d.skips.push(new RegExp("^" + a.substr(1) + "$")) : d.names.push(new RegExp("^" + a + "$")));
            for (b = 0; b < d.instances.length; b++)
                a = d.instances[b],
                a.enabled = d.enabled(a.namespace)
        }
        ;
        d.enabled = function(a) {
            if ("*" === a[a.length - 1])
                return !0;
            var b;
            var c = 0;
            for (b = d.skips.length; c < b; c++)
                if (d.skips[c].test(a))
                    return !1;
            c = 0;
            for (b = d.names.length; c < b; c++)
                if (d.names[c].test(a))
                    return !0;
            return !1
        }
        ;
        d.humanize = g(6);
        d.instances = [];
        d.names = [];
        d.skips = [];
        d.formatters = {}
    }
    , function(a, d) {
        function g(a) {
            if (a = String(a),
            !(100 < a.length))
                if (a = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a)) {
                    var c = parseFloat(a[1]);
                    switch ((a[2] || "ms").toLowerCase()) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return c * p;
                    case "days":
                    case "day":
                    case "d":
                        return c * C;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return c * b;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return c * h;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return c * e;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return c
                    }
                }
        }
        function c(a, b, m) {
            if (!(a < b))
                return a < 1.5 * b ? Math.floor(a / b) + " " + m : Math.ceil(a / b) + " " + m + "s"
        }
        var e = 1E3
          , h = 60 * e
          , b = 60 * h
          , C = 24 * b
          , p = 365.25 * C;
        a.exports = function(a, d) {
            d = d || {};
            var m = typeof a;
            if ("string" === m && 0 < a.length)
                return g(a);
            if ("number" === m && !1 === isNaN(a))
                return d["long"] ? c(a, C, "day") || c(a, b, "hour") || c(a, h, "minute") || c(a, e, "second") || a + " ms" : a >= C ? Math.round(a / C) + "d" : a >= b ? Math.round(a / b) + "h" : a >= h ? Math.round(a / h) + "m" : a >= e ? Math.round(a / e) + "s" : a + "ms";
            throw Error("val is not a non-empty string or a valid number. val\x3d" + JSON.stringify(a));
        }
    }
    , function(a, d, g) {
        function c() {}
        function e(a) {
            var b = "" + a.type;
            if (d.BINARY_EVENT !== a.type && d.BINARY_ACK !== a.type || (b += a.attachments + "-"),
            a.nsp && "/" !== a.nsp && (b += a.nsp + ","),
            null != a.id && (b += a.id),
            null != a.data) {
                try {
                    var m = JSON.stringify(a.data)
                } catch (W) {
                    m = !1
                }
                if (!1 === m)
                    return T;
                b += m
            }
            return p("encoded %j as %s", a, b),
            b
        }
        function h(a, b) {
            w.removeBlobs(a, function(a) {
                var m = w.deconstructPacket(a);
                a = e(m.packet);
                m = m.buffers;
                m.unshift(a);
                b(m)
            })
        }
        function b() {
            this.reconstructor = null
        }
        function C(a) {
            this.reconPack = a;
            this.buffers = []
        }
        var p = g(3)("socket.io-parser");
        a = g(8);
        var w = g(9)
          , x = g(10)
          , m = g(11);
        d.protocol = 4;
        d.types = "CONNECT DISCONNECT EVENT ACK ERROR BINARY_EVENT BINARY_ACK".split(" ");
        d.CONNECT = 0;
        d.DISCONNECT = 1;
        d.EVENT = 2;
        d.ACK = 3;
        d.ERROR = 4;
        d.BINARY_EVENT = 5;
        d.BINARY_ACK = 6;
        d.Encoder = c;
        d.Decoder = b;
        var T = d.ERROR + '"encode error"';
        c.prototype.encode = function(a, b) {
            (p("encoding packet %j", a),
            d.BINARY_EVENT === a.type || d.BINARY_ACK === a.type) ? h(a, b) : (a = e(a),
            b([a]))
        }
        ;
        a(b.prototype);
        b.prototype.add = function(a) {
            if ("string" == typeof a) {
                a: {
                    var b = 0
                      , c = {
                        type: Number(a.charAt(0))
                    };
                    if (null == d.types[c.type])
                        a = {
                            type: d.ERROR,
                            data: "parser error: unknown packet type " + c.type
                        };
                    else {
                        if (d.BINARY_EVENT === c.type || d.BINARY_ACK === c.type) {
                            for (var e = ""; "-" !== a.charAt(++b) && (e += a.charAt(b),
                            b != a.length); )
                                ;
                            if (e != Number(e) || "-" !== a.charAt(b))
                                throw Error("Illegal attachments");
                            c.attachments = Number(e)
                        }
                        if ("/" === a.charAt(b + 1))
                            for (c.nsp = ""; ++b; ) {
                                e = a.charAt(b);
                                if ("," === e)
                                    break;
                                if (c.nsp += e,
                                b === a.length)
                                    break
                            }
                        else
                            c.nsp = "/";
                        e = a.charAt(b + 1);
                        if ("" !== e && Number(e) == e) {
                            for (c.id = ""; ++b; ) {
                                e = a.charAt(b);
                                if (null == e || Number(e) != e) {
                                    --b;
                                    break
                                }
                                if (c.id += a.charAt(b),
                                b === a.length)
                                    break
                            }
                            c.id = Number(c.id)
                        }
                        if (a.charAt(++b)) {
                            b = a.substr(b);
                            try {
                                var h = JSON.parse(b)
                            } catch (Qa) {
                                h = !1
                            }
                            if (!1 === h || c.type !== d.ERROR && !x(h)) {
                                a = {
                                    type: d.ERROR,
                                    data: "parser error: invalid payload"
                                };
                                break a
                            }
                            c.data = h
                        }
                        a = (p("decoded %s as %j", a, c),
                        c)
                    }
                }
                d.BINARY_EVENT === a.type || d.BINARY_ACK === a.type ? (this.reconstructor = new C(a),
                0 === this.reconstructor.reconPack.attachments && this.emit("decoded", a)) : this.emit("decoded", a)
            } else {
                if (!m(a) && !a.base64)
                    throw Error("Unknown type: " + a);
                if (!this.reconstructor)
                    throw Error("got binary data when not reconstructing a packet");
                (a = this.reconstructor.takeBinaryData(a)) && (this.reconstructor = null,
                this.emit("decoded", a))
            }
        }
        ;
        b.prototype.destroy = function() {
            this.reconstructor && this.reconstructor.finishedReconstruction()
        }
        ;
        C.prototype.takeBinaryData = function(a) {
            return (this.buffers.push(a),
            this.buffers.length === this.reconPack.attachments) ? (a = w.reconstructPacket(this.reconPack, this.buffers),
            this.finishedReconstruction(),
            a) : null
        }
        ;
        C.prototype.finishedReconstruction = function() {
            this.reconPack = null;
            this.buffers = []
        }
    }
    , function(a, d, g) {
        function c(a) {
            if (a) {
                for (var d in c.prototype)
                    a[d] = c.prototype[d];
                return a
            }
        }
        a.exports = c;
        c.prototype.on = c.prototype.addEventListener = function(a, c) {
            return this._callbacks = this._callbacks || {},
            (this._callbacks["$" + a] = this._callbacks["$" + a] || []).push(c),
            this
        }
        ;
        c.prototype.once = function(a, c) {
            function b() {
                this.off(a, b);
                c.apply(this, arguments)
            }
            return b.fn = c,
            this.on(a, b),
            this
        }
        ;
        c.prototype.off = c.prototype.removeListener = c.prototype.removeAllListeners = c.prototype.removeEventListener = function(a, c) {
            if (this._callbacks = this._callbacks || {},
            0 == arguments.length)
                return this._callbacks = {},
                this;
            var b = this._callbacks["$" + a];
            if (!b)
                return this;
            if (1 == arguments.length)
                return delete this._callbacks["$" + a],
                this;
            for (var d, e = 0; e < b.length; e++)
                if (d = b[e],
                d === c || d.fn === c) {
                    b.splice(e, 1);
                    break
                }
            return this
        }
        ;
        c.prototype.emit = function(a) {
            this._callbacks = this._callbacks || {};
            var c = [].slice.call(arguments, 1)
              , b = this._callbacks["$" + a];
            if (b) {
                b = b.slice(0);
                for (var d = 0, e = b.length; d < e; ++d)
                    b[d].apply(this, c)
            }
            return this
        }
        ;
        c.prototype.listeners = function(a) {
            return this._callbacks = this._callbacks || {},
            this._callbacks["$" + a] || []
        }
        ;
        c.prototype.hasListeners = function(a) {
            return !!this.listeners(a).length
        }
    }
    , function(a, d, g) {
        function c(a, d) {
            if (!a)
                return a;
            if (b(a)) {
                var m = {
                    _placeholder: !0,
                    num: d.length
                };
                return d.push(a),
                m
            }
            if (h(a)) {
                m = Array(a.length);
                for (var e = 0; e < a.length; e++)
                    m[e] = c(a[e], d);
                return m
            }
            if ("object" == typeof a && !(a instanceof Date)) {
                m = {};
                for (e in a)
                    m[e] = c(a[e], d);
                return m
            }
            return a
        }
        function e(a, b) {
            if (!a)
                return a;
            if (a && a._placeholder)
                return b[a.num];
            if (h(a))
                for (var c = 0; c < a.length; c++)
                    a[c] = e(a[c], b);
            else if ("object" == typeof a)
                for (c in a)
                    a[c] = e(a[c], b);
            return a
        }
        var h = g(10)
          , b = g(11);
        a = Object.prototype.toString;
        var C = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === a.call(Blob)
          , p = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === a.call(File);
        d.deconstructPacket = function(a) {
            var b = [];
            return a.data = c(a.data, b),
            a.attachments = b.length,
            {
                packet: a,
                buffers: b
            }
        }
        ;
        d.reconstructPacket = function(a, b) {
            return a.data = e(a.data, b),
            a.attachments = void 0,
            a
        }
        ;
        d.removeBlobs = function(a, c) {
            function m(a, g, x) {
                if (!a)
                    return a;
                if (C && a instanceof Blob || p && a instanceof File) {
                    d++;
                    var y = new FileReader;
                    y.onload = function() {
                        x ? x[g] = this.result : e = this.result;
                        --d || c(e)
                    }
                    ;
                    y.readAsArrayBuffer(a)
                } else if (h(a))
                    for (y = 0; y < a.length; y++)
                        m(a[y], y, a);
                else if ("object" == typeof a && !b(a))
                    for (y in a)
                        m(a[y], y, a)
            }
            var d = 0
              , e = a;
            m(e);
            d || c(e)
        }
    }
    , function(a, d) {
        var g = {}.toString;
        a.exports = Array.isArray || function(a) {
            return "[object Array]" == g.call(a)
        }
    }
    , function(a, d) {
        a.exports = function(a) {
            var d;
            !(d = g && Buffer.isBuffer(a)) && (d = c) && ((d = a instanceof ArrayBuffer) || (d = "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(a) : a.buffer instanceof ArrayBuffer));
            return d
        }
        ;
        var g = "function" == typeof Buffer && "function" == typeof Buffer.isBuffer
          , c = "function" == typeof ArrayBuffer
    }
    , function(a, d, g) {
        function c(a, b) {
            if (!(this instanceof c))
                return new c(a,b);
            a && "object" === ("undefined" == typeof a ? "undefined" : e(a)) && (b = a,
            a = void 0);
            b = b || {};
            b.path = b.path || "/socket.io";
            this.nsps = {};
            this.subs = [];
            this.opts = b;
            this.reconnection(!1 !== b.reconnection);
            this.reconnectionAttempts(b.reconnectionAttempts || 1 / 0);
            this.reconnectionDelay(b.reconnectionDelay || 1E3);
            this.reconnectionDelayMax(b.reconnectionDelayMax || 5E3);
            this.randomizationFactor(b.randomizationFactor || .5);
            this.backoff = new T({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            });
            this.timeout(null == b.timeout ? 2E4 : b.timeout);
            this.readyState = "closed";
            this.uri = a;
            this.connecting = [];
            this.lastPing = null;
            this.encoding = !1;
            this.packetBuffer = [];
            a = b.parser || C;
            this.encoder = new a.Encoder;
            this.decoder = new a.Decoder;
            (this.autoConnect = !1 !== b.autoConnect) && this.open()
        }
        var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
            return typeof a
        }
        : function(a) {
            return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        }
          , h = g(13)
          , b = g(36);
        d = g(8);
        var C = g(7)
          , p = g(38)
          , w = g(39)
          , x = g(3)("socket.io-client:manager")
          , m = g(35)
          , T = g(40)
          , H = Object.prototype.hasOwnProperty;
        a.exports = c;
        c.prototype.emitAll = function() {
            this.emit.apply(this, arguments);
            for (var a in this.nsps)
                H.call(this.nsps, a) && this.nsps[a].emit.apply(this.nsps[a], arguments)
        }
        ;
        c.prototype.updateSocketIds = function() {
            for (var a in this.nsps)
                H.call(this.nsps, a) && (this.nsps[a].id = this.generateId(a))
        }
        ;
        c.prototype.generateId = function(a) {
            return ("/" === a ? "" : a + "#") + this.engine.id
        }
        ;
        d(c.prototype);
        c.prototype.reconnection = function(a) {
            return arguments.length ? (this._reconnection = !!a,
            this) : this._reconnection
        }
        ;
        c.prototype.reconnectionAttempts = function(a) {
            return arguments.length ? (this._reconnectionAttempts = a,
            this) : this._reconnectionAttempts
        }
        ;
        c.prototype.reconnectionDelay = function(a) {
            return arguments.length ? (this._reconnectionDelay = a,
            this.backoff && this.backoff.setMin(a),
            this) : this._reconnectionDelay
        }
        ;
        c.prototype.randomizationFactor = function(a) {
            return arguments.length ? (this._randomizationFactor = a,
            this.backoff && this.backoff.setJitter(a),
            this) : this._randomizationFactor
        }
        ;
        c.prototype.reconnectionDelayMax = function(a) {
            return arguments.length ? (this._reconnectionDelayMax = a,
            this.backoff && this.backoff.setMax(a),
            this) : this._reconnectionDelayMax
        }
        ;
        c.prototype.timeout = function(a) {
            return arguments.length ? (this._timeout = a,
            this) : this._timeout
        }
        ;
        c.prototype.maybeReconnectOnOpen = function() {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
        }
        ;
        c.prototype.open = c.prototype.connect = function(a, b) {
            if (x("readyState %s", this.readyState),
            ~this.readyState.indexOf("open"))
                return this;
            x("opening %s", this.uri);
            var c = this.engine = h(this.uri, this.opts)
              , m = this;
            this.readyState = "opening";
            this.skipReconnect = !1;
            var d = p(c, "open", function() {
                m.onopen();
                a && a()
            });
            b = p(c, "error", function(b) {
                if (x("connect_error"),
                m.cleanup(),
                m.readyState = "closed",
                m.emitAll("connect_error", b),
                a) {
                    var c = Error("Connection error");
                    c.data = b;
                    a(c)
                } else
                    m.maybeReconnectOnOpen()
            });
            if (!1 !== this._timeout) {
                var e = this._timeout;
                x("connect attempt will timeout after %d", e);
                var g = setTimeout(function() {
                    x("connect attempt timed out after %d", e);
                    d.destroy();
                    c.close();
                    c.emit("error", "timeout");
                    m.emitAll("connect_timeout", e)
                }, e);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(g)
                    }
                })
            }
            return this.subs.push(d),
            this.subs.push(b),
            this
        }
        ;
        c.prototype.onopen = function() {
            x("open");
            this.cleanup();
            this.readyState = "open";
            this.emit("open");
            var a = this.engine;
            this.subs.push(p(a, "data", w(this, "ondata")));
            this.subs.push(p(a, "ping", w(this, "onping")));
            this.subs.push(p(a, "pong", w(this, "onpong")));
            this.subs.push(p(a, "error", w(this, "onerror")));
            this.subs.push(p(a, "close", w(this, "onclose")));
            this.subs.push(p(this.decoder, "decoded", w(this, "ondecoded")))
        }
        ;
        c.prototype.onping = function() {
            this.lastPing = new Date;
            this.emitAll("ping")
        }
        ;
        c.prototype.onpong = function() {
            this.emitAll("pong", new Date - this.lastPing)
        }
        ;
        c.prototype.ondata = function(a) {
            this.decoder.add(a)
        }
        ;
        c.prototype.ondecoded = function(a) {
            this.emit("packet", a)
        }
        ;
        c.prototype.onerror = function(a) {
            x("error", a);
            this.emitAll("error", a)
        }
        ;
        c.prototype.socket = function(a, c) {
            function d() {
                ~m(g.connecting, e) || g.connecting.push(e)
            }
            var e = this.nsps[a];
            if (!e) {
                e = new b(this,a,c);
                this.nsps[a] = e;
                var g = this;
                e.on("connecting", d);
                e.on("connect", function() {
                    e.id = g.generateId(a)
                });
                this.autoConnect && d()
            }
            return e
        }
        ;
        c.prototype.destroy = function(a) {
            a = m(this.connecting, a);
            ~a && this.connecting.splice(a, 1);
            this.connecting.length || this.close()
        }
        ;
        c.prototype.packet = function(a) {
            x("writing packet %j", a);
            var b = this;
            a.query && 0 === a.type && (a.nsp += "?" + a.query);
            b.encoding ? b.packetBuffer.push(a) : (b.encoding = !0,
            this.encoder.encode(a, function(c) {
                for (var m = 0; m < c.length; m++)
                    b.engine.write(c[m], a.options);
                b.encoding = !1;
                b.processPacketQueue()
            }))
        }
        ;
        c.prototype.processPacketQueue = function() {
            if (0 < this.packetBuffer.length && !this.encoding) {
                var a = this.packetBuffer.shift();
                this.packet(a)
            }
        }
        ;
        c.prototype.cleanup = function() {
            x("cleanup");
            for (var a = this.subs.length, b = 0; b < a; b++)
                this.subs.shift().destroy();
            this.packetBuffer = [];
            this.encoding = !1;
            this.lastPing = null;
            this.decoder.destroy()
        }
        ;
        c.prototype.close = c.prototype.disconnect = function() {
            x("disconnect");
            this.skipReconnect = !0;
            this.reconnecting = !1;
            "opening" === this.readyState && this.cleanup();
            this.backoff.reset();
            this.readyState = "closed";
            this.engine && this.engine.close()
        }
        ;
        c.prototype.onclose = function(a) {
            x("onclose");
            this.cleanup();
            this.backoff.reset();
            this.readyState = "closed";
            this.emit("close", a);
            this._reconnection && !this.skipReconnect && this.reconnect()
        }
        ;
        c.prototype.reconnect = function() {
            if (this.reconnecting || this.skipReconnect)
                return this;
            var a = this;
            if (this.backoff.attempts >= this._reconnectionAttempts)
                x("reconnect failed"),
                this.backoff.reset(),
                this.emitAll("reconnect_failed"),
                this.reconnecting = !1;
            else {
                var b = this.backoff.duration();
                x("will wait %dms before reconnect attempt", b);
                this.reconnecting = !0;
                var c = setTimeout(function() {
                    a.skipReconnect || (x("attempting reconnect"),
                    a.emitAll("reconnect_attempt", a.backoff.attempts),
                    a.emitAll("reconnecting", a.backoff.attempts),
                    a.skipReconnect || a.open(function(b) {
                        b ? (x("reconnect attempt error"),
                        a.reconnecting = !1,
                        a.reconnect(),
                        a.emitAll("reconnect_error", b.data)) : (x("reconnect success"),
                        a.onreconnect())
                    }))
                }, b);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(c)
                    }
                })
            }
        }
        ;
        c.prototype.onreconnect = function() {
            var a = this.backoff.attempts;
            this.reconnecting = !1;
            this.backoff.reset();
            this.updateSocketIds();
            this.emitAll("reconnect", a)
        }
    }
    , function(a, d, g) {
        a.exports = g(14);
        a.exports.parser = g(21)
    }
    , function(a, d, g) {
        function c(a, b) {
            return this instanceof c ? (b = b || {},
            a && "object" == typeof a && (b = a,
            a = null),
            a ? (a = p(a),
            b.hostname = a.host,
            b.secure = "https" === a.protocol || "wss" === a.protocol,
            b.port = a.port,
            a.query && (b.query = a.query)) : b.host && (b.hostname = p(b.host).host),
            this.secure = null != b.secure ? b.secure : "undefined" != typeof location && "https:" === location.protocol,
            b.hostname && !b.port && (b.port = this.secure ? "443" : "80"),
            this.agent = b.agent || !1,
            this.hostname = b.hostname || ("undefined" != typeof location ? location.hostname : "localhost"),
            this.port = b.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80),
            this.query = b.query || {},
            "string" == typeof this.query && (this.query = w.decode(this.query)),
            this.upgrade = !1 !== b.upgrade,
            this.path = (b.path || "/engine.io").replace(/\/$/, "") + "/",
            this.forceJSONP = !!b.forceJSONP,
            this.jsonp = !1 !== b.jsonp,
            this.forceBase64 = !!b.forceBase64,
            this.enablesXDR = !!b.enablesXDR,
            this.timestampParam = b.timestampParam || "t",
            this.timestampRequests = b.timestampRequests,
            this.transports = b.transports || ["polling", "websocket"],
            this.transportOptions = b.transportOptions || {},
            this.readyState = "",
            this.writeBuffer = [],
            this.prevBufferLen = 0,
            this.policyPort = b.policyPort || 843,
            this.rememberUpgrade = b.rememberUpgrade || !1,
            this.binaryType = null,
            this.onlyBinaryUpgrades = b.onlyBinaryUpgrades,
            this.perMessageDeflate = !1 !== b.perMessageDeflate && (b.perMessageDeflate || {}),
            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
            this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
            this.pfx = b.pfx || null,
            this.key = b.key || null,
            this.passphrase = b.passphrase || null,
            this.cert = b.cert || null,
            this.ca = b.ca || null,
            this.ciphers = b.ciphers || null,
            this.rejectUnauthorized = void 0 === b.rejectUnauthorized || b.rejectUnauthorized,
            this.forceNode = !!b.forceNode,
            this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(),
            ("undefined" == typeof self || this.isReactNative) && (b.extraHeaders && 0 < Object.keys(b.extraHeaders).length && (this.extraHeaders = b.extraHeaders),
            b.localAddress && (this.localAddress = b.localAddress)),
            this.id = null,
            this.upgrades = null,
            this.pingInterval = null,
            this.pingTimeout = null,
            this.pingIntervalTimer = null,
            this.pingTimeoutTimer = null,
            void this.open()) : new c(a,b)
        }
        var e = g(15);
        d = g(8);
        var h = g(3)("engine.io-client:socket")
          , b = g(35)
          , C = g(21)
          , p = g(2)
          , w = g(29);
        a.exports = c;
        c.priorWebsocketSuccess = !1;
        d(c.prototype);
        c.protocol = C.protocol;
        c.Socket = c;
        c.Transport = g(20);
        c.transports = g(15);
        c.parser = g(21);
        c.prototype.createTransport = function(a) {
            h('creating transport "%s"', a);
            var b = this.query, c = {}, d;
            for (d in b)
                b.hasOwnProperty(d) && (c[d] = b[d]);
            c.EIO = C.protocol;
            c.transport = a;
            b = this.transportOptions[a] || {};
            this.id && (c.sid = this.id);
            return new e[a]({
                query: c,
                socket: this,
                agent: b.agent || this.agent,
                hostname: b.hostname || this.hostname,
                port: b.port || this.port,
                secure: b.secure || this.secure,
                path: b.path || this.path,
                forceJSONP: b.forceJSONP || this.forceJSONP,
                jsonp: b.jsonp || this.jsonp,
                forceBase64: b.forceBase64 || this.forceBase64,
                enablesXDR: b.enablesXDR || this.enablesXDR,
                timestampRequests: b.timestampRequests || this.timestampRequests,
                timestampParam: b.timestampParam || this.timestampParam,
                policyPort: b.policyPort || this.policyPort,
                pfx: b.pfx || this.pfx,
                key: b.key || this.key,
                passphrase: b.passphrase || this.passphrase,
                cert: b.cert || this.cert,
                ca: b.ca || this.ca,
                ciphers: b.ciphers || this.ciphers,
                rejectUnauthorized: b.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: b.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: b.extraHeaders || this.extraHeaders,
                forceNode: b.forceNode || this.forceNode,
                localAddress: b.localAddress || this.localAddress,
                requestTimeout: b.requestTimeout || this.requestTimeout,
                protocols: b.protocols || void 0,
                isReactNative: this.isReactNative
            })
        }
        ;
        c.prototype.open = function() {
            if (this.rememberUpgrade && c.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket"))
                var a = "websocket";
            else {
                if (0 === this.transports.length) {
                    var b = this;
                    return void setTimeout(function() {
                        b.emit("error", "No transports available")
                    }, 0)
                }
                a = this.transports[0]
            }
            this.readyState = "opening";
            try {
                a = this.createTransport(a)
            } catch (T) {
                return this.transports.shift(),
                void this.open()
            }
            a.open();
            this.setTransport(a)
        }
        ;
        c.prototype.setTransport = function(a) {
            h("setting transport %s", a.name);
            var b = this;
            this.transport && (h("clearing existing transport %s", this.transport.name),
            this.transport.removeAllListeners());
            this.transport = a;
            a.on("drain", function() {
                b.onDrain()
            }).on("packet", function(a) {
                b.onPacket(a)
            }).on("error", function(a) {
                b.onError(a)
            }).on("close", function() {
                b.onClose("transport close")
            })
        }
        ;
        c.prototype.probe = function(a) {
            function b() {
                if (M.onlyBinaryUpgrades) {
                    var b = !this.supportsBinary && M.transport.supportsBinary;
                    C = C || b
                }
                C || (h('probe transport "%s" opened', a),
                p.send([{
                    type: "ping",
                    data: "probe"
                }]),
                p.once("packet", function(b) {
                    if (!C)
                        if ("pong" === b.type && "probe" === b.data) {
                            if (h('probe transport "%s" pong', a),
                            M.upgrading = !0,
                            M.emit("upgrading", p),
                            p)
                                c.priorWebsocketSuccess = "websocket" === p.name,
                                h('pausing current transport "%s"', M.transport.name),
                                M.transport.pause(function() {
                                    C || "closed" !== M.readyState && (h("changing transport and sending upgrade packet"),
                                    I(),
                                    M.setTransport(p),
                                    p.send([{
                                        type: "upgrade"
                                    }]),
                                    M.emit("upgrade", p),
                                    p = null,
                                    M.upgrading = !1,
                                    M.flush())
                                })
                        } else
                            h('probe transport "%s" failed', a),
                            b = Error("probe error"),
                            b.transport = p.name,
                            M.emit("upgradeError", b)
                }))
            }
            function d() {
                C || (C = !0,
                I(),
                p.close(),
                p = null)
            }
            function e(b) {
                var c = Error("probe error: " + b);
                c.transport = p.name;
                d();
                h('probe transport "%s" failed because of error: %s', a, b);
                M.emit("upgradeError", c)
            }
            function g() {
                e("transport closed")
            }
            function x() {
                e("socket closed")
            }
            function w(a) {
                p && a.name !== p.name && (h('"%s" works - aborting "%s"', a.name, p.name),
                d())
            }
            function I() {
                p.removeListener("open", b);
                p.removeListener("error", e);
                p.removeListener("close", g);
                M.removeListener("close", x);
                M.removeListener("upgrading", w)
            }
            h('probing transport "%s"', a);
            var p = this.createTransport(a, {
                probe: 1
            })
              , C = !1
              , M = this;
            c.priorWebsocketSuccess = !1;
            p.once("open", b);
            p.once("error", e);
            p.once("close", g);
            this.once("close", x);
            this.once("upgrading", w);
            p.open()
        }
        ;
        c.prototype.onOpen = function() {
            if (h("socket open"),
            this.readyState = "open",
            c.priorWebsocketSuccess = "websocket" === this.transport.name,
            this.emit("open"),
            this.flush(),
            "open" === this.readyState && this.upgrade && this.transport.pause) {
                h("starting upgrade probes");
                for (var a = 0, b = this.upgrades.length; a < b; a++)
                    this.probe(this.upgrades[a])
            }
        }
        ;
        c.prototype.onPacket = function(a) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
                switch (h('socket receive: type "%s", data "%s"', a.type, a.data),
                this.emit("packet", a),
                this.emit("heartbeat"),
                a.type) {
                case "open":
                    this.onHandshake(JSON.parse(a.data));
                    break;
                case "pong":
                    this.setPing();
                    this.emit("pong");
                    break;
                case "error":
                    var b = Error("server error");
                    b.code = a.data;
                    this.onError(b);
                    break;
                case "message":
                    this.emit("data", a.data),
                    this.emit("message", a.data)
                }
            else
                h('packet received with socket readyState "%s"', this.readyState)
        }
        ;
        c.prototype.onHandshake = function(a) {
            this.emit("handshake", a);
            this.id = a.sid;
            this.transport.query.sid = a.sid;
            this.upgrades = this.filterUpgrades(a.upgrades);
            this.pingInterval = a.pingInterval;
            this.pingTimeout = a.pingTimeout;
            this.onOpen();
            "closed" !== this.readyState && (this.setPing(),
            this.removeListener("heartbeat", this.onHeartbeat),
            this.on("heartbeat", this.onHeartbeat))
        }
        ;
        c.prototype.onHeartbeat = function(a) {
            clearTimeout(this.pingTimeoutTimer);
            var b = this;
            b.pingTimeoutTimer = setTimeout(function() {
                "closed" !== b.readyState && b.onClose("ping timeout")
            }, a || b.pingInterval + b.pingTimeout)
        }
        ;
        c.prototype.setPing = function() {
            var a = this;
            clearTimeout(a.pingIntervalTimer);
            a.pingIntervalTimer = setTimeout(function() {
                h("writing ping packet - expecting pong within %sms", a.pingTimeout);
                a.ping();
                a.onHeartbeat(a.pingTimeout)
            }, a.pingInterval)
        }
        ;
        c.prototype.ping = function() {
            var a = this;
            this.sendPacket("ping", function() {
                a.emit("ping")
            })
        }
        ;
        c.prototype.onDrain = function() {
            this.writeBuffer.splice(0, this.prevBufferLen);
            this.prevBufferLen = 0;
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
        }
        ;
        c.prototype.flush = function() {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (h("flushing %d packets in socket", this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            this.prevBufferLen = this.writeBuffer.length,
            this.emit("flush"))
        }
        ;
        c.prototype.write = c.prototype.send = function(a, b, c) {
            return this.sendPacket("message", a, b, c),
            this
        }
        ;
        c.prototype.sendPacket = function(a, b, c, d) {
            if ("function" == typeof b && (d = b,
            b = void 0),
            "function" == typeof c && (d = c,
            c = null),
            "closing" !== this.readyState && "closed" !== this.readyState)
                c = c || {},
                c.compress = !1 !== c.compress,
                a = {
                    type: a,
                    data: b,
                    options: c
                },
                this.emit("packetCreate", a),
                this.writeBuffer.push(a),
                d && this.once("flush", d),
                this.flush()
        }
        ;
        c.prototype.close = function() {
            function a() {
                d.onClose("forced close");
                h("socket closing - telling transport to close");
                d.transport.close()
            }
            function b() {
                d.removeListener("upgrade", b);
                d.removeListener("upgradeError", b);
                a()
            }
            function c() {
                d.once("upgrade", b);
                d.once("upgradeError", b)
            }
            if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";
                var d = this;
                this.writeBuffer.length ? this.once("drain", function() {
                    this.upgrading ? c() : a()
                }) : this.upgrading ? c() : a()
            }
            return this
        }
        ;
        c.prototype.onError = function(a) {
            h("socket error %j", a);
            c.priorWebsocketSuccess = !1;
            this.emit("error", a);
            this.onClose("transport error", a)
        }
        ;
        c.prototype.onClose = function(a, b) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
                h('socket close with reason: "%s"', a),
                clearTimeout(this.pingIntervalTimer),
                clearTimeout(this.pingTimeoutTimer),
                this.transport.removeAllListeners("close"),
                this.transport.close(),
                this.transport.removeAllListeners(),
                this.readyState = "closed",
                this.id = null,
                this.emit("close", a, b),
                this.writeBuffer = [],
                this.prevBufferLen = 0
        }
        ;
        c.prototype.filterUpgrades = function(a) {
            for (var c = [], d = 0, e = a.length; d < e; d++)
                ~b(this.transports, a[d]) && c.push(a[d]);
            return c
        }
    }
    , function(a, d, g) {
        var c = g(16)
          , e = g(18)
          , h = g(32);
        a = g(33);
        d.polling = function(a) {
            var b, d = !1, g = !1, x = !1 !== a.jsonp;
            "undefined" != typeof location && (g = "https:" === location.protocol,
            (d = location.port) || (d = g ? 443 : 80),
            d = a.hostname !== location.hostname || d !== a.port,
            g = a.secure !== g);
            if (a.xdomain = d,
            a.xscheme = g,
            b = new c(a),
            "open"in b && !a.forceJSONP)
                return new e(a);
            if (!x)
                throw Error("JSONP disabled");
            return new h(a)
        }
        ;
        d.websocket = a
    }
    , function(a, d, g) {
        var c = g(17);
        a.exports = function(a) {
            var d = a.xdomain
              , b = a.xscheme;
            a = a.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!d || c))
                    return new XMLHttpRequest
            } catch (C) {}
            try {
                if ("undefined" != typeof XDomainRequest && !b && a)
                    return new XDomainRequest
            } catch (C) {}
            if (!d)
                try {
                    return new (self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                } catch (C) {}
        }
    }
    , function(a, d) {
        try {
            a.exports = "undefined" != typeof XMLHttpRequest && "withCredentials"in new XMLHttpRequest
        } catch (g) {
            a.exports = !1
        }
    }
    , function(a, d, g) {
        function c() {}
        function e(a) {
            if (p.call(this, a),
            this.requestTimeout = a.requestTimeout,
            this.extraHeaders = a.extraHeaders,
            "undefined" != typeof location) {
                var b = "https:" === location.protocol
                  , c = location.port;
                c || (c = b ? 443 : 80);
                this.xd = "undefined" != typeof location && a.hostname !== location.hostname || c !== a.port;
                this.xs = a.secure !== b
            }
        }
        function h(a) {
            this.method = a.method || "GET";
            this.uri = a.uri;
            this.xd = !!a.xd;
            this.xs = !!a.xs;
            this.async = !1 !== a.async;
            this.data = void 0 !== a.data ? a.data : null;
            this.agent = a.agent;
            this.isBinary = a.isBinary;
            this.supportsBinary = a.supportsBinary;
            this.enablesXDR = a.enablesXDR;
            this.requestTimeout = a.requestTimeout;
            this.pfx = a.pfx;
            this.key = a.key;
            this.passphrase = a.passphrase;
            this.cert = a.cert;
            this.ca = a.ca;
            this.ciphers = a.ciphers;
            this.rejectUnauthorized = a.rejectUnauthorized;
            this.extraHeaders = a.extraHeaders;
            this.create()
        }
        function b() {
            for (var a in h.requests)
                h.requests.hasOwnProperty(a) && h.requests[a].abort()
        }
        var C = g(16)
          , p = g(19);
        d = g(8);
        var w = g(30)
          , x = g(3)("engine.io-client:polling-xhr");
        if (a.exports = e,
        a.exports.Request = h,
        w(e, p),
        e.prototype.supportsBinary = !0,
        e.prototype.request = function(a) {
            return a = a || {},
            a.uri = this.uri(),
            a.xd = this.xd,
            a.xs = this.xs,
            a.agent = this.agent || !1,
            a.supportsBinary = this.supportsBinary,
            a.enablesXDR = this.enablesXDR,
            a.pfx = this.pfx,
            a.key = this.key,
            a.passphrase = this.passphrase,
            a.cert = this.cert,
            a.ca = this.ca,
            a.ciphers = this.ciphers,
            a.rejectUnauthorized = this.rejectUnauthorized,
            a.requestTimeout = this.requestTimeout,
            a.extraHeaders = this.extraHeaders,
            new h(a)
        }
        ,
        e.prototype.doWrite = function(a, b) {
            a = this.request({
                method: "POST",
                data: a,
                isBinary: "string" != typeof a && void 0 !== a
            });
            var c = this;
            a.on("success", b);
            a.on("error", function(a) {
                c.onError("xhr post error", a)
            });
            this.sendXhr = a
        }
        ,
        e.prototype.doPoll = function() {
            x("xhr poll");
            var a = this.request()
              , b = this;
            a.on("data", function(a) {
                b.onData(a)
            });
            a.on("error", function(a) {
                b.onError("xhr poll error", a)
            });
            this.pollXhr = a
        }
        ,
        d(h.prototype),
        h.prototype.create = function() {
            var a = {
                agent: this.agent,
                xdomain: this.xd,
                xscheme: this.xs,
                enablesXDR: this.enablesXDR
            };
            a.pfx = this.pfx;
            a.key = this.key;
            a.passphrase = this.passphrase;
            a.cert = this.cert;
            a.ca = this.ca;
            a.ciphers = this.ciphers;
            a.rejectUnauthorized = this.rejectUnauthorized;
            var b = this.xhr = new C(a)
              , c = this;
            try {
                x("xhr open %s: %s", this.method, this.uri);
                b.open(this.method, this.uri, this.async);
                try {
                    if (this.extraHeaders) {
                        b.setDisableHeaderCheck && b.setDisableHeaderCheck(!0);
                        for (var d in this.extraHeaders)
                            this.extraHeaders.hasOwnProperty(d) && b.setRequestHeader(d, this.extraHeaders[d])
                    }
                } catch (ca) {}
                if ("POST" === this.method)
                    try {
                        this.isBinary ? b.setRequestHeader("Content-type", "application/octet-stream") : b.setRequestHeader("Content-type", "text/plain;charset\x3dUTF-8")
                    } catch (ca) {}
                try {
                    b.setRequestHeader("Accept", "*/*")
                } catch (ca) {}
                "withCredentials"in b && (b.withCredentials = !0);
                this.requestTimeout && (b.timeout = this.requestTimeout);
                this.hasXDR() ? (b.onload = function() {
                    c.onLoad()
                }
                ,
                b.onerror = function() {
                    c.onError(b.responseText)
                }
                ) : b.onreadystatechange = function() {
                    if (2 === b.readyState)
                        try {
                            var a = b.getResponseHeader("Content-Type");
                            c.supportsBinary && "application/octet-stream" === a && (b.responseType = "arraybuffer")
                        } catch (W) {}
                    4 === b.readyState && (200 === b.status || 1223 === b.status ? c.onLoad() : setTimeout(function() {
                        c.onError(b.status)
                    }, 0))
                }
                ;
                x("xhr data %s", this.data);
                b.send(this.data)
            } catch (ca) {
                return void setTimeout(function() {
                    c.onError(ca)
                }, 0)
            }
            "undefined" != typeof document && (this.index = h.requestsCount++,
            h.requests[this.index] = this)
        }
        ,
        h.prototype.onSuccess = function() {
            this.emit("success");
            this.cleanup()
        }
        ,
        h.prototype.onData = function(a) {
            this.emit("data", a);
            this.onSuccess()
        }
        ,
        h.prototype.onError = function(a) {
            this.emit("error", a);
            this.cleanup(!0)
        }
        ,
        h.prototype.cleanup = function(a) {
            if ("undefined" != typeof this.xhr && null !== this.xhr) {
                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = c : this.xhr.onreadystatechange = c,
                a)
                    try {
                        this.xhr.abort()
                    } catch (T) {}
                "undefined" != typeof document && delete h.requests[this.index];
                this.xhr = null
            }
        }
        ,
        h.prototype.onLoad = function() {
            try {
                try {
                    var a = this.xhr.getResponseHeader("Content-Type")
                } catch (H) {}
                var b = "application/octet-stream" === a ? this.xhr.response || this.xhr.responseText : this.xhr.responseText
            } catch (H) {
                this.onError(H)
            }
            null != b && this.onData(b)
        }
        ,
        h.prototype.hasXDR = function() {
            return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
        }
        ,
        h.prototype.abort = function() {
            this.cleanup()
        }
        ,
        h.requestsCount = 0,
        h.requests = {},
        "undefined" != typeof document)
            "function" == typeof attachEvent ? attachEvent("onunload", b) : "function" == typeof addEventListener && addEventListener("onpagehide"in self ? "pagehide" : "unload", b, !1)
    }
    , function(a, d, g) {
        function c(a) {
            var b = a && a.forceBase64;
            w && !b || (this.supportsBinary = !1);
            e.call(this, a)
        }
        var e = g(20)
          , h = g(29)
          , b = g(21);
        d = g(30);
        var C = g(31)
          , p = g(3)("engine.io-client:polling");
        a.exports = c;
        var w = null != (new (g(16))({
            xdomain: !1
        })).responseType;
        d(c, e);
        c.prototype.name = "polling";
        c.prototype.doOpen = function() {
            this.poll()
        }
        ;
        c.prototype.pause = function(a) {
            function b() {
                p("paused");
                c.readyState = "paused";
                a()
            }
            var c = this;
            if (this.readyState = "pausing",
            this.polling || !this.writable) {
                var d = 0;
                this.polling && (p("we are currently polling - waiting to pause"),
                d++,
                this.once("pollComplete", function() {
                    p("pre-pause polling complete");
                    --d || b()
                }));
                this.writable || (p("we are currently writing - waiting to pause"),
                d++,
                this.once("drain", function() {
                    p("pre-pause writing complete");
                    --d || b()
                }))
            } else
                b()
        }
        ;
        c.prototype.poll = function() {
            p("polling");
            this.polling = !0;
            this.doPoll();
            this.emit("poll")
        }
        ;
        c.prototype.onData = function(a) {
            var c = this;
            p("polling got data %s", a);
            b.decodePayload(a, this.socket.binaryType, function(a, b, d) {
                return "opening" === c.readyState && c.onOpen(),
                "close" === a.type ? (c.onClose(),
                !1) : void c.onPacket(a)
            });
            "closed" !== this.readyState && (this.polling = !1,
            this.emit("pollComplete"),
            "open" === this.readyState ? this.poll() : p('ignoring poll - transport state "%s"', this.readyState))
        }
        ;
        c.prototype.doClose = function() {
            function a() {
                p("writing close packet");
                b.write([{
                    type: "close"
                }])
            }
            var b = this;
            "open" === this.readyState ? (p("transport open - closing"),
            a()) : (p("transport not open - deferring close"),
            this.once("open", a))
        }
        ;
        c.prototype.write = function(a) {
            var c = this;
            this.writable = !1;
            var d = function() {
                c.writable = !0;
                c.emit("drain")
            };
            b.encodePayload(a, this.supportsBinary, function(a) {
                c.doWrite(a, d)
            })
        }
        ;
        c.prototype.uri = function() {
            var a = this.query || {}
              , b = this.secure ? "https" : "http"
              , c = "";
            !1 !== this.timestampRequests && (a[this.timestampParam] = C());
            this.supportsBinary || a.sid || (a.b64 = 1);
            a = h.encode(a);
            this.port && ("https" === b && 443 !== Number(this.port) || "http" === b && 80 !== Number(this.port)) && (c = ":" + this.port);
            a.length && (a = "?" + a);
            var d = -1 !== this.hostname.indexOf(":");
            return b + "://" + (d ? "[" + this.hostname + "]" : this.hostname) + c + this.path + a
        }
    }
    , function(a, d, g) {
        function c(a) {
            this.path = a.path;
            this.hostname = a.hostname;
            this.port = a.port;
            this.secure = a.secure;
            this.query = a.query;
            this.timestampParam = a.timestampParam;
            this.timestampRequests = a.timestampRequests;
            this.readyState = "";
            this.agent = a.agent || !1;
            this.socket = a.socket;
            this.enablesXDR = a.enablesXDR;
            this.pfx = a.pfx;
            this.key = a.key;
            this.passphrase = a.passphrase;
            this.cert = a.cert;
            this.ca = a.ca;
            this.ciphers = a.ciphers;
            this.rejectUnauthorized = a.rejectUnauthorized;
            this.forceNode = a.forceNode;
            this.isReactNative = a.isReactNative;
            this.extraHeaders = a.extraHeaders;
            this.localAddress = a.localAddress
        }
        var e = g(21);
        d = g(8);
        a.exports = c;
        d(c.prototype);
        c.prototype.onError = function(a, b) {
            a = Error(a);
            return a.type = "TransportError",
            a.description = b,
            this.emit("error", a),
            this
        }
        ;
        c.prototype.open = function() {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening",
            this.doOpen()),
            this
        }
        ;
        c.prototype.close = function() {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(),
            this.onClose()),
            this
        }
        ;
        c.prototype.send = function(a) {
            if ("open" !== this.readyState)
                throw Error("Transport not open");
            this.write(a)
        }
        ;
        c.prototype.onOpen = function() {
            this.readyState = "open";
            this.writable = !0;
            this.emit("open")
        }
        ;
        c.prototype.onData = function(a) {
            a = e.decodePacket(a, this.socket.binaryType);
            this.onPacket(a)
        }
        ;
        c.prototype.onPacket = function(a) {
            this.emit("packet", a)
        }
        ;
        c.prototype.onClose = function() {
            this.readyState = "closed";
            this.emit("close")
        }
    }
    , function(a, d, g) {
        function c(a, b, c) {
            if (!b)
                return d.encodeBase64Packet(a, c);
            var e = new FileReader;
            return e.onload = function() {
                d.encodePacket({
                    type: a.type,
                    data: e.result
                }, b, !0, c)
            }
            ,
            e.readAsArrayBuffer(a.data)
        }
        function e(a, b, c) {
            var d = Array(a.length);
            c = p(a.length, c);
            for (var e = function(a, c, e) {
                b(c, function(b, c) {
                    d[a] = c;
                    e(b, d)
                })
            }, g = 0; g < a.length; g++)
                e(g, a[g], c)
        }
        var h;
        a = g(22);
        var b = g(23)
          , C = g(24)
          , p = g(25)
          , w = g(26);
        "undefined" != typeof ArrayBuffer && (h = g(27));
        var x = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent)
          , m = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent)
          , T = x || m;
        d.protocol = 3;
        var H = d.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        }
          , y = a(H)
          , ca = {
            type: "error",
            data: "parser error"
        }
          , W = g(28);
        d.encodePacket = function(a, b, e, g) {
            "function" == typeof b && (g = b,
            b = !1);
            "function" == typeof e && (g = e,
            e = null);
            var h = void 0 === a.data ? void 0 : a.data.buffer || a.data;
            if ("undefined" != typeof ArrayBuffer && h instanceof ArrayBuffer) {
                if (b) {
                    e = a.data;
                    b = new Uint8Array(e);
                    e = new Uint8Array(1 + e.byteLength);
                    e[0] = H[a.type];
                    for (a = 0; a < b.length; a++)
                        e[a + 1] = b[a];
                    a = g(e.buffer)
                } else
                    a = d.encodeBase64Packet(a, g);
                return a
            }
            if ("undefined" != typeof W && h instanceof W)
                return b ? T ? a = c(a, b, g) : (b = new Uint8Array(1),
                b[0] = H[a.type],
                a = new W([b.buffer, a.data]),
                a = g(a)) : a = d.encodeBase64Packet(a, g),
                a;
            if (h && h.base64)
                return g("b" + d.packets[a.type] + a.data.data);
            b = H[a.type];
            return void 0 !== a.data && (b += e ? w.encode(String(a.data), {
                strict: !1
            }) : String(a.data)),
            g("" + b)
        }
        ;
        d.encodeBase64Packet = function(a, b) {
            var c = "b" + d.packets[a.type];
            if ("undefined" != typeof W && a.data instanceof W) {
                var e = new FileReader;
                return e.onload = function() {
                    var a = e.result.split(",")[1];
                    b(c + a)
                }
                ,
                e.readAsDataURL(a.data)
            }
            try {
                var g = String.fromCharCode.apply(null, new Uint8Array(a.data))
            } catch (hb) {
                a = new Uint8Array(a.data);
                g = Array(a.length);
                for (var h = 0; h < a.length; h++)
                    g[h] = a[h];
                g = String.fromCharCode.apply(null, g)
            }
            return c += btoa(g),
            b(c)
        }
        ;
        d.decodePacket = function(a, b, c) {
            if (void 0 === a)
                return ca;
            if ("string" == typeof a) {
                if ("b" === a.charAt(0))
                    return d.decodeBase64Packet(a.substr(1), b);
                if (b = c) {
                    b = a;
                    try {
                        b = w.decode(b, {
                            strict: !1
                        })
                    } catch (M) {
                        b = !1
                    }
                    b = (a = b,
                    !1 === a)
                }
                if (b)
                    return ca;
                c = a.charAt(0);
                return Number(c) == c && y[c] ? 1 < a.length ? {
                    type: y[c],
                    data: a.substring(1)
                } : {
                    type: y[c]
                } : ca
            }
            c = (new Uint8Array(a))[0];
            a = C(a, 1);
            return W && "blob" === b && (a = new W([a])),
            {
                type: y[c],
                data: a
            }
        }
        ;
        d.decodeBase64Packet = function(a, b) {
            var c = y[a.charAt(0)];
            if (!h)
                return {
                    type: c,
                    data: {
                        base64: !0,
                        data: a.substr(1)
                    }
                };
            a = h.decode(a.substr(1));
            return "blob" === b && W && (a = new W([a])),
            {
                type: c,
                data: a
            }
        }
        ;
        d.encodePayload = function(a, c, g) {
            function h(a, b) {
                d.encodePacket(a, !!m && c, !1, function(a) {
                    b(null, a.length + ":" + a)
                })
            }
            "function" == typeof c && (g = c,
            c = null);
            var m = b(a);
            return c && m ? W && !T ? d.encodePayloadAsBlob(a, g) : d.encodePayloadAsArrayBuffer(a, g) : a.length ? void e(a, h, function(a, b) {
                return g(b.join(""))
            }) : g("0:")
        }
        ;
        d.decodePayload = function(a, b, c) {
            if ("string" != typeof a)
                return d.decodePayloadAsBinary(a, b, c);
            "function" == typeof b && (c = b,
            b = null);
            var e;
            if ("" === a)
                return c(ca, 0, 1);
            for (var g, h, m = "", y = 0, p = a.length; y < p; y++) {
                var x = a.charAt(y);
                if (":" === x) {
                    if ("" === m || m != (g = Number(m)) || (h = a.substr(y + 1, g),
                    m != h.length))
                        return c(ca, 0, 1);
                    if (h.length) {
                        if (e = d.decodePacket(h, b, !1),
                        ca.type === e.type && ca.data === e.data)
                            return c(ca, 0, 1);
                        if (!1 === c(e, y + g, p))
                            return
                    }
                    y += g;
                    m = ""
                } else
                    m += x
            }
            return "" !== m ? c(ca, 0, 1) : void 0
        }
        ;
        d.encodePayloadAsArrayBuffer = function(a, b) {
            function c(a, b) {
                d.encodePacket(a, !0, !0, function(a) {
                    return b(null, a)
                })
            }
            return a.length ? void e(a, c, function(a, c) {
                a = c.reduce(function(a, b) {
                    var c;
                    return c = "string" == typeof b ? b.length : b.byteLength,
                    a + c.toString().length + c + 2
                }, 0);
                var d = new Uint8Array(a)
                  , e = 0;
                return c.forEach(function(a) {
                    var b = "string" == typeof a
                      , c = a;
                    if (b) {
                        c = new Uint8Array(a.length);
                        for (var g = 0; g < a.length; g++)
                            c[g] = a.charCodeAt(g);
                        c = c.buffer
                    }
                    b ? d[e++] = 0 : d[e++] = 1;
                    a = c.byteLength.toString();
                    for (g = 0; g < a.length; g++)
                        d[e++] = parseInt(a[g]);
                    d[e++] = 255;
                    c = new Uint8Array(c);
                    for (g = 0; g < c.length; g++)
                        d[e++] = c[g]
                }),
                b(d.buffer)
            }) : b(new ArrayBuffer(0))
        }
        ;
        d.encodePayloadAsBlob = function(a, b) {
            e(a, function(a, b) {
                d.encodePacket(a, !0, !0, function(a) {
                    var c = new Uint8Array(1);
                    if (c[0] = 1,
                    "string" == typeof a) {
                        for (var d = new Uint8Array(a.length), e = 0; e < a.length; e++)
                            d[e] = a.charCodeAt(e);
                        a = d.buffer;
                        c[0] = 0
                    }
                    d = (a instanceof ArrayBuffer ? a.byteLength : a.size).toString();
                    var g = new Uint8Array(d.length + 1);
                    for (e = 0; e < d.length; e++)
                        g[e] = parseInt(d[e]);
                    if (g[d.length] = 255,
                    W)
                        a = new W([c.buffer, g.buffer, a]),
                        b(null, a)
                })
            }, function(a, c) {
                return b(new W(c))
            })
        }
        ;
        d.decodePayloadAsBinary = function(a, b, c) {
            "function" == typeof b && (c = b,
            b = null);
            for (var e = []; 0 < a.byteLength; ) {
                for (var g = new Uint8Array(a), h = 0 === g[0], m = "", y = 1; 255 !== g[y]; y++) {
                    if (310 < m.length)
                        return c(ca, 0, 1);
                    m += g[y]
                }
                a = C(a, 2 + m.length);
                m = parseInt(m);
                g = C(a, 0, m);
                if (h)
                    try {
                        g = String.fromCharCode.apply(null, new Uint8Array(g))
                    } catch (Eb) {
                        for (h = new Uint8Array(g),
                        g = "",
                        y = 0; y < h.length; y++)
                            g += String.fromCharCode(h[y])
                    }
                e.push(g);
                a = C(a, m)
            }
            var p = e.length;
            e.forEach(function(a, e) {
                c(d.decodePacket(a, b, !0), e, p)
            })
        }
    }
    , function(a, d) {
        a.exports = Object.keys || function(a) {
            var c = [], d = Object.prototype.hasOwnProperty, g;
            for (g in a)
                d.call(a, g) && c.push(g);
            return c
        }
    }
    , function(a, d, g) {
        function c(a) {
            if (!a || "object" != typeof a)
                return !1;
            if (e(a)) {
                for (var d = 0, g = a.length; d < g; d++)
                    if (c(a[d]))
                        return !0;
                return !1
            }
            if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(a) || "function" == typeof ArrayBuffer && a instanceof ArrayBuffer || h && a instanceof Blob || b && a instanceof File)
                return !0;
            if (a.toJSON && "function" == typeof a.toJSON && 1 === arguments.length)
                return c(a.toJSON(), !0);
            for (d in a)
                if (Object.prototype.hasOwnProperty.call(a, d) && c(a[d]))
                    return !0;
            return !1
        }
        var e = g(10);
        d = Object.prototype.toString;
        var h = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === d.call(Blob)
          , b = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === d.call(File);
        a.exports = c
    }
    , function(a, d) {
        a.exports = function(a, c, d) {
            var e = a.byteLength;
            if (c = c || 0,
            d = d || e,
            a.slice)
                return a.slice(c, d);
            if (0 > c && (c += e),
            0 > d && (d += e),
            d > e && (d = e),
            c >= e || c >= d || 0 === e)
                return new ArrayBuffer(0);
            a = new Uint8Array(a);
            e = new Uint8Array(d - c);
            for (var b = 0; c < d; c++,
            b++)
                e[b] = a[c];
            return e.buffer
        }
    }
    , function(a, d) {
        function g() {}
        a.exports = function(a, d, h) {
            function b(a, e) {
                if (0 >= b.count)
                    throw Error("after called too many times");
                --b.count;
                a ? (c = !0,
                d(a),
                d = h) : 0 !== b.count || c || d(null, e)
            }
            var c = !1;
            return h = h || g,
            b.count = a,
            0 === a ? d() : b
        }
    }
    , function(a, d) {
        function g(a) {
            for (var b, c, d = [], e = 0, g = a.length; e < g; )
                b = a.charCodeAt(e++),
                55296 <= b && 56319 >= b && e < g ? (c = a.charCodeAt(e++),
                56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b),
                e--)) : d.push(b);
            return d
        }
        function c(a, b) {
            if (55296 <= a && 57343 >= a) {
                if (b)
                    throw Error("Lone surrogate U+" + a.toString(16).toUpperCase() + " is not a scalar value");
                return !1
            }
            return !0
        }
        function e() {
            if (p >= C)
                throw Error("Invalid byte index");
            var a = 255 & b[p];
            if (p++,
            128 == (192 & a))
                return 63 & a;
            throw Error("Invalid continuation byte");
        }
        function h(a) {
            var d, g, h, y, w;
            if (p > C)
                throw Error("Invalid byte index");
            if (p == C)
                return !1;
            if (d = 255 & b[p],
            p++,
            0 == (128 & d))
                return d;
            if (192 == (224 & d)) {
                if (g = e(),
                w = (31 & d) << 6 | g,
                128 <= w)
                    return w;
                throw Error("Invalid continuation byte");
            }
            if (224 == (240 & d)) {
                if (g = e(),
                h = e(),
                w = (15 & d) << 12 | g << 6 | h,
                2048 <= w)
                    return c(w, a) ? w : 65533;
                throw Error("Invalid continuation byte");
            }
            if (240 == (248 & d) && (g = e(),
            h = e(),
            y = e(),
            w = (7 & d) << 18 | g << 12 | h << 6 | y,
            65536 <= w && 1114111 >= w))
                return w;
            throw Error("Invalid UTF-8 detected");
        }
        var b, C, p, w = String.fromCharCode;
        a.exports = {
            version: "2.1.2",
            encode: function(a, b) {
                b = b || {};
                b = !1 !== b.strict;
                a = g(a);
                for (var d = a.length, e = -1, h = ""; ++e < d; ) {
                    var m = a[e];
                    var p = b;
                    if (0 == (4294967168 & m))
                        p = w(m);
                    else {
                        var x = "";
                        p = (0 == (4294965248 & m) ? x = w(m >> 6 & 31 | 192) : 0 == (4294901760 & m) ? (c(m, p) || (m = 65533),
                        x = w(m >> 12 & 15 | 224),
                        x += w(m >> 6 & 63 | 128)) : 0 == (4292870144 & m) && (x = w(m >> 18 & 7 | 240),
                        x += w(m >> 12 & 63 | 128),
                        x += w(m >> 6 & 63 | 128)),
                        x + w(63 & m | 128))
                    }
                    h += p
                }
                return h
            },
            decode: function(a, c) {
                c = c || {};
                c = !1 !== c.strict;
                b = g(a);
                C = b.length;
                p = 0;
                var d;
                for (a = []; !1 !== (d = h(c)); )
                    a.push(d);
                d = a.length;
                for (var e = -1, y = ""; ++e < d; )
                    c = a[e],
                    65535 < c && (c -= 65536,
                    y += w(c >>> 10 & 1023 | 55296),
                    c = 56320 | 1023 & c),
                    y += w(c);
                return y
            }
        }
    }
    , function(a, d) {
        (function() {
            for (var a = new Uint8Array(256), c = 0; 64 > c; c++)
                a["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(c)] = c;
            d.encode = function(a) {
                var c = new Uint8Array(a)
                  , b = c.length
                  , d = "";
                for (a = 0; a < b; a += 3)
                    d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c[a] >> 2],
                    d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(3 & c[a]) << 4 | c[a + 1] >> 4],
                    d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(15 & c[a + 1]) << 2 | c[a + 2] >> 6],
                    d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[63 & c[a + 2]];
                return 2 === b % 3 ? d = d.substring(0, d.length - 1) + "\x3d" : 1 === b % 3 && (d = d.substring(0, d.length - 2) + "\x3d\x3d"),
                d
            }
            ;
            d.decode = function(c) {
                var d = .75 * c.length;
                var b = c.length
                  , e = 0;
                "\x3d" === c[c.length - 1] && (d--,
                "\x3d" === c[c.length - 2] && d--);
                var g = new ArrayBuffer(d)
                  , w = new Uint8Array(g);
                for (d = 0; d < b; d += 4) {
                    var x = a[c.charCodeAt(d)];
                    var m = a[c.charCodeAt(d + 1)];
                    var T = a[c.charCodeAt(d + 2)];
                    var H = a[c.charCodeAt(d + 3)];
                    w[e++] = x << 2 | m >> 4;
                    w[e++] = (15 & m) << 4 | T >> 2;
                    w[e++] = (3 & T) << 6 | 63 & H
                }
                return g
            }
        }
        )()
    }
    , function(a, d) {
        function g(a) {
            return a.map(function(a) {
                if (a.buffer instanceof ArrayBuffer) {
                    var b = a.buffer;
                    if (a.byteLength !== b.byteLength) {
                        var c = new Uint8Array(a.byteLength);
                        c.set(new Uint8Array(b,a.byteOffset,a.byteLength));
                        b = c.buffer
                    }
                    return b
                }
                return a
            })
        }
        function c(a, b) {
            b = b || {};
            var c = new h;
            return g(a).forEach(function(a) {
                c.append(a)
            }),
            b.type ? c.getBlob(b.type) : c.getBlob()
        }
        function e(a, b) {
            return new Blob(g(a),b || {})
        }
        var h = "undefined" != typeof h ? h : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder;
        try {
            var b = 2 === (new Blob(["hi"])).size
        } catch (p) {
            b = !1
        }
        if (d = b)
            try {
                d = 2 === (new Blob([new Uint8Array([1, 2])])).size
            } catch (p) {
                d = !1
            }
        var C = h && h.prototype.append && h.prototype.getBlob;
        "undefined" != typeof Blob && (c.prototype = Blob.prototype,
        e.prototype = Blob.prototype);
        a.exports = b ? d ? Blob : e : C ? c : void 0
    }
    , function(a, d) {
        d.encode = function(a) {
            var c = "", d;
            for (d in a)
                a.hasOwnProperty(d) && (c.length && (c += "\x26"),
                c += encodeURIComponent(d) + "\x3d" + encodeURIComponent(a[d]));
            return c
        }
        ;
        d.decode = function(a) {
            var c = {};
            a = a.split("\x26");
            for (var d = 0, g = a.length; d < g; d++) {
                var b = a[d].split("\x3d");
                c[decodeURIComponent(b[0])] = decodeURIComponent(b[1])
            }
            return c
        }
    }
    , function(a, d) {
        a.exports = function(a, c) {
            var d = function() {};
            d.prototype = c.prototype;
            a.prototype = new d;
            a.prototype.constructor = a
        }
    }
    , function(a, d) {
        function g(a) {
            var c = "";
            do
                c = h[a % b] + c,
                a = Math.floor(a / b);
            while (0 < a);return c
        }
        function c() {
            var a = g(+new Date);
            return a !== e ? (p = 0,
            e = a) : a + "." + g(p++)
        }
        for (var e, h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), b = 64, C = {}, p = 0, w = 0; w < b; w++)
            C[h[w]] = w;
        c.encode = g;
        c.decode = function(a) {
            var c = 0;
            for (w = 0; w < a.length; w++)
                c = c * b + C[a.charAt(w)];
            return c
        }
        ;
        a.exports = c
    }
    , function(a, d, g) {
        (function(c) {
            function d() {}
            function h(a) {
                (b.call(this, a),
                this.query = this.query || {},
                p) || (a = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof c ? c : {},
                p = a.___eio = a.___eio || []);
                this.index = p.length;
                var e = this;
                p.push(function(a) {
                    e.onData(a)
                });
                this.query.j = this.index;
                "function" == typeof addEventListener && addEventListener("beforeunload", function() {
                    e.script && (e.script.onerror = d)
                }, !1)
            }
            var b = g(19)
              , C = g(30);
            a.exports = h;
            var p, w = /\n/g, x = /\\n/g;
            C(h, b);
            h.prototype.supportsBinary = !1;
            h.prototype.doClose = function() {
                this.script && (this.script.parentNode.removeChild(this.script),
                this.script = null);
                this.form && (this.form.parentNode.removeChild(this.form),
                this.form = null,
                this.iframe = null);
                b.prototype.doClose.call(this)
            }
            ;
            h.prototype.doPoll = function() {
                var a = this
                  , b = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script),
                this.script = null);
                b.async = !0;
                b.src = this.uri();
                b.onerror = function(b) {
                    a.onError("jsonp poll error", b)
                }
                ;
                var c = document.getElementsByTagName("script")[0];
                c ? c.parentNode.insertBefore(b, c) : (document.head || document.body).appendChild(b);
                this.script = b;
                "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                    var a = document.createElement("iframe");
                    document.body.appendChild(a);
                    document.body.removeChild(a)
                }, 100)
            }
            ;
            h.prototype.doWrite = function(a, b) {
                function c() {
                    d();
                    b()
                }
                function d() {
                    if (e.iframe)
                        try {
                            e.form.removeChild(e.iframe)
                        } catch (M) {
                            e.onError("jsonp polling iframe removal error", M)
                        }
                    try {
                        g = document.createElement('\x3ciframe src\x3d"javascript:0" name\x3d"' + e.iframeId + '"\x3e')
                    } catch (M) {
                        g = document.createElement("iframe"),
                        g.name = e.iframeId,
                        g.src = "javascript:0"
                    }
                    g.id = e.iframeId;
                    e.form.appendChild(g);
                    e.iframe = g
                }
                var e = this;
                if (!this.form) {
                    var g, h = document.createElement("form"), m = document.createElement("textarea"), p = this.iframeId = "eio_iframe_" + this.index;
                    h.className = "socketio";
                    h.style.position = "absolute";
                    h.style.top = "-1000px";
                    h.style.left = "-1000px";
                    h.target = p;
                    h.method = "POST";
                    h.setAttribute("accept-charset", "utf-8");
                    m.name = "d";
                    h.appendChild(m);
                    document.body.appendChild(h);
                    this.form = h;
                    this.area = m
                }
                this.form.action = this.uri();
                d();
                a = a.replace(x, "\\\n");
                this.area.value = a.replace(w, "\\n");
                try {
                    this.form.submit()
                } catch (M) {}
                this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                    "complete" === e.iframe.readyState && c()
                }
                : this.iframe.onload = c
            }
        }
        ).call(d, function() {
            return this
        }())
    }
    , function(a, d, g) {
        function c(a) {
            a && a.forceBase64 && (this.supportsBinary = !1);
            this.perMessageDeflate = a.perMessageDeflate;
            this.usingBrowserWebSocket = x && !a.forceNode;
            this.protocols = a.protocols;
            this.usingBrowserWebSocket || (m = w);
            e.call(this, a)
        }
        var e = g(20)
          , h = g(21)
          , b = g(29);
        d = g(30);
        var C = g(31)
          , p = g(3)("engine.io-client:websocket");
        if ("undefined" == typeof self)
            try {
                var w = g(34)
            } catch (T) {}
        else
            var x = self.WebSocket || self.MozWebSocket;
        var m = x || w;
        a.exports = c;
        d(c, e);
        c.prototype.name = "websocket";
        c.prototype.supportsBinary = !0;
        c.prototype.doOpen = function() {
            if (this.check()) {
                var a = this.uri()
                  , b = this.protocols
                  , c = {
                    agent: this.agent,
                    perMessageDeflate: this.perMessageDeflate
                };
                c.pfx = this.pfx;
                c.key = this.key;
                c.passphrase = this.passphrase;
                c.cert = this.cert;
                c.ca = this.ca;
                c.ciphers = this.ciphers;
                c.rejectUnauthorized = this.rejectUnauthorized;
                this.extraHeaders && (c.headers = this.extraHeaders);
                this.localAddress && (c.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? b ? new m(a,b) : new m(a) : new m(a,b,c)
                } catch (ca) {
                    return this.emit("error", ca)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1);
                this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0,
                this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer";
                this.addEventListeners()
            }
        }
        ;
        c.prototype.addEventListeners = function() {
            var a = this;
            this.ws.onopen = function() {
                a.onOpen()
            }
            ;
            this.ws.onclose = function() {
                a.onClose()
            }
            ;
            this.ws.onmessage = function(b) {
                a.onData(b.data)
            }
            ;
            this.ws.onerror = function(b) {
                a.onError("websocket error", b)
            }
        }
        ;
        c.prototype.write = function(a) {
            function b() {
                c.emit("flush");
                setTimeout(function() {
                    c.writable = !0;
                    c.emit("drain")
                }, 0)
            }
            var c = this;
            this.writable = !1;
            for (var d = a.length, e = 0, g = d; e < g; e++)
                (function(a) {
                    h.encodePacket(a, c.supportsBinary, function(e) {
                        if (!c.usingBrowserWebSocket) {
                            var g = {};
                            (a.options && (g.compress = a.options.compress),
                            c.perMessageDeflate) && ("string" == typeof e ? Buffer.byteLength(e) : e.length) < c.perMessageDeflate.threshold && (g.compress = !1)
                        }
                        try {
                            c.usingBrowserWebSocket ? c.ws.send(e) : c.ws.send(e, g)
                        } catch (ua) {
                            p("websocket closed before onclose event")
                        }
                        --d || b()
                    })
                }
                )(a[e])
        }
        ;
        c.prototype.onClose = function() {
            e.prototype.onClose.call(this)
        }
        ;
        c.prototype.doClose = function() {
            "undefined" != typeof this.ws && this.ws.close()
        }
        ;
        c.prototype.uri = function() {
            var a = this.query || {}
              , c = this.secure ? "wss" : "ws"
              , d = "";
            this.port && ("wss" === c && 443 !== Number(this.port) || "ws" === c && 80 !== Number(this.port)) && (d = ":" + this.port);
            this.timestampRequests && (a[this.timestampParam] = C());
            this.supportsBinary || (a.b64 = 1);
            a = b.encode(a);
            a.length && (a = "?" + a);
            var e = -1 !== this.hostname.indexOf(":");
            return c + "://" + (e ? "[" + this.hostname + "]" : this.hostname) + d + this.path + a
        }
        ;
        c.prototype.check = function() {
            return !(!m || "__initialize"in m && this.name === c.prototype.name)
        }
    }
    , function(a, d) {}
    , function(a, d) {
        var g = [].indexOf;
        a.exports = function(a, d) {
            if (g)
                return a.indexOf(d);
            for (var c = 0; c < a.length; ++c)
                if (a[c] === d)
                    return c;
            return -1
        }
    }
    , function(a, d, g) {
        function c(a, b, c) {
            this.io = a;
            this.nsp = b;
            this.json = this;
            this.ids = 0;
            this.acks = {};
            this.receiveBuffer = [];
            this.sendBuffer = [];
            this.connected = !1;
            this.disconnected = !0;
            this.flags = {};
            c && c.query && (this.query = c.query);
            this.io.autoConnect && this.open()
        }
        var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
            return typeof a
        }
        : function(a) {
            return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        }
          , h = g(7);
        d = g(8);
        var b = g(37)
          , C = g(38)
          , p = g(39)
          , w = g(3)("socket.io-client:socket")
          , x = g(29)
          , m = g(23);
        a.exports = c;
        var T = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        }
          , H = d.prototype.emit;
        d(c.prototype);
        c.prototype.subEvents = function() {
            if (!this.subs) {
                var a = this.io;
                this.subs = [C(a, "open", p(this, "onopen")), C(a, "packet", p(this, "onpacket")), C(a, "close", p(this, "onclose"))]
            }
        }
        ;
        c.prototype.open = c.prototype.connect = function() {
            return this.connected ? this : (this.subEvents(),
            this.io.open(),
            "open" === this.io.readyState && this.onopen(),
            this.emit("connecting"),
            this)
        }
        ;
        c.prototype.send = function() {
            var a = b(arguments);
            return a.unshift("message"),
            this.emit.apply(this, a),
            this
        }
        ;
        c.prototype.emit = function(a) {
            if (T.hasOwnProperty(a))
                return H.apply(this, arguments),
                this;
            var c = b(arguments)
              , d = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : m(c)) ? h.BINARY_EVENT : h.EVENT,
                data: c
            };
            return d.options = {},
            d.options.compress = !this.flags || !1 !== this.flags.compress,
            "function" == typeof c[c.length - 1] && (w("emitting packet with ack id %d", this.ids),
            this.acks[this.ids] = c.pop(),
            d.id = this.ids++),
            this.connected ? this.packet(d) : this.sendBuffer.push(d),
            this.flags = {},
            this
        }
        ;
        c.prototype.packet = function(a) {
            a.nsp = this.nsp;
            this.io.packet(a)
        }
        ;
        c.prototype.onopen = function() {
            if (w("transport is open - connecting"),
            "/" !== this.nsp)
                if (this.query) {
                    var a = "object" === e(this.query) ? x.encode(this.query) : this.query;
                    w("sending connect packet with query %s", a);
                    this.packet({
                        type: h.CONNECT,
                        query: a
                    })
                } else
                    this.packet({
                        type: h.CONNECT
                    })
        }
        ;
        c.prototype.onclose = function(a) {
            w("close (%s)", a);
            this.connected = !1;
            this.disconnected = !0;
            delete this.id;
            this.emit("disconnect", a)
        }
        ;
        c.prototype.onpacket = function(a) {
            var b = a.type === h.ERROR && "/" === a.nsp;
            if (a.nsp === this.nsp || b)
                switch (a.type) {
                case h.CONNECT:
                    this.onconnect();
                    break;
                case h.EVENT:
                    this.onevent(a);
                    break;
                case h.BINARY_EVENT:
                    this.onevent(a);
                    break;
                case h.ACK:
                    this.onack(a);
                    break;
                case h.BINARY_ACK:
                    this.onack(a);
                    break;
                case h.DISCONNECT:
                    this.ondisconnect();
                    break;
                case h.ERROR:
                    this.emit("error", a.data)
                }
        }
        ;
        c.prototype.onevent = function(a) {
            var b = a.data || [];
            w("emitting event %j", b);
            null != a.id && (w("attaching ack callback to event"),
            b.push(this.ack(a.id)));
            this.connected ? H.apply(this, b) : this.receiveBuffer.push(b)
        }
        ;
        c.prototype.ack = function(a) {
            var c = this
              , d = !1;
            return function() {
                if (!d) {
                    d = !0;
                    var e = b(arguments);
                    w("sending ack %j", e);
                    c.packet({
                        type: m(e) ? h.BINARY_ACK : h.ACK,
                        id: a,
                        data: e
                    })
                }
            }
        }
        ;
        c.prototype.onack = function(a) {
            var b = this.acks[a.id];
            "function" == typeof b ? (w("calling ack %s with %j", a.id, a.data),
            b.apply(this, a.data),
            delete this.acks[a.id]) : w("bad ack %s", a.id)
        }
        ;
        c.prototype.onconnect = function() {
            this.connected = !0;
            this.disconnected = !1;
            this.emit("connect");
            this.emitBuffered()
        }
        ;
        c.prototype.emitBuffered = function() {
            var a;
            for (a = 0; a < this.receiveBuffer.length; a++)
                H.apply(this, this.receiveBuffer[a]);
            this.receiveBuffer = [];
            for (a = 0; a < this.sendBuffer.length; a++)
                this.packet(this.sendBuffer[a]);
            this.sendBuffer = []
        }
        ;
        c.prototype.ondisconnect = function() {
            w("server disconnect (%s)", this.nsp);
            this.destroy();
            this.onclose("io server disconnect")
        }
        ;
        c.prototype.destroy = function() {
            if (this.subs) {
                for (var a = 0; a < this.subs.length; a++)
                    this.subs[a].destroy();
                this.subs = null
            }
            this.io.destroy(this)
        }
        ;
        c.prototype.close = c.prototype.disconnect = function() {
            return this.connected && (w("performing disconnect (%s)", this.nsp),
            this.packet({
                type: h.DISCONNECT
            })),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
        }
        ;
        c.prototype.compress = function(a) {
            return this.flags.compress = a,
            this
        }
        ;
        c.prototype.binary = function(a) {
            return this.flags.binary = a,
            this
        }
    }
    , function(a, d) {
        a.exports = function(a, c) {
            for (var d = [], g = (c = c || 0) || 0; g < a.length; g++)
                d[g - c] = a[g];
            return d
        }
    }
    , function(a, d) {
        a.exports = function(a, c, d) {
            return a.on(c, d),
            {
                destroy: function() {
                    a.removeListener(c, d)
                }
            }
        }
    }
    , function(a, d) {
        var g = [].slice;
        a.exports = function(a, d) {
            if ("string" == typeof d && (d = a[d]),
            "function" != typeof d)
                throw Error("bind() requires a function");
            var c = g.call(arguments, 2);
            return function() {
                return d.apply(a, c.concat(g.call(arguments)))
            }
        }
    }
    , function(a, d) {
        function g(a) {
            a = a || {};
            this.ms = a.min || 100;
            this.max = a.max || 1E4;
            this.factor = a.factor || 2;
            this.jitter = 0 < a.jitter && 1 >= a.jitter ? a.jitter : 0;
            this.attempts = 0
        }
        a.exports = g;
        g.prototype.duration = function() {
            var a = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var d = Math.random()
                  , g = Math.floor(d * this.jitter * a);
                a = 0 == (1 & Math.floor(10 * d)) ? a - g : a + g
            }
            return 0 | Math.min(a, this.max)
        }
        ;
        g.prototype.reset = function() {
            this.attempts = 0
        }
        ;
        g.prototype.setMin = function(a) {
            this.ms = a
        }
        ;
        g.prototype.setMax = function(a) {
            this.max = a
        }
        ;
        g.prototype.setJitter = function(a) {
            this.jitter = a
        }
    }
    ])
});
function bc4ToUint6(a) {
    return 64 < a && 91 > a ? a - 65 : 96 < a && 123 > a ? a - 71 : 47 < a && 58 > a ? a + 4 : 43 === a ? 62 : 47 === a ? 63 : 0
}
function bda(a, d) {
    a = a.replace(/[^A-Za-z0-9\+\/]/g, "");
    var g = a.length;
    d = d ? Math.ceil((3 * g + 1 >> 2) / d) * d : 3 * g + 1 >> 2;
    for (var c = new Uint8Array(d), e, h = 0, b = 0, C = 0; C < g; C++)
        if (e = C & 3,
        h |= bc4ToUint6(a.charCodeAt(C)) << 18 - 6 * e,
        3 === e || 1 === g - C) {
            for (e = 0; 3 > e && b < d; e++,
            b++)
                c[b] = h >>> (16 >>> e & 24) & 255;
            h = 0
        }
    return c
}
function uint6ToB64(a) {
    return 26 > a ? a + 65 : 52 > a ? a + 71 : 62 > a ? a - 4 : 62 === a ? 43 : 63 === a ? 47 : 65
}
function bea(a) {
    for (var d = 2, g = "", c = a.length, e = 0, h = 0; h < c; h++)
        if (d = h % 3,
        0 < h && 0 === 4 * h / 3 % 76 && (g += "\r\n"),
        e |= a[h] << (16 >>> d & 24),
        2 === d || 1 === a.length - h)
            g += String.fromCharCode(uint6ToB64(e >>> 18 & 63), uint6ToB64(e >>> 12 & 63), uint6ToB64(e >>> 6 & 63), uint6ToB64(e & 63)),
            e = 0;
    return g.substr(0, g.length - 2 + d) + (2 === d ? "" : 1 === d ? "\x3d" : "\x3d\x3d")
}
function UTF8ArrToStr(a) {
    for (var d = "", g, c = a.length, e = 0; e < c; e++)
        g = a[e],
        d += String.fromCharCode(251 < g && 254 > g && e + 5 < c ? 1073741824 * (g - 252) + (a[++e] - 128 << 24) + (a[++e] - 128 << 18) + (a[++e] - 128 << 12) + (a[++e] - 128 << 6) + a[++e] - 128 : 247 < g && 252 > g && e + 4 < c ? (g - 248 << 24) + (a[++e] - 128 << 18) + (a[++e] - 128 << 12) + (a[++e] - 128 << 6) + a[++e] - 128 : 239 < g && 248 > g && e + 3 < c ? (g - 240 << 18) + (a[++e] - 128 << 12) + (a[++e] - 128 << 6) + a[++e] - 128 : 223 < g && 240 > g && e + 2 < c ? (g - 224 << 12) + (a[++e] - 128 << 6) + a[++e] - 128 : 191 < g && 224 > g && e + 1 < c ? (g - 192 << 6) + a[++e] - 128 : g);
    return d
}
function strToUTF8Arr(a) {
    var d = a.length;
    for (var g = 0, c = 0; c < d; c++) {
        var e = a.charCodeAt(c);
        g += 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 2097152 > e ? 4 : 67108864 > e ? 5 : 6
    }
    d = new Uint8Array(g);
    for (var h = c = 0; c < g; h++)
        e = a.charCodeAt(h),
        128 > e ? d[c++] = e : (2048 > e ? d[c++] = 192 + (e >>> 6) : (65536 > e ? d[c++] = 224 + (e >>> 12) : (2097152 > e ? d[c++] = 240 + (e >>> 18) : (67108864 > e ? d[c++] = 248 + (e >>> 24) : (d[c++] = 252 + e / 1073741824,
        d[c++] = 128 + (e >>> 24 & 63)),
        d[c++] = 128 + (e >>> 18 & 63)),
        d[c++] = 128 + (e >>> 12 & 63)),
        d[c++] = 128 + (e >>> 6 & 63)),
        d[c++] = 128 + (e & 63));
    return d
}
function fixedEncodeURIComponent(a) {
    return encodeURIComponent(a).replace(/[!'()*]/g, function(a) {
        return "%" + a.charCodeAt(0).toString(16)
    })
}
function parseTypeAndValues(a) {
    if ("" == a)
        return {};
    for (var d = {}, g = 0; g < a.length; ++g) {
        var c = a[g].split("\x3d", 2);
        d[c[0]] = 1 == c.length ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
    }
    return d
}
function parseQueryString() {
    var a = window.location.search.substr(1).split("\x26");
    return parseTypeAndValues(a)
}
function inIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}
String.prototype.endsWith = function(a) {
    return -1 !== this.indexOf(a, this.length - a.length)
}
;
function LOG(a) {
    "undefined" != typeof console && console.log(a)
}
function LOG_ON_SERVER(a, d) {
    null === a && (a = "NULL log message");
    var g = {
        message: a.toString()
    };
    d && (g.warn = !0);
    $.post("log", g);
    "undefined" !== typeof console && (d ? console.warn(a) : console.log(a))
}
function WARN_ON_SERVER(a) {
    LOG_ON_SERVER(a, !0)
}
function report_ajax_error(a, d, g, c) {
    a = "AJAX error message: " + a + " textStatus: " + g + " errorThrown: " + c;
    ga("send", "exception", {
        exDescription: a,
        exFatal: !1
    });
    WARN_ON_SERVER(a)
}
function report_exception(a) {
    a = "Exception: " + a;
    ga("send", "exception", {
        exDescription: a,
        exFatal: !1
    });
    WARN_ON_SERVER(a)
}
var Utils = function() {
    return {
        LOG_ON_SERVER: LOG_ON_SERVER,
        WARN_ON_SERVER: WARN_ON_SERVER,
        report_ajax_error: report_ajax_error,
        report_exception: report_exception
    }
}();
function getTopURL() {
    return inIframe() ? document.referrer : document.location.href
}
Array.prototype.diff = function(a) {
    try {
        return this.filter(function(d) {
            return 0 > a.indexOf(d)
        })
    } catch (d) {
        return null
    }
}
;
function truncate(a, d) {
    return a.length > d ? a.substr(0, d) + "\x26hellip;" : a
}
function trim(a) {
    if ("string" !== typeof a)
        return a;
    for (; 0 != a.length; ) {
        var d = a.charAt(0);
        if ("\n" !== d && "\t" !== d && " " !== d)
            break;
        a = a.substring(1)
    }
    for (; 0 != a.length; ) {
        d = a.charAt(a.length - 1);
        if ("\n" !== d && "\t" !== d && " " !== d)
            break;
        a = a.substring(0, a.length - 1)
    }
    return a
}
var dump_obj = function(a, d) {
    if ("undefined" === typeof a)
        return "undefined";
    "undefined" === typeof d && (d = !1);
    var g = []
      , c = "typeof\x3d" + typeof a + " ";
    a.constructor.name && (c += " constructor\x3d" + a.constructor.name + " ");
    for (var e in a)
        try {
            if (d || a.hasOwnProperty(e))
                "function" === typeof a[e] ? g.push(e) : c += e + "\x3d" + a[e] + " "
        } catch (h) {
            WARN_ON_SERVER("exception trying to dump object field " + e + ":" + h)
        }
    0 < g.length && (c += g.length + " function(s): {");
    for (a = 0; a < g.length; a++)
        c += g[a],
        a < g.length - 1 && (c += " ");
    0 < g.length && (c += "}");
    return c
}
  , ellipsize = function(a, d) {
    return null == a ? null : 0 > d ? "" : 4 > d ? a.substring(0, d) : a.length > d ? a.substring(0, d - 3) + "..." : a
}
  , pluralize = function(a, d) {
    return 1 == a ? a + " " + d : a + " " + d + "s"
}
  , approximateTimeLeft = function(a) {
    var d = parseInt(a / 3600, 10)
      , g = parseInt(a % 3600 / 60, 10);
    return 7200 < a ? "About " + d + " hours left" : 1 == d && 5 < g ? "About an hour and " + pluralize(g, "minute") : 1 == d ? "About an hour" : 120 < a ? "About " + g + " minutes left" : 90 < a ? "A minute and a bit..." : 60 < a ? "About a minute..." : 30 < a ? "Less than a minute..." : 10 < a ? "Less than half a minute..." : "About 10 seconds..."
}
  , _f = function(a, d, g, c, e, h, b) {
    function C(a) {
        "undefined" !== typeof console && console.log(a)
    }
    function p() {
        return "playId: " + (n && n.playId ? n.playId : "unknown") + " term: " + (n && "undefined" !== typeof n.term ? n.term : "unknown") + " uid: " + (n && n.userId ? n.userId : "unknown") + " pid: " + (n && n.pid ? n.pid : "unknown") + " page: xword"
    }
    function w(a) {
        window.DEBUG_PM && x("DEBUG " + a, !1)
    }
    function x(a, b) {
        if (null === a || "undefined" === typeof a)
            a = "NULL log message";
        Utils.LOG_ON_SERVER(a + " " + p(), b)
    }
    function m(a) {
        x(a, !0)
    }
    function T(a, b, c, d) {
        Utils.report_ajax_error(p() + " " + a, b, c, d)
    }
    function H(a, b) {
        try {
            var c = a()
        } catch (kc) {
            a = "Error in performing " + b + ":" + kc,
            ga("send", "exception", {
                exDescription: a,
                exFatal: !1
            }),
            m(a),
            n && n.nExceptions++
        }
        return c
    }
    function y(a, b, c) {
        H(function() {
            ga("send", {
                hitType: "event",
                eventCategory: "Crossword",
                eventAction: a,
                eventLabel: b,
                eventValue: c
            })
        }, b)
    }
    function ca(a, b, c, d) {
        y(b, c, d);
        var f;
        a && (f = H(a, c));
        return f
    }
    function W(a, b) {
        return function(c) {
            return H(function() {
                a(c)
            }, b)
        }
    }
    function I(a, b, c) {
        return function(d) {
            return ca(function() {
                return a(d)
            }, b, c, K.getElapsedTime())
        }
    }
    function Qa() {
        for (var a = window.location.search.substr(1).split("\x26"), b = {}, c = 0; c < a.length; ++c) {
            var d = a[c].split("\x3d", 2);
            b[d[0]] = 1 === d.length ? "" : decodeURIComponent(d[1].replace(/\+/g, " "))
        }
        return b
    }
    function gb(a, b, c) {
        var d = ""
          , f = a.split("#");
        1 < f.length && (a = f[0],
        d = "#" + f[1]);
        f = a.split("?");
        if (2 > f.length)
            return a + "?" + b + "\x3d" + c + d;
        a = f[0] + "?";
        f = f[1].split("\x26");
        for (var A = !1, e = 0; e < f.length; e++) {
            var g = f[e].split("\x3d");
            g[0] !== b ? a += f[e] : (a = a + g[0] + "\x3d" + c,
            A = !0);
            e < f.length - 1 && (a += "\x26")
        }
        A || (a = a + "\x26" + b + "\x3d" + c);
        d && (a += d);
        return a
    }
    function M(a) {
        var b = z.src ? gb(z.src, "id", f.id) : ua() ? document.referrer : document.location.href;
        a && (b = gb(b, "playId", n.playId));
        return b
    }
    function ua() {
        try {
            return window.self !== window.top
        } catch (A) {
            return !0
        }
    }
    function Q(a) {
        try {
            return parseInt(a, 10)
        } catch (U) {
            return a
        }
    }
    function hb(a) {
        if (a.wordLens)
            var b = a.wordLens;
        var c = "(";
        if (b)
            for (a = 0; a < b.length; a++)
                c += b[a],
                a < b.length - 1 && (c += ",");
        else
            c += na(a);
        return c + ")"
    }
    function Ha(a, b) {
        return 1 === a ? a + " " + b : a + " " + b + t.plural_suffix
    }
    function Db() {
        var a = navigator.userAgent
          , b = /^((?!chrome|android).)*safari/i.test(a) && a.match(/WebKit/i);
        return Gb && b && !a.match(/CriOS/i) && !a.match(/FxiOS/i) && !a.match(/OPiOS/i)
    }
    function Eb() {
        for (var a = 0; a < f.box.length; a++) {
            Y[a] = [];
            for (var b = 0; b < f.box[a].length; b++)
                Y[a][b] = null
        }
    }
    function Fb() {
        for (var a = 0; a < f.h; a++)
            for (var b = 0; b < f.w; b++)
                if (f.box[b][a] !== pa && !va(f.box, b, a) && f.current_state[b][a] !== pa && f.current_state[b][a] !== ra)
                    return !0;
        return !1
    }
    function ib(a, b) {
        return f.box[a][b] === pa || va(f.box, a, b)
    }
    function Hb(a, b, c) {
        return a && a[b] && a[b][c] ? a[b][c] === ra || a[b][c] === pa || va(a, b, c) || "" === a[b][c].trim() : !0
    }
    function va(a, b, c) {
        return !f.isImported && a[b][c] === rb
    }
    function Ib(a, b, c) {
        f.cellInfos || (f.cellInfos = []);
        for (var d = null, G = 0; G < f.cellInfos.length; G++) {
            var l = f.cellInfos[G];
            if (l.x === a && l.y === b) {
                d = l;
                break
            }
        }
        !d && c && (d = {
            x: a,
            y: b
        },
        f.cellInfos.push(d));
        return d
    }
    function Xa(a, b) {
        return null == f.box[a][b] ? !0 : f.caseSensitive ? f.current_state[a][b] === f.box[a][b] : f.current_state[a][b].toLowerCase() === f.box[a][b].toLowerCase()
    }
    function Ja(a, b) {
        return f.current_state[a][b] === ra
        // var event = new CustomEvent("event", { "detail": "Example of an event" });
        // document.dispatchEvent(event);

    }
    function na(a) {
        return a.nBoxes ? a.nBoxes : a.word.length
    }
    function Ya(a) {
        for (var b = [], c = a.x, d = a.y, f = 0; f < na(a); f++)
            b.push({
                x: c,
                y: d
            }),
            c += a.acrossNotDown ? 1 : 0,
            d += a.acrossNotDown ? 0 : 1;
        return b
    }
    function Ba(a) {
        a = Ya(f.placedWords[a]);
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (Ja(c.x, c.y))
                return !1
        }
        return !0
    }
    function Ka() {
        return k.playSettings.usePopup && a("#answer-popup", ".pm-xword-body").hasClass("in")
    }
    function Ra(b, c) {
        if (null != c) {
            var d = 1 < a(".letter-in-box", b).text().length || 1 < c.length;
            f.caseSensitive ? a(".letter-in-box", b).text(c) : "ß" !== c ? a(".letter-in-box", b).text(c.toUpperCase()) : a(".letter-in-box", b).text("ẞ");
            d && (Ia = b.width(),
            c = Math.ceil(Ia / c.length) + 2,
            c = c > fa.getCurrentBoxStyle().letterFontSize ? fa.getCurrentBoxStyle().letterFontSize : c,
            a(".letter-in-box", b).css("font-size", c + "px"),
            c = Math.floor((Ia - a(".letter-in-box", b).height()) / 2) + 1,
            0 > c && (c = 0),
            a(".letter-in-box", b).css("top", c + "px"))
        }
    }
    function Jb() {
        a(".audio", b).html("");
        a(".video", b).html("");
        a(".picture", b).html("");
        "CROSSWORD" === f.puzzleType && (R.showRelatedLinks(),
        a(".clue-bar-text", b).html(""),
        a(".clue-bar-media-button", b).html(""),
        a("input.dummy", b).blur(),
        a("input.popup-dummy", b).blur());
        la.unhilite_everything()
    }
    function Za(a, b) {
        k.playSettings.errorCheckMode && 0 !== ha.length && (a = ha[a],
        b ? (a.removeClass("wrong-answer-clue"),
        a.removeClass("done-clue"),
        a.addClass("correct-answer-clue")) : (a.removeClass("correct-answer-clue"),
        a.removeClass("done-clue"),
        a.addClass("wrong-answer-clue")))
    }
    function Kb(a) {
        0 !== ha.length && (a = ha[a],
        a.removeClass("wrong-answer-clue"),
        a.removeClass("correct-answer-clue"),
        a.addClass("done-clue"))
    }
    function Lb(a) {
        0 !== ha.length && (a = ha[a],
        a.removeClass("wrong-answer-clue"),
        a.removeClass("correct-answer-clue"),
        a.removeClass("done-clue"))
    }
    function Mb() {
        b.hide();
        Nb();
        a(".orientation-change").show();
        var c = a(".modal-backdrop");
        0 < c.length && c.removeClass("in")
    }
    function jb() {
        n && (0 > n.score || !k.playSettings.showScore || a("#score", b).html(n.score))
    }
    function sb(c, d) {
        function e(c) {
            f.correctSoundURL && k.playSettings.soundEnabled && a(".correct-sound-url", b).get(0).play();
            Za(c, !0)
        }
        function g(c) {
            f.wrongSoundURL && k.playSettings.soundEnabled && a(".wrong-sound-url", b).get(0).play();
            Za(c, !1)
        }
        function G(a) {
            0 !== ha.length && ha[a].removeClass("correct-answer-clue").removeClass("wrong-answer-clue")
        }
        for (var l = na(f.placedWords[c]), A = 0, U = !0, h = !0, Ob = !1, m = "", r = Ya(f.placedWords[c]), N = 0; N < r.length; N++) {
            var D = r[N];
            Ja(D.x, D.y) && f.box[D.x][D.y] !== ra ? U = h = !1 : (Xa(D.x, D.y) ? Z[D.x][D.y] === J.BOX_STATE.REVEALED && A++ : (U = !1,
            Ob = !0),
            m += f.current_state[D.x][D.y])
        }
        n.score -= ya[c];
        ya[c] = 0;
        U && A < l && (ya[c] = A * Pb,
        ya[c] += Qb,
        0 > ya[c] && (ya[c] = 0));
        n.score += ya[c];
        d && (h ? Kb(c) : (Lb(c),
        G(c)),
        k.playSettings.errorCheckMode && (Ob ? Za(c, !1) : G(c)),
        U ? (Ta[c] = !1,
        e(c),
        ja && ja.recordCurrentPlayState(c)) : h ? Ta[c] || (Ta[c] = !0,
        g(c),
        ja && ja.recordCurrentPlayState(c)) : Ta[c] = !1,
        h && ka.saveProgress(),
        ja && (ja.userAnswers[c] = m))
    }
    function ub() {
        f && !aa && (k.playSettings.startTimerOnKeypress || K.start(),
        "SUDOKU" === f.puzzleType ? q ? R.processBoxClick(q.x, q.y) : R.processBoxClick(0, 0) : f.placedWords && (f.multiPlayEnabled && ja && ja.setupAndStartMultiplay(),
        !(0 < f.placedWords.length) || P && P.mediaCluesPresent || (ba = f.placedWords.length - 1,
        R.selectNextWord(!1, k.playSettings.skipOverFilledLetter))))
    }
    function nc(c) {
        c.preventDefault();
        Fb() ? (aa = !0,
        Jb(),
        v.clear_info_modal_body(),
        v.clear_info_modal_title(),
        v.set_info_modal_title(window.messages.contest_end_title),
        c = ka.getPlayState(),
        Ca.DISABLE_PLAY_IDS || (v.set_info_modal_body(""),
        a.ajax({
            type: "POST",
            async: !0,
            url: "postScore",
            contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
            dataType: "json",
            data: c,
            success: function() {
                f.endMessage ? a("#info-modal .modal-body", b).append(f.endMessage) : a("#info-modal .modal-body", b).append(window.messages.contest_end_message)
            },
            error: function(c, d, e) {
                a("#info-modal .modal-body", b).append("\x3cbr/\x3e\x3cp\x3e" + f.endMessage);
                a("#info-modal .modal-body", b).append("\x3cbr/\x3e\x3cp\x3e" + window.messages.contest_error_message);
                T("Error in posting scores", c, d, e)
            }
        })),
        K.stop(),
        v.show_info_modal(),
        a(".nav-submit", b).remove()) : v.showConfirmModal(t.submit, t.contest_empty_message, t.ok, null, null)
    }
    function Rb(c, d) {
        d = E[c][d];
        c = Math.ceil(d.position().left);
        d = Math.ceil(d.position().top);
        d += a(".grid-area", b).scrollTop();
        c += a(".grid-area", b).scrollLeft();
        a(".dummy", b).css("left", c + "px");
        a(".dummy", b).css("top", d + "px")
    }
    function vb() {
        if (q && r) {
            var c, d = Ka();
            d && r && (c = r.acrossNotDown ? da[0][q.x - r.x] : da[0][q.y - r.y]);
            c = d ? c.position().top : E[q.x][q.y].position().top;
            d = d ? a("input.popup-dummy", b) : a("input.dummy", b);
            if (d.position()) {
                var f = d.position().top;
                0 !== Math.floor(c) - Math.floor(f) && d.css("top", c + "px")
            }
        }
    }
    function Ua(a, b) {
        S.move_input_to_box(a, b);
        $a()
    }
    function $a() {
        k.playSettings.usePopup ? a(".popup-dummy", b).focus() : a(".dummy", b).focus();
        setTimeout(vb, 600)
    }
    function Nb() {
        a(".dummy", b).blur();
        a(".popup-dummy", b).blur()
    }
    function Sb() {
        if (k.playSettings.usePopup) {
            var c = 0
              , d = a("#answer-popup .modal-body", b).width()
              , e = Math.max(14 * a("input.popup-dummy", b).val().length, kb);
            e >= d ? a("input.popup-dummy", b).width(d) : (a("input.popup-dummy", b).position().left - a("#answer-popup .modal-body", b).position().left + e + 14 > d && (c = 15),
            0 < c && (c = a("input.popup-dummy", b).position().left - c,
            c >= a("#answer-popup .modal-body", b).position().left ? a("input.popup-dummy", b).css("left", c + "px") : a("input.popup-dummy", b).css("left", a("#answer-popup .modal-body", b).position().left)),
            d = Math.min(e + 14, d),
            a("input.popup-dummy", b).width(d))
        } else {
            d = 0;
            e = La * a("input.dummy", b).val().trim().length;
            e = Math.max(e, Ia + 1);
            c = a(".box", b).first().outerWidth() * f.w;
            var g = a(".grid-area", b).offset().left + c
              , G = a("input.dummy", b).offset().left + e;
            G + La > g && (d = G - g + La);
            0 < d && (d = a("input.dummy", b).position().left - d + 8,
            d >= a(".box", b).first().position().left ? a("input.dummy", b).css("left", d + "px") : a("input.dummy", b).css("left", a(".box").first().position().left));
            d = Math.min(e + La, c);
            a("input.dummy", b).width(d + 1)
        }
    }
    function Tb() {
        if (!aa) {
            if (!q)
                return !1;
            if (ta)
                return Va(),
                !1;
            var c = a("input.dummy", b)
              , d = a("input.popup-dummy", b);
            c.css("transform", "");
            d.css("transform", "");
            Ua(q.x, q.y);
            var f = a(".letter-in-box", E[q.x][q.y]).text();
            Ma = f;
            k.playSettings.usePopup ? d.val(f) : c.val(f);
            Sb();
            Gb && (f = Math.max(fa.getCurrentBoxStyle().letterFontSize + Math.round(.4 * fa.getCurrentBoxStyle().boxSize), fa.getCurrentBoxStyle().boxSize),
            c.height(f));
            k.playSettings.usePopup ? (S.move_input_to_box(q.x, q.y),
            d.addClass("letter show-box"),
            a("#popup-rebus-button", b).find(".menu-img").removeClass("rebus-inverted").addClass("rebus-selected")) : c.addClass("letter show-box");
            a(".navbar-nav\x3eli#rebus-button\x3ea").css("color", "green");
            a("#rebus-button", b).find("div").removeClass("rebus-normal").addClass("rebus-selected");
            ta = !0;
            return !1
        }
    }
    function Va() {
        ta && (a("input.dummy").css("transform", "scale(0)"),
        a("input.popup-dummy").css("transform", "scale(0)"),
        k.playSettings.usePopup ? (a("input.popup-dummy", b).width(kb),
        a("input.popup-dummy", b).height(kb),
        a("input.popup-dummy", b).removeClass("show-box").removeClass("letter"),
        a("#popup-rebus-button", b).find(".menu-img").removeClass("rebus-selected"),
        a("#popup-rebus-button", b).find(".menu-img").addClass("rebus-inverted")) : (a("input.dummy", b).width(Ia),
        a("input.dummy", b).height(Ia),
        a("input.dummy", b).removeClass("show-box")),
        a(".navbar-nav\x3eli#rebus-button\x3ea").css("color", ""),
        a("#rebus-button", b).find("div").addClass("rebus-normal"),
        a("#rebus-button", b).find("div").removeClass("rebus-selected"),
        a(".dummy", b).val(""),
        a(".popup-dummy", b).val(""),
        Ma = "",
        ta && a("#rebus-button", b).find("img").removeClass("selected"),
        ta = !1)
    }
    function oc(a) {
        a.preventDefault();
        a.stopImmediatePropagation();
        Tb();
        return !1
    }
    function Ub() {
        var a = (new Date).getTime();
        ab && -1 !== ab && clearTimeout(ab);
        600 > a - Vb ? ab = setTimeout(function() {
            R.showCurrentCrossingClue();
            k.playSettings.showLinkedClues && R.showLinkedClues();
            ab = -1
        }, 600) : (R.showCurrentCrossingClue(),
        k.playSettings.showLinkedClues && R.showLinkedClues());
        Vb = a
    }
    function Wb(b) {
        b.preventDefault();
        b = a(b.target).val();
        var c = b.charCodeAt(b.length - 1);
        b.length === Ma.length - 1 && (c = 8);
        Ma = b;
        b = jQuery.Event("keyup", {
            keyCode: c
        });
        S.keypress_handler(b);
        return !1
    }
    function Xb() {
        0 != a("#answer-popup").length && (k.playSettings.usePopup = !1,
        fa.adjustClueBarTop(),
        a(".clue-bar", b).show(),
        fa.adjustGridPlusCluesTop())
    }
    function Yb() {
        k.playSettings.usePopup = !0;
        a(".clue-bar", b).hide();
        fa.adjustGridPlusCluesTop()
    }
    function wb(a) {
        if (!ua())
            return !1;
        try {
            var c = {};
            c.src = "crossword";
            c.width = f.h;
            c.height = f.w;
            var d = "daily";
            "wapo-daily" === z.set ? d = "daily" : "wapo-mr" === z.set ? d = "classic-sunday" : "wapo-eb" === z.set && (d = "sunday");
            c.type = d;
            c.title = f.title;
            c.date = f.publishTime;
            c.author = f.author;
            c.authorURL = f.authorURL;
            c.editor = f.editor;
            c.copyright = f.copyright;
            c.attributions = f.attributions;
            c.puzzle_instructions = f.help;
            if (a) {
                var e = b.prop("scrollHeight")
                  , G = b.prop("scrollWidth");
                if (Math.abs(e - Zb) > pc) {
                    Zb = e;
                    w("screen.height\x3d " + screen.height + ", screen.width\x3d " + screen.width + ", frame height: " + e + ", frame width: " + G);
                    c.frameHeight = e + (f.attributions ? 20 : 50);
                    c.frameWidth = b.prop("scrollWidth");
                    var l = JSON.stringify(c);
                    window.parent.postMessage(l, "*")
                }
            } else
                l = JSON.stringify(c),
                window.parent.postMessage(l, "*")
        } catch (oa) {
            ga("send", "exception", {
                exDescription: "ERROR Unable to post message from crossword page for id:" + f.id + ", error:" + oa,
                exFatal: !1
            }),
            m("Failed to postmessage Exception:" + oa)
        }
        return !1
    }
    function qc() {
        function b() {
            K.stop();
            Na.markUserActivity(!0);
            ka.postPlayStateToServer(!1, !1);
            return !1
        }
        a(window).onbeforeunload = I(b, F + " -\x3e Page exit", "onbeforeunload");
        a(window).on("pagehide", I(b, F + " -\x3e Page exit", "pagehide"));
        a(window).on("pageshow", I(function() {
            !aa && Oa && K.start();
            Na.unPause();
            return !1
        }, F + " -\x3e Page entry", "pageshow"));
        a(window).on("blur focus", W(function(b) {
            if (!window.isPreview) {
                if (a(this).data("prevType") !== b.type) {
                    switch (b.type) {
                    case "blur":
                        K.stop();
                        Na.markUserActivity(!0);
                        ka.postPlayStateToServer(!1, !1);
                        var c = "Page blur";
                        var d = "Page exit";
                        break;
                    case "focus":
                        !aa && Oa && K.start(),
                        Na.unPause(),
                        c = "Page focus",
                        d = "Page enter"
                    }
                    y(F + " -\x3e " + d, c, K.getElapsedTime())
                }
                a(this).data("prevType", b.type)
            }
        }, "doBlurFocus"))
    }
    function rc() {
        function c() {
            function a(a, b) {
                return a ? a.substring(0, Math.min(a.length, b)) : null
            }
            k.playSettings.disableLinks && (t.about_message = "This player is powered by PuzzleMe from Amuse Labs. Please send feedback and comments to: puzzlemaster@amuselabs.com. Bouquets and brickbats are welcome.");
            var b = '\x3cdiv class\x3d"about-message"\x3e' + t.about_message;
            b += "\x3cbr\x3e\x3cbr\x3e" + t.about_message_part2;
            b = b + ':\x3cbr\x3e\x3cbr\x3e\x3cspan style\x3d"word-wrap:break-word;"\x3e' + (z.set ? a(z.set, 3) : "");
            b += n && n.playId ? "-" + a(n.playId, 7) : ";\x3c/span\x3e";
            b += "\x3cbr\x3e\x3cbr\x3e" + t.about_message_part3;
            f.copyright && k.playSettings.showCopyright && (b = b + "\x3chr\x3e" + ('\x3cdiv class\x3d"copyright"\x3e' + f.copyright + "\x3c/div\x3e"));
            f.attributions && (b = b + "\x3chr\x3e" + (t.attributions + "\x3cbr\x3e" + f.attributions));
            return b + "\x3c/div\x3e"
        }
        function d(c) {
            c.preventDefault();
            v.clear_info_modal_title();
            v.clear_info_modal_body();
            v.set_info_modal_title(window.messages.social_play_title);
            a("#info-modal #footer-btn", b).hide();
            v.set_info_modal_body("\x3cspan style\x3d'display: block; text-align: center'\x3e" + window.messages.social_play_connecting_to_server_message + "\x3c/span\x3e\x3cdiv class\x3d'loader center'\x3e\x3c/div\x3e");
            v.show_info_modal();
            n && (null == X && (X = new $b(n.initiatorUserId,n.userId,n.playId)),
            X.init(!0, a("#info-modal", b)))
        }
        function e(b) {
            var c = b.keyCode ? b.keyCode : b.charCode;
            0 === c && b.which && (c = b.which);
            return P && P.showingMedia() && 27 !== c || a(b.target).hasClass("form-control") ? !0 : !k.playSettings.rebusPuzzle || 192 !== c || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey ? ta && 8 === c ? !0 : 27 === c || 8 === c || 37 === c || 39 === c || 38 === c || 40 === c || 46 === c || 32 === c || 13 === c || 190 === c || 9 === c || b.ctrlKey && !b.altKey ? (S.keypress_handler(b),
            b.preventDefault(),
            !1) : !0 : (Tb(),
            b.preventDefault(),
            !1)
        }
        function g(c) {
            c.preventDefault();
            !Da && Oa ? (bb = !1,
            K.resume()) : Da && (bb = !0,
            ac = a(".modal-backdrop.fade.in").css("opacity"),
            bb && f.pauseMessage && "" !== f.pauseMessage.trim() && (v.clear_info_modal_title(),
            v.set_info_modal_title(t.paused),
            c = "",
            f.pauseMessage && (c += "\x3cp\x3e" + f.pauseMessage),
            v.set_info_modal_body(c),
            v.set_info_modal_btn_label(t.resume),
            v.show_info_modal()),
            a(".modal-backdrop.fade.in").css("opacity", .99),
            a("#clock.clock-time", b).hide(),
            a(".clock-pause", b).css("display", "block"),
            a(".timer-div", b).addClass("menu-icon"),
            K.stop());
            return !1
        }
        b.one("click", function(a) {
            if (ua())
                try {
                    a = {};
                    a.src = "crossword";
                    a.type = "event";
                    a.gridOffset = b.offset().top;
                    var c = JSON.stringify(a);
                    window.parent.postMessage(c, "*")
                } catch (oa) {
                    ga("send", "exception", {
                        exDescription: "ERROR Unable to post message from crossword page for id:" + f.id + ", error:" + oa,
                        exFatal: !1
                    }),
                    m("Failed to postmessage Exception:" + oa)
                }
        });
        qa || b.keydown(W(e, "gridCtrlKeysHandler"));
        if (!lb)
            a(".dummy", b).on("input", null, null, W(Wb, "inputChanged"));
        a("*").scroll(function() {
            setTimeout(vb, 400)
        });
        a(window).resize(W(function() {
            y(F + " -\x3e Page resize", "Page resize event", K.getElapsedTime());
            window.runningOnMobile || (H(function() {
                fa.layoutCrossword(k.playSettings.maxCols, k.playSettings.splitClues)
            }, "adjust layout"),
            P && H(P.doReLayout, "adjust fancybox"),
            setTimeout(vb, 600),
            wb(!0))
        }, "doReLayout"));
        a("#reveal-letter-button, #popup-reveal-letter-button", b).click(I(function(a) {
            a.preventDefault();
            aa || (q ? (ta && Va(),
            Fa.box(q.x, q.y, r ? r.acrossNotDown : !1, !0)) : v.show_select_word_modal(t.reveal_box, t.select_a_word_first))
        }, F + " -\x3e Reveal", "Reveal box"));
        a("#reveal-word-button, #popup-reveal-word-button", b).click(I(function(a) {
            a.preventDefault();
            if (!aa)
                if (r) {
                    a = f.boxToPlacedWordsIdxs[r.x][r.y];
                    if (null === a || 0 === a.length)
                        a = -1;
                    else if (2 === a.length) {
                        var b = a[0];
                        a = f.placedWords[b].acrossNotDown === r.acrossNotDown ? b : a[1]
                    } else
                        a = a[0];
                    Fa.word(a)
                } else
                    v.show_select_word_modal(t.reveal_word, t.select_a_word_first)
        }, F + " -\x3e Reveal", "Reveal word"));
        a("#answers-button", b).click(I(function(a) {
            a.preventDefault();
            J.isGridRevealed() || v.showConfirmModal(t.reveal_grid, t.reveal_all_warning, t.ok, t.cancel, function() {
                Fa.grid(!0)
            })
        }, F + " -\x3e Reveal", "Reveal grid"));
        a("#check-letter-button, #popup-check-letter-button", b).click(I(function(a) {
            a.preventDefault();
            aa || (q ? (a = la.showErrorStateForBox(q.x, q.y, Ka()),
            ea && (0 === a ? ea.say("Letter in this box is " + f.current_state[q.x][q.y] + ", Incorrect.") : 1 === a ? ea.say("Letter in this box is " + f.current_state[q.x][q.y] + ", Correct.") : -1 === a && ea.say("This box is empty")),
            null !== q && $a()) : v.show_select_word_modal(t.check_box, t.select_a_word_first))
        }, F + " -\x3e Check", "Check letter"));
        a("#check-word-button, #popup-check-word-button", b).click(I(function(a) {
            a.preventDefault();
            aa || (r ? (a = la.showErrorStateForWord(r, Ka()),
            ea && (0 === a ? Ba(ba) ? ea.say("This word has at least one wrong letter and has all boxes filled") : ea.say("This word has at least one wrong letter and is incomplete") : 1 === a && (Ba(ba) ? ea.say("This word is correct") : ea.say("This word is incomplete")))) : v.show_select_word_modal(t.check_word, t.select_a_word_first))
        }, F + " -\x3e Check", "Check word"));
        a("#check-all-button", b).click(I(function(a) {
            a.preventDefault();
            S.checkGridAndShowErrors()
        }, F + " -\x3e Check", "Check puzzle"));
        a("#hint-button, #popup-hint-button", b).click(I(function(c) {
            c.preventDefault();
            k.playSettings.usePopup && r ? a(".popup-hint", b).text(r.clue.hint).fadeIn() : (v.clear_info_modal_title(),
            v.set_info_modal_title(t.hint),
            r ? r.clue.hint ? v.set_info_modal_body(r.clue.hint) : v.set_info_modal_body("Sorry, there's no hint for this answer.") : v.set_info_modal_body(t.select_a_word_first),
            a("#info-modal #footer-btn", b).hide(),
            v.show_info_modal())
        }, F + " -\x3e Hint", "Show hint"));
        a(".play-save", b).click(I(function(a) {
            a.preventDefault();
            ka.postPlayStateToServer(!0, !0)
        }, F + " -\x3e Save", "Save play"));
        a("#options-help", b).click(I(function(b) {
            n && n.nHelpClicks++;
            b.preventDefault();
            v.clear_info_modal_title();
            v.set_info_modal_title(t.help);
            v.clear_info_modal_body();
            b = a('\x3cdiv class\x3d"help-header"\x3e\x3c/div\x3e');
            var d = a("\x3cdiv\x3e\x3c/div\x3e");
            d.append('\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_general + "\x3c/div\x3e\x3chr\x3e");
            k.playSettings.inContestMode || (d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e \x3cdiv class\x3d"help-item-title"\x3e' + t.reveal + '\x3c/div\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_hint + "\x3c/div\x3e\x3chr\x3e"),
            d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e \x3cdiv class\x3d"help-item-title"\x3e' + t.check + '\x3c/div\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_check + "\x3c/div\x3e\x3chr\x3e"),
            d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e \x3cdiv class\x3d"help-item-title"\x3e' + t.error_check_mode + '\x3c/div\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_error_check_mode + "\x3c/div\x3e\x3c/div\x3e\x3chr\x3e"),
            d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e \x3cdiv class\x3d"help-item-title"\x3e' + t.print + '\x3c/div\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_print + "\x3c/div\x3e\x3chr\x3e"),
            k.playSettings.showFinalScore && d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e\x3cdiv class\x3d"help-item-title"\x3e' + t.score + '\x3c/div\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_score + "\x3c/div\x3e\x3chr\x3e"),
            d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e \x3cdiv class\x3d"help-item-title"\x3e' + t.clear + '\x3c/div\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_clear + "\x3c/div\x3e\x3c/div\x3e\x3chr\x3e"));
            d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e \x3cdiv class\x3d"help-item-title"\x3e' + t.timer + '\x3c/div\x3e\x3cbr\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_timer + "\x3c/div\x3e\x3chr\x3e");
            k.playSettings.rebusPuzzle && (d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e \x3c/div\x3e \x3cdiv class\x3d"help-item-title"\x3e' + t.rebus + '\x3c/div\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_rebus + "\x3c/div\x3e"),
            d.append('\x3cdiv class\x3d"help-item-descr"\x3e' + t.help_rebus_more + "\x3c/div\x3e"));
            !window.isPreview && k.playSettings.socialPlayEnabled && d.append('\x3csvg class\x3d"help-icon" viewBox\x3d"0 0 24 24"\x3e \x3cuse xlink:href\x3d"#list-icon" class\x3d"list-icon-style"/\x3e\x3c/svg\x3e \x3c/div\x3e \x3cdiv class\x3d"help-item-title"\x3e' + t.social_play_title + '\x3c/div\x3e\x3cdiv class\x3d"help-item-descr"\x3e' + t.social_play_help_message + "\x3c/div\x3e");
            var f = a('\x3cdiv class\x3d"help-content"\x3e\x3c/div\x3e');
            f.html(d.html());
            b.append(f);
            "tny" === sc && b.append('\x3cdiv class\x3d"help-item-descr"\x3eFor more information, please check \x3ca href\x3d"https://www.newyorker.com/crossword/puzzles-dept/the-new-yorker-crossword-puzzle-an-faq" target\x3d"_blank"\x3eFrequently Asked Questions\x3c/a\x3e.\x3c/div\x3e\x3cp\x3e\x3c/p\x3e');
            k.playSettings.showAbout || b.append('\x3cdiv class\x3d"help-item-descr"\x3e' + c() + "\x3c/div\x3e");
            v.set_info_modal_btn_label(t.close);
            v.set_info_modal_body(b.html());
            v.show_info_modal()
        }, F + " -\x3e Help", "Show help"));
        a("#options-clear", b).click(I(function(a) {
            n && n.nClearClicks++;
            a.preventDefault();
            v.showConfirmModal(t.clear, t.clear_warning, t.clear, t.cancel, function() {
                ka.resetPlay(!0)
            })
        }, F + " -\x3e Clear", "Clear puzzle"));
        a("#social-play", b).click(I(d, F + " -\x3e Social play", "Social play"));
        a("#about", b).click(I(function(d) {
            n && n.nAboutClicks++;
            d.preventDefault();
            v.clear_info_modal_title();
            v.set_info_modal_title(t.about);
            d = c();
            v.clear_info_modal_body();
            v.set_info_modal_body(d);
            a("#info-modal #footer-btn", b).hide();
            v.show_info_modal()
        }, F + " -\x3e About", "Show about modal"));
        a(".nav-cluelist", b).click(I(function(c) {
            c.preventDefault();
            c = fa.getViewPort();
            var d = a(".cluelist-body", b);
            0 == a(".clue-list", d).length && (d.append('\x3cdiv class\x3d"clues-scroll"\x3e\x3cdiv class\x3d"clues-area"\x3e\x3c/div\x3e \x3c/div\x3e'),
            a(".clues-area", d).append('\x3cdiv class\x3d"aclues"\x3e \x3cdiv class\x3d"clue-list"\x3e\x3c/div\x3e \x3c/div\x3e\x3cdiv class\x3d"dclues"\x3e \x3cdiv class\x3d"clue-list"\x3e\x3c/div\x3e \x3c/div\x3e'),
            H(bc, "draw clues"),
            a(".clues-scroll", d).height(.7 * c.height),
            a(".clueDiv", b).click(I(R.clueClickHandler, F + " -\x3e Clue click", "clue div click")),
            k.playSettings.errorCheckMode ? S.checkGridAndShowErrors() : cc());
            a("#cluelist-modal", b).modal();
            a("#cluelist-modal", b).on("shown.bs.modal", function() {
                0 < ha.length && ha[ba] && ha[ba].addClass("hilited-clue")
            })
        }, F + " -\x3e Cluelist", "Show cluelist modal"));
        a(document).on("click", "#fb-button", I(function(a) {
            a.preventDefault();
            n.nFBClicks++;
            ka.setStateChangedAfterCompletion(!0);
            a = M();
            (new Date).getTime();
            a = encodeURIComponent(a);
            window.open("https://www.facebook.com/sharer.php?u\x3d" + a + "\x26p", "", "width\x3d550, height\x3d350, scrollbars\x3dno")
        }, F + " -\x3e Facebook share", "Facebook share"));
        a(document).on("click", "#tw-button", I(function(a) {
            a.preventDefault();
            n.nTwitterClicks++;
            ka.setStateChangedAfterCompletion(!0);
            a = 0 < Math.floor(((new Date).getTime() - window.startTime) / 1E3) && aa ? encodeURIComponent(t.share_message_solved + " " + Ga + ". " + t.beat_time) : t.share_message + " ";
            var b = M();
            window.open("https://twitter.com/share?url\x3d" + encodeURIComponent(b) + "\x26text\x3d" + a, "", "width\x3d550, height\x3d350, scrollbars\x3dno")
        }, F + " -\x3e Twitter share", "Twitter share"));
        k.playSettings.inContestMode || a(".timer-div", b).click(I(g, F + " -\x3e Timer clicked", "Timer click"));
        a(".nav-social-play-invite", b).click(I(d, F + " -\x3e Social play", "Social play"));
        f.marketURL && a("#merchandise\x3ea", b).attr("href", f.marketURL);
        a(".pen-pencil-toggle", b).click(I(function(c) {
            c.preventDefault();
            mb ? (a(".pen-pencil-toggle", b).addClass("letter-entry-mode-active"),
            mb = !1) : (a(".pen-pencil-toggle", b).removeClass("letter-entry-mode-active"),
            mb = !0);
            q && $a()
        }, F + " -\x3e Info", "Toggle pen pencil mode"));
        a("#puzzle-instructions-button", b).click(I(function(a) {
            a.preventDefault();
            v.clear_info_modal_title();
            a = v.get_puzzle_info_html();
            v.clear_info_modal_body();
            v.set_info_modal_body(a);
            v.set_info_modal_btn_label(t.close);
            v.show_info_modal()
        }, F + " -\x3e Info", "Show puzzle information"));
        a("#print-selection", b).click(I(function(c) {
            c.preventDefault();
            Fb() ? a("#print-letters", b).show() : a("#print-letters", b).hide();
            a("#print-modal", b).modal()
        }, F + " -\x3e Print", "Print Selected"));
        a("#print-button", b).click(W(function(c) {
            function d(a, b, c, d) {
                c = c || "post";
                var f = document.createElement("form");
                f.setAttribute("method", c);
                f.setAttribute("action", a);
                f.setAttribute("target", d);
                for (var e in b)
                    b.hasOwnProperty(e) && (a = document.createElement("input"),
                    a.setAttribute("type", "hidden"),
                    a.setAttribute("name", e),
                    a.setAttribute("value", b[e]),
                    f.appendChild(a));
                document.body.appendChild(f);
                f.submit();
                document.body.removeChild(f)
            }
            c.preventDefault();
            c = f.puzzleType.toLowerCase();
            var e = z.set ? z.set : ""
              , g = k.playSettings.theme ? k.playSettings.theme : ""
              , G = z.locale ? z.locale : "";
            a("#print-empty-grid-only", b).prop("checked") ? null !== f.current_state && (d(c + "-pdf", {
                id: f.id,
                set: e,
                theme: g,
                locale: G,
                print: 1,
                gridOnly: 1,
                answers: 0
            }, "post", "Print"),
            y(F + " -\x3e Print modal selection", "Print empty grid", K.getElapsedTime())) : a("#print-solution-grid-only", b).prop("checked") ? null !== f.current_state && (d(c + "-pdf", {
                id: f.id,
                set: e,
                theme: g,
                locale: G,
                print: 1,
                gridOnly: 1,
                answers: 1
            }, "post", "Print"),
            y(F + " -\x3e Print modal selection", "Print solution grid", K.getElapsedTime())) : a("#print-clues-answers-text", b).prop("checked") ? null !== f.current_state && (d(c + "-pdf", {
                id: f.id,
                set: e,
                theme: g,
                locale: G,
                print: 1,
                cluesAndAnswersText: 1
            }, "post", "Print"),
            y(F + " -\x3e Print modal selection", "Print clues and answers", K.getElapsedTime())) : a("#print-filled", b).prop("checked") ? null !== f.current_state && (d(c + "-pdf", {
                id: f.id,
                set: e,
                theme: g,
                locale: G,
                boxVal: (ka.getFilledAnswers() + "").replace(/[\\"']/g, "\\$\x26").replace(/\u0000/g, "\\0"),
                encodedBoxState: ka.encodeBoxState(Z),
                print: 1
            }, "post", "Print"),
            n && n.nPrintsFilled++,
            y(F + " -\x3e Print modal selection", "Print filled letters", K.getElapsedTime())) : a("#print-solution", b).prop("checked") ? (d(c + "-pdf", {
                id: f.id,
                set: e,
                theme: g,
                locale: G,
                print: 1,
                answers: 1,
                checkPDF: f.checkPDF
            }, "post", "Print"),
            n && n.nPrintsSol++,
            y(F + " -\x3e Print modal selection", "Print solution", K.getElapsedTime())) : (d(c + "-pdf", {
                id: f.id,
                set: e,
                theme: g,
                locale: G,
                print: 1,
                checkPDF: f.checkPDF
            }, "post", "Print"),
            n && n.nPrintsEmpty++,
            y(F + " -\x3e Print modal selection", "Print puzzle", K.getElapsedTime()))
        }, "print_selection_handler"));
        a("#rebus-button, #popup-rebus-button", b).click(I(oc, F + " -\x3e rebus", "Rebus mode entry"));
        a("#submit-btn", b).click(I(nc, F + " -\x3e Contest mode submit", "Submit play button click"));
        qc();
        a("#answer-popup #popup-hint-reveal", b).on("shown.bs.dropdown", function() {
            var c = a("#popup-hint-reveal .menu-img", b);
            c.removeClass("hint-icon-white");
            c.addClass("hint-icon")
        });
        a("#answer-popup #popup-hint-reveal", b).on("hidden.bs.dropdown", function() {
            var c = a("#popup-hint-reveal .menu-img", b);
            c.removeClass("hint-icon");
            c.addClass("hint-icon-white")
        });
        a("#answer-popup #popup-check", b).on("shown.bs.dropdown", function() {
            var c = a("#popup-check .menu-img", b);
            c.addClass("check-icon");
            c.removeClass("check-icon-white")
        });
        a("#answer-popup #popup-check", b).on("hidden.bs.dropdown", function() {
            var c = a("#popup-check .menu-img", b);
            c.addClass("check-icon-white");
            c.removeClass("check-icon")
        });
        a("#answer-popup", b).on("hidden.bs.modal", function() {
            a(".popup-dummy", b).blur();
            Va();
            P && P.stopPlayingMedia()
        });
        a("#answer-popup", b).on("shown.bs.modal", function() {});
        a("body").on("shown.bs.dropdown", function() {
            a(".overlay", b).show()
        });
        a("body").on("hidden.bs.dropdown", function() {
            a(".overlay", b).hide()
        });
        a(".overlay").on("click", function(c) {
            c = a(c.target);
            if (0 !== a(".navbar-collapse.collapse.in", b).length !== !0 || c.hasClass("navbar-toggle")) {
                c = 0 !== a(".btn-group.open", b).length;
                var d = 0 !== a(".dropdown.open", b).length;
                !0 === c || !0 === d ? (a(".open").removeClass("open"),
                a(".overlay").hide(),
                c = !1) : c = !0
            } else
                a("button.navbar-toggle", b).click(),
                c = !1;
            return c
        });
        a("#info-modal", b).on("hidden.bs.modal", W(v.do_info_modal_hide, "do_info_modal_hide"));
        a(".navbar-collapse.in", b).on("click touchend", function(b) {
            a(b.target).is("a") && "dropdown-toggle" !== a(b.target).attr("class") && a(this).collapse("hide")
        });
        a("ul.dropdown-menu [data-toggle\x3ddropdown]", b).on("click touchend", function(b) {
            b.preventDefault();
            b.stopPropagation();
            a(this).parent().siblings().removeClass("open");
            a(this).parent().toggleClass("open")
        });
        a(".correct-sound-url", b).attr("src", f.correctSoundURL);
        a(".wrong-sound-url", b).attr("src", f.wrongSoundURL);
        ka.setupEvents();
        R.setupEvents();
        fa.setupEvents();
        k.setupEvents();
        P && P.setupEvents();
        ja && ja.isInMultiPlayMode() && ja.setupEvents();
        dc && dc.setupEvents();
        ma && ma.setupEvents();
        cb && cb.setupEvents();
        Db() && qa && (document.body.addEventListener("touchmove", function(a) {
            a.preventDefault()
        }),
        a(".scrollable").bind("touchmove", function(a) {
            a.stopPropagation()
        }))
    }
    function xb(b, c, d) {
        for (var f = 0; f < c.length; f++) {
            var e = c[f];
            a(e).css("font-size", d + "px");
            for (var g = d; e.scrollHeight > b.height(); )
                g--,
                a(e).css("font-size", g + "px")
        }
    }
    function ec() {
        if (!(1 > a(".clue-bar", b).length)) {
            var c = a(".clue-bar-text", b);
            c.html(window.clueBarInitMessage);
            xb(a(".clue-bar", b), c, nb)
        }
    }
    function fc(a) {
        if (!f)
            return !1;
        try {
            for (var b in f.placedWords)
                if (f.placedWords[b].acrossNotDown === a && (f.placedWords[b].clue.clue && 0 < f.placedWords[b].clue.clue.length || f.placedWords[b].clue.URLs && 0 < f.placedWords[b].clue.URLs.length || f.placedWords[b].clue.audioURL && 0 < f.placedWords[b].clue.audioURL.length || f.placedWords[b].word && 0 < f.placedWords[b].word.length))
                    return !0;
            return !1
        } catch (L) {
            m("Could not check if clues were present in section " + (a ? "across" : "down") + " Exception: " + L)
        }
        return !0
    }
    function bc() {
        function c(c, d) {
            var e = window.isPreview
              , g = 0;
            var l = (c ? "" : '\x3cdiv class\x3d"glue-hdr-first-clue" style\x3d"-webkit-column-break-inside:avoid;-moz-column-break-inside:avoid;page-break-inside: avoid; column-break-inside:avoid;"\x3e') + ('\x3cdiv class\x3d"clue-header down"\x3e' + (c ? t.across : t.down) + "\x3c/div\x3e");
            (c ? a(".aclues", b) : a(".dclues", b)).prepend(l);
            l = "";
            for (var oa = 0; oa < f.placedWords.length; oa++) {
                var k = f.placedWords[oa];
                if (k.acrossNotDown === c) {
                    var A = k.clue;
                    if (A) {
                        var h = k.clueNum;
                        l += '\x3cdiv class\x3d"clueDiv" ' + ('clueNum\x3d"' + h + '" direction\x3d"' + (k.acrossNotDown ? "across" : "down") + '"') + "\x3e";
                        l += "\x3cdiv" + (10 > h ? ' "style\x3dmargin-left:5px"' : " ") + ' class\x3d"clueNum"\x3e' + h + "\x3c/div\x3e";
                        l += '\x3cdiv class\x3d"clue"\x3e';
                        h = A.clue;
                        h || (h = "",
                        A.clue = h);
                        h = h.replace(/<i>/g, "__ITALIC_BEGIN__");
                        h = h.replace(/<\/i>/g, "__ITALIC_END__");
                        h = h.replace(/<b>/g, "__BOLD_BEGIN__");
                        h = h.replace(/<\/b>/g, "__BOLD_END__");
                        h = h.replace(/<span>/g, "__SPAN_BEGIN__");
                        h = h.replace(/<\/span>/g, "__SPAN_END__");
                        h = h.replace(/<sub>/g, "__SUB_BEGIN__");
                        h = h.replace(/<\/sub>/g, "__SUB_END__");
                        h = h.replace(/<sup>/g, "__SUP_BEGIN__");
                        h = h.replace(/<\/sup>/g, "__SUP_END__");
                        h = a("\x3cdiv/\x3e").text(h).html();
                        h = h.replace(/__BOLD_END__/g, "\x3c/b\x3e");
                        h = h.replace(/__BOLD_BEGIN__/g, "\x3cb\x3e");
                        h = h.replace(/__ITALIC_END__/g, "\x3c/i\x3e");
                        h = h.replace(/__ITALIC_BEGIN__/g, "\x3ci\x3e");
                        h = h.replace(/__SPAN_END__/g, "\x3c/span\x3e");
                        h = h.replace(/__SPAN_BEGIN__/g, "\x3cspan\x3e");
                        h = h.replace(/__SUB_END__/g, "\x3c/sub\x3e");
                        h = h.replace(/__SUB_BEGIN__/g, "\x3csub\x3e");
                        h = h.replace(/__SUP_END__/g, "\x3c/sup\x3e");
                        h = h.replace(/__SUP_BEGIN__/g, "\x3csup\x3e");
                        var n = A.URLs
                          , m = !0
                          , r = "";
                        if (n)
                            for (var D = 0; D < n.length; D++) {
                                var U = n[D];
                                P && P.is_image_url(U) ? (m = !1,
                                f.mediaPreviewEnabled || f.mediaPreviewAndTextEnabled ? (l += ' \x3cdiv\x3e\x3cimg src\x3d"' + U + '" class\x3d"media-preview"/\x3e\x3c/div\x3e',
                                P.previewMediaCnt++) : l += '  \x3cimg src\x3d"images/image-mini-2x.png" style\x3d"height:25px;margin-right:5px;"/\x3e') : P && P.is_video_url(U) ? (m = !1,
                                f.mediaPreviewEnabled || f.mediaPreviewAndTextEnabled ? (U = P.getVideoThumbnail(U),
                                null === U && (U = "resources/pm-logo-1024.svg"),
                                l += '\x3cdiv class\x3d"clue-video"\x3e',
                                l += '\x3cimg src\x3d"' + U + '" class\x3d"media-preview"/\x3e',
                                l += ' \x3ca id\x3d"video-link" href\x3d"#"\x3e\x3cimg src\x3d"images/yt.png"\x3e\x3c/a\x3e',
                                l += "\x3c/div\x3e",
                                P.previewMediaCnt++) : l += '  \x3cimg src\x3d"images/yt.png" style\x3d"height:25px;margin-right:5px;"/\x3e') : r += ' \x3ca target\x3d"_blank" href\x3d"' + U + '"\x3eLink\x3c/a\x3e '
                            }
                        A.audioURL && (l += ' \x3cimg src\x3d"images/music-mini.png" style\x3d"height:18px;margin-right:5px;"/\x3e');
                        if (!f.mediaPreviewEnabled || m)
                            l += '\x3cspan class\x3d"clueText' + (f.mediaPreviewAndTextEnabled && !m ? " clue-caption" : "") + '"\x3e' + h + "\x3c/span\x3e",
                            d && (l += ' \x3cspan class\x3d"wordlens"\x3e' + hb(k) + "\x3c/span\x3e");
                        l += r;
                        l += "\x3c/div\x3e";
                        l += '\x3cdiv style\x3d"clear:both"\x3e\x3c/div\x3e';
                        if (e) {
                            h = k = "";
                            m = n = 0;
                            if (A.problems && 0 < A.problems.length)
                                for (r = 0; r < A.problems.length; r++)
                                    D = A.problems[r],
                                    D.warningNotError ? (m++,
                                    h += '\x3cdiv class\x3d"clue-problem clue-problem-warning"\x3eWarning: ' + D.message + "\x3c/div\x3e") : (n++,
                                    k += '\x3cdiv class\x3d"clue-problem clue-problem-error"\x3eError: ' + D.message + "\x3c/div\x3e");
                            0 < n && (l += k);
                            0 < m && (l += h)
                        }
                        l += "\x3c/div\x3e\n";
                        c || 0 !== g || (l += '\x3cdiv style\x3d"clear:both;"\x3e\x3c/div\x3e\x3c/div\x3e');
                        g++
                    }
                }
            }
            a(c ? ".aclues" : ".dclues", b).find(".clue-list").html(l);
            a(".clueDiv").each(function(b, c) {
                a(c).data("idx", b);
                ha[b] = a(c)
            })
        }
        fc(!0) && c(!0, k.playSettings.includeWordLens);
        fc(!1) && c(!1, k.playSettings.includeWordLens)
    }
    function cc() {
        if (f.placedWords)
            for (var a = 0; a < f.placedWords.length; a++)
                Ba(a) ? Kb(a) : Lb(a)
    }
    function gc() {
        function c() {
            if ("undefined" !== typeof f) {
                a(".crossword", b).html("");
                E = [];
                if (window.pm.box_empty_image)
                    var c = window.pm.box_empty_image;
                f.boxImageURL && (c = 'url("' + f.boxImageURL + '")');
                a(".crossword", b).append('\x3cinput class\x3d"dummy"  type\x3d"text" autocapitalize\x3d"off" autocorrect\x3d"off" autocomplete\x3d"off" spellcheck\x3d"false"" style\x3d"left:0px;top:0px;"/\x3e');
                for (var d = "", e = 0; e < f.h; e++) {
                    for (var g = 0; g < f.w; g++) {
                        0 === e && E.push([]);
                        if (f.box[g][e] === pa) {
                            var l = "empty";
                            var h = '\x3cimg class\x3d"print_only" style\x3d"width:100%;height:100%" src\x3d"static/black1px.png"\x3e'
                        } else
                            va(f.box, g, e) ? (l = "stop",
                            h = '\x3cimg class\x3d"print_only" style\x3d"width:100%;height:100%" src\x3d"images/grey1px.png"\x3e') : (l = "letter",
                            h = "");
                        var G = "";
                        0 !== f.clueNums[g][e] && (G = '\x3cspan  class\x3d"cluenum-in-box"\x3e' + f.clueNums[g][e] + "\x3c/span\x3e");
                        d += '\x3cdiv class\x3d"box ' + l + '"\x3e' + h;
                        if (va(f.box, g, e) || f.box[g][e] === pa)
                            d = window.isPreview ? d + (G + '\x3cspan class\x3d"letter-in-box"\x3e \x3c/span\x3e\x3c/div\x3e') : d + "\x3c/div\x3e";
                        else {
                            a: {
                                if (f.backgroundShapeBoxes)
                                    for (l = 0; l < f.backgroundShapeBoxes.length; l++)
                                        if (h = f.backgroundShapeBoxes[l],
                                        h[0] === g && h[1] === e) {
                                            l = !0;
                                            break a
                                        }
                                l = (l = Ib(g, e, !1)) ? l.isCircled : !1
                            }
                            l && (d += '\x3cspan class\x3d"box-with-background-shape"\x3e\x3c/span\x3e');
                            d += G + '\x3cspan class\x3d"letter-in-box"\x3e \x3c/span\x3e\x3c/div\x3e'
                        }
                    }
                    d += '\x3cdiv class\x3d"endRow"\x3e\x3c/div\x3e'
                }
                a(".crossword", b).append(d);
                d = a(".crossword .box", b);
                for (G = e = g = 0; G < d.length; G++)
                    l = d[G],
                    a(l).data("x", g),
                    a(l).data("y", e),
                    E[g][e] = a(l),
                    g++,
                    g === f.w && (e++,
                    g = 0);
                la.decorateGrid(f.cellInfos);
                c && (a(".box.empty", b).css("background-color", "transparent"),
                a(".box.empty", b).css("background-image", c),
                a(".box.empty", b).css("background-size", "100% 100%"),
                a(".box.empty", b).css("background-repeat", "no-repeat"),
                a(".box.stop", b).css("background-color", "transparent"),
                a(".box.stop", b).css("background-image", c),
                a(".box.stop", b).css("background-size", "100% 100%"),
                a(".box.stop", b).css("background-repeat", "no-repeat"));
                la.drawMediaIcons();
                (c = a(".letter-in-box").css("font-family")) && (c.startsWith("'Franklin") || c.startsWith('"Franklin') || c.startsWith("Graphik") || c.startsWith("'Graphik") || c.startsWith('"Graphik') || c.startsWith("Lato") || c.startsWith("'Lato") || c.startsWith('"Lato'))
            }
        }
        function d(c) {
            function d(b) {
                b.preventDefault();
                var c = a.data(a(b.target).closest(".key")[0], "char");
                b = a.data(a(b.target).closest(".key")[0], "code");
                if (16 === b)
                    return a(".key-row").remove(),
                    l = (l + 1) % g.length,
                    e(g[l], a(".keyboard")),
                    !1;
                c = jQuery.Event("keyup", {
                    keyCode: b,
                    charCode: c
                });
                S.keypress_handler(c);
                return !1
            }
            function e(c, f) {
                for (var e = "", g = 0; g < c.length; g++) {
                    e += "\x3cdiv class\x3d'key-row'\x3e";
                    for (var l = 0; l < c[g].length; l++) {
                        var h = c[g][l];
                        e += '\x3cdiv class\x3d"key key-' + h.style + 'x" ' + ('data-char\x3d"' + (1 === h.char.length ? h.char : "") + '"') + '\x3e\x3cdiv class\x3d"key-label"\x3e' + h.char + "\x3c/div\x3e\x3c/div\x3e"
                    }
                    e += "\x3c/div\x3e"
                }
                f.html(e);
                f = a(".keyboard .key", b);
                for (e = l = g = 0; e < f.length; e++)
                    h = f[e],
                    a(h).data("char", c[g][l].char),
                    a(h).data("code", c[g][l].code),
                    l++,
                    l === c[g].length && (g++,
                    l = 0);
                a(".key", b).mousedown(W(d, "CustomKeyHandler"))
            }
            var g, l = 0, h = a(".main-body", b), G = a(".clue-bar", b);
            G.appendTo(h);
            (function() {
                try {
                    var d;
                    if (!(d = !c)) {
                        a: {
                            for (var h = 0; h < f.w; h++)
                                for (var G = 0; G < f.h; G++)
                                    if (null != f.box[h][G]) {
                                        var oa = f.box[h][G], k;
                                        if (!(k = 1 != oa.length)) {
                                            var V;
                                            if (V = !ib(h, G)) {
                                                b: {
                                                    var u = oa;
                                                    f.caseSensitive || (u = u.toUpperCase());
                                                    for (var xa = 0; xa < c.length; xa++)
                                                        for (var B = c[xa], O = 0; O < B.length; O++)
                                                            for (var yb = 0; yb < B[O].length; yb++)
                                                                if (u === B[O][yb].char) {
                                                                    var A = !0;
                                                                    break b
                                                                }
                                                    A = !1
                                                }
                                                V = !A
                                            }
                                            k = V
                                        }
                                        if (k) {
                                            var n = !1;
                                            break a
                                        }
                                    } else
                                        C("null box value");
                            n = !0
                        }
                        d = !n
                    }
                    if (d)
                        return !1;
                    g = c;
                    d = "\x3cdiv class\x3d'keyboard noselect'\x3e";
                    d += "\x3c/div\x3e";
                    a(".main-body", b).append(d);
                    e(c[l], a(".keyboard"));
                    return !0
                } catch (uc) {
                    return d = "Error in performing draw keyboard Exception:" + uc,
                    ga("send", "exception", {
                        exDescription: d,
                        exFatal: !1
                    }),
                    m(d),
                    !1
                }
            }
            )(z.locale ? z.locale : f.locale) ? (a("input.dummy", b).remove(),
            a(".crossword-footer", b).remove(),
            window.runningOnMobile && (k.playSettings.usePopup = !1,
            k.playSettings.maxCols = 0,
            a(".clues-scroll", b).remove(),
            k.playSettings.showScore = 0,
            a(".nav-score", b).remove()),
            G.css("border-top", "none"),
            G.css("border-bottom", "none"),
            a(".clue-nav-button").show(),
            a(".clue-bar-text").css("border-left", "none"),
            G.addClass("bottom-clue-bar"),
            a(".clue-bar-text.separator").css("display", "none")) : (h = a("nav.navbar", b),
            a(".clue-bar").insertAfter(h),
            a(".nav-cluelist", b).remove(),
            qa = !1)
        }
        function e() {
            H(function() {
                a("#main-nav", b).show();
                600 >= a(window).width() && a(".navbar-brand", b).hide();
                0 < a(".clue-bar-text", b).length && (nb = parseInt(a(".clue-bar-text", b).css("font-size"), 10));
                k.playSettings.usePopup || "CROSSWORD" !== f.puzzleType || (ec(),
                a(".clue-bar", b).show())
            }, "show top nav");
            H(c, "draw grid");
            a(".crossword-and-footer", b).show();
            qa && (H(function() {
                var a = [];
                a["sudoku-9"] = [[[{
                    char: "1",
                    code: 49,
                    style: 2
                }, {
                    char: "2",
                    code: 50,
                    style: 2
                }, {
                    char: "3",
                    code: 51,
                    style: 2
                }, {
                    char: '\x3csvg id\x3d"pencil-mode" class\x3d"image-key pencil-mode" viewBox\x3d"0 0 60 60"\x3e\x3cuse xlink:href\x3d"#pencil-icon" class\x3d"pencil-icon"\x3e\x3c/use\x3e\x3c/svg\x3e',
                    code: 0,
                    style: 2
                }], [{
                    char: "4",
                    code: 52,
                    style: 2
                }, {
                    char: "5",
                    code: 53,
                    style: 2
                }, {
                    char: "6",
                    code: 54,
                    style: 2
                }, {
                    char: '\x3csvg id\x3d"pen-mode" class\x3d"image-key pen-mode active" viewBox\x3d"0 0 60 60"\x3e\x3cuse xlink:href\x3d"#pen-icon" class\x3d"pen-icon"\x3e\x3c/use\x3e\x3c/svg\x3e',
                    code: 0,
                    style: 2
                }], [{
                    char: "7",
                    code: 55,
                    style: 2
                }, {
                    char: "8",
                    code: 56,
                    style: 2
                }, {
                    char: "9",
                    code: 57,
                    style: 2
                }, {
                    char: '\x3csvg class\x3d"image-key back" viewBox\x3d"0 0 48 48"\x3e\x3cuse xlink:href\x3d"#backspace-icon" class\x3d"backspace-icon"\x3e\x3c/use\x3e\x3c/svg\x3e',
                    code: 8,
                    style: 2
                }]]];
                a["en-US"] = [[[{
                    char: "Q",
                    code: 81,
                    style: 1
                }, {
                    char: "W",
                    code: 87,
                    style: 1
                }, {
                    char: "E",
                    code: 69,
                    style: 1
                }, {
                    char: "R",
                    code: 82,
                    style: 1
                }, {
                    char: "T",
                    code: 84,
                    style: 1
                }, {
                    char: "Y",
                    code: 89,
                    style: 1
                }, {
                    char: "U",
                    code: 85,
                    style: 1
                }, {
                    char: "I",
                    code: 73,
                    style: 1
                }, {
                    char: "O",
                    code: 79,
                    style: 1
                }, {
                    char: "P",
                    code: 80,
                    style: 1
                }], [{
                    char: "A",
                    code: 65,
                    style: 1
                }, {
                    char: "S",
                    code: 83,
                    style: 1
                }, {
                    char: "D",
                    code: 68,
                    style: 1
                }, {
                    char: "F",
                    code: 70,
                    style: 1
                }, {
                    char: "G",
                    code: 71,
                    style: 1
                }, {
                    char: "H",
                    code: 72,
                    style: 1
                }, {
                    char: "J",
                    code: 74,
                    style: 1
                }, {
                    char: "K",
                    code: 75,
                    style: 1
                }, {
                    char: "L",
                    code: 76,
                    style: 1
                }], [{
                    char: "123",
                    code: 16,
                    style: 2
                }, {
                    char: "Z",
                    code: 90,
                    style: 1
                }, {
                    char: "X",
                    code: 88,
                    style: 1
                }, {
                    char: "C",
                    code: 67,
                    style: 1
                }, {
                    char: "V",
                    code: 86,
                    style: 1
                }, {
                    char: "B",
                    code: 66,
                    style: 1
                }, {
                    char: "N",
                    code: 78,
                    style: 1
                }, {
                    char: "M",
                    code: 77,
                    style: 1
                }, {
                    char: '\x3cimg class\x3d"image-key back" src\x3d"images/back_btn.svg" /\x3e',
                    code: 8,
                    style: 2
                }]], [[{
                    char: "1",
                    code: 49,
                    style: 1
                }, {
                    char: "2",
                    code: 50,
                    style: 1
                }, {
                    char: "3",
                    code: 51,
                    style: 1
                }, {
                    char: "4",
                    code: 52,
                    style: 1
                }, {
                    char: "5",
                    code: 53,
                    style: 1
                }, {
                    char: "6",
                    code: 54,
                    style: 1
                }, {
                    char: "7",
                    code: 55,
                    style: 1
                }, {
                    char: "8",
                    code: 56,
                    style: 1
                }, {
                    char: "9",
                    code: 57,
                    style: 1
                }, {
                    char: "0",
                    code: 48,
                    style: 1
                }], [{
                    char: "@",
                    code: 64,
                    style: 1
                }, {
                    char: "#",
                    code: 35,
                    style: 1
                }, {
                    char: "$",
                    code: 36,
                    style: 1
                }, {
                    char: "\x26",
                    code: 38,
                    style: 1
                }, {
                    char: "*",
                    code: 42,
                    style: 1
                }, {
                    char: "-",
                    code: 45,
                    style: 1
                }, {
                    char: "+",
                    code: 43,
                    style: 1
                }, {
                    char: "\x3d",
                    code: 61,
                    style: 1
                }], [{
                    char: "abc",
                    code: 16,
                    style: 2
                }, {
                    char: ",",
                    code: 44,
                    style: 1
                }, {
                    char: ":",
                    code: 58,
                    style: 1
                }, {
                    char: "/",
                    code: 47,
                    style: 1
                }, {
                    char: '\x3cimg class\x3d"image-key back" src\x3d"images/back_btn.svg" /\x3e',
                    code: 8,
                    style: 2
                }]]];
                a["de-DE"] = [[[{
                    char: "Q",
                    code: 81,
                    style: 1
                }, {
                    char: "W",
                    code: 87,
                    style: 1
                }, {
                    char: "E",
                    code: 69,
                    style: 1
                }, {
                    char: "R",
                    code: 82,
                    style: 1
                }, {
                    char: "T",
                    code: 84,
                    style: 1
                }, {
                    char: "Z",
                    code: 90,
                    style: 1
                }, {
                    char: "U",
                    code: 85,
                    style: 1
                }, {
                    char: "I",
                    code: 73,
                    style: 1
                }, {
                    char: "O",
                    code: 79,
                    style: 1
                }, {
                    char: "P",
                    code: 80,
                    style: 1
                }], [{
                    char: "A",
                    code: 65,
                    style: 1
                }, {
                    char: "S",
                    code: 83,
                    style: 1
                }, {
                    char: "D",
                    code: 68,
                    style: 1
                }, {
                    char: "F",
                    code: 70,
                    style: 1
                }, {
                    char: "G",
                    code: 71,
                    style: 1
                }, {
                    char: "H",
                    code: 72,
                    style: 1
                }, {
                    char: "J",
                    code: 74,
                    style: 1
                }, {
                    char: "K",
                    code: 75,
                    style: 1
                }, {
                    char: "L",
                    code: 76,
                    style: 1
                }], [{
                    char: "123",
                    code: 16,
                    style: 2
                }, {
                    char: "Y",
                    code: 89,
                    style: 1
                }, {
                    char: "X",
                    code: 88,
                    style: 1
                }, {
                    char: "C",
                    code: 67,
                    style: 1
                }, {
                    char: "V",
                    code: 86,
                    style: 1
                }, {
                    char: "B",
                    code: 66,
                    style: 1
                }, {
                    char: "N",
                    code: 78,
                    style: 1
                }, {
                    char: "M",
                    code: 77,
                    style: 1
                }, {
                    char: '\x3cimg class\x3d"image-key back" src\x3d"images/back_btn.svg" /\x3e',
                    code: 8,
                    style: 2
                }]], [[{
                    char: "1",
                    code: 49,
                    style: 1
                }, {
                    char: "2",
                    code: 50,
                    style: 1
                }, {
                    char: "3",
                    code: 51,
                    style: 1
                }, {
                    char: "4",
                    code: 52,
                    style: 1
                }, {
                    char: "5",
                    code: 53,
                    style: 1
                }, {
                    char: "6",
                    code: 54,
                    style: 1
                }, {
                    char: "7",
                    code: 55,
                    style: 1
                }, {
                    char: "8",
                    code: 56,
                    style: 1
                }, {
                    char: "9",
                    code: 57,
                    style: 1
                }, {
                    char: "0",
                    code: 48,
                    style: 1
                }], [{
                    char: "@",
                    code: 64,
                    style: 1
                }, {
                    char: "#",
                    code: 35,
                    style: 1
                }, {
                    char: "$",
                    code: 36,
                    style: 1
                }, {
                    char: "\x26",
                    code: 38,
                    style: 1
                }, {
                    char: "*",
                    code: 42,
                    style: 1
                }, {
                    char: "-",
                    code: 45,
                    style: 1
                }, {
                    char: "+",
                    code: 43,
                    style: 1
                }, {
                    char: "\x3d",
                    code: 61,
                    style: 1
                }], [{
                    char: "abc",
                    code: 16,
                    style: 2
                }, {
                    char: ",",
                    code: 44,
                    style: 1
                }, {
                    char: ":",
                    code: 58,
                    style: 1
                }, {
                    char: "/",
                    code: 47,
                    style: 1
                }, {
                    char: '\x3cimg class\x3d"image-key back" src\x3d"images/back_btn.svg" /\x3e',
                    code: 8,
                    style: 2
                }]]];
                a["no-NO"] = [[[{
                    char: "Q",
                    code: 81,
                    style: 1
                }, {
                    char: "W",
                    code: 87,
                    style: 1
                }, {
                    char: "E",
                    code: 69,
                    style: 1
                }, {
                    char: "R",
                    code: 82,
                    style: 1
                }, {
                    char: "T",
                    code: 84,
                    style: 1
                }, {
                    char: "Y",
                    code: 89,
                    style: 1
                }, {
                    char: "U",
                    code: 85,
                    style: 1
                }, {
                    char: "I",
                    code: 73,
                    style: 1
                }, {
                    char: "O",
                    code: 79,
                    style: 1
                }, {
                    char: "P",
                    code: 80,
                    style: 1
                }, {
                    char: "Å",
                    code: 197,
                    style: 1
                }], [{
                    char: "A",
                    code: 65,
                    style: 1
                }, {
                    char: "S",
                    code: 83,
                    style: 1
                }, {
                    char: "D",
                    code: 68,
                    style: 1
                }, {
                    char: "F",
                    code: 70,
                    style: 1
                }, {
                    char: "G",
                    code: 71,
                    style: 1
                }, {
                    char: "H",
                    code: 72,
                    style: 1
                }, {
                    char: "J",
                    code: 74,
                    style: 1
                }, {
                    char: "K",
                    code: 75,
                    style: 1
                }, {
                    char: "L",
                    code: 76,
                    style: 1
                }, {
                    char: "Ø",
                    code: 216,
                    style: 1
                }, {
                    char: "Æ",
                    code: 198,
                    style: 1
                }], [{
                    char: "Z",
                    code: 90,
                    style: 1
                }, {
                    char: "X",
                    code: 88,
                    style: 1
                }, {
                    char: "C",
                    code: 67,
                    style: 1
                }, {
                    char: "V",
                    code: 86,
                    style: 1
                }, {
                    char: "B",
                    code: 66,
                    style: 1
                }, {
                    char: "N",
                    code: 78,
                    style: 1
                }, {
                    char: "M",
                    code: 77,
                    style: 1
                }, {
                    char: '\x3cimg class\x3d"image-key back" src\x3d"images/back_btn.svg" /\x3e',
                    code: 8,
                    style: 2
                }]]];
                var b = z.locale ? z.locale : f.locale;
                "SUDOKU" === f.puzzleType && (b = "sudoku-" + f.alphabets.length);
                d(a[b] ? a[b] : a["en-US"])
            }, "Draw Custom Keyboard Layout"),
            "SUDOKU" === f.puzzleType && H(za.assignCustomKeyboardEventHandlers, "Assigning pen and pencil mode event handlers in custom keyboard"));
            f.hideClueColumns && !window.isPreview || "SUDOKU" === f.puzzleType || (H(bc, "draw clues"),
            a(".clues-area", b).show());
            fa.init(k.playSettings.useCompactLayout);
            H(function() {
                fa.layoutCrossword(k.playSettings.maxCols, k.playSettings.splitClues)
            }, "adjust layout");
            H(function() {
                try {
                    if (!window.matchMedia || !window.matchMedia("print").matches) {
                        if (f && f.backdropURL)
                            var c = f.backdropURL;
                        else
                            window.pm.backdrop && (c = window.pm.backdrop);
                        if ("none" === c)
                            f.theme && zb && 0 < zb.length && b.css("background-color", zb[f.theme].backgroundColor);
                        else {
                            if (f && f.backdropType)
                                var d = f.backdropType;
                            else
                                window.pm.backdropType && (d = window.pm.backdropType);
                            if (d && "undefined" !== typeof d && "stretched" !== d)
                                b.css("background", "url('" + c + "') repeat");
                            else {
                                var e = navigator.appVersion
                                  , g = /^((?!chrome|android).)*safari/i.test(e)
                                  , l = e.match(/(iPod|iPhone|iPad)/) && e.match(/AppleWebKit/);
                                !l && g && (0 <= e.match(/Version\/8.* Safari/).length || 0 <= e.match(/Version\/9.* Safari/).length) ? b.css("background", "url('" + c + "')") : l && P && P.mediaCluesPresent ? b.css("background", "url('" + c + "') repeat") : a.backstretch(c)
                            }
                        }
                    }
                } catch (Sa) {
                    ga("send", "exception", {
                        exDescription: "ERROR setting backdrop for puzzle id:" + f.id + ", error:" + Sa,
                        exFatal: !1
                    }),
                    m("ERROR setting backdrop Exception:" + Sa)
                }
            }, "set backdrop");
            window.runningOnMobile && (k.playSettings.usePopup ? Yb() : Xb())
        }
        function g() {
            rc();
            (function() {
                k.playSettings.sharingEnabled && (function(a) {
                    if (!a.getElementById("facebook-jssdk")) {
                        var b = a.createElement("script");
                        b.id = "facebook-jssdk";
                        b.async = !0;
                        b.src = "https://connect.facebook.net/en_US/all.js";
                        a.getElementsByTagName("head")[0].appendChild(b)
                    }
                }(document),
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: "269567426561010",
                        status: !0,
                        cookie: !0,
                        xfbml: !0,
                        oauth: !0,
                        version: "v2.2"
                    });
                    a(document).trigger("fbload")
                }
                )
            }
            )()
        }
        function h() {
            var a = !1;
            if (f.help || f.description || f.gatherEmail || f.gatherMobile || f.gatherName || f.title && k.playSettings.showStartButton) {
                v.clear_info_modal_title();
                a = v.get_puzzle_info_html();
                var b = "";
                f.gatherName && (b += '\x3cdiv id\x3d"first-name-input"\x3e\x3clabel class\x3d"control-label"\x3eParticipant(s) Name\x3c/label\x3e\x3cinput type\x3d"text" class\x3d"form-control" id\x3d"first-name"\x3e\x3c/div\x3e');
                f.gatherEmail && (b += '\x3cdiv id\x3d"email-input" style\x3d"margin-top:10px;"\x3e\x3clabel class\x3d"control-label"\x3eEmail address\x3c/label\x3e\x3cinput type\x3d"email" class\x3d"form-control" id\x3d"email"\x3e\x3c/div\x3e');
                f.gatherMobile && (b += '\x3cdiv id\x3d"mobile-input" style\x3d"margin-top:10px;"\x3e\x3clabel class\x3d"control-label"\x3eMobile number\x3c/label\x3e\x3cinput type\x3d"tel" class\x3d"form-control" id\x3d"mobile"\x3e\x3c/div\x3e');
                var c = "";
                "" !== b && (c = '\x3cp\x3e\x3cdiv id\x3d"participant-input"\x3e' + b + "\x3c/div\x3e\x3c/div\x3e");
                a += c;
                v.clear_info_modal_body();
                v.set_info_modal_body(a);
                v.set_info_modal_btn_label(t.start);
                v.show_info_modal();
                a = !0
            }
            a || ub()
        }
        function l() {
            db = function() {
                var a = !0;
                try {
                    localStorage.setItem("localStorage", 1),
                    localStorage.removeItem("localStorage")
                } catch (mc) {
                    a = "Unable to access local storage on userAgent:" + navigator.userAgent + " Exception: " + mc,
                    ga("send", "exception", {
                        exDescription: a,
                        exFatal: !1
                    }),
                    m(a),
                    a = !1
                }
                return a
            }();
            !z.embed || 1 !== Q(z.embed) && "true" !== z.isEmbedded || (a(".navbar-brand", b).remove(),
            a("#crossword-create", b).remove(),
            a("#pmr-about", b).remove(),
            a("#misc-submenu", b).remove(),
            k.playSettings.isEmbed = !0);
            window.runningOnMobile || a(".navbar-nav\x3eli\x3ea\x3ediv\x3esvg").each(function() {
                a(this).parent().parent().addClass("menu-icon")
            });
            P && P.mediaCluesPresent ? (a("#print-selection", b).remove(),
            k.playSettings.maxCols = -1) : a(".clue-bar-media-button", b).remove();
            k.playSettings.showStartButton = f.showStartButton;
            k.playSettings.theme = f.theme;
            if (ob)
                for (var c in ob)
                    ob.hasOwnProperty(c) && (k.playSettings[c] = ob[c]);
            Wa && (k.playSettings.stayInCurrentWord = "STAY_CURRENT" === Wa.atWordEnd,
            k.playSettings.skipOverFilledLetter = "SKIP" === Wa.afterLetterEntry,
            k.playSettings.useSpaceToChangeDirection = "TOGGLE_DIR" === Wa.spaceKey,
            k.playSettings.usePopup = "POPUP" === Wa.textEntryMethod,
            k.playSettings.showTimer = Wa.timerOnOff);
            z.contest && (k.playSettings.inContestMode = 1 === Q(z.contest));
            z && z.keyboard && (qa = 1 === Q(z.keyboard));
            z.usePopup && (k.playSettings.usePopup = 1 === Q(z.popup));
            z.share && (k.playSettings.sharingEnabled = 1 === Q(z.share));
            z.score && (k.playSettings.showScore = 1 === Q(z.score));
            z.splitClues && (k.playSettings.splitClues = 1 === Q(z.splitClues));
            z.colorFeedback && (f.colorFeedbackEnabled = 1 === Q(z.colorFeedback));
            z.compact && 1 === Q(z.compact) && (k.playSettings.useCompactLayout = !0);
            z.maxCols && (c = Q(z.maxCols),
            -1 <= c && (k.playSettings.maxCols = c));
            if (f.showRebus || z.rebus && 1 === Q(z.rebus))
                k.playSettings.rebusPuzzle = !0;
            if (window.runningOnTablet || z.shortClueHeader && 1 === Q(z.shortClueHeader))
                k.playSettings.showShortClueHeader = !0;
            z.theme && (k.playSettings.theme = z.theme);
            z.clueColumns && (f.hideClueColumns = 0 === Q(z.clueColumns));
            z.wordLens && (k.playSettings.includeWordLens = 1 === Q(z.wordLens));
            z.email && (f.gatherEmail = 1 === Q(z.email));
            z.mobile && (f.gatherMobile = 1 === Q(z.mobile));
            z.name && (f.gatherName = 1 === Q(z.name));
            z.boxImage && (f.boxImageURL = z.boxImage);
            z.replay && (f.replay = 1 === Q(z.replay));
            z.multiPlay && (f.multiPlayEnabled = 1 === Q(z.multiPlay));
            k.playSettings.inContestMode && (k.playSettings.showScore = !1,
            k.playSettings.soundEnabled = !1,
            k.playSettings.startTimerOnKeypress = !1,
            f.colorFeedbackEnabled = !1,
            f.hintsEnabled = !1,
            f.revealEnabled = !1,
            f.checkEnabled = !1,
            f.errorCheckModeEnabled = !1,
            a("#options-clear", b).remove(),
            db = !1);
            k.playSettings.showAbout || a("#about", b).remove();
            k.playSettings.showSave || a(".play-save", b).remove();
            k.playSettings.inContestMode || a(".nav-submit", b).remove();
            k.playSettings.sharingEnabled || a("#sharing", b).remove();
            k.playSettings.showScore || a(".nav-score", b).remove();
            f.backdropURL && a("head").append('\x3cscript type\x3d"text/javascript" src\x3d"js/jquery.backstretch.min.js"\x3e\x3c/script\x3e');
            f.revealEnabled || (a("#reveal-letter-button", b).remove(),
            a("#reveal-word-button", b).remove(),
            a("#answers-button", b).remove(),
            a("#popup-reveal-letter-button", b).remove(),
            a("#popup-reveal-word-button", b).remove(),
            a("#popup-answers-button", b).remove());
            c = f.hintsEnabled && J.haveAnyHints();
            c || (a("#hint-button", b).remove(),
            a("#popup-hint-button", b).remove());
            f.revealEnabled || c || (a("#hint-reveal", b).remove(),
            a("#popup-hint-reveal", b).remove());
            f.checkEnabled || (a("#check", b).remove(),
            a("#popup-check", b).remove());
            k.playSettings.rebusPuzzle || (a("#rebus-button", b).remove(),
            a("#popup-rebus-button", b).remove());
            f.help && "" !== f.help.trim() || f.description && "" !== f.description.trim() || qa || a("#puzzle-instructions-button", b).remove();
            k.playSettings.showAuthorByLiner || a(".footer-author").hide();
            k.playSettings.showTitleByLiner || a(".footer-title").hide();
            f.marketURL || a("#merchandise", b).remove();
            f.caseSensitive || a("head").append("\x3cstyle\x3e.box { text-transform:uppercase; } \x3c/style\x3e");
            P && P.mediaCluesPresent && (a("head").find('[href\x3d"bootstrap/dist/css/bootstrap-theme.min.css"]').after('\x3clink rel\x3d"stylesheet" type\x3d"text/css" href\x3d"js/fancybox/jquery.fancybox.css?v\x3d2.1.5" media\x3d"screen"\x3e'),
            a("head").append('\x3cscript type\x3d"text/javascript" src\x3d"js/fancybox/jquery.fancybox.pack.js"\x3e\x3c/script\x3e').append('\x3cscript type\x3d"text/javascript" src\x3d"js/fancybox/helpers/jquery.fancybox-media.js?v\x3d1.0.6"\x3e\x3c/script\x3e'));
            (function() {
                if (!f.placedWords || 0 === f.placedWords.length)
                    return !1;
                for (var a = 0; a < f.placedWords.length; a++)
                    if (f.placedWords[a].linkedWordIdxs && 0 < f.placedWords[a].linkedWordIdxs.length)
                        return !0;
                return !1
            }
            )() && a(".show-linked-clues-div", b).show();
            f.hideClueColumns && (k.playSettings.maxCols = 0);
            lb = f.replay && f.againstPlayId;
            ja && ja.setMultiPlayMode(f.multiPlayEnabled && f.againstPlayId);
            f.errorCheckModeEnabled || (a("#settings-modal", b).find(".error-check-div").remove(),
            k.playSettings.errorCheckModeAfterGridFull = !1);
            window.runningOnMobile && (k.playSettings.maxCols = 0);
            window.isPreview && (k.playSettings.showLinkedClues = !0);
            if (window.runningOnTablet && 640 > screen.width && k.playSettings.mobileKeyboard || window.runningOnTablet && k.playSettings.tabletKeyboard)
                qa = !0;
            k.playSettings.rebusPuzzle && (qa = !1);
            qa ? (k.playSettings.usePopup = !1,
            a("#settings-modal", b).find(".popup-option").remove(),
            a("#answer-popup", b).remove()) : a(".nav-cluelist", b).remove()
        }
        w("renderPuzzle");
        window.isPreview && 0 === a(".crossword", b).length || (t = window.messages,
        z = H(Qa, "parse query"),
        wb(!1),
        H(l, "preparePuzzle"),
        H(ka.initializePlay, "initializePlay"),
        e(),
        wb(!0),
        g(),
        window.isPreview ? (Fa.grid(!1),
        R.showRelatedLinks()) : (ka.showState(),
        aa && R.showRelatedLinks(),
        aa || h()),
        eb && "1" === z.themer && eb.init("#sidebar-container", function() {
            a(".clueDiv").first().click()
        }))
    }
    for (var t, f = d, n = g, Wa = c, Ca = e, ob = h, sc = window.client, rb = "-", pa = "\x00", ra = " ", hc = ["#", "\\"], E = [], da = [], Ab = [], ha = [], Y = [], pb = [], Pa = 0; Pa < f.box.length; Pa++) {
        Y[Pa] = [];
        pb[Pa] = [];
        for (var qb = 0; qb < f.box[Pa].length; qb++)
            Y[Pa][qb] = null,
            pb[Pa][qb] = null
    }
    var X = null, vc = -1 < navigator.userAgent.indexOf("Android "), Gb = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, db = !0, r = null, q = null, ba = 0, Aa = 0, Vb = 0, ab = -1, aa = !1, bb = !1, ac = .5, mb = !0, qa = !1, Da = !1, Oa = !1, Ga = null, ta = !1, Ma = "", Qb = 10, ic = 15, jc = 15, Pb = -1, Bb = 0, Cb = 0, ya = [], Ta = [], lb, Z = [], La = 14, Ia, kb, nb, F = "Crossword player", zb = null, Zb = 0, pc = 10, z;
    String.prototype.endsWith = function(a) {
        return -1 !== this.indexOf(a, this.length - a.length)
    }
    ;
    String.prototype.startsWith || (String.prototype.startsWith = function(a, b) {
        b = b || 0;
        return this.indexOf(a, b) === b
    }
    );
    var J = function() {
        var a = !1
          , b = {
            ENTERED: 0,
            STARTED: 1,
            SOME_FILLED: 2,
            ALL_FILLED_SOME_WRONG: 3,
            ALL_FILLED_CORRECT: 4
        }
          , c = {
            UNFILLED: 0,
            FILLED: 1,
            REVEALED: 2,
            CHECKED: 3,
            CHECKED_EDITED: 4,
            PENCIL_FILLED: 5
        }
          , d = f.placedWords && 0 < f.placedWords.length && f.placedWords[0].clue.picURL
          , e = function() {
            if (f.placedWords)
                for (var a = 0; a < f.placedWords.length; a++) {
                    var b = f.placedWords[a].clue.url;
                    if (b && "" !== b)
                        return !0
                }
            return !1
        }();
        return {
            isGridRevealed: function() {
                return a
            },
            setGridRevealed: function(b) {
                a = b
            },
            isGridFull: function() {
                return n.playState === b.ALL_FILLED_SOME_WRONG || n.playState === b.ALL_FILLED_CORRECT
            },
            reset: function() {
                aa = Oa = Da = a = !1;
                v.clear_info_modal_body();
                Ta = [];
                Qb = f.correctWordPoints;
                jc = f.targetTime;
                ic = f.bonusPoints;
                Pb = f.letterPenalty;
                if (f.placedWords)
                    for (b = 0; b < f.placedWords.length; b++)
                        Ta[b] = !1,
                        ya[b] = 0;
                f.current_state = [];
                Z = [];
                for (var b = 0; b < f.w; b++)
                    f.current_state[b] = [],
                    Z[b] = [];
                for (var d = 0; d < f.h; d++)
                    for (b = 0; b < f.w; b++)
                        va(f.box, b, d) ? f.current_state[b][d] = rb : f.current_state[b][d] = f.box[b][d] === pa ? pa : ra,
                        Z[b][d] = c.UNFILLED
            },
            PLAY_STATE: b,
            BOX_STATE: c,
            ARTICLE_CLICK_SRC: {
                NONE: 0,
                MENU: 1,
                CLUE: 2,
                BOTH: 3
            },
            refLinksPresent: e,
            haveAnyHints: function() {
                if (f.placedWords)
                    for (var a = 0; a < f.placedWords.length; a++) {
                        var b = f.placedWords[a].clue.hint;
                        if (b && "" !== b)
                            return !0
                    }
                return !1
            },
            picClues: d
        }
    }()
      , Na = function() {
        var a = !1
          , b = (new Date).getTime()
          , c = !0;
        return {
            markUserActivity: function(c) {
                try {
                    var d = (new Date).getTime();
                    a && m("Something fishy, user activity being marked while paused module:TimeOnPageModule time: " + d);
                    c && (a = !0);
                    d < b && m("Something fishy, now \x3c prev. now_timestamp:" + d + " prev_timestamp: " + b);
                    n && (n.timeOnPage += Math.min(3E5, d - b),
                    b = d)
                } catch (l) {
                    m("Exception trying to mark user activity module: TimeOnPageModule Exception: " + l)
                }
            },
            unPause: function() {
                b = (new Date).getTime();
                a || c || m("Something fishy, unpause called when timer is not paused module:TimeOnPageModule time: " + b);
                c = a = !1
            }
        }
    }()
      , ka = function() {
        function c(a) {
            if (!a)
                return "";
            for (var b = "", c = 0, d = 0, e = 0; e < f.h; e++)
                for (var g = 0; g < f.w; g++)
                    if (!ib(g, e)) {
                        if (Hb(a, g, e))
                            b += "#";
                        else {
                            if (a[g][e] && 1 < a[g][e].length)
                                b += "{" + a[g][e] + "}";
                            else {
                                for (var l = a[g][e], h = "", G = 0; G < l.length; G++) {
                                    for (var k = l.charAt(G), n = !1, A = 0; A < hc.length; A++)
                                        hc[A] === k && (h += "\\" + k,
                                        n = !0);
                                    n || (h += k)
                                }
                                b += h
                            }
                            c++
                        }
                        d++
                    }
            return {
                boxVal: b,
                filledCnt: c,
                totalCnt: d
            }
        }
        function e(a) {
            var b = "";
            if (!a)
                return b;
            for (var c = 0; c < f.h; c++)
                for (var d = 0; d < f.w; d++)
                    ib(d, c) || "undefined" !== typeof a[d][c] && (b += a[d][c]);
            return b
        }
        function g() {
            var a = {
                playId: "",
                userId: "",
                pid: "",
                boxVal: "",
                boxState: "",
                timeTaken: 0,
                term: 1,
                score: 0,
                nHintClicks: 0,
                nWordSelects: 0,
                nClueClicks: 0,
                nBoxClicks: 0,
                nFBClicks: 0,
                nTwitterClicks: 0,
                nKeyPresses: 0,
                nBackspacePresses: 0,
                nSelectWords: 0,
                nArrowPresses: 0,
                nDotPresses: 0,
                nLettersEntered: 0,
                nPrintsEmpty: 0,
                nPrintsFilled: 0,
                nPrintsSol: 0,
                nClearClicks: 0,
                nSettingsClicks: 0,
                nHelpClicks: 0,
                nResizes: 0,
                nExceptions: 0,
                timeOnPage: 0,
                articleClicks: [],
                articleClickSrc: [],
                puzzleType: 0,
                playLog: []
            };
            a.playState = J.PLAY_STATE.ENTERED;
            if (!f.placedWords)
                return a;
            if (0 === a.articleClicks.length)
                for (var b = 0; b < f.placedWords.length; b++)
                    a.articleClicks[b] = 0;
            if (0 === a.articleClickSrc.length)
                for (b = 0; b < f.placedWords.length; b++)
                    a.articleClickSrc[b] = J.ARTICLE_CLICK_SRC.NONE;
            return a
        }
        function h() {
            function a(a) {
                if (!a.boxVal)
                    return !1;
                if (k.playSettings.rebusPuzzle)
                    return !0;
                for (var b = 0, c = 0; c < f.h; c++)
                    for (var d = 0; d < f.w; d++)
                        if (!va(f.box, d, c) && f.box[d][c] !== pa) {
                            if (f.box[d][c] && 1 < f.box[d][c].length)
                                return !0;
                            b++
                        }
                return b === a.boxVal.length
            }
            function b(a) {
                var b = [];
                if (!a)
                    return b;
                for (var c = 0, d = 0, e = 0; d < f.w && e < f.h; ) {
                    0 === e && b.push([]);
                    if (va(f.box, d, e))
                        b[d][e] = J.BOX_STATE.UNFILLED;
                    else if (f.box[d][e] === pa)
                        b[d][e] = J.BOX_STATE.UNFILLED;
                    else {
                        var g = a.charAt(c);
                        b[d][e] = parseInt(g);
                        c++
                    }
                    d++;
                    d === f.w && (d = 0,
                    e++)
                }
                return b
            }
            function c(a) {
                var b = [];
                if (!a)
                    return b;
                try {
                    for (var c = 0, d = 0, e = 0; d < f.w && e < f.h; ) {
                        0 === e && b.push([]);
                        if (va(f.box, d, e))
                            b[d][e] = rb;
                        else if (f.box[d][e] === pa)
                            b[d][e] = pa;
                        else {
                            var g = a.charAt(c);
                            if ("{" === g) {
                                var u = "";
                                for (c += 1; "}" !== a.charAt(c) && c < a.length; )
                                    u += a.charAt(c),
                                    c++;
                                b[d][e] = u
                            } else
                                "\\" === g ? (u = "",
                                c++,
                                u += a.charAt(c),
                                b[d][e] = u) : b[d][e] = "#" === g ? ra : g;
                            c++
                        }
                        d++;
                        d === f.w && (d = 0,
                        e++)
                    }
                } catch (wa) {
                    ga("send", "exception", {
                        exDescription: "ERROR decodeBoxVal box for playid:" + n.playId + ", error:" + wa,
                        exFatal: !1
                    }),
                    m("ERROR in decodeBoxVal Exception:" + wa)
                }
                return b
            }
            function d(a) {
                var b = H(function() {
                    if (!db)
                        return null;
                    var a = localStorage.getItem(w);
                    return a ? UTF8ArrToStr(bda(a)) : null
                }, "Restore play from local storage");
                b && (b = JSON.parse(b)) && (a.boxVal = b.boxVal,
                a.boxState = b.boxState,
                a.timeTaken = b.timeTaken,
                a.timestamp = b.timeStamp,
                a.score = b.score,
                a.playState = b.playState,
                aa = b.puzzleCompleted) && (Sa = b.completionTimestamp);
                return a
            }
            N = tb = !1;
            w = window.localStorageKeyPrefix + (z.set ? "_" + z.set : "") + "_" + f.id;
            J.reset();
            if ("undefined" !== typeof f) {
                if (!n || !a(n)) {
                    var e = g();
                    n && (e.playId = n.playId,
                    e.userId = n.userId,
                    e.pid = n.pid);
                    n = d(e)
                }
                n.nPrintsEmpty = n.nPrintsFilled = n.nPrintsSol = 0;
                n.nPrints && (n.nPrintsEmpty = n.nPrints);
                n.nHelpClicks = n.nSettingsClicks = n.nClearClicks = 0;
                n.nResizes = n.nExceptions = 0;
                n.boxState && (Z = b(n.boxState));
                e = n.score;
                if (n.boxVal && (f.current_state = c(n.boxVal),
                f.placedWords))
                    for (var B = n.score = 0; B < f.placedWords.length; B++)
                        sb(B, !1);
                k.playSettings.inContestMode || n.playState !== J.PLAY_STATE.ALL_FILLED_CORRECT || (aa = !0,
                n.score = e);
                k.playSettings.inContestMode || n.score == e || m("scores differ saved:" + e + " computed:" + n.score);
                n.playState == J.PLAY_STATE.ENTERED && (n.playState = J.PLAY_STATE.STARTED,
                ka.postPlayStateToServer(!0, !1))
            }
        }
        function G(a, b, c) {
            a = {
                puzzleCompleted: aa,
                completionTimestamp: Sa,
                boxVal: a.boxVal,
                boxState: b,
                progressValue: 0 < a.filledCnt ? a.filledCnt / a.totalCnt : 0,
                timeTaken: c,
                playState: n.playState,
                score: n.score,
                timestamp: (new Date).getTime()
            };
            if (db) {
                var d = JSON.stringify(a);
                H(function() {
                    var a = bea(strToUTF8Arr(d));
                    a && localStorage.setItem(w, a)
                }, "Save play to local storage")
            }
            return a
        }
        function l() {
            var a = c(f.current_state)
              , b = e(Z);
            return G(a, b, K.getElapsedTime())
        }
        function oa() {
            var b = l()
              , c = "[]"
              , d = "[]";
            J.refLinksPresent && (c = JSON.stringify(n.articleClicks),
            d = JSON.stringify(n.articleClickSrc));
            var f = Ca.DISABLE_PLAY_LOG ? "" : JSON.stringify(n.playLog)
              , e = ""
              , g = "";
            try {
                g = (new Date).getTimezoneOffset(),
                e = "screen.w: " + window.screen.width + " screen.h: " + window.screen.height + " body.w: " + a("body").width() + " body.h: " + a("body").height()
            } catch (O) {
                m("error trying to read timezone and layout params Exception:" + O)
            }
            return {
                getStats: k.playSettings.showScoreComparison,
                pid: n.pid,
                playId: n.playId,
                inContestMode: k.playSettings.inContestMode ? 1 : 0,
                playLog: f,
                boxVal: b.boxVal,
                boxState: b.boxState,
                timeTaken: K.getElapsedTime(),
                score: n.score,
                state: n.playState,
                boxClicks: n.nBoxClicks,
                wordSelects: n.nSelectWords,
                keyPresses: n.nKeyPresses,
                letterEntered: n.nLettersEntered,
                arrowPresses: n.nArrowPresses,
                dotPresses: n.nDotPresses,
                backspacePresses: n.nBackspacePresses,
                clueClicks: n.nClueClicks,
                twitterClicks: n.nTwitterClicks,
                FBClicks: n.nFBClicks,
                nPrintsEmpty: n.nPrintsEmpty,
                nPrintsFilled: n.nPrintsFilled,
                nPrintsSol: n.nPrintsSol,
                timeOnPage: n.timeOnPage,
                term: n.term,
                nClearClicks: n.nClearClicks,
                nSettingsClicks: n.nSettingsClicks,
                nHelpClicks: n.nHelpClicks,
                nResizes: n.nResizes,
                nExceptions: n.nExceptions,
                articleClicks: c,
                articleClickSrc: d,
                tzOffset: g,
                layout: e
            }
        }
        function lc() {
            function c() {
                var a = 0;
                if (0 === n.score || J.isGridRevealed())
                    return a;
                var b = K.getElapsedTime()
                  , c = jc - Math.floor(b / 60) % 60;
                0 < b % 60 && c--;
                0 >= c && (c = 0);
                a += c * ic;
                return 1 * a
            }
            if (!window.isPreview) {
                Oa = tb = !0;
                K.stop();
                Sa = (new Date).getTime();
                n.score += c();
                v.hideAnswerPopup();
                jb();
                var d = !1
                  , e = 0
                  , g = "\x3cdiv class\x3d'completion-message'\x3e";
                v.clear_info_modal_body();
                v.center_align_info_modal_content();
                a("#info-modal #footer-btn", b).hide();
                var h = "completed";
                if (ja && ja.isInMultiPlayMode())
                    g += ja.getCompletedMessage();
                else {
                    if (J.isGridRevealed()) {
                        for (h = 0; h < ya.length; h++)
                            0 < ya[h] && e++;
                        v.clear_info_modal_title();
                        v.set_info_modal_title(t.congrats);
                        0 < e ? (d = !0,
                        g += t.partially_completed) : g += t.end_message;
                        h = "revealed"
                    } else
                        v.clear_info_modal_title(),
                        v.set_info_modal_title(t.congrats),
                        g += t.end_message;
                    k.playSettings.sharingEnabled && (g += " ",
                    g = k.playSettings.showScore ? g + t.share_score_message : g + t.share_time_message)
                }
                Jb();
                k.playSettings.showClueBarEndMessage && a(".clue-bar-text", b).html(t.remember_to_share);
                fa.adjustGridPlusCluesTop();
                var B = k.playSettings.sharingEnabled ? '\x3cdiv id\x3d\'sharing-buttons\' style\x3d"cursor:pointer;margin-top:10px;text-align:center"\x3e\x3cspan class\x3d"btn" id\x3d"fb-button"\x3e\x3cimg height\x3d"36px" src\x3d"images/facebook.png"/\x3e \x3c/span\x3e\x3cspan class\x3d"btn" style\x3d"cursor:pointer;" id\x3d"tw-button"\x3e\x3cimg height\x3d"36px" src\x3d"images/twitter.png"/\x3e\x3c/span\x3e\x3c/div\x3e' : "";
                0 > n.score && (n.score = 0);
                g = (k.playSettings.showFinalScore ? k.playSettings.showScoreComparison ? '\x3cdiv class\x3d"final-score-board"\x3e\x3cdiv id\x3d"spinner" class\x3d"score-line"\x3e \x3cimg src\x3d"images/spinner-cword.gif" width\x3d"35px"\x3e \x3c/div\x3e\x3ctable class\x3d"score-table" style\x3d"width:100%;"\x3e\x3ctr\x3e\x3cth\x3e' + t.your_score + '\x3c/th\x3e\x3cth class\x3d"top-score-hdr"\x3e' + t.top_score + '\x3c/th\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd class\x3d"final-score"\x3e0\x3c/td\x3e\x3ctd class\x3d"top-score"\x3e0\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e' : '\x3cdiv class\x3d"final-score-board"\x3e\x3ctable class\x3d"score-table" style\x3d"margin:auto;padding: 0 7px;border-right:transparent;"\x3e\x3ctr\x3e\x3cth style\x3d"padding: 0 7px;border-right:transparent;"\x3e' + t.your_score + '\x3c/th\x3e\x3ctd class\x3d"final-score" style\x3d"padding: 0 7px;border-right:transparent;"\x3e0\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e' : "") + (g + "\x3c/div\x3e") + B;
                f.endMessage && (g += "\x3cbr/\x3e\x3cp\x3e" + f.endMessage);
                v.set_info_modal_body(g);
                d && (a("#correct-words", b).text(e),
                a("#total-words", b).text(f.placedWords.length));
                a("#clock_str", b).html(Ga);
                a("#info-modal .modal-header", b).addClass("bg-green");
                k.playSettings.sharingEnabled && a(".completion-message").css("border-bottom", "\tborder-bottom: 1px dotted #d6d6d6;");
                x === sa.CLOSE ? a("#info-modal .modal-footer", b).hide() : (d = x === sa.CREATOR ? t.create_your_own : t.all_puzzles,
                a("#info-modal #next-action-btn", b).text(d),
                a("#info-modal #next-action-btn", b).show());
                a("#info-modal", b).addClass("puzzle-completion-modal");
                v.show_info_modal();
                a(".modal-backdrop.in", b).css("opacity", "0.8");
                a(".final-score-board .final-score", b).text(n.score);
                k.playSettings.showScore && a("#score", b).css("color", "green");
                Ca.DISABLE_PLAY_IDS ? l() : a.ajax({
                    type: "POST",
                    async: !0,
                    url: "postScore",
                    contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                    dataType: "json",
                    data: oa(),
                    success: function(c) {
                        c && c.avgScore && (Cb = c.avgScore);
                        c && c.maxScore && (Bb = c.maxScore);
                        a(".final-score-board", b).find("#spinner").remove();
                        0 < Cb && (a(".final-score-board .avg-score", b).show(),
                        a(".final-score-board .avg-score", b).text(Cb));
                        0 < Bb && (a(".final-score-board .top-score", b).show(),
                        a(".final-score-board .top-score", b).text(Bb))
                    },
                    error: function(c, d, f) {
                        a(".final-score-board", b).find("#spinner").remove();
                        T("Error in posting scores", c, d, f)
                    }
                });
                y(F + " -\x3e Puzzle completed", h, K.getElapsedTime())
            }
        }
        function p(b) {
            b.preventDefault();
            x === sa.PUZZLE_LISTING ? (b = a("#puzzle-list").find("a").attr("href")) && 0 < b.length && (window.location = b) : x === sa.CREATOR && (window.location = "crossword-create")
        }
        var w, tb = !1, Sa = 0, N = !1, D = !1, sa = {
            PUZZLE_LISTING: 1,
            CREATOR: 2,
            CLOSE: 3
        }, x;
        return {
            gridCompletelyFilled: function() {
                function c() {
                    for (var c = a(".box", b), d = 0; d < c.length; d++) {
                        var e = a(c[d])
                          , g = e.data("x");
                        e = e.data("y");
                        if (f.box[g][e] !== pa && !va(f.box, g, e) && !Ja(g, e) && !Xa(g, e))
                            return !0
                    }
                    return !1
                }
                var d = !1;
                J.isGridRevealed() || (d = H(c, "check_if_any_wrong"));
                n.playState = d ? J.PLAY_STATE.ALL_FILLED_SOME_WRONG : J.PLAY_STATE.ALL_FILLED_CORRECT;
                d || tb ? d && (k.playSettings.errorCheckModeAfterGridFull && !k.playSettings.errorCheckMode && (k.playSettings.errorCheckMode = !0,
                S.checkGridAndShowErrors(),
                k.applySettingsStateToUI()),
                !N && k.playSettings.errorAlertAfterGridFull && (v.hideAnswerPopup(),
                a("#sharing-buttons", b).css("display", "none"),
                v.clear_info_modal_title(),
                v.set_info_modal_title("Hmmm..."),
                a("#info-modal .modal-header", b).addClass("bg-red"),
                v.set_info_modal_body("\x3cimg class\x3d'warning-img' style\x3d'margin-right:8px;' src\x3d'images/error.png'\x3e\x3cspan class\x3d'final-msg'\x3e" + window.messages.wrong_answers_message + "\x3c/span\x3e"),
                N = !0,
                v.show_info_modal())) : (q = r = null,
                aa = !0,
                a("input.dummy", b).blur(),
                f.completionCellInfos && la.decorateGrid(f.completionCellInfos),
                H(lc, "Show completion message"))
            },
            postPlayStateToServer: function(b, c) {
                f.replay || window.isPreview || aa && !D || Ca.DISABLE_PLAY_IDS || (c && (v.clear_info_modal_title(),
                v.set_info_modal_title(t.save),
                v.center_align_info_modal_content(),
                v.clear_info_modal_body(),
                v.set_info_modal_body('\x3cdiv style\x3d"text-align:center;"\x3e\x3cimg class\x3d"spinner" style\x3d"margin-left:10px;"  width\x3d"35px" src\x3d"images/spinner-cword.gif"\x3e\x3c/div\x3e'),
                v.set_info_modal_btn_label(t.close),
                v.show_info_modal()),
                a.ajax({
                    type: "POST",
                    async: b,
                    url: "postScore",
                    contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                    dataType: "json",
                    data: oa(),
                    success: function() {
                        if (c) {
                            v.set_info_modal_title("\x3cimg class\x3d'menu-img' style\x3d'margin-right:8px;' src\x3d'images/success.png'\x3e" + t.save);
                            var a = '\x3cdiv style\x3d"text-align:center;"\x3e' + t.save_message + "\x3c/div\x3e";
                            v.clear_info_modal_body();
                            v.set_info_modal_body(a)
                        }
                        D = !1
                    },
                    error: function(a, b, d) {
                        if (c) {
                            var f = t.save_error_message;
                            v.clear_info_modal_body();
                            v.set_info_modal_body(f)
                        }
                        T("Error in posting scores", a, b, d)
                    }
                }))
            },
            initializePlay: h,
            resetPlay: function(c) {
                "CROSSWORD" === f.puzzleType ? (R.deselectCurrentWord(),
                R.linkCluesToAnswerEntry(),
                ec()) : "SUDOKU" === f.puzzleType && a(".pencil-box", b).addClass("invisible");
                a(".related-links", b).remove();
                a("#score", b).css("color", "#666666");
                a(".box-icon").show();
                a(".box").removeClass("wrongletter").removeClass("pencil-entry").attr("title", "");
                a(".filled-box-with-background-shape", b).addClass("box-with-background-shape");
                a(".filled-box-with-background-shape", b).removeClass("filled-box-with-background-shape");
                a(".key", b).css("opacity", "1");
                "CROSSWORD" === f.puzzleType && (la.undecorateGrid(),
                la.decorateGrid(f.cellInfos));
                (function() {
                    db && H(function() {
                        localStorage.removeItem(w)
                    }, "Clear play in local storage")
                }
                )();
                var d = g();
                n && (d.playId = n.playId,
                d.userId = n.userId,
                d.pid = n.pid,
                d.nPrintsEmpty = n.nPrintsEmpty,
                d.nPrintsFilled = n.nPrintsFilled,
                d.nPrintsSol = n.nPrintsSol,
                d.nSettingsClicks = n.nSettingsClicks,
                d.nHelpClicks = n.nHelpClicks,
                d.nClearClicks = n.nClearClicks,
                d.timeOnPage = n.timeOnPage,
                d.nResizes = n.nResizes,
                d.nExceptions = n.nExceptions);
                n = d;
                H(h, "initializePlay");
                ka.showState();
                Eb();
                ub();
                null != X && X.isInitiated && c && X.sendPlaySnapshot(X.triggeredAction.CLEAR_GRID)
            },
            saveProgress: l,
            encodeBoxState: e,
            getFilledAnswers: function() {
                return c(f.current_state).boxVal
            },
            setStateChangedAfterCompletion: function(a) {
                D = a
            },
            getPlayState: oa,
            showState: function() {
                Rb(0, 0);
                jb();
                K.setClockDisplay(n.timeTaken);
                (function(a) {
                    for (var c = 0; c < f.h; c++)
                        for (var d = 0; d < f.w; d++)
                            if (!va(f.box, d, c) && a[d][c] !== pa) {
                                var e = E[d][c];
                                Ra(e, a[d][c]);
                                Z[d][c] !== J.BOX_STATE.UNFILLED && (e.find(".box-icon").hide(),
                                e.find(".box-with-background-shape", b).addClass("filled-box-with-background-shape"),
                                e.find(".box-with-background-shape", b).removeClass("box-with-background-shape"),
                                Z[d][c] === J.BOX_STATE.PENCIL_FILLED && (e.addClass("pencil-entry"),
                                e.attr("title", window.messages.pencil_box_title)))
                            }
                }
                )(f.current_state);
                cc();
                k.applySettingsStateToUI();
                (function() {
                    if (f.preRevealIdxs) {
                        a(".prerevealed-box", b).removeClass("prerevealed-box");
                        for (var c = 0; c < f.box.length; c++)
                            for (var d = 0; d < f.box[c].length; d++)
                                !0 === f.preRevealIdxs[c][d] && (Fa.box(c, d, !1, !1),
                                E[c][d].addClass("prerevealed-box"))
                    }
                }
                )();
                "SUDOKU" === d.puzzleType && k.playSettings.showDoneEntries && za.GridDecorator.updateDoneEntries();
                aa && (a(".nav-submit", b).remove(),
                la.decorateGrid(f.completionCellInfos))
            },
            setupEvents: function() {
                x = sa.PUZZLE_LISTING;
                if (k.playSettings.disableLinks)
                    x = sa.CLOSE;
                else if (!z.picker || Q(0 === z.picker))
                    x = sa.CREATOR,
                    k.playSettings.isEmbed && (a("#puzzle-list", b).remove(),
                    x = sa.CLOSE);
                a("#next-action-btn", b).click(I(p, F + " -\x3e Puzzle completed modal", "Next action click"))
            }
        }
    }();
    var $b = function(c, d, e) {
        function g(c) {
            v.clear_info_modal_title();
            v.set_info_modal_title(window.messages.social_play_title);
            v.clear_info_modal_body();
            v.set_info_modal_body(c);
            a("#info-modal #footer-btn", b).hide();
            v.show_info_modal()
        }
        function h(b) {
            for (var c in w)
                if (w.hasOwnProperty(c)) {
                    var d = w[c]
                      , f = d + "-hilited-box"
                      , e = d + "-hilited-box-with-focus";
                    a("." + f).removeClass(f);
                    a("." + e).removeClass(e);
                    b && (p.push(d),
                    delete w[c])
                }
        }
        function l(c, d, e, g) {
            if (null != d && null != e) {
                var l = w[c];
                c = l + "-hilited-box";
                l += "-hilited-box-with-focus";
                a("." + c, b).removeClass(c);
                a("." + l, b).removeClass(l);
                if (null != g) {
                    g = f.placedWords[g];
                    for (var h = g.acrossNotDown ? 1 : 0, B = g.acrossNotDown ? 0 : 1, u = 0; u < na(g); u++) {
                        var xa = g.x + u * h
                          , G = g.y + u * B;
                        E[xa][G].css("background-color", "");
                        E[xa][G].css("color", "");
                        E[xa][G].addClass(c)
                    }
                }
                E[d][e].addClass(l)
            }
        }
        function k(c) {
            a(".social-play-icon-other-user", b).removeClass("social-play-connected").addClass("social-play-inactive");
            a(".social-play-icon-other-user", b).parent().parent().attr("title", window.messages.social_play_icon_other_inactive)
        }
        function A(c) {
            a(".social-play-icon-other-user", b).hasClass("social-play-connected") || (a(".social-play-icon-other-user", b).removeClass("social-play-inactive").addClass("social-play-connected"),
            a(".social-play-icon-other-user", b).parent().parent().attr("title", window.messages.social_play_icon_other_connected));
            L[c].inactivityTimeoutID && clearTimeout(L[c].inactivityTimeoutID);
            var d = (new Date).getTime() + D.serverOffset;
            d = L[c].lastUpdatedTS + y - d;
            0 < d ? L[c].inactivityTimeoutID = setTimeout(function() {
                k(c)
            }, d) : k(c)
        }
        this.initiatorUserId = c;
        this.userId = d;
        this.room = e;
        this.connectedAtLeastOnce = this.isInitiated = !1;
        this.userName = null;
        this.isServerOffsetCalculated = !1;
        this.nReceives = this.nSends = this.serverOffset = 0;
        this.triggeredAction = {
            LETTER_ENTERED: "letter_entered",
            REVEAL_GRID: "reveal_grid",
            CLEAR_GRID: "clear_grid",
            UPDATE_SERVER: "update_server",
            UPDATE_OTHER_USER: "update_other_user"
        };
        var U = null
          , p = ["player-1"]
          , w = {}
          , L = {}
          , N = null
          , D = this
          , sa = !window.runningOnMobile
          , y = 3E5
          , Ea = Ca.SOCIAL_PLAY_SERVER_HOST
          , C = Ca.SOCIAL_PLAY_SERVER_PORT
          , V = function() {
            function c() {
                var b = h.find(".messages")
                  , g = h.find(".chat-text-box");
                h.find(".chat-icon").hide();
                h.addClass("expand");
                h.find(".chat").addClass("enter").css("display", "flex");
                g.keydown(e).prop("disabled", !1);
                h.off("click", c);
                h.find(".header button").click(d);
                h.find(".send-chat-message").click(f);
                b.scrollTop(b.prop("scrollHeight"));
                a(".notification-chat").remove();
                h.removeClass("chat-close");
                h.addClass("chat-open")
            }
            function d() {
                h.find(".chat").removeClass("enter").css("display", "none");
                h.find(".chat-icon").show();
                h.removeClass("expand");
                h.find(".header button").off("click", d);
                h.find(".send-chat-message").off("click", f);
                h.find(".text-box").off("keydown", e).prop("disabled", !0).blur();
                setTimeout(function() {
                    h.find(".chat").removeClass("enter").css("display", "none");
                    h.click(c)
                }, 500);
                h.removeClass("chat-open");
                h.addClass("chat-close")
            }
            function f() {
                var b = a(".chat-text-box")
                  , c = b.html();
                if (c) {
                    var d = a(".messages");
                    d.append(['\x3cli class\x3d"other"\x3e', c, "\x3c/li\x3e"].join(""));
                    b.html("");
                    b.focus();
                    d.finish().animate({
                        scrollTop: d.prop("scrollHeight")
                    }, 250);
                    D.sendChatMessage(c)
                }
            }
            function e(a) {
                13 == a.keyCode && (a.preventDefault(),
                f())
            }
            var g = !1
              , l = {}
              , h = a(".floating-chat", b);
            setTimeout(function() {
                h.addClass("enter")
            }, 1E3);
            h.click(c);
            return {
                receiveChatMessage: function(b) {
                    a(".messages").append(['\x3cli class\x3d"self"\x3e', b, "\x3c/li\x3e"].join(""));
                    h.hasClass("expand") || (b = l.newMessage.play(),
                    null !== b && b.catch(function() {
                        l.newMessage.play()
                    }),
                    a(".notification-chat").length || h.append('\x3cdiv class\x3d"notification-chat"\x3e\x3c/div\x3e'))
                },
                show: function() {
                    h.css("display", "block")
                },
                hide: function() {
                    h.css("display", "none")
                },
                init: function() {
                    g || (h.show(),
                    g = !0,
                    l.newMessage = new Audio("sounds/newMessage.mp3"))
                }
            }
        }();
        this.copy_social_link_handler = function() {
            a("#social-link", b)[0].select();
            try {
                document.execCommand("copy")
            } catch (u) {
                m("Failed to copy social play link " + u)
            }
        }
        ;
        this.checkConnection = function(c, d) {
            if (c) {
                c = "";
                var f = D.isConnectedToServer();
                if (f)
                    if (D.isRoomFull())
                        c += "\x3cbr/\x3e\x3cspan class\x3d'social-play-warn'\x3e" + window.messages.social_play_room_full_message + "\x3c/span\x3e\x3cbr/\x3e\x3cbr/\x3e";
                    else {
                        var e = "\x3cbutton class\x3d'btn copy-social-link-button'\x3e" + window.messages.social_play_copy_button + "\x3c/button\x3e"
                          , h = "\x3cbutton class\x3d'btn fb-send' style\x3d'margin-left: 10px;'\x3e \x3cimg src\x3d'images/fb-send.png' style\x3d'height: 18px;'\x3e" + window.messages.social_play_fb_send_button + "\x3c/button\x3e"
                          , l = M(!0);
                        c += window.messages.social_play_message + "\x3cbr/\x3e\x3cbr/\x3e \x3ctextarea id\x3d'social-link' class\x3d'social-play-textarea'\x3e" + l + "\x3c/textarea\x3e";
                        window.runningOnMobile || window.runningOnTablet || (c += "\x3cbr/\x3e\x3cdiv style\x3d'text-align: center'\x3e" + e + h + "\x3c/div\x3e")
                    }
                else
                    c += window.messages.social_play_server_not_available_message;
                null != d && a(".modal-body", d).html(c);
                !f || D.isRoomFull() || window.runningOnMobile || window.runningOnTablet || (a(".copy-social-link-button", b).click(D.copy_social_link_handler),
                a(".fb-send", b).click(function() {
                    FB.ui({
                        method: "send",
                        link: l
                    })
                }))
            } else
                null != N && N.connected || (window.isPreview = !0,
                N.reconnects = !1,
                X = n = null,
                g(window.messages.social_play_server_not_available_message))
        }
        ;
        this.getNumberOfOtherUsersConnected = function() {
            return Object.keys(L).length - 1
        }
        ;
        this.isConnectedToServer = function() {
            return null != N && N.connected
        }
        ;
        this.isRoomFull = function() {
            return 2 <= Object.keys(L).length
        }
        ;
        this.sendPlaySnapshot = function(a) {
            var b = {};
            b.userId = d;
            b.ts = (new Date).getTime() + D.serverOffset;
            b.serverOffset = D.serverOffset;
            b.current_state = f.current_state;
            b.boxState = Z;
            b.boxEntryTS = Y;
            b.triggeredAction = a;
            a === D.triggeredAction.UPDATE_SERVER && (b.puzzleLink = gb(M(!1), "playId", ""));
            N.emit("send playSnapshot", b);
            D.nSends++
        }
        ;
        this.sendChatMessage = function(a) {
            N.emit("send chat message", {
                userId: d,
                ts: (new Date).getTime() + D.serverOffset,
                serverOffset: D.serverOffset,
                msg: a
            });
            D.nSends++
        }
        ;
        this.sendCurrentPosition = function() {
            var a;
            f.placedWords && r && (a = f.placedWords.indexOf(r));
            N.emit("send current position", {
                userId: d,
                currentWordIdx: a,
                xCurrentBox: q.x,
                yCurrentBox: q.y,
                ts: (new Date).getTime() + D.serverOffset,
                serverOffset: D.serverOffset
            });
            D.nSends++
        }
        ;
        this.disconnectFromServer = function() {
            N.reconnects = !1;
            N.disconnect()
        }
        ;
        this.connectToServer = function() {
            N.connect()
        }
        ;
        this.init = function(u, G) {
            D.isInitiated ? D.checkConnection(u, G) : (D.isInitiated = !0,
            N = io("https://" + Ea + ":" + C, {
                autoConnect: !1,
                path: "/social-play-server",
                transports: ["websocket"]
            }),
            N.on("connect", function() {
                D.connectedAtLeastOnce = !0;
                a(".nav-social-play-invite", b).css("display", "none");
                a(".nav-social-play", b).css("display", "inline-block");
                a(".social-play-icon-server-connection", b).removeClass("social-play-disconnected").addClass("social-play-connected");
                a(".social-play-icon-other-user", b).removeClass("social-play-connected").removeClass("social-play-inactive").addClass("social-play-disconnected");
                a(".social-play-icon-server-connection", b).parent().parent().attr("title", window.messages.social_play_icon_you_connected);
                a(".social-play-icon-other-user", b).parent().parent().attr("title", window.messages.social_play_icon_other_disconnected);
                var g = null
                  , h = null;
                null != q && (g = q.x,
                h = q.y);
                var l = null;
                r && (l = f.placedWords.indexOf(r));
                N.emit("add user", {
                    userId: d,
                    room: e,
                    xCurrentBox: g,
                    yCurrentBox: h,
                    currentWordIdx: l,
                    enableChat: sa
                });
                x("Social play: initiatorUserId \x3d " + c + " connected to server with socket ID \x3d " + N.id);
                D.checkConnection(u, G)
            }),
            N.on("connect_error", function() {
                D.connectedAtLeastOnce || D.checkConnection(u, G)
            }),
            N.on("disconnect", function() {
                a(".social-play-icon-other-user", b).removeClass("social-play-inactive");
                a(".social-play-icon-server-connection, .social-play-icon-other-user", b).removeClass("social-play-connected").addClass("social-play-disconnected");
                a(".social-play-icon-other-user", b).parent().parent().attr("title", window.messages.social_play_icon_other_disconnected);
                a(".social-play-icon-server-connection", b).parent().parent().attr("title", window.messages.social_play_icon_you_disconnected);
                h(!0);
                x("Social play: initiatorUserId \x3d " + c + " disconnected from server with socket ID \x3d " + N.id)
            }),
            N.on("update users", function(f) {
                D.isServerOffsetCalculated || (D.serverOffset = f.serverTS - (new Date).getTime());
                var e = Math.abs(D.serverOffset - (f.serverTS - (new Date).getTime()));
                2E3 < e && x("Social play: initiatorUserId \x3d " + c + " drift in server offset is " + e);
                for (var g in L)
                    L.hasOwnProperty(g) && L[g].inactivityTimeoutID && clearTimeout(L[g].inactivityTimeoutID);
                L = f.userInfo;
                f = Object.keys(L);
                1 < f.length ? a(".social-play-icon-other-user", b).hasClass("social-play-connected") || (a(".social-play-icon-other-user", b).removeClass("social-play-disconnected"),
                a(".social-play-icon-other-user", b).removeClass("social-play-inactive"),
                a(".social-play-icon-other-user", b).addClass("social-play-connected"),
                a(".social-play-icon-other-user", b).parent().parent().attr("title", window.messages.social_play_icon_other_connected)) : a(".social-play-icon-other-user", b).hasClass("social-play-disconnected") || (a(".social-play-icon-other-user", b).removeClass("social-play-connected"),
                a(".social-play-icon-other-user", b).removeClass("social-play-inactive"),
                a(".social-play-icon-other-user", b).addClass("social-play-disconnected"),
                a(".social-play-icon-other-user", b).parent().parent().attr("title", window.messages.social_play_icon_other_disconnected));
                for (g in L)
                    L.hasOwnProperty(g) && !w[g] && d !== g && (w[g] = p[0],
                    p.shift());
                for (g in w)
                    if (w.hasOwnProperty(g) && !L.hasOwnProperty(g)) {
                        e = w[g];
                        var h = e + "-hilited-box"
                          , B = e + "-hilited-box-with-focus";
                        a("." + h).removeClass(h);
                        a("." + B).removeClass(B);
                        p.push(e);
                        delete w[g]
                    }
                e = !0;
                for (g in L)
                    L.hasOwnProperty(g) && g !== d && l(g, L[g].xCurrentBox, L[g].yCurrentBox, L[g].currentWordIdx),
                    L.hasOwnProperty(g) && !L[g].enableChat && (e = !1);
                e && 1 < f.length && (V.init(),
                V.show());
                f = (new Date).getTime() + D.serverOffset;
                for (g in L)
                    L.hasOwnProperty(g) && g !== d && (L[g].lastUpdatedTS < f - y ? k(g) : A(g))
            }),
            N.on("new playSnapshot", function(a) {
                D.nReceives++;
                D.isServerOffsetCalculated || (D.serverOffset = a.serverTS - (new Date).getTime());
                var b = Math.abs(D.serverOffset - (a.serverTS - (new Date).getTime()));
                2E3 < b && x("Social play: initiatorUserId \x3d " + c + " drift in server offset is " + b);
                b = a.dataFromOtherPeer;
                if (null == b)
                    D.sendPlaySnapshot(D.triggeredAction.UPDATE_SERVER);
                else if (a.isPlayStateFromServer || (L[b.userId].playState = b,
                L[b.userId].lastUpdatedTS = b.ts,
                A(b.userId)),
                b.triggeredAction === D.triggeredAction.CLEAR_GRID)
                    ka.resetPlay(!1),
                    h(!1);
                else if (b.triggeredAction === D.triggeredAction.REVEAL_GRID)
                    Fa.grid(!1),
                    h(!1);
                else if (a = !0,
                null != U && b.ts < U.ts && (a = !1),
                a) {
                    a = b.current_state;
                    for (var d = b.boxState, e = b.boxEntryTS, g = b.userId, l = !1, B = 0; B < f.box.length; B++)
                        for (var u = 0; u < f.box[B].length; u++) {
                            var G = d[B][u] !== J.BOX_STATE.PENCIL_FILLED;
                            a[B][u] !== f.current_state[B][u] ? null == Y[B][u] && null != e[B][u] ? (Z[B][u] = d[B][u],
                            S.letter_entered(B, u, a[B][u], G, !1, e[B][u])) : null != Y[B][u] && null != e[B][u] ? Y[B][u] > e[B][u] ? l = !0 : Y[B][u] === e[B][u] ? n.userId > g ? l = !0 : (Z[B][u] = d[B][u],
                            S.letter_entered(B, u, a[B][u], G, !1, e[B][u])) : (Z[B][u] = d[B][u],
                            S.letter_entered(B, u, a[B][u], G, !1, e[B][u])) : null != Y[B][u] && null == e[B][u] ? l = !0 : null == Y[B][u] && null == e[B][u] && " " !== a[B][u] && (Z[B][u] = d[B][u],
                            S.letter_entered(B, u, a[B][u], G, !1, e[B][u])) : Y[B][u] > e[B][u] ? l = !0 : Y[B][u] < e[B][u] && (Z[B][u] = d[B][u],
                            S.letter_entered(B, u, a[B][u], G, !1, e[B][u]))
                        }
                    l && D.sendPlaySnapshot(D.triggeredAction.UPDATE_OTHER_USER);
                    U = b
                }
            }),
            N.on("update current position", function(a) {
                D.nReceives++;
                D.isServerOffsetCalculated || (D.serverOffset = a.serverTS - (new Date).getTime());
                var b = Math.abs(D.serverOffset - (a.serverTS - (new Date).getTime()));
                2E3 < b && x("Social play: initiatorUserId \x3d " + c + " drift in server offset is " + b);
                a = a.dataFromOtherPeer;
                L[a.userId].currentWordIdx = a.currentWordIdx;
                L[a.userId].xCurrentBox = a.xCurrentBox;
                L[a.userId].yCurrentBox = a.yCurrentBox;
                L[a.userId].lastUpdatedTS = a.ts;
                A(a.userId);
                l(a.userId, a.xCurrentBox, a.yCurrentBox, a.currentWordIdx)
            }),
            N.on("alert", function(d) {
                N.reconnects = !1;
                if ("roomFull" === d.alertType) {
                    window.isPreview = !0;
                    X = n = null;
                    ka.resetPlay(!1);
                    var f = "Social play: initiatorUserId \x3d " + c + " could not join room  \x3d " + e + " as the room was full";
                    x(f);
                    f = "\x3cspan class\x3d'roomFullMessage'\x3e" + t.social_play_room_full_new_user_message + "\x3c/span\x3e";
                    g(f);
                    f = d.socketIdToBrowserInfo;
                    var h = !1;
                    d = "";
                    for (var l in f)
                        f.hasOwnProperty(l) && (h && (d += ", "),
                        f[l].browserName && (d += f[l].browserName),
                        f[l].osName && (d += " - " + f[l].osName),
                        f[l].deviceName && (d += " - " + f[l].deviceName),
                        h = !0);
                    "" !== d ? (l = a(".roomFullMessage", b).find("span").text(),
                    a(".roomFullMessage", b).find("span").text("(" + l + d + ")")) : a(".roomFullMessage", b).find("span").remove();
                    l = gb(M(!1), "playId", "");
                    a(".roomFullMessage", b).find("a").attr("href", l).attr("target", "_blank")
                } else
                    "duplicateSessionOpened" === d.alertType ? (window.isPreview = !0,
                    X = n = null,
                    f = "Social play: initiatorUserId \x3d " + c + " room  \x3d " + e + " disconnected from server as a duplicate session is open.",
                    x(f),
                    f = "\x3cspan class\x3d'social-play-warn duplicateSessionMessage'\x3e" + t.social_play_duplicate_session_message + "\x3c/span\x3e",
                    g(f),
                    d.newBrowserInfo.browserName || d.newBrowserInfo.osName || d.newBrowserInfo.deviceName ? (l = a(".duplicateSessionMessage", b).find("span").text(),
                    d.newBrowserInfo.browserName && (l += d.newBrowserInfo.browserName),
                    d.newBrowserInfo.osName && (l += " - " + d.newBrowserInfo.osName),
                    d.newBrowserInfo.deviceName && (l += " - " + d.newBrowserInfo.deviceName),
                    a(".duplicateSessionMessage", b).find("span").text(l)) : a(".duplicateSessionMessage", b).find("span").remove()) : "serverFull" === d.alertType && g(t.social_play_server_not_available_message)
            }),
            N.on("new chat message", function(a) {
                D.nReceives++;
                a = a.dataFromOtherPeer;
                L[a.userId].lastUpdatedTS = a.ts;
                A(a.userId);
                V.receiveChatMessage(a.msg)
            }),
            N.open())
        }
    };
    var ea = function() {
        function c(a) {
            for (var b = "\x3cb\x3e \x3c/b\x3e \x3ci\x3e \x3c/i\x3e \x3cspan\x3e \x3c/span\x3e".split(" "), c = 0; c < b.length; c++)
                a = a.replace(new RegExp(b[c],"g"), "");
            return a
        }
        function d() {
            var a = r.clueNum.toString();
            a = a + " " + (r.acrossNotDown ? t.across : t.down);
            a += ", " + r.clue.clue;
            k.playSettings.includeWordLens && (a += ", " + hb(r));
            a += ", " + function() {
                if (!r)
                    return "";
                for (var a = "", b = !0, c = 0, d = Ya(r), e = 0; e < d.length; e++) {
                    var g = d[e]
                      , h = f.current_state[g.x][g.y];
                    " " === h || "" === h ? c++ : (0 < c && (a += Ha(c, "blank"),
                    c = 0),
                    a = a + " " + h + ",");
                    Xa(g.x, g.y) || (b = !1)
                }
                if (b)
                    return r.originalTerm;
                0 < c && (a += Ha(c, "blank"));
                "," === a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1));
                q && 0 !== q.word_offset && (q.word_offset === na(r) - 1 ? a += ", last box of the word selected." : (b = q.word_offset + 1,
                c = b % 10,
                d = b % 100,
                a = a + ", " + (1 == c && 11 != d ? b + "st" : 2 == c && 12 != d ? b + "nd" : 3 == c && 13 != d ? b + "rd" : b + "th") + " box of the word selected."));
                return a
            }();
            return c(a)
        }
        function e(c) {
            var d = a("input.dummy", b);
            d.attr("aria-label", "");
            d.blur();
            d.attr("aria-label", c);
            d.focus()
        }
        return {
            say: e,
            sayCurrentWord: function() {
                e(d())
            }
        }
    }();
    var la = function() {
        function c(a, b, c) {
            a = E[a][b];
            J.isGridRevealed() ? a.addClass(c) : a.addClass(c, 200, "easeOutSine")
        }
        function d(a, b, c) {
            a = E[a][b];
            J.isGridRevealed() ? a.removeClass(c) : a.removeClass(c, 200, "easeInSine")
        }
        function e(a, b, c) {
            var d = E[a][b];
            if (Ja(a, b))
                return -1;
            if (Xa(a, b)) {
                var f = 1;
                k.playSettings.errorCheckMode ? d.removeClass("errorletter") : d.removeClass("wrongletter");
                c && r && (r.acrossNotDown ? k.playSettings.errorCheckMode ? da[0][a - r.x].removeClass("errorletter") : da[0][a - r.x].removeClass("wrongletter") : k.playSettings.errorCheckMode ? da[0][b - r.y].removeClass("errorletter") : da[0][b - r.y].removeClass("wrongletter"))
            } else
                f = 0,
                k.playSettings.errorCheckMode ? d.addClass("errorletter") : d.addClass("wrongletter"),
                c && r && (r.acrossNotDown ? k.playSettings.errorCheckMode ? da[0][a - r.x].addClass("errorletter") : da[0][a - r.x].addClass("wrongletter") : k.playSettings.errorCheckMode ? da[0][b - r.y].addClass("errorletter") : da[0][b - r.y].addClass("wrongletter"));
            k.playSettings.errorCheckMode || (Z[a][b] = J.BOX_STATE.CHECKED);
            return f
        }
        function g(a) {
            la.drawBorders();
            if (a)
                for (var b = 0; b < a.length; b++) {
                    var c = a[b]
                      , d = c.x
                      , f = c.y;
                    c.bgColor && E[d][f].css("background-color", c.bgColor);
                    c.fgColor && E[d][f].css("color", c.fgColor);
                    c.rightWall && E[d][f].addClass("box-right-wall");
                    c.bottomWall && E[d][f].addClass("box-bottom-wall")
                }
        }
        return {
            unhilite_everything: function() {
                a(".hilited-box", b).removeClass("hilited-box");
                a(".soft-hilited-box", b).removeClass("soft-hilited-box");
                a(".hilited-box-with-focus", b).removeClass("hilited-box-with-focus");
                a(".multiplay-hilited-box-with-focus", b).removeClass(".multiplay-hilited-box-with-focus");
                a(".multiplay-hilited-box", b).removeClass(".multiplay-hilited-box");
                a(".multiplay-wrong-hilited-box-with-focus", b).removeClass("multiplay-wrong-hilited-box-with-focus");
                a(".multiplay-wrong-hilited-box", b).removeClass("multiplay-wrong-hilited-box");
                a(".multiplay-revealed-hilited-box-with-focus", b).addClass("multiplay-revealed");
                a(".multiplay-revealed-hilited-box", b).addClass("multiplay-revealed");
                a(".multiplay-revealed-hilited-box-with-focus", b).removeClass("multiplay-revealed-hilited-box-with-focus");
                a(".multiplay-revealed-hilited-box", b).removeClass("multiplay-revealed-hilited-box");
                g(f.cellInfos);
                aa && g(f.completionCellInfos);
                a(".hilited-clue", b).removeClass("hilited-clue");
                a(".crossing-clue", b).removeClass("crossing-clue");
                a(".clue-bar-media-button", b).html("");
                a(".linked-clue", b).removeClass("linked-clue")
            },
            hilite_boxes_for_current_word: function() {
                function e(a, b, f, e) {
                    d(a, b, f);
                    c(a, b, e)
                }
                function g() {
                    if (r && r.linkedWordIdxs)
                        for (var a = r.linkedWordIdxs, b = 0; b < a.length; b++)
                            if (ba !== a[b])
                                for (var e = f.placedWords[a[b]], g = e.acrossNotDown ? 1 : 0, h = e.acrossNotDown ? 0 : 1, l = 0; l < na(e); l++) {
                                    var k = e.x + l * g
                                      , V = e.y + l * h;
                                    E[k][V].css("background-color", "");
                                    E[k][V].css("color", "");
                                    E[k][V].hasClass("multiplay-correct") ? c(k, V, "multiplay-soft-hilited-box") : E[k][V].hasClass("multiplay-revealed") ? (d(k, V, "multiplay-revealed"),
                                    c(k, V, "multiplay-revealed-soft-hilited-box")) : E[k][V].hasClass("multiplay-wrong") ? c(k, V, "multiplay-wrong-soft-hilited-box") : c(k, V, "soft-hilited-box")
                                }
                }
                a(".hilited-box", b).removeClass("hilited-box");
                a(".hilited-box-with-focus", b).removeClass("hilited-box-with-focus");
                if ("SUDOKU" === f.puzzleType)
                    q && (E[q.x][q.y].css("background-color", ""),
                    E[q.x][q.y].css("color", ""),
                    E[q.x][q.y].addClass("hilited-box-with-focus"));
                else if (a(".soft-hilited-box", b).removeClass("soft-hilited-box"),
                f.againstPlayId && (a(".multiplay-hilited-box-with-focus", b).removeClass("multiplay-hilited-box-with-focus"),
                a(".multiplay-hilited-box", b).removeClass("multiplay-hilited-box"),
                a(".multiplay-revealed-hilited-box-with-focus", b).addClass("multiplay-revealed"),
                a(".multiplay-revealed-hilited-box-with-focus", b).removeClass("multiplay-revealed-hilited-box-with-focus"),
                a(".multiplay-revealed-hilited-box", b).addClass("multiplay-revealed"),
                a(".multiplay-revealed-hilited-box", b).removeClass("multiplay-revealed-hilited-box"),
                a(".multiplay-soft-hilited-box", b).removeClass("multiplay-soft-hilited-box"),
                a(".multiplay-revealed-soft-hilited-box-with-focus", b).addClass("multiplay-revealed"),
                a(".multiplay-revealed-soft-hilited-box-with-focus", b).removeClass("multiplay-revealed-soft-hilited-box-with-focus"),
                a(".multiplay-revealed-soft-hilited-box", b).addClass("multiplay-revealed"),
                a(".multiplay-revealed-soft-hilited-box", b).removeClass("multiplay-revealed-soft-hilited-box")),
                r) {
                    for (var h = r.acrossNotDown ? 1 : 0, n = r.acrossNotDown ? 0 : 1, m = 0; m < na(r); m++) {
                        var A = r.x + m * h
                          , p = r.y + m * n;
                        E[A][p].css("background-color", "");
                        E[A][p].css("color", "");
                        A === q.x && p === q.y ? E[A][p].hasClass("multiplay-correct") ? c(A, p, "multiplay-hilited-box-with-focus") : E[A][p].hasClass("multiplay-revealed") ? e(A, p, "multiplay-revealed", "multiplay-revealed-hilited-box-with-focus") : E[A][p].hasClass("multiplay-wrong") ? c(A, p, "multiplay-wrong-hilited-box-with-focus") : (c(A, p, "hilited-box-with-focus"),
                        a(".rebus-letter-in-box", E[A][p]).removeClass("rebus-letter-in-box"),
                        k.playSettings.usePopup && da[0][m].addClass("hilited-box-with-focus")) : E[A][p].hasClass("multiplay-correct") ? c(A, p, "multiplay-hilited-box") : E[A][p].hasClass("multiplay-revealed") ? e(A, p, "multiplay-revealed", "multiplay-revealed-hilited-box") : E[A][p].hasClass("multiplay-wrong") ? c(A, p, "multiplay-wrong-hilited-box") : (c(A, p, "hilited-box"),
                        k.playSettings.usePopup && da[0][m].addClass("hilited-box"))
                    }
                    k.playSettings.showLinkedClues && r && r.linkedWordIdxs && !window.usePopup && 0 < r.linkedWordIdxs.length && H(g, "Highlighting linked words")
                }
            },
            showErrorStateForWord: function(a, b) {
                if (null === a)
                    return 1;
                for (var c = a.acrossNotDown ? 1 : 0, d = a.acrossNotDown ? 0 : 1, f = a.x, g = a.y, h = 1, l, k = 0; k < na(a); k++)
                    l = e(f, g, b),
                    0 === l && (h = l),
                    f += c,
                    g += d;
                return h
            },
            showErrorStateForBox: e,
            decorateGrid: g,
            undecorateGrid: function() {
                for (var a = 0; a < f.w; a++)
                    for (var b = 0; b < f.h; b++) {
                        var c = E[a][b];
                        c.css({
                            "background-color": "",
                            color: ""
                        });
                        c.removeClass("box-right-wall");
                        c.removeClass("box-bottom-wall")
                    }
            },
            drawMediaIcons: function() {
                if ("SUDOKU" !== f.puzzleType) {
                    var a = [];
                    a.black = {
                        backgroundColor: "#EDEDED",
                        emptyBoxBgColor: "rgba(17,17,17,0.6)",
                        boxBorderColor: "rgba(0,0,0,0.4)",
                        stopBoxBgColor: "#444",
                        videoIcon: "video-black.png",
                        pictureIcon: "picture-black.png",
                        audioIcon: "audio-black.png"
                    };
                    a.gray = {
                        backgroundColor: "#EDEDED",
                        emptyBoxBgColor: "#B0B0B0",
                        boxBorderColor: "rgba(148,144,144,0.8)",
                        stopBoxBgColor: "rgb(148,144,144)",
                        videoIcon: "video.png",
                        pictureIcon: "picture.png",
                        audioIcon: "audio.png"
                    };
                    a.blue = {
                        backgroundColor: "#EDEDED",
                        emptyBoxBgColor: "#7FB8D9",
                        boxBorderColor: "#4B83A3",
                        stopBoxBgColor: "#5D99BC",
                        videoIcon: "video-black.png",
                        pictureIcon: "picture-black.png",
                        audioIcon: "audio-black.png"
                    };
                    a.green = {
                        backgroundColor: "#EDEDED",
                        emptyBoxBgColor: "rgba(32,170,115,0.5)",
                        boxBorderColor: "rgba(32,170,115,0.6)",
                        stopBoxBgColor: "rgb(32, 170, 115)",
                        videoIcon: "video.png",
                        pictureIcon: "picture.png",
                        audioIcon: "audio.png"
                    };
                    a.wapo = {
                        backgroundColor: "#EDEDED",
                        emptyBoxBgColor: "rgba(76,76,76,0.80)",
                        boxBorderColor: "rgba(76,76,76,1)",
                        stopBoxBgColor: "rgba(76,76,76, 0.90)",
                        videoIcon: "video.png",
                        pictureIcon: "picture.png",
                        audioIcon: "audio.png",
                        highlightedBoxBgColor: "rgba(222,232,242,0.9)",
                        focussedBoxBgColor: "rgba(25,85,165,0.9)",
                        highlightedBoxColor: "black",
                        focussedBoxColor: "rgba(255,255,240,1)",
                        hilightedClueBgColor: "rgba(222,232,242,1)",
                        clueNumInFocussedBoxColor: "rgba(255,255,240,1)",
                        bodyFontFamily: '"Libre Franklin", sans-serif;'
                    };
                    for (var b = 0; b < f.placedWords.length; b++) {
                        var c = f.placedWords[b]
                          , d = k.playSettings.theme ? k.playSettings.theme : "black";
                        c.clue.hasImage ? (c = E[c.x][c.y],
                        a[d] ? c.append('\x3cimg class\x3d"box-icon" src\x3d"images/' + a[d].pictureIcon + '"\x3e') : c.append('\x3cimg class\x3d"box-icon" src\x3d"images/' + a.black.pictureIcon + '"\x3e')) : c.clue.hasVideo ? (c = E[c.x][c.y],
                        a[d] ? c.append('\x3cimg class\x3d"box-icon" src\x3d"images/' + a[d].videoIcon + '"\x3e') : c.append('\x3cimg class\x3d"box-icon" src\x3d"images/' + a.black.videoIcon + '"\x3e')) : c.clue.hasAudio && (c = E[c.x][c.y],
                        a[d] ? c.append('\x3cimg class\x3d"box-icon" src\x3d"images/' + a[d].audioIcon + '"\x3e') : c.append('\x3cimg class\x3d"box-icon" src\x3d"images/' + a.black.audioIcon + '"\x3e'))
                    }
                }
            },
            showMultiplayState: function(a, b, f) {
                var e = "";
                switch (f) {
                case 0:
                    e = "multiplay-wrong";
                    break;
                case 1:
                    e = "multiplay-wrong";
                    break;
                case 2:
                    e = "multiplay-correct";
                    break;
                case 3:
                    e = "multiplay-revealed"
                }
                d(a, b, "multiplay-incomplete");
                d(a, b, "multiplay-correct");
                d(a, b, "multiplay-wrong");
                d(a, b, "multiplay-revealed");
                c(a, b, e)
            },
            forceBoxAsLetter: function(a, b) {
                d(a, b, "stop");
                d(a, b, "empty");
                c(a, b, "letter")
            },
            forceBoxAsEmpty: function(a, b) {
                d(a, b, "stop");
                d(a, b, "letter");
                var f = Ib(a, b, !1);
                f && f.isVoid || c(a, b, "empty")
            },
            forceBoxHighlight: function(a, b) {
                c(a, b, "hilited-box-with-focus")
            },
            drawBorders: function() {
                var a = [];
                for (d = 0; d < f.w; d++)
                    for (a[d] = [],
                    e = 0; e < f.h; e++)
                        a[d][e] = !1;
                if (f.cellInfos)
                    for (var b = 0; b < f.cellInfos.length; b++) {
                        var c = f.cellInfos[b];
                        d = c.x;
                        e = c.y;
                        c.isVoid && (a[d][e] = !0)
                    }
                for (var d = 0; d < f.w; d++)
                    for (var e = 0; e < f.h; e++)
                        E[d][e].removeClass("box-top-edge"),
                        E[d][e].removeClass("box-right-edge"),
                        E[d][e].removeClass("box-bottom-edge"),
                        E[d][e].removeClass("box-left-edge"),
                        a[d][e] ? (E[d][e].hasClass("empty") && E[d][e].removeClass("empty"),
                        E[d][e].hasClass("stop") && E[d][e].removeClass("stop"),
                        d + 1 < f.w && !a[d + 1][e] && E[d][e].addClass("box-right-edge"),
                        e + 1 < f.h && !a[d][e + 1] && E[d][e].addClass("box-bottom-edge")) : (E[d][e].addClass("box-right-edge"),
                        E[d][e].addClass("box-bottom-edge"),
                        0 === d && E[d][e].addClass("box-left-edge"),
                        0 === e && E[d][e].addClass("box-top-edge")),
                        "SUDOKU" === f.puzzleType && (0 === d && (E[d][e].removeClass("box-left-edge"),
                        E[d][e].addClass("box-left-wall")),
                        0 === e && (E[d][e].removeClass("box-top-edge"),
                        E[d][e].addClass("box-top-wall")),
                        d === f.w - 1 && (E[d][e].removeClass("box-right-edge"),
                        E[d][e].addClass("box-right-wall")),
                        e === f.h - 1 && (E[d][e].removeClass("box-bottom-edge"),
                        E[d][e].addClass("box-bottom-wall")))
            }
        }
    }();
    var P = function() {
        function c(a) {
            var b = a.indexOf("?")
              , c = a;
            0 <= b && (c = a.substring(0, b));
            a = c.toLowerCase();
            return a.lastIndexOf(".jpg") === a.length - 4 || a.lastIndexOf(".png") === a.length - 4 || a.lastIndexOf(".jpeg") === a.length - 5 || a.lastIndexOf(".svg") === a.length - 4 || a.lastIndexOf(".gif") === a.length - 4
        }
        function d(a) {
            return 0 <= a.indexOf("youtube.com/") || 0 <= a.indexOf("youtu.be/")
        }
        function e(a) {
            return (0 <= a.indexOf("washingtonpost.com/") || 0 <= a.indexOf("wapo.st/")) && 0 <= a.indexOf("posttv/")
        }
        function g(a) {
            return 0 <= a.indexOf("vimeo.com/") && 0 <= a.indexOf("video/")
        }
        function h(a) {
            if (a.endsWith("mp4"))
                return !0;
            var b = a.indexOf("#");
            return 0 < b && a.substring(0, b).endsWith("mp4") ? !0 : !1
        }
        function l(a) {
            return !!(a.clue.URLs && a.clue.URLs[0] && (0 <= a.clue.URLs[0].indexOf("youtube.com") || 0 <= a.clue.URLs[0].indexOf("youtu.be")))
        }
        function n(a) {
            return a.clue.URLs && a.clue.URLs[0] ? h(a.clue.URLs[0]) : !1
        }
        function p(a) {
            return a.clue.URLs && a.clue.URLs[0] ? e(a.clue.URLs[0]) : !1
        }
        function w() {
            var c = a.fancybox._getPosition
              , d = a.fancybox.getViewport();
            a.extend(a.fancybox, {
                _getPosition: function(e) {
                    e = c(e);
                    if (!ua())
                        return e;
                    if (a.fancybox.fromClueClick)
                        return e.top = 70,
                        e;
                    var f = r.clueNum
                      , g = r.acrossNotDown ? "across" : "down"
                      , h = a(".clueDiv", b).filter(function() {
                        return a(this).attr("direction") === g && a(this).attr("clueNum") === f
                    }).offset().top
                      , u = a.fancybox.wrap.height()
                      , l = a(window).height;
                    h + u > l ? h = l - u : h < d.y && (h = 70);
                    e.top = h;
                    return e
                }
            })
        }
        function v(a) {
            a.preventDefault();
            y(F + " -\x3e Clue bar", "Media Button click", K.getElapsedTime());
            P.play_media(r, !1)
        }
        function t(b, c, d) {
            a(".audio-overlay").css("visibility", "visible");
            a(".audio-player").attr("type", c).attr("src", b);
            a(".audio-title").html(d);
            try {
                a("audio")[0].volume = Ea,
                a("audio")[0].muted = E
            } catch (B) {
                m("error with audio overlay exception: " + B)
            }
            a.fancybox.open(a(".audio-overlay"), {
                wrapCSS: "overlay",
                openEffect: "none",
                afterShow: function() {
                    a(".audio-player").get(0).play()
                },
                afterClose: function() {
                    a(".audio-player").get(0).pause();
                    a(".audio-overlay").css("visibility", "hidden");
                    a(".fancybox").remove();
                    a("body").focus()
                },
                helpers: {
                    overlay: {
                        opacity: .5,
                        css: {
                            cursor: "auto"
                        }
                    }
                }
            })
        }
        function x(a, b) {
            var c = a.clue.URLs[0];
            if (p(a) && c.endsWith("_video.html")) {
                var d = c.substring(c.lastIndexOf("/") + 1);
                null !== d && (c = "https://www.washingtonpost.com/posttv/c/embed/" + d.substring(0, d.indexOf("_video.html")),
                a.clue.URLs[0] = c)
            }
            D(c, a, b)
        }
        function N(a) {
            return (a.clue.credits ? '\x3cspan class\x3d"media-credits"\x3e' + a.clue.credits + "\x3c/span\x3e" : "") + '\x3cdiv class\x3d"fancybox-title"\x3e' + a.clue.clue + "\x3c/div\x3e"
        }
        function D(c, d, e) {
            var f = 480;
            screen.width < f && (f = screen.width);
            c = a('\x3ciframe class\x3d"fancybox" width\x3d"' + f + '" height\x3d"' + .6 * f + '" src\x3d"' + c + '" type\x3d"video/"' + e + '" frameborder\x3d"0" allowfullscreen\x3e\x3c/iframe\x3e');
            a(".audio", b).html("");
            a(".picture", b).html("");
            c.fancybox({
                width: f,
                afterClose: function() {
                    a(".fancybox").remove();
                    a(".clue-bar-media-button").html("\x3cimg src\x3d'images/yt.png'\x3e\x3c/div\x3e");
                    a("body").focus();
                    q && Ua(q.x, q.y)
                },
                helpers: {
                    title: {
                        type: "inside"
                    }
                },
                beforeShow: function() {
                    this.width = f;
                    this.title = N(d)
                }
            });
            c.eq(0).trigger("click");
            window.$current_iframe = c;
            a(".clue-bar-media-button", b).html("\x3cimg src\x3d'images/yt-stop.png'\x3e\x3c/div\x3e");
            y(F + " -\x3e Video clue play", "Video clue play", K.getElapsedTime())
        }
        function sa(c, d) {
            var e = 420;
            screen.width < e && (e = screen.width);
            k.playSettings.usePopup ? a("#answer-popup .modal-body .multimedia", b).html('\x3ciframe style\x3d"max-width:100%;" class\x3d"facebook" width\x3d"' + e + '" height\x3d"' + .75 * e + '" src\x3d"' + c + '" frameborder\x3d"0" allowfullscreen\x3e\x3c/iframe\x3e') : (c = a('\x3ciframe class\x3d"fancybox" width\x3d"' + e + '" height\x3d"' + .75 * e + '" src\x3d"' + c + '" frameborder\x3d"0" allowfullscreen\x3e\x3c/iframe\x3e'),
            a(".audio", b).html(""),
            a(".picture", b).html(""),
            c.fancybox({
                width: e,
                afterClose: function() {
                    a(".fancybox").remove();
                    a(".clue-bar-media-button", b).html("\x3cimg src\x3d'images/yt.png'\x3e\x3c/div\x3e");
                    a("body").focus();
                    q && Ua(q.x, q.y)
                },
                helpers: {
                    title: {
                        type: "inside"
                    }
                },
                beforeShow: function() {
                    this.title = N(d)
                }
            }),
            c.eq(0).trigger("click"),
            window.$current_iframe = c,
            a(".clue-bar-media-button", b).html("\x3cimg src\x3d'images/yt-stop.png'\x3e\x3c/div\x3e"),
            y(F + " -\x3e Video clue play", "Youtube play", K.getElapsedTime()))
        }
        function z(c) {
            var d = c.clue.URLs[0];
            a(".audio", b).html("");
            a(".video", b).html("");
            var e = 420;
            screen.width < e && (e = screen.width);
            if (k.playSettings.usePopup)
                a("#answer-popup .modal-body .multimedia", b).html('\x3cimg style\x3d"max-width:100%;" width\x3d"' + e + 'px" src\x3d"' + d + '"/\x3e');
            else {
                null !== q && (k.playSettings.usePopup ? a("input.popup-dummy", b).blur() : a("input.dummy", b).blur());
                var f = a('\x3cdiv title\x3d"' + c.clue.clue + '" style\x3d"display:none"\x3e\x3cimg onload\x3d"$.fancybox.update();" width\x3d"' + e + 'px" src\x3d"' + d + '"/\x3e\x3c/div\x3e');
                f.fancybox({
                    type: "inline",
                    fitToView: !0,
                    autoSize: !0,
                    afterClose: function() {
                        window.runningOnTablet && a("#videoPlayer", b).empty();
                        a("body").focus();
                        q && Ua(q.x, q.y)
                    },
                    onCleanup: function() {
                        a(this.href).unwrap()
                    },
                    helpers: {
                        title: {
                            type: "inside"
                        },
                        overlay: {
                            locked: !1
                        }
                    },
                    beforeShow: function() {
                        this.title = N(c)
                    },
                    fixed: !1,
                    closeEffect: "none"
                });
                window.setTimeout(function() {
                    f.eq(0).trigger("click")
                }, 400);
                a.fancybox.update()
            }
            y(F + " -\x3e Show clue image", "Show Image clue", K.getElapsedTime())
        }
        var Ea = .75
          , E = !1;
        return {
            play_media: function(c) {
                if (c && c.clue)
                    if (c.clue.hasAudio) {
                        if (c.clue.audioURL) {
                            var d = c.clue.audioURL
                              , e = -1 !== d.indexOf(".mp3", d.length - 4) || -1 !== d.indexOf(".m4a", d.length - 4)
                              , f = -1 !== d.indexOf(".ogg", d.length - 4)
                              , g = navigator.userAgent.match(/MSIE ([0-9]+)\./) || !!navigator.userAgent.match(/Trident\/7\./);
                            g = -1 < navigator.userAgent.indexOf("Firefox") && !g;
                            var h = -1 !== navigator.appVersion.indexOf("Win");
                            if (e || f) {
                                if (g && e && h)
                                    a(".audio", b).html("Sorry, Firefox does not play MP3 files. Please use Chrome or Safari instead. Or open this URL in a program that plays MP3 files:" + c.clue.audioURL);
                                else {
                                    d = e ? "audio/mpeg" : "audio/ogg";
                                    e = '\x3caudio controls class\x3d"audio-controls"\x3e\x3csource src\x3d"' + c.clue.audioURL + '" type\x3d"' + d + '"\x3e\x3c/audio\x3e';
                                    k.playSettings.usePopup ? a("#answer-popup .modal-body .multimedia", b).html(e) : t(c.clue.audioURL, d, c.clue.clue);
                                    try {
                                        a("audio", b)[0].volume = P.audio_volume,
                                        a("audio", b)[0].muted = P.audio_muted
                                    } catch (xc) {}
                                }
                                a(".video", b).html("");
                                a(".picture", b).html("")
                            } else
                                C("warning: unknown audio type: " + d),
                                y(F + " -\x3e Audio clue play", "Audio clue play", K.getElapsedTime())
                        }
                    } else
                        c.clue.hasVideo ? l(c) ? (e = c.clue.URLs[0],
                        (d = 0 <= e.indexOf("youtube.com") ? e.replace(/.*v=([0-9a-zA-Z-_]+).*/, "$1") : e.replace(/.*\/([0-9a-zA-Z-_]+).*/, "$1")) && 0 < d.length && d.length < e.length && (f = (f = /.*#t=([0-9]+).*/.test(e) ? e.replace(/.*#t=([0-9]+).*/, "$1") : e.replace(/.*\\?t=([0-9]+).*/, "$1")) || 0 < f.length ? "\x26start\x3d" + f : "",
                        e = e.replace(/.*&end=([0-9]+).*/, "$1"),
                        sa("//www.youtube.com/embed/" + d + "?rel\x3d0\x26modestbranding\x3d1\x26autoplay\x3d1\x26showinfo\x3d0" + f + (e || 0 < e.length ? "\x26end\x3d" + e : ""), c))) : n(c) ? x(c, "mp4") : x(c, "") : c.clue.hasImage && z(c)
            },
            estimatedImagesHeight: function() {
                return 0 * a(".clue", b).first().width()
            },
            mediaCluesPresent: function() {
                var a = !1;
                if (f && f.placedWords)
                    for (var b = 0; b < f.placedWords.length; b++) {
                        var d = f.placedWords[b], e;
                        (e = l(d) || n(d)) || (e = d,
                        e = l(e) || n(e) || p(e) || (e.clue.URLs ? g(e.clue.URLs[0]) : !1));
                        e ? f.placedWords[b].clue.hasVideo = !0 : (e = d.clue.URLs && d.clue.URLs[0] ? c(d.clue.URLs[0]) : !1,
                        e ? f.placedWords[b].clue.hasImage = !0 : d.clue.audioURL ? f.placedWords[b].clue.hasAudio = !0 : (d = f.placedWords[b].clue,
                        (d = d.URLs) && 0 < d.length && (f.placedWords[b].clue.hasLinks = !0)));
                        d = f.placedWords[b].clue;
                        !a && (d.hasVideo || d.hasAudio || d.hasImage) && (a = !0)
                    }
                return a
            }(),
            is_video_url: function(a) {
                return d(a) || h(a) || e(a) || g(a)
            },
            is_audio_url: function(a) {
                return a ? a.endsWith(".mp3") || a.endsWith(".ogg") || a.endsWith(".m4a") || a.endsWith(".wav") || a.endsWith(".wma") : !1
            },
            is_youtube_url: d,
            is_image_url: c,
            getVideoThumbnail: function(a) {
                if (d(a)) {
                    a = a.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&\?]*).*/);
                    var b = "//img.youtube.com/vi/" + (a && 11 === a[7].length ? a[7] : null) + "/mqdefault.jpg"
                }
                return b
            },
            setupEvents: function() {
                J.picClues && a(".fancybox", b).fancybox();
                a.fancybox && (a("a#link").fancybox({
                    afterClose: function() {
                        a("#fancy_content").empty()
                    }
                }),
                a(".image").fancybox({
                    padding: 0,
                    helpers: {
                        overlay: {
                            locked: !1
                        }
                    }
                }));
                a(".clue-bar-media-button", b).click(I(v, F + " -\x3e Clue bar media button", "Show media click"));
                a.fancybox && w()
            },
            showingMedia: function() {
                return 0 !== a(".fancybox-overlay", b).length
            },
            previewMediaCnt: 0,
            audio_volume: Ea,
            audio_muted: E,
            stopPlayingMedia: function() {
                a.fancybox && a.fancybox.close();
                a(".audio", b).html("");
                a("#answer-popup .modal-body .multimedia iframe", b).attr("src", "");
                a(".audio audio", b).attr("src", "");
                a("#answer-popup .modal-body .multimedia audio", b).attr("src", "");
                a("#sponsor_video", b).attr("src", "")
            },
            doReLayout: function() {
                var c = a(".fancybox-wrap")
                  , d = a(window).height() / 2 - c.outerHeight() / 2;
                c = a(window).width() / 2 - c.outerWidth() / 2;
                a(".fancybox-wrap", b).css({
                    top: d,
                    left: c
                })
            }
        }
    }();
    var R = function() {
        function c(a, b) {
            var c = a.get(0).scrollTop
              , d = b.get(0).offsetTop
              , e = d + b.height();
            if (d < c || e > c + a.height())
                b = b.get(0).offsetTop,
                a.scrollTop(b)
        }
        function d() {
            if (q && r && 0 !== ha.length) {
                a(".crossing-clue", b).removeClass("crossing-clue");
                a(".linked-clue", b).removeClass("linked-clue");
                var d = f.boxToPlacedWordsIdxs[q.x][q.y];
                if (1 < d.length) {
                    d = ha[r === f.placedWords[d[0]] ? d[1] : d[0]];
                    d.addClass("crossing-clue");
                    if (k.playSettings.usePopup) {
                        var e = a("#direction-toggle-button\x3e.menu-img", b)
                          , g = "down-icon-white"
                          , h = "across-icon-white";
                        1 === Aa && (g = "across-icon-white",
                        h = "down-icon-white");
                        e.removeClass(h);
                        e.addClass(g);
                        a("#popup-direction", b).show("slow")
                    }
                    fa.scrollingDirectives.splitCluesScroll && d && (0 === Aa ? c(a(".dclues", b).find(".clue-list"), d) : c(a(".aclues", b).find(".clue-list"), d))
                } else
                    k.playSettings.usePopup && a("#popup-direction", b).hide()
            }
        }
        function e(c, d, e) {
            function g() {
                function c() {
                    r && q && a(".popup-dummy", b).focus()
                }
                r.clue.hasVideo || r.clue.hasImage ? S.move_input_to_box(q.x, q.y) : Ua(q.x, q.y);
                !a.trim(a("#answer-popup .modal-body .multimedia", b).html()) && setTimeout(c, 800)
            }
            function h(c, d, e) {
                c = f.placedWords[c];
                for (var g = c.acrossNotDown ? 1 : 0, h = c.acrossNotDown ? 0 : 1, l = "", u = c.x, k = c.y, B = 0; B < na(c) && u <= d && k <= e; u += g,
                k += h,
                B++)
                    l = Ja(u, k) ? l + " " : l + f.current_state[u][k];
                if (d = l)
                    a("input.dummy", b).val(d),
                    a("input.popup-dummy", b).val(d),
                    Ma = d
            }
            Ka() ? g() : Ua(q.x, q.y);
            vc && h(e, c, d)
        }
        function g(a, b) {
            "undefined" === a || "undefined" === b ? m("undefined in selecting boxes at x:" + a + ", y:" + b) : (q = {
                x: a,
                y: b
            },
            r && (q.word_offset = r.acrossNotDown ? a - r.x : b - r.y),
            S.move_input_to_box(q.x, q.y),
            r && Ub(),
            "SUDOKU" === f.puzzleType && za.GridDecorator.hiliteSelectedEntriesInGrid(a, b),
            null != X && X.isInitiated && X.sendCurrentPosition())
        }
        function h(a, b) {
            for (var c = Ya(r), d = -1, e = 0; e < na(r); e++)
                if (c[e].x === a && c[e].y === b) {
                    d = e;
                    break
                }
            for (e = 0; e <= c.length; e++) {
                var f = c[d].x;
                var h = c[d].y;
                if (Ja(f, h))
                    break;
                d = (d + 1) % c.length
            }
            a = a != f || b != h;
            g(f, h);
            return a
        }
        function l() {
            if ("CROSSWORD" !== f.puzzleType || r)
                la.hilite_boxes_for_current_word(),
                e(q.x, q.y, ba)
        }
        function p(a, b) {
            var c = "" + a.clue.clue;
            if (a.clue.hasLinks)
                for (var d = 0; d < r.clue.URLs.length; d++)
                    c += ' \x3ca target\x3d"_blank" href\x3d"' + r.clue.URLs[d] + '"\x3eLink\x3c/a\x3e ';
            b && (c += ' \x3cspan class\x3d"wordlens"\x3e' + hb(a) + "\x3c/span\x3e");
            return c
        }
        function w(b) {
            b.preventDefault();
            var c = parseInt(a(b.target).closest(".popup-box").first().attr("data-gx"));
            b = parseInt(a(b.target).closest(".popup-box").first().attr("data-gy"));
            R.processBoxClick(c, b);
            q && $a();
            return !1
        }
        function x() {
            P && P.stopPlayingMedia();
            a(".audio", b).html("");
            a(".video", b).html("");
            a(".picture", b).html("");
            a(".dummy", b).val("");
            a(".popup-dummy", b).val("");
            Nb();
            Ma = "";
            q = r = null;
            Aa = 0;
            la.unhilite_everything();
            ta && Va()
        }
        function y(d, e, B, A, m, D) {
            if (!(0 > d || d >= f.placedWords.length)) {
                x();
                a.fancybox && (a.fancybox.fromClueClick = m);
                n.nSelectWords++;
                if (0 < ha.length) {
                    var u = ha[d];
                    u.addClass("hilited-clue")
                }
                fa.scrollingDirectives.vertCluesScroll && (m = u.offset().top - a(".clues-area", b).offset().top,
                a("html, .clues-scroll", b).scrollTop(m));
                fa.scrollingDirectives.bodyScroll && (m = u.offset().top - a(".clues-area", b).offset().top,
                a("html, body").scrollTop(m));
                if (0 < a("audio", b).length)
                    try {
                        P.audio_volume = a("audio", b)[0].volume,
                        P.audio_muted = a("audio", b)[0].muted
                    } catch (yc) {}
                if (r !== f.placedWords[d]) {
                    r = f.placedWords[d];
                    ba = d;
                    Aa = r.acrossNotDown ? 0 : 1;
                    fa.scrollingDirectives.vertGridScroll && (m = E[r.x][r.y].offset().top - a(".grid-area", b).offset().top,
                    a(".grid-area", b).scrollTop(m));
                    fa.scrollingDirectives.horizGridScroll && (d = E[r.x][r.y].offset().left - a(".grid-area", b).offset().left,
                    a(".grid-area", b).scrollLeft(d));
                    fa.scrollingDirectives.splitCluesScroll && (0 === Aa ? c(a(".aclues", b).find(".clue-list"), u) : c(a(".dclues", b).find(".clue-list"), u));
                    if (!k.playSettings.usePopup && r) {
                        d = '\x3cspan class\x3d"clue-direction"\x3e' + r.clueNum + (r.acrossNotDown ? k.playSettings.showShortClueHeader ? t.across_short : " " + t.across : k.playSettings.showShortClueHeader ? t.down_short : " " + t.down) + "\x3c/span\x3e ";
                        u = p(r, k.playSettings.includeWordLens);
                        u = (k.playSettings.showClueNumberInClueBar ? d.toUpperCase() : "") + '\x3cdiv class\x3d"separator"\x3e\x3c/div\x3e' + u + "\x3c/div\x3e";
                        d = a(".clue-bar-text", b);
                        d.html(u);
                        xb(a(".clue-bar", b), d, nb);
                        if (r.clue.hasVideo || r.clue.hasImage) {
                            var q;
                            r.clue.hasVideo ? q = "yt.png" : r.clue.hasImage && (q = "image-mini-2x.png");
                            q = '\x3cimg src\x3d"images/' + q + '"\x3e\x3c/div\x3e';
                            a(".clue-bar-media-button", b).html(q)
                        }
                        fa.adjustGridPlusCluesTop();
                        fa.adjustTopMessagesTop()
                    }
                    aa && (q = r,
                    a("#hint-reveal", b).show(),
                    k.playSettings.usePopup && a("#popup-hint-reveal", b).show("slow"),
                    u = !1,
                    q.clue.hint && f.hintsEnabled ? (a("#hint-button", b).show(),
                    k.playSettings.usePopup && a("#popup-hint-button", b).show(),
                    u = !0) : (a("#hint-button", b).hide(),
                    k.playSettings.usePopup && a("#popup-hint-button", b).hide()),
                    f.revealEnabled || (u ? (a("#hint-reveal", b).show(),
                    k.playSettings.usePopup && a("#popup-hint-reveal", b).show()) : (a("#hint-reveal", b).hide(),
                    k.playSettings.usePopup && a("#popup-hint-reveal", b).hide())))
                }
                (A || r.clue.hasAudio) && P && P.play_media(r);
                if (k.playSettings.usePopup) {
                    if (A = r) {
                        a(".popup-hint", b).html("");
                        q = 35;
                        window.runningOnMobile && (q = 30);
                        kb = q;
                        q = a("#answer-popup", b).find(".modal-body").find(".answer-input");
                        q.html("");
                        Ab = [];
                        Ab.push([]);
                        da = [];
                        da.push([]);
                        window.runningOnMobile && a("#answer-popup", b).width(screen.width);
                        u = a("#answer-popup", b).width();
                        u = 600 < u ? 600 : u;
                        u = Math.floor(u - .112 * u);
                        a("#answer-popup .next-btn", b).css("left", u - 20 + "px");
                        u = A.acrossNotDown ? 1 : 0;
                        d = A.acrossNotDown ? 0 : 1;
                        m = A.x;
                        var G = A.y;
                        a("#answer-popup .modal-body .answer-input").append('\x3cinput class\x3d"popup-dummy"  type\x3d"text" autocapitalize\x3d"off" autocorrect\x3d"off" autocomplete\x3d"off" style\x3d"left:2px;top:-1px;"/\x3e');
                        q.append('\x3cinput class\x3d"popup-dummy"  type\x3d"text" autocapitalize\x3d"off" autocorrect\x3d"off" autocomplete\x3d"off" style\x3d"left:2px;top:-1px;"/\x3e');
                        a(".popup-dummy").on("input", null, null, W(Wb, "inputChanged"));
                        for (var N = 0, L = 0; L < na(A); N++,
                        L++) {
                            0 === N && (Ab.push([]),
                            da.push([]));
                            var U = "";
                            0 !== f.clueNums[m][G] && (U = '\x3cspan  class\x3d"cluenum-in-box"\x3e' + f.clueNums[m][G] + "\x3c/span\x3e");
                            q.append('\x3cdiv class\x3d"popup-box letter" data-x\x3d"0" data-y\x3d"' + N + '" data-gx\x3d"' + m + '" data-gy\x3d"' + G + '"\x3e' + U + ' \x3cspan class\x3d"letter-in-box"\x3e \x3c/span\x3e\x3c/div\x3e');
                            U = a(".popup-box", "#answer-popup");
                            U = U[U.length - 1];
                            a(U).data("x", N);
                            a(U).data("y", 0);
                            da[0][L] = a(U);
                            m += u;
                            G += d
                        }
                        a(".popup-box", b).mousedown(W(w, "PopupBoxHandler"));
                        (q = a(".letter-in-box", ".popup-box").first().css("left")) && parseInt(q.split(" ")[0].replace("px", ""));
                        v.showAnswerPopup()
                    }
                    q = "\x3cb\x3e" + A.clueNum + (A.acrossNotDown ? window.runningOnTablet ? t.across_short : " " + t.across : window.runningOnTablet ? t.down_short : " " + t.down) + "\x3c/b\x3e ";
                    a("#answer-popup .modal-body .popup-clueNum", b).html(q.toUpperCase());
                    a("#answer-popup .modal-body .popup-cluetext", b).html(p(A, k.playSettings.includeWordLens));
                    !k.playSettings.usePopup || r.clue.hasVideo || r.clue.hasAudio || r.clue.hasImage || a("#answer-popup .modal-body .multimedia", b).html("");
                    A = r.acrossNotDown ? 1 : 0;
                    q = r.acrossNotDown ? 0 : 1;
                    for (u = 0; u < na(r); u++)
                        d = r.x + u * A,
                        m = r.y + u * q,
                        Ra(da[0][u], f.current_state[d][m]),
                        Xa(d, m) || (k.playSettings.errorCheckMode ? da[0][u].addClass("errorletter") : Z[d][m] === J.BOX_STATE.CHECKED && da[0][u].addClass("wrongletter"))
                }
                D ? h(e, B) : g(e, B);
                l();
                ea && ea.sayCurrentWord()
            }
        }
        function C(a, b) {
            var c = (ba + 1) % f.placedWords.length;
            if (!J.isGridFull() && b)
                for (; Ba(c) && ba !== c; )
                    c = (c + 1) % f.placedWords.length;
            ba !== c && y(c, f.placedWords[c].x, f.placedWords[c].y, a, !1, b)
        }
        function z(a, b) {
            var c = 0 === ba ? f.placedWords.length - 1 : (ba - 1) % f.placedWords.length;
            if (k.playSettings.skipOverFilledLetter && !J.isGridFull() && !b)
                for (; Ba(c) && ba !== c; )
                    c = 0 === c ? f.placedWords.length - 1 : (c - 1) % f.placedWords.length;
            ba !== c && y(c, f.placedWords[c].x, f.placedWords[c].y, a, !1, k.playSettings.skipOverFilledLetter)
        }
        function N() {
            if (!q)
                return !1;
            var a = f.boxToPlacedWordsIdxs[q.x][q.y];
            1 < a.length && y(r === f.placedWords[a[0]] ? a[1] : a[0], q.x, q.y, !0, !1, !1);
            return !1
        }
        function D(a) {
            a.preventDefault();
            return a.target.href ? (window.open(a.target.href, "_blank"),
            !1) : N()
        }
        function sa(a) {
            a.preventDefault();
            a.stopPropagation();
            C(!0, k.playSettings.skipOverFilledLetter);
            return !1
        }
        function tc(a) {
            a.preventDefault();
            a.stopPropagation();
            z(!0, k.playSettings.skipOverFilledLetter);
            return !1
        }
        function Ea() {
            a(".clueDiv", b).off("click");
            a(".clueDiv", b).css("cursor", "default");
            a(".clueDiv", b).click(I(V, F + " -\x3e Clue click", "clue div click"))
        }
        function H(b) {
            b.preventDefault();
            var c = a.data(a(b.target).closest(".box")[0], "x");
            b = a.data(a(b.target).closest(".box")[0], "y");
            ma && ma.isInGridEditingMode() ? ma.boxClicked(c, b) : R.processBoxClick(c, b);
            return !1
        }
        var V = function(c) {
            Na.markUserActivity();
            c.preventDefault();
            a("#cluelist-modal", b).modal("hide");
            var d = a(c.target).closest(".clueDiv", b)
              , e = d.data("idx");
            if (0 > e || e > f.placedWords.length)
                return !1;
            if (window.isPreview && cb.isInClueEditingMode())
                return cb.startEditingClue(e),
                !1;
            if (window.isPreview && cb.isInClueLinkingMode())
                return d.toggleClass("linked-clue"),
                !1;
            n.nClueClicks++;
            y(e, f.placedWords[e].x, f.placedWords[e].y, !0, !0, k.playSettings.skipOverFilledLetter);
            c.target.href && window.open(c.target.href, "_blank");
            return !1
        };
        return {
            select: y,
            selectNextWord: C,
            selectPrevWord: z,
            deselectCurrentWord: x,
            selectBox: g,
            processBoxClick: function(c, e) {
                n.nBoxClicks++;
                Na.markUserActivity();
                a(".dummy", b).val("");
                a(".popup-dummy", b).val("");
                Ma = "";
                if ("SUDOKU" === f.puzzleType)
                    R.selectBox(c, e),
                    R.hiliteAndSelectBoxForLetterEntry();
                else {
                    Va();
                    var g = f.boxToPlacedWordsIdxs[c][e];
                    if (null === g || 0 === g.length)
                        return !1;
                    g = k.playSettings.usePopup || null === q || q.x !== c || q.y !== e ? 1 < g.length ? 0 === Aa ? f.placedWords[g[0]].acrossNotDown ? g[0] : g[1] : f.placedWords[g[0]].acrossNotDown ? g[1] : g[0] : g[0] : 1 < g.length ? ba === g[0] ? g[1] : g[0] : g[0];
                    f.placedWords[g] !== r ? R.select(g, c, e, !k.playSettings.usePopup, !0, !1) : null === q || c === q.x && e === q.y || (R.selectBox(c, e),
                    R.hiliteAndSelectBoxForLetterEntry(),
                    d());
                    k.playSettings.usePopup && !Ka() && v.showAnswerPopup();
                    return !1
                }
            },
            selectNextEmptyBox: h,
            hiliteAndSelectBoxForLetterEntry: l,
            selectCurrentCrossingWord: N,
            showCurrentCrossingClue: d,
            showLinkedClues: function() {
                if (q && r && 0 !== ha.length && r.linkedWordIdxs && !(1 > r.linkedWordIdxs.length))
                    for (var a = r.linkedWordIdxs, b = 0; b < a.length; b++)
                        ba !== a[b] && ha[a[b]].addClass("linked-clue")
            },
            linkCluesToAnswerEntry: Ea,
            showRelatedLinks: function() {
                if (f.placedWords) {
                    for (var c = 0; c < f.placedWords.length; c++) {
                        var d = ha[c];
                        if (d && 0 !== d.length && f.placedWords[c].clue.url && "#" !== f.placedWords[c].clue.url) {
                            var e = "";
                            f.placedWords[c].clue.refText && (e = "\x3ci\x3e" + f.placedWords[c].clue.refText + "\x3c/i\x3e");
                            a(".clue", d).append(' \x3cdiv class\x3d"related-links"\x3e \x3ca title\x3d"Click to open related link in a new tab" href\x3d"#"\x3e' + window.messages.related_link + (e ? ": " + e : "") + "\x3c/a\x3e\x3c/div\x3e");
                            d.find("a").click(function(b) {
                                return function(c) {
                                    c.preventDefault();
                                    if (0 < a(c.target).closest("audio").length)
                                        return !0;
                                    c = a(c.target).closest(".clueDiv").data("idx");
                                    n.articleClicks[c] += 1;
                                    n.articleClickSrc[c] = n.articleClickSrc[c] === J.ARTICLE_CLICK_SRC.MENU ? J.ARTICLE_CLICK_SRC.BOTH : J.ARTICLE_CLICK_SRC.CLUE;
                                    ka.setStateChangedAfterCompletion(!0);
                                    window.open(b, "_blank");
                                    return !1
                                }
                            }(f.placedWords[c].clue.url))
                        }
                    }
                    a(".box", b).off("click")
                }
            },
            clueClickHandler: V,
            setupEvents: function() {
                lb || (a(".box", b).mousedown(W(H, "boxClickHandler")),
                J.picClues || Ea());
                a("#direction-toggle-button", b).click(I(D, F + " -\x3e Answer popup", "Popup word direction toggle"));
                a(".clue-bar", b).click(I(D, F + " -\x3e Clue bar", "Clue bar tap"));
                a(".next-clue-button", b).click(W(sa, "next_clue_handler"));
                a(".prev-clue-button", b).click(W(tc, "next_clue_handler"))
            }
        }
    }();
    var Fa = function() {
        var c = function(a, b, c, d) {
            if (E[a][b].hasClass("prerevealed-box"))
                ea.say("Pre-revealed box: " + f.current_state[a][b]);
            else {
                Z[a][b] = J.BOX_STATE.REVEALED;
                var e = E[a][b];
                S.letter_entered(a, b, f.box[a][b], !0, d, null);
                e.removeClass("wrongletter");
                e.removeClass("errorletter");
                Ka() && (c ? (da[0][a - r.x].removeClass("errorletter"),
                da[0][a - r.x].removeClass("wrongletter")) : (da[0][b - r.y].removeClass("errorletter"),
                da[0][b - r.y].removeClass("wrongletter")));
                ea && ea.say(t.reveal + " : " + f.current_state[a][b])
            }
        };
        return {
            box: c,
            word: function(a) {
                for (var b = f.placedWords[a], d = b.x, e = b.y, g = 0; g < na(b); g++)
                    g === na(b) - 1 ? c(d, e, b.acrossNotDown, !0) : c(d, e, b.acrossNotDown, !1),
                    d += b.acrossNotDown ? 1 : 0,
                    e += b.acrossNotDown ? 0 : 1;
                ea && ea.say(t.reveal + " : " + f.placedWords[a].originalTerm)
            },
            grid: function(c) {
                if (!J.isGridRevealed()) {
                    for (var d = 0; d < f.box.length; d++)
                        for (var e = 0; e < f.box[d].length; e++)
                            if (!ib(d, e)) {
                                var g = E[d][e];
                                f.current_state[d][e] = f.box[d][e];
                                Ra(E[d][e], f.box[d][e]);
                                Z[d][e] = J.BOX_STATE.REVEALED;
                                g.removeClass("pencil-entry");
                                g.attr("title", "");
                                g.find(".box-icon").hide();
                                window.isPreview && f.preRevealIdxs && !0 === f.preRevealIdxs[d][e] && E[d][e].addClass("prerevealed-box")
                            }
                    a(".box-with-background-shape", b).addClass("filled-box-with-background-shape");
                    a(".box-with-background-shape", b).removeClass("box-with-background-shape");
                    a(".errorletter", b).removeClass("errorletter");
                    a(".wrongletter", b).removeClass("wrongletter");
                    a(".sudoku-constraint-box", b).removeClass("sudoku-constraint-box");
                    a(".selected-entry", b).removeClass("selected-entry");
                    a(".pencil-box", b).addClass("invisible");
                    k.playSettings.showDoneEntries && za.GridDecorator.updateDoneEntries();
                    J.setGridRevealed(!0);
                    if (!window.isPreview) {
                        if (f.placedWords)
                            for (d = 0; d < f.placedWords.length; d++)
                                sb(d, !0);
                        H(ka.gridCompletelyFilled, "Grid full checks")
                    }
                    null != X && X.isInitiated && c && X.sendPlaySnapshot(X.triggeredAction.REVEAL_GRID)
                }
            }
        }
    }();
    var v = function() {
        function c() {
            a("#info-modal", b).modal();
            if (ea) {
                var c = a("#info-modal .modal-title", b).text()
                  , d = a("#info-modal .modal-body", b).text();
                ea.say(c + ", " + d)
            }
        }
        function d(c) {
            a("#info-modal .modal-body", b).html(c)
        }
        function e() {
            a("#info-modal .modal-title", b).html("");
            a("#info-modal .modal-header", b).removeClass("bg-green");
            a("#info-modal .modal-header", b).removeClass("bg-red")
        }
        function g(c) {
            a("#info-modal .modal-title", b).html(c)
        }
        function h(c) {
            a("#info-modal #footer-btn", b).text(c)
        }
        return {
            show_info_modal: c,
            clear_info_modal_body: function() {
                a("#info-modal .modal-body", b).html("")
            },
            set_info_modal_body: d,
            clear_info_modal_title: e,
            set_info_modal_title: g,
            set_info_modal_btn_label: h,
            do_info_modal_hide: function() {
                function l(e, f, h) {
                    Ca.DISABLE_PLAY_IDS || (a("#info-modal .modal-title", b).append('\x3cimg id\x3d"spinner" style\x3d"text-align:center;margin-left:10px;"  width\x3d"35px" src\x3d"images/spinner-cword.gif"\x3e'),
                    a.ajax({
                        type: "POST",
                        url: "postUserInfo",
                        contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                        dataType: "json",
                        data: {
                            playId: n.playId,
                            uid: n.userId,
                            authInfo: h,
                            userInfoType: f,
                            userInfo: e
                        },
                        success: function(e) {
                            a("#info-modal .modal-title #spinner", b).remove();
                            e && 0 !== e.status && (C("Showing error"),
                            g("Error"),
                            d(e.error + " or contact puzzlemaster@amuselabs.com"),
                            c())
                        },
                        error: function(e, f, h) {
                            a("#info-modal .modal-title #spinner", b).remove();
                            g("Error");
                            d("Sorry, there was an error in connecting to the server.");
                            c();
                            T("Error in saving user info", e, f, h)
                        }
                    }))
                }
                if (bb)
                    bb = !1,
                    a(".modal-backdrop.fade.in").css("opacity", ac),
                    K.resume();
                else {
                    a("#info-modal #footer-btn", b).show();
                    e();
                    if (a("#info-modal #footer-btn", b).text() === t.start && !Oa) {
                        h(t.close);
                        if (f.gatherEmail) {
                            var k = a("#info-modal .modal-body #participant-input", b).find("#email").val();
                            l(k, ja.USER_INFO_TYPE.EMAIL, null)
                        }
                        f.gatherMobile && l(a("#info-modal .modal-body #participant-input", b).find("#mobile").val(), ja.USER_INFO_TYPE.MOBILE, null);
                        f.gatherName && (k = a("#info-modal .modal-body #participant-input", b).find("#first-name").val(),
                        l(k, ja.USER_INFO_TYPE.NAME, null));
                        a("#participant-input", b).hide();
                        ub()
                    }
                    a("#info-modal #sharing-buttons", b).remove();
                    "Login" === a("#info-modal #footer-btn", b).text() && h(t.close);
                    a("#next-action-btn", b).hide();
                    P && P.stopPlayingMedia();
                    a(".overlay", b).hide();
                    a("#info-modal", b).removeClass("puzzle-completion-modal")
                }
            },
            center_align_info_modal_content: function() {
                a("#info-modal .modal-title", b).css("text-align", "center");
                a("#info-modal .modal-footer", b).css("text-align", "center")
            },
            show_select_word_modal: function(a, b) {
                g(a);
                d(b);
                c()
            },
            get_puzzle_info_html: function() {
                var a = '\x3cdiv class\x3d"start-message"\x3e';
                f.title && "" !== f.title.trim() && (a += '\x3ch3 class\x3d"modal-body-title"\x3e' + f.title + "\x3c/h3\x3e");
                f.author && (a += '\x3cdiv class\x3d"modal-author"\x3e' + t.by + " " + f.author + "\x3c/div\x3e");
                f.description && "" !== f.description.trim() && (a = a + "\x3chr\x3e" + ('\x3cdiv class\x3d"modal-description"\x3e' + f.description + "\x3c/div\x3e"));
                f.help && "" !== f.help.trim() && (a = a + "\x3chr\x3e" + ('\x3cdiv class\x3d"puzzle-instr"\x3e' + f.help + "\x3c/div\x3e"));
                f.copyright && k.playSettings.showCopyright && (a = a + "\x3chr\x3e" + ('\x3cdiv class\x3d"modal-copyright"\x3e' + f.copyright + "\x3c/div\x3e"));
                qa && k.playSettings.isEmbed && (a += '\x3cdiv class\x3d"modal-powered-by"\x3e' + t.powered_by + ' \x3ca target\x3d"_blank" href\x3d"http://amuselabs.com"\x3ePuzzleMe\x3c/a\x3e\x26trade;\x3c/div\x3e');
                return a + "\x3c/div\x3e\x3c!-- end of start-message --\x3e"
            },
            showConfirmModal: function(c, d, e, f, g) {
                function h(c, d) {
                    return function(e) {
                        a(".confirm-dialog", b).off("click", ".confirm-no");
                        a(".confirm-dialog", b).off("click", ".confirm-yes");
                        c ? ca(c, F + " -\x3e Confirm modal, " + d, "Confirm modal selection", K.getElapsedTime()) : y(F + " -\x3e Confirm modal, " + d, "Confirm modal selection", K.getElapsedTime())
                    }
                }
                var l = a(".confirm-dialog", b)
                  , k = Math.min(a("body").width(), screen.width);
                l.css("width", k + "px");
                a(".modal-title", l).text(c);
                a(".modal-body", l).text(d);
                if (e)
                    a(".confirm-yes", l).text(e),
                    f ? (a(".confirm-no", l).text(f),
                    l.modal().on("click", ".confirm-yes", h(g, c + " confirmed")).on("click", ".confirm-no", h(null, c + " cancelled"))) : (a(".confirm-no", l).hide(),
                    l.modal().on("click", ".confirm-yes", h(g, c + " confirmed")));
                else if (a(".confirm-yes", l).hide(),
                f)
                    l.modal().on("click", ".confirm-no", h(null, c + " cancelled"));
                else
                    a(".confirm-no", l).hide(),
                    l.modal()
            },
            showAnswerPopup: function() {
                a("#answer-popup", b).modal()
            },
            hideAnswerPopup: function() {
                a("#answer-popup", b).modal("hide")
            }
        }
    }()
      , k = function() {
        function c() {
            function c() {
                a(".box", b).removeClass("errorletter");
                if (0 !== ha.length)
                    for (var c = 0; c < f.placedWords.length; c++) {
                        var d = ha[c];
                        d.removeClass("correct-answer-clue");
                        d.removeClass("wrong-answer-clue");
                        Ba(c) && d.addClass("done-clue")
                    }
            }
            function d() {
                Ca.DISABLE_USER_PREFS || a.ajax({
                    type: "POST",
                    async: !0,
                    url: "xwordSettings",
                    contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                    dataType: "json",
                    data: {
                        spaceKey: l.useSpaceToChangeDirection ? 0 : 1,
                        afterLetterEntry: l.skipOverFilledLetter ? 0 : 1,
                        atWordEnd: l.stayInCurrentWord ? 0 : 1,
                        textEntryMethod: l.usePopup ? 1 : 0,
                        timerOnOff: k.playSettings.showTimer ? 1 : 0
                    },
                    success: function() {},
                    error: function(a, b, c) {
                        m("Error in saving settings textStatus:" + b + " errorThrown:" + c)
                    }
                })
            }
            var e = a("#space-arrow", b)
              , g = a("#skip-squares", b)
              , h = a("#stay-current", b)
              , n = a(".error-check-input", b)
              , A = a(".popup-enabled-input", b)
              , r = a(".show-timer-input", b)
              , p = a(".show-linked-clues-input", b);
            if ("SUDOKU" === f.puzzleType)
                var w = a(".show-nonconflicting-group-input", b)
                  , v = a(".catch-conflicts-input", b)
                  , G = a(".hilite-selected-entries-input", b);
            var t = !1;
            r.prop("checked") !== l.showTimer && (k.playSettings.showTimer = r.prop("checked"),
            t = !0,
            k.playSettings.showTimer ? (K.show(),
            r = "show") : (K.hide(),
            r = "hide"),
            y(F + " -\x3e Settings change", "Timer:" + r, K.getElapsedTime()));
            n.prop("checked") !== l.errorCheckMode && (l.errorCheckMode = n.prop("checked"),
            t = !0,
            l.errorCheckMode ? S.checkGridAndShowErrors() : c(),
            r = l.errorCheckMode ? "on" : "off",
            y(F + " -\x3e Settings change", "Error check mode:" + r, K.getElapsedTime()));
            "CROSSWORD" === f.puzzleType ? (e.prop("checked") !== l.useSpaceToChangeDirection && (l.useSpaceToChangeDirection = e.prop("checked"),
            t = !0,
            r = l.useSpaceToChangeDirection ? "Yes" : "no",
            y(F + " -\x3e Settings change", "Space to change direction:" + r, K.getElapsedTime())),
            g.prop("checked") !== l.skipOverFilledLetter && (l.skipOverFilledLetter = g.prop("checked"),
            t = !0,
            r = l.skipOverFilledLetter ? "yes" : "no",
            y(F + " -\x3e Settings change", "Skip filled letter:" + r, K.getElapsedTime())),
            h.prop("checked") !== l.stayInCurrentWord && (l.stayInCurrentWord = h.prop("checked"),
            t = !0,
            r = l.stayInCurrentWord ? "yes" : "no",
            y(F + " -\x3e Settings change", "Stay in current word:" + r, K.getElapsedTime())),
            0 < A.length && A.prop("checked") !== l.usePopup && (l.usePopup = A.prop("checked"),
            t = !0,
            l.usePopup ? (Yb(),
            e = "On") : (Xb(),
            e = "Off"),
            y(F + " -\x3e Settings change", "Use popup:" + e, K.getElapsedTime())),
            p.prop("checked") !== l.showLinkedClues && (k.playSettings.showLinkedClues = p.prop("checked"),
            t = !0,
            r = k.playSettings.showLinkedClues ? "on" : "off",
            R.select(ba, f.placedWords[ba].x, f.placedWords[ba].y, !0, !1, k.playSettings.skipOverFilledLetter),
            y(F + " -\x3e Settings change", "Show linked clues:" + r, K.getElapsedTime()))) : "SUDOKU" === f.puzzleType && (w.prop("checked") !== l.showNonConflictingGroup && (l.showNonConflictingGroup = w.prop("checked"),
            t = !0,
            l.showNonConflictingGroup ? za.GridDecorator.showNonConflictingGroup(q.x, q.y) : a(".sudoku-constraint-box", b).removeClass("sudoku-constraint-box"),
            r = l.showNonConflictingGroup ? "on" : "off",
            y("Settings Change", "Show nonconflicting group: " + r, K.getElapsedTime())),
            v.prop("checked") !== l.catchConflicts && (l.catchConflicts = v.prop("checked"),
            t = !0,
            l.catchConflicts ? za.GridDecorator.showAllConflicts() : za.GridDecorator.hideAllConflicts(),
            r = l.catchConflicts ? "on" : "off",
            y("Settings Change", "Catch conflicts setting: " + r, K.getElapsedTime())),
            G.prop("checked") !== l.hiliteSelectedEntries && (k.playSettings.hiliteSelectedEntries = G.prop("checked"),
            t = !0,
            k.playSettings.hiliteSelectedEntries ? (za.GridDecorator.hiliteSelectedEntriesInGrid(q.x, q.y),
            r = "highlight") : (a(".selected-entry", b).removeClass("selected-entry"),
            r = "disable highlight"),
            y("Settings Change", "Timer: " + r, K.getElapsedTime())));
            t && H(d, "Save settings");
            $a()
        }
        function d() {
            function c(b, c) {
                c = a(c);
                b ? c.parent().find(".option-toggle-svg").attr("xlink:href", g) : c.parent().find(".option-toggle-svg").attr("xlink:href", h);
                c.prop("checked", b)
            }
            a("#space-arrow", b).prop("checked", l.useSpaceToChangeDirection);
            a("#space-clear", b).prop("checked", !l.useSpaceToChangeDirection);
            a("#skip-squares", b).prop("checked", l.skipOverFilledLetter);
            a("#stay-current", b).prop("checked", l.stayInCurrentWord);
            a("#select-clue", b).prop("checked", !l.stayInCurrentWord);
            c(l.errorCheckMode, ".error-check-input");
            c(l.usePopup, ".popup-enabled-input");
            c(l.showTimer, ".show-timer-input");
            c(l.showLinkedClues, ".show-linked-clues-input");
            l.showTimer || K.hide();
            "SUDOKU" === f.puzzleType && (c(l.showNonConflictingGroup, ".show-nonconflicting-group-input"),
            c(l.catchConflicts, ".catch-conflicts-input"),
            c(l.hiliteSelectedEntries, ".hilite-selected-entries-input"))
        }
        function e(c) {
            c.preventDefault();
            n && n.nSettingsClicks++;
            a("#settings-modal", b).modal()
        }
        var g = "#slider-on-icon-"
          , h = "#slider-off-icon-";
        g = 0 < a(g + f.locale).length ? g + f.locale : g + "en-US";
        h = 0 < a(h + f.locale).length ? h + f.locale : h + "en-US";
        var l = {
            stayInCurrentWord: !window.runningOnMobile,
            skipOverFilledLetter: !0,
            jumpBackToFirstBlank: !0,
            useSpaceToChangeDirection: !0,
            errorCheckMode: !1,
            showTimer: !0,
            usePopup: window.usePopup,
            isEmbed: !1,
            sharingEnabled: f.allowSharing,
            includeWordLens: f.wordLengthsEnabled,
            inContestMode: f.contestModeEnabled ? f.contestModeEnabled : !1,
            rebusPuzzle: !1,
            showShortClueHeader: !1,
            mobileKeyboard: !0,
            tabletKeyboard: !1,
            maxCols: 2,
            useCompactLayout: !0,
            splitClues: !0,
            bottomAlignGridAndClues: !!ua(),
            showScore: !1,
            showFinalScore: !0,
            showScoreComparison: !1,
            errorCheckModeAfterGridFull: !0,
            errorAlertAfterGridFull: !0,
            startTimerOnKeypress: !1,
            disableLinks: !1,
            soundEnabled: !0,
            showStartButton: !0,
            showAuthorByLiner: !0,
            showTitleByLiner: !0,
            showClueNumberInClueBar: !0,
            showClueBarEndMessage: !0,
            showCopyright: !0,
            showAbout: !0,
            showSave: !0,
            heightIsControllable: !1,
            useFullWidthInFrame: !1,
            showLinkedClues: !0,
            pencilModeEnabled: !0,
            socialPlayEnabled: !0,
            theme: null
        };
        "SUDOKU" === f.puzzleType && (l.showScore = !1,
        l.showFinalScore = !1,
        l.tabletKeyboard = !0,
        l.showNonConflictingGroup = !1,
        l.catchConflicts = !1,
        l.showDoneEntries = !0,
        l.hiliteSelectedEntries = !0);
        return {
            applySettingsStateToUI: d,
            playSettings: l,
            setupEvents: function() {
                a(".settings-selection", b).click(I(e, F + " -\x3e Settings", "Settings modal display"));
                a("#settings-button", b).click(I(c, F + " -\x3e Settings Modal", "Settings apply click"));
                a("#settings-modal", b).on("hidden.bs.modal", W(d, "applySettingsStateToUI on settings hide"));
                for (var f = document.getElementsByClassName("option-toggle-image"), l = 0; l < f.length; l++)
                    f[l].onclick = function() {
                        var b = a(this)
                          , c = a(".option-toggle-svg", b);
                        b = b.parent().find("input");
                        c.attr("xlink:href") === g ? (c.attr("xlink:href", h),
                        c.parent().removeClass("on"),
                        b.prop("checked", !1)) : (c.attr("xlink:href", g),
                        c.parent().addClass("on"),
                        b.prop("checked", !0));
                        W(void 0)
                    }
            }
        }
    }();
    var K = function() {
        function c() {
            if (!Da)
                return n.timeTaken;
            var a = 0;
            0 < window.startTime && (a += ((new Date).getTime() - window.startTime) / 1E3,
            a = Math.round(a));
            return a
        }
        function d(c) {
            var d = Math.round(c % 60)
              , e = Math.floor(c / 60) % 60;
            c = Math.floor(c / 3600);
            var f = "";
            Ga = "";
            0 < c && (f = c + ":",
            Ga = Ha(c, t.hour),
            0 < e && (Ga += ", "),
            10 > e && (f += "0"));
            f += e + ":";
            0 < e && (Ga += Ha(e, t.minute),
            0 < d && (Ga += ", "));
            10 > d && (f += "0");
            f += d;
            a("#clock", b).html(f);
            if (0 < d || "" === Ga)
                Ga += Ha(d, t.second)
        }
        function e() {
            if (Da) {
                var a = Math.round(((new Date).getTime() - window.startTime) / 1E3);
                d(a);
                window.setTimeout(e, 1E3)
            }
        }
        return {
            getElapsedTime: c,
            resume: function() {
                a(".clock-pause", b).css("display", "none");
                a("#clock.clock-time", b).show();
                a(".timer-div", b).removeClass("menu-icon");
                aa || K.start()
            },
            show: function() {
                a(".timer-div", b).css("display", "inline-block");
                k.playSettings.showTimer = !0
            },
            hide: function() {
                a(".timer-div", b).hide();
                k.playSettings.showTimer = !1
            },
            start: function() {
                a(".clock-pause", b).is(":visible") || Da || (Oa = !0,
                window.startTime = (new Date).getTime(),
                window.startTime -= n.timeTaken ? 1E3 * n.timeTaken : 0,
                Da = !0,
                window.setTimeout(e, 1E3))
            },
            stop: function() {
                n.timeTaken = c();
                Da = !1
            },
            setClockDisplay: d,
            getTimeElapsedHMSString: function() {
                var a = ""
                  , b = c()
                  , d = Math.round(b % 60)
                  , e = Math.floor(b / 60) % 60;
                b = Math.floor(b / 3600);
                0 < b && (a = a + Ha(b, t.hour) + " ");
                0 < e && (a = a + Ha(e, t.minute) + " ");
                0 < d && (a = a + Ha(d, t.second) + " ");
                return a
            }
        }
    }();
    var ja = function() {
        function c(c) {
            c && (Ca.DISABLE_PLAY_IDS || a.ajax({
                type: "GET",
                async: !1,
                url: "getPlayLog",
                contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                dataType: "json",
                data: {
                    playId: c
                },
                success: function(c) {
                    c && c.playLog && (u = JSON.parse(c.playLog),
                    w = c.score,
                    Ea = c.authInfo,
                    z = c.userInfoType,
                    u && (E = 1E3 * c.timeTaken - (u[u.length - 1].timestamp - u[0].timestamp) - 500),
                    c.userInfo || (q = c.userInfo,
                    z === x.FB && (p = "https://graph.facebook.com/" + Ea + "/picture"),
                    a("#against-player-name").html(q),
                    p && a("#against-player-pic").attr("src", p)),
                    c.uid && a(".crossword-footer-message", b).append("\x3cdiv class\x3d'multiplay-info'\x3e\x3c/div\x3e"))
                },
                error: function(a, b, c) {
                    T("Error in getting play stats", a, b, c)
                }
            }))
        }
        function d(c) {
            c.score && a("#against-score", b).html(c.score);
            for (var d = f.placedWords[c.idx], e = d.clueNum, g = d.acrossNotDown ? "across" : "down", h = 0; h < f.placedWords.length; h++) {
                var l = f.placedWords[h].acrossNotDown && "across" === g || !f.placedWords[h].acrossNotDown && "down" === g;
                if (f.placedWords[h].clueNum === e && l) {
                    for (e = 0; e < na(d); e++)
                        la.showMultiplayState(d.x + e * (d.acrossNotDown ? 1 : 0), d.y + e * (d.acrossNotDown ? 0 : 1), c.state);
                    break
                }
            }
        }
        function e(c, g) {
            if (g >= c.length)
                l && clearTimeout(l),
                f.replay && D && clearTimeout(D);
            else {
                d(c[g]);
                var h = c[g].timestamp;
                g++;
                g === c.length ? (a("#against-score", b).html(w),
                a("#against-score", b).css("color", "green"),
                f.replay && (D && clearTimeout(D),
                Da = !1)) : (h = c[g].timestamp - h,
                l && clearTimeout(l),
                l = setTimeout(function() {
                    e(c, g)
                }, h))
            }
        }
        function g() {
            Ca.DISABLE_PLAY_IDS || y !== x.NONE && r !== k && a.ajax({
                type: "POST",
                async: !0,
                url: "postUserInfo",
                contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                dataType: "json",
                data: {
                    playId: n.playId,
                    uid: n.userId,
                    authInfo: t,
                    userInfoType: y,
                    userInfo: r
                },
                error: function(a, b, c) {
                    T("Error in posting authentication info", a, b, c)
                }
            })
        }
        function h() {
            FB || (function(a) {
                if (!a.getElementById("facebook-jssdk")) {
                    var b = a.createElement("script");
                    b.id = "facebook-jssdk";
                    b.async = !0;
                    b.src = "https://connect.facebook.net/en_US/all.js";
                    a.getElementsByTagName("head")[0].appendChild(b)
                }
            }(document),
            window.fbAsyncInit = function() {
                FB.init({
                    appId: "269567426561010",
                    status: !0,
                    cookie: !0,
                    xfbml: !0,
                    oauth: !0,
                    version: "v2.2"
                });
                a(document).trigger("fbload")
            }
            );
            f.multiPlayEnabled && (C("Trying to login into FB"),
            a(document).on("fbload", function() {
                FB.login(function(b) {
                    b.authResponse ? (b = FB.getAuthResponse().accessToken,
                    FB.api("/me", {
                        access_token: b
                    }, function(b) {
                        b && !b.error && (t = b.id,
                        y = x.FB,
                        r = b.name,
                        g(),
                        m = "https://graph.facebook.com/" + t + "/picture",
                        a("#this-player-name").html(r),
                        a("#this-player-pic").attr("src", m))
                    })) : C("User cancelled login or did not fully authorize.")
                })
            }))
        }
        var l = null, k = "Puffy Tiger", m = "images/cat-cartoon.png", r = k, p = "images/lion-cartoon.png", q = "Puffy Lion", w = 0, t, D = null, x = {
            NONE: 0,
            FB: 1,
            GOOGLE: 2,
            TWITTER: 3,
            EMAIL: 4,
            MOBILE: 5,
            NAME: 6
        }, y = x.NONE, Ea, z, E, u = {}, xa = !1;
        return {
            recordCurrentPlayState: function(a) {
                a = {
                    timestamp: (new Date).getTime(),
                    idx: a,
                    state: 0,
                    answer: ja.userAnswers[a],
                    score: n.score
                };
                n.playLog && n.playLog.push(a)
            },
            setMultiPlayMode: function(a) {
                xa = a
            },
            isInMultiPlayMode: function() {
                return xa
            },
            getCompletedMessage: function() {
                v.clear_info_modal_title();
                w > n.score ? v.set_info_modal_title("You lost") : w < n.score ? v.set_info_modal_title("\x26nbsp; You won!") : v.set_info_modal_title("You tied!");
                return '\x3cdiv style\x3d"text-align:center"\x3e\x3cimg id\x3d"this-player-pic" class\x3d"profile-pic" src\x3d"' + m + '"\x3e\x3cdiv id\x3d"this-player-name" class\x3d"player-name"\x3e' + r + '\x3c/div\x3e\x3cdiv style\x3d"margin-left:10px;margin-right:10px;display:inline;color:darkcyan;"\x3eVs\x3c/div\x3e\x3cdiv style\x3d"margin-left:5px;display:inline;"\x3e\x3cimg id\x3d"this-player-pic" class\x3d"profile-pic" src\x3d"' + p + '"\x3e\x3cdiv id\x3d"this-player-name" class\x3d"player-name"\x3e' + q + "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e"
            },
            setupAndStartMultiplay: function() {
                xa && g();
                (function() {
                    if (f.multiPlayEnabled) {
                        var b = a("#menu-misc");
                        b.append('\x3cul class\x3d"nav navbar-nav navbar-left"\x3e\x3cli\x3e\x3cdiv class\x3d"player-info"\x3e\x3cimg id\x3d"this-player-pic" class\x3d"profile-pic" src\x3d"' + m + '"\x3e\x3c/li\x3e\x3cli\x3e\x3cdiv id\x3d"this-player-name" class\x3d"player-name"\x3e' + r + '\x3c/div\x3e\x3cdiv id\x3d"score" class\x3d"score score-text"\x3e0\x3c/div\x3e\x3c/li\x3e\x3c/ul\x3e');
                        f.againstPlayId && b.append('\x3cul class\x3d"nav navbar-nav navbar-left"\x3e\x3cli\x3e\x3cdiv class\x3d"player-info"\x3e\x3cimg id\x3d"against-player-pic" class\x3d"profile-pic" src\x3d"' + p + '"\x3e\x3c/li\x3e\x3cli\x3e\x3cdiv id\x3d"against-player-name" class\x3d"player-name"\x3e' + q + '\x3c/div\x3e\x3cdiv id\x3d"against-score" class\x3d"score score-text"\x3e0\x3c/div\x3e\x3c/li\x3e\x3c/ul\x3e\x3cul class\x3d"nav navbar-nav navbar-left"\x3e\x3cdiv class\x3d"multiplay-correct multiplay-legend"\x3e \x3cdiv class\x3d"legend-icon"\x3e\x3cdiv class\x3d"fa fa-check"/\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"multiplay-revealed multiplay-legend"\x3e \x3cdiv class\x3d"legend-icon"\x3e\x3cdiv class\x3d"fa fa-lightbulb-o"/\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"multiplay-wrong multiplay-legend"\x3e \x3cdiv class\x3d"legend-icon"\x3e\x3cdiv class\x3d"fa fa-times"/\x3e\x3c/div\x3e\x3c/div\x3e\x3c/li\x3e\x3c/ul\x3e');
                        jb()
                    }
                }
                )();
                f.replay && (a("#score").attr("id", "against-score"),
                a("#menu-misc").append('\x3cul class\x3d"nav navbar-nav navbar-left"\x3e\x3cli\x3e\x3cp class\x3d"navbar-text" style\x3d"margin-top:15px;"\x3e\x3cdiv class\x3d"multiplay-correct replay-legend"\x3e\x3c/div\x3e Correct\x3c/p\x3e\x3c/li\x3e\x3cli\x3e\x3cp class\x3d"navbar-text" style\x3d"margin-top:15px;"\x3e\x3cdiv class\x3d"multiplay-revealed replay-legend"\x3e\x3c/div\x3e Revealed\x3cp\x3e\x3c/li\x3e\x3cli\x3e\x3cp class\x3d"navbar-text" style\x3d"margin-top:15px;"\x3e\x3cdiv class\x3d"multiplay-wrong replay-legend"\x3e\x3c/div\x3e Incorrect\x3cp\x3e\x3c/li\x3e\x3c/ul\x3e'));
                (xa || f.replay) && c(f.againstPlayId);
                u && (l = setTimeout(function() {
                    e(u, 0)
                }, E))
            },
            userAnswers: [],
            setupEvents: function() {
                h()
            },
            USER_INFO_TYPE: x
        }
    }(), dc = function() {
        function c() {
            ma && ma.isInGridEditingMode() && (v.set_info_modal_title("Clone Puzzle"),
            v.set_info_modal_body("Your edits are not saved. Please save your puzzle before cloning it"),
            v.show_info_modal());
            a.ajax({
                type: "POST",
                url: "ajax/xwordClonePuzzle.jsp",
                contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                dataType: "json",
                data: {
                    id: f.id,
                    set: z ? z.set : ""
                },
                success: function(a) {
                    a && 0 === a.status ? window.location = "crossword-preview?id\x3d" + a.id + "\x26set\x3d" + a.set : a && 1 === a.status && (window.location = "dashboard")
                },
                error: function(a, b, c) {
                    v.set_info_modal_title("Error");
                    v.set_info_modal_body("Sorry, there was an error in connecting to the server while cloning this puzzle.");
                    v.show_info_modal();
                    T("error in connecting to the server while cloning a puzzle", a, b, c)
                }
            })
        }
        function d(a) {
            a.preventDefault();
            window.location = window.location.search ? "crossword-create" + window.location.search + "\x26edit\x3dtrue" : "crossword-create?edit\x3dtrue"
        }
        function e(a) {
            a.preventDefault();
            window.location = "login?id\x3d" + f.id + "\x26save\x3dtrue"
        }
        function g(a) {
            a.preventDefault();
            c()
        }
        return {
            setupEvents: function() {
                a(".edit-button", b).click(I(d, "Crossword preview -\x3e Edit", "Edit puzzle"));
                a(".puzzle-clone-button", b).click(I(g, "Crossword preview -\x3e Clone", "Clone puzzle"));
                a(".login-to-save", b).click(I(e, "Crossword preview -\x3e Login", "Login to save puzzle"));
                window.isPreview && a("#logout-button", b).click(performLogout);
                a("#nextlevel-button", b).click(function() {
                    fetch_page_with_progress("ajax/xwordAsJson.jsp?\x26webui\x3d", "status", document.getElementById("status"), document.getElementById("status_text"))
                })
            },
            savePuzzle: function() {
                for (var b = 0; b < f.placedWords.length; b++)
                    delete f.placedWords[b].clue.hasVideo,
                    delete f.placedWords[b].clue.hasImage,
                    delete f.placedWords[b].clue.hasAudio,
                    delete f.placedWords[b].clue.hasLinks;
                b = f.current_state;
                f.current_state = [];
                var c = JSON.stringify(f, void 0, 2);
                f.current_state = b;
                a.ajax({
                    type: "POST",
                    url: "ajax/xwordJsonSave.jsp",
                    contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                    dataType: "json",
                    data: {
                        id: f.id,
                        set: z ? z.set : "",
                        save_json: c
                    },
                    success: function(a) {
                        a && 0 === a.status ? window.location.href = "crossword-preview?id\x3d" + a.id + "\x26set\x3d" + a.set : a && 1 === a.status && (window.location.href = "dashboard")
                    },
                    error: function(a, b, c) {
                        v.set_info_modal_title("Error");
                        v.set_info_modal_body("Sorry, there was an error in connecting to the server while saving this puzzle.");
                        v.show_info_modal();
                        T("error in connecting to the server while saving a puzzle", a, b, c)
                    }
                });
                return !0
            }
        }
    }(), ma, cb;
    var eb = function() {
        function c(b, c) {
            function d(a, b) {
                var c = new Image;
                c.onload = function() {
                    b(!0)
                }
                ;
                c.onerror = function() {
                    b(!1)
                }
                ;
                c.src = a
            }
            var e = b.id
              , f = a('\x3cdiv class\x3d"input-group"\x3e\x3cinput type\x3d"text" name\x3d"' + e + '-name" class\x3d"form-control input-text" value\x3d"' + (b.initVal ? b.initVal : "") + '" placeholder\x3d"' + (b.placeHolder ? b.placeHolder : "") + '"\x3e\x3c/div\x3e');
            a(f).attr("id", e);
            a(".theme-setting-options-block", c).append(f);
            a(".input-text", f).change(function() {
                var c = a(".input-text", f).val()
                  , e = c
                  , k = b.css;
                b["value-padding"] && (c = b["value-padding"].replace("\x3cVALUE\x3e", c));
                d(e, function(a) {
                    if (a)
                        h(k, c);
                    else if (h(k, ""),
                    b.alternateOptions)
                        for (var d in k)
                            g(d, b.alternateOptions)
                })
            });
            a(".theme-setting-options-block", c).append(f)
        }
        function d(b, c) {
            var d = b.id
              , e = b.css
              , f = b.initVal ? b.initVal.replace(/"/g, "") : "Select a font";
            b = a('\x3cinput id\x3d"#" type\x3d"text" class\x3d"form-control font-selector theme-setting-option" placeholder\x3d"Select a font"\x3e');
            b.attr("id", d);
            a(".theme-setting-options-block", c).append(b);
            -1 < f.indexOf(",") && (f = f.substring(0, f.indexOf(",")));
            b.val(f);
            c = q.concat(p).sort();
            b.fontselect({
                fonts: c,
                standardFonts: q
            }).change(function() {
                var b = a(this).val().replace(/\+/g, " ");
                h(e, b.split(":")[0])
            });
            return b
        }
        function e(b, c) {
            for (var d = b.id, e = b.options, f = a('\x3cform class\x3d"theme-setting-option"\x3e\x3c/form\x3e'), g = b.initVal ? b.initVal : "", k = 0; k < e.length; k++) {
                var l = e[k]
                  , n = a('\x3clabel class\x3d"radio-inline"\x3e\x3cinput type\x3d"radio" name\x3d"#" value\x3d"normal"\x3e\x3c/label\x3e')
                  , m = a("\x3cinput\x3e").attr({
                    name: d,
                    value: l.value,
                    type: "radio"
                });
                l.style && n.attr("style", l.style);
                l.value === g && a(m, n).attr("checked", "checked");
                n.text(l.text);
                n.append(m);
                f.append(n)
            }
            a(".theme-setting-options-block", c).append(f);
            if (b.isPlayerConfig) {
                var A = b.configAttribute;
                a("input[name\x3d" + d + "]").change(function() {
                    var b = a("input[name\x3d" + d + "]:checked").val();
                    r[A] = b
                })
            } else {
                var p = b.css;
                a("input[name\x3d" + d + "]").change(function() {
                    h(p, a("input[name\x3d" + d + "]:checked").val())
                })
            }
            return f
        }
        function f(b, c) {
            var d = b.css
              , e = b.id
              , f = a('\x3cdiv id\x3d"#" class\x3d"input-group colorpicker-component col-lg-8 theme-setting-option"\x3e\x3cinput type\x3d"text" value\x3d"#00AABB" class\x3d"form-control" /\x3e\x3cspan class\x3d"input-group-addon"\x3e\x3ci\x3e\x3c/i\x3e\x3c/span\x3e\x3c/div\x3e');
            f.attr("id", e);
            a(".theme-setting-options-block", c).append(f);
            c = b.initVal ? b.initVal : "#000000";
            a("#" + e).colorpicker({
                color: c,
                format: "hex",
                colorSelectors: {
                    black: "#000000",
                    turquoise: "#16CBCC",
                    pink: "#d64592",
                    purple: "#D6B7FF",
                    blue: "#42A9E5",
                    green: "#19AD74",
                    yellow: "#F9DA0B",
                    orange: "#EF7D0B",
                    red: "#D2370F"
                },
                customClass: "colorpicker-2x",
                sliders: {
                    saturation: {
                        maxLeft: 200,
                        maxTop: 200
                    },
                    hue: {
                        maxTop: 200
                    },
                    alpha: {
                        maxTop: 200
                    }
                }
            }).on("changeColor", function(a) {
                h(d, a.color.toString());
                b["set-fg-color"] && (a = a.color.toRGB(),
                h(b["set-fg-color"], 125 < Math.round((299 * a.r + 587 * a.g + 114 * a.b) / 1E3) ? "#000000" : "#ffffff"))
            });
            return f
        }
        function g(b, c) {
            var d = ".hilited-box-with-focus .hilited-box .hilited-clue .clue-bar-text\x3e.separator ::selection btn-".split(" ")
              , e = -1 < d.indexOf(b) || -1 < b.indexOf(":hover");
            if (!e)
                for (var f = 0; f < d.length; f++)
                    -1 < b.indexOf(d[f]) && (e = !0);
            e ? a("\x3cstyle\x3e").text(b + JSON.stringify(c).replace(/"/g, "").replace(/,/g, ";")).appendTo("head") : a(b).css(c)
        }
        function h(a, b) {
            for (var c in a) {
                var d = {};
                if (a.hasOwnProperty(c)) {
                    if (a[c].constructor === Array)
                        for (var e = 0; e < a[c].length; e++)
                            d[a[c][e]] = b;
                    else
                        d[a[c]] = b;
                    try {
                        g(c, d)
                    } catch (V) {
                        m("Could not apply custom theme: " + V)
                    }
                    try {
                        e = void 0;
                        var f = c;
                        n[f] || (n[f] = {});
                        for (e in d)
                            d.hasOwnProperty(e) && (n[f][e] = d[e])
                    } catch (V) {
                        m("Could not add custom theme to resulting CSS: " + V)
                    }
                }
            }
        }
        var k, n = {}, r = {};
        "undefined" !== typeof customConfigFromFile && (r = customConfigFromFile);
        var p = "Allan Anonymous+Pro Allerta+Stencil Allerta Architects+Daughter Artifika Arvo Bangers Bentham Buda:300 Cabin Cardo Chewy Coda Coming+Soon Copse Cousine Crimson+Text Didact+Gothic Droid+Sans EB+Garamond Expletus+Sans Faustina Fira+Sans Forum Geo Gruppo Hammersmith+One Inconsolata Indie+Flower Irish+Grover Josefin+Sans Josefin+Slab Judson Jura Kameron Kranky Kreon Lato Lekton Love+Ya+Like+A+Sister Mako Maven+Pro Modern+Antiqua Molengo Muli Neucha Nixie+One Nova+Round Old+Standard+TT Open+Sans Patrick+Hand Philosopher Playfair+Display Podkova Poppins Quattrocento Quattrocento+Sans Quicksand Schoolbell Special+Elite Stardos+Stencil Tenor+Sans Tinos Ubuntu VT323 Walter+Turncoat Work+Sans".split(" ")
          , q = "Arial;Bookman;Courier;Courier New;Garamond;Georgia;Helvetica;Impact;Palatino;Times;Times New Roman;Trebuchet MS;Verdana".split(";")
          , w = function() {
            a("#publish-theme-btn", b).click(function(b) {
                b.preventDefault();
                var c = Qa().set;
                v.showConfirmModal("", "Are you sure you want to save and publish the theme? Clicking 'Yes' applies the theme to all the puzzles in the series immediately.", "Yes", "No", function() {
                    a.ajax({
                        type: "POST",
                        async: !1,
                        url: "ajax/theming-widget.jsp",
                        contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                        dataType: "json",
                        data: {
                            action: "saveTheme",
                            theme: JSON.stringify(n),
                            customConfig: JSON.stringify(r),
                            set: c
                        },
                        success: function(a) {
                            0 === a.status ? (v.clear_info_modal_title(),
                            v.set_info_modal_body(a.message)) : 1 === a.status ? (v.clear_info_modal_title(),
                            v.set_info_modal_body("Sorry, you cannot save this theme.")) : (v.clear_info_modal_title(),
                            v.set_info_modal_body("Sorry, theme could not be saved. Please try again later."));
                            v.show_info_modal()
                        },
                        error: function(a, b, c) {
                            m("Error in publishing theme :" + b + ", errorThrown:" + c)
                        }
                    })
                })
            });
            a("#reset-theme-btn", b).click(function(b) {
                b.preventDefault();
                var c = Qa().set;
                v.showConfirmModal("", "Are you sure you want to reset the theme? This action cannot be undone.", "Yes", "No", function() {
                    a.ajax({
                        type: "POST",
                        async: !1,
                        url: "ajax/theming-widget.jsp",
                        contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                        dataType: "json",
                        data: {
                            action: "resetTheme",
                            set: c
                        },
                        success: function(a) {
                            0 === a.status ? location.reload() : (1 === a.status ? (v.clear_info_modal_title(),
                            v.set_info_modal_body("Sorry, you cannot save this theme.")) : (v.clear_info_modal_title(),
                            v.set_info_modal_body("Sorry, theme could not be saved. Please try again later.")),
                            v.show_info_modal())
                        },
                        error: function(a, b, c) {
                            m("Error in resetting theme :" + b + ", errorThrown:" + c)
                        }
                    })
                })
            })
        };
        return {
            init: function(b, g) {
                if (b) {
                    k = a(b);
                    b = k.find(".theme-setting-section-module");
                    for (var h = a("#customized-style-element").text().trim().split("}"), l = 0; l < h.length; l++) {
                        var m = h[l].trim();
                        if (!(2 > m.length)) {
                            var r = m.substr(0, m.indexOf("{"));
                            if (!(1 > r.length)) {
                                n[r] || (n[r] = {});
                                m = m.substr(m.indexOf("{") + 1).trim().split(";");
                                for (var A = 0; A < m.length; A++)
                                    if (!(1 > m[A].length)) {
                                        var p = m[A].substring(0, m[A].indexOf(":"))
                                          , q = m[A].substring(m[A].indexOf(":") + 1);
                                        n[r][p] = q
                                    }
                            }
                        }
                    }
                    h = eb.descriptor;
                    for (l = 0; l < h.length; l++)
                        for (r = h[l].modules,
                        m = 0; m < r.length; m++)
                            for (A = r[m].widgets,
                            p = 0; p < A.length; p++)
                                if (q = A[p],
                                q.isPlayerConfig) {
                                    if (q.options && "undefined" !== typeof customConfigFromFile) {
                                        var t = q.id;
                                        customConfigFromFile[t] && (q.initVal = customConfigFromFile[t])
                                    }
                                } else if (q.css) {
                                    t = q.css;
                                    for (y in t) {
                                        var v = "";
                                        if (t.hasOwnProperty(y)) {
                                            var x = t[y];
                                            if ((v = a(y).css(x)) && 0 < v.length)
                                                break;
                                            if (n && n[y] && n[y][x]) {
                                                v = n[y][x];
                                                if (q["value-padding"])
                                                    for (t = q["value-padding"].split("\x3cVALUE\x3e"),
                                                    x = 0; x < t.length; x++)
                                                        v = v.replace(t[x], "");
                                                break
                                            }
                                        }
                                    }
                                    v && 0 < v.length && (q.initVal = v)
                                }
                    for (v = 0; v < eb.descriptor.length; v++) {
                        var y = b.clone();
                        y.css("display", "block");
                        k.append(y);
                        h = eb.descriptor[v];
                        l = h["section-title"];
                        a(".theme-setting-section-title", y).text(l);
                        h = h.modules;
                        for (l = 0; l < h.length; l++)
                            for (m = h[l],
                            r = a(".theme-setting-section", b).clone(),
                            r.css("display", "block"),
                            y.append(r),
                            A = m["subsection-title"],
                            a(".theme-setting-name", r).html(A),
                            m.style && r.css(m.style),
                            m = m.widgets,
                            A = 0; A < m.length; A++) {
                                q = void 0;
                                p = m[A];
                                t = r;
                                x = p.type;
                                if ("font-family" === x)
                                    q = d(p, t);
                                else if ("color" === x)
                                    q = f(p, t);
                                else if ("radio-options" === x)
                                    q = e(p, t);
                                else if ("image-url" === x)
                                    q = c(p, t);
                                else if ("mobile-keyboard" === x)
                                    q = t,
                                    t = a('\x3cdiv class\x3d"clue-bar scrollable bottom-clue-bar" style\x3d"border-top: none; border-bottom: none;"\x3e\n\x3cdiv class\x3d"clue-nav-button" style\x3d"display: block;"\x3e\x3ca href\x3d"#" class\x3d"prev-clue-button"\x3e\n\x3csvg class\x3d"clue-nav-img" viewBox\x3d"-288 411.9 18 18"\x3e\n\x3cuse xlink:href\x3d"#left-arrow" class\x3d"clue-nav-arrow"\x3e\x3c/use\x3e\n\x3c/svg\x3e\n\x3c/a\x3e\x3c/div\x3e\n\x3cdiv class\x3d"clue-bar-text" style\x3d"font-size: 14px; border-left: none;"\x3e\x3cspan class\x3d"clue-bar-text-initial-message"\x3eTap on a box to select the word.\x3c/span\x3e\x3c/div\x3e\n\n\x3cdiv class\x3d"clue-nav-button" style\x3d"display: block;"\x3e\x3ca href\x3d"#" class\x3d"next-clue-button"\x3e\n\x3csvg class\x3d"clue-nav-img" viewBox\x3d"0 0 18 18"\x3e\n\x3cuse xlink:href\x3d"#right-arrow" class\x3d"clue-nav-arrow"\x3e\x3c/use\x3e\n\x3c/svg\x3e\n\x3c/a\x3e\x3c/div\x3e\n\x3c/div\x3e\x3cdiv class\x3d"keyboard noselect"\x3e\x3cdiv class\x3d"key-row"\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eQ\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eW\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eE\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eR\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eT\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eY\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eU\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eI\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eO\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eP\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key-row"\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eA\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eS\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eD\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eF\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eG\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eH\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eJ\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eK\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eL\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key-row"\x3e\x3cdiv class\x3d"key key-2x"\x3e\x3cdiv class\x3d"key-label"\x3e123\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eZ\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eX\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eC\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eV\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eB\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eN\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-1x"\x3e\x3cdiv class\x3d"key-label"\x3eM\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"key key-2x"\x3e\x3cdiv class\x3d"key-label"\x3e\x3cimg alt\x3d"back button" class\x3d"image-key back" src\x3d"images/back_btn.svg"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),
                                    x = a('\x3cdiv id\x3d"mobile-keyboard"\x3e\x3c/div\x3e'),
                                    x.append(t),
                                    a(".theme-setting-name", q).remove(),
                                    q.css("text-align", "center"),
                                    a(".theme-setting-options-block", q).css("float", "none"),
                                    a(".theme-setting-options-block", q).removeClass("col-lg-7"),
                                    a(".theme-setting-options-block", q).addClass("col-lg-10"),
                                    a(".theme-setting-options-block", q).append(x),
                                    q = x;
                                else if ("media-preview" === x) {
                                    q = p;
                                    x = q.width;
                                    var U = a('\x3cdiv class\x3d"media-preview-widget ' + (q.classes ? q.classes : "") + '" id\x3d"' + q.id + '"\x3e\x3c/div\x3e');
                                    "full" === x && (a(".theme-setting-name", t).remove(),
                                    t.css("text-align", "center"),
                                    a(".theme-setting-options-block", t).css("float", "none"),
                                    a(".theme-setting-options-block", t).removeClass("col-lg-7"));
                                    q.style && U.css(q.style);
                                    a(".theme-setting-options-block", t).append(U);
                                    q = U
                                }
                                p.description && (t = a('\x3cdiv class\x3d"widget-description"\x3e\x3c/div\x3e'),
                                t.html(p.description),
                                q.after(t))
                            }
                    }
                    a(".template", k).remove();
                    k.append(a('\x3cdiv class\x3d"extra-height-for-scrolling" style\x3d"height: 112px;"\x3e\x3c/div\x3e'));
                    k.append(a(".theming-widget-control", k).css("display", "block"));
                    w();
                    g && g()
                }
            },
            descriptor: [{
                "section-title": "General",
                modules: [{
                    "subsection-title": "Font",
                    widgets: [{
                        type: "font-family",
                        id: "theme-font-selector",
                        css: {
                            ".pm-xword-body, .main_body, .btn-default, .btn-primary, .bottom-clue-bar": "font-family"
                        }
                    }]
                }, {
                    "subsection-title": "Primary color",
                    widgets: [{
                        type: "color",
                        id: "primary-color",
                        css: {
                            ".hilited-box-with-focus": "background-color",
                            "navbar-nav\x3eli\x3ea, .nav-mobile .caret": "color",
                            ".clueDiv.crossing-clue": "border-left-color",
                            ".dropdown-menu\x3eli\x3ea:hover": ["border-left-color", "color"],
                            ".dropdown-menu\x3eli\x3ea:hover .list-icon-style": ["border-color", "fill"],
                            ".navbar-default .navbar-nav\x3eli\x3ea:hover": "color",
                            ".modal-header": "background-color",
                            ".btn-default:hover, .btn-primary:hover": "background-color",
                            ".nav-icon-style": "stroke",
                            ".clue-bar-text::selection": "background-color",
                            ".CLUE-DIRECTION::selection": "background-color",
                            ".slider-on-bg": "fill"
                        },
                        "set-fg-color": {
                            ".hilited-box-with-focus, .btn-default:hover, .btn-primary:hover, .hilited-box-with-focus\x3e.cluenum-in-box": "color",
                            ".modal-header": "color",
                            ".clue-bar-text::selection": "color",
                            ".CLUE-DIRECTION::selection": "color",
                            ".close-btn": "fill",
                            ".slider-on-text": "fill"
                        }
                    }]
                }, {
                    "subsection-title": "Secondary color",
                    widgets: [{
                        type: "color",
                        id: "secondary-color",
                        css: {
                            ".hilited-box, .hilited-clue, .btn-default, .btn-primary": "background-color",
                            ".clue-bar": "background-color",
                            ".slider-on-btn-lines": "fill"
                        },
                        "set-fg-color": {
                            ".hilited-box, .hilited-clue, .hilited-clue.done-clue": "color",
                            ".btn-default, .btn-primary, .hilited-box\x3e.cluenum-in-box, .clue-bar": "color",
                            ".clue-nav-arrow": "fill",
                            ".clue-bar-text\x3e.separator": "border-color",
                            ".clue-bar-text": "border-left-color"
                        }
                    }]
                }]
            }, {
                "section-title": "Grid",
                modules: [{
                    "subsection-title": "Font",
                    widgets: [{
                        type: "font-family",
                        id: "box-font-selector",
                        css: {
                            ".box, .modal-title, .key, .cluenum-in-box": "font-family"
                        }
                    }, {
                        type: "radio-options",
                        id: "box-font-weight",
                        css: {
                            ".box, .cluenum-in-box": "font-weight"
                        },
                        options: [{
                            text: "Normal",
                            value: "400",
                            style: "font-weight: 400"
                        }, {
                            text: "Bold",
                            value: "700",
                            style: "font-weight: 700"
                        }],
                        initVal: "400"
                    }]
                }, {
                    "subsection-title": "Empty Box",
                    widgets: [{
                        type: "color",
                        id: "empty-box-color",
                        css: {
                            ".empty": "background-color"
                        }
                    }]
                }, {
                    "subsection-title": "Lines",
                    widgets: [{
                        type: "color",
                        id: "lines-color",
                        css: {
                            ".box.box-left-edge, .box.box-right-edge, .box.box-top-edge, .box.box-bottom-edge": "border-color"
                        }
                    }, {
                        type: "radio-options",
                        id: "line-thickness",
                        css: {
                            ".box.box-left-edge, .box.box-right-edge, .box.box-top-edge, .box.box-bottom-edge": "border-width"
                        },
                        options: [{
                            text: "Thin",
                            value: "1px",
                            style: "font-weight: 300"
                        }, {
                            text: "Thick",
                            value: "2px",
                            style: "font-weight: 600"
                        }],
                        initVal: "1px"
                    }]
                }]
            }, {
                "section-title": "Mobile Keyboard",
                modules: [{
                    "subsection-title": "Keyboard",
                    widgets: [{
                        type: "mobile-keyboard",
                        id: "mobile-keyboard"
                    }]
                }]
            }, {
                "section-title": "Print",
                modules: [{
                    "subsection-title": "Masthead Preview",
                    widgets: [{
                        type: "media-preview",
                        id: "print-masthead-preview",
                        classes: "masthead",
                        width: "full",
                        style: {
                            "max-height": "60px",
                            "max-width": "360px",
                            "min-width": "80px"
                        }
                    }],
                    style: {
                        "border-bottom": "none",
                        "padding-bottom": "0",
                        "padding-top": "20px"
                    }
                }, {
                    "subsection-title": "Masthead",
                    widgets: [{
                        type: "image-url",
                        id: "print-masthead-url",
                        initVal: "",
                        css: {
                            ".masthead": "content",
                            ".masthead::before": "content"
                        },
                        placeHolder: "Paste URL to image here",
                        "value-padding": 'url("\x3cVALUE\x3e")',
                        alternateOptions: {
                            content: 'url("http://staging.amuselabs.com/pm-media/broken-image.svg")'
                        }
                    }]
                }, {
                    "subsection-title": "Grid",
                    widgets: [{
                        type: "radio-options",
                        id: "grid-position",
                        configAttribute: "grid-position",
                        options: [{
                            text: "Left side",
                            value: "left"
                        }, {
                            text: "Right side",
                            value: "right"
                        }],
                        isPlayerConfig: !0,
                        initVal: "right"
                    }]
                }, {
                    "subsection-title": "Title \x3cbr\x3e(w.r.t. grid)",
                    widgets: [{
                        type: "radio-options",
                        id: "title-position",
                        configAttribute: "title-position",
                        options: [{
                            text: "Above",
                            value: "above"
                        }, {
                            text: "Below",
                            value: "below"
                        }, {
                            text: "Beside",
                            value: "beside"
                        }],
                        isPlayerConfig: !0,
                        initVal: "above"
                    }]
                }]
            }]
        }
    }();
    var fa = function() {
        function c(a, b, c) {
            var d;
            if (!a)
                return c;
            try {
                var e = a.css(b);
                e && (d = parseFloat(e.split(" ")[0].replace("px", "")))
            } catch (zc) {
                m("Error occurred while reading property. property: " + b + " element: " + a)
            }
            return "undefined" !== typeof d ? d : c
        }
        function d(d) {
            O = a("body");
            ia = a(".grid-area", b);
            wa = a(".crossword-and-footer");
            X = a(".crossword-footer");
            Y = a(".clues-area", b);
            M = a(".clues-scroll", b);
            R = a(".navbar", b);
            S = a(".clue-bar", b);
            T = a(".top-message", b);
            ba = a(".top-problems", b);
            a(".clue", b).first();
            a(".clueNum", b).first();
            a(".clueDiv", b).first();
            da = a(".aclues", b);
            aa = a(".dclues", b);
            Z = da.find(".clue-list");
            ca = aa.find(".clue-list");
            "CROSSWORD" === f.puzzleType ? V = {
                boxSize: c(a(".box"), "width", 35),
                letterFontSize: c(a(".letter-in-box"), "font-size", 25),
                letterTop: c(a(".letter-in-box"), "top", 10),
                clueNumFontSize: c(a(".cluenum-in-box"), "font-size", 10),
                clueNumLeft: c(a(".cluenum-in-box"), "left", 1),
                clueNumTop: c(a(".cluenum-in-box"), "top", 1),
                boxIconWidth: c(a(".box-icon"), "width", 22),
                boxIconTop: c(a(".box-icon"), "top", 10),
                boxIconLeft: c(a(".box-icon"), "left", 10)
            } : "SUDOKU" === f.puzzleType && (V = {
                boxSize: c(a(".box"), "width", 35),
                letterFontSize: c(a(".letter-in-box"), "font-size", 25),
                letterTop: c(a(".letter-in-box"), "top", 10)
            });
            u = V;
            H = function() {
                var c, e = a(".clues-area", b).css("column-width");
                e && (c = parseInt(e.split(" ")[0].replace("px", "")));
                0 === c && (c = 220,
                d && (c = window.runningOnTablet ? 160 : 170));
                return c
            }();
            K = function() {
                var c = a(".clues-area", b).css("column-gap");
                return c ? parseInt(c.split(" ")[0].replace("px", "")) : window.runningOnTablet ? 5 : 20
            }();
            v = function() {
                var a = ia.css("margin");
                return a ? 2 * a.split(" ")[0].replace("px", "") : window.runningOnMobile ? 2 : 10
            }();
            x = function() {
                var a = Y.css("margin");
                return a ? 2 * a.split(" ")[0].replace("px", "") : window.runningOnMobile ? 0 : 8
            }();
            C = function() {
                var a = M.css("margin");
                return a ? 2 * a.split(" ")[0].replace("px", "") : 10
            }();
            y = function() {
                var a = Y.css("padding");
                return a ? 2 * a.split(" ")[0].replace("px", "") : 0
            }();
            J = y + x + C + D;
            ua() ? k.playSettings.useFullWidthInFrame ? a(".main-body", b).css("text-align", "left") : a(".main-body", b).css("text-align", "center") : a(".main-body", b).css("text-align", "center");
            ha = !0
        }
        function e() {
            var a = {};
            a.height = "innerHeight"in window ? window.innerHeight : document.documentElement.offsetHeight;
            a.width = "innerWidth"in window ? window.innerWidth : document.documentElement.offsetWidth;
            a.width = window.runningOnMobile ? screen.width : a.width;
            Db() && !ua() && screen.height === a.height && (a.height = Math.min(screen.height, document.documentElement.clientHeight));
            ua() && (window.runningOnMobile ? z.heightReduction && (a.height = window.screen.availHeight) : a.height = k.playSettings.heightIsControllable ? window.screen.availHeight : Math.min(window.screen.availHeight, a.height),
            window.runningOnTablet && (a.height = k.playSettings.heightIsControllable ? screen.height - 48 : Math.min(screen.height - 48, a.height)));
            window.runningOnMobile && z.heightReduction && (a.height -= z.heightReduction);
            return a
        }
        function g(a) {
            return a && a.is(":visible") ? a.outerHeight() : 0
        }
        function h() {
            var c = b.offset().top + g(R);
            qa || (c += g(S));
            a(".main-body", b).css("top", c + "px")
        }
        function l() {
            if (!(1 > a(".clue-bar", b).length)) {
                var c = g(R)
                  , d = a(".clue-bar", b);
                d.css("top", c + "px");
                if (qa && !ua()) {
                    c = e();
                    var f = a(".keyboard");
                    d.css("position", "absolute").css("top", c.height - d.outerHeight() - f.outerHeight());
                    f.css("position", "absolute").css("top", c.height - f.outerHeight())
                }
                xb(d, a(".clue-bar-text", b), nb)
            }
        }
        function r() {
            var a = g(R) + g(S);
            T.css("top", a + "px");
            ba.css("top", a + "px");
            fb && fb.css("top", a + "px")
        }
        function q(c) {
            c.preventDefault();
            a(".clues-below-message", b).remove();
            ea = !0;
            return !1
        }
        function p(c) {
            c.preventDefault();
            a(".btn.cb-btn", b).parent().remove();
            return !1
        }
        var v, x, y, C, D = 3, E, H, K, J, V, u, P = 21 <= f.h && 21 <= f.w ? 28 : 80, B = window.runningOnMobile ? 16 : 24, O, R, S, T, ba, fb, ia, wa, X, M, Z, ca, da, aa, Y, ha = !1, ea = !1, Q = {
            bodyScroll: !1,
            vertCluesScroll: !1,
            vertGridScroll: !1,
            splitCluesScroll: !1
        };
        return {
            layoutCrossword: function(c, g) {
                n && n.nResizes++;
                ha || d();
                665 >= a(window).width() ? a(".navbar-brand", b).hide() : a(".navbar-brand", b).show();
                var q = e();
                l();
                var p = q.height - a(".grid-area").offset().top - 15;
                qa && (p = q.height - a(".navbar").outerHeight() - a(".clue-bar").outerHeight() - a(".keyboard").outerHeight());
                f.hideClueColumns && a(".clues-scroll").hide();
                var A = f.h
                  , t = f.w
                  , u = q.width;
                q = q.height;
                var y = k.playSettings.bottomAlignGridAndClues
                  , U = H + K;
                Q.vertCluesScroll = !1;
                Q.vertGridScroll = !1;
                ia.css({
                    "overflow-y": "hidden"
                });
                wa.css("height", "");
                wa.css("width", "");
                w("Layout Puzzle screenwidth:" + u + ", screenHeight:" + q + ", maxGridHeight:" + p);
                var z = c;
                if (0 > z) {
                    var G = Math.max(P, B);
                    var L = (G + 1) * t + v;
                    L > u && (L = u - v);
                    var F = u - L;
                    z = Math.floor(F / U)
                }
                for (; 0 <= z && !(0 === z ? (F = u,
                L = u - v) : (F = z * (H + K) + J,
                L = u - F - v - 20),
                G = Math.floor((L - t) / t),
                G >= B); z--)
                    0 === z && (G = B,
                    L = (G + 1) * t + v);
                var N = !1
                  , I = 0 < X.length ? X.outerHeight(!0) : 0
                  , R = wa.outerHeight(!0) - a(".crossword").outerHeight(!0) - X.outerHeight(!0);
                (G + 1) * A + v + I + R > p && (G = Math.floor((p - A - I - R) / A),
                G = Math.max(G, B),
                N = !0);
                G > P && (G = P,
                N = !0);
                N && (L = (G + 1) * t + v,
                F = u - L - v - J,
                z = F / U,
                0 < c && (z = Math.min(c, z)),
                z = Math.floor(z));
                F -= J;
                fa.applyBoxStyle(G);
                ia.width(L);
                h();
                A = c = 5;
                qa && (A = c = 0,
                wa.css("padding-top", c + "px"),
                wa.css("padding-bottom", A + "px"),
                p < ia.height() ? (ia.css({
                    position: "static"
                }),
                ia.css("overflow-y", "scroll").height(p),
                Q.vertGridScroll = !0) : (A = p - wa.height() - v - D,
                c = Math.floor(A / 2),
                c = Math.min(c, 20),
                A -= c,
                0 > A && (A = 0),
                ua() && 20 < A && (A = 20)));
                wa.css("padding-top", c + "px");
                wa.css("padding-bottom", A + "px");
                M.css("padding-top", c + "px");
                ia.width() > u && (ia.width(),
                wa.width(ia.width()),
                ia.css({
                    position: "relative"
                }),
                ia.css("overflow-x", "scroll").width(u),
                Q.horizGridScroll = !0);
                !f.hideClueColumns && qa && 1 <= z && M.show();
                a(".clues-scroll", b).is(":visible") && 0 != M.length && (Q.bodyScroll = !1,
                Q.splitCluesScroll = !1,
                Z.css({
                    height: "",
                    position: "",
                    "overflow-x": "",
                    "overflow-y": ""
                }),
                ca.css({
                    height: "",
                    position: "",
                    "overflow-x": "",
                    "overflow-y": ""
                }),
                M.css({
                    height: "",
                    "overflow-y": "hidden"
                }),
                O.css("overflow-y", "auto"),
                fb && fb.remove(),
                1 <= z ? (t = (z + 1) * H,
                L = F - t,
                L >= z * K && L < (z + 1) * K + x && (F = t + z * K - 1),
                0 < z && Y.css("column-count", z),
                Y.width(F),
                F = Y,
                F.css("display", "none"),
                F.get(0),
                F.css("display", ""),
                F = Math.max(a(".aclues").outerHeight() + a(".dclues").outerHeight(), M.height()),
                c = p - c - 2 * C,
                w("desiredCluesScrollHeight:" + c),
                ia.offset().top + ia.get(0).scrollHeight < q ? (ia.height(""),
                ia.css("overflow", "hidden")) : (ia.css({
                    left: ""
                }),
                M.css({
                    left: ""
                }),
                ia.css("overflow-y", "scroll").height(p),
                Q.vertGridScroll = !0),
                y ? F > ia.height() && (M.css("overflow-y", "scroll").height(a(".crossword-and-footer", b).outerHeight() - D - A),
                Q.vertCluesScroll = !0,
                c = M.height(),
                w("Bottom align grid and clues, so new desiredCluesScrollHeight set to:" + M.height())) : F > Math.floor(q - M.offset().top) ? (M.css("overflow-y", "scroll").height(c),
                O.css("overflow-y", "hidden"),
                Q.vertCluesScroll = !0) : M.css("overflow-y", "hidden"),
                g && 0 < z && 2 >= z && (g = z,
                q = c,
                w("Split clues: prevCluesScrollHeight:" + F + ", desiredClueHeight:" + q),
                p = a(".clue-header", ".aclues").outerHeight(),
                p = 1 === g ? 2 * p : p,
                1 === g ? (aa.css("-webkit-column-break-before", "auto"),
                aa.css("break-before", "auto"),
                p = (M.height() - p - 21) / 2) : (aa.css("-webkit-column-break-before", "always"),
                aa.css("break-before", "always"),
                p = M.height() - p - 21),
                0 >= p && m("Clue list height is less than 0. listHeight: " + p + " cols_on_side:" + g + " current_clues_height:" + F + " desired_height:" + q),
                F > q && 0 < p && (Z.height(p).css("overflow-x", "hidden").css("overflow-y", "auto").css("position", "relative"),
                ca.height(p).css("overflow-x", "hidden").css("overflow-y", "auto").css("position", "relative"),
                a(".clue-header", b).css("position", "relative"),
                M.css("overflow-y", "hidden"),
                Q.splitCluesScroll = !0,
                Q.vertCluesScroll = !1,
                Q.bodyScroll = !1)),
                ua() && k.playSettings.useFullWidthInFrame && a(".main-body").css("text-align", "left")) : qa ? a(".clues-scroll").hide() : (window.runningOnTablet || window.isPreview || ua() || ea || (a(E).insertAfter(S),
                g = S.offset().top + S.outerHeight(),
                a(".clues-below-message").css("top", g + "px"),
                ea = !1,
                fb = a(".clues-below-message", b)),
                g = a(window).width() - J,
                Y.width(g).css({
                    position: ""
                }),
                ia.css({
                    position: "",
                    left: "",
                    top: "0px"
                }).css("overflow-y", "hidden"),
                ia.height(""),
                Y.css("column-count", "auto"),
                M.css({
                    position: "",
                    left: "",
                    top: "0px",
                    height: "auto"
                }).css("overflow-y", "hidden"),
                a(".main-body").css("text-align", "center"),
                h()),
                r(),
                Q.splitCluesScroll ? 0 < a(".clueDiv", ".dclues\x3e.glue-hdr-first-clue").length && (g = a(".clue-list", ".dclues"),
                a(".clueDiv", ".dclues\x3e.glue-hdr-first-clue").prependTo(g)) : 0 === a(".clueDiv", ".dclues.glue-hdr-first-clue").length && a(".clueDiv", ".dclues").first().appendTo(".dclues\x3e.glue-hdr-first-clue"),
                b.prop("scrollWidth") > u && m("The crossword width is greater than the available screen width. module: Layout crossword_width: " + b.prop("scrollWidth") + " screen_width: " + u));
                "SUDOKU" === f.puzzleType && za.layoutPencilBoxes()
            },
            init: d,
            scrollingDirectives: Q,
            applyBoxStyle: function(c) {
                var d = (c - V.boxSize) / V.boxSize, e;
                for (e in V)
                    V.hasOwnProperty(e) && (u[e] = V[e] + V[e] * d);
                d = a(".box", b);
                for (e = 0; e < d.length; e++) {
                    var f = a(d[e]);
                    f.css("width", c + "px").css("height", c + "px");
                    a(".letter-in-box", f).css("font-size", u.letterFontSize + "px").css("top", u.letterTop + "px");
                    var g = a(".letter-in-box", f).text();
                    Ra(f, g);
                    a(".box-icon", f).css("width", u.boxIconWidth + "px").css("left", u.boxIconLeft + "px").css("top", u.boxIconTop + "px");
                    u.clueNumFontSize && u.clueNumFontSize && u.clueNumTop && u.clueNumLeft && a(".cluenum-in-box", f).css("font-size", u.clueNumFontSize + "px").css("top", u.clueNumTop + "px").css("left", u.clueNumLeft + "px")
                }
                a("input.dummy", b).css("width", c + "px").css("height", c + "px").css("font-size", u.letterFontSize + "px")
            },
            adjustGridPlusCluesTop: h,
            adjustTopMessagesTop: r,
            adjustClueBarTop: l,
            getCurrentBoxStyle: function() {
                return u
            },
            setupEvents: function() {
                E = '\x3cdiv class\x3d"clues-below-message"\x3e\x3cdiv class\x3d"btn cb-btn"\x3e\x3cimg height\x3d"25px" src\x3d"images/cancel_black_btn.svg"/\x3e\x3c/div\x3e' + t.clues_below + "\x3c/div\x3e";
                a(document).on("click", ".clues-below-message\x3e.btn.cb-btn", I(q, F + " -\x3e Clues below grid message", "Clues below grid message dismiss"));
                a(document).on("click", ".btn.cb-btn", W(p, "dismiss_message_handler --\x3e close clues below grid message"))
            },
            getViewPort: e
        }
    }(k.playSettings.useCompactLayout);
    var wc = function() {
        return {
            move_current_box: function(c) {
                if (ma && ma.isInGridEditingMode())
                    return ma.moveBoxAfterLetterEntry(c);
                var d = !1;
                if (!r)
                    return d;
                if (ta) {
                    if (0 < c)
                        Sb();
                    else if (0 > c) {
                        d = La;
                        c = Ia + La * a("input.dummy", b).val().trim().length;
                        var e = a("input.dummy", b).position().left
                          , f = E[q.x][q.y].position().left;
                        e < f && (d = Math.min(d, f - e),
                        d = e + d,
                        a("input.dummy", b).css("left", d + "px"));
                        c = Math.max(c - La, Ia);
                        a("input.dummy").width(c)
                    }
                    return !0
                }
                r.acrossNotDown ? q.x + c >= r.x && q.x + c < r.x + na(r) && (q.x += c,
                q.word_offset += c,
                d = !0) : q.y + c >= r.y && q.y + c < r.y + na(r) && (q.y += c,
                q.word_offset += c,
                d = !0);
                d && (S.move_input_to_box(q.x, q.y),
                Ub(),
                null != X && X.isInitiated && X.sendCurrentPosition());
                return d
            },
            move_input_to_box: function(c, d) {
                Ka() && null !== q ? (d = da[0][q.word_offset],
                c = Math.ceil(d.position().left),
                d = Math.ceil(d.position().top),
                a(".popup-dummy", b).css("left", c + "px"),
                a(".popup-dummy", b).css("top", d + "px")) : Rb(c, d)
            },
            letter_entered: function(a, b, c, d, e, g) {
                if (!window.isPreview || ma && ma.isEnteringGridLetters()) {
                    Da || K.resume();
                    var h = E[a][b];
                    f.current_state[a][b] = c;
                    Ra(h, f.current_state[a][b]);
                    if (ma && ma.isEnteringGridLetters())
                        Hb(f.current_state, a, b) || la.forceBoxAsLetter(a, b);
                    else {
                        if (k.playSettings.usePopup) {
                            var l = da[0][r.acrossNotDown ? a - r.x : b - r.y];
                            Ra(l, c);
                            k.playSettings.errorCheckMode && la.showErrorStateForBox(a, b, !0)
                        } else
                            k.playSettings.errorCheckMode && la.showErrorStateForBox(a, b, !1);
                        var q = n.score
                          , p = f.boxToPlacedWordsIdxs[a][b];
                        if (p)
                            for (var t = 0; t < p.length; t++)
                                sb(p[t], !0);
                        q !== n.score && jb();
                        if (J.isGridFull() && c === ra || !J.isGridFull() && c !== ra)
                            n.playState = J.PLAY_STATE.SOME_FILLED;
                        n.nLettersEntered++;
                        Z[a][b] === J.BOX_STATE.CHECKED && (Z[a][b] = J.BOX_STATE.CHECKED_EDITED,
                        h.removeClass("wrongletter"),
                        k.playSettings.usePopup && l.removeClass("wrongletter"));
                        c !== ra && Z[a][b] !== J.BOX_STATE.REVEALED && (Z[a][b] = d ? J.BOX_STATE.FILLED : J.BOX_STATE.PENCIL_FILLED);
                        c === ra && Z[a][b] !== J.BOX_STATE.REVEALED ? (Z[a][b] = J.BOX_STATE.UNFILLED,
                        null !== r && a === r.x && b === r.y && h.find(".box-icon").show(),
                        h.find(".filled-box-with-background-shape").addClass("box-with-background-shape"),
                        h.find(".filled-box-with-background-shape").removeClass("filled-box-with-background-shape"),
                        h.removeClass("pencil-entry")) : (null !== r && a === r.x && b === r.y && h.find(".box-icon").hide(),
                        h.find(".box-with-background-shape").addClass("filled-box-with-background-shape"),
                        h.find(".box-with-background-shape").removeClass("box-with-background-shape"));
                        null === r || a === r.x && b === r.y || h.find(".box-icon").css("opacity", "0.4");
                        Z[a][b] === J.BOX_STATE.PENCIL_FILLED ? (h.addClass("pencil-entry"),
                        h.attr("title", window.messages.pencil_box_title)) : (h.removeClass("pencil-entry"),
                        h.attr("title", ""));
                        if (!k.playSettings.inContestMode) {
                            a: {
                                for (c = 0; c < f.h; c++)
                                    for (d = 0; d < f.w; d++)
                                        if (f.box[d][c] !== pa && !va(f.box, d, c) && f.current_state[d][c] === ra && f.box[d][c] !== ra) {
                                            c = !1;
                                            break a
                                        }
                                c = !0
                            }
                            c && setTimeout(ka.gridCompletelyFilled, 0)
                        }
                        null != X && X.isInitiated && (null == g ? (g = (new Date).getTime() + X.serverOffset,
                        Y[a][b] && Y[a][b] > g && m("Current timestamp is older than the timestamp in the box x: " + a + " y:" + b + " previous_timestamp:" + Y[a][b] + " current_timestamp:" + g),
                        Y[a][b] = g,
                        pb[a][b] = !0,
                        e && X.sendPlaySnapshot(X.triggeredAction.LETTER_ENTERED)) : (Y[a][b] && Y[a][b] > g && m("Current timestamp is older than the timestamp in the box (entered by other user) x: " + a + " y:" + b + " previous_timestamp:" + Y[a][b] + " current_timestamp:" + g),
                        Y[a][b] = g,
                        pb[a][b] = !1))
                    }
                }
            },
            keypress_handler: function(c) {
                function d(a) {
                    for (var b = 0; b < x.length; b++)
                        if (a === x[b])
                            return !0;
                    return !1
                }
                function e(a) {
                    for (var b = 0; b < A.length; b++)
                        if (a === A[b])
                            return !0;
                    return !1
                }
                function g(a) {
                    for (var b = 0; b < F.length; b++)
                        if (a === F[b])
                            return !0;
                    return !1
                }
                function h(a) {
                    for (var b = 0; b < y.length; b++)
                        if (a === y[b])
                            return !0;
                    return !1
                }
                function l(a) {
                    for (var b = 0; b < z.length; b++)
                        if (a === z[b])
                            return !0;
                    return !1
                }
                function m(a) {
                    for (var b = 0; b < C.length; b++)
                        if (a === C[b])
                            return !0;
                    return !1
                }
                function p(a) {
                    for (var b = 0; b < H.length; b++)
                        if (a === H[b])
                            return !0;
                    return !1
                }
                function t(a) {
                    for (var b = 0; b < J.length; b++)
                        if (a === J[b])
                            return !0;
                    return !1
                }
                function v(a) {
                    if (q) {
                        for (var b = q.x, c = q.y, d = -1; 0 > d; ) {
                            37 === a ? (--b,
                            0 > b && (b = f.w - 1,
                            --c,
                            0 > c && (c = f.h - 1))) : 39 === a ? (b += 1,
                            b === f.w && (c = (c + 1) % f.h,
                            c === f.h ? (--c,
                            --b) : b = 0)) : 38 === a ? (--c,
                            0 > c && (c = f.h - 1,
                            --b,
                            0 > b && (b = f.w - 1))) : 40 === a && (c += 1,
                            c === f.h && (b = (b + 1) % f.w,
                            b === f.w ? (--b,
                            --c) : c = 0));
                            if (f.box[b][c] !== pa && !va(f.box, b, c))
                                if ((d = f.boxToPlacedWordsIdxs[b][c]) && 0 !== d.length) {
                                    var e = d[0];
                                    d = 0 === Aa && f.placedWords[e].acrossNotDown || 1 === Aa && !f.placedWords[e].acrossNotDown || !(1 < d.length) ? e : d[1]
                                } else
                                    d = -1;
                            if (0 === b && 0 === c || b === f.w - 1 && c === f.h - 1 || b === r.x && c === r.y)
                                break
                        }
                        0 <= d && R.select(d, b, c, !!k.playSettings.usePopup, !1, !1)
                    }
                }
                function w(a) {
                    var c = !1;
                    Q = !1;
                    k.playSettings.skipOverFilledLetter && !a ? c = R.selectNextEmptyBox(q.x, q.y) : Q = S.move_current_box(1);
                    c || Q || (E[r.x][r.y].find(".box-icon", b).hide(),
                    a = !1,
                    k.playSettings.skipOverFilledLetter || (a = Ba(ba)),
                    k.playSettings.stayInCurrentWord || !a && !k.playSettings.skipOverFilledLetter ? k.playSettings.skipOverFilledLetter || k.playSettings.jumpBackToFirstBlank && R.selectBox(r.x, r.y) : k.playSettings.usePopup ? setTimeout(function() {
                        R.selectNextWord(!0, k.playSettings.skipOverFilledLetter)
                    }, 1500) : R.selectNextWord(!0, k.playSettings.skipOverFilledLetter))
                }
                var x = [225, 231, 233, 237, 241, 243, 250, 252, 193, 201, 205, 209, 211, 218, 220, 161, 170, 171, 186, 187, 191]
                  , A = [196, 228, 214, 246, 220, 252, 223, 201, 233]
                  , y = [192, 193, 194, 195, 202, 212, 213, 224, 226, 227, 234, 243, 244, 199, 231]
                  , z = [192, 194, 196, 200, 201, 202, 203, 206, 207, 212, 140, 217, 219, 220, 159, 224, 226, 228, 232, 233, 234, 235, 238, 239, 244, 156, 249, 251, 252, 255]
                  , C = "��������������������".split("")
                  , F = [198, 230, 197, 229, 196, 228, 216, 248, 214, 246]
                  , H = [260, 196, 201, 280, 282, 205, 211, 212, 218, 366, 221, 268, 270, 356, 313, 317, 327, 340, 344, 352, 381]
                  , J = "+-#$@\x26*\x3d,:/".split("");
                Na.markUserActivity();
                var u = !0
                  , I = !1;
                if (aa || lb || window.isPreview)
                    u = !1,
                    window.isPreview && ma && ma.isEnteringGridLetters() && (I = !0);
                var B = a(c);
                n.nKeyPresses++;
                if (B.altKey)
                    return !0;
                if (c.ctrlKey)
                    return 83 === c.keyCode ? (a("#info-modal", b).modal("hide"),
                    a("div.clueDiv").eq(0).click()) : 82 === c.keyCode ? ba || 0 === ba ? Fa.word(ba) : ea.say("Please select a word first. Use Control S to select the first word.") : 66 === c.keyCode ? q && (Aa || 0 === Aa) ? Fa.box(q.x, q.y, Aa) : ea.say("Please select a box first. Use Control S to select a box.") : 71 === c.keyCode ? Fa.grid(!0) : 67 === c.keyCode ? ba && a("#check-word-button, #popup-check-word-button", b).click() : 88 === c.keyCode ? q && a("#check-letter-button, #popup-check-letter-button", b).click() : 84 === c.keyCode && (I = K.getTimeElapsedHMSString(),
                    ea.say(I + " elapsed")),
                    !0;
                var O = c.keyCode ? c.keyCode : c.charCode;
                0 === O && c.which && (O = c.which);
                if (null !== q) {
                    B = String.fromCharCode(O).charAt(0);
                    var M = !1
                      , P = f.boxToPlacedWordsIdxs[q.x][q.y];
                    P && (M = 1 < P.length);
                    if (27 === O)
                        R.deselectCurrentWord();
                    else if (9 === O)
                        c.preventDefault(),
                        c.shiftKey ? R.selectPrevWord(!0, k.playSettings.skipOverFilledLetter) : R.selectNextWord(!0, k.playSettings.skipOverFilledLetter);
                    else if (16 !== O && 17 !== O && 18 !== O && 91 !== O && 9 !== O && 20 !== O)
                        if (8 === O || 46 === O) {
                            n.nBackspacePresses++;
                            if (ta)
                                B = k.playSettings.usePopup ? a("input.popup-dummy", b).val() : a("input.dummy", b).val(),
                                (u || I) && S.letter_entered(q.x, q.y, B.trim(), !0, !0, null);
                            else if (u || I)
                                if (S.letter_entered(q.x, q.y, ra, !0, !0, null),
                                ma && ma.isEnteringGridLetters())
                                    return !1;
                            8 === O && S.move_current_box(-1);
                            c.preventDefault()
                        } else if (32 !== O || k.playSettings.useSpaceToChangeDirection)
                            if (13 === O)
                                ta ? (Va(),
                                null != r && (u = Ba(ba),
                                w(u))) : (c.preventDefault(),
                                c.shiftKey ? R.selectPrevWord(!0, k.playSettings.skipOverFilledLetter) : R.selectNextWord(!0, k.playSettings.skipOverFilledLetter)),
                                c.preventDefault();
                            else {
                                if (!ta)
                                    if (37 === O) {
                                        if (r.acrossNotDown) {
                                            var Q = S.move_current_box(-1);
                                            n.nArrowPresses++
                                        }
                                    } else
                                        39 === O ? r.acrossNotDown && (Q = S.move_current_box(1),
                                        n.nArrowPresses++) : 38 === O && 0 === c.charCode ? r.acrossNotDown || (Q = S.move_current_box(-1),
                                        n.nArrowPresses++) : 40 !== O || r.acrossNotDown || (Q = S.move_current_box(1),
                                        n.nArrowPresses++);
                                P = 37 <= O && 40 >= O && 0 === c.charCode;
                                var T = 32 === O && k.playSettings.useSpaceToChangeDirection;
                                c = M && (37 === O || 39 === O) && !r.acrossNotDown || M && (38 === O && 0 === c.charCode || 40 === O) && r.acrossNotDown || M && k.playSettings.useSpaceToChangeDirection && 32 === O;
                                if (190 === O || c)
                                    return n.nDotPresses++,
                                    R.selectCurrentCrossingWord(),
                                    !1;
                                if (P || T)
                                    P && !Q && v(O);
                                else if (/[0-9a-zA-Z]/.test(B) || d(O) || p(O) || l(O) || e(O) || h(O) || m(B) || t(B) || g(O))
                                    if (ta && (B = k.playSettings.usePopup ? a("input.popup-dummy", b).val().trim() : a("input.dummy", b).val().trim()),
                                    u || I) {
                                        u = !1;
                                        null != r && (u = Ba(ba));
                                        I ? S.letter_entered(q.x, q.y, B, !0, !0, null) : S.letter_entered(q.x, q.y, B, mb, !0, null);
                                        if (I) {
                                            S.move_current_box(1);
                                            return
                                        }
                                        if (null != r) {
                                            if (ta) {
                                                S.move_current_box(1);
                                                return
                                            }
                                            w(u)
                                        }
                                    }
                            }
                        else
                            (u || I) && S.letter_entered(q.x, q.y, ra, !0, !0, null),
                            S.move_current_box(1),
                            c.preventDefault()
                }
                null !== r && la.hilite_boxes_for_current_word();
                return !1
            },
            checkGridAndShowErrors: function() {
                for (var a = 0; a < f.placedWords.length; a++) {
                    a: {
                        var b = Ya(f.placedWords[a]);
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            if (!Ja(d.x, d.y) || f.box[d.x][d.y] === ra) {
                                b = !1;
                                break a
                            }
                        }
                        b = !0
                    }
                    b || (0 === la.showErrorStateForWord(f.placedWords[a], !1) ? Za(a, !1) : Ba(a) && Za(a, !0))
                }
            }
        }
    }();
    var za;
    w("Start of _f function");
    try {
        var S = "CROSSWORD" === f.puzzleType ? wc : za;
        "SUDOKU" === f.puzzleType ? za.setup() : "CROSSWORD" === f.puzzleType && a(window).load(function() {
            P && !P.mediaCluesPresent || f.hideClueColumns || H(function() {
                fa.layoutCrossword(k.playSettings.maxCols, k.playSettings.splitClues)
            }, "adjust layout")
        });
        !window.runningOnTablet || 768 <= window.screen.width || 90 !== Math.abs(window.orientation) ? gc() : Mb();
        a(window).on("orientationchange", function() {
            !window.runningOnTablet || 768 <= window.screen.width || 90 !== Math.abs(window.orientation) ? (a.trim(a(".crossword").html()) || a.trim(a(".clue-list").html()) || gc(),
            a(".orientation-change").hide(),
            b.show()) : Mb()
        });
        window.initiateSocialPlay ? (X = new $b(n.initiatorUserId,n.userId,n.playId),
        X.init(!1, null)) : a(".nav-social-play-invite").show()
    } catch (A) {
        m("Exception initializing puzzle Exception:" + A)
    }
};
$(function() {
    window.DEBUG_PM && $.post("log", {
        message: "Document Ready entered"
    });
    try {
        _f(jQuery, JSON.parse(UTF8ArrToStr(bda(window.rawc))), window.rawp ? JSON.parse(UTF8ArrToStr(bda(window.rawp))) : null, window.raws ? JSON.parse(UTF8ArrToStr(bda(window.raws))) : null, window.rawConf ? JSON.parse(UTF8ArrToStr(bda(window.rawConf))) : null, window.rawSps ? JSON.parse(UTF8ArrToStr(bda(window.rawSps))) : null, $(".pm-xword-body"))
    } catch (a) {
        $.post("log", {
            message: "Error calling _f: " + a
        })
    }
});