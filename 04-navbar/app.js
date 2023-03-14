const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');

console.log(navToggle);
navToggle.addEventListener('click', () => {
    links.classList.toggle('show-links')    
});
