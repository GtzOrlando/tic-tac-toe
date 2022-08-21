let options = [1,2,3,4,5,6,7,8,9]
let pool = [1,2,3,4,5,6,7,8,9]

let user = []
let computerAI = []
let userStarts = true



const lineA = [1,2,3]
const lineB = [4,5,6]
const lineC = [7,8,9]
const lineD = [1,4,7]
const lineE = [2,5,8]
const lineF = [3,6,9]
const lineG = [1,5,9]
const lineH = [3,5,7]
const winningLines = [lineA, lineB, lineC, lineD, lineE, lineF, lineG, lineH]

function computerWinningMove() {
    let adquiredFromLine = (line, computerAI) => line.filter(v => computerAI.includes(v));
    let noAnswer = 0;
    let answerArray;

    for (let i = 0; i < 8; i++) {
        let ownedFromLine = adquiredFromLine(winningLines[i], computerAI)

        if (ownedFromLine.length === 2) {
            let temporaryAnswer = winningLines[i].filter(function(v) {
                return !ownedFromLine.includes(v);
            })
            if (adquiredFromLine(pool, temporaryAnswer).length === 1) {
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
                pool.splice(i, 1);
                return checkWin(computerAI);
            }
        }
    }
}

function computerAvoidLossMove() {
    let adquiredFromLine = (line, user) => line.filter(v => user.includes(v));
    let noAnswer = 0;
    let answerArray;

    for (let i = 0; i < 8; i++) {
        let ownedFromLine = adquiredFromLine(winningLines[i], user)

        if (ownedFromLine.length === 2) {
            let temporaryAnswer = winningLines[i].filter(function(v) {
                return !ownedFromLine.includes(v);
            })
            if (adquiredFromLine(pool, temporaryAnswer).length === 1) {
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
                pool.splice(i, 1);
                return checkWin(user);
            }
        }
    }
}

function computerRandomMove() {
    let  computerAnswer = Math.floor(Math.random() * pool.length);
    let number = pool[computerAnswer];

    pool.splice(computerAnswer, 1);
    computerAI.push(number);
    return checkWin(computerAI);
}

function checkWin(player) {
    let compare = (line, player) => line.filter(v => player.includes(v)).length
    let answer = false
    let playerName;

    if (player === user) {
        playerName = "User";
    } else {
        playerName = "AI";
    }

    for (let i = 0; i < 8; i++) {
        let lineCount = compare(winningLines[i], player);
        if (lineCount === 3) {
            answer = true
            break;
        }
    }

    if (answer === true) {
        return playerName + " Wins";
    } else {
        return checkTie();
    }
    
}

function checkTie() {
    if (pool.length === 0) {
        return "Tie";
    } else {
        if (userStarts === true) {
            userStarts = false;
            return computerWinningMove();
            checkStats();
        } else {
            userStarts = true;
            checkStats();
            return "user turn";
        }
    }
}

function userTurn(numberPicked) {
    if (userStarts === true) {
        for (let i = 0; i < pool.length; i++) {
            if (pool[i] === numberPicked) {
                pool.splice(i, 1);
                user.push(numberPicked);
                return checkWin(user);
            }
        }
    }
}

function checkStats() {
    console.log(pool);
    console.log(computerAI);
    console.log(user);
}