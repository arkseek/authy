const responseNav = document.querySelector('.responsiveNav')
const navMenu = document.querySelector('.nav-menu')
const navItem = document.querySelector('.nav-item')

responseNav.addEventListener('click', mobileMenu)
navMenu.forEach(n => n.addEventListener("click", closeMenu))

function mobileMenu() {
    responseNav.classList.toggle('active')
    navMenu.classList.toggle('active')
}

function closeMenu() {
    responseNav.classList.remove('active')
    responseNav.classList.remove('active')
}