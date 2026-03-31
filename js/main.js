// js/main.js
import { loadAllData } from './api.js';
import { displayRandomData } from './ui.js';

// Expose the display function to the global scope so the HTML onclick can find it
window.displayRandomData = displayRandomData;

// Add an event listener to trigger the initial data load and display
document.addEventListener('DOMContentLoaded', () => {
    // Pass displayRandomData as a callback to be executed after data is loaded
    loadAllData(displayRandomData);
});
