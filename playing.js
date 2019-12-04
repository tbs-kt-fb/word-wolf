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