document.addEventListener('DOMContentLoaded', function () { initiate(); });

function initiate() {
    var wide;
    let bg = document.getElementById("bg");
    if ($(window).width() * 443 < $(window).height() * 600) {
        $(bg).css("background-size", "auto 110%");
        wide = false;
    }
    else {
        $(bg).css("background-size", "110% auto");
        wide = true;
    }

    $(window).resize((e) => {
        if ($(window).width() * 443 < $(window).height() * 600) {
            $(bg).css("background-size", "auto 110%");
            wide = false;
        }
        else {
            $(bg).css("background-size", "110% auto");
            wide = true;
        }
        let temp = wide ? $(window).width() * 1.1 : ($(window).height() * 1.1) * (600 / 443);
        bg.style.backgroundPositionX = $(window).width() / 2 - temp / 2 + "px";
        temp = wide ? ($(window).width() * 1.1) * (443 / 600) : $(window).height() * 1.1;
        bg.style.backgroundPositionY = $(window).height() / 2 - temp / 2 + "px";
    });

    $(document).mousemove((e) => {
        let temp = wide ? $(window).width() * 1.1 : ($(window).height() * 1.1) * (600 / 443);
        bg.style.backgroundPositionX = $(window).width() / 2 - temp / 2 - (e.clientX * 0.01) + "px";
        temp = wide ? ($(window).width() * 1.1) * (443 / 600) : $(window).height() * 1.1;
        bg.style.backgroundPositionY = $(window).height() / 2 - temp / 2 - (e.clientY * 0.01) + "px";
    });
}
