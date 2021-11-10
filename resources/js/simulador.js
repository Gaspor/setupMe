let urlProcessador = "https://setupme.herokuapp.com/processadores";
let urlPlaca_video = "https://setupme.herokuapp.com/placas_video";
let urlPlaca_mae = "https://setupme.herokuapp.com/placas_mae";
let urlRAMS = "https://setupme.herokuapp.com/rams";
let urlStorage = "https://setupme.herokuapp.com/armazenamentos";
let urlFonte = "https://setupme.herokuapp.com/fontes";

async function getJson(url) {
    const response = await fetch(url);
    const itens = await response.json();
    return itens;
}

async function populateDropdown(url, tagName) {
    const JSON = await getJson(url);

    for(let i = 0; i < JSON.length; i++) {
        const preco = JSON[i].preco;
        const nome = JSON[i].nome;
        if (tagName == "armazenamento") {
            const storagePrefix = JSON[i].gb >= 128 ? "GB" : "TB";
            if (!JSON[i].m2) {
                document.getElementById(`lista_hd`).innerHTML += `<li class="hd"><p onclick="clicked(${JSON[i].preco}, ${JSON[i].nome}, ${tagName})"> ${JSON[i].nome} ${storagePrefix} ${JSON[i].gb} </p></li>`;    
            } else {
                document.getElementById(`lista_ssd`).innerHTML += `<li class="ssd"><p onclick="clicked(${JSON[i].preco}, ${JSON[i].nome}, ${tagName})"> ${JSON[i].nome} ${storagePrefix} ${JSON[i].gb} </p></li>`;
            }
        } else {
            document.getElementById(`lista_${tagName}`).innerHTML += "<li class="+tagName+"><p onclick=\"clicked("+preco+", "+nome+", "+tagName+")\"> "+nome+"</p></li>";
            console.log(preco);
        }
    }
}

async function clicked(value, productName, tagName) {
    // changeName(productName, tagName);
    console.log(value);
    addInTotal(value);
}

async function changeName(productName, tagName) {
    document.getElementById("replace").innerHTML += productName;
}

async function addInTotal(value) {
    const precoElement = document.getElementById(`preco`);
    let preco = parseFloat(precoElement.textContent.replace("R$ ", ""));
    precoElement.innerHTML = "R$ " + (preco + parseFloat(value)).toFixed(2);
}

populateDropdown(urlProcessador, "processador");
populateDropdown(urlPlaca_video, "placa_video");
populateDropdown(urlPlaca_mae, "placa_mae");
populateDropdown(urlRAMS, "ram");
populateDropdown(urlStorage, "armazenamento");
populateDropdown(urlFonte, "fonte");