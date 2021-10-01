let counter = 1;

setInterval(function () {
    document.getElementById(`radio` + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);

async function getContent() {
    try {
        let url = "https://setupme.herokuapp.com/placas_mae";

        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        });
        
        const json1 = await response.text();
        console.log(json1);
        return `<p>${json1} asdsadsa</p>`;
    } catch (error) {
        console.log(error);
    }
}

getContent();