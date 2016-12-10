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
        var fieldHeight = 10;
        var fieldVelocity = 1;
        var colors = [];

        var getRandomColor = function () {
            return '#' + Math.random().toString(16).substr(-6);
        };



        var createField = function (width, height) {
            var waves = $('.waves');
            for (var i = 0; i < height; i++) {
                waves.append('<div class="line line' + i + '"></div>');
                for (var j = 0; j < width; j++) {
                    $('.line' + i).append('<div id="' + i + '" class="cell cell' + j + '" color="0"></div>');
                }
            }
        };

        createField(fieldWidth, fieldHeight);



        var i = 0;
        $('.waves').click({width: fieldWidth, height: fieldHeight, velocity: fieldVelocity}, function(event){

            i++;
            colors.push(getRandomColor());
            var clickedLine = +event.target.id;

            var j = 0;
            var step = function (width, height) {

                if (j === 0) {
                	firstStep(clickedLine, colors, i);
                }
                else {
                    fullStep(width, height);
                }

                j++;
            };

            var timerId = setInterval(function(){
            	step(event.data.width, event.data.height);
            }, event.data.velocity);

            setTimeout(function () {
                clearInterval(timerId);
                console.log('stop');
            }, 20000);

        });



        function firstStep (clickedLine, colors, i) {

            $('.line' + clickedLine + ' .cell' + 0)
                .css('background-color', colors[i - 1])
                .attr('color', i);
        }



        function fullStep (width, height) {

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