let urlProcessador = "https://setupme.herokuapp.com/processadores";
let urlPlaca_video = "https://setupme.herokuapp.com/placas_video";
let urlPlaca_mae = "https://setupme.herokuapp.com/placas_mae";
let urlRAMS = "https://setupme.herokuapp.com/rams";
let urlStorage = "https://setupme.herokuapp.com/armazenamentos";
let urlFonte = "https://setupme.herokuapp.com/fontes";

const scoreMax = 20;

const getInformacoes = document.querySelector("#botao-montar");
const qtdButtons = document.querySelector("#qtd");

let computador = {
    processador: {
        nome: "",
        valor: "",
        score: 0
    },
    placa_video: {
        nome: "",
        valor: "",
        score: 0
    },
    placa_mae: {
        nome: "",
        valor: "",
        qtdRam: 0
    },
    ram: {
        nome: "",
        valor: 0,
        qtd: 0
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
    //console.log(JSON);
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
        const preco = JSON[i].preco != 0 ? JSON[i].preco.toFixed(2) : JSON[i].preco;
        let nome = JSON[i].nome;
        let rams = 0;

        if (tagName == "placa_mae") {
            rams = JSON[i].slotsDeMemoria;
        }

        //if (JSON[i].preco > 0) {
            if (tagName == "armazenamento") {
                const storagePrefix = JSON[i].gb >= 128 ? "GB" : "TB";
                nome = nome + " " + JSON[i].gb + " " + storagePrefix;
                if (!JSON[i].m2) {
                    document.getElementById(`lista_hd`).innerHTML += '<li onclick="clicked(\'' + preco + '\',\'' + nome + '\',\'' + "hd" + '\')" class="hd"><p>' + nome + ' ' + '</p><p id=preco-peca> R$ ' + preco + '</p></li>';
                } else {
                    document.getElementById(`lista_ssd`).innerHTML += '<li onclick="clicked(\'' + preco + '\',\'' + nome + '\',\'' + "ssd" + '\')" class="ssd"><p>' + nome + ' ' + '</p><p id=preco-peca> R$ ' + preco + '</p></li>';
                }
            } else {
                if (tagName == "ram") {
                    const gbs = JSON[i].gbs;
                    nome = nome + " " + gbs + "GB";
                }
                if (tagName == "fonte") {
                    const watts = JSON[i].watts;
                    nome = nome + " " + watts + "W";
                }
                document.getElementById(`lista_${tagName}`).innerHTML += '<li onclick="clicked(\'' + preco + '\',\'' + nome + '\',\'' + tagName + '\' ,\'' + rams + '\')" class="' + tagName + '"><p>' + nome + '</p><p id=preco-peca> R$ ' + preco + '</p></li>';
            }
        //}
    }
}

async function clicked(value, productName, tagName, rams) {
    if (computador[tagName].nome != productName) {
        await addPlusButton(tagName);
        addInTotal(-computador[tagName].valor)
        await populateComputer(value, productName, tagName);
        changeName(productName, tagName);
        addInTotal(value);
        setNone();
        await getCompatibility(productName, tagName);
        if (tagName == "placa_mae") {
            computador.placa_mae.qtdRam = rams;

        }
        
    } else {
        setNone();
    }
    
}

async function addPlusButton(tagName) {
    if (tagName == "ram") {
        const aux = computador.ram.qtd * computador.ram.valor;
        addInTotal(-aux);
        computador.ram.qtd = 1;
        updateRamQtd();
        qtd.style.visibility = "visible";

    }
}

function addRam() {
    if (computador.ram.qtd < computador.placa_mae.qtdRam) {
        computador.ram.qtd++;
        addInTotal(computador.ram.valor);
        updateRamQtd();
    }
}

function removeRam() {
    if (computador.ram.qtd > 0) {
    computador.ram.qtd--;
    addInTotal(-computador.ram.valor);
    updateRamQtd();
    }
}

async function updateRamQtd() {
    document.getElementById("qtdRam").innerHTML = computador.ram.qtd;
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
    if (computador[tagName].nome == "Core i7-11700F"){
        computador[tagName].score = 7;
    }
    if (computador[tagName].nome == "Core i9-10900") {
        computador[tagName].score = 10;
    }
    if (computador[tagName].nome == "Ryzen 5 3600") {
        computador[tagName].score = 6;
    }
    if (computador[tagName].nome == "Ryzen 5 5600X") {
        computador[tagName].score = 10;
    }
    if (computador[tagName].nome == "GeForce RTX 3060 Ti XC Gaming") {
        computador[tagName].score = 10;
    }
    if (computador[tagName].nome == "Dual RX 6600 XT O8G") {
        computador[tagName].score = 8;
    }
    if (computador[tagName].nome == "GeForce GTX 1650") {
        computador[tagName].score = 6;
    }
    if (computador[tagName].nome == "Radeon RX 6900XT Limited Black Gaming") {
        computador[tagName].score = 10;
    }
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
        //console.log(returnJson);
        populateDropdown(returnJson[0].processadores, "processador");
        populateDropdown(returnJson[0].rams, "ram");
    }
    if (tagName == "placa_video") {
        url = "https://setupme.herokuapp.com/compatibility/placa_video/" + productName;
        let returnJson = await getJson(url);
        //console.log(returnJson);
        populateDropdown(returnJson, "fonte");
    }
    if (tagName == "fonte") {
        url = "https://setupme.herokuapp.com/compatibility/fonte/" + productName;
        let returnJson = await getJson(url);
        //console.log(returnJson);
        populateDropdown(returnJson, "placa_video");
    }
}

getInformacoes.addEventListener("click", () => {
    const scoreTotal = computador.processador.score + computador.placa_video.score;
    const probabilidade = (100/scoreMax) * scoreTotal;
    document.querySelector("#informacoes-extras").classList.add("active");
    document.querySelector("#main").classList.add("active-main");
    document.querySelector("#probabilidade").innerHTML = `Este computador tem o desempenho de ${probabilidade}% em jogos e estudos.`;
    document.querySelector("#sistema-operacional").innerHTML = `O sistema operacional é algo pessoal, para saber mais sobre isso consulte este <a href="https://recoverit.wondershare.com.br/computer-tips/linux-vs-windows.html" target="_blank"> link.</a>`;
    document.querySelector("#internet").innerHTML = `O plano de internet é algo pessoal, para saber qual o melhor para sua ocasiao consulte este <a href="https://melhorplano.net" target="_blank"> link.</a>`;
});

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
