// Main JavaScript — language toggle wiring + i18n init.
// Blackwall handles nav-solidify, mobile drawer, reveals, back-to-top, and
// smooth-scroll (CSS scroll-behavior) itself, so this file is intentionally thin.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language (applies data-i18n, sets <html lang>, toggles indicators)
    if (typeof setLanguage === 'function') setLanguage(currentLang);

    // Language toggle buttons. #lang-toggle lives in the nav; #lang-toggle-mobile
    // is built into the mobile drawer by site.js (runs before DOMContentLoaded).
    // Delegate so it works even if a toggle is (re)created after this runs.
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('#lang-toggle, #lang-toggle-mobile');
        if (!toggle) return;
        const span = e.target.closest('[data-lang]');
        if (!span) return; // clicked a separator / chrome
        const target = span.getAttribute('data-lang');
        if (target && target !== currentLang) setLanguage(target);
    });

    // Footer year (fallback if components.js didn't set it)
    const yearEl = document.getElementById('currentYear');
    if (yearEl && !yearEl.textContent) yearEl.textContent = new Date().getFullYear();
});
