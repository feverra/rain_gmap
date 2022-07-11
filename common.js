function C(e) {
    let t = window && window.localStorage;
    if (!t) return null;
    let o = t.getItem(e);
    if (null != o) return o;
    let n = rvGetCookie(e);
    return n && sC(e, n), n
}

function sC(e, t) {
    let o = window && window.localStorage;
    o ? o.setItem(e, t) : rvSetCookie(e, t)
}

function rvGetCookie(e) {
    return (document.cookie.match("(^|; )" + e + "=([^;]*)") || -1)[2]
}

function rvSetCookie(e, t) {
    var o = new Date;
    o.setTime(o.getTime() + 158112e5), document.cookie = e + "=" + t + ";expires=" + o.toUTCString() + ";path=/"
}

function changeLocation() {
    var e = ["ru", "by", "md", "kz"],
        t = ["uk", "ua"],
        o = (navigator.language || navigator.userLanguage).substring(0, 2),
        n = "";
    sC("l", o), e.indexOf(o) > -1 ? n = "ru" : t.indexOf(o) > -1 && (n = "ua"), "" != n && redirect[n] && -1 == window.location.pathname.indexOf("/" + n) && (window.location = redirect[n])
}

function getParamFromUrlCookie(e, t, o) {
    var n = getURLParameter(e);
    return null == n && null == (n = C(t)) && (n = o), n
}

function getURLParameter(e, t = window.location.href) {
    e = e.replace(/[\[\]]/g, "\\$&");
    var o = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g, " ")) : "" : null
}

function getDeviceType(e) {
    if (e) {
        if (/iphone|ipod|ipad/i.test(e)) return "ios";
        if (/huawei/i.test(e)) return "huawei";
        if (/android/i.test(e)) return "android"
    }
    return null
}

function showStoreByDeviceType() {
    const e = getDeviceType(navigator.userAgent),
        t = document.querySelectorAll(".auto-detect-platform > *");
    null != e && setDisplayNoneToElements(t, e)
}

