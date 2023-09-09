document.addEventListener('DOMContentLoaded', function () { initiate(); });

function initiate() {

    let bgNum = Math.floor(Math.random() * 4);
    let link = "./assets/bg" + bgNum + ".png";

    let xy = [
        [600, 443],
        [1008, 756],
        [1112, 826],
        [1008, 756]
    ];

    let wide;
    let bg = document.getElementById("bg");

    bg.style.backgroundImage = "url(" + link + ")";

    if ($(window).width() * xy[bgNum][1] < $(window).height() * xy[bgNum][0]) {
        $(bg).css("background-size", "auto 110%");
        wide = false;
    }
    else {
        $(bg).css("background-size", "110% auto");
        wide = true;
    }

    $(window).resize((e) => {
        if ($(window).width() * xy[bgNum][1] < $(window).height() * xy[bgNum][0]) {
            $(bg).css("background-size", "auto 110%");
            wide = false;
        }
        else {
            $(bg).css("background-size", "110% auto");
            wide = true;
        }
        let temp = wide ? $(window).width() * 1.1 : ($(window).height() * 1.1) * (xy[bgNum][0] / xy[bgNum][1]);
        bg.style.backgroundPositionX = $(window).width() / 2 - temp / 2 + "px";
        temp = wide ? ($(window).width() * 1.1) * (xy[bgNum][1] / xy[bgNum][0]) : $(window).height() * 1.1;
        bg.style.backgroundPositionY = $(window).height() / 2 - temp / 2 + "px";
    });

    $(document).mousemove((e) => {
        let temp = wide ? $(window).width() * 1.1 : ($(window).height() * 1.1) * (xy[bgNum][0] / xy[bgNum][1]);
        bg.style.backgroundPositionX = $(window).width() / 2 - temp / 2 - (e.clientX * 0.01) + "px";
        temp = wide ? ($(window).width() * 1.1) * (xy[bgNum][1] / xy[bgNum][0]) : $(window).height() * 1.1;
        bg.style.backgroundPositionY = $(window).height() / 2 - temp / 2 - (e.clientY * 0.01) + "px";
    });
}
