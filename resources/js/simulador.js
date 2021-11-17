let urlProcessador = "https://setupme.herokuapp.com/processadores";
let urlPlaca_video = "https://setupme.herokuapp.com/placas_video";
let urlPlaca_mae = "https://setupme.herokuapp.com/placas_mae";
let urlRAMS = "https://setupme.herokuapp.com/rams";
let urlStorage = "https://setupme.herokuapp.com/armazenamentos";
let urlFonte = "https://setupme.herokuapp.com/fontes";

let computador = {
    processador: "",
    placa_video: "",
    placa_mae: "",
    ram: "",
    hd: "",
    ssd: "",
    fonte: "",
}

async function getJson(url) {
    const response = await fetch(url);
    const itens = await response.json();
    return itens;
}

async function populateDropdown(url, tagName) {
    const JSON = await getJson(url);

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
    await populateComputer(productName, tagName);
    changeName(productName, tagName);
    addInTotal(value);
}

async function changeName(productName, tagName) {
    document.getElementById("replace_" + tagName).innerHTML = productName;
}

async function addInTotal(value) {
    const precoElement = document.getElementById(`preco`);
    let preco = parseFloat(precoElement.textContent.replace("R$ ", ""));
    precoElement.innerHTML = "R$ " + (preco + parseFloat(value)).toFixed(2);
}

async function populateComputer(productName, tagName) {
    computador[tagName] = productName;
    // console.log(computador[tagName]);
}

function changeP() {
    // console.log(computador.processador);
    if (computador.processador == "Core i9-10900" && computador.placa_video == "GeForce RTX 3060 Ti XC Gaming" && computador.placa_mae == "B550M DS3H" && computador.ram == "XPG Spectrix D41" && (computador.hd == "HD Barracuda" || computador.ssd == "M2 NVME Blue") && computador.fonte == "Core Reactor") {
        document.getElementById("probabilidade").innerHTML = "O desempenho desse computador para jogos e para estudos é de aproximadamente 100%.";
        document.getElementById("sistema-operacional").innerHTML = "O sistema operacional recomendado para este computador é Windows 7/8/8.1/10 e Linux.";
        document.getElementById("internet").innerHTML = "O plano de internet recomendado para este computador é de 10 a 50 megas.";
    }
    if (computador.processador == "Core i7-11700F" && computador.placa_video == "GeForce GTX 1650" && computador.placa_mae == "ROG Strix X570-E Gaming" && computador.ram == "Patriot Viper Elite" && (computador.hd == "HD BarraCuda" || computador.ssd == "M2 NVME SX6000 Lite") && computador.fonte == "GP-P550B") {
        document.getElementById("probabilidade").innerHTML = "O desempenho desse computador para jogos e para estudos é de aproximadamente 90%.";
        document.getElementById("sistema-operacional").innerHTML = "O sistema operacional recomendado para este computador é Windows 7/8/8.1/10 e Linux.";
        document.getElementById("internet").innerHTML = "O plano de internet recomendado é de 10 a 50 megas.";
    }
    if (computador.processador == "Ryzen 5 5600X" && computador.placa_video == "Dual RX 6600 XT O8G" && computador.placa_mae == "ROG MAXIMUS XII FORMULA" && computador.ram == "PNY Performance" && (computador.hd == "HD BarraCuda" || computador.ssd == "M2 NVME SX6000 Lite") && computador.fonte == "GP-P550B") {
        document.getElementById("probabilidade").innerHTML = "O desempenho desse computador para jogos e para estudos é de aproximadamente 80%.";
        document.getElementById("sistema-operacional").innerHTML = "O sistema operacional recomendado para este computador é Windows 7/8/8.1/10 e Linux.";
        document.getElementById("internet").innerHTML = "O plano de internet recomendado é de 10 a 50 megas.";
    }
    if (computador.processador == "Ryzen 5 3600" && computador.placa_video == "Radeon RX 6900XT Limited Black Gaming" && computador.placa_mae == "MPG Z490 GAMING CARBON WIFI" && computador.ram == "PNY Performance" && (computador.hd == "HD BarraCuda" || computador.ssd == "M2 NVME SX6000 Lite") && computador.fonte == "GP-P550B") {
        document.getElementById("probabilidade").innerHTML = "O desempenho desse computador para jogos e para estudos é de aproximadamente 70%.";
        document.getElementById("sistema-operacional").innerHTML = "O sistema operacional recomendado para este computador é Windows 7/8/8.1/10 e Linux.";
        document.getElementById("internet").innerHTML = "O plano de internet recomendado é de 10 a 50 megas.";
    }
}


populateDropdown(urlProcessador, "processador");
populateDropdown(urlPlaca_video, "placa_video");
populateDropdown(urlPlaca_mae, "placa_mae");
populateDropdown(urlRAMS, "ram");
populateDropdown(urlStorage, "armazenamento");
populateDropdown(urlFonte, "fonte");

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
var btn_fonte =  document.getElementById("replace_fonte");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks on the button, open the modal
btn_proces.onclick = function() {
    proces.style.display = "block";
}

btn_placa_video.onclick = function(){
    placavideo.style.display = "block";
}

btn_placa_mae.onclick = function(){
    placamae.style.display = "block";
}

btn_ram.onclick = function(){
    ram.style.display = "block";
}

btn_hd.onclick = function(){
    hd.style.display = "block";
}

btn_ssd.onclick = function(){
    ssd.style.display = "block";
}

btn_fonte.onclick = function(){
    fonte.style.display = "block";
}



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    proces.style.display = "none";
}

span.onclick = function(){
    placavideo.style.display = "none";
}

span.onclick = function() {
    placamae.style.display = "none";
}

span.onclick = function() {
    ram.style.display = "none";
}

span.onclick = function() {
    hd.style.display = "none";
}

span.onclick = function() {
    ssd.style.display = "none";
}

span.onclick = function() {
    fonte.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == proces) {
      proces.style.display = "none";
    }

    else if(event.target == placavideo){
        placavideo.style.display = "none";
    }

    else if(event.target == placamae){
        placamae.style.display = "none";
    }

    else if(event.target == ram){
        ram.style.display = "none";
    }

    else if(event.target == hd){
        hd.style.display = "none";
    }

    else if(event.target == ssd){
        ssd.style.display = "none";
    }

    else if(event.target == fonte){
        fonte.style.display = "none";
    }
  }