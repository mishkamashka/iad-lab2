var R = 3;
var canvas, context;
k = 50;
x_val = [];
y_val = [];

window.onload = function () {
    canvasFill();
    initiateGraph();
};

function initiateGraph() {
    canvas = document.getElementById("graph");
    context = canvas.getContext("2d");
}

function canvasFill() {
    canvas = document.getElementById("graph");
    canvas.width = canvas.width;
    context = canvas.getContext("2d");
    if (R > 0) {
        drawFigure(context);
    }
    drawAxis(context);
}

function setPoint(event) {
    canvas = document.getElementById("graph");
    rect = canvas.getBoundingClientRect();
    offset = (rect.width - canvas.width) / 2 + 1;
    x = event.clientX - rect.left - offset;
    y = event.clientY - rect.top - offset;
    real_x = (x - 300) / k;
    real_y = -(y - 300) / k;
    x_val.push(real_x);
    y_val.push(real_y);
    doXYRequest(real_x, real_y);
}

function drawPoint(context, x, y, doesBelong) {
    context.beginPath();
    if (doesBelong) {
        context.fillStyle = "Blue";
    }
    else {
        context.fillStyle = "Red";
    }
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fill();
}

function drawAxis(context) {

    context.beginPath();
    //Draw axis
    context.strokeStyle = "#666666";
    context.moveTo(0, 300);
    context.lineTo(600, 300);
    context.moveTo(300, 0);
    context.lineTo(300, 600);
    context.closePath();
    context.stroke();
    //Draw arrows
    context.beginPath();
    context.strokeStyle = "black";
    context.moveTo(590, 290);
    ;
    context.lineTo(600, 300);
    context.lineTo(590, 310);

    context.moveTo(290, 10);
    context.lineTo(300, 0);
    context.lineTo(310, 10);
    //Do the stroke

    context.stroke();
    context.closePath();
    //Label axis
    context.font = "22px Georgia";
    context.textBaseline = "top";
    context.textAlign = "left";
    context.fillStyle = "black";
    context.fillText("Y", 310, 0);
    context.fillText("X", 585, 310);

    //Draw measures if radius is set
    if (R > 0) {
        context.beginPath();
        pixelsForRadius = R * k;
        //Draw x measures
        context.moveTo(300 - pixelsForRadius, 295);
        context.lineTo(300 - pixelsForRadius, 305);
        context.moveTo(300 - pixelsForRadius / 2, 295);
        context.lineTo(300 - pixelsForRadius / 2, 305);
        context.moveTo(300 + pixelsForRadius, 295);
        context.lineTo(300 + pixelsForRadius, 305);
        context.moveTo(300 + pixelsForRadius / 2, 295);
        context.lineTo(300 + pixelsForRadius / 2, 305);
        context.strokeStyle = "black";
        context.stroke();
        //Draw y measures
        context.moveTo(295, 300 - pixelsForRadius);
        context.lineTo(305, 300 - pixelsForRadius);
        context.moveTo(295, 300 - pixelsForRadius / 2);
        context.lineTo(305, 300 - pixelsForRadius / 2);
        context.moveTo(295, 300 + pixelsForRadius);
        context.lineTo(305, 300 + pixelsForRadius);
        context.moveTo(295, 300 + pixelsForRadius / 2);
        context.lineTo(305, 300 + pixelsForRadius / 2);
        context.stroke();
        context.closePath();
    }
}

function drawFigure(context) {
    pixelsForRadius = R * k;
    context.beginPath();
    context.fillStyle = "#5c99ED";
    context.strokeStyle = "#5c99ED";
    //Bottom-Left
    context.moveTo(300, 299 - pixelsForRadius / 2);
    context.lineTo(299 + pixelsForRadius / 2, 300);
    context.lineTo(299, 299);
    context.fill();
    //Top-Left
    context.fillRect(301 - pixelsForRadius, 301 - pixelsForRadius, pixelsForRadius - 1, pixelsForRadius - 1);
    //Bottom-Right
    context.closePath();
    context.beginPath();
    context.arc(299, 301, pixelsForRadius - 1, 0.5 * Math.PI, 1.5 * Math.PI);
    context.closePath();
    context.fill();
}

function clearList() {
    $.ajax({
            type: "post",
            url: "controllerServlet",
            data: {
                doSave: -1
            },
            success: (onAjaxSuccess)
        }
    );

    function clear(result) {
        var table = document.getElementById("results");
        var length = table.rows.length;
        for (var i = 1; i < length; ++i) //keeping the heading
        {
            table.deleteRow(1);
        }
        canvasFill();
    }
}

function submitXYAction() {
    if (isXYFormValid()) {
        var x_value = Number(document.getElementById('coordinate_x').value);
        var y_value = Number(document.getElementById('coordinate_y').value);
        doXYRequest(x_value, y_value);
    }
}

function submitRAction() {
    if (isRFormValid()) {
        var radius = Number(document.getElementById('radius').value);
        if (Number(R) != radius) {
            doRRequest(radius);
            R = radius;
        }
    }
}

function doXYRequest(x, y) {
    $.ajax({
            type: "post",
            url: "controllerServlet",
            data: {
                coordinate_x: x,
                coordinate_y: y,
                doSave: 1
            },
            success: (onAjaxSuccess)
        }
    );

}

function doRRequest(radius) {
    $.ajax({
            type: "post",
            url: "controllerServlet",
            data: {
                radius: radius,
                doSave: 0
            },
            success: (onAjaxSuccess)
        }
    );
}

function onAjaxSuccess(data) {
    var return_data = JSON.parse(data);
    context = canvas.getContext("2d");
    row = document.getElementById('results');
    var x, y;
    if (return_data.length > 1) {
        for (i = 0; i < return_data.length - 1; i++) {
            x = return_data[i].x * k + 300;
            y = return_data[i].y * k + 300;
            drawPoint(context, x, y, return_data[i].isInArea);

            var newRow = document.createElement('div');
            newRow.setAttribute('class', 'row');
            newRow.innerHTML = '<div class =\"cell\" data-title=\"X\">' + return_data[i].x + '</div>' +
                '<div class =\"cell\" data-title=\"Y\">' + return_data[i].y + '</div>' +
                '<div class =\"cell\" data-title=\"R\">' + return_data[i].radius + '</div>' +
                '<div class =\"cell\" data-title=\"Result\">' + return_data[i].isInArea + '</div>' +
                '</div>';
            row.appendChild(newRow);
        }
    } else {
        row.innerHTML = '<div class=\"row header__table\">' +
            '<div class=\"cell\">X</div>' +
            '<div class=\"cell\">Y</div>' +
            '<div class=\"cell\">R</div>' +
            '<div class=\"cell\">Result</div>' +
            '</div>';
        canvasFill();
    }
    errorMsg = return_data[return_data.length - 1].errorMsg;
    if (errorMsg != "") {
        error = document.getElementById("error_msg");
        error.innerText = errorMsg;
    }


}
