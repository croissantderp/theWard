document.addEventListener('DOMContentLoaded', function () { initiate3(); });

var aDiv;
var last;
var info = [[]];

function initiate3() {

    info = JSON.parse(localStorage.getItem("assignments"));
    let amount = info == null ? 0 : info.length;

    aDiv = document.getElementById("assignments").children[1];

    for (let i = 0; i < amount; i++) {
        add(false, i);
    }

    last = add(true);

}

function addLast(object) {
    if (object == last) {
        object.children[3].disabled = false;
        last = add(true);
    }
}

function add(local, amount = 0) {
    let assignment = document.createElement("div");
    if (local) {
        assignment.innerHTML = '<input type = "checkbox" placeholder="false" /> <input type="text" placeholder="assignment name" value="" /> <input type="date" value="" /> <input type="button" value="remove" />';

        assignment.children[3].onclick = function () { aDiv.removeChild(this.parentNode); save(); };
        assignment.children[3].disabled = true;

        //Listen for the events
        $(assignment.children[0]).on("click", function (e) {
            if ($(assignment.children[0]).is(":checked")) {
                assignment.children[1].disabled = true;
                assignment.children[2].disabled = true;
            }
            else {
                assignment.children[1].disabled = false;
                assignment.children[2].disabled = false;
            }

            save();
            addLast(assignment);
        });

        $(assignment.children[1]).on("keyup", function (e) {
            save();
            addLast(assignment);
        });

        $(assignment.children[2]).on("change", function (e) {
            save();
            addLast(assignment);
        });
    }
    else {
        assignment.innerHTML = '<input type = "checkbox" placeholder="false" ' + (info[amount][0] == "true" ? "checked" : "") + '/> <input type="text" placeholder="assignment name" value="' + info[amount][1] + '" /> <input type="date" value="' + info[amount][2] + '" /> <input type="button" value="remove" />';
        
        assignment.children[3].onclick = function () {
            aDiv.removeChild(this.parentNode);
            save();
        };
        //Listen for the events
        $(assignment.children[0]).on("click", function (e) {
            if ($(assignment.children[0]).is(":checked")) {
                assignment.children[1].disabled = true;
                assignment.children[2].disabled = true;
            }
            else {
                assignment.children[1].disabled = false;
                assignment.children[2].disabled = false;
            }

            save();
        });

        if ($(assignment.children[0]).is(":checked")) {
            assignment.children[1].disabled = true;
            assignment.children[2].disabled = true;
        }

        $(assignment.children[1]).on("keyup", function (e) {

            save();
        });

        $(assignment.children[2]).on("change", function (e) {

            save();
        });
    }

    aDiv.appendChild(assignment);

    return assignment;
}

function save() {
    var info2 = [];
    for (let i = 0; i < aDiv.children.length - 1; i++) {
        info2[i] = [];
        info2[i][0] = $(aDiv.children[i].children[0]).is(":checked");
        info2[i][1] = $(aDiv.children[i].children[1]).val();
        info2[i][2] = $(aDiv.children[i].children[2]).val();
    }
    localStorage.setItem("assignments", JSON.stringify(info2));
}