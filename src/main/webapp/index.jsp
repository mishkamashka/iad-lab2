<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.time.LocalDateTime" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./css/main.css">
    <link rel="stylesheet" type="text/css" href="./css/table.css">
    <link rel="stylesheet" type="text/css" href="./css/overlay.css">
    <title>Лабораторная работа №1</title>
    <link href="./image/icon.png" rel="Shortcut Icon">
    <script src="./js/validation.js"></script>
    <script src="./js/overlay.js"></script>
    <script src="./js/draw.js"></script>
</head>

<body>
<div id="about__panel" class="overlay" style="height: 0%;">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <div class="overlay-content">
        <a>Анисимова Мария</a>
        <a>группа P3210</a>
    </div>
</div>
<header class="header">
    <div class="header__block__img">
        <img class="header__icon" onclick="showNav()" src="./image/bear.png">
    </div>
    <div class="header__block__var">
        Вариант 28022
        <a><%= LocalDateTime.now() %>
        </a>
    </div>
    <div class="header__block__author">
        Анисимова Мария, P3210
    </div>
</header>
</div>

<div class="all__site__wrap">
    <div class="wrap__img__graph">
        <!--<canvas id="plot-canvas"></canvas>-->
        <img class="graph__image" src="./image/areas.png">
    </div>
    <form name="form"  onsubmit="return isFormFilled()" method="get"
          style="display: flex; flex-direction: column;">
        <select class="select input__global--margin input__global--size" id="coordinate_x" name="coordinate_x">
            <option value="" disabled selected>Choose 'x' coordinate</option>
            <option value="-3">-3</option>
            <option value="-2">-2</option>
            <option value="-1">-1</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <input class="input__text input__global--margin input__global--size" placeholder="enter 'y' coordinate"
               type="text" name="coordinate_y"
               id="coordinate_y" onclick="charCheck()"/>
        <select class="select input__global--margin input__global--size" id="radius" name="radius">
            <option value="" disabled selected>Choose radius</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
        </select>
        <button type="submit" class="btn btn--font input__global--margin input__global--size">check</button>
        <div class="error__msg">
        </div>
    </form>
    <div class="wrap__table table ">
        <div class="row header__table">
            <div class="cell">
                X
            </div>
            <div class="cell">
                Y
            </div>
            <div class="cell">
                R
            </div>
            <div class="cell">
                Result
            </div>
        </div>
    </div>
</div>

<footer class="footer">
    <div class="footer__block">
        <p>Measured time:<br/>
        </p>
    </div>
</footer>

</body>

</html>