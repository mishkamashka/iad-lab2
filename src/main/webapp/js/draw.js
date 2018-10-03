var R = 3;
var canvas, context;
k = 50;
x_val = [];
y_val = [];


window.onload = function () {
    setRadius();
    canvasFill();
    initiateGraph();
};

function initiateGraph() {
    canvas = document.getElementById("graph");
    context = canvas.getContext("2d");
    // var table = document.getElementById("results");
    // var length = table.rows.length;
    // var mostRecentIndex = 1;

    /*for (var i = 2; i < length; ++i)
    {
        var rowPrev = table.rows[i - 1];
        var rowCurr = table.rows[i];
        if (parseFloat(rowPrev.cells[2].innerHTML) != parseFloat(rowCurr.cells[2].innerHTML))
        {
            mostRecentIndex = i;
        }
    }*/

    // for (var i = mostRecentIndex; i < length; ++i) {
    //     var row = table.rows[i];
    //     var X = parseFloat(row.cells[0].innerHTML);
    //     var Y = parseFloat(row.cells[1].innerHTML);
    //     doRequest([X], [Y], 0);
    // }
}


function setRadius() {
    r = document.getElementById('radius').value;
    if (r == "") {
        R = 3;
    } else {
        R = r;
    }
}

function clear1() {
    $.ajax({
            type: "get",
            url: "/lab7/controller",
            data: {
                delete: "true"
            },
            success: clearlist
        }
    );

    function clearlist(result) {
        var table = document.getElementById("results");
        var length = table.rows.length;
        for (var i = 1; i < length; ++i) //keeping the heading
        {
            table.deleteRow(1);
        }
        canvasFill();
    }
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
    context.moveTo(590, 290);;
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

function submitXYAction() {
    var x_value = Number(document.getElementById('coordinate_x').value);
    var y_value = Number(document.getElementById('coordinate_y').value);
    doXYRequest(x_value, y_value);
}

function submitRAction() {
    var radius = Number(document.getElementById('radius').value);
    if (R != radius) {
        doRRequest(radius);
        R = radius;
    }

}

function doXYRequest(x, y) {
    var canvas = document.getElementById("graph");
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
    var canvas = document.getElementById("graph");
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

// function addTableEntry(x, y, R, S) {
//     row = $('#results');
//     row = document.getElementById('results');
//     row.innerHTML = '<div class =\"row\">' +
//         '<div class =\"cell\" data-title=\"X\">' + x + '</div>' +
//         '<div class =\"cell\" data-title=\"Y\">' + y + '</div>' +
//         '<div class =\"cell\" data-title=\"R\">' + R + '</div>' +
//         '<div class =\"cell\" data-title=\"Result\">' + S + '</div>' +
//         '</div>';
// }

function onAjaxSuccess(data) {
    var return_data = JSON.parse(data);
    context = canvas.getContext("2d");
    row = document.getElementById('results');
    var x, y;
    for (i = 0; i < return_data.length; i++) {
        x = return_data[i].x * k + 300;
        y = return_data[i].y * k + 300;
        drawPoint(context, x, y, return_data[i].isInArea);

        var newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        newRow.innerHTML = '<div class =\"cell\" data-title=\"X\">' + return_data[i].x + '</div>'+
            '<div class =\"cell\" data-title=\"Y\">' + return_data[i].y + '</div>' +
            '<div class =\"cell\" data-title=\"R\">' + return_data[i].radius + '</div>' +
            '<div class =\"cell\" data-title=\"Result\">' + return_data[i].isInArea + '</div>' +
            '</div>';
        row.appendChild(newRow);
    }

}
