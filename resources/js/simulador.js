let urlProcessador = "https://setupme.herokuapp.com/processadores";
let urlPlaca_video = "https://setupme.herokuapp.com/placas_video";
let urlPlaca_mae = "https://setupme.herokuapp.com/placas_mae";
let urlRAMS = "https://setupme.herokuapp.com/rams";
let urlStorage = "https://setupme.herokuapp.com/armazenamentos";
let urlFonte = "https://setupme.herokuapp.com/fontes";

const getInformacoes = document.querySelector("#botao-montar");

let computador = {
    processador: {
        nome: "",
        valor: ""
    },
    placa_video: {
        nome: "",
        valor: ""
    },
    placa_mae: {
        nome: "",
        valor: ""
    },
    ram: {
        nome: "",
        valor: ""
    },
    hd: {
        nome: "",
        valor: ""
    },
    ssd: {
        nome: "",
        valor: ""
    },
    fonte: {
        nome: "",
        valor: ""
    },
}

async function getJson(url) {
    const response = await fetch(url);
    const itens = await response.json();
    return itens;
}

async function setJson(url, tagName) {
    const JSON = await getJson(url);

    await populateDropdown(JSON, tagName);
}

async function populateDropdown(JSON, tagName) {

    for (let i = 0; i < JSON.length; i++) {
        if (tagName == "armazenamento") {
            if (!JSON[i].m2) {
                document.getElementById(`lista_hd`).innerHTML = "";
            } else {
                document.getElementById(`lista_ssd`).innerHTML = "";
            }
        } else {
            document.getElementById(`lista_${tagName}`).innerHTML = "";
        }
    }

    for (let i = 0; i < JSON.length; i++) {
        const preco = JSON[i].preco;
        const nome = JSON[i].nome;
        const gbs = JSON[i].gbs;

        if (tagName == "armazenamento") {
            const storagePrefix = JSON[i].gb >= 128 ? "GB" : "TB";
            if (!JSON[i].m2) {
                document.getElementById(`lista_hd`).innerHTML += '<li class="hd"><p onclick="clicked(\'' + preco + '\',\'' + nome + '\',\'' + "hd" + '\')">' + nome + ' ' + storagePrefix + ' ' + JSON[i].gb + '</p></li>';
            } else {
                document.getElementById(`lista_ssd`).innerHTML += '<li class="ssd"><p onclick="clicked(\'' + preco + '\',\'' + nome + '\',\'' + "ssd" + '\')">' + nome + ' ' + storagePrefix + ' ' + JSON[i].gb + '</p></li>';
            }
        } else {
            document.getElementById(`lista_${tagName}`).innerHTML += '<li class="' + tagName + '"><p onclick="clicked(\'' + preco + '\',\'' + nome + '\',\'' + tagName + '\')">' + nome + '</p></li>';
        }
    }
}

async function clicked(value, productName, tagName) {
    if (computador[tagName].nome != "") {
        addInTotal(-computador[tagName].valor);
    }
    await populateComputer(value, productName, tagName);
    changeName(productName, tagName);
    addInTotal(value);
    setNone();
    await getCompatibility(productName, tagName);
}

function setNone() {
    proces.style.display = "none";
    placavideo.style.display = "none";
    placamae.style.display = "none";
    ram.style.display = "none";
    hd.style.display = "none";
    ssd.style.display = "none";
    fonte.style.display = "none";
}

async function changeName(productName, tagName) {
    document.getElementById("replace_" + tagName).innerHTML = productName;
}

async function addInTotal(value) {
    const precoElement = document.getElementById(`preco`);
    let preco = parseFloat(precoElement.textContent.replace("R$ ", ""));
    precoElement.innerHTML = "R$ " + (preco + parseFloat(value)).toFixed(2);
}

async function populateComputer(value, productName, tagName) {
    computador[tagName].nome = productName;
    computador[tagName].valor = value
}

async function getCompatibility(productName, tagName) {
    let url = "";
    if (tagName == "processador" || tagName == "ram") {
        url = "https://setupme.herokuapp.com/compatibility/" + tagName + "/" + productName;
        let returnJson = await getJson(url);
        console.log(returnJson);
        populateDropdown(returnJson, "placa_mae");
    }
    if (tagName == "placa_mae") {
        url = "https://setupme.herokuapp.com/compatibility/placa_mae/" + productName;
        let returnJson = await getJson(url);
        console.log(returnJson);
        populateDropdown(returnJson[0].processadores, "processador");
        populateDropdown(returnJson[0].rams, "ram");
    }
    if (tagName == "placa_video") {
        url = "https://setupme.herokuapp.com/compatibility/placa_video/" + productName;
        let returnJson = await getJson(url);
        console.log(returnJson);
        populateDropdown(returnJson, "fonte");
    }
}

getInformacoes.addEventListener("click", () => {
    document.querySelector("#informacoes-extras").classList.add("active");
    document.querySelector("#main").classList.add("active-main");
})

setJson(urlProcessador, "processador");
setJson(urlPlaca_video, "placa_video");
setJson(urlPlaca_mae, "placa_mae");
setJson(urlRAMS, "ram");
setJson(urlStorage, "armazenamento");
setJson(urlFonte, "fonte");

var proces = document.getElementById("processador");
var placavideo = document.getElementById("placavideo");
var placamae = document.getElementById("placamae");
var ram = document.getElementById("ram");
var hd = document.getElementById("hd");
var ssd = document.getElementById("ssd");
var fonte = document.getElementById("fonte");

// Variaveis do botão
var btn_proces = document.getElementById("replace_processador");
var btn_placa_video = document.getElementById("replace_placa_video");
var btn_placa_mae = document.getElementById("replace_placa_mae");
var btn_ram = document.getElementById("replace_ram");
var btn_hd = document.getElementById("replace_hd");
var btn_ssd = document.getElementById("replace_ssd");
var btn_fonte = document.getElementById("replace_fonte");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks on the button, open the modal
btn_proces.onclick = function () {
    proces.style.display = "block";
}

btn_placa_video.onclick = function () {
    placavideo.style.display = "block";
}

btn_placa_mae.onclick = function () {
    placamae.style.display = "block";
}

btn_ram.onclick = function () {
    ram.style.display = "block";
}

btn_hd.onclick = function () {
    hd.style.display = "block";
}

btn_ssd.onclick = function () {
    ssd.style.display = "block";
}

btn_fonte.onclick = function () {
    fonte.style.display = "block";
}



// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    proces.style.display = "none";
}

span.onclick = function () {
    placavideo.style.display = "none";
}

span.onclick = function () {
    placamae.style.display = "none";
}

span.onclick = function () {
    ram.style.display = "none";
}

span.onclick = function () {
    hd.style.display = "none";
}

span.onclick = function () {
    ssd.style.display = "none";
}

span.onclick = function () {
    fonte.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == proces) {
        proces.style.display = "none";
    }

    else if (event.target == placavideo) {
        placavideo.style.display = "none";
    }

    else if (event.target == placamae) {
        placamae.style.display = "none";
    }

    else if (event.target == ram) {
        ram.style.display = "none";
    }

    else if (event.target == hd) {
        hd.style.display = "none";
    }

    else if (event.target == ssd) {
        ssd.style.display = "none";
    }

    else if (event.target == fonte) {
        fonte.style.display = "none";
    }
}
