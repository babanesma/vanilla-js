const modalBtn = document.querySelector(".modal-btn")
const modalOverlay = document.querySelector(".modal-overlay")
const modalCloseBtn = document.querySelector(".close-btn")

modalBtn.addEventListener("click", () => {
    modalOverlay.classList.add("open-modal")
});

modalCloseBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("open-modal")
});