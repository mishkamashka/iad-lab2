R = 1;
k = 50;
x_val = [];
y_val = [];

function setRadius()
{
    radiusText = document.getElementById('radius');
}

function clear1()
{
    $.ajax({
            type:"get",
            url:"/lab7/controller",
            data: {
                delete: "true"
            },
            success: clearlist
        }
    );
    function clearlist(result)
    {
        var table = document.getElementById("results");
        var length = table.rows.length;
        for (var i = 1; i < length; ++i) //keeping the heading
        {
            table.deleteRow(1);
        }
        canvasFill();
    }
}

function selectRadius(num)
{
    radiusText = document.forms[0].elements.rBox;
    R = 0;
    for (i = 0; i < radiusText.length; ++i)
    {
        if (i != num && radiusText[i].checked)
        {
            radiusText[i].checked = false;
        }
        if (i == num && radiusText[i].checked)
        {
            R = radiusText[i].value;
        }
    }
    canvasFill();
    initiateGraph();
}

function ychk(textbox)
{
    var num = parseFloat(textbox.value);
    var btn = document.getElementById("submitbtn");
    if (isNaN(num) || num < -5.0 || num > 3.0)
    {
        textbox.style.outline = "2px solid red";
        textbox.style.outlineRadius = "4px";
        btn.disabled = true;

    } else
    {
        textbox.style.outline = "solid 1px #f2f2f2"
        textbox.style.outline = "none";
        btn.disabled = false;
    }
}

function canvasFill()
{
    canvas = document.getElementById("graph");
    canvas.width = canvas.width;
    context = canvas.getContext("2d");
    if (R > 0)
    {
        drawFigure(context);
    }
    drawAxis(context);
}

function setPoint(event)
{
    canvas = document.getElementById("graph");
    rect = canvas.getBoundingClientRect();
    offset = (rect.width - canvas.width) / 2 + 1;
    x = event.clientX - rect.left - offset;
    y = event.clientY - rect.top - offset;
    if (R == 0)
    {
        alert("Set the R");
    }
    else
    {
        real_x = (x - 300) / k;
        real_y = -(y - 300) / k;
        x_val.push(real_x);
        y_val.push(real_y);
        doRequest([real_x], [real_y], 1);
    }
}

function drawPoint(context, x, y, doesBelong)
{
    context.beginPath();
    if (doesBelong)
    {
        context.fillStyle = "Blue";
    }
    else
    {
        context.fillStyle = "Red";
    }
    context.arc(x, y, 3, 0, 2*Math.PI);
    context.fill();
}

function drawAxis(context)
{

    context.beginPath();
    //Draw axis
    context.strokeStyle="#666666";
    context.moveTo(0, 300);
    context.lineTo(600, 300);
    context.moveTo(300, 0);
    context.lineTo(300, 600);
    context.closePath();
    context.stroke();
    //Draw arrows
    context.beginPath();
    context.strokeStyle="black";
    context.moveTo(590, 290);
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
    context.textBaseline="top";
    context.textAlign="left";
    context.fillStyle="black";
    context.fillText("Y", 310, 0);
    context.fillText("X", 585, 310);

    //Draw measures if radius is set
    if (R > 0)
    {
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
        context.strokeStyle="black";
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

function drawFigure(context)
{
    pixelsForRadius = R * k;
    context.beginPath();
    context.fillStyle="#5c99ED";
    context.strokeStyle="#5c99ED";
    //Top-Left
    context.moveTo(300-pixelsForRadius, 299);
    context.lineTo(299, 300 - pixelsForRadius / 2);
    context.lineTo(299, 299);
    //Bottom-Left
    context.fillRect(300 - pixelsForRadius / 2, 301, pixelsForRadius / 2 - 1, pixelsForRadius - 1);
    //Bottom-Right
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(301, 301, pixelsForRadius / 2 - 1, 0, 0.5 * Math.PI);
    context.lineTo(301, 301);
    context.closePath();
    context.fill();
}

function doRequest(x, y, save)
{
    return_data = [];
    var canvas = document.getElementById("graph");
    $.ajax({
            type:"get",
            url:"/lab7/controller",
            data:{
                x_coord: JSON.stringify(x),
                y_coord: JSON.stringify(y),
                rBox: R,
                doSave: save
            },
            success: (save == 1 ? onAjaxSuccess : onAjaxSuccess1)
        }
    );
    function onAjaxSuccess(data)
    {
        return_data = JSON.parse(data);
        var context = canvas.getContext("2d");
        for (i = 0; i < return_data.length; ++i)
        {
            coord_x = x[i] * k + 300;
            coord_y = -y[i] * k + 300;
            drawPoint(context, coord_x, coord_y, return_data[i]);
            addTableEntry(x[i], y[i], R, return_data[i]);
        }
    }
    function onAjaxSuccess1(data)
    {
        return_data = JSON.parse(data);
        var context = canvas.getContext("2d");
        for (i = 0; i < return_data.length; ++i)
        {
            coord_x = x[i] * k + 300;
            coord_y = -y[i] * k + 300;
            drawPoint(context, coord_x, coord_y, return_data[i]);
        }
    }
}

function addTableEntry(x, y, R, S)
{
    var table = document.getElementById("results");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = x;
    cell2.innerHTML = y;
    cell3.innerHTML = R;
    cell4.innerHTML = S == 1 ? "Yes" : "No";
}

function initiateGraph()
{
    var canvas = document.getElementById("graph");
    var context = canvas.getContext("2d");
    var table = document.getElementById("results");
    var length = table.rows.length;
    var mostRecentIndex = 1;
    /*for (var i = 2; i < length; ++i)
    {
        var rowPrev = table.rows[i - 1];
        var rowCurr = table.rows[i];
        if (parseFloat(rowPrev.cells[2].innerHTML) != parseFloat(rowCurr.cells[2].innerHTML))
        {
            mostRecentIndex = i;
        }
    }*/

    radiusText = document.forms[0].elements.rBox;
    var currentRadius = parseInt(table.rows[mostRecentIndex].cells[2].innerHTML);
    radiusText[currentRadius - 1].checked = true;
    selectRadius(currentRadius - 1);

    for (var i = mostRecentIndex; i < length; ++i)
    {
        var row = table.rows[i];
        var X = parseFloat(row.cells[0].innerHTML);
        var Y = parseFloat(row.cells[1].innerHTML);
        doRequest([X], [Y], 0);
    }
}

window.onload = function() {
    setRadius();
    canvasFill();
    initiateGraph();
};
