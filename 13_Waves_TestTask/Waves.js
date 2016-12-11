//На экране есть сетка M на N из цветных квадратиков. 
//Нужно реализовать на этой сетке следующий эффект — 
//по клику слева направо со скоростью V пробегает волна, 
//меняя цвет квадратиков на другой (единый для всей волны).
//Эффект должен работать при любых значениях M, N, V. 
//Волна начинается всегда у левой стенки.
//Одновременно может идти несколько волн разного цвета.
//https://habrahabr.ru/post/187894/

'use strict';
$(document).ready(function () {
    (function () {

        var fieldWidth = 50;
        var fieldHeight = 20;
        var fieldPause= 1;
        var fieldColors = [];

// 1) Field creation
        createField(fieldWidth, fieldHeight);

// 2) Start of color changing
        var timerId = setInterval(function(){
            step(fieldWidth, fieldHeight, fieldColors);
        }, fieldPause);

// 3) Handler of click: changing color of the cell on first column and on clicked line
        var i = 0;
        $('.waves').click({colors: fieldColors}, function(event){
            i++;
            event.data.colors.push(getRandomColor());
            var clickedLine = +event.target.id;
            
            $('.line' + clickedLine + ' .cell' + 0)
                .css('background-color', event.data.colors[i - 1])
                .attr('color', i);
        });



        function getRandomColor () {
            return '#' + Math.random().toString(16).substr(-6);
        };

        function createField (width, height) {
            var waves = $('.waves');
            for (var i = 0; i < height; i++) {
                waves.append('<div class="line line' + i + '"></div>');
                for (var j = 0; j < width; j++) {
                    $('.line' + i).append('<div id="' + i + '" class="cell cell' + j + '" color="0"></div>');
                }
            }
        };

        function step (width, height, colors) {
        	// Checking lines from right to left except first column
            for (var i = 0; i < height; i++) {
                for (var j = width - 1; j > 0; j--) {
                    var carrentCell = $('.line' + i + ' .cell' + j);
                    var neighborCellColorNumber = +$('.line' + i + ' .cell' + (j - 1)).attr("color");
                    changeColor(carrentCell, neighborCellColorNumber, colors);
                }
            };
            // Checking first column from down to up
            for (var i = height - 1; i > 0; i--) {
                var carrentCell = $('.line' + i + ' .cell0');
                var neighborCellColorNumber = +$('.line' + (i - 1) + ' .cell0').attr("color");
                changeColor(carrentCell, neighborCellColorNumber, colors);
            };
            // Checking first column from up to down
            for (var i = 0; i < height-1; i++) {
                var carrentCell = $('.line' + i + ' .cell0');
                var neighborCellColorNumber = +$('.line' + (i + 1) + ' .cell0').attr("color");
                changeColor(carrentCell, neighborCellColorNumber, colors);
            }
        };

        function changeColor(carrentCell, neighborCellColorNumber, colors){        	
            if (+carrentCell.attr("color") < neighborCellColorNumber) {
                carrentCell
                    .css('background-color', colors[neighborCellColorNumber - 1])
                    .attr("color", neighborCellColorNumber);
            }
        }
    })();
});