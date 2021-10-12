let url = "https://setupme.herokuapp.com/montagem/basica";

async function getMotherboards() {
        const response = await fetch(url)
        const itens = await response.json();
        console.log(itens);
        return itens;
}

async function showMB() {
    const JSON = await getMotherboards();
    document.querySelector("#pr").innerHTML = `<div> Processador: ${JSON[0].processador} </div>`;
    document.querySelector("#ram").innerHTML = `<div> Memória RAM: ${JSON[0].ram} </div>`;
    document.querySelector("#mb").innerHTML = `<div> Placa mãe: ${JSON[0].placa_mae} </div>`;
    document.querySelector("#stg").innerHTML = `<div> Armazenamento: ${JSON[0].armazenamento} </div>`;
}

showMB();




