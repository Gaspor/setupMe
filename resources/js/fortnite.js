let url = "https://setupme.herokuapp.com/placas_mae";

async function getMotherboards() {
    const response = await fetch(url)
    const itens = await response.json();
    console.log(itens);
}

getMotherboards();

function createLine(motherboard) {
    line = document.createElement("tr");
    tdMotherboard = document.createElement("td");
    tdMotherboard.innerHTML = motherboard.nome;
    line.appendChild(tdMotherboard);

    return line;
}

function showMotherboards() {
    let loopMB = getMotherboards();
    let tabela = document.getElementById("table");
    loopMB.forEach(element => {
        let line = createLine(element);
        tabela.appendChild(line);
    });
    
}

showMotherboards();