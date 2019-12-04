document.addEventListener('DOMContentLoaded', initPage);

function initPage(){
    gameObject = JSON.parse(sessionStorage.getItem('current_wf_game'));
    document.getElementById("minor_word").textContent = gameObject.minorWord;
    document.getElementById("major_word").textContent = gameObject.majorWord;

    gameObject.players.forEach(player => {
        let listElement = document.createElement("li");
        listElement.textContent = player.name + "さん"
        if(player.isMajor){
            document.getElementById("major_players").appendChild(listElement);
        }else{
            document.getElementById("minor_players").appendChild(listElement);
        }
    });
}
