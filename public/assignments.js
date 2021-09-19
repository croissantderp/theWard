document.addEventListener('DOMContentLoaded', function () { initiate3(); });

var aDiv;
var last;

function initiate3() {

    let amount = localStorage.length;

    aDiv = document.getElementById("assignments");

    for (let i = 0; i < amount / 3; i++) {
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
        assignment.innerHTML = '<input type = "checkbox" placeholder="false" ' + (localStorage.getItem(amount.toString() + "check") == "true" ? "checked" : "") + '/> <input type="text" placeholder="assignment name" value="' + localStorage.getItem(amount.toString() + "name") + '" /> <input type="date" value="' + localStorage.getItem(amount.toString() + "date") + '" /> <input type="button" value="remove" />';

        assignment.children[3].onclick = function () { aDiv.removeChild(this.parentNode); save(); };
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
    localStorage.clear();
    for (let i = 0; i < aDiv.children.length - 1; i++) {
        localStorage.setItem(i.toString() + "check", $(aDiv.children[i].children[0]).is(":checked"));
        localStorage.setItem(i.toString() + "name", $(aDiv.children[i].children[1]).val());
        localStorage.setItem(i.toString() + "date", $(aDiv.children[i].children[2]).val());
    }
}