function isFormFilled() {
  var y = document.getElementById('coordinate_y').value;
    if (y == "") { // check borders
        alert("Не введено значение координаты У");
        return false;
    }
    return true;
}

function charCheck() {
  document.getElementById("coordinate_y").onkeypress = function(e) {
    var chr = String.fromCharCode(e.which);
    if ("1234567890.-".indexOf(chr) < 0)
        return false;
    }
}
