(function() {
    const ticTacToeOptions = [1,2,3,4,5,6,7,8,9]
    const winningLines = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]

    let pool = [1,2,3,4,5,6,7,8,9]
    let compare = (haveFromThis, thisOptions) => haveFromThis.filter(v => thisOptions.includes(v));

    let user = []
    let computerAI = []
    let userActive = true;

    const onClick = (event) => {
        const id = event.target.id

        if (compare(pool, id).length) {
            userTurn(id);
        }

        function userTurn(numberPicked) {
            if (userActive === true) {
                for (let i = 0; i < pool.length; i++) {
                    if (pool[i] == numberPicked) {
                        pool.splice(i, 1);
                        user.push(parseInt(numberPicked));
                        event.target.innerText = "X";
                        userActive = false;
                        checkWinTie(user);
                    }
                }
            }
        }

        function checkWinTie(player) {
            let result = document.getElementById("result")
            let answer = false
            let playerName;
        
            if (player === user) {
                playerName = "User";
            } else {
                playerName = "AI";
            }

            for (let j = 0; j < 8; j++) {
                let lineCount = compare(winningLines[j], player);
                if (lineCount.length === 3) {
                    answer = true
                    break;
                }
            }
        
            if (answer === true) {
                result.innerText = playerName + " Wins!";
            } else if (player.length === 5) {
                result.innerText = "Tie!"
            } else {
                if (player === user) {
                    computerTurn();
                } else {
                    userActive = true;
                }
            }
        }

        function computerTurn() {
            let noAnswer = 0;
            let answerArray;
        
            for (let i = 0; i < 8; i++) {
                let ownedFromLine = compare(winningLines[i], computerAI)
        
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
                return computerAvoidLossMove();
            } else {
                computerAI.push(answerArray[0]);
                for (let i = 0; i < pool.length; i++) {
                    if (pool[i] === answerArray[0]) {
                        let AIAnswer = document.getElementById(pool[i]);
                        AIAnswer.innerText = "O";
                        pool.splice(i, 1);
                        checkWinTie(computerAI);
                    }
                }
            }
        }
        
        function computerAvoidLossMove() {
            let noAnswer = 0;
            let answerArray;
        
            for (let i = 0; i < 8; i++) {
                let ownedFromLine = compare(winningLines[i], user)
        
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
                return computerRandomMove();
            } else {
                computerAI.push(answerArray[0]);
                for (let i = 0; i < pool.length; i++) {
                    if (pool[i] === answerArray[0]) {
                        let AIAnswer = document.getElementById(pool[i]);
                        AIAnswer.innerText = "O";
                        pool.splice(i, 1);
                        checkWinTie(computerAI);
                    }
                }
            }
        }
        
        function computerRandomMove() {
            let  computerAnswer = Math.floor(Math.random() * pool.length);
            let number = pool[computerAnswer];
            let AIAnswer = document.getElementById(number);
        
            pool.splice(computerAnswer, 1);
            computerAI.push(number);
            AIAnswer.innerText = "O";
            checkWinTie(computerAI);
        }
    }
    
    document.addEventListener('click', onClick);
})()