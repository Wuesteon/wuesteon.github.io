// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    setLanguage(currentLang);

    // Language toggle buttons
    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'de' ? 'en' : 'de');
        });
    }

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', () => {
            setLanguage(currentLang === 'de' ? 'en' : 'de');
        });
    }

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate stats
                if (entry.target.querySelector('.stat-number')) {
                    const statEl = entry.target.querySelector('.stat-number');
                    const target = parseInt(statEl.dataset.target);
                    animateCounter(statEl, target);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // Footer year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile menu
    initMobileMenu();

    // Smooth scrolling
    initSmoothScrolling();

    // Back to top button
    initBackToTop();
});

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Mobile menu initialization
function initMobileMenu() {
    const menuToggleButton = document.getElementById('menu-toggle-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggleButton || !mobileMenu) return;

    const hamburgerIcon = menuToggleButton.querySelector('.hamburger-icon');

    menuToggleButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        hamburgerIcon.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            hamburgerIcon.classList.remove('open');
        });
    });

    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuToggleButton.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            hamburgerIcon.classList.remove('open');
        }
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
