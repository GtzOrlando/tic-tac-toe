let gameBoard = (function() {
    const winningLines = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]

    let pool = [1,2,3,4,5,6,7,8,9]
    let compare = (haveFromThis, thisOptions) => haveFromThis.filter(v => thisOptions.includes(v));
    let result = document.getElementById("result");

    let player1 = {
        chosen: [],
        symbol: "X",
        autoplay: false,
        turn: true
    }

    let player2 = {
        chosen: [],
        symbol: "O",
        autoplay: true,
        turn: false
    } 

    const onClick = (event) => {
        const id = event.target.id

        if (compare(pool, id).length) {
            userTurn(id);
        } else if (id === "restart") {
            if (player1.autoplay) {
                restartGame(player1);
            } else {
                restartGame(player2);
            }
        }
    }

    function userTurn(numberPicked) {

        if (!player1.autoplay && !player2.autoplay) {
            if (player1.turn) {
                userPlays(player1, numberPicked);
            } else if (player2.turn) {
                userPlays(player2, numberPicked);
            }
        } else {
            if (!player1.autoplay && player1.turn) {
                userPlays(player1, numberPicked);
            } else if (!player2.autoplay && player2.turn) {
                userPlays(player2, numberPicked);
            }
        }
    }

    function userPlays(player, chosenOption) {
        let modifyHTML = document.getElementById(chosenOption);
        
        for (let i = 0; i < pool.length; i++) {
            if (pool[i] == chosenOption) {
                player.turn = false;
                pool.splice(i, 1);
                player.chosen.push(parseInt(chosenOption));
                modifyHTML.innerText = player.symbol;
                checkWinTie(player);
            }
        }
    }

    function checkWinTie(player) {
        let answer = false

        for (let j = 0; j < 8; j++) {
            let lineCount = compare(winningLines[j], player.chosen);
            if (lineCount.length === 3) {
                answer = true
                break;
            }
        }
    
        if (answer === true) {
            result.innerText = player.symbol + " WINS!";
        } else if (player.chosen.length === 5) {
            result.innerText = "DRAW!"
        } else {
            changeTurn(player);
        }
    }

    function changeTurn(player) {

        let nextPlayer;

        if (player === player1) {
            player2.turn = true;
            nextPlayer = player2
        } else {
            player1.turn = true;
            nextPlayer = player1
        }

        if (player1.autoplay || player2.autoplay) {
            if (!player.autoplay) {
                computerTurn(nextPlayer);
            }
        }
    }

    function restartGame(computerPlayer) {
        let ticTacToeOption = document.getElementsByClassName("ticTacToeOption");

        for (let i = 0; i < ticTacToeOption.length; i++) {
            ticTacToeOption[i].innerText = "";
        }
        
        result.innerText = "";
        player1.chosen = [];
        player1.turn = true;
        player2.chosen = [];
        player2.turn = false;
        pool = [1,2,3,4,5,6,7,8,9]

        if (computerPlayer.turn) {
            computerTurn(computerPlayer);
        }
    }

    function computerTurn(computerPlayer) {
        let noAnswer = 0;
        let answerArray;
    
        for (let i = 0; i < 8; i++) {
            let ownedFromLine = compare(winningLines[i], computerPlayer.chosen)
    
            if (ownedFromLine.length === 2) {
                let temporaryAnswer = winningLines[i].filter(function(v) {
                    return !ownedFromLine.includes(v);
                })
                if (compare(pool, temporaryAnswer).length === 1) {
                    answerArray = temporaryAnswer;
                    break;
                }
            }
        }
    
        if (answerArray === undefined) {
            return computerAvoidLossMove(computerPlayer);
        } else {
            computerPlayer.chosen.push(answerArray[0]);
            for (let i = 0; i < pool.length; i++) {
                if (pool[i] === answerArray[0]) {
                    let computerAnswer = document.getElementById(pool[i]);
                    computerAnswer.innerText = computerPlayer.symbol;
                    pool.splice(i, 1);
                    checkWinTie(computerPlayer);
                }
            }
        }
    }
    
    function computerAvoidLossMove(computerPlayer) {
        let noAnswer = 0;
        let answerArray;
        let userPlayer

        if (computerPlayer === player1) {
            userPlayer = player2
        } else {
            userPlayer = player1
        }
    
        for (let i = 0; i < 8; i++) {
            let ownedFromLine = compare(winningLines[i], userPlayer.chosen)
    
            if (ownedFromLine.length === 2) {
                let temporaryAnswer = winningLines[i].filter(function(v) {
                    return !ownedFromLine.includes(v);
                })
                if (compare(pool, temporaryAnswer).length === 1) {
                    answerArray = temporaryAnswer;
                    break;
                }
            }
        }
    
        if (answerArray === undefined) {
            return computerRandomMove(computerPlayer);
        } else {
            computerPlayer.chosen.push(answerArray[0]);
            for (let i = 0; i < pool.length; i++) {
                if (pool[i] === answerArray[0]) {
                    let AIAnswer = document.getElementById(pool[i]);
                    AIAnswer.innerText = computerPlayer.symbol;
                    pool.splice(i, 1);
                    checkWinTie(computerPlayer);
                }
            }
        }
    }
    
    function computerRandomMove(computerPlayer) {
        let  computerAnswer = Math.floor(Math.random() * pool.length);
        let number = pool[computerAnswer];
        let AIAnswer = document.getElementById(number);
    
        pool.splice(computerAnswer, 1);
        computerPlayer.chosen.push(number);
        AIAnswer.innerText = computerPlayer.symbol;
        checkWinTie(computerPlayer);
    }
    
    function receiveSettings(newObjects) {
        player1 = Object.assign(player1, newObjects[0]);
        player2 = Object.assign(player2, newObjects[1]);

        let computerPlayer;

        if (player1.autoplay) {
            computerPlayer = player1;
        } else {
            computerPlayer = player2;
        }
        restartGame(computerPlayer);
    }

    document.addEventListener('click', onClick);
    events.receive('newSettings', receiveSettings);
})()