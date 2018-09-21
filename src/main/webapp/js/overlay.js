window.onresize = function(event) {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

    if (x > 479 && document.getElementById("about__panel").style.height == "100%") {
        document.getElementById("about__panel").style.height = "0%";
    }
};

function closeNav() {
    document.getElementById("about__panel").style.height = "0%";
}

function showNav() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;

    if (x <= 479) {
        if (document.getElementById("about__panel").style.height == "0%") {
            document.getElementById("about__panel").style.height = "100%";
        } else {
            document.getElementById("about__panel").style.height = "0%";
        }
    } else {
        location.reload();
    }
}