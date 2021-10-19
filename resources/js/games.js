let url = "https://setupme.herokuapp.com/games";

async function getMotherboards() {
        const response = await fetch(url)
        const itens = await response.json();
        console.log(itens);
        return itens;
}