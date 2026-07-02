// Shared components for header and footer

function getHeader(basePath = '', activePage = '', useAnchorLinks = false) {
    // On homepage, use anchor links; on other pages, use full paths
    const homeLink = useAnchorLinks ? '#home' : `${basePath}index.html`;
    const servicesLink = useAnchorLinks ? '#services' : `${basePath}index.html#services`;
    const contactLink = useAnchorLinks ? '#contact' : `${basePath}index.html#contact`;
    const isEnglishBlog = window.location.pathname.includes('/blog/en/') || window.location.pathname.includes('/posts/en/');
    const blogLink = isEnglishBlog ? `${basePath}blog/en/` : `${basePath}blog/`;

    const scanLink = useAnchorLinks ? '#scan' : `${basePath}index.html#scan`;
    const securityLink = useAnchorLinks ? '#security' : `${basePath}index.html#security`;
    const blogOn = activePage === 'blog' ? ' on' : '';

    // Blackwall nav. IDs #lang-toggle / #lang-de / #lang-en preserved so the
    // existing toggle wiring (main.js) binds unchanged. site.js builds the
    // mobile drawer by cloning .links anchors + the toggle.
    return `
    <nav class="nav">
        <a class="brand" href="${homeLink}"><span class="m"></span><span class="wm">w<span class="ai">AI</span>ser<span class="tld">.dev</span></span></a>
        <div class="links">
            <a href="${scanLink}" data-i18n="nav.freeScan">Free scan</a>
            <a href="${servicesLink}" data-i18n="nav.services">Services</a>
            <a href="${securityLink}" data-i18n="nav.security">Security</a>
            <a href="${blogLink}" class="${blogOn}" data-i18n="nav.blog">Blog</a>
            <a href="${contactLink}" data-i18n="nav.contact">Contact</a>
            <a href="${scanLink}" class="btn btn--pri nav-cta" style="padding:10px 18px" data-i18n="nav.cta">Scan my site</a>
            <button id="lang-toggle" class="lang-toggle" aria-label="Toggle language" style="margin-left:6px">
                <span id="lang-de" class="active">DE</span>
                <span style="color:var(--mut)">|</span>
                <span id="lang-en">EN</span>
            </button>
        </div>
    </nav>`;
}

function getFooter(basePath = '') {
    const blogLink = (window.location.pathname.includes('/blog/en/') || window.location.pathname.includes('/posts/en/'))
        ? `${basePath}blog/en/` : `${basePath}blog/`;
    // Blackwall footer. Preserves #currentYear, socials, the #black-hole-trigger
    // easter-egg, and the legal links.
    return `
    <footer class="foot">
        <div class="wrap">
            <span class="wm">w<span class="ai">AI</span>ser<span class="tld">.dev</span> · Nils Weiser</span>
            <div class="foot__links">
                <a href="${blogLink}" data-i18n="nav.blog">Blog</a>
                <a href="${basePath}index.html#services" data-i18n="nav.services">Services</a>
                <a href="${basePath}impressum.html">Impressum</a>
                <a href="${basePath}datenschutz.html">Datenschutz</a>
                <a href="https://github.com/Wuesteon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
                <a href="https://www.linkedin.com/in/nils-w-42b6a5213/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
                <a href="mailto:nils.weiser.kn@gmail.com">Email</a>
                <button id="black-hole-trigger" class="dont-click-btn" aria-label="Don't click me" style="background:none;border:0;color:inherit;font:inherit;letter-spacing:inherit;cursor:pointer;padding:0">Don't click me</button>
            </div>
            <span>© <span id="currentYear"></span> · Bodenseeraum · Schweiz</span>
        </div>
    </footer>`;
}

function getBackToTopButton() {
    return `
    <button class="back-to-top" aria-label="Back to top">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
    </button>`;
}

// Auto-detect basePath from current URL
function detectBasePath() {
    const path = window.location.pathname;
    if (path.includes('/blog/posts/de/') || path.includes('/blog/posts/en/')) return '../../../';
    if (path.includes('/blog/en/')) return '../../';
    if (path.includes('/blog/')) return '../';
    return '';
}

// Auto-detect active page
function detectActivePage() {
    const path = window.location.pathname;
    if (path.includes('/blog')) return 'blog';
    return '';
}

// Check if we're on the homepage (index.html or /)
function isHomePage() {
    const path = window.location.pathname;
    // Exclude any page in a subdirectory or legal pages
    if (path.includes('/blog') || path.includes('/impressum') || path.includes('/datenschutz')) {
        return false;
    }
    // True for root paths: /, /index.html, or empty string
    return path === '/' || path === '' || path === '/index.html';
}

// Get black hole overlay HTML
function getBlackHoleOverlay() {
    return `
    <div id="black-hole-overlay" class="black-hole-overlay">
        <canvas id="black-hole-canvas"></canvas>
        <div class="singularity"></div>
        <div class="accretion-disk"></div>
        <div class="event-horizon"></div>
    </div>`;
}

// Load black hole effect (CSS and JS)
function loadBlackHoleEffect(basePath) {
    // Check if already loaded
    if (document.getElementById('black-hole-css')) return;

    // Load CSS
    const css = document.createElement('link');
    css.id = 'black-hole-css';
    css.rel = 'stylesheet';
    css.href = basePath + 'blackhole/blackhole.css';
    document.head.appendChild(css);

    // Inject overlay HTML
    const overlayDiv = document.createElement('div');
    overlayDiv.innerHTML = getBlackHoleOverlay();
    document.body.appendChild(overlayDiv.firstElementChild);

    // Load JS
    const script = document.createElement('script');
    script.src = basePath + 'blackhole/blackhole.js';
    document.body.appendChild(script);
}

// Initialize components on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    const basePath = detectBasePath();
    const activePage = detectActivePage();
    const useAnchorLinks = isHomePage();

    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const backToTopPlaceholder = document.getElementById('back-to-top-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.outerHTML = getHeader(basePath, activePage, useAnchorLinks);
    }

    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = getFooter(basePath);
    }

    if (backToTopPlaceholder) {
        backToTopPlaceholder.outerHTML = getBackToTopButton();
    }

    // Set current year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Load black hole effect on all pages (except easter-egg)
    if (!window.location.pathname.includes('/easter-egg')) {
        loadBlackHoleEffect(basePath);
    }
});
