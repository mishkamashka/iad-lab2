var R = 3;
var graphWidth;
var canvas, context;
k = 40;

window.onload = function () {
    canvasFill();
    initiateGraph();
};

window.onresize = function () {
    canvas = document.getElementById("graph");
    graphWidth = canvas.width;
    context = canvas.getContext("2d");
}

function initiateGraph() {
    canvas = document.getElementById("graph");
    context = canvas.getContext("2d");
}

function canvasFill() {
    canvas = document.getElementById("graph");
    graphWidth = canvas.width;
    context = canvas.getContext("2d");
    if (R > 0) {
        drawFigures(context);
    }
    drawAxis(context);
}

function setPoint(event) {
    canvas = document.getElementById("graph");
    rect = canvas.getBoundingClientRect();
    offset = (rect.width - canvas.width) / 2 + 1;
    x = event.clientX - rect.left - offset;
    y = event.clientY - rect.top - offset;
    real_x = (x - graphWidth / 2) / k;
    real_y = -(y - graphWidth / 2) / k;
    doXYRequest(real_x, real_y);
}

function drawPoint(context, x, y, doesBelong) {
    context.beginPath();
    if (doesBelong == "true") {
        context.fillStyle = "Blue";
    }
    else {
        context.fillStyle = "Red";
    }
    context.arc(x, graphWidth - y, 3, 0, 2 * Math.PI);
    context.fill();
}

function drawAxis(context) {
    context.beginPath();
    //Draw axis
    context.moveTo(0, graphWidth / 2);
    context.lineTo(graphWidth, graphWidth / 2);
    context.moveTo(graphWidth / 2, 0);
    context.lineTo(graphWidth / 2, graphWidth);
    context.closePath();
    context.strokeStyle = "black";
    context.stroke();

    //Draw arrows
    context.beginPath();
    context.moveTo(graphWidth - 10, graphWidth / 2 - 10);
    context.lineTo(graphWidth, graphWidth / 2);
    context.lineTo(graphWidth - 10, graphWidth / 2 + 10);

    context.moveTo(graphWidth / 2 - 10, 10);
    context.lineTo(graphWidth / 2, 0);
    context.lineTo(graphWidth / 2 + 10, 10);

    //Do the stroke
    context.strokeStyle = "black";
    context.stroke();

    //Label axis
    context.font = "22px Courier";
    context.textBaseline = "top";
    context.textAlign = "left";
    context.fillStyle = "black";
    context.fillText("Y", graphWidth / 2 + 10, 0);
    context.fillText("X", graphWidth - 20, graphWidth / 2 + 10);

    //Draw measures if radius is set
    if (Number(R) > 0) {
        context.beginPath();
        pixelsForRadius = Number(R) * k;

        //Draw measures
        for (l = 40; l < graphWidth / 2 - 20; l = l + 40) {
            context.moveTo(graphWidth / 2 - l, graphWidth / 2 - 5);
            context.lineTo(graphWidth / 2 - l, graphWidth / 2 + 5);
            context.moveTo(graphWidth / 2 - (l - 20), graphWidth / 2 - 2);
            context.lineTo(graphWidth / 2 - (l - 20), graphWidth / 2 + 2);
            context.moveTo(graphWidth / 2 + l, graphWidth / 2 - 5);
            context.lineTo(graphWidth / 2 + l, graphWidth / 2 + 5);
            context.moveTo(graphWidth / 2 + (l - 20), graphWidth / 2 - 2);
            context.lineTo(graphWidth / 2 + (l - 20), graphWidth / 2 + 2);

            context.moveTo(graphWidth / 2 - 5, graphWidth / 2 - l);
            context.lineTo(graphWidth / 2 + 5, graphWidth / 2 - l);
            context.moveTo(graphWidth / 2 - 2, graphWidth / 2 - (l - 20));
            context.lineTo(graphWidth / 2 + 2, graphWidth / 2 - (l - 20));
            context.moveTo(graphWidth / 2 - 5, graphWidth / 2 + l);
            context.lineTo(graphWidth / 2 + 5, graphWidth / 2 + l);
            context.moveTo(graphWidth / 2 - 2, graphWidth / 2 + (l - 20));
            context.lineTo(graphWidth / 2 + 2, graphWidth / 2 + (l - 20));
        }
        context.strokeStyle = "black";
        context.stroke();
    }
}

function drawFigures(context) {
    pixelsForRadius = R * 40;
    context.beginPath();
    context.fillStyle = "#5c99ED";
    context.strokeStyle = "#5c99ED";
    //Bottom-Left
    context.moveTo(graphWidth / 2, graphWidth / 2 - 1 - pixelsForRadius / 2);
    context.lineTo(graphWidth / 2 - 1 + pixelsForRadius / 2, graphWidth / 2);
    context.lineTo(graphWidth / 2 - 1, graphWidth / 2 - 1);
    context.fill();
    //Top-Left
    context.fillRect(graphWidth / 2 + 1 - pixelsForRadius, graphWidth / 2 + 1 - pixelsForRadius, pixelsForRadius - 1, pixelsForRadius - 1);
    //Bottom-Right
    context.closePath();
    context.beginPath();
    context.arc(graphWidth / 2 - 1, graphWidth / 2 + 1, pixelsForRadius - 1, 0.5 * Math.PI, 1.5 * Math.PI);
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
    row.innerHTML = '<div class=\"row header__table\">' +
        '<div class=\"cell\">X</div>' +
        '<div class=\"cell\">Y</div>' +
        '<div class=\"cell\">R</div>' +
        '<div class=\"cell\">Result</div>' +
        '</div>';
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvasFill();
    if (return_data.length > 1) {
        for (i = 0; i < return_data.length - 1; i++) {
            x = return_data[i].x * k + graphWidth / 2;
            y = return_data[i].y * k + graphWidth / 2;
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
    }
    errorMsg = return_data[return_data.length - 1].errorMsg;
    error = document.getElementById("error_msg");
    error.innerText = errorMsg;
}
