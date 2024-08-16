'use strict';

const themeSwitcher = document.querySelector('.btn-theme');
const body = document.body;

themeSwitcher.addEventListener('click', function() {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        // Mudando para tema escuro
        setDarkTheme();
    } else {
        // Mudando para tema claro
        setLightTheme();
    }
});

function setDarkTheme() {
    body.style.setProperty('--bg', '#121212');
    body.style.setProperty('--fontColor', '#ffffff');
    body.style.setProperty('--headerBg', '#333');
    body.style.setProperty('--headerText', '#ffffff');
    body.style.setProperty('--btnBg', '#ffffff');
    body.style.setProperty('--btnText', '#121212');
    body.style.setProperty('--footerBg', '#333');
}

function setLightTheme() {
    body.style.setProperty('--bg', '#ffffff');
    body.style.setProperty('--fontColor', '#000000');
    body.style.setProperty('--headerBg', '#f0f0f0');
    body.style.setProperty('--headerText', '#121212');
    body.style.setProperty('--btnBg', '#121212');
    body.style.setProperty('--btnText', '#ffffff');
    body.style.setProperty('--footerBg', '#f0f0f0');
}
