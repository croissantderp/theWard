document.addEventListener('DOMContentLoaded', function () { initiate2(); });

var fridayAs = [];
var daysOff = [];
var startDate = new Date("2021-9-9");
var endDate = new Date("2022-6-24");
var per1 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];
var per2 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];
var per3 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];
var per4 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];
var per5 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];
var per6 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];
var per7 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];
var per8 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];
var per9 = [new Date("1969", "1", "1"), new Date("1969", "1", "1")];

function initiate2() {
    let date = new Date();

    per1[0].setUTCHours(11, 5);
    per1[1].setUTCHours(11, 45);

    per2[0].setUTCHours(11, 50);
    per2[1].setUTCHours(12, 30);

    per3[0].setUTCHours(12, 35);
    per3[1].setUTCHours(13, 15);

    per4[0].setUTCHours(13, 20);
    per4[1].setUTCHours(14, 0);

    per5[0].setUTCHours(14, 5);
    per5[1].setUTCHours(14, 45);

    per6[0].setUTCHours(14, 50);
    per6[1].setUTCHours(15, 30);

    per7[0].setUTCHours(15, 35);
    per7[1].setUTCHours(16, 15);

    per8[0].setUTCHours(16, 20);
    per8[1].setUTCHours(17, 00);

    per9[0].setUTCHours(17, 05);
    per9[1].setUTCHours(17, 45);

    if (date.getDay() == 1 || date.getDay() == 3) {
        setA();
    }
    else if (date.getDay() == 0 || date.getDay() == 6) {
    }

    let stringDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    if ((startDate < date && date < endDate) || !(date in daysOff)) {
        switch (date.getDay) {
            case 0:
                setNone();
                break;
            case 1:
                setA();
                break;
            case 2:
                break;
            case 3:
                setA();
                break;
            case 4:
                break;
            case 5:

                break;
            case 6:
                setNone();
                break;
        }
    }
    else {
        setNone();
    }

    displayPeriod();
    setInterval(displayPeriod, 1000)
}

function setNone() {
    document.getElementById("neverGonnaGiveYouUp").innerHTML = "No school today";
}

function setA() {
    let dayType = document.getElementById("type");

    dayType.innerHTML = "A";
    document.getElementById("a/an").innerHTML = "an";
    dayType.classList.remove("blue");
    dayType.classList.add("red");
}

function displayPeriod() {
    let tempdate = new Date();

    tempdate.setFullYear("1969", "1", "1");

    let p1 = document.getElementById("1");
    let p2 = document.getElementById("2");
    let p3 = document.getElementById("3");
    let p4 = document.getElementById("4");
    let p5 = document.getElementById("5");
    let p6 = document.getElementById("6");
    let p7 = document.getElementById("7");
    let p8 = document.getElementById("8");
    let p9 = document.getElementById("9");

    p1.classList.remove("highlight");
    p2.classList.remove("highlight");
    p3.classList.remove("highlight");
    p4.classList.remove("highlight");
    p5.classList.remove("highlight");
    p6.classList.remove("highlight");
    p7.classList.remove("highlight");
    p8.classList.remove("highlight");
    p9.classList.remove("highlight");

    if (tempdate > per1[0] && tempdate < per1[1]) {
        p1.childNodes[1].innerHTML = "Ending in" + per1[1] - tempdate;
        p1.classList.remove("nothighlight");
        p1.classList.add("highlight");
    }
    if (tempdate > per2[0] && tempdate < per2[1]) {
        p2.classList.remove("nothighlight");
        p2.classList.add("highlight");
    }
    if (tempdate > per3[0] && tempdate < per3[1]) {
        p3.classList.remove("nothighlight");
        p3.classList.add("highlight");
    }
    if (tempdate > per4[0] && tempdate < per4[1]) {
        p4.classList.remove("nothighlight");
        p4.classList.add("highlight");
    }
    if (tempdate > per5[0] && tempdate < per5[1]) {
        p5.classList.remove("nothighlight");
        p5.classList.add("highlight");
    }
    if (tempdate > per6[0] && tempdate < per6[1]) {
        p6.classList.remove("nothighlight");
        p6.classList.add("highlight");
    }
    if (tempdate > per7[0] && tempdate < per7[1]) {
        p7.classList.remove("nothighlight");
        p7.classList.add("highlight");
    }
    if (tempdate > per8[0] && tempdate < per8[1]) {
        p9.classList.remove("nothighlight");
        p9.classList.add("highlight");
    }
    if (tempdate > per9[0] && tempdate < per9[1]) {
        p9.children[1].innerHTML = "Ending in " + msToTime(per9[1] - tempdate);
        p9.classList.remove("nothighlight");
        p9.classList.add("highlight");
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