// Main JavaScript — language toggle wiring + i18n init.
// Blackwall handles nav-solidify, mobile drawer, reveals, back-to-top, and
// smooth-scroll (CSS scroll-behavior) itself, so this file is intentionally thin.

function trackEvent(eventName, eventData) {
    if (typeof umami !== 'undefined' && umami.track) umami.track(eventName, eventData);
}

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
            trackEvent('lang-switch', { lang: target });
        }
    });

    // Footer year (fallback if components.js didn't set it)
    const yearEl = document.getElementById('currentYear');
    if (yearEl && !yearEl.textContent) yearEl.textContent = new Date().getFullYear();

    // Scroll-depth tracking (fire each threshold at most once per page load).
    // Site-wide: on the homepage it's an engagement signal, on articles a read-depth
    // signal — namespaced via `page` so the two don't blend on the Umami dashboard.
    const scrollDoc = document.documentElement;
    const page = document.getElementById('art-more-grid') ? 'article' : 'home';
    let fired75 = false, fired100 = false, ticking = false;
    const check = () => {
        ticking = false;
        // Re-measured every tick (not cached at load) so growth from late images/
        // fonts/injected content — the logo rail, home feed, related posts — is
        // picked up instead of leaving the listener permanently unarmed.
        const maxScrollY = scrollDoc.scrollHeight - window.innerHeight;
        if (maxScrollY <= 0) return;
        const ratio = window.scrollY / maxScrollY; // 1.0 exactly at the true bottom
        if (!fired75 && ratio >= 0.75) {
            fired75 = true;
            trackEvent(`scroll-75-${page}`);
        }
        if (!fired100 && ratio >= 0.98) {
            fired100 = true;
            trackEvent(`scroll-100-${page}`);
        }
    };
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(check);
    }, { passive: true });
});
