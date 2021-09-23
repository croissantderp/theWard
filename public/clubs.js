document.addEventListener('DOMContentLoaded', function () { initiate4(); });

var clubList;

function initiate4() {
    clubList = document.getElementById("clubs");

    $.get("./assets/clubs.json", function (data) {
        let clubs = data;
        for (let i = 0; i < clubs.length - 1; i++) {
            let club = clubs[i];
            let clubItem = document.createElement("tr");
            clubItem.innerHTML = "<td>" + club[0] + "</td><td>" + club[1] + "</td><td>" + club[2] + "</td><td>" + club[3] + "</td><td>" + club[4] + "</td>";
            clubList.appendChild(clubItem);
        }
    });
}