function setDisplayNoneToElements(e, t) {
    e.forEach(e => e.style.display = e.classList.contains(t) ? "block" : "none")
}
dataLayer = [], C("l") || changeLocation();
const RV = function () { };
RV.onLocalizationLoaded = function (e) {
    RV.isLocalizationLoaded() ? e() : setTimeout(RV.onLocalizationLoaded, 100, e)
}, RV.isLocalizationLoaded = function () {
    return "undefined" != typeof RVStrings
}, RV.localize = function (e) {
    return RV.isLocalizationLoaded() && RVStrings[e] ? RVStrings[e] : e
};
const InteractivityScript = function (e, t) {
    const o = t => e.getElementById(t),
        n = t => e.querySelector(t),
        i = t => e.querySelectorAll(t),
        a = (e, t) => e && e.classList.toggle(t),
        r = (e, t, o = "block") => e && (e.style.display = t ? o : "none"),
        c = (e, t, o) => e && e.addEventListener && e.addEventListener("click", t, o),
        s = (e, t) => e && e.addEventListener && e.addEventListener("change", t),
        l = (e, t) => e && e.insertAdjacentHTML("afterbegin", t),
        d = (o, n, i, a) => {
            if (a = a || t, InteractivityScript.isRetina(a)) {
                o = void 0 !== o ? o : "retina", retina_match = new RegExp(".[0-9a-z]+$", "gi"), i = void 0 === (n = void 0 !== n ? n : "@2x") || i;
                for (var r = e.getElementsByClassName(o); r.length > 0 && r[0] && r[0].src;) r[0].src = r[0].src.replace(retina_match, n + "$&"), r[0].className = r[0].className.replace(o, "")
            }
        },
        u = n("body"),
        m = o("open-lang"),
        p = n(".language-select__options"),
        g = o("mob-menu"),
        E = n(".download-buttons"),
        v = n(".top-menu"),
        h = n(".header-download-buttons__mobile"),
        f = n("#arrowTop"),
        b = n("#tag-select"),
        y = o("cookie-notice"),
        T = o("cookie-notice-accept"),
        k = "https://itunes.apple.com/app/apple-store/id980123924?pt=516955&ct=rainviewer-site-main&mt=8",
        L = "https://play.google.com/store/apps/details?id=com.lucky_apps.RainViewer&referrer=utm_source%3Dsite%26utm_medium%3Dlink%26utm_term%3Dgoogle%2520play%2520button",
        S = "https://appgallery.cloud.huawei.com/ag/n/app/C102212695?channelId=website&id=05b56e0b3acc4185b06c80d972a5e98c&s=7F8BB7C4FEE7DE382A99FD0ED17262A4DB538356895579E723A6396920764A57&detailType=0&v=",
        w = null,
        _ = "ukraine-block-2",
        A = "d",
        R = getDeviceType(navigator.userAgent),
        V = i(".auto-detect-platform > *"),
        I = n(".footer-store-btn"),
        N = i(".theme-swith input"),
        x = e.documentElement,
        B = "all",
        D = "not all",
        F = i("*[data-theme='dark']"),
        P = i("*[data-theme='light']"),
        q = t.matchMedia("(prefers-color-scheme: dark)"),
        U = C("theme"),
        O = (e, t) => {
            e.forEach(e => e.media = t)
        };
    N.forEach(function (e) {
        "light" == U ? (O(F, D), O(P, B), 1 == e.value ? e.checked = !0 : e.checked = !1) : "dark" == U ? (O(F, B), O(P, D), 2 == e.value ? e.checked = !0 : e.checked = !1) : "auto" != U && U || (q.matches ? (O(F, B), O(P, D)) : (O(F, D), O(P, B)), 0 == e.value ? e.checked = !0 : e.checked = !1), s(q, function () {
            0 == e.value && e.checked && (q.matches ? (O(F, B), O(P, D), x.classList.add("dark")) : (O(F, D), O(P, B), x.classList.remove("dark")))
        }), s(e, () => {
            0 == e.value ? (q.matches ? (O(F, B), O(P, D), x.classList.add("dark")) : (O(F, D), O(P, B), x.classList.remove("dark")), sC("theme", "auto")) : 1 == e.value ? (x.classList.remove("dark"), O(F, D), O(P, B), sC("theme", "light")) : 2 == e.value && (x.classList.add("dark"), O(F, B), O(P, D), sC("theme", "dark"))
        })
    });
    const Y = (e, t) => {
        e.forEach(e => e.style.display = e.classList.contains(t) ? "block" : "none")
    };
    t.onscroll = function () {
        r(f, e.body.scrollTop > t.innerHeight / 2 || e.documentElement.scrollTop > t.innerHeight / 2)
    }, b && b.addEventListener("change", function (e) {
        let o = e.target.value;
        o && (t.location = o)
    }), c(f, () => {
        e.body.scrollTop = 0, e.documentElement.scrollTop = 0
    }), y && ("true" == C("cookie-notice-dismissed") ? gtm() : r(y, !0), c(T, () => {
        sC("cookie-notice-dismissed", "true"), r(y, !1), gtm()
    })), w && ("undefined" != typeof markAsReadUkraine ? sC(_, A) : C(_) != A && RV.onLocalizationLoaded(() => {
        l(w, '<div class="ukraine-statement" id="ukraine-block"><p>' + RV.localize("UKRAINE_STATEMENT") + '</p><input type="button" class="btn-close map-button-close" id="close-ukraine-block" /></div>'), c(o("close-ukraine-block"), () => {
            sC(_, A), r(o("ukraine-block"), !1)
        })
    })), g && c(g, () => {
        a(v, "open"), a(u, "overflow-none")
    }), e.addEventListener("click", function (e) {
        const t = e.target,
            o = t == p || p.contains(t),
            n = t == m,
            i = p.classList.contains("open");
        (n || !o && i) && a(p, "open")
    }), h && h.addEventListener("click", function (e) {
        if (getDeviceType(navigator.userAgent)) switch (getDeviceType(navigator.userAgent)) {
            case "ios":
                t.location = k;
                break;
            case "android":
                t.location = L;
                break;
            case "huawei":
                t.location = S
        } else {
            e.preventDefault();
            const o = 150,
                n = E.getBoundingClientRect().top - o;
            t.scrollBy({
                top: n,
                behavior: "smooth"
            })
        }
    }), null != R && (Y(V, R), I && I.classList.add("mobile"));
    let z = new IntersectionObserver(function (e) {
        e.forEach(function (e) {
            e.isIntersecting ? v.classList.remove("show-store-btn") : v.classList.add("show-store-btn")
        })
    });
    z && E && z.observe(E), d("retina", "@2x", !1, t)
};
InteractivityScript.isRetina = function (e) {
    var t = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";
    return !!("undefined" != typeof e.devicePixelRatio && e.devicePixelRatio > 1 || e.matchMedia && e.matchMedia(t).matches)
};
let FormValidation = function (e, t, o) {
    function n() {
        E && (E.setAttribute("disabled", ""), E.style.color = "transparent", p.classList.add("display"))
    }

    function i() {
        E && (p.classList.remove("display"), E.removeAttribute("disabled"), E.style.color = "white")
    }
    const a = "https://api.rainviewer.com/site/";
    let r, c, s, l, d, u, m, p, g, E;
    switch (o) {
        case FormValidation.TYPE_CONTACT:
            r = t.closest(".contact").querySelector("#message-info"), c = t.querySelector(".form-group_technical"), s = t.querySelector("#subject"), l = t.querySelector("#name"), d = t.querySelector("#email"), u = t.querySelector("#rV-version"), m = t.querySelector("#text");
            break;
        case FormValidation.TYPE_SUBSCRIBE:
            g = document.querySelector(".subscribe"), d = t.querySelector("#subscribe-email"), E = t.querySelector(".subscribe-submit"), p = E.querySelector(".loading"), messageErrElem = t.querySelector("#message-err")
    }
    let v = e => RV.localize(e),
        h = (e, t) => {
            if (o == FormValidation.TYPE_CONTACT) {
                const o = t.querySelectorAll("input, select");
                for (let n of o) "TECH_QUESTIONS" == e.value ? (t.classList.add("show"), n.removeAttribute("disabled")) : (t.classList.remove("show"), n.setAttribute("disabled", ""))
            }
        },
        f = e => {
            if (!e) return !1;
            e.closest(".form-group").classList.add("error"), e.focus()
        },
        b = e => {
            if (!e) return !1;
            e.closest(".form-group").classList.remove("error")
        },
        C = e => !!e && ("" != e.value || (e.closest(".input-group").lastElementChild.textContent = v("RECAPTCHA_FIELD_IS_REQUIRED"), f(e), !1)),
        y = e => {
            if (!e) return !1;
            if (e.value.length < 1) return e.nextElementSibling.textContent = v("CANT_BE_BLANK"), f(e), !1;
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.value) ? (b(e), !0) : (e.nextElementSibling.textContent = v("PLEASE_ENTER_VALID_EMAIL"), f(e), !1)
        },
        T = e => !!e && (" " == e.value ? (f(e), !1) : (b(e), !0)),
        k = (e, t, o) => !!e && (e.value.length < t ? (e.nextElementSibling.textContent = v("CANT_BE_BLANK"), f(e), !1) : e.value.length > o ? (f(e), !1) : (b(e), !0)),
        L = () => {
            const e = document.querySelector("#g-recaptcha-response");
            let t, n, i, a, r, c;
            switch (o) {
                case FormValidation.TYPE_CONTACT:
                    i = s, t = l, n = d, a = u, r = m, c = e;
                    break;
                case FormValidation.TYPE_SUBSCRIBE:
                    n = d
            }
            return o == FormValidation.TYPE_CONTACT ? k(t, 0, 100) && y(n) && T(i) && k(a, 0, 100) && k(r, 1, 1e3) && C(c) : o == FormValidation.TYPE_SUBSCRIBE && y(n)
        },
        S = (e, t) => {
            e && (e.textContent = t, e.style.display = "block")
        },
        w = (t, n) => {
            n && 0 != n.code ? S(messageErrElem, n.message ? n.message : "API ") : (o == FormValidation.TYPE_CONTACT ? (S(r, v("YOUR_MESSAGE_HAS_BEEN_SENT")), e.scrollTo({
                top: 0,
                behavior: "smooth"
            }), h(s, c)) : o == FormValidation.TYPE_SUBSCRIBE && g.classList.add("succes"), t.reset())
        },
        _ = e => {
            let t = [],
                o = Object.fromEntries(new FormData(e).entries());
            for (var n in o) {
                var i = encodeURIComponent(n),
                    a = encodeURIComponent(o[n]);
                t.push(i + "=" + a)
            }
            return t.join("&")
        },
        A = e => ({
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: _(e)
        }),
        R = e => {
            if (e.preventDefault(), L()) {
                n();
                const t = 2 == o ? "subscribe" : "contact",
                    {
                        currentTarget: r
                    } = e;
                fetch(a + t, A(r)).then(e => e.json()).then(e => {
                    i(), w(r, e)
                })["catch"](() => {
                    i(), S(messageErrElem, v("PLEASE_CHECK_YOUR_INTERNET_CONNECTION"))
                })
            }
        };
    t.addEventListener("change", function () {
        h(s, c)
    }), t.addEventListener("submit", R)
};
FormValidation.TYPE_CONTACT = 1, FormValidation.TYPE_SUBSCRIBE = 2, document.addEventListener("DOMContentLoaded", function () {
    new InteractivityScript(document, window);
    const e = document.querySelector("#form"),
        t = document.querySelector("#subscribe");
    e && new FormValidation(window, e, FormValidation.TYPE_CONTACT), t && new FormValidation(window, t, FormValidation.TYPE_SUBSCRIBE)
});