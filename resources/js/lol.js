let url = "https://setupme.herokuapp.com/games/lol";

async function getMotherboards() {
        const response = await fetch(url)
        const itens = await response.json();
        console.log(itens);
        return itens;
}

async function showMB() {
    const JSON = await getMotherboards();
    document.querySelector("#vb").innerHTML = `<div> Placa de vídeo: ${JSON[0].placa_video} </div>`;
    document.querySelector("#vm").innerHTML = `<div> Memória da placa de vídeo: ${JSON[0].video_memory} </div>`;
    document.querySelector("#pr").innerHTML = `<div> Processador: ${JSON[0].processador} </div>`;
    document.querySelector("#ram").innerHTML = `<div> Memória RAM: ${JSON[0].ram} </div>`;
}

showMB();