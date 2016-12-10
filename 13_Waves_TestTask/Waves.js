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
        var colors = [];


        createField(fieldWidth, fieldHeight);


        var timerId = setInterval(function(){
            step(fieldWidth, fieldHeight);
        }, fieldPause);


        var i = 0;
        $('.waves').click(function(event){
            i++;
            colors.push(getRandomColor());
            var clickedLine = +event.target.id;

            $('.line' + clickedLine + ' .cell' + 0)
                .css('background-color', colors[i - 1])
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


        function step (width, height) {

            for (var i = height - 1; i >= 0; i--) {
                for (var j = width - 1; j >= 0; j--) {
                    var carrentCell = $('.line' + i + ' .cell' + j);
                    if (j > 0) {
                        var neighborCell = $('.line' + i + ' .cell' + (j - 1));
                        var neighborCellNumber = +neighborCell.attr("color");
                        if (+carrentCell.attr("color") < neighborCellNumber) {
                            carrentCell
                                .css('background-color', colors[neighborCellNumber - 1])
                                .attr("color", neighborCellNumber);
                        }
                    }
                }
            };

            for (var i = height - 1; i >= 0; i--) {
                var carrentCell = $('.line' + i + ' .cell0');
                if (i > 0) {
                    var neighborCell = $('.line' + (i - 1) + ' .cell0');
                    var neighborCellNumber = +neighborCell.attr("color");
                    if (+carrentCell.attr("color") < neighborCellNumber) {
                        carrentCell
                            .css('background-color', colors[neighborCellNumber - 1])
                            .attr("color", neighborCellNumber);
                    }
                }
            };

            for (var i = 0; i < height; i++) {
                var carrentCell = $('.line' + i + ' .cell0');
                if (i < height - 1) {
                    var neighborCell = $('.line' + (i + 1) + ' .cell0');
                    var neighborCellNumber = +neighborCell.attr("color");
                    if (+carrentCell.attr("color") < neighborCellNumber) {
                        carrentCell
                            .css('background-color', colors[neighborCellNumber - 1])
                            .attr("color", neighborCellNumber);
                    }
                }
            }
        };
    })();
});