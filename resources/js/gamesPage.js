function goGamePage(gameName) {
    localStorage.setItem('campo1', gameName);
    location.href = "/../../gamesPage.html";

}

function loadPage() {
    let url;
    const gameName = window.localStorage.getItem('campo1');
    document.getElementById("gameName").innerHTML = `Requisitos mínimos para jogar ${gameName}:`;

    if (gameName == "Fortnite") {
        url = "https://setupme.herokuapp.com/games/fortnite";

    }
    if (gameName == "GTA V") {
        url = "https://setupme.herokuapp.com/games/gtav";

    }
    if (gameName == "Apex Legends") {
        url = "https://setupme.herokuapp.com/games/apex";

    }
    if (gameName == "League of Legends") {
        url = "https://setupme.herokuapp.com/games/lol";

    }
    if (gameName == "Valorant") {
        url = "https://setupme.herokuapp.com/games/valorant";

    }
    if (gameName == "CS:GO") {
        url = "https://setupme.herokuapp.com/games/csgo";

    }
    if (gameName == "Minecraft") {
        url = "https://setupme.herokuapp.com/games/minecraft";

    }
    if (gameName == "FIFA 21") {
        url = "https://setupme.herokuapp.com/games/fifa21";

    }
    if (gameName == "COD Warzone") {
        url = "https://setupme.herokuapp.com/games/cod";

    }
    if (gameName == "DOTA 2") {
        url = "https://setupme.herokuapp.com/games/dota2";

    }

    showAll(url);

}

async function getInfo(url) {
        const response = await fetch(url)
        const itens = await response.json();
        console.log(itens);
        return itens;
}

async function showAll(url) {
    const JSON = await getInfo(url);
    document.querySelector("#vb").innerHTML = `<div> Placa de vídeo: ${JSON[0].placa_video} </div>`;
    document.querySelector("#vm").innerHTML = `<div> Memória da placa de vídeo: ${JSON[0].video_memory} </div>`;
    document.querySelector("#pr").innerHTML = `<div> Processador: ${JSON[0].processador} </div>`;
    document.querySelector("#ram").innerHTML = `<div> Memória RAM: ${JSON[0].ram} </div>`;
}

loadPage();
