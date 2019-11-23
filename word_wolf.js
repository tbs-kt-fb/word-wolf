window.onload = function(){
    sessionStorage.setItem('key', 'value');
}

// sessionStorage に保存したデータを取得する
var data = sessionStorage.getItem('key');
function test(){
    alert(sessionStorage.getItem('key') );
}