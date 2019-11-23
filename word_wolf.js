window.onload = function(){
    sessionStorage.setItem('key', 'value');
}

function test(){
    alert(sessionStorage.getItem('key') );
}