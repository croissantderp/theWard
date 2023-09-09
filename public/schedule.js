document.addEventListener('DOMContentLoaded', function () { initiate2(); });

const bellTones = {
    "c1": new Audio("./assets/bell_c1.mp3"),
    "c#1": new Audio("./assets/bell_cs1.mp3"),
    "d1": new Audio("./assets/bell_d1.mp3"),
    "d#1": new Audio("./assets/bell_ds1.mp3"),
    "e1": new Audio("./assets/bell_e1.mp3"),
    "f1": new Audio("./assets/bell_f1.mp3"),
    "f#1": new Audio("./assets/bell_fs1.mp3"),
    "g1": new Audio("./assets/bell_g1.mp3"),
    "g#1": new Audio("./assets/bell_gs1.mp3"),
    "a1": new Audio("./assets/bell_a1.mp3"),
    "a#1": new Audio("./assets/bell_as1.mp3"),
    "b1": new Audio("./assets/bell_b1.mp3"),
    "c2": new Audio("./assets/bell_c2.mp3"),
    "c#2": new Audio("./assets/bell_cs2.mp3"),
    "d2": new Audio("./assets/bell_d2.mp3"),
    "d#2": new Audio("./assets/bell_ds2.mp3"),
    "e2": new Audio("./assets/bell_e2.mp3"),
    "f2": new Audio("./assets/bell_f2.mp3"),
    "f#2": new Audio("./assets/bell_fs2.mp3"),
    "g2": new Audio("./assets/bell_g2.mp3"),
    "g#2": new Audio("./assets/bell_gs2.mp3"),
    "a2": new Audio("./assets/bell_a2.mp3"),
    "a#2": new Audio("./assets/bell_as2.mp3"),
    "b2": new Audio("./assets/bell_b2.mp3"),
    "c3": new Audio("./assets/bell_c3.mp3"),
};

let clockFollower = -2;
let bellOn = false;
let isHover = false;
let keys = [];

//note: this stores the first day of the week where there is a Friday A
const fridayAs = [
    "2023-9-4",
    "2023-9-18",
    "2023-9-25",
    "2023-10-2",
    "2023-10-9",
    "2023-10-23",
    "2023-11-27",
    "2023-12-18",
    "2024-1-8",
    "2024-1-15",
    "2024-2-5",
    "2024-2-26",
    "2024-3-11",
    "2024-4-1",
    "2024-4-8",
    "2024-4-15",
    "2024-4-29",
    "2024-5-13",
    "2024-5-27",
    "2024-6-17",
];

const daysOff = [
    "2023-9-4",
    "2023-9-25",
    "2023-10-9",
    "2023-11-7",
    "2023-11-10",
    "2023-11-22",
    "2023-11-23",
    "2023-11-24",
    "2023-12-25",
    "2023-12-26",
    "2023-12-27",
    "2023-12-28",
    "2023-12-29",
    "2024-1-1",
    "2024-1-2",
    "2024-1-15",
    "2024-2-19",
    "2024-2-20",
    "2024-2-21",
    "2024-2-22",
    "2024-2-23",
    "2024-4-1",
    "2024-4-10",
    "2024-4-22",
    "2024-4-23",
    "2024-4-24",
    "2024-4-25",
    "2024-5-24",
    "2024-5-27",
    "2024-6-19",
];

let ABSwitch;
let bellSwitch;
let isA = false;
let todayoff = false;
const startDate = new Date("2023-9-5");
const endDate = new Date("2024-6-26");
let per = [
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")],
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")],
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")],
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")],
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")],
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")],
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")],
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")],
    [new Date("1971", "2", "1"), new Date("1971", "2", "1")]];

let p = [];

