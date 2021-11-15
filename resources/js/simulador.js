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
        document.getElementById("probabilidade").innerHTML = "O desempenho desse computador para jogos e para estudos é de aproximadamente 80%.";
        document.getElementById("sistema-operacional").innerHTML = "O sistema operacional recomendado para este computador é Windows 7/8/8.1/10 e Linux.";
        document.getElementById("internet").innerHTML = "O plano de internet recomendado é de 10 a 50 megas.";
    }
    if (computador.processador == "Ryzen 5 5600X" && computador.placa_video == "Dual RX 6600 XT O8G" && computador.placa_mae == "ROG MAXIMUS XII FORMULA" && computador.ram == "PNY Performance" && (computador.hd == "HD BarraCuda" || computador.ssd == "M2 NVME SX6000 Lite") && computador.fonte == "GP-P550B") {
        document.getElementById("probabilidade").innerHTML = "O desempenho desse computador para jogos e para estudos é de aproximadamente 60%.";
        document.getElementById("sistema-operacional").innerHTML = "O sistema operacional recomendado para este computador é Windows 7/8/8.1/10 e Linux.";
        document.getElementById("internet").innerHTML = "O plano de internet recomendado é de 10 a 50 megas.";
    }
    if (computador.processador == "Ryzen 5 3600" && computador.placa_video == "Radeon RX 6900XT Limited Black Gaming" && computador.placa_mae == "MPG Z490 GAMING CARBON WIFI" && computador.ram == "PNY Performance" && (computador.hd == "HD BarraCuda" || computador.ssd == "M2 NVME SX6000 Lite") && computador.fonte == "GP-P550B") {
        document.getElementById("probabilidade").innerHTML = "O desempenho desse computador para jogos e para estudos é de aproximadamente 40%.";
        document.getElementById("sistema-operacional").innerHTML = "O sistema operacional recomendado para este computador é Windows 7/8/8.1/10 e Linux.";
        document.getElementById("internet").innerHTML = "O plano de internet recomendado é de 10 a 50 megas.";
    }
    else {
        document.getElementById("probabilidade").innerHTML = "Não há dados suficientes para retornar informações extras da montagem.";
    }
}


populateDropdown(urlProcessador, "processador");
populateDropdown(urlPlaca_video, "placa_video");
populateDropdown(urlPlaca_mae, "placa_mae");
populateDropdown(urlRAMS, "ram");
populateDropdown(urlStorage, "armazenamento");
populateDropdown(urlFonte, "fonte");