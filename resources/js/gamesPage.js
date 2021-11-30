const games = [
    {
        name: "Fortnite",
        url: "https://setupme.herokuapp.com/games/fortnite"
    },
    {
        name: "GTA V",
        url: "https://setupme.herokuapp.com/games/gtav"
    },
    {
        name: "Apex Legends",
        url: "https://setupme.herokuapp.com/games/apex"
    },
    {
        name: "League of Legends",
        url: "https://setupme.herokuapp.com/games/lol"
    },
    {
        name: "Valorant",
        url: "https://setupme.herokuapp.com/games/valorant"
    },
    {
        name: "CS:GO",
        url: "https://setupme.herokuapp.com/games/csgo"
    },
    {
        name: "Minecraft",
        url: "https://setupme.herokuapp.com/games/minecraft"
    },
    {
        name: "FIFA 21",
        url: "https://setupme.herokuapp.com/games/fifa21"
    },
    {
        name: "COD Warzone",
        url: "https://setupme.herokuapp.com/games/cod"
    },
    {
        name: "DOTA 2",
        url: "https://setupme.herokuapp.com/games/dota2"
    }, 
    
];

function goGamePage(gameName) {
    sessionStorage.setItem('campo1', gameName);
    window.location.href = "gamesPage.html";

}

function loadPage() {
    let url;
    const gameName = sessionStorage.getItem('campo1');
    const requirements = document.getElementById("gameName");
    const videoBoardMemory = document.getElementById("vm");

    if (requirements && gameName) {
        requirements.innerHTML = `Requisitos mínimos para jogar ${gameName}:`;

        for(i = 0; i < games.length; i++) {
            if (gameName == games[i].name) {
                url = games[i].url;
        
            }
        }
    
        populateTable(url);
    
    } else if (videoBoardMemory) {
        videoBoardMemory.innerHTML = `Impossível pegar os requisitos desse jogo!`;

    }
}

async function getInfo(url) {
        const response = await fetch(url)
        const itens = await response.json();
        return itens;
}

async function populateTable(url) {
    const JSON = await getInfo(url);
    document.querySelector("#vb").innerHTML = `<div> Placa de vídeo: ${JSON[0].placa_video} </div>`;
    document.querySelector("#vm").innerHTML = `<div> Memória da placa de vídeo: ${JSON[0].video_memory} </div>`;
    document.querySelector("#pr").innerHTML = `<div> Processador: ${JSON[0].processador} </div>`;
    document.querySelector("#ram").innerHTML = `<div> Memória RAM: ${JSON[0].ram} </div>`;
}

loadPage();