function initiate2() {
    //from https://stackoverflow.com/questions/11887934/how-to-check-if-dst-daylight-saving-time-is-in-effect-and-if-so-the-offset
    Date.prototype.stdTimezoneOffset = function () {
        let jan = new Date(this.getFullYear(), 0, 1);
        let jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }

    Date.prototype.isDstObserved = function () {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }

    let today = new Date();

    setTimeout(function () { document.getElementById("reloadIndicator").innerHTML = "Reload to see more accurate information"; }, 12 * 60 * 60 * 1000)

    if (!today.isDstObserved()) {
        per[0][0].setUTCHours(12, 5);
        per[0][1].setUTCHours(12, 45);

        per[1][0].setUTCHours(12, 49);
        per[1][1].setUTCHours(13, 29);

        per[2][0].setUTCHours(13, 33);
        per[2][1].setUTCHours(14, 18);

        per[3][0].setUTCHours(14, 22);
        per[3][1].setUTCHours(15, 2);

        per[4][0].setUTCHours(15, 6);
        per[4][1].setUTCHours(15, 46);

        per[5][0].setUTCHours(15, 50);
        per[5][1].setUTCHours(16, 30);

        per[6][0].setUTCHours(16, 34);
        per[6][1].setUTCHours(17, 14);

        per[7][0].setUTCHours(17, 18);
        per[7][1].setUTCHours(17, 58);

        per[8][0].setUTCHours(18, 2);
        per[8][1].setUTCHours(18, 46);
    }
    else {
        per[0][0].setUTCHours(11, 5);
        per[0][1].setUTCHours(11, 45);

        per[1][0].setUTCHours(11, 49);
        per[1][1].setUTCHours(12, 29);

        per[2][0].setUTCHours(12, 33);
        per[2][1].setUTCHours(13, 18);

        per[3][0].setUTCHours(13, 22);
        per[3][1].setUTCHours(14, 2);

        per[4][0].setUTCHours(14, 6);
        per[4][1].setUTCHours(14, 46);

        per[5][0].setUTCHours(14, 50);
        per[5][1].setUTCHours(15, 30);

        per[6][0].setUTCHours(15, 34);
        per[6][1].setUTCHours(16, 14);

        per[7][0].setUTCHours(16, 18);
        per[7][1].setUTCHours(16, 58);

        per[8][0].setUTCHours(17, 2);
        per[8][1].setUTCHours(17, 46);
    }

    ABSwitch = document.getElementById("ABSwitch");
    bellSwitch = document.getElementById("audio");

    for (let i = 0; i < 9; i++) {
        let temp = document.getElementById((i + 1).toString());

        let object = {
            i: i
        }
        let copy = $.extend(true, {}, object);

        $(temp.children[0]).on("change", function () {
            let text = $(temp.children[0]).val();
            if (text == "") {
                temp.children[0].value = "Period " + (copy.i + 1);
            }
            localStorage.setItem("period" + copy.i + (ABSwitch.value == "Switch to B Schedule" ? "A" : ""), text);
        });
        
        p.push(temp);
    }

    checkDay();

    if (isA) {
        ABSwitch.value = "Switch to B Schedule";
    }
    else {
        ABSwitch.value = "Switch to A Schedule";
    }

    for (let i = 0; i < 9; i++) {
        let gottem = localStorage.getItem(isA ? "period" + i + "A" : "period" + i);
        p[i].children[0].value = gottem == null || gottem == "" ? "Period " + (i + 1) : gottem;

        if (ABSwitch.value == "Switch to B Schedule") {
            p[i].children[0].classList.add("red2");
        }
        else {
            p[i].children[0].classList.add("blue2");
        }
    }

    $(ABSwitch).on("click", function () {
        if (ABSwitch.value == "Switch to B Schedule") {
            ABSwitch.value = "Switch to A Schedule";
        }
        else {
            ABSwitch.value = "Switch to B Schedule";
        }
        setPeriods();
    });

    $(bellSwitch).hover(function () {
        if (isHover) {
            isHover = false;
        }
        else {
            isHover = true;
        }
    });

    $(document).on("keydown", function (e) {
        if (isHover) {
            keys[e.which] = true;

            checkNotes(e.which);
        }
    });

    $(document).on("keyup", function (e) {
        if (isHover) {
            keys[e.which] = false;
            checkNotes(e.which);
        }
    });

    $(bellSwitch).on("click", function () {
        if (bellSwitch.value == "disable bell") {
            bellSwitch.value = "enable bell";
            bellOn = false;
        }
        else {
            bellSwitch.value = "disable bell";
            bellOn = true;
        }
    });

    setPeriods();

    displayPeriod();
    setInterval(displayPeriod, 1000);
}

function checkNotes(i) {
    if (keys[i] == true) {
        switch (i) {
            case 49:
                playNote("c");
                break;
            case 50:
                playNote("c#");
                break;
            case 51:
                playNote("d");
                break;
            case 52:
                playNote("d#");
                break;
            case 53:
                playNote("e");
                break;
            case 54:
                playNote("f");
                break;
            case 55:
                playNote("f#");
                break;
            case 56:
                playNote("g");
                break;
            case 57:
                playNote("g#");
                break;
            case 48:
                playNote("a");
                break;
            case 189:
                playNote("a#");
                break;
            case 187:
                playNote("b");
                break;
            case 192:
                playNote("c3", true);
                break;
        }
    }
    else {
        switch (i) {
            case 49:
                stopNote("c");
                break;
            case 50:
                stopNote("c#");
                break;
            case 51:
                stopNote("d");
                break;
            case 52:
                stopNote("d#");
                break;
            case 53:
                stopNote("e");
                break;
            case 54:
                stopNote("f");
                break;
            case 55:
                stopNote("f#");
                break;
            case 56:
                stopNote("g");
                break;
            case 57:
                stopNote("g#");
                break;
            case 48:
                stopNote("a");
                break;
            case 189:
                stopNote("a#");
                break;
            case 187:
                stopNote("b");
                break;
            case 192:
                stopNote("c3", true);
                break;
        }
    }
}

function playNote(code, override = false) {
    if (!override) {
        if (keys[16] == true) {
            code += "2";
        }
        else {
            code += "1";
        }
    }
    bellTones[code].play();
}

