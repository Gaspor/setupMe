let url = "https://setupme.herokuapp.com/placas_mae";

async function getMotherboards() {
    const response = await fetch(url)
    const itens = await response.json();
    console.log(itens);
}