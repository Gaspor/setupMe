
function checkBasico() {
    let buttons = document.querySelector("#basico");

    if(buttons.checked){
        window.location.href = "montagem-basica.html";
    }
}
function checkMedio() {
    let buttons = document.querySelector("#medio");

    if(buttons.checked){
        window.location.href = "montagem-medio.html";
    }
}
function checkAvancado() {
    let buttons = document.querySelector("#avançado");

    if(buttons.checked){
        window.location.href = "montagem-avancado.html";
    }
}