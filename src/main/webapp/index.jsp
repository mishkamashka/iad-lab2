<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="se.ifmo.ru.model.Point" %>
<%@ page import="java.util.ArrayList" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
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
    </div>
    <div class="header__block__author">
        Анисимова Мария, P3210
    </div>
</header>
</div>

<div class="all__site__wrap">
    <div class="wrap__img__graph">
        <div class="interactive_element">
            <canvas id="graph" class="canvas" onclick="setPoint(event)" width="600" height="600"></canvas>
        </div>
    </div>
    <div name="XYform" style="display: flex; flex-direction: column;">
        <input class="input__text input__global--margin input__global--size" placeholder="enter 'X' in (-3; 5)"
               type="text" name="coordinate_x"
               id="coordinate_x" onclick="charCheckX()"/>
        <input class="input__text input__global--margin input__global--size" placeholder="enter 'Y' in (-3; 3)"
               type="text" name="coordinate_y"
               id="coordinate_y" onclick="charCheckY()"/>
        <button onclick="submitXYAction()" class="btn btn--font input__global--margin input__global--size">check</button>
        <div id="error_msg" class="error__msg">
        </div>
    </div>
    <div name="Rform" style="display: flex; flex-direction: column;">
        <input class="input__text input__global--margin input__global--size" placeholder="enter 'R' in (2; 5)"
               type="text" name="radius"
               id="radius" onclick="charCheckR()"/>
        <button onclick="submitRAction()" class="btn btn--font input__global--margin input__global--size">change radius</button>
    </div>
    <div id="results" class="wrap__table table ">
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
        <%--TODO: change footer--%>
        <p>Measured time:<br/>
        </p>
    </div>
</footer>

</body>

</html>