function stopNote(code, override = false) {

    setTimeout(function () {
        if (!override) {
            if (keys[16] == true) {
                code += "2";
            }
            else {
                code += "1";
            }
        }
        bellTones[code].pause();
        bellTones[code].currentTime = 0;
    }, 100);
}

function setPeriods() {
    for (let i = 0; i < 9; i++) {
        if (ABSwitch.value == "Switch to B Schedule") {
            let gottem = localStorage.getItem("period" + i + "A");
            p[i].children[0].value = gottem == null || gottem == "" ? "Period " + (i + 1) : gottem;
            p[i].children[0].classList.add("red2");
            p[i].children[0].classList.remove("blue2");
        }
        else {
            let gottem = localStorage.getItem("period" + i);
            p[i].children[0].value = gottem == null || gottem == "" ? "Period " + (i + 1) : gottem;
            p[i].children[0].classList.add("blue2");
            p[i].children[0].classList.remove("red2");
        }
    }
}

function checkDay() {
    let date = toUTC(new Date());

    if (startDate <= date && new Date(date.toDateString()) <= endDate) {
        if (daysOff.indexOf(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()) == -1) {

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
                    let prevMonday = new Date();
                    prevMonday.setDate(prevMonday.getDate() - 4);
                    if (fridayAs.indexOf(prevMonday.getFullYear() + "-" + (prevMonday.getMonth() + 1) + "-" + prevMonday.getDate()) != -1) {
                        setA();
                    }
                    break;
                case 6:
                    setNone();
                    break;
            }

            return;
        }

    }

    setNone();
}

function tmNone(date, today = false) {
    date.setDate(date.getDate() + (today ? 0 : 1));
    if (startDate < date && date < endDate) {
        if (date.getDay() != 0 && date.getDay() != 6) {
            if (daysOff.indexOf(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()) == -1) {
                return false;
            }
        }
    }
    return true;
}

function toUTC(date) {
    let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
}

function setNone() {
    todayoff = true;
    document.getElementById("neverGonnaGiveYouUp").innerHTML = "No school today";

    for (let i = 0; i < 9; i++) {
        if (p[i].classList.contains("highlight")) p[i].classList.remove("highlight");
        if (!p[i].classList.contains("nothighlight")) p[i].classList.add("nothighlight");
        if (p[i].children[1].innerHTML != "") p[i].children[1].innerHTML = "";
    }
}

function setA() {
    todayoff = false;
    isA = true;
    let dayType = document.getElementById("type");

    dayType.innerHTML = "A";
    document.getElementById("a/an").innerHTML = "an";
    dayType.classList.remove("blue");
    dayType.classList.add("red");
}

function displayPeriod() {
    let noSchool = false;
    checkDay();

    if (todayoff) {
        if (!tmNone(new Date())) {
            noSchool = true;
        }
        else {
            return;
        }
    }

    let date = new Date();
    date.setUTCFullYear("1971", "2", "1");
    let tempdate = toUTC(date);

    let currentP = -1;
    let none = true;
    let closestP;
    let closest = 100000000000000000000000000;
    if (!noSchool) {
        for (let i = 0; i < 9; i++) {
            let temp = per[i][0] - tempdate;
            if (temp > 0 && temp < closest) {
                closestP = i;
                closest = temp;
            }

            if (tempdate >= per[i][0] && tempdate < per[i][1]) {
                currentP = i;
                p[i].children[1].innerHTML = "Ending in " + msToTime(per[i][1] - tempdate);
                p[i].classList.remove("nothighlight");
                p[i].classList.add("highlight");
                none = false;
            }
            else {
                if (p[i].classList.contains("highlight")) p[i].classList.remove("highlight");
                if (!p[i].classList.contains("nothighlight")) p[i].classList.add("nothighlight");
                if (p[i].children[1].innerHTML != "") p[i].children[1].innerHTML = "";
            }
        }
    }


    if (clockFollower == -2) {
        clockFollower = currentP;
    }
    else if (clockFollower != currentP) {
        if (bellOn) {
            console.log("bell!");
            playNote("c1", true);
        }
        clockFollower = currentP;
    }

    let offset = new Date().getTimezoneOffset();
    let time = new Date(per[8][1].toLocaleString());

    time.setMinutes(per[8][1].getMinutes());
    date.setMinutes(date.getMinutes());

    if (noSchool) {
        if (date <= time) {
            let temptempdate = per[0][0] - tempdate < 0 ? new Date(per[0][0]).setDate(per[0][0].getDate() + 1) : per[0][0];

            p[0].children[1].innerHTML = "Beginning in " + msToTime(temptempdate - tempdate);
        }
        return;
    }

    if (none) {
        if (date > time) {
            p[8].children[1].innerHTML = "Ended " + msToTime(date - time) + " ago";
        }
        else if ((!tmNone(new Date()) || !tmNone(new Date(), true)) && tempdate < per[8][1]) {

            console.log(tempdate + "," + per[8][1]);
            p[closestP].children[1].innerHTML = "Beginning in " + msToTime(closest);
        }
    }
}

//from https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}