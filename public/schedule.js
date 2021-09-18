document.addEventListener('DOMContentLoaded', function () { initiate2(); });

var fridayAs = [];
var daysOff = [];
var todayoff = false;
var startDate = new Date("2021-9-9");
var endDate = new Date("2022-6-24");
var per = [[new Date("1969", "1", "1"), new Date("1969", "1", "1")],
[new Date("1969", "1", "1"), new Date("1969", "1", "1")],
[new Date("1969", "1", "1"), new Date("1969", "1", "1")],
[new Date("1969", "1", "1"), new Date("1969", "1", "1")],
[new Date("1969", "1", "1"), new Date("1969", "1", "1")],
[new Date("1969", "1", "1"), new Date("1969", "1", "1")],
[new Date("1969", "1", "1"), new Date("1969", "1", "1")],
[new Date("1969", "1", "1"), new Date("1969", "1", "1")],
[new Date("1969", "1", "1"), new Date("1969", "1", "1")]];

var p = [];

function initiate2() {
    let date = toUTC(new Date());

    for (var i = 0; i < 9; i++) {
        let temp = document.getElementById((i + 1).toString());

        p.push(temp);
    }

    per[0][0].setUTCHours(11, 5);
    per[0][1].setUTCHours(11, 45);

    per[1][0].setUTCHours(11, 50);
    per[1][1].setUTCHours(12, 30);

    per[2][0].setUTCHours(12, 35);
    per[2][1].setUTCHours(13, 15);

    per[3][0].setUTCHours(13, 20);
    per[3][1].setUTCHours(14, 0);

    per[4][0].setUTCHours(14, 5);
    per[4][1].setUTCHours(14, 45);

    per[5][0].setUTCHours(14, 50);
    per[5][1].setUTCHours(15, 30);

    per[6][0].setUTCHours(15, 35);
    per[6][1].setUTCHours(16, 15);

    per[7][0].setUTCHours(16, 20);
    per[7][1].setUTCHours(17, 00);

    per[8][0].setUTCHours(17, 05);
    per[8][1].setUTCHours(17, 45);

    if (date.getDay() == 1 || date.getDay() == 3) {
        setA();
    }
    else if (date.getDay() == 0 || date.getDay() == 6) {
    }

    let stringDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    checkDay();

    displayPeriod();
    setInterval(displayPeriod, 1000)
}

function checkDay() {
    let date = toUTC(new Date());

    if ((startDate < date && date < endDate) || !(date.toDateString() in daysOff)) {
        switch (date.getDay()) {
            case 0:
                setNone();
                break;
            case 1:
                setA();
                break;
            case 2:
                todayoff = false;
                break;
            case 3:
                setA();
                break;
            case 4:
                todayoff = false;
                break;
            case 5:
                todayoff = false;
                if (date in fridayAs) {
                    setA();
                }
                break;
            case 6:
                setNone();
                break;
        }
    }
    else {
        setNone();
    }
}

function toUTC(date) {
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
}

function setNone() {
    todayoff = true;
    document.getElementById("neverGonnaGiveYouUp").innerHTML = "No school today";
}

function setA() {
    todayoff = false;
    let dayType = document.getElementById("type");

    dayType.innerHTML = "A";
    document.getElementById("a/an").innerHTML = "an";
    dayType.classList.remove("blue");
    dayType.classList.add("red");
}

function displayPeriod() {
    if (todayoff) {
        checkDay();
        return;
    }
    let date = new Date();
    let tempdate = toUTC(date);

    tempdate.setUTCFullYear("1969", "1", "1");

    var none = true;
    var closestP;
    var closest;

    for (var i = 0; i < 9; i++) {
        var temp = per[i][0] - tempdate;
        if (temp > 0 && temp < closest) {
            closestP = i;
            closest = temp;
        }

        if (tempdate > per[i][0] && tempdate < per[i][1]) {
            p[i].children[1].innerHTML = "<b>Ending in " + msToTime(per[i][1] - tempdate) + "</b>";
            p[i].classList.remove("nothighlight");
            p[i].classList.add("highlight");
            none = false;
        }
        else {
            if (p[i].classList.contains("highlight")) {
                p[i].classList.remove("highlight");
            }
            if (!p[i].classList.contains("nothighlight")) {
                p[i].classList.add("nothighlight");
            }
            if (p[i].children[1].innerHTML != "") {
                p[i].children[1].innerHTML = "";
            }
        }
    }

    if (tempdate > per[8][1]) {
        p[8].children[1].innerHTML = "Ended " + msToTime(tempdate - per[8][1]) + " ago";
        none = false;
    }

    if (none) {
        p[closestP].innerHTML = "Beginning in " + msToTime(closest);
    }

}

//from https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}