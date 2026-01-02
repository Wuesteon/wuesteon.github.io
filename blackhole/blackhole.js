/**
 * BLACK HOLE EFFECT
 * Epic page destruction animation that sucks everything into a singularity
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        particleCount: 3000,
        consumeDelay: 800,
        consumeDuration: 2500,
        particleColors: ['#a855f7', '#8b5cf6', '#6366f1', '#22d3ee', '#fb923c', '#f87171'],
        shakeDuration: 500,
        flashDelay: 2000
    };

    // State
    let isActive = false;
    let particles = [];
    let animationId = null;
    let canvas, ctx;
    let centerX, centerY;

    // Particle class for the swirling effect
    class Particle {
        constructor(x, y, distance) {
            this.angle = Math.random() * 2 * Math.PI;
            this.radius = Math.random() * 2 + 1;
            this.opacity = (Math.random() * 5 + 2) / 10;
            this.distance = (1 / this.opacity) * distance;
            this.speed = this.distance * 0.00008;
            this.x = x;
            this.y = y;
            this.color = CONFIG.particleColors[Math.floor(Math.random() * CONFIG.particleColors.length)];
            this.decay = 0.995 + Math.random() * 0.004;
        }

        update(centerX, centerY) {
            this.angle += this.speed;
            this.distance *= this.decay;
            this.x = centerX + this.distance * Math.cos(this.angle);
            this.y = centerY + this.distance * Math.sin(this.angle);
            return this.distance > 5;
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize the black hole effect
    function init() {
        const trigger = document.getElementById('black-hole-trigger');
        const overlay = document.getElementById('black-hole-overlay');
        canvas = document.getElementById('black-hole-canvas');

        if (!trigger || !overlay || !canvas) return;

        ctx = canvas.getContext('2d');

        // Set canvas size
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Button click handler
        trigger.addEventListener('click', activateBlackHole);
    }

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
    }

    // Track event with Umami
    function trackEvent(eventName, eventData = {}) {
        if (typeof umami !== 'undefined' && umami.track) {
            umami.track(eventName, eventData);
        }
    }

    // Main activation function
    function activateBlackHole() {
        if (isActive) return;
        isActive = true;

        // Track the black hole activation
        trackEvent('black-hole-activated', {
            timestamp: new Date().toISOString(),
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
        });

        const overlay = document.getElementById('black-hole-overlay');
        const trigger = document.getElementById('black-hole-trigger');

        // Hide the trigger button
        trigger.style.opacity = '0';
        trigger.style.transform = 'scale(0)';
        trigger.style.transition = 'all 0.5s ease';

        // Activate overlay
        overlay.classList.add('active');

        // Start particle animation
        initParticles();
        animate();

        // Add screen shake
        document.body.classList.add('screen-shake');
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
        }, CONFIG.shakeDuration);

        // Start consuming page elements
        setTimeout(consumePageElements, CONFIG.consumeDelay);
    }

    function initParticles() {
        particles = [];
        const maxDistance = Math.max(window.innerWidth, window.innerHeight);

        for (let i = 0; i < CONFIG.particleCount; i++) {
            const distance = 50 + Math.random() * maxDistance;
            particles.push(new Particle(centerX, centerY, distance));
        }
    }

    function animate() {
        if (!isActive) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw singularity glow
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.9)');
        gradient.addColorStop(0.6, 'rgba(88, 28, 135, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
        ctx.fill();

        // Update and draw particles
        ctx.globalAlpha = 1;
        particles = particles.filter(particle => {
            const alive = particle.update(centerX, centerY);
            if (alive) {
                particle.draw(ctx);
            }
            return alive;
        });

        // Continuously add new particles
        if (particles.length < CONFIG.particleCount / 2) {
            const maxDistance = Math.max(window.innerWidth, window.innerHeight);
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(centerX, centerY, 100 + Math.random() * maxDistance));
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    function consumePageElements() {
        const overlay = document.getElementById('black-hole-overlay');

        // Get all major page elements to consume
        const elementsToConsume = document.querySelectorAll(
            'section, header, footer, .card, .terminal-window, .btn, h1, h2, h3, p, img, .logo-slide'
        );

        // Calculate center of screen
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        // Consume elements with staggered timing based on distance from center
        const sortedElements = Array.from(elementsToConsume)
            .filter(el => !el.closest('.black-hole-overlay') && !el.closest('#black-hole-trigger'))
            .map(el => {
                const rect = el.getBoundingClientRect();
                const elCenterX = rect.left + rect.width / 2;
                const elCenterY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(elCenterX - screenCenterX, 2) +
                    Math.pow(elCenterY - screenCenterY, 2)
                );
                return { el, distance, rect };
            })
            .sort((a, b) => a.distance - b.distance);

        // Animate each element being sucked in
        sortedElements.forEach(({ el, distance, rect }, index) => {
            const delay = index * 30; // Stagger the consumption

            setTimeout(() => {
                // Create particle trail from element
                createParticleTrail(rect);

                // Calculate direction to center
                const elCenterX = rect.left + rect.width / 2;
                const elCenterY = rect.top + rect.height / 2;
                const dx = screenCenterX - elCenterX;
                const dy = screenCenterY - elCenterY;

                // Apply consumption animation
                el.style.transition = 'all 0.8s cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                el.style.transformOrigin = 'center center';

                requestAnimationFrame(() => {
                    el.style.transform = `translate(${dx}px, ${dy}px) scale(0) rotate(${Math.random() * 720 - 360}deg)`;
                    el.style.opacity = '0';
                    el.style.filter = 'blur(10px)';
                });
            }, delay);
        });

        // Trigger the final consumption after elements are gone
        const totalConsumeTime = sortedElements.length * 30 + 800;
        setTimeout(() => {
            overlay.classList.add('consuming');

            // Add more intense shake
            document.body.classList.add('screen-shake');

            // Final flash
            setTimeout(triggerFinalFlash, 1500);
        }, totalConsumeTime);
    }

    function createParticleTrail(rect) {
        const numParticles = 15;
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'spiral-particle';

            // Random position within element
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * rect.height;

            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            particle.style.backgroundColor = CONFIG.particleColors[Math.floor(Math.random() * CONFIG.particleColors.length)];
            particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;

            document.body.appendChild(particle);

            // Animate to center
            const dx = screenCenterX - startX;
            const dy = screenCenterY - startY;
            const duration = 500 + Math.random() * 500;

            particle.style.transition = `all ${duration}ms cubic-bezier(0.55, 0.055, 0.675, 0.19)`;

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
                particle.style.opacity = '0';
            });

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, duration);
        }
    }

    function triggerFinalFlash() {
        // Create flash element
        const flash = document.createElement('div');
        flash.className = 'black-hole-flash';
        document.body.appendChild(flash);

        // Trigger flash animation
        requestAnimationFrame(() => {
            flash.classList.add('active');
        });

        // Stop particle animation
        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        // Track completion and redirect to easter egg page
        setTimeout(() => {
            trackEvent('black-hole-completed', {
                timestamp: new Date().toISOString()
            });
            window.location.href = 'easter-egg/index.html';
        }, 1500);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
