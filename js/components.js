// Shared components for header and footer

function getHeader(basePath = '', activePage = '', useAnchorLinks = false) {
    const blogClass = activePage === 'blog' ? 'text-cyan-400' : 'text-gray-300';
    const blogClassMobile = activePage === 'blog' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400';

    // On homepage, use anchor links; on other pages, use full paths
    const homeLink = useAnchorLinks ? '#home' : `${basePath}index.html`;
    const servicesLink = useAnchorLinks ? '#services' : `${basePath}index.html#services`;
    const aboutLink = useAnchorLinks ? '#about' : `${basePath}index.html#about`;
    const contactLink = useAnchorLinks ? '#contact' : `${basePath}index.html#contact`;

    return `
    <header class="fixed w-full z-50 top-0">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="${homeLink}" class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center font-mono font-bold text-gray-900">
                    NW
                </div>
                <span class="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">Nils Weiser</span>
            </a>

            <button id="menu-toggle-button" class="md:hidden z-50 p-2 rounded-md focus:outline-none" aria-label="Menu">
                <div class="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <nav id="main-nav" class="hidden md:flex space-x-8 items-center">
                <a href="${homeLink}" class="text-sm font-medium text-gray-300">Home</a>
                <a href="${servicesLink}" class="text-sm font-medium text-gray-300" data-i18n="nav.services">Services</a>
                <a href="${aboutLink}" class="text-sm font-medium text-gray-300" data-i18n="nav.about">Über mich</a>
                <a href="${contactLink}" class="text-sm font-medium text-gray-300" data-i18n="nav.contact">Kontakt</a>
                <a href="${basePath}blog/" class="text-sm font-medium ${blogClass}" data-i18n="nav.blog">Blog</a>
                <button id="lang-toggle" class="lang-toggle ml-4" aria-label="Toggle language">
                    <span id="lang-de" class="active">DE</span>
                    <span class="text-gray-600">|</span>
                    <span id="lang-en">EN</span>
                </button>
            </nav>
        </div>
        <div id="mobile-menu" class="md:hidden hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
            <a href="${homeLink}" class="block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-6 py-4 text-sm font-medium">Home</a>
            <a href="${servicesLink}" class="block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-6 py-4 text-sm font-medium" data-i18n="nav.services">Services</a>
            <a href="${aboutLink}" class="block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-6 py-4 text-sm font-medium" data-i18n="nav.about">Über mich</a>
            <a href="${contactLink}" class="block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-6 py-4 text-sm font-medium" data-i18n="nav.contact">Kontakt</a>
            <a href="${basePath}blog/" class="block ${blogClassMobile} hover:bg-gray-800/50 px-6 py-4 text-sm font-medium" data-i18n="nav.blog">Blog</a>
            <button id="lang-toggle-mobile" class="lang-toggle mx-6 my-4" aria-label="Toggle language">
                <span class="lang-de-indicator active">DE</span>
                <span class="text-gray-600">|</span>
                <span class="lang-en-indicator">EN</span>
            </button>
        </div>
    </header>`;
}

function getFooter(basePath = '') {
    return `
    <footer class="footer-bg py-12">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center font-mono font-bold text-gray-900 text-sm">
                        NW
                    </div>
                    <span class="text-gray-400 font-mono text-sm">
                        &copy; <span id="currentYear"></span> Nils Weiser
                    </span>
                </div>

                <div class="flex items-center gap-4">
                    <a href="https://github.com/Wuesteon" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/nils-w-42b6a5213/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <button id="black-hole-trigger" class="dont-click-btn" aria-label="Don't click me">
                        <span class="font-mono text-xs">Don't click me</span>
                    </button>
                </div>

                <div class="flex items-center gap-6">
                    <a href="${basePath}impressum.html" class="text-gray-500 text-sm hover:text-gray-300">Impressum</a>
                    <a href="${basePath}datenschutz.html" class="text-gray-500 text-sm hover:text-gray-300">Datenschutz</a>
                    <span class="status-indicator text-xs">
                        <span class="status-dot"></span>
                        <span data-i18n="footer.status">Online</span>
                    </span>
                </div>
            </div>
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
    if (path.includes('/blog/posts/')) return '../../';
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
});
