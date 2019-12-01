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

window.onload = function () {
    sessionStorage.setItem('key', 'value');
}