// js/main.js
import { loadAllData } from './api.js';
import { displayRandomData } from './ui.js';



// Add an event listener to trigger the initial data load and display
document.addEventListener('DOMContentLoaded', () => {
    // Pass displayRandomData as a callback to be executed after data is loaded
    loadAllData(displayRandomData);
    const randomBtn = document.getElementById('random-btn');
    if (randomBtn) {
        randomBtn.addEventListener('click', displayRandomData);
    }

    // Dark/Light mode toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const icon = themeToggle?.querySelector('i');

    function setTheme(mode) {
        if (mode === 'dark') {
            htmlEl.classList.add('dark-mode');
            if (icon) icon.className = 'bi bi-brightness-high-fill';
        } else {
            htmlEl.classList.remove('dark-mode');
            if (icon) icon.className = 'bi bi-moon-stars-fill';
        }
    }

    // Load preference
    let theme = localStorage.getItem('theme');
    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    setTheme(theme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = htmlEl.classList.toggle('dark-mode');
            const newTheme = isDark ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});
