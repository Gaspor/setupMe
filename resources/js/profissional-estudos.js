let botao = document.querySelector(".button");
var check = false;
function checkBasico() {
    let buttons = document.querySelector("#basico");

    if(buttons.checked){
        check = true;
        window.location.href = "montagem-basica.html";
    }
}
function checkMedio() {
    let buttons = document.querySelector("#medio");

    if(buttons.checked){
        check = true;
        window.location.href = "montagem-medio.html";
    }
}
function checkAvancado() {
    let buttons = document.querySelector("#avançado");

    if(buttons.checked){
        check = true;
        window.location.href = "montagem-avancado.html";
    } 
}

botao.addEventListener("click", () => {
    if (!check){
        document.querySelector("#warning").classList.add("active");

    }
})

