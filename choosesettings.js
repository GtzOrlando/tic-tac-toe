let chooseSettings = (function() {
    let change1 = {
        autoplay: false
    }

    let change2 = {
        autoplay: false
    } 

    let currentPlayers = 1;
    let userStarts = true;

    const onClick = (event) => {
        const id = event.target.id
        let optionP1 = document.getElementById("P1");
        let optionP2 = document.getElementById("P2");
        let optionX = document.getElementById("X");
        let optionO = document.getElementById("O");

        if (id === "P1" && currentPlayers !== 1) {
            currentPlayers = 1;
            userStarts = true;
            optionP1.style.backgroundColor = "lightblue";
            optionP2.style.backgroundColor = "aqua";
            optionX.style.backgroundColor = "lightblue";
            optionO.style.backgroundColor = "aqua";
            changeSettings(1);
        } else if (id === "P2" && currentPlayers === 1) {
            currentPlayers = 2;
            optionP1.style.backgroundColor = "aqua";
            optionP2.style.backgroundColor = "lightblue";
            optionX.style.backgroundColor = "aqua";
            optionO.style.backgroundColor = "aqua";
            changeSettings(2);
        } else if (id === "X" && !userStarts && currentPlayers === 1) {
            userStarts = true;
            optionX.style.backgroundColor = "lightblue";
            optionO.style.backgroundColor = "aqua";
            changeSettings(3);
        } else if (id === "O" && userStarts && currentPlayers === 1) {
            userStarts = false;
            optionX.style.backgroundColor = "aqua";
            optionO.style.backgroundColor = "lightblue";
            changeSettings(4);
        }

    }

    function changeSettings (option) {
        let sendSettings = [];

        if (option === 1 || option === 3) {
            change1.autoplay = false;
            change2.autoplay = true;
            sendSettings.push(change1);
            sendSettings.push(change2);
        } else if (option === 2) {
            change1.autoplay = false;
            change2.autoplay = false;
            sendSettings.push(change1);
            sendSettings.push(change2);
        } else {
            change1.autoplay = true;
            change2.autoplay = false;
            sendSettings.push(change1);
            sendSettings.push(change2);
        }


        events.send('newSettings', sendSettings);
    }

    document.addEventListener('click', onClick);
})();