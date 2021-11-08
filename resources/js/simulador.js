let urlProcessador = "https://setupme.herokuapp.com/processadores";
let urlPlaca_video = "https://setupme.herokuapp.com/placas_video";
let urlPlaca_mae = "https://setupme.herokuapp.com/placas_mae";
let urlRAMS = "https://setupme.herokuapp.com/rams";
let urlStorage = "https://setupme.herokuapp.com/armazenamentos";
let urlFonte = "https://setupme.herokuapp.com/fontes";

async function getProcessador() {
    const response = await fetch(urlProcessador)
    const itens = await response.json();
    return itens;
}
async function getPlaca_video() {
    const response = await fetch(urlPlaca_video)
    const itens = await response.json();
    return itens;
}
async function getPlaca_mae() {
    const response = await fetch(urlPlaca_mae);
    const itens = await response.json();
    return itens;
}
async function getRAMS() {
    const response = await fetch(urlRAMS);
    const itens = await response.json();
    return itens;
}
async function getStorage() {
    const response = await fetch(urlStorage)
    const itens = await response.json();
    return itens;
}
async function getFontes() {
    const response = await fetch(urlFonte)
    const itens = await response.json();
    return itens;
}

async function getProcessador_sim() {
    const JSON = await getProcessador();
    document.querySelector("#processador1").innerHTML = `<p> ${JSON[0].nome} </p>`;
    document.querySelector("#processador2").innerHTML = `<p> ${JSON[1].nome} </p>`;
    document.querySelector("#processador3").innerHTML = `<p> ${JSON[2].nome} </p>`;
    document.querySelector("#processador4").innerHTML = `<p> ${JSON[3].nome} </p>`;
}
async function getPlaca_video_sim() {
    const JSON = await getPlaca_video();
    document.querySelector("#placa_video1").innerHTML = `<p> ${JSON[0].nome} </p>`;
    document.querySelector("#placa_video2").innerHTML = `<p> ${JSON[1].nome} </p>`;
    document.querySelector("#placa_video3").innerHTML = `<p> ${JSON[2].nome} </p>`;
    document.querySelector("#placa_video4").innerHTML = `<p> ${JSON[3].nome} </p>`;
}
async function getPlaca_mae_sim() {
    const JSON = await getPlaca_mae();
    document.querySelector("#placa_mae1").innerHTML = `<p> ${JSON[0].nome} </p>`;
    document.querySelector("#placa_mae2").innerHTML = `<p> ${JSON[1].nome} </p>`;
    document.querySelector("#placa_mae3").innerHTML = `<p> ${JSON[2].nome} </p>`;
    document.querySelector("#placa_mae4").innerHTML = `<p> ${JSON[3].nome} </p>`;
}
async function getRAMS_sim() {
    const JSON = await getRAMS();
    document.querySelector("#memoria_ram1").innerHTML = `<p> ${JSON[0].nome} </p>`;
    document.querySelector("#memoria_ram2").innerHTML = `<p> ${JSON[1].nome} </p>`;
    document.querySelector("#memoria_ram3").innerHTML = `<p> ${JSON[2].nome} </p>`;
}
async function getStorage_sim() {
    const JSON = await getStorage();
    document.querySelector("#hd1").innerHTML = `<p> ${JSON[1].nome}, TB: ${JSON[1].gb} </p>`;
    document.querySelector("#hd2").innerHTML = `<p> ${JSON[3].nome}, TB: ${JSON[3].gb} </p>`;
    document.querySelector("#ssd1").innerHTML = `<p> ${JSON[0].nome}, GB: ${JSON[0].gb} </p>`;
    document.querySelector("#ssd2").innerHTML = `<p> ${JSON[2].nome}, GB: ${JSON[2].gb} </p>`;
}
async function getFontes_sim() {
    const JSON = await getFontes();
    document.querySelector("#fontes1").innerHTML = `<p> ${JSON[0].nome} </p>`;
    document.querySelector("#fontes2").innerHTML = `<p> ${JSON[1].nome} </p>`;
}

async function Processador1 () {
    const JSON = await getProcessador();
    document.querySelector("#replace-processador").innerHTML = `${JSON[0].nome}`;
    document.querySelector("#preco").innerHTML = `${JSON[0].preco}`;
}
async function Processador2 () {
    const JSON = await getProcessador();
    document.querySelector("#replace-processador").innerHTML = `${JSON[1].nome}`;
    document.querySelector("#preco").innerHTML = `${JSON[1].preco}`;
}
async function Processador3 () {
    const JSON = await getProcessador();
    document.querySelector("#replace-processador").innerHTML = `${JSON[2].nome}`;
    document.querySelector("#preco").innerHTML = `${JSON[2].preco}`;
}
async function Processador4 () {
    const JSON = await getProcessador();
    document.querySelector("#replace-processador").innerHTML = `${JSON[3].nome}`;
    document.querySelector("#preco").innerHTML = `${JSON[3].preco}`;
}

getProcessador_sim();
getPlaca_video_sim();
getPlaca_mae_sim();
getRAMS_sim();
getStorage_sim();
getFontes_sim();