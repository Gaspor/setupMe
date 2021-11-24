let counter = 1;

setInterval(function () {
    document.getElementById(`radio` + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 3000);


/*
function mbsearch() {
    let search = document.querySelector("#MBsearch");
    
    search = document.body.addEventListener('keydown', function(enter) {
        let key = 'enter';
        key = window.location.href = "lol.html";
    })
}
*/

