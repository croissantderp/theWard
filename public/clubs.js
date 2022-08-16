document.addEventListener('DOMContentLoaded', function () { initiate4(); });

var clubList;
var clubItemList = [];

function initiate4() {
    clubList = document.getElementById("clubs");

    $.get("./assets/clubs.txt", function (data) {
        let clubs = data.split("\n");
        for (let i = 0; i < clubs.length - 1; i++) {
            let club = clubs[i].split("\t");
            let clubItem = document.createElement("tr");
            clubItem.innerHTML = "<td>" + club[0] + "</td><td>" + club[1] + "</td><td>" + club[2] + "</td><td>" + club[3] + "</td><td>" + club[4] + "</td>";
            clubList.appendChild(clubItem);
            clubItemList.push(clubItem);
        }
    });

    //Listen for the event
    $("input#search").on("keyup", function (e) {
        // Set Search String
        query = $(this).val();
        clubList.innerHTML = "<tr><th><b>title</b></th><th><b>teacher</b></th><th><b>day</b></th><th><b>time</b></th><th><b>location</b></th></tr>"
        for (let i = 0; i < clubItemList.length; i++) {
            console.log(clubItemList[i].innerHTML.toLowerCase());
            if (clubItemList[i].innerHTML.toLowerCase().includes(query.toString().toLowerCase())) {
                clubList.appendChild(clubItemList[i]);
            }
        }
    });

}
