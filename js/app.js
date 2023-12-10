(function () {
    var setStyle = function () {
        var windowHeight = (function () {
            var o = window;
            if (o.innerHeight) {
                return o.innerHeight;
            }
            else {
                o = document;
                if (o.documentElement.clientHeight == 0) {
                    return o.body.clientHeight;
                }
                else {
                    return o.documentElement.clientHeight;
                }
            }
        })();
        var offset = (function () {
            var o = window;
            if (o.pageYOffset) {
                return o.pageYOffset;
            }
            else {
                o = document;
                if (o.documentElement.scrollTop == 0) {
                    return o.body.scrollTop;
                }
                else {
                    return o.documentElement.scrollTop;
                }
            }
        })();
        var body = document.body, html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        var divs = document.getElementsByClassName("animate-on-scroll");
        for (var i = 0; i < divs.length; i++) {
            var x = divs[i];
            var ratio = parseFloat(x.getAttribute("animate-page-ratio") || 0.8);
            if (isNaN(ratio)) {
                ratio = 0.8;
            }
            var top = Math.round(x.parentNode.getBoundingClientRect().top || 0);
            var animateClass = (x.getAttribute("animate-class") || "");
            if (windowHeight + offset >= docHeight || top <= windowHeight * ratio) {
                if (x.className.indexOf(" " + animateClass) < 0) {
                    x.className += " " + animateClass;
                }
            }
            else if (top > windowHeight * ratio) {
                x.className = x.className.replace(" " + animateClass, "");
            }
        }
    };
    var addHandler = function (type) {
        var w = window;
        if (w.addEventListener) {
            w.addEventListener(type, setStyle, false);
        } else if (w.attachEvent) {
            w.attachEvent("on" + type, setStyle);
        } else {
            window["on" + type] = setStyle;
        }
    };
    addHandler("load");
    addHandler("resize");
    addHandler("scroll");
})();