;$(function () {

    var game = {

        type: 'withComputer',



        field: {

            cells: [
                [{ using: 0 }, { using: 0 }, { using: 0 }], // 0 - cell is not used,
                [{ using: 0 }, { using: 0 }, { using: 0 }], // 1 - cell is used by player,
                [{ using: 0 }, { using: 0 }, { using: 0 }]  // 2 - cell is used by computer
            ],

            gameScore: {
                scoreWithComputer: {
                    player: 0,
                    draw: 0,
                    computer: 0
                },
                scoreWithHuman: {
                    player1: 0,
                    draw: 0,
                    player2: 0
                }
            },

            prepareHandlers: function () {      //  Using of Closure.
                if (!temp) {
                    forFirstPlayerClick();
                    temp = true;
                }
                else {
                    forSecondPlayerClick();
                    temp = false;
                }
            }
        },



        proceed: function () {
            setHandlerForChandgeGameType();
            this.field.prepareHandlers();
        },


        checkEnd: function (gamer) {
            if (checkResult(gamer) === -1) {
                return 'notEnd';
            }
            return 'end';
        },



        closeFrame: function () {
            this.renderScore();
            this.deleteHandlers();
        },



        renderScore: function () {
            if (this.type === 'withHuman') {
                $('.player-score').html(this.field.gameScore.scoreWithHuman.player1);
                $('.draw-score').html(this.field.gameScore.scoreWithHuman.draw);
                $('.computer-score').html(this.field.gameScore.scoreWithHuman.player2);
            }
            else {
                $('.player-score').html(this.field.gameScore.scoreWithComputer.player);
                $('.draw-score').html(this.field.gameScore.scoreWithComputer.draw);
                $('.computer-score').html(this.field.gameScore.scoreWithComputer.computer);
            }
        },




        deleteHandlers: function () {
            for (var i = 0; i < this.field.cells.length; i++) {
                for (var j = 0; j < this.field.cells[i].length; j++) {
                    this.field.cells[i][j].using = 0;
                    $('.cell' + i + j).unbind().one("click", onStartClik);
                    beep();
                }
            }
        },



        computerThinking: function () {     //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                
            // 1) 
            if (game.field.cells[0][0].using === 0 && game.field.cells[0][1].using === 0 && game.field.cells[0][2].using === 0 &&
                game.field.cells[1][0].using === 0 && game.field.cells[1][1].using === 0 && game.field.cells[1][2].using === 0 &&
                game.field.cells[2][0].using === 0 && game.field.cells[2][1].using === 0 && game.field.cells[2][2].using === 0
                ) {
                this.computerMove(0, 0);
                return;
            }
            if (game.field.cells[0][0].using === 2 && game.field.cells[0][1].using === 0 && game.field.cells[0][2].using === 0 &&
                game.field.cells[1][0].using === 0 && game.field.cells[1][1].using === 0 && game.field.cells[1][2].using === 0 &&
                game.field.cells[2][0].using === 0 && game.field.cells[2][1].using === 0 && game.field.cells[2][2].using === 1
                ) {
                this.computerMove(0, 2);
                return;
            }
            if (game.field.cells[0][0].using === 1 && game.field.cells[0][1].using === 0 && game.field.cells[0][2].using === 0 &&
                game.field.cells[1][0].using === 0 && game.field.cells[1][1].using === 1 && game.field.cells[1][2].using === 0 &&
                game.field.cells[2][0].using === 0 && game.field.cells[2][1].using === 0 && game.field.cells[2][2].using === 2
                ) {
                this.computerMove(0, 2);
                return;
            }

            //  2) check if I can win in 1 move
            var cellToMove = CanIWinIn_1Move(2);
            if (cellToMove !== 'undefined') {
                this.computerMove(cellToMove[0], cellToMove[1]);
                return;
            }

            //  3) check if my rivel can win in 1 move and prevent it
            cellToMove = CanIWinIn_1Move(1);
            if (cellToMove !== 'undefined') {
                this.computerMove(cellToMove[0], cellToMove[1]);
                return;
            }

            //  4) check if I can win in 2 move
            cellToMove = CanIWinIn_2Move(2);
            if (cellToMove !== 'undefined') {
                this.computerMove(cellToMove[0], cellToMove[1]);
                return;
            }

            // 5) 
            if (game.field.cells[0][0].using === 1 && game.field.cells[0][1].using === 0 && game.field.cells[0][2].using === 0 &&
                game.field.cells[1][0].using === 0 && game.field.cells[1][1].using === 2 && game.field.cells[1][2].using === 0 &&
                game.field.cells[2][0].using === 0 && game.field.cells[2][1].using === 0 && game.field.cells[2][2].using === 1
                ) {
                this.computerMove(2, 1);
                return;
            }

            //  6) check if my rivel can win in 2 move and prevent it
            cellToMove = CanIWinIn_2Move(1);
            if (cellToMove !== 'undefined') {
                this.computerMove(cellToMove[0], cellToMove[1]);
                return;
            }


            // 7) just silly move
            if (game.field.cells[1][1].using === 0) {
                this.computerMove(1, 1);
                return;
            }
            if (game.field.cells[2][2].using === 0) {
                this.computerMove(2, 2);
                return;
            }
            if (game.field.cells[2][0].using === 0) {
                this.computerMove(2, 0);
                return;
            }
            if (game.field.cells[0][2].using === 0) {
                this.computerMove(0, 2);
                return;
            }
            if (game.field.cells[0][0].using === 0) {
                this.computerMove(0, 0);
                return;
            }
            for (var i = 0; i < game.field.cells.length; i++) {
                for (var j = 0; j < game.field.cells[i].length; j++) {
                    if (game.field.cells[i][j].using === 0) {
                        this.computerMove(i, j);
                        return;
                    }
                }
            }
        },



        computerMove: function (i, j) {
            $('.cell' + i + j).unbind().prepend('<div class="animation' + i + j + '"></div>');
            myD3js_Visualization(i, j, zeroCoordinateData);
            game.field.cells[i][j].using = 2;
        }


    };


    //---------------------------------------------------------------------------------

    var temp = false;      //  It is for using in Closure.
    game.proceed();     //  Game start.

    //---------------------------------------------------------------------------------




    function setHandlerForChandgeGameType() {

        $('.score').mouseenter(function () {
            $('.gamers').css("color", "white");             // It is white color highlighting type of game ( one man / two men )
        });
        $('.score').mouseleave(function () {
            $('.gamers').css("color", "gray");
        });


        $('.score').one("click", onHumanGame);            // It is a toggle for changing of game type.
    };

    function onHumanGame() {

        $('.gamers').append('<span class="glyphicon glyphicon-user"></span>');
        $('.gamer2, .drawScore').css("color", "gray");
        $('#pl1').text('plaeyr 1 ');
        $('#pl2').text('plaeyr 2 ');

        game.type = 'withHuman';
        game.closeFrame();
        onStartClik();
        $(this).one("click", onComputerGame);
    };

    function onComputerGame() {

        $('.gamers').find('span')[0].remove();
        $('.gamer2, .drawScore').css("color", "green");
        $('#pl1').text('plaeyr ');
        $('#pl2').text('computer ');

        game.type = 'withComputer';
        game.closeFrame();
        onStartClik();
        $(this).one("click", onHumanGame);
    };

    //-------------------------------------------------------------------------------

    function forFirstPlayerClick() {
        for (var i = 0; i < game.field.cells.length; i++) {
            for (var j = 0; j < game.field.cells[i].length; j++) {
                if (game.field.cells[i][j].using === 0) {
                    $('.cell' + i + j).unbind().one("click", for1st);
                }
            }
        }
        if (game.type === 'withHuman') {
            $('.gamer1').css("color", "green");
            $('.drawScore, .gamer2').css("color", "gray");
        }
        else {
            $('.gamer1, .drawScore, .gamer2').css("color", "green");
        }
    };

    function for1st() {
        var i = +this.className[this.className.length - 2];
        var j = +this.className[this.className.length - 1];
        if (game.field.cells[i][j].using === 0) {
            //$(this).prepend('<img src="img/cross.png" class="img-responsive" />');
            $(this).prepend('<div class="animation' + i + j + '"></div>');
            myD3js_Visualization(i, j, crossCoordinateData);

            game.field.cells[i][j].using = 1;
        }
        if (game.checkEnd('player1') === 'end') {
            game.closeFrame();
            return;
        }
        forSecondPlayerClick();
    };



    function forSecondPlayerClick() {
        if (game.type === 'withHuman') {
            for (var i = 0; i < game.field.cells.length; i++) {
                for (var j = 0; j < game.field.cells[i].length; j++) {
                    if (game.field.cells[i][j].using === 0) {
                        $('.cell' + i + j).unbind().one("click", for2nd);
                    }
                }
            }
            $('.gamer2').css("color", "green");
            $('.drawScore, .gamer1').css("color", "gray");
        }
        else {
            game.computerThinking();
            $('.game1, .drawScore, .gamer2').css("color", "green");
            if (game.checkEnd('player2') === 'end') {
                game.closeFrame();
                return;
            }
            forFirstPlayerClick();
        }
    };

    function for2nd() {
        var i = +this.className[this.className.length - 2];
        var j = +this.className[this.className.length - 1];
        if (game.field.cells[i][j].using === 0) {
            //$(this).prepend('<img src="img/zero.png" class="img-responsive" />');
            $(this).prepend('<div class="animation' + i + j + '"></div>');
            myD3js_Visualization(i, j, zeroCoordinateData);

            game.field.cells[i][j].using = 2;
        }
        if (game.checkEnd('player2') === 'end') {
            game.closeFrame();
            return;
        }
        forFirstPlayerClick();
    };

    //---------------------------------------------------------------------------------

    function checkResult(gamer) {

        if (gamer === "player1") {
            if (isPlayerWon('player1')) {
                if (game.type === 'withHuman') {
                    game.field.gameScore.scoreWithHuman.player1++;
                }
                else {
                    game.field.gameScore.scoreWithComputer.player++;
                }
                return 1;
            }
        }
        else if (gamer === "player2") {
            if (isPlayerWon('player2')) {
                if (game.type === 'withHuman') {
                    game.field.gameScore.scoreWithHuman.player2++;
                }
                else {
                    game.field.gameScore.scoreWithComputer.computer++;
                }
                return 2;
            }
        }
        var flag = 0;
        for (var i = 0; i < game.field.cells.length; i++) {
            for (var j = 0; j < game.field.cells[i].length; j++) {
                if (game.field.cells[i][j].using === 0) {
                    flag = -1;
                }
            }
        }
        if (flag === 0) {
            if (game.type === 'withHuman') {
                game.field.gameScore.scoreWithHuman.draw++;
            }
            else {
                game.field.gameScore.scoreWithComputer.draw++;
            }
            return 0;
        }
        return flag;
    };



    function isPlayerWon(gamer) {
        var pl = 1;
        if (gamer === 'player2') {
            pl = 2;
        }

        for (var i = 0; i < game.field.cells.length; i++) {           //   horizontal checking
            var flag = true;
            for (var j = 0; j < game.field.cells[i].length; j++) {

                if (game.field.cells[i][j].using !== pl) {
                    flag = false;
                }
            }
            if (flag === true) {
                return true;
            }
        }

        for (var i = 0; i < game.field.cells.length; i++) {           //   vertical checking
            var flag = true;
            for (var j = 0; j < game.field.cells[i].length; j++) {

                if (game.field.cells[j][i].using !== pl) {
                    flag = false;
                }
            }
            if (flag === true) {
                return true;
            }
        }

        var flag = true;                                                //   left diagonal checking
        for (var j = 0; j < game.field.cells.length; j++) {

            if (game.field.cells[j][j].using !== pl) {
                flag = false;
            }
        }
        if (flag === true) {
            return true;
        }

        var flag = true;                                                //  right  diagonal checking
        for (var j = 0; j < game.field.cells.length; j++) {

            if (game.field.cells[game.field.cells.length - 1 - j][j].using !== pl) {
                flag = false;
            }
        }
        if (flag === true) {
            return true;
        }

        return false;
    };

    //---------------------------------------------------------------------------------

    function onStartClik() {
        $('.cell').empty();
        game.field.prepareHandlers();
    }

    //---------------------------------------------------------------------------------

    function beep() {
        var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        snd.play();
    }



    function CanIWinIn_1Move(playerNumber) {

        for (var i = 0; i < game.field.cells.length; i++) {           //   horizontal checking
            var freeCellAmount = 0;
            var compCellAmount = 0;
            var iTarget;
            var jTarget;
            for (var j = 0; j < game.field.cells[i].length; j++) {

                if (game.field.cells[i][j].using === playerNumber) {
                    compCellAmount++;
                }
                if (game.field.cells[i][j].using === 0) {
                    freeCellAmount++;
                    iTarget = i;
                    jTarget = j;
                }
            }
            if (freeCellAmount === 1 && compCellAmount === 2) {
                return [iTarget, jTarget];
            }
        }

        for (var i = 0; i < game.field.cells.length; i++) {           //   vertical checking
            var freeCellAmount = 0;
            var compCellAmount = 0;
            var iTarget;
            var jTarget;
            for (var j = 0; j < game.field.cells[i].length; j++) {

                if (game.field.cells[j][i].using === playerNumber) {
                    compCellAmount++;
                }
                if (game.field.cells[j][i].using === 0) {
                    freeCellAmount++;
                    iTarget = i;
                    jTarget = j;
                }
            }
            if (freeCellAmount === 1 && compCellAmount === 2) {
                return [jTarget, iTarget];
            }
        }

        var freeCellAmount = 0;                                            //   left diagonal checking
        var compCellAmount = 0;
        var iTarget;
        var jTarget;
        for (var j = 0; j < game.field.cells.length; j++) {

            if (game.field.cells[j][j].using === playerNumber) {
                compCellAmount++;
            }
            if (game.field.cells[j][j].using === 0) {
                freeCellAmount++;
                iTarget = j;
                jTarget = j;
            }
        }
        if (freeCellAmount === 1 && compCellAmount === 2) {
            return [jTarget, iTarget];
        }

        var freeCellAmount = 0;                                            //   right diagonal checking
        var compCellAmount = 0;
        var iTarget;
        var jTarget;
        for (var j = 0; j < game.field.cells.length; j++) {

            if (game.field.cells[game.field.cells.length - 1 - j][j].using === playerNumber) {
                compCellAmount++;
            }
            if (game.field.cells[game.field.cells.length - 1 - j][j].using === 0) {
                freeCellAmount++;
                iTarget = j;
                jTarget = game.field.cells.length - 1 - j;
            }
        }
        if (freeCellAmount === 1 && compCellAmount === 2) {
            return [jTarget, iTarget];
        }
        return 'undefined';
    };



    function CanIWinIn_2Move(playerNumber) {            
        for (var i = 0; i < game.field.cells.length; i++) {
            for (var j = 0; j < game.field.cells[i].length; j++) {
                if (game.field.cells[i][j].using === 0) {               // choosing empty cell

                    var relevantLineAmount = 0;
                    //   horizontal line checking for one empty cell and one computer using cell
                    var freeCellAmount = 0;
                    var compCellAmount = 0;
                    for (var z = 0; z < game.field.cells[i].length; z++) {
                        if (game.field.cells[i][z].using === playerNumber) {
                            compCellAmount++;
                        }
                        if (game.field.cells[i][z].using === 0) {
                            freeCellAmount++;
                        }
                    }
                    if (freeCellAmount === 2 && compCellAmount === 1) {
                        relevantLineAmount++;
                    }

                    //   vertical line checking for one empty cell and one computer using cell
                    var freeCellAmount = 0;
                    var compCellAmount = 0;
                    for (var z = 0; z < game.field.cells[i].length; z++) {
                        if (game.field.cells[z][j].using === playerNumber) {
                            compCellAmount++;
                        }
                        if (game.field.cells[z][j].using === 0) {
                            freeCellAmount++;
                        }
                    }
                    if (freeCellAmount === 2 && compCellAmount === 1) {
                        relevantLineAmount++;
                    }

                    //   left diagonal line checking for one empty cell and one computer using cell
                    if (i === 0 && j === 0 || i === 1 && j === 1 || i === 2 && j === 2) {

                        var freeCellAmount = 0;
                        var compCellAmount = 0;
                        for (var z = 0; z < game.field.cells[i].length; z++) {
                            if (game.field.cells[z][z].using === playerNumber) {
                                compCellAmount++;
                            }
                            if (game.field.cells[z][z].using === 0) {
                                freeCellAmount++;
                            }
                        }
                        if (freeCellAmount === 2 && compCellAmount === 1) {
                            relevantLineAmount++;
                        }
                    }

                    //   right diagonal line checking for one empty cell and one computer using cell
                    if (i === 2 && j === 0 || i === 1 && j === 1 || i === 0 && j === 2) {

                        var freeCellAmount = 0;
                        var compCellAmount = 0;
                        for (var z = 0; z < game.field.cells[i].length; z++) {
                            if (game.field.cells[game.field.cells.length - 1 - z][z].using === playerNumber) {
                                compCellAmount++;
                            }
                            if (game.field.cells[game.field.cells.length - 1 - z][z].using === 0) {
                                freeCellAmount++;
                            }
                        }
                        if (freeCellAmount === 2 && compCellAmount === 1) {
                            relevantLineAmount++;
                        }
                    }

                    if (relevantLineAmount > 1) {
                        return [i, j];
                    }
                }
            }
        }
        return 'undefined';
    };
});