const RvRadarMap = function (e, t, a, o) {
    const i = 256,
        n = [13.8505207, 100.54570151],
        r = .001,
        s = "https://tilecache.rainviewer.com",
        l = "https://api.rainviewer.com/public/weather-maps.json",
        c = "sat",
        m = "radar",
        p = "click",
        u = "change",
        d = "change keyup mouseup",
        h = e => getParamFromUrlCookie(M[e + "UrlParam"], M[e + "Cookie"], M[e + "Value"]),
        g = e => h(e) > 0 ? 1 : 0,
        y = e => +h(e),
        f = e => t.getElementById(e),
        b = () => Date.now(),
        C = (e, t, a = "block") => e && (e.style.display = t ? a : "none"),
        P = (e, t, a) => e && e.classList && (a ? e.classList.add(t) : e.classList.remove(t)),
        k = function (e, t, a = 1) {
            let o = e.length - 1;
            this.appendFrames = (t => t && e.push.apply(e, t)), this.getFrames = (() => e), this.getFrameForTime = (o => {
                for (let i = 0; i < e.length; i++) {
                    if (e[i].zIndex = a, e[i].type = t, e[i].time == o) return e[i];
                    if (e[i + 1] && e[i].time < o && e[i].time > o) return e[i]
                }
                return e[e.length - 1]
            }), this.getPosition = (() => o), this.setPosition = (e => o = e), this.getTimestamps = (() => e.map(e => e.time)), this.getZIndex = (() => a)
        },
        v = function () {
            const e = [];
            let t = [],
                a = -1;
            this.normalize = (e => {
                if (0 == t.length) return 0;
                for (; e < 0;) e += t.length;
                for (; e >= t.length;) e -= t.length;
                return e
            }), this.addFrames = (o => {
                e.push(o), t.push.apply(t, o.getTimestamps()), t = t.sort().filter((e, t, a) => !t || e != a[t - 1]), -1 == a && (a = o.getPosition())
            }), this.getPosition = (() => a), this.setPosition = (e => a = e), this.getFramesForPosition = (a => {
                const o = this.normalize(a);
                let i = [];
                for (let a of e) i.push(a.getFrameForTime(t[o]));
                return i
            }), this.getTimeForPosition = (e => t[this.normalize(e)])
        },
        F = function () {
            let e = 0,
                t = 0;
            this.getLoading = (() => e), this.addLoading = function () {
                ++e
            }, this.addLoaded = function () {
                e <= ++t && (e = 0, t = 0)
            }, this.isLoading = (() => 0 != e)
        },
        U = function (e, t) {
            let a, o, i, n = null;
            const r = e => {
                a = e.host, i = new k(e.satellite.infrared, c, 1), (o = new k(e.radar.past, m, 2)).appendFrames(e.radar.nowcast)
            },
                p = () => {
                    const a = new XMLHttpRequest;
                    a.open("GET", l, !0), a.onload = function () {
                        if (200 == a.status) {
                            try {
                                apiData = JSON.parse(a.responseText), r(apiData), e()
                            } catch (o) {
                                console.error(o)
                            }
                            t.addLoaded()
                        }
                    }, a.onerror = function () {
                        t.addLoaded()
                    }, t.addLoading(), a.send()
                };
            this.sync = (() => p()), this.startAutoSync = function () {
                n || (n = setInterval(() => p(), 6e4))
            }, this.stopAutoSync = (() => {
                n && (clearInterval(n), n = null)
            }), this.getImageUrl = (() => a || s), this.callUpdateCallback = (() => {
                e()
            }), this.mapFramesForLayerType = (e => {
                const t = new v;
                switch (e) {
                    case "radar-sat":
                        t.addFrames(o);
                    case "sat":
                        t.addFrames(i);
                        break;
                    default:
                        t.addFrames(o)
                }
                return t
            })
        };
    let S, T, w, z, M = {
        ...{
            mtSize: i,
            animationDelayFast: 100,
            animationDelayMedium: 400,
            animationDelayAtTheEnd: 1500,
            radarMarkers: [],
            coordinate: [],
            zoom: 6,
            saveState: !0,
            locUrlParam: "loc",
            locCookie: "latest-map-coordinates",
            locValue: "",
            msTileOpacityUrlParam: "o",
            msTileOpacityCookie: "opacity",
            msTileOpacityValue: 83,
            isAutoUpdateUrlParam: "oAU",
            isAutoUpdateCookie: "auto-update",
            isAutoUpdateValue: 1,
            isFastAnimationUrlParam: "oFa",
            isFastAnimationCookie: "fast-animation",
            isFastAnimationValue: 0,
            isCoverageUrlParam: "oC",
            isCoverageCookie: "coverage",
            isCoverageValue: 0,
            isCoverageForced: !1,
            isUtcTimeUrlParam: "oU",
            isUtcTimeCookie: "utc-time",
            isUtcTimeValue: 0,
            isLegendUrlParam: "oCS",
            isLegendCookie: "legend",
            isLegendValue: 1,
            isLegendMinimizedUrlParam: "lm",
            isLegendMinimizedCookie: "legend-minimized",
            isLegendMinimizedValue: 1,
            isFullScreenUrlParam: "oF",
            isFullScreenCookie: "full-screen",
            isFullScreenValue: 0,
            isFullScreenDisabled: !1,
            isAutoPlayUrlParam: "oAP",
            isAutoPlayCookie: "autoplay",
            isAutoPlayValue: 0,
            colorSchemeUrlParam: "c",
            colorSchemeCookie: "colors-scheme",
            colorSchemeValue: 1,
            isSnowUrlParam: "sn",
            isSnowCookie: "snow",
            isSnowValue: 1,
            isSmoothUrlParam: "sm",
            isSmoothCookie: "smooth",
            isSmoothValue: 1,
            animationDelayUrlParam: "aDelay",
            animationDelayCookie: "animation-delay",
            animationDelayValue: 0,
            layerTypeUrlParam: "layer",
            layerTypeCookie: "layer",
            layerTypeValue: "radar",
            layerType: "",
            inputFastAnimation: "input-fast-animation",
            inputCoverage: "input-coverage",
            inputUtcTime: "input-utc-time",
            inputLegend: "input-legend",
            inputSmooth: "input-smooth",
            inputSnow: "input-snow",
            inputColorsScheme: "input-colors-scheme",
            selectMapLayer: "btn-layer btn-layer-external",
            inputOpacity: "input-opacity",
            btnOpt: "btn-options btn-options-external",
            btnCloseOpt: "btn-close-options",
            btnEmbed: "btn-embed btn-embed-external",
            btnEmbedCopy: "btn-em-copy",
            btnEmbedClose: "btn-close-embed",
            btnFull: "btn-full",
            buttonPlay: "button-play",
            pastMark: "past-mark",
            nowMark: "now-mark",
            forecastMark: "forecast-mark",
            forecastTime: "forecast-time",
            buttonPrev: "button-prev",
            buttonNext: "button-next",
            buttonZoomIn: "button-zoom-in",
            buttonZoomOut: "button-zoom-out",
            buttonCurrentLocation: "button-current-location",
            optionsPopup: "options-popup",
            embeddedPopup: "embedded-popup",
            embedLink: "embed-link",
            colorSchemeMap: "color-scheme-map",
            mapButtonPlayPause: "map-button-play-pause",
            infoPopup: "info-popup"
        },
        ...o
    },
        A = [
            ["TH", 13.7563, 100.5018, 6],
            ["BY", 53.9045, 27.5615, 6],
            ["UK", 50.4501, 30.5234, 6],
            ["DE", 52.52, 13.405, 6],
            ["PL", 52.356, 19.282, 6],
            ["IT", 41.9028, 12.4964, 6],
            ["HU", 47.363, 19.155, 6],
            ["FR", 48.8566, 2.3522, 6],
            ["GB", 51.5074, .1278, 6],
            ["ES", 40.4168, -3.7038, 6],
            ["MY", 3.139, 101.6869, 6],
            ["KH", 11.5449, 104.8922, 6],
            ["TK", 41.0082, 28.9784, 6],
            ["EE", 59.437, 24.7536, 6],
            ["LV", 56.9496, 24.1052, 6],
            ["CZ", 50.0755, 14.4378, 6],
            ["RO", 44.4268, 26.1025, 6],
            ["SA", 24.6218, 46.6658, 6],
            ["QA", 25.2875, 51.4982, 7],
            ["AE", 24.4353, 54.4212, 6],
            ["BR", -23.5613, -46.6193, 5],
            ["AR", -33.0178, -60.8309, 6],
            ["CY", 34.9882, 33.2818, 6],
            ["IL", 32.078, 34.8377, 6],
            ["NZ", -41.3102, 174.8953, 6]
        ],
        E = (InteractivityScript && InteractivityScript.isRetina(e) ? 2 : 1) * M.mtSize,
        O = y("msTileOpacity"),
        I = g("isAutoUpdate"),
        D = g("isFastAnimation"),
        x = M.isCoverageForced ? 1 : M.isCoverage || g("isCoverage"),
        V = g("isUtcTime"),
        N = g("isLegendMinimized"),
        R = g("isLegend"),
        Z = M.isFullScreenDisabled ? 0 : g("isFullScreen"),
        B = g("isAutoPlay"),
        H = y("colorScheme"),
        _ = g("isSnow"),
        j = g("isSmooth"),
        K = y("animationDelay"),
        Y = M.layerType ? M.layerType : h("layerType"),
        q = -1,
        G = {},
        $ = null,
        J = b();
    const Q = f(M.forecastTime),
        W = f(M.pastMark),
        X = f(M.nowMark),
        ee = f(M.forecastMark),
        te = f(M.buttonPlay);
    typeof H == undefined && (H = 1), (H < 0 || 4 == H || H > 7) && (H = 1), P(f(M.colorSchemeMap), "color-s" + H, !0);
    const ae = e.navigator.userLanguage || e.navigator.language,
        oe = new F,
        ie = new U(() => {
            const e = ie.mapFramesForLayerType(Y);
            e && (T = e, -1 == q && (q = e.getPosition()), re(), Pe(q, !0))
        }, oe, Y),
        ne = e => e == m,
        re = () => {
            for (let e in G) S.removeLayer(G[e]), delete G[e]
        },
        se = e => {
            let t = [];
            return e.split(" ").forEach(e => {
                let a = f(e);
                a ? t.push(a) : console.warn("No element with ID " + e)
            }), t
        },
        le = (e, t, a, o) => {
            let i = se(t),
                n = e.split(" ");
            i.forEach(e => {
                n.forEach(t => {
                    e.addEventListener(t, e => {
                        a(e), Ue()
                    }, !1)
                }), o && o(e)
            })
        },
        ce = e => {
            sC(M.locCookie, ye(e.map)), Ue()
        },
        me = e => 0 == e ? M.animationDelayAtTheEnd : K > 0 ? K : D ? M.animationDelayFast : M.animationDelayMedium,
        pe = () => {
            J = b(), $ = setInterval(ue, M.animationDelayFast), ue()
        },
        ue = () => {
            if (!S || !oe || !T || oe.isLoading()) return;
            let e = T.normalize(q + 1),
                t = T.normalize(e + 1),
                a = me(t);
            if (J + a > b()) return;
            J = b(), Pe(e);
            const o = T.getFramesForPosition(e);
            T.getFramesForPosition(t).forEach(e => {
                for (let t = 0; t < o.length; t++)
                    if (o[t].path == e.path) return;
                ke(e), Le(e, r)
            })
        },
        de = () => {
            he(!0), clearInterval($), $ = null
        },
        he = e => {
            P(te, M.mapButtonPlayPause, !e)
        },
        ge = () => {
            he($), $ ? de() : pe(), B = $ ? 1 : 0, sC(M.isAutoPlayCookie, B)
        },
        ye = () => {
            var e = S.getCenter();
            return Math.round(1e4 * e.lat) / 1e4 + "," + Math.round(1e4 * e.lng) / 1e4 + "," + S.getZoom()
        },
        fe = e => {
            const t = ne(e.type);
            return [ie.getImageUrl() + e.path, E, "{z}/{x}/{y}", t ? 1 + H : 0, t ? j + "_" + _ + ".png" : "0_0.png"].join("/")
        },
        be = () => s + "/v2/coverage/0/" + E + "/{z}/{x}/{y}/0/0_0.png",
        Ce = () => radarIcon = L.icon({
            iconUrl: "/images/rainviewer2/map/icon-single-radar.png",
            iconRetinaUrl: "/images/rainviewer2/map/icon-single-radar@2x.png",
            iconSize: [24, 24]
        }),
        Pe = (e, t) => {
            if (!S || !t && q == e) return;
            T.getFramesForPosition(q).forEach(e => {
                Le(e, 0)
            }), q = T.normalize(e), Fe(T.getTimeForPosition(q)), T.getFramesForPosition(q).forEach(e => {
                ke(e), Le(e, O)
            }), T.getFramesForPosition(q + 1).forEach(e => {
                ke(e), Le(e, r)
            })
        },
        ke = e => {
            if (G && e) {
                if (!G[e.path]) {
                    const t = new L.TileLayer(fe(e), {
                        tileSize: i,
                        opacity: r,
                        zIndex: e.zIndex + 1e3
                    });
                    t.on("loading", oe.addLoading), t.on("load", oe.addLoaded), t.on("remove", oe.addLoaded), G[e.path] = t
                }
                S.hasLayer(G[e.path]) || S.addLayer(G[e.path])
            }
        },
        Le = (e, t) => {
            G && e && G[e.path] && G[e.path].setOpacity(t / 100)
        },
        ve = e => {
            var t = new Date(1e3 * e),
                a = {
                    hour: "numeric",
                    minute: "numeric"
                };
            return V && (a.timeZone = "UTC"), t.toLocaleString(ae, a) + (V ? " UTC" : "")
        },
        Fe = e => {
            Q && (Q.innerHTML = ve(e)), C(W, !1), C(X, !1), C(ee, !1);
            const t = b(),
                a = 1e3 * e;
            let o = W;
            X && a <= t && a + 6e5 > t ? o = X : a > t && (o = ee), C(o, !0, "inline-block")
        },
        Ue = () => {
            for (var e = t.querySelectorAll("a.main-site-link"), a = Se(), o = 0; o < e.length; o++) e[o].href = a
        },
        Se = e => {
            e || (e = t.location.pathname.replace("map.html", ""));
            let a = {};
            return a[M.locUrlParam] = ye(S), a[M.isFastAnimationUrlParam] = D, a[M.isCoverageUrlParam] = x, a[M.isUtcTimeUrlParam] = V, a[M.isLegendUrlParam] = R, a[M.isFullScreenUrlParam] = Z, a[M.isAutoPlayUrlParam] = B, a[M.colorSchemeUrlParam] = H, a[M.msTileOpacityUrlParam] = O, a[M.isLegendMinimizedUrlParam] = N, a[M.layerTypeUrlParam] = Y, a[M.isSmoothUrlParam] = j, a[M.isSnowUrlParam] = _, t.location.protocol + "//" + t.location.host + e + "?" + Object.keys(a).map(e => `${e}=${a[e]}`).join("&")
        },
        Te = e => {
            t.getElementsByTagName("body")[0].className = e ? "full-screen" : "", S && S.invalidateSize()
        },
        we = () => {
            N = 0 == N ? 1 : 0, sC(M.isLegendMinimizedCookie, N), ze(N)
        },
        ze = e => {
            P(f(M.infoPopup), "legend-minimized", e)
        };
    let Me = e => {
        C(f(M.infoPopup), e)
    };
    const Ae = () => {
        var e = f(M.btnCloseOpt);
        e && e.click()
    },
        Ee = () => {
            re(), Pe(q, !0)
        },
        Oe = e => {
            C(f(e), 0)
        },
        Ie = e => {
            C(f(e), 1)
        },
        De = e => {
            if (e && e.length)
                for (var t = 0; t < e.length; t++) {
                    var a = e[t],
                        o = a.radar_id + " - " + a.location;
                    L.marker(L.latLng(a.latitude, a.longitude), {
                        title: o,
                        icon: Ce()
                    }).bindPopup(o).addTo(S)
                }
        },
        xe = e => {
            ne(Y) || (e = !1), e ? S.addLayer(w) : S.removeLayer(w)
        };
    this.bind = (() => {
        le(u, M.inputFastAnimation, e => {
            D = e.target.checked ? 1 : 0, sC(M.isFastAnimationCookie, D)
        }, e => e.checked = 1 == D), le(u, M.inputCoverage, e => {
            x = e.target.checked ? 1 : 0, sC(M.isCoverageCookie, x), xe(x)
        }, e => e.checked = x), le(u, M.inputUtcTime, e => {
            V = e.target.checked ? 1 : 0, sC(M.isUtcTimeCookie, V), Fe(T.getTimeForPosition(q))
        }, e => e.checked = 1 == V), le(u, M.inputLegend, e => {
            R = e.target.checked ? 1 : 0, sC(M.isLegendCookie, R), Me(R)
        }, e => e.checked = 1 == R), le(u, M.inputSmooth, e => {
            j = e.target.checked ? 1 : 0, sC(M.isSmoothCookie, j), Ee()
        }, e => e.checked = 1 == j), le(u, M.inputSnow, e => {
            _ = e.target.checked ? 1 : 0, sC(M.isSnowCookie, _), Ee()
        }, e => e.checked = 1 == _), le(u, M.inputColorsScheme, e => {
            var t = H;
            H = parseInt(e.target.value), sC(M.colorSchemeCookie, H);
            var a = f(M.colorSchemeMap);
            P(a, "color-s" + H, !0), P(a, "color-s" + t, !1), Ee()
        }, e => e.value = H), le(u, M.selectMapLayer, function (e) {
            Y = e.target.value, ie.callUpdateCallback(), sC(M.layerTypeCookie, Y), se(M.selectMapLayer).forEach(e => e.value = Y), xe(x)
        }, e => e.value = Y), le(d, M.inputOpacity, function (e) {
            var t = parseInt(e.target.value);
            t >= 0 && t <= 100 && (O = t, sC(M.msTileOpacityCookie, t), T && T.getFramesForPosition(q).forEach(e => Le(e, O)))
        }, e => e.value = O), le(p, M.btnOpt, function () {
            Ae(), Ie(M.optionsPopup)
        }), le(p, M.btnCloseOpt, function () {
            Oe(M.optionsPopup)
        }), le(p, M.btnEmbed, function () {
            Ae(), Ie(M.embeddedPopup);
            var e = f(M.embedLink);
            e.innerHTML = '<iframe src="' + Se("/map.html") + '" width="100%" frameborder="0" style="border:0;height:50vh;" allowfullscreen></iframe>', e.select()
        }), le(p, M.btnEmbedCopy, function () {
            f(M.embedLink).select();
            try {
                t.execCommand("copy")
            } catch (e) {
                alert("Unable copy to clipboard. Please, use Ctrl+C")
            }
        }), le(p, M.btnEmbedClose, function () {
            C(f(M.embeddedPopup), !1)
        }), le(p, M.btnFull, function () {
            Z = "full-screen" != t.getElementsByTagName("body")[0].className ? 1 : 0, Te(Z), sC(M.isFullScreenCookie, Z)
        }), le(p, M.buttonPlay, function () {
            ge()
        }), le(p, M.buttonPrev, function () {
            de(), Pe(q - 1)
        }), le(p, M.buttonNext, function () {
            de(), Pe(q + 1)
        }), le(p, M.buttonZoomIn, function () {
            S && S.zoomIn()
        }), le(p, M.buttonZoomOut, function () {
            S && S.zoomOut()
        }), le(p, M.buttonCurrentLocation, function () {
            S && (S.locate({
                setView: !0,
                watch: !1,
                maxZoom: 8
            }), S.on("locationfound", function (e) {
                z ? z.setLatLng(e.latlng) : (z = L.marker(e.latlng, {
                    icon: L.icon({
                        iconUrl: "/images/rainviewer2/map/icon-current-location-point.png",
                        iconSize: [29, 28],
                        iconAnchor: [14, 14]
                    })
                })).addTo(S)
            }))
        }), le(p, M.infoPopup, function () {
            we()
        }), t.onkeydown = (t => {
            let a = 0;
            switch ((t = t || e.event).which || t.keyCode) {
                case 37:
                    a = -1;
                    break;
                case 39:
                    a = 1;
                    break;
                default:
                    return
            }
            0 != a && (de(), Pe(q + a)), t.preventDefault()
        })
    });
    const Ve = () => {
        let e = n,
            t = M.zoom;
        if (M.coordinate && 2 == M.coordinate.length) e = M.coordinate;
        else {
            let a = h("loc");
            console.log(a);
            if (a) {
                var o = a.split(a.indexOf("_") > 0 ? "_" : ","),
                    i = parseFloat(o[0]),
                    r = parseFloat(o[1]),
                    s = parseFloat(o[2]);
                isNaN(i) || isNaN(r) || isNaN(s) || (e = [i, r], t = s)
            } else
                for (var l in A)
                    if (ae == A[l][0].toLowerCase()) {
                        e = [A[l][1], A[l][2]], t = A[l][3];
                        break
                    }
        }
        e = n;
        w = L.tileLayer(be(), {
            opacity: .32,
            zIndex: 99,
            visible: !1
        }), (S = L.map(a, {
            layers: [],
            center: e,
            zoom: 12,
            zoomControl: true,
            zIndex: 1
        })).addLayer(L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 18,
        })), S.on(p, () => Ae()), M.saveState && S.on("moveend", ce), L.control.scale({
            position: "bottomleft"
        }).addTo(S), Ue(), De(M.radarMarkers), Te(Z), ze(1 == N), Me(R), xe(x), ie.sync(), I && ie.startAutoSync(), B && ge()
    },
        Ne = () => {
            "undefined" != typeof L ? Ve() : setTimeout(Ne, 50)
        };
    this.initialize = (() => Ne())
};
document.addEventListener("DOMContentLoaded", function () {
    const e = new RvRadarMap(window, document, "map-canvas", "undefined" != typeof rvRadarMapOptions ? rvRadarMapOptions : {});
    e.bind(), e.initialize()
});