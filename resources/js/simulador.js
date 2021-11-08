let urlProcessador = "https://setupme.herokuapp.com/processadores";
let urlPlaca_video = "https://setupme.herokuapp.com/placas_video";
let urlPlaca_mae = "https://setupme.herokuapp.com/placas_mae";
let urlRAMS = "https://setupme.herokuapp.com/rams";
let urlStorage = "https://setupme.herokuapp.com/armazenamentos";
let urlFonte = "https://setupme.herokuapp.com/fontes";

async function getJson(url) {
    const response = await fetch(url);
    const itens = await response.json();
    console.log(itens);
    return itens;
}

async function populateDropdown(url, tagName) {
    const JSON = await getJson(url);

    for(let i = 0; i < JSON.length; i++) {
        document.getElementById(`lista_${tagName}`).innerHTML += `<li class="${tagName}"><p> ${JSON[i].nome} </p></li>\n`;
    
    }
}

async function getStorage_sim() {
    const JSON = await getStorage();
    document.querySelector("#hd1").innerHTML = `<p> ${JSON[1].nome}, TB: ${JSON[1].gb} </p>`;
    document.querySelector("#hd2").innerHTML = `<p> ${JSON[3].nome}, TB: ${JSON[3].gb} </p>`;
    document.querySelector("#ssd1").innerHTML = `<p> ${JSON[0].nome}, GB: ${JSON[0].gb} </p>`;
    document.querySelector("#ssd2").innerHTML = `<p> ${JSON[2].nome}, GB: ${JSON[2].gb} </p>`;
}


populateDropdown(urlProcessador, "processador");
populateDropdown(urlPlaca_video, "placa_video");
populateDropdown(urlPlaca_mae, "placa_mae");
populateDropdown(urlRAMS, "ram");
populateDropdown(urlStorage, "armazenamento");
populateDropdown(urlFonte, "fonte");