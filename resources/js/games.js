let url = "https://setupme.herokuapp.com/games";

async function getMotherboards() {
        const response = await fetch(url)
        const itens = await response.json();
        console.log(itens);
        return itens;
}

const arrows = {
        goRight() {
                document.querySelector("#right-arrow").classList.add("click-right");
        },
        goLeft() {
                document.querySelector("#left-arrow").classList.add("click-left");
        }
}
