function isFormFilled() {
    var y = document.getElementById('coordinate_y').value;
    var x = document.getElementById('coordinate_x').value;
    var radius = document.getElementById('radius').value;
    if (y == "" || y < -3 || y > 3) {
        alert("Некорректное значение координаты У");
        return false;
    }
    if (x == "" || x < -3 || x > 5) {
        alert("Некорректное значение координаты X");
        return false;
    }
    if (radius == "" || radius < 2 || radius > 5) {
        alert("Некорректное значение переменной R");
        return false;
    }
    return true;
}

function charCheckY() {
  document.getElementById("coordinate_y").onkeypress = function(e) {
    var chr = String.fromCharCode(e.which);
    if ("1234567890.-".indexOf(chr) < 0)
        return false;
    }
}

function charCheckX() {
    document.getElementById("coordinate_x").onkeypress = function(e) {
        var chr = String.fromCharCode(e.which);
        if ("1234567890.-".indexOf(chr) < 0)
            return false;
    }
}

function charCheckR() {
    document.getElementById("radius").onkeypress = function(e) {
        var chr = String.fromCharCode(e.which);
        if ("1234567890.-".indexOf(chr) < 0)
            return false;
    }
}