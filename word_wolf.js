class WordWolf{

    constructor(players){
        this.initThemeWords();
        this.playerCount = players.length;
        let minorNumber = getRandomInt(this.playerCount);
        this.players = players.map(function(name, index, array){
            return new Player(name, (index == minorNumber)? this.minorWord : this.majorWord, index != minorNumber)
        },this);
   
    }

    initThemeWords(){
        let themeWords = ["プロテイン", "ビタミン"];
        this.majorWord = themeWords[0];
        this.minorWord = themeWords[1];
    }
    
}
class Player{
    constructor(name, word, isMajor){
        this.isMajor = isMajor;
        this.word = word;
        this.name = name;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getPlayersNames(){
    let players = document.getElementsByClassName("players");
    let wordWolfGame = new WordWolf(Array.prototype.map.call(players, function(element){
        return element.value;
    }));
}

window.onload = function(){
    sessionStorage.setItem('key', 'value');
}

function test(){
    alert(sessionStorage.getItem('key') );
}