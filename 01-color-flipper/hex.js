const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener('click', () => {
    const randomColor = getRandomHex()
    document.body.style.backgroundColor = randomColor

    color.textContent = randomColor
})

function getRandomHex() {
    return "#" + hex.sort(() => 0.5 - Math.random()).slice(0,6).join("")
}