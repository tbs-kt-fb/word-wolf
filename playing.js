let timerElement;
let time;
document.addEventListener('DOMContentLoaded', function () {
    timerElement = document.getElementById("timer-count");
    time = 60 * 1000 * 3;
    displayTimer(time);
});

function updateTimer(millisecconds) {
    if(millisecconds == null){
        millisecconds = time;
    }
    let intervalId = setTimeout(function () {
        millisecconds -= 1000;
        if (millisecconds <= 0) {
            clearInterval(intervalId);
            millisecconds = 0;
        }else{
            updateTimer(millisecconds);
        }
        displayTimer(millisecconds);
        
    }, 1000);
}

function displayTimer(millisecconds){
    let minuite = ('00' + Math.floor(millisecconds / 60000)).slice(-2);
    let second = ('00' + Math.floor((millisecconds % 60000) / 1000)).slice(-2);
    if(millisecconds === 0){
        timerElement.textContent = "タイムアップ！"
    }else{
        timerElement.textContent = minuite + ":" + second;
    }
}