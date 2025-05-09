/**
 * Main JavaScript file that initializes the application
 */

import { initNavigation, navigateToPage } from './components/navigation.js';
import { initVanishingInput } from './components/vanishing-input.js';
import { initAboutPage } from './pages/about.js';
import { initSuccessPage } from './pages/form-success.js';

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();

    // Set current date for NDA form
    setCurrentDate();

    // Initialize the currently active page
    initActivePage();

    // Initialize the vanishing input if present on the page
    initVanishingInput();
});

/**
 * Initialize the currently active page
 */
function initActivePage() {
    // Check if URL has a fragment identifier for direct page access
    const hash = window.location.hash.substring(1);
    console.log("Initial hash:", hash);

    // Check if this is a success page with parameters
    const successPageRegex = /^success(\?.*)?$/;
    if (hash.match(successPageRegex)) {
        navigateToPage('success');
        initSuccessPage();
        return;
    }

    if (hash) {
        navigateToPage(hash);
    } else {
        // Set initial active state for the currently visible page
        const visiblePageId = document.querySelector('.active-page')?.id;
        if (visiblePageId) {
            // Find the nav item that corresponds to this page and add active class
            document.querySelectorAll('.nav-item').forEach(navItem => {
                if (navItem.dataset.navigate === visiblePageId) {
                    navItem.classList.add('active');
                    if (typeof activateNavItemGradient === 'function') {
                        activateNavItemGradient(navItem);
                    }
                }
            });

            // Initialize page-specific functionality
            if (visiblePageId === 'about') {
                initAboutPage();
            } else if (visiblePageId === 'success') {
                initSuccessPage();
            }
        }
    }
}

/**
 * Set the current date for the NDA form
 */
function setCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const today = new Date();
        currentDateElement.textContent = today.toLocaleDateString('en-GB');
    }
}