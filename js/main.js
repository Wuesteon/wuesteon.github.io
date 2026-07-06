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
        if (target && target !== currentLang) {
            setLanguage(target);
            if (typeof umami !== 'undefined' && umami.track) umami.track('lang-switch', { lang: target });
        }
    });

    // Footer year (fallback if components.js didn't set it)
    const yearEl = document.getElementById('currentYear');
    if (yearEl && !yearEl.textContent) yearEl.textContent = new Date().getFullYear();

    // Scroll-depth tracking (fire each threshold at most once per page load)
    const scrollDoc = document.documentElement;
    if (scrollDoc.scrollHeight > window.innerHeight) {
        let fired75 = false, fired100 = false, ticking = false;
        const check = () => {
            ticking = false;
            const ratio = (window.scrollY + window.innerHeight) / scrollDoc.scrollHeight;
            if (!fired75 && ratio >= 0.75) {
                fired75 = true;
                if (typeof umami !== 'undefined' && umami.track) umami.track('scroll-75');
            }
            if (!fired100 && ratio >= 0.99) {
                fired100 = true;
                if (typeof umami !== 'undefined' && umami.track) umami.track('scroll-100');
            }
        };
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(check);
        }, { passive: true });
    }
});
