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


function startWordWolf(button) {
    button.setAttribute("class", "btn btn-default");
    button.setAttribute("disabled", "disabled");
    button.textContent = "準備中";
    let playerCount = document.getElementById("player_count").value;
    let players = [];
    for(i = 1; i <= playerCount; i++){
        players.push(document.getElementById("player" + i).value);
    }
    let wordWolfGame = new WordWolf(
        players
        , function () {
            sessionStorage.setItem('current_wf_game', JSON.stringify(wordWolfGame));
            window.location.href = "player_confirm.html";
        }
    );
}


function onPlayerCountChanged(number){
    for(i = 4; i <= 10; i++){
        let groupPlayerDiv = document.getElementById("group-player" + i);
        if( i <= number){
            groupPlayerDiv.style.display = "block";
        }else{
            groupPlayerDiv.style.display = "none";
        }
    }
    
}

document.addEventListener('DOMContentLoaded', function () {
    let defaultValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let selectElement = document.getElementById("player_count");
    let configFormElement = document.getElementById("playing-config");
    for (let i = 1; i <= 10; i++) {
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
        inputPlayerNameText.value = defaultValues[i - 1];
        let playerInputDiv = document.createElement("div");
        playerInputDiv.setAttribute("class", "form-group")
        playerInputDiv.setAttribute("id", "group-player" + i);
        playerInputDiv.appendChild(inputPlayerNameLabel);
        playerInputDiv.appendChild(inputPlayerNameText);
        configFormElement.appendChild(playerInputDiv);
    }
    onPlayerCountChanged(4);
});