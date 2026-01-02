/**
 * Die Befreiung - Chains Liberation Experience
 * "Sprengst du die Ketten, deinerselbst?"
 *
 * A philosophical journey from self-imposed chains to authentic freedom
 */

(function() {
    'use strict';

    // ========================================
    // Translation Helper
    // ========================================

    function t(key) {
        if (window.PantherI18n && window.PantherI18n.t) {
            return window.PantherI18n.t(key);
        }
        return key;
    }

    // ========================================
    // Configuration
    // ========================================

    const CONFIG = {
        colors: {
            voidBlack: '#050508',
            etherealCyan: '#7FDBFF',
            cyanGlow: 'rgba(0, 255, 255, 0.25)',
            solarGold: '#FFD700',
            emberOrange: '#FF6B35',
            cosmicPurple: '#8B00FF',
            auroraGreen: '#39FF14',
            warmAmber: '#FBBF24',
            rustOrange: '#CC4400'
        },
        timing: {
            typewriterSpeed: 80,
            questionPause: 3000,
            transitionDuration: 800,
            breathHoldDuration: 3000
        }
    };

    // ========================================
    // State
    // ========================================

    let state = {
        isActive: false,
        phase: 'dormant', // dormant, question, sound-ritual, threshold, cinematic, aftermath
        audioEnabled: false,
        audioContext: null,
        audioElement: null,
        cinematicCanvas: null,
        cinematicCtx: null,
        animationFrame: null,
        breathHoldStart: null,
        particleSystems: []
    };

    // ========================================
    // Word Chains Data (societal expectations - from translations)
    // ========================================

    function getChainWords() {
        const words = t('chains.chainWords');
        // Fallback if translation not loaded
        if (!Array.isArray(words)) {
            return [
                "Die Stäbe", "Tausend Stäbe", "Keine Welt", "Du sollst...",
                "Man macht das nicht", "Was denken die Leute?", "Sei vernünftig",
                "Unrealistisch", "Füg dich ein", "Der enge Kreis", "Betäubt",
                "Müder Blick", "Erwartungen", "Pflicht", "Immer", "Niemals",
                "Angst", "Zweifel", "Nicht gut genug", "Zu spät", "Zu alt",
                "Zu jung", "Sicherheit", "Komfortzone", "Normal sein",
                "Funktionieren", "Anpassen", "Schweigen"
            ];
        }
        return words;
    }

    // ========================================
    // Main Entry Point
    // ========================================

    function showChainsQuestion() {
        if (state.isActive) return;
        state.isActive = true;
        state.phase = 'question';

        // Track event
        trackEvent('chains-liberation-started');

        // Create overlay
        createOverlay();

        // Start the awakening sequence
        awakenSequence();
    }

    // ========================================
    // Overlay Creation
    // ========================================

    function createOverlay() {
        // Remove any existing overlay
        const existing = document.getElementById('chains-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'chains-overlay';
        overlay.className = 'chains-overlay';
        overlay.innerHTML = `
            <div class="chains-void"></div>
            <div class="chains-particles" id="chains-particles"></div>
            <div class="chains-content" id="chains-content"></div>
            <canvas id="chains-canvas"></canvas>
            <div class="chains-credit">designed by Nils Weiser</div>
        `;

        document.body.appendChild(overlay);

        // Initialize canvas
        initCinematicCanvas();

        // Fade in
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
    }

    function initCinematicCanvas() {
        state.cinematicCanvas = document.getElementById('chains-canvas');
        state.cinematicCtx = state.cinematicCanvas.getContext('2d');

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            state.cinematicCanvas.width = window.innerWidth * dpr;
            state.cinematicCanvas.height = window.innerHeight * dpr;
            state.cinematicCanvas.style.width = window.innerWidth + 'px';
            state.cinematicCanvas.style.height = window.innerHeight + 'px';
            state.cinematicCtx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener('resize', resize);
    }

    // ========================================
    // Awakening Sequence
    // ========================================

    function awakenSequence() {
        const content = document.getElementById('chains-content');

        // Phase 1: Darkness holds (1.5s)
        setTimeout(() => {
            // Phase 2: The question emerges
            showQuestion(content);
        }, 1500);
    }

    function showQuestion(container) {
        const questionText = t('chains.question');

        container.innerHTML = `
            <div class="chains-question-container">
                <p class="chains-question" id="chains-question-text"></p>
                <div class="chains-choices" id="chains-choices" style="opacity: 0;">
                    <button class="chains-btn chains-btn-ja" id="btn-ja">
                        <span class="btn-pulse"></span>
                        ${t('chains.buttons.ja')}
                    </button>
                    <button class="chains-btn chains-btn-nein" id="btn-nein">${t('chains.buttons.nein')}</button>
                </div>
                <div class="chains-sound-hint" id="sound-hint" style="opacity: 0;">
                    <div class="sound-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                    </div>
                    <span class="sound-text">${t('chains.soundHint')}</span>
                </div>
            </div>
        `;

        // Typewriter effect for question
        typewriterEffect('chains-question-text', questionText, CONFIG.timing.typewriterSpeed, () => {
            // After question is typed, show buttons after pause
            setTimeout(() => {
                const choices = document.getElementById('chains-choices');
                const soundHint = document.getElementById('sound-hint');
                choices.style.opacity = '1';
                choices.classList.add('visible');

                setTimeout(() => {
                    soundHint.style.opacity = '1';
                }, 800);

                // Attach event listeners
                attachChoiceListeners();
            }, CONFIG.timing.questionPause);
        });
    }

    function typewriterEffect(elementId, text, speed, callback) {
        const element = document.getElementById(elementId);
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }

        type();
    }

    // ========================================
    // Choice Handlers
    // ========================================

    function attachChoiceListeners() {
        const btnJa = document.getElementById('btn-ja');
        const btnNein = document.getElementById('btn-nein');

        btnJa.addEventListener('click', handleJaClick);
        btnNein.addEventListener('click', handleNeinClick);

        // Hover effects
        btnJa.addEventListener('mouseenter', () => {
            document.querySelector('.chains-void').classList.add('warming');
        });
        btnJa.addEventListener('mouseleave', () => {
            document.querySelector('.chains-void').classList.remove('warming');
        });
    }

    function handleNeinClick() {
        trackEvent('chains-liberation-declined');

        const content = document.getElementById('chains-content');
        content.innerHTML = `
            <div class="chains-weakness">
                <img src="gifs/weekness.gif" alt="Weakness disgusts me" class="weakness-gif">
                <button class="chains-btn-leave weakness-leave" id="btn-weakness-leave">
                    <span>${t('chains.buttons.zurueck')}</span>
                </button>
            </div>
        `;

        setTimeout(() => {
            document.querySelector('.chains-weakness').classList.add('visible');
        }, 100);

        document.getElementById('btn-weakness-leave').addEventListener('click', () => {
            closeOverlay();
            // Show dead panther after closing
            setTimeout(() => {
                showDeadPanther();
            }, 500);
        });
    }

    function showDeadPanther() {
        // Tell the panther game to show dead state
        if (window.PantherGame && window.PantherGame.showDead) {
            window.PantherGame.showDead();
        }
        // Add a visual indicator in the terminal
        const terminalOutput = document.getElementById('terminal-output');
        if (terminalOutput) {
            const line = document.createElement('p');
            line.className = 'terminal-line poem-text';
            line.textContent = t('terminal.hidden.deadPanther');
            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }

    function handleJaClick() {
        trackEvent('chains-liberation-accepted');
        state.phase = 'sound-ritual';

        // Show sound ritual
        showSoundRitual();
    }

    // ========================================
    // Sound Ritual Phase
    // ========================================

    function showSoundRitual() {
        const content = document.getElementById('chains-content');

        content.innerHTML = `
            <div class="chains-ritual-container">
                <p class="chains-ritual-text">
                    ${t('chains.ritual.line1')}<br>
                    ${t('chains.ritual.line2')}
                </p>
                <div class="chains-ritual-choices">
                    <button class="chains-btn chains-btn-ja" id="btn-listen">
                        <span class="btn-pulse"></span>
                        ${t('chains.buttons.ichLausche')}
                    </button>
                </div>
            </div>
        `;

        // Fade in
        setTimeout(() => {
            document.querySelector('.chains-ritual-container').classList.add('visible');
        }, 100);

        // Attach listener - only one option now
        document.getElementById('btn-listen').addEventListener('click', () => {
            state.audioEnabled = true;
            initAudio();
            showThreshold();
        });
    }

    // ========================================
    // Final Threshold Phase
    // ========================================

    function showThreshold() {
        state.phase = 'threshold';
        const content = document.getElementById('chains-content');

        content.innerHTML = `
            <div class="chains-threshold-container">
                <p class="chains-threshold-text" id="threshold-line1"></p>
                <p class="chains-threshold-text threshold-emphasis" id="threshold-line2"></p>
                <div class="chains-threshold-action" id="threshold-action" style="opacity: 0;">
                    <button class="chains-btn-hold" id="btn-hold">
                        <div class="hold-progress" id="hold-progress"></div>
                        <span class="hold-text">⛓️‍💥</span>
                    </button>
                    <p class="hold-instruction">${t('chains.threshold.holdInstruction')}</p>
                </div>
            </div>
        `;

        // Typewriter for threshold text
        setTimeout(() => {
            typewriterEffect('threshold-line1', t('chains.threshold.line1'), 100, () => {
                setTimeout(() => {
                    typewriterEffect('threshold-line2', t('chains.threshold.line2'), 100, () => {
                        setTimeout(() => {
                            const action = document.getElementById('threshold-action');
                            action.style.opacity = '1';
                            attachHoldListener();
                        }, 1500);
                    });
                }, 1500);
            });
        }, 500);
    }

    function attachHoldListener() {
        const btn = document.getElementById('btn-hold');
        const progress = document.getElementById('hold-progress');
        let holdInterval = null;
        let autoInterval = null;
        let holdProgress = 0;
        let isHolding = false;
        let hasTriggered = false;

        // Start music immediately when user interacts
        const startInteraction = (e) => {
            e.preventDefault();
            if (hasTriggered) return;

            // Start music immediately on first interaction
            if (state.audioEnabled && state.audioElement) {
                state.audioElement.play().catch(err => console.log('Audio play failed:', err));
            }

            isHolding = true;
            state.breathHoldStart = Date.now();
            btn.classList.add('holding');

            // Clear any existing auto-progress
            if (autoInterval) clearInterval(autoInterval);

            // Manual hold progress (faster when holding)
            holdInterval = setInterval(() => {
                if (!isHolding) return;
                const elapsed = Date.now() - state.breathHoldStart;
                holdProgress = Math.min(elapsed / CONFIG.timing.breathHoldDuration, 1);
                progress.style.width = (holdProgress * 100) + '%';

                if (holdProgress >= 1 && !hasTriggered) {
                    hasTriggered = true;
                    clearInterval(holdInterval);
                    clearInterval(autoInterval);
                    triggerLiberation();
                }
            }, 16);
        };

        const endHold = () => {
            if (hasTriggered) return;
            isHolding = false;
            btn.classList.remove('holding');

            if (holdInterval) {
                clearInterval(holdInterval);
            }

            // Auto-progress continues even after releasing (slower)
            // This is the "fake hold" - it will complete automatically
            if (holdProgress > 0 && holdProgress < 1) {
                autoInterval = setInterval(() => {
                    holdProgress = Math.min(holdProgress + 0.008, 1); // Slower auto-progress
                    progress.style.width = (holdProgress * 100) + '%';

                    if (holdProgress >= 1 && !hasTriggered) {
                        hasTriggered = true;
                        clearInterval(autoInterval);
                        triggerLiberation();
                    }
                }, 16);
            }
        };

        btn.addEventListener('mousedown', startInteraction);
        btn.addEventListener('touchstart', startInteraction);
        btn.addEventListener('mouseup', endHold);
        btn.addEventListener('mouseleave', endHold);
        btn.addEventListener('touchend', endHold);

        // Also allow single click to start the auto-progress
        btn.addEventListener('click', (e) => {
            if (hasTriggered) return;
            if (holdProgress === 0) {
                // If they just clicked without holding, start auto-progress
                if (state.audioEnabled && state.audioElement) {
                    state.audioElement.play().catch(err => console.log('Audio play failed:', err));
                }
                btn.classList.add('holding');
                autoInterval = setInterval(() => {
                    holdProgress = Math.min(holdProgress + 0.008, 1);
                    progress.style.width = (holdProgress * 100) + '%';

                    if (holdProgress >= 1 && !hasTriggered) {
                        hasTriggered = true;
                        clearInterval(autoInterval);
                        triggerLiberation();
                    }
                }, 16);
            }
        });
    }

    // ========================================
    // Liberation Cinematic
    // ========================================

    function triggerLiberation() {
        state.phase = 'cinematic';
        trackEvent('chains-liberation-triggered');

        // Start audio if enabled
        if (state.audioEnabled && state.audioElement) {
            state.audioElement.play().catch(e => console.log('Audio play failed:', e));
        }

        // Hide UI elements
        const content = document.getElementById('chains-content');
        content.innerHTML = '';

        // Start the cinematic
        startCinematic();
    }

    function startCinematic() {
        const canvas = state.cinematicCanvas;
        const ctx = state.cinematicCtx;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Cinematic state - Neural Network Theme
        let cinematicState = {
            phase: 0,
            startTime: Date.now(),
            neurons: [],
            synapses: [],
            electricPulses: [],
            particles: [],
            wordChains: [],
            centerGlow: { radius: 0, alpha: 0 },
            freedNeurons: [],
            cosmicStars: []
        };

        // Initialize neurons in a brain-like network
        const neuronCount = 80;
        for (let i = 0; i < neuronCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 250;
            cinematicState.neurons.push({
                x: width/2 + Math.cos(angle) * distance,
                y: height/2 + Math.sin(angle) * distance,
                baseX: width/2 + Math.cos(angle) * distance,
                baseY: height/2 + Math.sin(angle) * distance,
                radius: 3 + Math.random() * 4,
                connections: [],
                firing: false,
                fireTime: 0,
                freed: false,
                freedTime: 0,
                alpha: 0.6,
                pulse: Math.random() * Math.PI * 2
            });
        }

        // Create synaptic connections between nearby neurons
        cinematicState.neurons.forEach((neuron, i) => {
            cinematicState.neurons.forEach((other, j) => {
                if (i !== j) {
                    const dist = Math.hypot(neuron.x - other.x, neuron.y - other.y);
                    if (dist < 120 && Math.random() > 0.5) {
                        neuron.connections.push(j);
                        cinematicState.synapses.push({
                            from: i,
                            to: j,
                            active: false,
                            broken: false,
                            breakProgress: 0
                        });
                    }
                }
            });
        });

        // Attach word chains to neurons - spread them out evenly
        // Only use every Nth neuron to avoid overlap
        const chainWords = getChainWords();
        const usedNeurons = new Set();
        const neuronStep = Math.max(2, Math.floor(cinematicState.neurons.length / chainWords.length));

        chainWords.forEach((word, i) => {
            // Find a neuron that hasn't been used and is far enough from others
            let neuronIndex = (i * neuronStep) % cinematicState.neurons.length;
            let attempts = 0;
            while (usedNeurons.has(neuronIndex) && attempts < cinematicState.neurons.length) {
                neuronIndex = (neuronIndex + 1) % cinematicState.neurons.length;
                attempts++;
            }
            usedNeurons.add(neuronIndex);

            // Vary the offset direction based on position to spread words out
            const angleOffset = (i / chainWords.length) * Math.PI * 2;
            const offsetDistance = 40 + Math.random() * 20;

            cinematicState.wordChains.push({
                word: word,
                neuronIndex: neuronIndex,
                alpha: 0.7,
                freed: false,
                freedTime: 0,
                offsetX: Math.cos(angleOffset) * offsetDistance,
                offsetY: Math.sin(angleOffset) * offsetDistance - 20
            });
        });

        // Initialize cosmic stars for final phase
        for (let i = 0; i < 150; i++) {
            cinematicState.cosmicStars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                alpha: 0,
                twinkle: Math.random() * Math.PI * 2
            });
        }

        function animate() {
            const elapsed = Date.now() - cinematicState.startTime;
            ctx.clearRect(0, 0, width, height);

            // Phase timing
            if (elapsed < 5000) cinematicState.phase = 0;      // Trapped network
            else if (elapsed < 12000) cinematicState.phase = 1; // First awakening
            else if (elapsed < 25000) cinematicState.phase = 2; // Breaking free
            else if (elapsed < 40000) cinematicState.phase = 3; // Liberation
            else if (elapsed < 50000) cinematicState.phase = 4; // Cosmic expansion
            else cinematicState.phase = 5;

            // Draw layers
            drawNeuralBackground(ctx, width, height, cinematicState, elapsed);
            drawCosmicStars(ctx, cinematicState, elapsed);
            drawSynapses(ctx, cinematicState, elapsed, width, height);
            drawNeurons(ctx, cinematicState, elapsed, width, height);
            drawElectricPulses(ctx, cinematicState, elapsed);
            drawWordChains(ctx, cinematicState, elapsed, width, height);
            drawCenterGlow(ctx, cinematicState, elapsed, width, height);
            drawNeuralParticles(ctx, cinematicState);
            drawPhaseText(ctx, cinematicState, elapsed, width, height);

            if (elapsed < 55000) {
                state.animationFrame = requestAnimationFrame(animate);
            } else {
                endCinematic();
            }
        }

        animate();
    }

    function drawNeuralBackground(ctx, width, height, state, elapsed) {
        // Dark brain-like environment
        const gradient = ctx.createRadialGradient(
            width/2, height/2, 0,
            width/2, height/2, Math.max(width, height) * 0.7
        );

        if (state.phase < 2) {
            // Trapped: cold, constrained
            gradient.addColorStop(0, 'rgba(15, 15, 25, 1)');
            gradient.addColorStop(0.5, 'rgba(8, 8, 15, 1)');
            gradient.addColorStop(1, '#050508');
        } else if (state.phase < 4) {
            // Breaking: warming up
            const warmth = (elapsed - 12000) / 28000;
            gradient.addColorStop(0, `rgba(${20 + warmth * 20}, ${15 + warmth * 10}, ${25 + warmth * 15}, 1)`);
            gradient.addColorStop(0.5, `rgba(${10 + warmth * 10}, ${8 + warmth * 5}, ${20 + warmth * 10}, 1)`);
            gradient.addColorStop(1, '#050508');
        } else {
            // Cosmic expansion
            gradient.addColorStop(0, 'rgba(30, 20, 50, 1)');
            gradient.addColorStop(0.3, 'rgba(15, 10, 35, 1)');
            gradient.addColorStop(1, '#050508');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }

    function drawCosmicStars(ctx, state, elapsed) {
        if (state.phase < 3) return;

        const fadeIn = Math.min((elapsed - 25000) / 8000, 1);

        state.cosmicStars.forEach(star => {
            star.twinkle += 0.015;
            star.alpha = fadeIn * (0.2 + Math.sin(star.twinkle) * 0.4);

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 220, 255, ${star.alpha})`;
            ctx.fill();
        });
    }

    function drawSynapses(ctx, state, elapsed, width, height) {
        state.synapses.forEach((synapse, index) => {
            const fromNeuron = state.neurons[synapse.from];
            const toNeuron = state.neurons[synapse.to];

            if (!fromNeuron || !toNeuron) return;

            // Break synapses during liberation phase
            if (state.phase >= 2 && !synapse.broken) {
                const breakOrder = (elapsed - 12000) / 200;
                if (index < breakOrder) {
                    synapse.broken = true;
                    synapse.breakProgress = 0;

                    // Spark particles
                    for (let i = 0; i < 5; i++) {
                        const midX = (fromNeuron.x + toNeuron.x) / 2;
                        const midY = (fromNeuron.y + toNeuron.y) / 2;
                        state.particles.push({
                            x: midX,
                            y: midY,
                            vx: (Math.random() - 0.5) * 4,
                            vy: (Math.random() - 0.5) * 4,
                            life: 1,
                            color: 'electric',
                            size: 2
                        });
                    }
                }
            }

            if (synapse.broken) {
                synapse.breakProgress = Math.min(synapse.breakProgress + 0.02, 1);
                if (synapse.breakProgress >= 1) return;
            }

            // Draw synapse line
            const alpha = synapse.broken ? 0.3 * (1 - synapse.breakProgress) : 0.15;
            ctx.strokeStyle = synapse.broken
                ? `rgba(255, 150, 50, ${alpha})`
                : `rgba(100, 120, 180, ${alpha})`;
            ctx.lineWidth = synapse.broken ? 1 : 0.5;

            ctx.beginPath();
            ctx.moveTo(fromNeuron.x, fromNeuron.y);
            ctx.lineTo(toNeuron.x, toNeuron.y);
            ctx.stroke();
        });
    }

    function drawNeurons(ctx, state, elapsed, width, height) {
        state.neurons.forEach((neuron, index) => {
            neuron.pulse += 0.03;

            // Free neurons during liberation
            if (state.phase >= 2 && !neuron.freed) {
                const freeOrder = (elapsed - 12000) / 150;
                if (index < freeOrder) {
                    neuron.freed = true;
                    neuron.freedTime = Date.now();

                    // Burst of particles
                    for (let i = 0; i < 8; i++) {
                        state.particles.push({
                            x: neuron.x,
                            y: neuron.y,
                            vx: (Math.random() - 0.5) * 6,
                            vy: (Math.random() - 0.5) * 6,
                            life: 1,
                            color: 'gold',
                            size: 3
                        });
                    }
                }
            }

            // Animate freed neurons - they expand outward
            if (neuron.freed) {
                const timeSinceFree = (Date.now() - neuron.freedTime) / 1000;
                const expansion = Math.min(timeSinceFree * 0.3, 1);
                const angle = Math.atan2(neuron.baseY - height/2, neuron.baseX - width/2);
                const expandDist = expansion * 150;

                neuron.x = neuron.baseX + Math.cos(angle) * expandDist;
                neuron.y = neuron.baseY + Math.sin(angle) * expandDist;
            }

            // Pulse effect
            const pulseSize = neuron.radius + Math.sin(neuron.pulse) * 1.5;

            // Draw neuron glow
            if (neuron.freed) {
                const gradient = ctx.createRadialGradient(
                    neuron.x, neuron.y, 0,
                    neuron.x, neuron.y, pulseSize * 3
                );
                gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
                gradient.addColorStop(0.5, 'rgba(0, 255, 200, 0.3)');
                gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, pulseSize * 3, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw neuron body
            ctx.beginPath();
            ctx.arc(neuron.x, neuron.y, pulseSize, 0, Math.PI * 2);

            if (neuron.freed) {
                ctx.fillStyle = `rgba(255, 230, 150, ${neuron.alpha})`;
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = 15;
            } else {
                ctx.fillStyle = `rgba(80, 100, 150, ${neuron.alpha})`;
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    function drawElectricPulses(ctx, state, elapsed) {
        // Create new pulses during awakening
        if (state.phase >= 1 && state.phase < 3 && Math.random() > 0.95) {
            const randomNeuron = state.neurons[Math.floor(Math.random() * state.neurons.length)];
            if (randomNeuron && randomNeuron.connections.length > 0) {
                const targetIndex = randomNeuron.connections[Math.floor(Math.random() * randomNeuron.connections.length)];
                state.electricPulses.push({
                    fromX: randomNeuron.x,
                    fromY: randomNeuron.y,
                    toX: state.neurons[targetIndex].x,
                    toY: state.neurons[targetIndex].y,
                    progress: 0,
                    life: 1
                });
            }
        }

        // Draw and update pulses
        state.electricPulses = state.electricPulses.filter(pulse => {
            pulse.progress += 0.05;
            pulse.life -= 0.03;

            if (pulse.life > 0) {
                const x = pulse.fromX + (pulse.toX - pulse.fromX) * pulse.progress;
                const y = pulse.fromY + (pulse.toY - pulse.fromY) * pulse.progress;

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 255, ${pulse.life})`;
                ctx.shadowColor = '#00FFFF';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;

                return pulse.progress < 1;
            }
            return false;
        });
    }

    function drawWordChains(ctx, state, elapsed, width, height) {
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.textAlign = 'center';

        state.wordChains.forEach((chain, index) => {
            const neuron = state.neurons[chain.neuronIndex];
            if (!neuron) return;

            // Free word chains when their neuron is freed
            if (neuron.freed && !chain.freed) {
                chain.freed = true;
                chain.freedTime = Date.now();
            }

            if (chain.freed) {
                // Slower dissolve animation - 6 seconds instead of 2
                const timeSinceFree = (Date.now() - chain.freedTime) / 1000;
                const fadeOut = Math.max(0, 1 - timeSinceFree / 6);

                if (fadeOut <= 0) return;

                // Words dissolve slowly upward and outward
                const angle = Math.atan2(neuron.y - height/2, neuron.x - width/2);
                const dissolveX = neuron.x + chain.offsetX + Math.cos(angle) * timeSinceFree * 15;
                const dissolveY = neuron.y + chain.offsetY - timeSinceFree * 20;

                ctx.save();
                ctx.globalAlpha = fadeOut * 0.9;
                ctx.fillStyle = '#FFD700';
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = 8;
                ctx.fillText(chain.word, dissolveX, dissolveY);
                ctx.restore();
            } else {
                // Trapped words - heavy, constraining
                ctx.fillStyle = `rgba(150, 100, 100, ${chain.alpha * 0.7})`;
                ctx.fillText(chain.word, neuron.x + chain.offsetX, neuron.y + chain.offsetY);

                // Chain link to neuron (subtle)
                ctx.strokeStyle = 'rgba(100, 80, 80, 0.15)';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(neuron.x + chain.offsetX, neuron.y + chain.offsetY + 5);
                ctx.lineTo(neuron.x, neuron.y);
                ctx.stroke();
            }
        });
    }

    function drawCenterGlow(ctx, state, elapsed, width, height) {
        const glow = state.centerGlow;

        if (state.phase < 1) {
            glow.radius = 20;
            glow.alpha = 0.1 + Math.sin(elapsed * 0.003) * 0.05;
        } else if (state.phase < 2) {
            const progress = (elapsed - 5000) / 7000;
            glow.radius = 20 + progress * 80;
            glow.alpha = 0.1 + progress * 0.4;
        } else if (state.phase < 4) {
            const progress = (elapsed - 12000) / 28000;
            glow.radius = 100 + progress * 300;
            glow.alpha = 0.5 + progress * 0.5;
        } else {
            glow.radius = 400 + Math.sin(elapsed * 0.002) * 30;
            glow.alpha = 1;
        }

        // Draw expanding consciousness
        const gradient = ctx.createRadialGradient(
            width/2, height/2, 0,
            width/2, height/2, glow.radius
        );

        if (state.phase < 2) {
            gradient.addColorStop(0, `rgba(100, 150, 200, ${glow.alpha})`);
            gradient.addColorStop(1, 'rgba(50, 80, 120, 0)');
        } else {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${glow.alpha})`);
            gradient.addColorStop(0.2, `rgba(255, 215, 0, ${glow.alpha * 0.7})`);
            gradient.addColorStop(0.5, `rgba(0, 255, 200, ${glow.alpha * 0.4})`);
            gradient.addColorStop(1, 'rgba(0, 100, 150, 0)');
        }

        ctx.beginPath();
        ctx.arc(width/2, height/2, glow.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    function drawNeuralParticles(ctx, state) {
        state.particles = state.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.015;
            p.vx *= 0.98;
            p.vy *= 0.98;

            if (p.life > 0) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);

                if (p.color === 'electric') {
                    ctx.fillStyle = `rgba(0, 255, 255, ${p.life})`;
                    ctx.shadowColor = '#00FFFF';
                } else if (p.color === 'gold') {
                    ctx.fillStyle = `rgba(255, 215, 0, ${p.life})`;
                    ctx.shadowColor = '#FFD700';
                }
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
                return true;
            }
            return false;
        });
    }

    function drawPhaseText(ctx, state, elapsed, width, height) {
        ctx.textAlign = 'center';

        // Responsive font size and positioning for mobile
        const isMobile = width < 600;
        const fontSize = isMobile ? 14 : 20;
        const bottomOffset = isMobile ? 50 : 100;

        ctx.font = `${fontSize}px JetBrains Mono, monospace`;

        // Text starts 1 second after each phase begins, giving user time to see the visuals first
        const texts = [
            { time: 3000, duration: 3000, text: t('chains.cinematic.phase1') },
            { time: 7000, duration: 4000, text: t('chains.cinematic.phase2') },
            { time: 13000, duration: 3000, text: t('chains.cinematic.phase3') },
            { time: 18000, duration: 4000, text: t('chains.cinematic.phase4') },
            { time: 24000, duration: 4000, text: t('chains.cinematic.phase5') },
            { time: 30000, duration: 4000, text: t('chains.cinematic.phase6') },
            { time: 36000, duration: 4000, text: t('chains.cinematic.phase7') },
            { time: 42000, duration: 4000, text: t('chains.cinematic.phase8') },
            { time: 48000, duration: 4000, text: t('chains.cinematic.phase9') }
        ];

        texts.forEach(textItem => {
            if (elapsed >= textItem.time && elapsed < textItem.time + textItem.duration) {
                const fadeProgress = Math.min(
                    (elapsed - textItem.time) / 500,
                    1 - (elapsed - textItem.time - textItem.duration + 500) / 500
                );
                const alpha = Math.max(0, Math.min(1, fadeProgress));

                ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
                ctx.fillText(textItem.text, width/2, height - bottomOffset);
            }
        });
    }

    function endCinematic() {
        state.phase = 'aftermath';

        // Don't fade out audio - let it continue until user leaves or song ends
        if (state.audioElement) {
            // When song ends naturally, it will stop (loop is set to true, so we need to handle this)
            state.audioElement.loop = false; // Stop looping so it can end naturally
            state.audioElement.addEventListener('ended', () => {
                // Song finished naturally
            });
        }

        // Show aftermath
        showAftermath();
    }

    function showAftermath() {
        const content = document.getElementById('chains-content');

        content.innerHTML = `
            <div class="chains-aftermath">
                <p class="aftermath-quote">${t('chains.aftermath.quote')}</p>
                <p class="aftermath-quote">${t('chains.aftermath.author')}</p>
                <button class="chains-btn-leave" id="btn-leave">
                    <span>${t('chains.buttons.zurueck')}</span>
                </button>
            </div>
        `;

        setTimeout(() => {
            document.querySelector('.chains-aftermath').classList.add('visible');
        }, 100);

        // Attach leave button listener
        document.getElementById('btn-leave').addEventListener('click', () => {
            // Fade out audio when user clicks leave
            if (state.audioElement) {
                const fadeOut = setInterval(() => {
                    if (state.audioElement && state.audioElement.volume > 0.1) {
                        state.audioElement.volume -= 0.05;
                    } else {
                        if (state.audioElement) {
                            state.audioElement.pause();
                        }
                        clearInterval(fadeOut);
                        closeOverlay();
                    }
                }, 50);
            } else {
                closeOverlay();
            }
        });

        trackEvent('chains-liberation-completed');
    }

    // ========================================
    // Audio Handling
    // ========================================

    function initAudio() {
        state.audioElement = new Audio('audio/oro_theme_cropped.mp3');
        state.audioElement.volume = 0.7;
        state.audioElement.loop = true;
    }

    // ========================================
    // Utilities
    // ========================================

    function closeOverlay() {
        const overlay = document.getElementById('chains-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 800);
        }

        if (state.animationFrame) {
            cancelAnimationFrame(state.animationFrame);
        }

        if (state.audioElement) {
            state.audioElement.pause();
            state.audioElement = null;
        }

        state.isActive = false;
        state.phase = 'dormant';
    }

    function trackEvent(eventName, data = {}) {
        if (typeof umami !== 'undefined' && umami.track) {
            umami.track(eventName, data);
        }
    }

    // ========================================
    // Export
    // ========================================

    window.ChainsLiberation = {
        show: showChainsQuestion,
        isActive: () => state.isActive
    };

})();
