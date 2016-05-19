
var iteration = 0;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function moog() {
    var seq = "moog";
    var txt = "";
    for (var i = 0; i < 1.0e4; i++) {
        txt += seq[Math.trunc(Math.random() * seq.length)];
    }
    txt = txt.replaceAll("moog", "<b>moog</b>");
    iteration += 1;
    document.body.innerHTML = txt;
}

setInterval(moog, 500);
