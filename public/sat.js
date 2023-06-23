(() => {
  var e = {
      757: (e, t, n) => {
        e.exports = n(666);
      },
      595: (e, t, n) => {
        'use strict';
        n.r(t),
          n.d(t, {
            componentsToDebugString: () => Te,
            default: () => Ge,
            getFullscreenElement: () => _,
            getProConfidenceScore: () => _e,
            getScreenFrame: () => W,
            hashComponents: () => Le,
            isAndroid: () => T,
            isChromium: () => P,
            isDesktopSafari: () => M,
            isEdgeHTML: () => A,
            isGecko: () => O,
            isTrident: () => C,
            isWebKit: () => E,
            load: () => De,
            loadSources: () => S,
            murmurX64Hash128: () => Fe,
            prepareForSources: () => Ie,
            sources: () => Ee,
          });
        var r = function () {
          return (r =
            Object.assign ||
            function (e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
              return e;
            }).apply(this, arguments);
        };
        function o(e, t, n, r) {
          return new (n || (n = Promise))(function (o, a) {
            function i(e) {
              try {
                s(r.next(e));
              } catch (e) {
                a(e);
              }
            }
            function c(e) {
              try {
                s(r.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function s(e) {
              var t;
              e.done
                ? o(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(i, c);
            }
            s((r = r.apply(e, t || [])).next());
          });
        }
        function a(e, t) {
          var n,
            r,
            o,
            a,
            i = {
              label: 0,
              sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: c(0), throw: c(1), return: c(2) }),
            'function' == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function c(a) {
            return function (c) {
              return (function (a) {
                if (n) throw new TypeError('Generator is already executing.');
                for (; i; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (o =
                          2 & a[0]
                            ? r.return
                            : a[0]
                            ? r.throw || ((o = r.return) && o.call(r), 0)
                            : r.next) &&
                        !(o = o.call(r, a[1])).done)
                    )
                      return o;
                    switch (((r = 0), o && (a = [2 & a[0], o.value]), a[0])) {
                      case 0:
                      case 1:
                        o = a;
                        break;
                      case 4:
                        return i.label++, { value: a[1], done: !1 };
                      case 5:
                        i.label++, (r = a[1]), (a = [0]);
                        continue;
                      case 7:
                        (a = i.ops.pop()), i.trys.pop();
                        continue;
                      default:
                        if (
                          !(
                            (o = (o = i.trys).length > 0 && o[o.length - 1]) ||
                            (6 !== a[0] && 2 !== a[0])
                          )
                        ) {
                          i = 0;
                          continue;
                        }
                        if (
                          3 === a[0] &&
                          (!o || (a[1] > o[0] && a[1] < o[3]))
                        ) {
                          i.label = a[1];
                          break;
                        }
                        if (6 === a[0] && i.label < o[1]) {
                          (i.label = o[1]), (o = a);
                          break;
                        }
                        if (o && i.label < o[2]) {
                          (i.label = o[2]), i.ops.push(a);
                          break;
                        }
                        o[2] && i.ops.pop(), i.trys.pop();
                        continue;
                    }
                    a = t.call(e, i);
                  } catch (e) {
                    (a = [6, e]), (r = 0);
                  } finally {
                    n = o = 0;
                  }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
              })([a, c]);
            };
          }
        }
        function i() {
          for (var e = 0, t = 0, n = arguments.length; t < n; t++)
            e += arguments[t].length;
          var r = Array(e),
            o = 0;
          for (t = 0; t < n; t++)
            for (var a = arguments[t], i = 0, c = a.length; i < c; i++, o++)
              r[o] = a[i];
          return r;
        }
        function c(e, t) {
          return new Promise(function (n) {
            return setTimeout(n, e, t);
          });
        }
        function s(e, t) {
          try {
            var n = e();
            (r = n) && 'function' == typeof r.then
              ? n.then(
                  function (e) {
                    return t(!0, e);
                  },
                  function (e) {
                    return t(!1, e);
                  }
                )
              : t(!0, n);
          } catch (e) {
            t(!1, e);
          }
          var r;
        }
        function u(e, t, n) {
          return (
            void 0 === n && (n = 16),
            o(this, void 0, void 0, function () {
              var r, o, i;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    (r = Date.now()), (o = 0), (a.label = 1);
                  case 1:
                    return o < e.length
                      ? (t(e[o], o),
                        (i = Date.now()) >= r + n
                          ? ((r = i), [4, c(0)])
                          : [3, 3])
                      : [3, 4];
                  case 2:
                    a.sent(), (a.label = 3);
                  case 3:
                    return ++o, [3, 1];
                  case 4:
                    return [2];
                }
              });
            })
          );
        }
        function l(e, t) {
          (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
            (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
          var n = [0, 0, 0, 0];
          return (
            (n[3] += e[3] + t[3]),
            (n[2] += n[3] >>> 16),
            (n[3] &= 65535),
            (n[2] += e[2] + t[2]),
            (n[1] += n[2] >>> 16),
            (n[2] &= 65535),
            (n[1] += e[1] + t[1]),
            (n[0] += n[1] >>> 16),
            (n[1] &= 65535),
            (n[0] += e[0] + t[0]),
            (n[0] &= 65535),
            [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
          );
        }
        function d(e, t) {
          (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
            (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
          var n = [0, 0, 0, 0];
          return (
            (n[3] += e[3] * t[3]),
            (n[2] += n[3] >>> 16),
            (n[3] &= 65535),
            (n[2] += e[2] * t[3]),
            (n[1] += n[2] >>> 16),
            (n[2] &= 65535),
            (n[2] += e[3] * t[2]),
            (n[1] += n[2] >>> 16),
            (n[2] &= 65535),
            (n[1] += e[1] * t[3]),
            (n[0] += n[1] >>> 16),
            (n[1] &= 65535),
            (n[1] += e[2] * t[2]),
            (n[0] += n[1] >>> 16),
            (n[1] &= 65535),
            (n[1] += e[3] * t[1]),
            (n[0] += n[1] >>> 16),
            (n[1] &= 65535),
            (n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0]),
            (n[0] &= 65535),
            [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
          );
        }
        function f(e, t) {
          return 32 == (t %= 64)
            ? [e[1], e[0]]
            : t < 32
            ? [
                (e[0] << t) | (e[1] >>> (32 - t)),
                (e[1] << t) | (e[0] >>> (32 - t)),
              ]
            : ((t -= 32),
              [
                (e[1] << t) | (e[0] >>> (32 - t)),
                (e[0] << t) | (e[1] >>> (32 - t)),
              ]);
        }
        function h(e, t) {
          return 0 == (t %= 64)
            ? e
            : t < 32
            ? [(e[0] << t) | (e[1] >>> (32 - t)), e[1] << t]
            : [e[1] << (t - 32), 0];
        }
        function p(e, t) {
          return [e[0] ^ t[0], e[1] ^ t[1]];
        }
        function v(e) {
          return (
            (e = p(e, [0, e[0] >>> 1])),
            (e = p((e = d(e, [4283543511, 3981806797])), [0, e[0] >>> 1])),
            p((e = d(e, [3301882366, 444984403])), [0, e[0] >>> 1])
          );
        }
        function m(e, t) {
          t = t || 0;
          var n,
            r = (e = e || '').length % 16,
            o = e.length - r,
            a = [0, t],
            i = [0, t],
            c = [0, 0],
            s = [0, 0],
            u = [2277735313, 289559509],
            m = [1291169091, 658871167];
          for (n = 0; n < o; n += 16)
            (c = [
              (255 & e.charCodeAt(n + 4)) |
                ((255 & e.charCodeAt(n + 5)) << 8) |
                ((255 & e.charCodeAt(n + 6)) << 16) |
                ((255 & e.charCodeAt(n + 7)) << 24),
              (255 & e.charCodeAt(n)) |
                ((255 & e.charCodeAt(n + 1)) << 8) |
                ((255 & e.charCodeAt(n + 2)) << 16) |
                ((255 & e.charCodeAt(n + 3)) << 24),
            ]),
              (s = [
                (255 & e.charCodeAt(n + 12)) |
                  ((255 & e.charCodeAt(n + 13)) << 8) |
                  ((255 & e.charCodeAt(n + 14)) << 16) |
                  ((255 & e.charCodeAt(n + 15)) << 24),
                (255 & e.charCodeAt(n + 8)) |
                  ((255 & e.charCodeAt(n + 9)) << 8) |
                  ((255 & e.charCodeAt(n + 10)) << 16) |
                  ((255 & e.charCodeAt(n + 11)) << 24),
              ]),
              (c = f((c = d(c, u)), 31)),
              (a = l((a = f((a = p(a, (c = d(c, m)))), 27)), i)),
              (a = l(d(a, [0, 5]), [0, 1390208809])),
              (s = f((s = d(s, m)), 33)),
              (i = l((i = f((i = p(i, (s = d(s, u)))), 31)), a)),
              (i = l(d(i, [0, 5]), [0, 944331445]));
          switch (((c = [0, 0]), (s = [0, 0]), r)) {
            case 15:
              s = p(s, h([0, e.charCodeAt(n + 14)], 48));
            case 14:
              s = p(s, h([0, e.charCodeAt(n + 13)], 40));
            case 13:
              s = p(s, h([0, e.charCodeAt(n + 12)], 32));
            case 12:
              s = p(s, h([0, e.charCodeAt(n + 11)], 24));
            case 11:
              s = p(s, h([0, e.charCodeAt(n + 10)], 16));
            case 10:
              s = p(s, h([0, e.charCodeAt(n + 9)], 8));
            case 9:
              (s = d((s = p(s, [0, e.charCodeAt(n + 8)])), m)),
                (i = p(i, (s = d((s = f(s, 33)), u))));
            case 8:
              c = p(c, h([0, e.charCodeAt(n + 7)], 56));
            case 7:
              c = p(c, h([0, e.charCodeAt(n + 6)], 48));
            case 6:
              c = p(c, h([0, e.charCodeAt(n + 5)], 40));
            case 5:
              c = p(c, h([0, e.charCodeAt(n + 4)], 32));
            case 4:
              c = p(c, h([0, e.charCodeAt(n + 3)], 24));
            case 3:
              c = p(c, h([0, e.charCodeAt(n + 2)], 16));
            case 2:
              c = p(c, h([0, e.charCodeAt(n + 1)], 8));
            case 1:
              (c = d((c = p(c, [0, e.charCodeAt(n)])), u)),
                (a = p(a, (c = d((c = f(c, 31)), m))));
          }
          return (
            (a = l((a = p(a, [0, e.length])), (i = p(i, [0, e.length])))),
            (i = l(i, a)),
            (a = l((a = v(a)), (i = v(i)))),
            (i = l(i, a)),
            ('00000000' + (a[0] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (a[1] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (i[0] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (i[1] >>> 0).toString(16)).slice(-8)
          );
        }
        function g(e) {
          return parseInt(e);
        }
        function y(e) {
          return parseFloat(e);
        }
        function b(e, t) {
          return 'number' == typeof e && isNaN(e) ? t : e;
        }
        function w(e) {
          return e.reduce(function (e, t) {
            return e + (t ? 1 : 0);
          }, 0);
        }
        function k(e, t) {
          if ((void 0 === t && (t = 1), Math.abs(t) >= 1))
            return Math.round(e / t) * t;
          var n = 1 / t;
          return Math.round(e * n) / n;
        }
        function x(e) {
          return e && 'object' == typeof e && 'message' in e
            ? e
            : { message: e };
        }
        function S(e, t, n) {
          var r = Object.keys(e).filter(function (e) {
              return !(function (e, t) {
                for (var n = 0, r = e.length; n < r; ++n)
                  if (e[n] === t) return !0;
                return !1;
              })(n, e);
            }),
            i = Array(r.length);
          return (
            u(r, function (n, r) {
              i[r] = (function (e, t) {
                var n = function (e) {
                    return 'function' != typeof e;
                  },
                  r = new Promise(function (r) {
                    var o = Date.now();
                    s(e.bind(null, t), function () {
                      for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                      var a = Date.now() - o;
                      if (!e[0])
                        return r(function () {
                          return { error: x(e[1]), duration: a };
                        });
                      var i = e[1];
                      if (n(i))
                        return r(function () {
                          return { value: i, duration: a };
                        });
                      r(function () {
                        return new Promise(function (e) {
                          var t = Date.now();
                          s(i, function () {
                            for (var n = [], r = 0; r < arguments.length; r++)
                              n[r] = arguments[r];
                            var o = a + Date.now() - t;
                            if (!n[0])
                              return e({ error: x(n[1]), duration: o });
                            e({ value: n[1], duration: o });
                          });
                        });
                      });
                    });
                  });
                return function () {
                  return r.then(function (e) {
                    return e();
                  });
                };
              })(e[n], t);
            }),
            function () {
              return o(this, void 0, void 0, function () {
                var e, t, n, o, s, l;
                return a(this, function (d) {
                  switch (d.label) {
                    case 0:
                      for (e = {}, t = 0, n = r; t < n.length; t++)
                        (o = n[t]), (e[o] = void 0);
                      (s = Array(r.length)),
                        (l = function () {
                          var t;
                          return a(this, function (n) {
                            switch (n.label) {
                              case 0:
                                return (
                                  (t = !0),
                                  [
                                    4,
                                    u(r, function (n, r) {
                                      s[r] ||
                                        (i[r]
                                          ? (s[r] = i[r]().then(function (t) {
                                              return (e[n] = t);
                                            }))
                                          : (t = !1));
                                    }),
                                  ]
                                );
                              case 1:
                                return n.sent(), t ? [2, 'break'] : [4, c(1)];
                              case 2:
                                return n.sent(), [2];
                            }
                          });
                        }),
                        (d.label = 1);
                    case 1:
                      return [5, l()];
                    case 2:
                      if ('break' === d.sent()) return [3, 4];
                      d.label = 3;
                    case 3:
                      return [3, 1];
                    case 4:
                      return [4, Promise.all(s)];
                    case 5:
                      return d.sent(), [2, e];
                  }
                });
              });
            }
          );
        }
        function C() {
          var e = window,
            t = navigator;
          return (
            w([
              'MSCSSMatrix' in e,
              'msSetImmediate' in e,
              'msIndexedDB' in e,
              'msMaxTouchPoints' in t,
              'msPointerEnabled' in t,
            ]) >= 4
          );
        }
        function A() {
          var e = window,
            t = navigator;
          return (
            w([
              'msWriteProfilerMark' in e,
              'MSStream' in e,
              'msLaunchUri' in t,
              'msSaveBlob' in t,
            ]) >= 3 && !C()
          );
        }
        function P() {
          var e = window,
            t = navigator;
          return (
            w([
              'webkitPersistentStorage' in t,
              'webkitTemporaryStorage' in t,
              0 === t.vendor.indexOf('Google'),
              'webkitResolveLocalFileSystemURL' in e,
              'BatteryManager' in e,
              'webkitMediaStream' in e,
              'webkitSpeechGrammar' in e,
            ]) >= 5
          );
        }
        function E() {
          var e = window,
            t = navigator;
          return (
            w([
              'ApplePayError' in e,
              'CSSPrimitiveValue' in e,
              'Counter' in e,
              0 === t.vendor.indexOf('Apple'),
              'getStorageUpdates' in t,
              'WebKitMediaKeys' in e,
            ]) >= 4
          );
        }
        function M() {
          var e = window;
          return (
            w([
              'safari' in e,
              !('DeviceMotionEvent' in e),
              !('ongestureend' in e),
              !('standalone' in navigator),
            ]) >= 3
          );
        }
        function O() {
          var e,
            t,
            n = window;
          return (
            w([
              'buildID' in navigator,
              'MozAppearance' in
                (null !==
                  (t =
                    null === (e = document.documentElement) || void 0 === e
                      ? void 0
                      : e.style) && void 0 !== t
                  ? t
                  : {}),
              'MediaRecorderErrorEvent' in n,
              'mozInnerScreenX' in n,
              'CSSMozDocumentRule' in n,
              'CanvasCaptureMediaStream' in n,
            ]) >= 4
          );
        }
        function _() {
          var e = document;
          return (
            e.fullscreenElement ||
            e.msFullscreenElement ||
            e.mozFullScreenElement ||
            e.webkitFullscreenElement ||
            null
          );
        }
        function T() {
          var e = P(),
            t = O();
          if (!e && !t) return !1;
          var n = window;
          return (
            w([
              'onorientationchange' in n,
              'orientation' in n,
              e && 'SharedWorker' in n,
              t && /android/i.test(navigator.appVersion),
            ]) >= 2
          );
        }
        function L(e) {
          var t = new Error(e);
          return (t.name = e), t;
        }
        function I(e, t, n) {
          var r, i, s;
          return (
            void 0 === n && (n = 50),
            o(this, void 0, void 0, function () {
              var o, u;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    (o = document), (a.label = 1);
                  case 1:
                    return o.body ? [3, 3] : [4, c(n)];
                  case 2:
                    return a.sent(), [3, 1];
                  case 3:
                    (u = o.createElement('iframe')), (a.label = 4);
                  case 4:
                    return (
                      a.trys.push([4, , 10, 11]),
                      [
                        4,
                        new Promise(function (e, n) {
                          (u.onload = e), (u.onerror = n);
                          var r = u.style;
                          r.setProperty('display', 'block', 'important'),
                            (r.position = 'absolute'),
                            (r.top = '0'),
                            (r.left = '0'),
                            (r.visibility = 'hidden'),
                            t && 'srcdoc' in u
                              ? (u.srcdoc = t)
                              : (u.src = 'about:blank'),
                            o.body.appendChild(u);
                          var a = function () {
                            var t, n;
                            'complete' ===
                            (null ===
                              (n =
                                null === (t = u.contentWindow) || void 0 === t
                                  ? void 0
                                  : t.document) || void 0 === n
                              ? void 0
                              : n.readyState)
                              ? e()
                              : setTimeout(a, 10);
                          };
                          a();
                        }),
                      ]
                    );
                  case 5:
                    a.sent(), (a.label = 6);
                  case 6:
                    return (
                      null ===
                        (i =
                          null === (r = u.contentWindow) || void 0 === r
                            ? void 0
                            : r.document) || void 0 === i
                        ? void 0
                        : i.body
                    )
                      ? [3, 8]
                      : [4, c(n)];
                  case 7:
                    return a.sent(), [3, 6];
                  case 8:
                    return [4, e(u, u.contentWindow)];
                  case 9:
                    return [2, a.sent()];
                  case 10:
                    return (
                      null === (s = u.parentNode) ||
                        void 0 === s ||
                        s.removeChild(u),
                      [7]
                    );
                  case 11:
                    return [2];
                }
              });
            })
          );
        }
        function j(e) {
          for (
            var t = (function (e) {
                for (
                  var t,
                    n,
                    r = "Unexpected syntax '" + e + "'",
                    o = /^\s*([a-z-]*)(.*)$/i.exec(e),
                    a = o[1] || void 0,
                    i = {},
                    c = /([.:#][\w-]+|\[.+?\])/gi,
                    s = function (e, t) {
                      (i[e] = i[e] || []), i[e].push(t);
                    };
                  ;

                ) {
                  var u = c.exec(o[2]);
                  if (!u) break;
                  var l = u[0];
                  switch (l[0]) {
                    case '.':
                      s('class', l.slice(1));
                      break;
                    case '#':
                      s('id', l.slice(1));
                      break;
                    case '[':
                      var d =
                        /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(
                          l
                        );
                      if (!d) throw new Error(r);
                      s(
                        d[1],
                        null !==
                          (n =
                            null !== (t = d[4]) && void 0 !== t ? t : d[5]) &&
                          void 0 !== n
                          ? n
                          : ''
                      );
                      break;
                    default:
                      throw new Error(r);
                  }
                }
                return [a, i];
              })(e),
              n = t[0],
              r = t[1],
              o = document.createElement(null != n ? n : 'div'),
              a = 0,
              i = Object.keys(r);
            a < i.length;
            a++
          ) {
            var c = i[a];
            o.setAttribute(c, r[c].join(' '));
          }
          return o;
        }
        Object.create, Object.create;
        var D,
          F,
          G = ['monospace', 'sans-serif', 'serif'],
          B = [
            'sans-serif-thin',
            'ARNO PRO',
            'Agency FB',
            'Arabic Typesetting',
            'Arial Unicode MS',
            'AvantGarde Bk BT',
            'BankGothic Md BT',
            'Batang',
            'Bitstream Vera Sans Mono',
            'Calibri',
            'Century',
            'Century Gothic',
            'Clarendon',
            'EUROSTILE',
            'Franklin Gothic',
            'Futura Bk BT',
            'Futura Md BT',
            'GOTHAM',
            'Gill Sans',
            'HELV',
            'Haettenschweiler',
            'Helvetica Neue',
            'Humanst521 BT',
            'Leelawadee',
            'Letter Gothic',
            'Levenim MT',
            'Lucida Bright',
            'Lucida Sans',
            'Menlo',
            'MS Mincho',
            'MS Outlook',
            'MS Reference Specialty',
            'MS UI Gothic',
            'MT Extra',
            'MYRIAD PRO',
            'Marlett',
            'Meiryo UI',
            'Microsoft Uighur',
            'Minion Pro',
            'Monotype Corsiva',
            'PMingLiU',
            'Pristina',
            'SCRIPTINA',
            'Segoe UI Light',
            'Serifa',
            'SimHei',
            'Small Fonts',
            'Staccato222 BT',
            'TRAJAN PRO',
            'Univers CE 55 Medium',
            'Vrinda',
            'ZWAdobeF',
          ];
        function z(e) {
          return (
            e.rect(0, 0, 10, 10),
            e.rect(2, 2, 6, 6),
            !e.isPointInPath(5, 5, 'evenodd')
          );
        }
        function R(e, t) {
          (e.width = 240),
            (e.height = 60),
            (t.textBaseline = 'alphabetic'),
            (t.fillStyle = '#f60'),
            t.fillRect(100, 1, 62, 20),
            (t.fillStyle = '#069'),
            (t.font = '11pt "Times New Roman"');
          var n = 'Cwm fjordbank gly ' + String.fromCharCode(55357, 56835);
          return (
            t.fillText(n, 2, 15),
            (t.fillStyle = 'rgba(102, 204, 0, 0.2)'),
            (t.font = '18pt Arial'),
            t.fillText(n, 4, 45),
            U(e)
          );
        }
        function N(e, t) {
          (e.width = 122),
            (e.height = 110),
            (t.globalCompositeOperation = 'multiply');
          for (
            var n = 0,
              r = [
                ['#f2f', 40, 40],
                ['#2ff', 80, 40],
                ['#ff2', 60, 80],
              ];
            n < r.length;
            n++
          ) {
            var o = r[n],
              a = o[0],
              i = o[1],
              c = o[2];
            (t.fillStyle = a),
              t.beginPath(),
              t.arc(i, c, 40, 0, 2 * Math.PI, !0),
              t.closePath(),
              t.fill();
          }
          return (
            (t.fillStyle = '#f9c'),
            t.arc(60, 60, 60, 0, 2 * Math.PI, !0),
            t.arc(60, 60, 20, 0, 2 * Math.PI, !0),
            t.fill('evenodd'),
            U(e)
          );
        }
        function U(e) {
          return e.toDataURL();
        }
        function W() {
          var e = this;
          return (
            (function () {
              if (void 0 === F) {
                var e = function () {
                  var t = V();
                  q(t) ? (F = setTimeout(e, 2500)) : ((D = t), (F = void 0));
                };
                e();
              }
            })(),
            function () {
              return o(e, void 0, void 0, function () {
                var e;
                return a(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return q((e = V()))
                        ? D
                          ? [2, i(D)]
                          : _()
                          ? [
                              4,
                              ((n = document),
                              (
                                n.exitFullscreen ||
                                n.msExitFullscreen ||
                                n.mozCancelFullScreen ||
                                n.webkitExitFullscreen
                              ).call(n)),
                            ]
                          : [3, 2]
                        : [3, 2];
                    case 1:
                      t.sent(), (e = V()), (t.label = 2);
                    case 2:
                      return q(e) || (D = e), [2, e];
                  }
                  var n;
                });
              });
            }
          );
        }
        function V() {
          var e = screen;
          return [
            b(y(e.availTop), null),
            b(y(e.width) - y(e.availWidth) - b(y(e.availLeft), 0), null),
            b(y(e.height) - y(e.availHeight) - b(y(e.availTop), 0), null),
            b(y(e.availLeft), null),
          ];
        }
        function q(e) {
          for (var t = 0; t < 4; ++t) if (e[t]) return !1;
          return !0;
        }
        var H = {
            abpIndo: [
              '#Iklan-Melayang',
              '#Kolom-Iklan-728',
              '#SidebarIklan-wrapper',
              'a[title="7naga poker" i]',
              '[title="ALIENBOLA" i]',
            ],
            abpvn: [
              '#quangcaomb',
              '.i-said-no-thing-can-stop-me-warning.dark',
              '.quangcao',
              '[href^="https://r88.vn/"]',
              '[href^="https://zbet.vn/"]',
            ],
            adBlockFinland: [
              '.mainostila',
              '.sponsorit',
              '.ylamainos',
              'a[href*="/clickthrgh.asp?"]',
              'a[href^="https://app.readpeak.com/ads"]',
            ],
            adBlockPersian: [
              '#navbar_notice_50',
              'a[href^="http://g1.v.fwmrm.net/ad/"]',
              '.kadr',
              'TABLE[width="140px"]',
              '#divAgahi',
            ],
            adBlockWarningRemoval: [
              '#adblock_message',
              '.adblockInfo',
              '.deadblocker-header-bar',
              '.no-ad-reminder',
              '#AdBlockDialog',
            ],
            adGuardAnnoyances: [
              'amp-embed[type="zen"]',
              '.hs-sosyal',
              '#cookieconsentdiv',
              'div[class^="app_gdpr"]',
              '.as-oil',
            ],
            adGuardBase: [
              '#ad-fullbanner2-billboard-outer',
              '.stky-ad-footer',
              '.BetterJsPopOverlay',
              '#ad_300X250',
              '#bannerfloat22',
            ],
            adGuardChinese: [
              '#piao_div_0[style*="width:140px;"]',
              'a[href*=".ttz5.cn"]',
              'a[href*=".yabovip2027.com/"]',
              '.tm3all2h4b',
              '#duilian_left',
            ],
            adGuardFrench: [
              '#anAdScGp300x25',
              'a[href*=".kfiopkln.com/"]',
              'a[href^="https://jsecoin.com/o/?"]',
              'a[href^="https://www.clickadu.com/?"]',
              '.bandeauClosePub',
            ],
            adGuardGerman: [
              '.banneritemwerbung_head_1',
              '.boxstartwerbung',
              '.werbung3',
              'a[href^="http://www.eis.de/index.phtml?refid="]',
              'a[href^="https://www.tipico.com/?affiliateId="]',
            ],
            adGuardJapanese: [
              '#kauli_yad_1',
              '.adArticleSidetile',
              '.ads_entrymore',
              'a[href^="http://ad2.trafficgate.net/"]',
              'a[href^="http://www.rssad.jp/"]',
            ],
            adGuardMobile: [
              'amp-auto-ads',
              '#mgid_iframe',
              '.amp_ad',
              'amp-sticky-ad',
              '.plugin-blogroll',
            ],
            adGuardRussian: [
              'a[href^="https://ya-distrib.ru/r/"]',
              'a[href^="https://ad.letmeads.com/"]',
              '.reclama',
              'div[id^="smi2adblock"]',
              'div[id^="AdFox_banner_"]',
            ],
            adGuardSocial: [
              'a[href^="//www.stumbleupon.com/submit?url="]',
              'a[href^="//telegram.me/share/url?"]',
              '.etsy-tweet',
              '#inlineShare',
              '.popup-social',
            ],
            adGuardSpanishPortuguese: [
              '#barraPublicidade',
              '#Publicidade',
              '#publiEspecial',
              '#queTooltip',
              '[href^="http://ads.glispa.com/"]',
            ],
            adGuardTrackingProtection: [
              'amp-embed[type="taboola"]',
              '#qoo-counter',
              'a[href^="http://click.hotlog.ru/"]',
              'a[href^="http://hitcounter.ru/top/stat.php"]',
              'a[href^="http://top.mail.ru/jump"]',
            ],
            adGuardTurkish: [
              '#backkapat',
              '#reklami',
              'a[href^="http://adserv.ontek.com.tr/"]',
              'a[href^="http://izlenzi.com/campaign/"]',
              'a[href^="http://www.installads.net/"]',
            ],
            bulgarian: [
              'td#freenet_table_ads',
              '#newAd',
              '#ea_intext_div',
              '.lapni-pop-over',
              '#xenium_hot_offers',
            ],
            easyList: [
              '#adlabelheader',
              '#anAdScGame300x250',
              '#adTakeOverLeft',
              '#ad_LargeRec01',
              '#adundergame',
            ],
            easyListChina: [
              'a[href*=".wensixuetang.com/"]',
              'A[href*="/hth107.com/"]',
              '.appguide-wrap[onclick*="bcebos.com"]',
              '.frontpageAdvM',
              '#taotaole',
            ],
            easyListCookie: [
              '#Button_Cookie',
              '#CWCookie',
              '#CookieCon',
              '#DGPR',
              '#PnlCookie',
            ],
            easyListCzechSlovak: [
              '#onlajny-stickers',
              '#reklamni-box',
              '.reklama-megaboard',
              '.sklik',
              '[id^="sklikReklama"]',
            ],
            easyListDutch: [
              '#advertentie',
              '#vipAdmarktBannerBlock',
              '.adstekst',
              'a[href^="http://adserver.webads.nl/adclick/"]',
              '#semilo-lrectangle',
            ],
            easyListGermany: [
              '#nativendo-hometop',
              'a[href^="http://www.kontakt-vermittler.de/?wm="]',
              '#gwerbung',
              'a[href^="https://marketing.net.brillen.de/"]',
              '.werbenbox',
            ],
            easyListItaly: [
              '.box_adv_annunci',
              '.sb-box-pubbliredazionale',
              'a[href^="http://affiliazioniads.snai.it/"]',
              'a[href^="https://adserver.html.it/"]',
              'a[href^="https://affiliazioniads.snai.it/"]',
            ],
            easyListLithuania: [
              '.reklamos_tarpas',
              '.reklamos_nuorodos',
              'img[alt="Reklaminis skydelis"]',
              'img[alt="Dedikuoti.lt serveriai"]',
              'img[alt="Hostingas Serveriai.lt"]',
            ],
            estonian: ['A[href*="http://pay4results24.eu"]'],
            fanboyAnnoyances: [
              '#feedback-tab',
              '#taboola-below-article',
              '.feedburnerFeedBlock',
              '.widget-feedburner-counter',
              '[title="Subscribe to our blog"]',
            ],
            fanboyAntiFacebook: ['.util-bar-module-firefly-visible'],
            fanboyEnhancedTrackers: [
              '.open.pushModal',
              '#issuem-leaky-paywall-articles-zero-remaining-nag',
              'div[style*="box-shadow: rgb(136, 136, 136) 0px 0px 12px; color: "]',
              'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
              '.BlockNag__Card',
            ],
            fanboySocial: [
              '.td-tags-and-social-wrapper-box',
              '.twitterContainer',
              '.youtube-social',
              'a[title^="Like us on Facebook"]',
              'img[alt^="Share on Digg"]',
            ],
            frellwitSwedish: [
              'a[href*="casinopro.se"][target="_blank"]',
              'a[href*="doktor-se.onelink.me"]',
              'article.category-samarbete',
              'div.holidAds',
              'ul.adsmodern',
            ],
            greekAdBlock: [
              'A[href*="adman.otenet.gr/click?"]',
              'A[href*="http://axiabanners.exodus.gr/"]',
              'A[href*="http://interactive.forthnet.gr/click?"]',
              'DIV.agores300',
              'TABLE.advright',
            ],
            hungarian: [
              'A[href*="ad.eval.hu"]',
              'A[href*="ad.netmedia.hu"]',
              'A[href*="daserver.ultraweb.hu"]',
              '#cemp_doboz',
              '.optimonk-iframe-container',
            ],
            iDontCareAboutCookies: [
              '.alert-info[data-block-track*="CookieNotice"]',
              '.ModuleTemplateCookieIndicator',
              '.o--cookies--container',
              '.cookie-msg-info-container',
              '#cookies-policy-sticky',
            ],
            icelandicAbp: ['A[href^="/framework/resources/forms/ads.aspx"]'],
            latvian: [
              'a[href="http://www.salidzini.lv/"][style="display: block; width: 120px; height: 40px; overflow: hidden; position: relative;"]',
              'a[href="http://www.salidzini.lv/"][style="display: block; width: 88px; height: 31px; overflow: hidden; position: relative;"]',
            ],
            listKr: [
              'a[href*="//kingtoon.slnk.kr"]',
              'a[href*="//playdsb.com/kr"]',
              'div.logly-lift-adz',
              'div[data-widget_id="ml6EJ074"]',
              'ins.daum_ddn_area',
            ],
            listeAr: [
              '.geminiLB1Ad',
              '.right-and-left-sponsers',
              'a[href*=".aflam.info"]',
              'a[href*="booraq.org"]',
              'a[href*="dubizzle.com/ar/?utm_source="]',
            ],
            listeFr: [
              'a[href^="http://promo.vador.com/"]',
              '#adcontainer_recherche',
              'a[href*="weborama.fr/fcgi-bin/"]',
              '.site-pub-interstitiel',
              'div[id^="crt-"][data-criteo-id]',
            ],
            officialPolish: [
              '#ceneo-placeholder-ceneo-12',
              '[href^="https://aff.sendhub.pl/"]',
              'a[href^="http://advmanager.techfun.pl/redirect/"]',
              'a[href^="http://www.trizer.pl/?utm_source"]',
              'div#skapiec_ad',
            ],
            ro: [
              'a[href^="//afftrk.altex.ro/Counter/Click"]',
              'a[href^="/magazin/"]',
              'a[href^="https://blackfridaysales.ro/trk/shop/"]',
              'a[href^="https://event.2performant.com/events/click"]',
              'a[href^="https://l.profitshare.ro/"]',
            ],
            ruAd: [
              'a[href*="//febrare.ru/"]',
              'a[href*="//utimg.ru/"]',
              'a[href*="://chikidiki.ru"]',
              '#pgeldiz',
              '.yandex-rtb-block',
            ],
            thaiAds: [
              'a[href*=macau-uta-popup]',
              '#ads-google-middle_rectangle-group',
              '.ads300s',
              '.bumq',
              '.img-kosana',
            ],
            webAnnoyancesUltralist: [
              '#mod-social-share-2',
              '#social-tools',
              '.ctpl-fullbanner',
              '.zergnet-recommend',
              '.yt.btn-link.btn-md.btn',
            ],
          },
          J = Object.keys(H);
        function $(e) {
          var t;
          return o(this, void 0, void 0, function () {
            var n, r, o, i, s, u, l;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  for (
                    n = document,
                      r = n.createElement('div'),
                      o = new Array(e.length),
                      i = {},
                      K(r),
                      l = 0;
                    l < e.length;
                    ++l
                  )
                    (s = j(e[l])),
                      K((u = n.createElement('div'))),
                      u.appendChild(s),
                      r.appendChild(u),
                      (o[l] = s);
                  a.label = 1;
                case 1:
                  return n.body ? [3, 3] : [4, c(50)];
                case 2:
                  return a.sent(), [3, 1];
                case 3:
                  n.body.appendChild(r);
                  try {
                    for (l = 0; l < e.length; ++l)
                      o[l].offsetParent || (i[e[l]] = !0);
                  } finally {
                    null === (t = r.parentNode) ||
                      void 0 === t ||
                      t.removeChild(r);
                  }
                  return [2, i];
              }
            });
          });
        }
        function K(e) {
          e.style.setProperty('display', 'block', 'important');
        }
        function Y(e) {
          return matchMedia('(inverted-colors: ' + e + ')').matches;
        }
        function X(e) {
          return matchMedia('(forced-colors: ' + e + ')').matches;
        }
        function Z(e) {
          return matchMedia('(prefers-contrast: ' + e + ')').matches;
        }
        function Q(e) {
          return matchMedia('(prefers-reduced-motion: ' + e + ')').matches;
        }
        function ee(e) {
          return matchMedia('(dynamic-range: ' + e + ')').matches;
        }
        var te = Math,
          ne = function () {
            return 0;
          },
          re = te.acos || ne,
          oe = te.acosh || ne,
          ae = te.asin || ne,
          ie = te.asinh || ne,
          ce = te.atanh || ne,
          se = te.atan || ne,
          ue = te.sin || ne,
          le = te.sinh || ne,
          de = te.cos || ne,
          fe = te.cosh || ne,
          he = te.tan || ne,
          pe = te.tanh || ne,
          ve = te.exp || ne,
          me = te.expm1 || ne,
          ge = te.log1p || ne,
          ye = function (e) {
            return te.pow(te.PI, e);
          },
          be = function (e) {
            return te.log(e + te.sqrt(e * e + 1));
          },
          we = function (e) {
            return te.log((1 + e) / (1 - e)) / 2;
          },
          ke = function (e) {
            return te.exp(e) - 1 / te.exp(e) / 2;
          },
          xe = function (e) {
            return (te.exp(e) + 1 / te.exp(e)) / 2;
          },
          Se = function (e) {
            return te.exp(e) - 1;
          },
          Ce = function (e) {
            return (te.exp(2 * e) - 1) / (te.exp(2 * e) + 1);
          },
          Ae = function (e) {
            return te.log(1 + e);
          },
          Pe = {
            default: [],
            apple: [{ font: '-apple-system-body' }],
            serif: [{ fontFamily: 'serif' }],
            sans: [{ fontFamily: 'sans-serif' }],
            mono: [{ fontFamily: 'monospace' }],
            min: [{ fontSize: '1px' }],
            system: [{ fontFamily: 'system-ui' }],
          },
          Ee = {
            fonts: function () {
              return I(function (e, t) {
                var n = t.document,
                  r = n.body;
                r.style.fontSize = '48px';
                var o = n.createElement('div'),
                  a = {},
                  i = {},
                  c = function (e) {
                    var t = n.createElement('span'),
                      r = t.style;
                    return (
                      (r.position = 'absolute'),
                      (r.top = '0'),
                      (r.left = '0'),
                      (r.fontFamily = e),
                      (t.textContent = 'mmMwWLliI0O&1'),
                      o.appendChild(t),
                      t
                    );
                  },
                  s = G.map(c),
                  u = (function () {
                    for (
                      var e = {},
                        t = function (t) {
                          e[t] = G.map(function (e) {
                            return (function (e, t) {
                              return c("'" + e + "'," + t);
                            })(t, e);
                          });
                        },
                        n = 0,
                        r = B;
                      n < r.length;
                      n++
                    )
                      t(r[n]);
                    return e;
                  })();
                r.appendChild(o);
                for (var l = 0; l < G.length; l++)
                  (a[G[l]] = s[l].offsetWidth), (i[G[l]] = s[l].offsetHeight);
                return B.filter(function (e) {
                  return (
                    (t = u[e]),
                    G.some(function (e, n) {
                      return (
                        t[n].offsetWidth !== a[e] || t[n].offsetHeight !== i[e]
                      );
                    })
                  );
                  var t;
                });
              });
            },
            domBlockers: function (e) {
              var t = (void 0 === e ? {} : e).debug;
              return o(this, void 0, void 0, function () {
                var e, n, r;
                return a(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return E() || T()
                        ? [
                            4,
                            $(
                              (r = []).concat.apply(
                                r,
                                J.map(function (e) {
                                  return H[e];
                                })
                              )
                            ),
                          ]
                        : [2, void 0];
                    case 1:
                      return (
                        (e = o.sent()),
                        t &&
                          (function (e) {
                            for (
                              var t = 'DOM blockers debug:\n```', n = 0, r = J;
                              n < r.length;
                              n++
                            ) {
                              var o = r[n];
                              t += '\n' + o + ':';
                              for (var a = 0, i = H[o]; a < i.length; a++) {
                                var c = i[a];
                                t += '\n  ' + c + ' ' + (e[c] ? '🚫' : '➡️');
                              }
                            }
                            console.log(t + '\n```');
                          })(e),
                        (n = J.filter(function (t) {
                          var n = H[t];
                          return (
                            w(
                              n.map(function (t) {
                                return e[t];
                              })
                            ) >
                            0.6 * n.length
                          );
                        })).sort(),
                        [2, n]
                      );
                  }
                });
              });
            },
            fontPreferences: function () {
              return (
                void 0 === e && (e = 4e3),
                I(function (t, n) {
                  var r = n.document,
                    o = r.body,
                    a = o.style;
                  (a.width = e + 'px'),
                    (a.webkitTextSizeAdjust = a.textSizeAdjust = 'none'),
                    P()
                      ? (o.style.zoom = '' + 1 / n.devicePixelRatio)
                      : E() && (o.style.zoom = 'reset');
                  var c = r.createElement('div');
                  return (
                    (c.textContent = i(Array((e / 20) << 0))
                      .map(function () {
                        return 'word';
                      })
                      .join(' ')),
                    o.appendChild(c),
                    (function (e, t) {
                      for (
                        var n = {}, r = {}, o = 0, a = Object.keys(Pe);
                        o < a.length;
                        o++
                      ) {
                        var i = a[o],
                          c = Pe[i],
                          s = c[0],
                          u = void 0 === s ? {} : s,
                          l = c[1],
                          d = void 0 === l ? 'mmMwWLliI0fiflO&1' : l,
                          f = e.createElement('span');
                        (f.textContent = d), (f.style.whiteSpace = 'nowrap');
                        for (var h = 0, p = Object.keys(u); h < p.length; h++) {
                          var v = p[h],
                            m = u[v];
                          void 0 !== m && (f.style[v] = m);
                        }
                        (n[i] = f),
                          t.appendChild(e.createElement('br')),
                          t.appendChild(f);
                      }
                      for (var g = 0, y = Object.keys(Pe); g < y.length; g++)
                        r[(i = y[g])] = n[i].getBoundingClientRect().width;
                      return r;
                    })(r, o)
                  );
                }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
              );
              var e;
            },
            audio: function () {
              var e = window,
                t = e.OfflineAudioContext || e.webkitOfflineAudioContext;
              if (!t) return -2;
              if (
                E() &&
                !M() &&
                !(function () {
                  var e = window;
                  return (
                    w([
                      'DOMRectList' in e,
                      'RTCPeerConnectionIceEvent' in e,
                      'SVGGeometryElement' in e,
                      'ontransitioncancel' in e,
                    ]) >= 3
                  );
                })()
              )
                return -1;
              var n = new t(1, 5e3, 44100),
                r = n.createOscillator();
              (r.type = 'triangle'), (r.frequency.value = 1e4);
              var o = n.createDynamicsCompressor();
              (o.threshold.value = -50),
                (o.knee.value = 40),
                (o.ratio.value = 12),
                (o.attack.value = 0),
                (o.release.value = 0.25),
                r.connect(o),
                o.connect(n.destination),
                r.start(0);
              var a = (function (e) {
                  var t = function () {};
                  return [
                    new Promise(function (n, r) {
                      var o = !1,
                        a = 0,
                        i = 0;
                      e.oncomplete = function (e) {
                        return n(e.renderedBuffer);
                      };
                      var c = function () {
                          setTimeout(function () {
                            return r(L('timeout'));
                          }, Math.min(500, i + 5e3 - Date.now()));
                        },
                        s = function () {
                          try {
                            switch ((e.startRendering(), e.state)) {
                              case 'running':
                                (i = Date.now()), o && c();
                                break;
                              case 'suspended':
                                document.hidden || a++,
                                  o && a >= 3
                                    ? r(L('suspended'))
                                    : setTimeout(s, 500);
                            }
                          } catch (e) {
                            r(e);
                          }
                        };
                      s(),
                        (t = function () {
                          o || ((o = !0), i > 0 && c());
                        });
                    }),
                    t,
                  ];
                })(n),
                i = a[0],
                c = a[1],
                s = i.then(
                  function (e) {
                    return (function (e) {
                      for (var t = 0, n = 0; n < e.length; ++n)
                        t += Math.abs(e[n]);
                      return t;
                    })(e.getChannelData(0).subarray(4500));
                  },
                  function (e) {
                    if ('timeout' === e.name || 'suspended' === e.name)
                      return -3;
                    throw e;
                  }
                );
              return (
                s.catch(function () {}),
                function () {
                  return c(), s;
                }
              );
            },
            screenFrame: function () {
              var e = this,
                t = W();
              return function () {
                return o(e, void 0, void 0, function () {
                  var e, n;
                  return a(this, function (r) {
                    switch (r.label) {
                      case 0:
                        return [4, t()];
                      case 1:
                        return (
                          (e = r.sent()),
                          [
                            2,
                            [
                              (n = function (e) {
                                return null === e ? null : k(e, 10);
                              })(e[0]),
                              n(e[1]),
                              n(e[2]),
                              n(e[3]),
                            ],
                          ]
                        );
                    }
                  });
                });
              };
            },
            osCpu: function () {
              return navigator.oscpu;
            },
            languages: function () {
              var e,
                t = navigator,
                n = [],
                r =
                  t.language ||
                  t.userLanguage ||
                  t.browserLanguage ||
                  t.systemLanguage;
              if ((void 0 !== r && n.push([r]), Array.isArray(t.languages)))
                (P() &&
                  w([
                    !('MediaSettingsRange' in (e = window)),
                    'RTCEncodedAudioFrame' in e,
                    '' + e.Intl == '[object Intl]',
                    '' + e.Reflect == '[object Reflect]',
                  ]) >= 3) ||
                  n.push(t.languages);
              else if ('string' == typeof t.languages) {
                var o = t.languages;
                o && n.push(o.split(','));
              }
              return n;
            },
            colorDepth: function () {
              return window.screen.colorDepth;
            },
            deviceMemory: function () {
              return b(y(navigator.deviceMemory), void 0);
            },
            screenResolution: function () {
              var e = screen,
                t = function (e) {
                  return b(g(e), null);
                },
                n = [t(e.width), t(e.height)];
              return n.sort().reverse(), n;
            },
            hardwareConcurrency: function () {
              return b(g(navigator.hardwareConcurrency), void 0);
            },
            timezone: function () {
              var e,
                t =
                  null === (e = window.Intl) || void 0 === e
                    ? void 0
                    : e.DateTimeFormat;
              if (t) {
                var n = new t().resolvedOptions().timeZone;
                if (n) return n;
              }
              var r,
                o =
                  ((r = new Date().getFullYear()),
                  -Math.max(
                    y(new Date(r, 0, 1).getTimezoneOffset()),
                    y(new Date(r, 6, 1).getTimezoneOffset())
                  ));
              return 'UTC' + (o >= 0 ? '+' : '') + Math.abs(o);
            },
            sessionStorage: function () {
              try {
                return !!window.sessionStorage;
              } catch (e) {
                return !0;
              }
            },
            localStorage: function () {
              try {
                return !!window.localStorage;
              } catch (e) {
                return !0;
              }
            },
            indexedDB: function () {
              if (!C() && !A())
                try {
                  return !!window.indexedDB;
                } catch (e) {
                  return !0;
                }
            },
            openDatabase: function () {
              return !!window.openDatabase;
            },
            cpuClass: function () {
              return navigator.cpuClass;
            },
            platform: function () {
              var e = navigator.platform;
              return 'MacIntel' === e && E() && !M()
                ? (function () {
                    if ('iPad' === navigator.platform) return !0;
                    var e = screen,
                      t = e.width / e.height;
                    return (
                      w([
                        'MediaSource' in window,
                        !!Element.prototype.webkitRequestFullscreen,
                        t > 2 / 3 && t < 1.5,
                      ]) >= 2
                    );
                  })()
                  ? 'iPad'
                  : 'iPhone'
                : e;
            },
            plugins: function () {
              var e = navigator.plugins;
              if (e) {
                for (var t = [], n = 0; n < e.length; ++n) {
                  var r = e[n];
                  if (r) {
                    for (var o = [], a = 0; a < r.length; ++a) {
                      var i = r[a];
                      o.push({ type: i.type, suffixes: i.suffixes });
                    }
                    t.push({
                      name: r.name,
                      description: r.description,
                      mimeTypes: o,
                    });
                  }
                }
                return t;
              }
            },
            canvas: function () {
              var e = (function () {
                  var e = document.createElement('canvas');
                  return (e.width = 1), (e.height = 1), [e, e.getContext('2d')];
                })(),
                t = e[0],
                n = e[1];
              return (function (e, t) {
                return !(!t || !e.toDataURL);
              })(t, n)
                ? { winding: z(n), geometry: N(t, n), text: R(t, n) }
                : { winding: !1, geometry: '', text: '' };
            },
            touchSupport: function () {
              var e,
                t = navigator,
                n = 0;
              void 0 !== t.maxTouchPoints
                ? (n = g(t.maxTouchPoints))
                : void 0 !== t.msMaxTouchPoints && (n = t.msMaxTouchPoints);
              try {
                document.createEvent('TouchEvent'), (e = !0);
              } catch (t) {
                e = !1;
              }
              return {
                maxTouchPoints: n,
                touchEvent: e,
                touchStart: 'ontouchstart' in window,
              };
            },
            vendor: function () {
              return navigator.vendor || '';
            },
            vendorFlavors: function () {
              for (
                var e = [],
                  t = 0,
                  n = [
                    'chrome',
                    'safari',
                    '__crWeb',
                    '__gCrWeb',
                    'yandex',
                    '__yb',
                    '__ybro',
                    '__firefox__',
                    '__edgeTrackingPreventionStatistics',
                    'webkit',
                    'oprt',
                    'samsungAr',
                    'ucweb',
                    'UCShellJava',
                    'puffinDevice',
                  ];
                t < n.length;
                t++
              ) {
                var r = n[t],
                  o = window[r];
                o && 'object' == typeof o && e.push(r);
              }
              return e.sort();
            },
            cookiesEnabled: function () {
              var e = document;
              try {
                e.cookie = 'cookietest=1; SameSite=Strict;';
                var t = -1 !== e.cookie.indexOf('cookietest=');
                return (
                  (e.cookie =
                    'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT'),
                  t
                );
              } catch (e) {
                return !1;
              }
            },
            colorGamut: function () {
              for (
                var e = 0, t = ['rec2020', 'p3', 'srgb'];
                e < t.length;
                e++
              ) {
                var n = t[e];
                if (matchMedia('(color-gamut: ' + n + ')').matches) return n;
              }
            },
            invertedColors: function () {
              return !!Y('inverted') || (!Y('none') && void 0);
            },
            forcedColors: function () {
              return !!X('active') || (!X('none') && void 0);
            },
            monochrome: function () {
              if (matchMedia('(min-monochrome: 0)').matches) {
                for (var e = 0; e <= 100; ++e)
                  if (matchMedia('(max-monochrome: ' + e + ')').matches)
                    return e;
                throw new Error('Too high value');
              }
            },
            contrast: function () {
              return Z('no-preference')
                ? 0
                : Z('high') || Z('more')
                ? 1
                : Z('low') || Z('less')
                ? -1
                : Z('forced')
                ? 10
                : void 0;
            },
            reducedMotion: function () {
              return !!Q('reduce') || (!Q('no-preference') && void 0);
            },
            hdr: function () {
              return !!ee('high') || (!ee('standard') && void 0);
            },
            math: function () {
              return {
                acos: re(0.12312423423423424),
                acosh: oe(1e308),
                acoshPf: ((e = 1e154), te.log(e + te.sqrt(e * e - 1))),
                asin: ae(0.12312423423423424),
                asinh: ie(1),
                asinhPf: be(1),
                atanh: ce(0.5),
                atanhPf: we(0.5),
                atan: se(0.5),
                sin: ue(-1e300),
                sinh: le(1),
                sinhPf: ke(1),
                cos: de(10.000000000123),
                cosh: fe(1),
                coshPf: xe(1),
                tan: he(-1e300),
                tanh: pe(1),
                tanhPf: Ce(1),
                exp: ve(1),
                expm1: me(1),
                expm1Pf: Se(1),
                log1p: ge(10),
                log1pPf: Ae(10),
                powPI: ye(-100),
              };
              var e;
            },
          };
        function Me(e) {
          if (T()) return 0.4;
          if (E()) return M() ? 0.5 : 0.3;
          var t = e.platform.value || '';
          return /^Win/.test(t) ? 0.6 : /^Mac/.test(t) ? 0.5 : 0.7;
        }
        function Oe(e) {
          return k(0.99 + 0.01 * e, 1e-4);
        }
        function _e() {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          return Oe(Me.apply(void 0, e));
        }
        function Te(e) {
          return JSON.stringify(
            e,
            function (e, t) {
              return t instanceof Error
                ? r(
                    {
                      name: (n = t).name,
                      message: n.message,
                      stack:
                        null === (o = n.stack) || void 0 === o
                          ? void 0
                          : o.split('\n'),
                    },
                    n
                  )
                : t;
              var n, o;
            },
            2
          );
        }
        function Le(e) {
          return m(
            (function (e) {
              for (
                var t = '', n = 0, r = Object.keys(e).sort();
                n < r.length;
                n++
              ) {
                var o = r[n],
                  a = e[o],
                  i = a.error ? 'error' : JSON.stringify(a.value);
                t += (t ? '|' : '') + o.replace(/([:|\\])/g, '\\$1') + ':' + i;
              }
              return t;
            })(e)
          );
        }
        function Ie(e) {
          return (
            void 0 === e && (e = 50),
            (function (e, t) {
              void 0 === t && (t = 1 / 0);
              var n = window.requestIdleCallback;
              return n
                ? new Promise(function (e) {
                    return n.call(
                      window,
                      function () {
                        return e();
                      },
                      { timeout: t }
                    );
                  })
                : c(Math.min(e, t));
            })(e, 2 * e)
          );
        }
        function je(e, t) {
          var n = Date.now();
          return {
            get: function (r) {
              return o(this, void 0, void 0, function () {
                var o, i, c;
                return a(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return (o = Date.now()), [4, e()];
                    case 1:
                      return (
                        (i = a.sent()),
                        (c = (function (e) {
                          var t;
                          return {
                            get visitorId() {
                              return (
                                void 0 === t && (t = Le(this.components)), t
                              );
                            },
                            set visitorId(e) {
                              t = e;
                            },
                            confidence: (function (e) {
                              var t = Me(e),
                                n = Oe(t);
                              return {
                                score: t,
                                comment:
                                  '$ if upgrade to Pro: https://fpjs.dev/pro'.replace(
                                    /\$/g,
                                    '' + n
                                  ),
                              };
                            })(e),
                            components: e,
                            version: '3.3.0',
                          };
                        })(i)),
                        (t || (null == r ? void 0 : r.debug)) &&
                          console.log(
                            'Copy the text below to get the debug data:\n\n```\nversion: ' +
                              c.version +
                              '\nuserAgent: ' +
                              navigator.userAgent +
                              '\ntimeBetweenLoadAndGet: ' +
                              (o - n) +
                              '\nvisitorId: ' +
                              c.visitorId +
                              '\ncomponents: ' +
                              Te(i) +
                              '\n```'
                          ),
                        [2, c]
                      );
                  }
                });
              });
            },
          };
        }
        function De(e) {
          var t = void 0 === e ? {} : e,
            n = t.delayFallback,
            r = t.debug;
          return o(this, void 0, void 0, function () {
            return a(this, function (e) {
              switch (e.label) {
                case 0:
                  return [4, Ie(n)];
                case 1:
                  return e.sent(), [2, je(S(Ee, { debug: r }, []), r)];
              }
            });
          });
        }
        var Fe = m;
        const Ge = {
          load: De,
          hashComponents: Le,
          componentsToDebugString: Te,
        };
      },
      921: (e) => {
        e.exports = {
          percentage: function (e, t) {
            return (e / t) * 100;
          },
          sum: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [];
            return e.reduce(function (e, t) {
              return e + t;
            }, 0);
          },
        };
      },
      666: (e) => {
        var t = (function (e) {
          'use strict';
          var t,
            n = Object.prototype,
            r = n.hasOwnProperty,
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            c = o.toStringTag || '@@toStringTag';
          function s(e, t, n) {
            return (
              Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              e[t]
            );
          }
          try {
            s({}, '');
          } catch (e) {
            s = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function u(e, t, n, r) {
            var o = t && t.prototype instanceof m ? t : m,
              a = Object.create(o.prototype),
              i = new M(r || []);
            return (
              (a._invoke = (function (e, t, n) {
                var r = d;
                return function (o, a) {
                  if (r === h) throw new Error('Generator is already running');
                  if (r === p) {
                    if ('throw' === o) throw a;
                    return _();
                  }
                  for (n.method = o, n.arg = a; ; ) {
                    var i = n.delegate;
                    if (i) {
                      var c = A(i, n);
                      if (c) {
                        if (c === v) continue;
                        return c;
                      }
                    }
                    if ('next' === n.method) n.sent = n._sent = n.arg;
                    else if ('throw' === n.method) {
                      if (r === d) throw ((r = p), n.arg);
                      n.dispatchException(n.arg);
                    } else 'return' === n.method && n.abrupt('return', n.arg);
                    r = h;
                    var s = l(e, t, n);
                    if ('normal' === s.type) {
                      if (((r = n.done ? p : f), s.arg === v)) continue;
                      return { value: s.arg, done: n.done };
                    }
                    'throw' === s.type &&
                      ((r = p), (n.method = 'throw'), (n.arg = s.arg));
                  }
                };
              })(e, n, i)),
              a
            );
          }
          function l(e, t, n) {
            try {
              return { type: 'normal', arg: e.call(t, n) };
            } catch (e) {
              return { type: 'throw', arg: e };
            }
          }
          e.wrap = u;
          var d = 'suspendedStart',
            f = 'suspendedYield',
            h = 'executing',
            p = 'completed',
            v = {};
          function m() {}
          function g() {}
          function y() {}
          var b = {};
          s(b, a, function () {
            return this;
          });
          var w = Object.getPrototypeOf,
            k = w && w(w(O([])));
          k && k !== n && r.call(k, a) && (b = k);
          var x = (y.prototype = m.prototype = Object.create(b));
          function S(e) {
            ['next', 'throw', 'return'].forEach(function (t) {
              s(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function C(e, t) {
            function n(o, a, i, c) {
              var s = l(e[o], e, a);
              if ('throw' !== s.type) {
                var u = s.arg,
                  d = u.value;
                return d && 'object' == typeof d && r.call(d, '__await')
                  ? t.resolve(d.__await).then(
                      function (e) {
                        n('next', e, i, c);
                      },
                      function (e) {
                        n('throw', e, i, c);
                      }
                    )
                  : t.resolve(d).then(
                      function (e) {
                        (u.value = e), i(u);
                      },
                      function (e) {
                        return n('throw', e, i, c);
                      }
                    );
              }
              c(s.arg);
            }
            var o;
            this._invoke = function (e, r) {
              function a() {
                return new t(function (t, o) {
                  n(e, r, t, o);
                });
              }
              return (o = o ? o.then(a, a) : a());
            };
          }
          function A(e, n) {
            var r = e.iterator[n.method];
            if (r === t) {
              if (((n.delegate = null), 'throw' === n.method)) {
                if (
                  e.iterator.return &&
                  ((n.method = 'return'),
                  (n.arg = t),
                  A(e, n),
                  'throw' === n.method)
                )
                  return v;
                (n.method = 'throw'),
                  (n.arg = new TypeError(
                    "The iterator does not provide a 'throw' method"
                  ));
              }
              return v;
            }
            var o = l(r, e.iterator, n.arg);
            if ('throw' === o.type)
              return (
                (n.method = 'throw'), (n.arg = o.arg), (n.delegate = null), v
              );
            var a = o.arg;
            return a
              ? a.done
                ? ((n[e.resultName] = a.value),
                  (n.next = e.nextLoc),
                  'return' !== n.method && ((n.method = 'next'), (n.arg = t)),
                  (n.delegate = null),
                  v)
                : a
              : ((n.method = 'throw'),
                (n.arg = new TypeError('iterator result is not an object')),
                (n.delegate = null),
                v);
          }
          function P(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function E(e) {
            var t = e.completion || {};
            (t.type = 'normal'), delete t.arg, (e.completion = t);
          }
          function M(e) {
            (this.tryEntries = [{ tryLoc: 'root' }]),
              e.forEach(P, this),
              this.reset(!0);
          }
          function O(e) {
            if (e) {
              var n = e[a];
              if (n) return n.call(e);
              if ('function' == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function n() {
                    for (; ++o < e.length; )
                      if (r.call(e, o))
                        return (n.value = e[o]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (i.next = i);
              }
            }
            return { next: _ };
          }
          function _() {
            return { value: t, done: !0 };
          }
          return (
            (g.prototype = y),
            s(x, 'constructor', y),
            s(y, 'constructor', g),
            (g.displayName = s(y, c, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
              var t = 'function' == typeof e && e.constructor;
              return (
                !!t &&
                (t === g || 'GeneratorFunction' === (t.displayName || t.name))
              );
            }),
            (e.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, y)
                  : ((e.__proto__ = y), s(e, c, 'GeneratorFunction')),
                (e.prototype = Object.create(x)),
                e
              );
            }),
            (e.awrap = function (e) {
              return { __await: e };
            }),
            S(C.prototype),
            s(C.prototype, i, function () {
              return this;
            }),
            (e.AsyncIterator = C),
            (e.async = function (t, n, r, o, a) {
              void 0 === a && (a = Promise);
              var i = new C(u(t, n, r, o), a);
              return e.isGeneratorFunction(n)
                ? i
                : i.next().then(function (e) {
                    return e.done ? e.value : i.next();
                  });
            }),
            S(x),
            s(x, c, 'Generator'),
            s(x, a, function () {
              return this;
            }),
            s(x, 'toString', function () {
              return '[object Generator]';
            }),
            (e.keys = function (e) {
              var t = [];
              for (var n in e) t.push(n);
              return (
                t.reverse(),
                function n() {
                  for (; t.length; ) {
                    var r = t.pop();
                    if (r in e) return (n.value = r), (n.done = !1), n;
                  }
                  return (n.done = !0), n;
                }
              );
            }),
            (e.values = O),
            (M.prototype = {
              constructor: M,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = 'next'),
                  (this.arg = t),
                  this.tryEntries.forEach(E),
                  !e)
                )
                  for (var n in this)
                    't' === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ('throw' === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function o(r, o) {
                  return (
                    (c.type = 'throw'),
                    (c.arg = e),
                    (n.next = r),
                    o && ((n.method = 'next'), (n.arg = t)),
                    !!o
                  );
                }
                for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                  var i = this.tryEntries[a],
                    c = i.completion;
                  if ('root' === i.tryLoc) return o('end');
                  if (i.tryLoc <= this.prev) {
                    var s = r.call(i, 'catchLoc'),
                      u = r.call(i, 'finallyLoc');
                    if (s && u) {
                      if (this.prev < i.catchLoc) return o(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return o(i.finallyLoc);
                    } else if (s) {
                      if (this.prev < i.catchLoc) return o(i.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          'try statement without catch or finally'
                        );
                      if (this.prev < i.finallyLoc) return o(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, 'finallyLoc') &&
                    this.prev < o.finallyLoc
                  ) {
                    var a = o;
                    break;
                  }
                }
                a &&
                  ('break' === e || 'continue' === e) &&
                  a.tryLoc <= t &&
                  t <= a.finallyLoc &&
                  (a = null);
                var i = a ? a.completion : {};
                return (
                  (i.type = e),
                  (i.arg = t),
                  a
                    ? ((this.method = 'next'), (this.next = a.finallyLoc), v)
                    : this.complete(i)
                );
              },
              complete: function (e, t) {
                if ('throw' === e.type) throw e.arg;
                return (
                  'break' === e.type || 'continue' === e.type
                    ? (this.next = e.arg)
                    : 'return' === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = 'return'),
                      (this.next = 'end'))
                    : 'normal' === e.type && t && (this.next = t),
                  v
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.finallyLoc === e)
                    return this.complete(n.completion, n.afterLoc), E(n), v;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var r = n.completion;
                    if ('throw' === r.type) {
                      var o = r.arg;
                      E(n);
                    }
                    return o;
                  }
                }
                throw new Error('illegal catch attempt');
              },
              delegateYield: function (e, n, r) {
                return (
                  (this.delegate = {
                    iterator: O(e),
                    resultName: n,
                    nextLoc: r,
                  }),
                  'next' === this.method && (this.arg = t),
                  v
                );
              },
            }),
            e
          );
        })(e.exports);
        try {
          regeneratorRuntime = t;
        } catch (e) {
          'object' == typeof globalThis
            ? (globalThis.regeneratorRuntime = t)
            : Function('r', 'regeneratorRuntime = r')(t);
        }
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var a = (t[r] = { exports: {} });
    return e[r](a, a.exports, n), a.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (() => {
      'use strict';
      function e(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function t(e, t, n, r, o, a, i) {
        try {
          var c = e[a](i),
            s = c.value;
        } catch (e) {
          return void n(e);
        }
        c.done ? t(s) : Promise.resolve(s).then(r, o);
      }
      var r = n(757),
        o = n.n(r);
      function a(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function i(t) {
        for (var n = 1; n < arguments.length; n++) {
          var r = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? a(Object(r), !0).forEach(function (n) {
                e(t, n, r[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
            : a(Object(r)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(r, e)
                );
              });
        }
        return t;
      }
      var c,
        s,
        u = n(595),
        l = n(921).sum,
        d = u.load();
      ((c = o().mark(function e(t) {
        var n,
          r,
          a,
          c,
          s,
          u,
          f,
          h,
          p,
          v,
          m,
          g,
          y,
          b,
          w,
          k,
          x,
          S,
          C,
          A,
          P,
          E,
          M,
          O;
        return o().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  (x = function (e, t, r, o) {
                    var d = {};
                    return (
                      (d.endpoint = e || void 0),
                      (d.siteId = t || void 0),
                      (d.sessionId = r || void 0),
                      (d.userId = o || void 0),
                      (d.latestPageViewEvent = void 0),
                      (d.current = {
                        hash: a,
                        host: c,
                        hostname: s,
                        href: u,
                        origin: f,
                        port: h,
                        protocol: p,
                        search: v,
                        pathname: m,
                      }),
                      (d.track = function (e) {
                        var t =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 'pageView',
                          r =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : '',
                          o =
                            arguments.length > 3 && void 0 !== arguments[3]
                              ? arguments[3]
                              : '',
                          a =
                            arguments.length > 4 && void 0 !== arguments[4]
                              ? arguments[4]
                              : '',
                          c =
                            arguments.length > 5 && void 0 !== arguments[5]
                              ? arguments[5]
                              : '';
                        fetch(
                          ''
                            .concat(d.endpoint)
                            .concat(
                              'init' !== t
                                ? '/'.concat(d.sessionId, '/').concat(t, '/')
                                : '/'
                            ),
                          {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              sessionId: d.sessionId,
                              userId: d.userId,
                              type: t,
                              element: i(i({}, e), {}, { title: g.title }),
                              category: r,
                              action: o,
                              label: a,
                              value: c,
                              language: n,
                              seed: d.siteId,
                              referrer: g.referrer,
                              fingerprint: k,
                              scrap: w.components
                                ? {
                                    audio: w.components.audio || {},
                                    colorDepth: w.components.colorDepth || {},
                                    colorGamut: w.components.colorGamut || {},
                                    contrast: w.components.contrast || {},
                                    cookiesEnabled:
                                      w.components.cookiesEnabled || {},
                                    cpuClass: w.components.cpuClass || {},
                                    deviceMemory:
                                      w.components.deviceMemory || {},
                                    fonts: w.components.fonts || {},
                                    fontPreferences:
                                      w.components.fontPreferences || {},
                                    hardwareConcurrency:
                                      w.components.hardwareConcurrency || {},
                                    hdr: w.components.hdr || {},
                                    indexedDB: w.components.indexedDB || {},
                                    invertedColors:
                                      w.components.invertedColors || {},
                                    languages: w.components.languages || {},
                                    localStorage:
                                      w.components.localStorage || {},
                                    monochrome: w.components.monochrome || {},
                                    openDatabase:
                                      w.components.openDatabase || {},
                                    osCpu: w.components.osCpu || {},
                                    platform: w.components.platform || {},
                                    plugins: w.components.plugins || {},
                                    reducedMotion:
                                      w.components.reducedMotion || {},
                                    screenFrame: w.components.screenFrame || {},
                                    screenResolution:
                                      w.components.screenResolution || {},
                                    sessionStorage:
                                      w.components.sessionStorage || {},
                                    timezone: w.components.timezone || {},
                                    touchSupport:
                                      w.components.touchSupport || {},
                                    vendor: w.components.vendor || {},
                                  }
                                : [],
                            }),
                          }
                        )
                          .then(function (e) {
                            return e.json();
                          })
                          .then(function (n) {
                            return (
                              (d.sessionId = n.sessionID),
                              (d.userId = n.userId),
                              (d.siteId = n.siteSiteId),
                              'pageView' === t &&
                                (d.latestPageViewEvent = n.eventId),
                              'init' === t && d.track(e),
                              n
                            );
                          })
                          .catch(function (e) {
                            throw (console.error(e), e);
                          });
                      }),
                      (d.initializeTimings = function () {
                        var e =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : [],
                          t = performance.now();
                        return function () {
                          if ('hidden' === g.visibilityState) {
                            e.push(performance.now() - t);
                            var n = new Blob(
                              [
                                JSON.stringify({
                                  sessionId: d.sessionId,
                                  userId: d.userId,
                                  siteId: d.siteId,
                                  duration: l(e),
                                }),
                              ],
                              { type: 'application/json; charset=UTF-8' }
                            );
                            d.sessionId &&
                              d.latestPageViewEvent &&
                              navigator.sendBeacon(
                                ''
                                  .concat(d.endpoint, '/')
                                  .concat(d.sessionId, '/event/')
                                  .concat(
                                    d.latestPageViewEvent,
                                    '/performance'
                                  ),
                                n
                              );
                          } else t = performance.now();
                        };
                      }),
                      (d.handlePushState = function () {
                        var e = y.pushState;
                        return function () {
                          for (
                            var t = arguments.length, n = new Array(t), r = 0;
                            r < t;
                            r++
                          )
                            n[r] = arguments[r];
                          var o = n[2];
                          return (
                            o !== current.pathname &&
                              ((current.pathname = o), d.track(o)),
                            e.apply(y, n)
                          );
                        };
                      }),
                      (d.pushEvent = function (e) {
                        console.log(
                          'pushing event to '
                            .concat(d.siteId, ': ')
                            .concat(JSON.stringify(e))
                        ),
                          d.track(
                            d.current,
                            'event',
                            e.category || '',
                            e.action || '',
                            e.label || '',
                            e.value || '',
                            e
                          );
                      }),
                      d
                    );
                  }),
                  (n = t.navigator.language),
                  (r = t.location),
                  (a = r.hash),
                  (c = r.host),
                  (s = r.hostname),
                  (u = r.href),
                  (f = r.origin),
                  (h = r.port),
                  (p = r.protocol),
                  (v = r.search),
                  (m = r.pathname),
                  (g = t.document),
                  (y = t.history),
                  (e.next = 4),
                  d
                );
              case 4:
                return (b = e.sent), (e.next = 7), b.get();
              case 7:
                if (
                  ((w = e.sent),
                  (k = w.visitorId),
                  (S = g.querySelector('script[signals-id]')))
                ) {
                  e.next = 12;
                  break;
                }
                return e.abrupt('return', !1);
              case 12:
                (C = S.getAttribute('signals-id')),
                  (A = S.getAttribute('signals-session-id')),
                  (P = S.getAttribute('signals-user-id')),
                  (E = S.getAttribute('src').replace(
                    '/sat.js',
                    '/'.concat(C, '/analytics/sessions')
                  )),
                  (M = x(E, C, A, P)).track(
                    {
                      hash: a,
                      host: c,
                      hostname: s,
                      href: u,
                      origin: f,
                      port: h,
                      protocol: p,
                      search: v,
                      pathname: m,
                    },
                    'init'
                  ),
                  (O = M.initializeTimings()),
                  g.addEventListener('visibilitychange', O),
                  (y.pushState = M.handlePushState()),
                  (t.SIGNALS_SAT_DATALAYER = x),
                  (t.SIGNALS_SAT = M);
              case 23:
              case 'end':
                return e.stop();
            }
        }, e);
      })),
      (s = function () {
        var e = this,
          n = arguments;
        return new Promise(function (r, o) {
          var a = c.apply(e, n);
          function i(e) {
            t(a, r, o, i, s, 'next', e);
          }
          function s(e) {
            t(a, r, o, i, s, 'throw', e);
          }
          i(void 0);
        });
      }),
      function (e) {
        return s.apply(this, arguments);
      })(window);
    })();
})();
