'use strict';
let game;
const pages = [{ "name": "index", "init": function () { } }, { "name": "player_confirm", "init": initPlayerConfirmPage }, { "name": "playing", "init": function () { } }, { "name": "result", "init": initResultPage }];
class WordWolf {

    constructor(players, callBack) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://script.google.com/macros/s/AKfycbyrMcORGEDZe44pD_tgd7EoUd-lZJ48OO5MKkPmajHU_RNLDhPM/exec");
        xhr.onload = function () {
            this.initThemeWords(JSON.parse(xhr.responseText).theme_words);
            let minorNumber = getRandomInt(players.length);
            this.players = players.map(function (name, index, array) {
                return new Player(name, (index === minorNumber) ? this.minorWord : this.majorWord, index != minorNumber)
            }, this);
            this.willConfirmWordPlayers = this.players.slice(0, this.players.length);
            callBack();
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
    button.classList.replace("btn-primary", "btn-default");
    button.setAttribute("disabled", "disabled");
    button.textContent = "処理中";
    let playerCount = document.getElementById("player_count").value;
    let players = [];
    for (let i = 1; i <= playerCount; i++) {
        players.push(document.getElementById("player" + i).value);
    }
    game = new WordWolf(
        players
        , function () { viewNextPage('player_confirm') }
    );
}


function onPlayerCountChanged(number) {
    for (let i = 4; i <= 10; i++) {
        let groupPlayerDiv = document.getElementById("group-player" + i);
        if (i <= number) {
            groupPlayerDiv.style.display = "block";
        } else {
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
        let playerInputDiv = createPlayerDivElement(i, defaultValues[i - 1]);
        configFormElement.appendChild(playerInputDiv);
    }
    onPlayerCountChanged(4);
});

function createPlayerDivElement(i, defaultValue) {
    let playerInputDiv = document.createElement("div");
    playerInputDiv.setAttribute("class", "form-group");
    playerInputDiv.setAttribute("id", "group-player" + i);
    playerInputDiv.appendChild(createPlayerNameLabel(i));
    playerInputDiv.appendChild(createPlayerNameTextElement(i, defaultValue));
    return playerInputDiv;
}

function createPlayerNameTextElement(i, defaultValue) {
    let textElement = document.createElement("input");
    textElement.setAttribute("type", "text");
    textElement.setAttribute("class", "form-control players");
    textElement.setAttribute("id", "player" + i);
    textElement.value = defaultValue;
    return textElement;
}

function createPlayerNameLabel(i) {
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", "player" + i);
    labelElement.textContent = i + "人目のプレーヤー";
    return labelElement;
}

function viewNextPage(nextPage) {
    if (nextPage === "player_confirm" && game.willConfirmWordPlayers.length === 0) {
        nextPage = "playing";
    }
    pages.forEach(function (page) {
        if(page.name === nextPage){
            document.getElementById(page.name).style.display = "block";
            page.init();
        }else{
            document.getElementById(page.name).style.display = "none";
        }
    });
}
function initPlayerConfirmPage(){
    let currentPlayer = game.willConfirmWordPlayers.splice(0, 1)[0];
    document.getElementById("plyaer_name").textContent = currentPlayer.name;
    document.getElementById("theme_word").textContent = currentPlayer.word;
    document.getElementById("theme_word_area").hidden = true;
}
function showThemeArea(){
    document.getElementById("theme_word_area").hidden = false;
}
function initResultPage(){
    document.getElementById("minor_word").textContent = game.minorWord;
    document.getElementById("major_word").textContent = game.majorWord;

    game.players.forEach(player => {
        let listElement = document.createElement("li");
        listElement.textContent = player.name + "さん"
        if(player.isMajor){
            document.getElementById("major_players").appendChild(listElement);
        }else{
            document.getElementById("minor_players").appendChild(listElement);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    displayTimer(document.getElementById("timer-count"), getGameSeconds());
});

function getGameSeconds() {
    return Number(document.getElementById("timer-minuite").value) * 60;
}

function startTimer(button){
    button.setAttribute("disabled", "disabled");
    updateTimer(document.getElementById("timer-count"), getGameSeconds());
}

function updateTimer(target, secconds) {
    setTimeout(function () {
        secconds -= 1;
        if (secconds <= 0) {
            secconds = 0;
        }else{
            updateTimer(target, secconds);
        }
        displayTimer(target, secconds);
    }, 1000);
}

function displayTimer(target, currentSeconds){
    let minuite = ('00' + Math.floor(currentSeconds / 60)).slice(-2);
    let second = ('00' + (currentSeconds % 60)).slice(-2);
    if(currentSeconds === 0){
        target.textContent = "タイムアップ！"
    }else{
        target.textContent = minuite + ":" + second;
    }
}
function showMajorTheme(button){
    button.style.display = "none";
    document.getElementById("major_word_text").style.display = "block";
}