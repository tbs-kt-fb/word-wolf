let timerElement;
let time;
document.addEventListener('DOMContentLoaded', function () {
    timerElement = document.getElementById("timer-count");
    time = 60 * 3;
    displayTimer(time);
});

function startTimer(button){
    button.setAttribute("disabled", "disabled");
    updateTimer(time);
}

function updateTimer(secconds) {
    setTimeout(function () {
        secconds -= 1;
        if (secconds <= 0) {
            secconds = 0;
        }else{
            updateTimer(secconds);
        }
        displayTimer(secconds);
        
    }, 1000);
}

function displayTimer(millisecconds){
    let minuite = ('00' + Math.floor(millisecconds / 60)).slice(-2);
    let second = ('00' + (millisecconds % 60)).slice(-2);
    if(millisecconds === 0){
        timerElement.textContent = "タイムアップ！"
    }else{
        timerElement.textContent = minuite + ":" + second;
    }
}