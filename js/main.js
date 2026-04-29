// js/main.js
import { loadAllData } from './api.js';
import { displayRandomData } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    loadAllData(displayRandomData);

    const randomBtn = document.getElementById('random-btn');
    if (randomBtn) {
        randomBtn.addEventListener('click', displayRandomData);
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const htmlEl = document.documentElement;

    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        if (icon) {
            icon.className = theme === 'dark' ? 'bi bi-brightness-high-fill' : 'bi bi-moon-stars-fill';
        }
    }

    const saved = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(saved);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }
});

