class WordWolf {

    constructor(players, callBack) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://script.google.com/macros/s/AKfycbyrMcORGEDZe44pD_tgd7EoUd-lZJ48OO5MKkPmajHU_RNLDhPM/exec");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.prototype.DONE) {
                var data = JSON.parse(xhr.responseText);
                this.initThemeWords(data.theme_words);
                this.playerCount = players.length;
                let minorNumber = getRandomInt(this.playerCount);
                this.players = players.map(function (name, index, array) {
                    return new Player(name, (index == minorNumber) ? this.minorWord : this.majorWord, index != minorNumber)
                }, this);
                this.willConfirmWordPlayers = this.players;
                callBack();
                xhr.abort();
            }
        }.bind(this);
        xhr.send();
    }

    initThemeWords(themeWords) {
        this.majorWord = themeWords.splice(getRandomInt(themeWords.length), 1)[0];
        this.minorWord = themeWords.splice(getRandomInt(themeWords.length), 1)[0];
    }

}
class Player {
    constructor(name, word, isMajor) {
        this.isMajor = isMajor;
        this.word = word;
        this.name = name;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function startWordWolf() {
    let players = document.getElementsByClassName("players");
    let wordWolfGame = new WordWolf(
        Array.prototype.map.call(players,
            function (element) {
                return element.value;
            }
        )
        , function () {
            sessionStorage.setItem('current_wf_game', JSON.stringify(wordWolfGame));
            window.location.href = "player_confirm.html";
        }
    );
}

function onPlayerCountChanged(selectBox) {
    alert(selectBox.value);
}

document.addEventListener('DOMContentLoaded', function () {
    let defaultValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let selectElement = document.getElementById("player_count");
    let configFormElement = document.getElementById("playing-config");
    for (let i = 3; i <= 10; i++) {
        if (i >= 3) {
            let optionElement = document.createElement("option");
            optionElement.value = i;
            optionElement.textContent = i + "人";
            if (i === 4) {
                optionElement.selected = true;
            }
            selectElement.appendChild(optionElement);
        }
        let inputPlayerNameLabel = document.createElement("label");
        inputPlayerNameLabel.setAttribute("for", "player" + i);
        inputPlayerNameLabel.textContent = i + "人目のプレーヤー";
        let inputPlayerNameText = document.createElement("input");
        inputPlayerNameText.setAttribute("type", "text");
        inputPlayerNameText.setAttribute("class", "form-control players");
        inputPlayerNameText.setAttribute("id", "player" + i);
        inputPlayerNameText.value = defaultValues[i - 0];
        let playerInputDiv = document.createElement("div");
        playerInputDiv.setAttribute("class", "form-group")
        playerInputDiv.appendChild(inputPlayerNameLabel);
        playerInputDiv.appendChild(inputPlayerNameText);
        configFormElement.appendChild(playerInputDiv);
    }
    // for(let i =  WordWolf.minPlayerCount; i <= WordWolf.maxPlayerCount; i++){
    //     let optionElement = document.createElement("option");
    //     optionElement.value = i;
    //     optionElement.textContent = i + "人";
    //     if(i === WordWolf.defaultPlayerCount){
    //         optionElement.selected = true;
    //     }
    //     selectElement.appendChild(optionElement);
    // }
});