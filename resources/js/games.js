const goRight = document.querySelector("#arrow-left");
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

goRight.addEventListener("click", () => {
        goRight.classList.add("active");
});

