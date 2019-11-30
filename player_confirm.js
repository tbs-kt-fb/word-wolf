let gameObject = JSON.parse(sessionStorage.getItem('current_wf_game'));
let currentPlayer = gameObject.willConfirmWordPlayers[0];

document.addEventListener('DOMContentLoaded', initPage);
function initPage(){
    document.getElementById("plyaer_name").textContent = currentPlayer.name;
    document.getElementById("theme_word").textContent = currentPlayer.word;
}
function showThemeArea(){
    document.getElementById("theme_word_area").hidden = false;
}
function nextPage(){
    gameObject.willConfirmWordPlayers.splice(gameObject.willConfirmWordPlayers.indexOf(currentPlayer), 1);
    sessionStorage.setItem("current_wf_game", JSON.stringify(gameObject));
    if(gameObject.willConfirmWordPlayers.length > 0){
        window.location.href="player_confirm.html";
    }else{
        window.location.href="playing.html";
    }
}
