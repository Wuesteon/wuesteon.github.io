/**
 * Der Panther - Interactive Canvas Animation
 * Based on Rainer Maria Rilke's poem "Der Panther"
 *
 * "Sein Blick ist vom Voruebergehn der Staebe
 *  so mued geworden, dass er nichts mehr haelt."
 */

(function() {
    'use strict';

    // ========================================
    // Configuration & State
    // ========================================

    const CONFIG = {
        // Colors matching the site's terminal aesthetic
        colors: {
            background: '#030712',
            barColor: 'rgba(42, 42, 42, 0.9)',
            barHighlight: 'rgba(34, 211, 238, 0.3)',
            pantherBody: '#1a1a1a',
            pantherOutline: '#2a2a2a',
            eyeBase: '#0d0d0d',
            eyeGlow: '#22d3ee',
            eyeAwakened: '#4ade80',
            cyanGlow: 'rgba(34, 211, 238, 0.15)',
            greenGlow: 'rgba(74, 222, 128, 0.15)',
            worldBeyond: 'rgba(34, 211, 238, 0.05)'
        },

        // Animation settings
        animation: {
            baseSpeed: 0.0008,      // Base rotation speed (radians per ms)
            breathCycle: 4000,      // Breathing cycle in ms
            eyeBlinkInterval: 5000, // Average time between blinks
            awakeningDuration: 2000 // Duration of eye awakening animation
        },

        // Panther geometry
        panther: {
            circleRadius: 0.25,     // Radius of pacing circle (fraction of canvas)
            bodyLength: 0.15,       // Body length (fraction of canvas)
            bodyHeight: 0.04,       // Body height
            legLength: 0.05,        // Leg length
            tailLength: 0.08,       // Tail length
            headSize: 0.035         // Head size
        },

        // Cage bars
        bars: {
            count: 12,
            width: 0.012,           // Bar width (fraction of canvas)
            gapRatio: 0.85          // Gap between bars ratio
        }
    };

    // Game state
    let state = {
        canvas: null,
        ctx: null,
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,

        // Animation state
        isRunning: false,
        lastTime: 0,
        angle: 0,                   // Current angle of panther on circle

        // Panther state
        pawPhase: 0,                // Phase of walking animation
        breathPhase: 0,             // Breathing animation phase
        eyeOpenness: 0.3,           // 0 = closed, 1 = fully open
        isBlinking: false,
        lastBlinkTime: 0,

        // Special states
        isAwakening: false,
        awakeningStartTime: 0,
        awakeningLevel: 0,          // 0 = dormant, 1 = fully awakened

        isShowingWorld: false,
        worldRevealLevel: 0,

        moodLevel: 1,               // 0 = lethargic, 1 = normal, 2 = agitated

        // Bar animation
        barPhases: []
    };

    // ========================================
    // Initialization
    // ========================================

    function init(canvasId) {
        state.canvas = document.getElementById(canvasId);
        if (!state.canvas) {
            console.error('Panther game: Canvas not found:', canvasId);
            return false;
        }

        state.ctx = state.canvas.getContext('2d');

        // Initialize bar phases for subtle animation
        for (let i = 0; i < CONFIG.bars.count; i++) {
            state.barPhases.push(Math.random() * Math.PI * 2);
        }

        // Handle resize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return true;
    }

    function resizeCanvas() {
        const container = state.canvas.parentElement;
        const rect = container.getBoundingClientRect();

        // Use device pixel ratio for sharp rendering
        const dpr = window.devicePixelRatio || 1;

        state.width = rect.width;
        state.height = rect.height;

        state.canvas.width = state.width * dpr;
        state.canvas.height = state.height * dpr;
        state.canvas.style.width = state.width + 'px';
        state.canvas.style.height = state.height + 'px';

        state.ctx.scale(dpr, dpr);

        state.centerX = state.width / 2;
        state.centerY = state.height / 2;
    }

    // ========================================
    // Main Animation Loop
    // ========================================

    function start() {
        if (state.isRunning) return;
        state.isRunning = true;
        state.lastTime = performance.now();
        requestAnimationFrame(animate);
    }

    function stop() {
        state.isRunning = false;
    }

    function animate(currentTime) {
        if (!state.isRunning) return;

        const deltaTime = currentTime - state.lastTime;
        state.lastTime = currentTime;

        // Update state
        update(deltaTime, currentTime);

        // Render
        render();

        requestAnimationFrame(animate);
    }

    function update(deltaTime, currentTime) {
        // Speed multiplier based on mood
        const speedMult = 0.5 + (state.moodLevel * 0.5);

        // Update angle (panther pacing in circle)
        state.angle += CONFIG.animation.baseSpeed * deltaTime * speedMult;
        if (state.angle > Math.PI * 2) {
            state.angle -= Math.PI * 2;
        }

        // Update paw phase for walking animation
        state.pawPhase += deltaTime * 0.006 * speedMult;

        // Update breathing
        state.breathPhase = (currentTime % CONFIG.animation.breathCycle) / CONFIG.animation.breathCycle * Math.PI * 2;

        // Handle blinking
        updateBlinking(currentTime);

        // Handle awakening animation
        if (state.isAwakening) {
            const awakeningProgress = (currentTime - state.awakeningStartTime) / CONFIG.animation.awakeningDuration;
            if (awakeningProgress >= 1) {
                state.isAwakening = false;
                state.awakeningLevel = 1;
                state.eyeOpenness = 1;
            } else {
                // Dramatic eye opening curve
                state.eyeOpenness = easeOutBack(awakeningProgress);
                state.awakeningLevel = awakeningProgress;
            }
        }

        // Handle world reveal
        if (state.isShowingWorld) {
            state.worldRevealLevel = Math.min(1, state.worldRevealLevel + deltaTime * 0.001);
        }
    }

    function updateBlinking(currentTime) {
        if (state.isAwakening || state.awakeningLevel > 0.5) {
            // Less blinking when awakened
            if (state.awakeningLevel >= 1 && !state.isBlinking) {
                if (currentTime - state.lastBlinkTime > CONFIG.animation.eyeBlinkInterval * 2) {
                    if (Math.random() < 0.01) {
                        state.isBlinking = true;
                        state.lastBlinkTime = currentTime;
                    }
                }
            }
        } else {
            // Normal tired blinking
            if (!state.isBlinking && currentTime - state.lastBlinkTime > CONFIG.animation.eyeBlinkInterval) {
                if (Math.random() < 0.02) {
                    state.isBlinking = true;
                    state.lastBlinkTime = currentTime;
                }
            }
        }

        // Blink animation
        if (state.isBlinking) {
            const blinkDuration = 200;
            const blinkProgress = (currentTime - state.lastBlinkTime) / blinkDuration;
            if (blinkProgress >= 1) {
                state.isBlinking = false;
                state.eyeOpenness = state.awakeningLevel > 0.5 ? 1 : 0.3;
            } else {
                // Quick close and open
                if (blinkProgress < 0.5) {
                    state.eyeOpenness = Math.max(0.05, state.eyeOpenness - blinkProgress * 2);
                } else {
                    state.eyeOpenness = 0.05 + (blinkProgress - 0.5) * 2 * (state.awakeningLevel > 0.5 ? 0.95 : 0.25);
                }
            }
        }
    }

    // ========================================
    // Rendering
    // ========================================

    function render() {
        const ctx = state.ctx;

        // Clear canvas
        ctx.fillStyle = CONFIG.colors.background;
        ctx.fillRect(0, 0, state.width, state.height);

        // Draw atmospheric effects
        drawAtmosphere(ctx);

        // Draw world beyond bars (if revealed)
        if (state.worldRevealLevel > 0) {
            drawWorldBeyond(ctx);
        }

        // Draw panther
        drawPanther(ctx);

        // Draw cage bars in front
        drawBars(ctx);

        // Draw vignette
        drawVignette(ctx);
    }

    function drawAtmosphere(ctx) {
        // Subtle radial glow in center
        const gradient = ctx.createRadialGradient(
            state.centerX, state.centerY, 0,
            state.centerX, state.centerY, state.width * 0.5
        );
        gradient.addColorStop(0, CONFIG.colors.cyanGlow);
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, state.width, state.height);

        // Grid pattern (very subtle)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 1;
        const gridSize = 50;

        for (let x = 0; x < state.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, state.height);
            ctx.stroke();
        }
        for (let y = 0; y < state.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(state.width, y);
            ctx.stroke();
        }
    }

    function drawWorldBeyond(ctx) {
        // Reveal a glimpse of the world beyond the bars
        const alpha = state.worldRevealLevel * 0.3;

        // Distant landscape/forest silhouette
        ctx.fillStyle = 'rgba(34, 211, 238, ' + (alpha * 0.1) + ')';

        // Mountains/trees in distance
        ctx.beginPath();
        const segments = 20;
        ctx.moveTo(0, state.height);

        for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * state.width;
            const baseHeight = state.height * 0.6;
            const variation = Math.sin(i * 0.8) * state.height * 0.1 +
                             Math.sin(i * 2.1) * state.height * 0.05;
            ctx.lineTo(x, baseHeight + variation);
        }

        ctx.lineTo(state.width, state.height);
        ctx.closePath();
        ctx.fill();

        // Stars or distant lights
        if (state.worldRevealLevel > 0.5) {
            const starAlpha = (state.worldRevealLevel - 0.5) * 2;
            for (let i = 0; i < 30; i++) {
                const x = (Math.sin(i * 7.3) * 0.5 + 0.5) * state.width;
                const y = (Math.sin(i * 3.7) * 0.3 + 0.2) * state.height;
                const size = 1 + Math.sin(i * 2.1) * 0.5;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(74, 222, 128, ' + (starAlpha * 0.5) + ')';
                ctx.fill();
            }
        }
    }

    function drawPanther(ctx) {
        const cfg = CONFIG.panther;
        const circleRadius = Math.min(state.width, state.height) * cfg.circleRadius;

        // Calculate panther position on the circle
        const pantherX = state.centerX + Math.cos(state.angle) * circleRadius;
        const pantherY = state.centerY + Math.sin(state.angle) * circleRadius * 0.4 + state.height * 0.1;

        // Direction panther is facing (tangent to circle)
        const facing = state.angle + Math.PI / 2;

        // Breathing effect
        const breathScale = 1 + Math.sin(state.breathPhase) * 0.02;

        // Body dimensions
        const bodyLength = Math.min(state.width, state.height) * cfg.bodyLength;
        const bodyHeight = Math.min(state.width, state.height) * cfg.bodyHeight * breathScale;
        const headSize = Math.min(state.width, state.height) * cfg.headSize;
        const legLength = Math.min(state.width, state.height) * cfg.legLength;
        const tailLength = Math.min(state.width, state.height) * cfg.tailLength;

        ctx.save();
        ctx.translate(pantherX, pantherY);
        ctx.rotate(facing);

        // Draw shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, bodyHeight * 2, bodyLength * 0.8, bodyHeight * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw tail
        drawTail(ctx, bodyLength, bodyHeight, tailLength);

        // Draw legs
        drawLegs(ctx, bodyLength, bodyHeight, legLength);

        // Draw body
        drawBody(ctx, bodyLength, bodyHeight);

        // Draw head
        drawHead(ctx, bodyLength, bodyHeight, headSize);

        ctx.restore();
    }

    function drawTail(ctx, bodyLength, bodyHeight, tailLength) {
        const tailWave = Math.sin(state.pawPhase * 0.5) * 0.2;

        ctx.strokeStyle = CONFIG.colors.pantherBody;
        ctx.lineWidth = bodyHeight * 0.4;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(-bodyLength * 0.4, 0);

        // Curved tail
        ctx.bezierCurveTo(
            -bodyLength * 0.5 - tailLength * 0.3, bodyHeight * tailWave,
            -bodyLength * 0.4 - tailLength * 0.7, -bodyHeight * 2 + tailWave * bodyHeight,
            -bodyLength * 0.4 - tailLength, -bodyHeight * 1.5 + Math.sin(state.pawPhase) * bodyHeight * 0.5
        );
        ctx.stroke();

        // Tail outline
        ctx.strokeStyle = CONFIG.colors.pantherOutline;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    function drawLegs(ctx, bodyLength, bodyHeight, legLength) {
        const pawOffset = Math.sin(state.pawPhase) * legLength * 0.3;
        const pawOffset2 = Math.sin(state.pawPhase + Math.PI) * legLength * 0.3;

        // Leg positions
        const legs = [
            { x: bodyLength * 0.25, offset: pawOffset, isFront: true },
            { x: bodyLength * 0.15, offset: pawOffset2, isFront: true },
            { x: -bodyLength * 0.2, offset: pawOffset2, isFront: false },
            { x: -bodyLength * 0.3, offset: pawOffset, isFront: false }
        ];

        ctx.strokeStyle = CONFIG.colors.pantherBody;
        ctx.lineWidth = bodyHeight * 0.35;
        ctx.lineCap = 'round';

        legs.forEach(function(leg) {
            const groundY = bodyHeight + legLength;
            const kneeY = bodyHeight + legLength * 0.4;

            // Lift leg during stride
            const liftAmount = leg.offset > 0 ? leg.offset * 0.5 : 0;

            ctx.beginPath();
            ctx.moveTo(leg.x, bodyHeight * 0.5);
            ctx.lineTo(leg.x + leg.offset * 0.3, kneeY - liftAmount * 0.5);
            ctx.lineTo(leg.x + leg.offset, groundY - liftAmount);
            ctx.stroke();

            // Outline
            ctx.strokeStyle = CONFIG.colors.pantherOutline;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.strokeStyle = CONFIG.colors.pantherBody;
            ctx.lineWidth = bodyHeight * 0.35;
        });
    }

    function drawBody(ctx, bodyLength, bodyHeight) {
        // Main body shape
        ctx.fillStyle = CONFIG.colors.pantherBody;
        ctx.beginPath();

        // Organic body curve
        ctx.moveTo(bodyLength * 0.3, -bodyHeight * 0.3);
        ctx.bezierCurveTo(
            bodyLength * 0.4, -bodyHeight,
            -bodyLength * 0.2, -bodyHeight,
            -bodyLength * 0.4, -bodyHeight * 0.2
        );
        ctx.bezierCurveTo(
            -bodyLength * 0.5, bodyHeight * 0.3,
            -bodyLength * 0.3, bodyHeight,
            0, bodyHeight
        );
        ctx.bezierCurveTo(
            bodyLength * 0.3, bodyHeight,
            bodyLength * 0.45, bodyHeight * 0.5,
            bodyLength * 0.3, -bodyHeight * 0.3
        );
        ctx.closePath();
        ctx.fill();

        // Subtle body outline
        ctx.strokeStyle = CONFIG.colors.pantherOutline;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Shoulder highlight
        const shoulderGradient = ctx.createRadialGradient(
            bodyLength * 0.1, -bodyHeight * 0.3, 0,
            bodyLength * 0.1, -bodyHeight * 0.3, bodyHeight
        );
        shoulderGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
        shoulderGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = shoulderGradient;
        ctx.fill();
    }

    function drawHead(ctx, bodyLength, bodyHeight, headSize) {
        const headX = bodyLength * 0.35;
        const headY = -bodyHeight * 0.5;

        // Subtle head bob with breathing
        const bobY = Math.sin(state.breathPhase) * headSize * 0.05;

        ctx.save();
        ctx.translate(headX, headY + bobY);

        // Head shape
        ctx.fillStyle = CONFIG.colors.pantherBody;
        ctx.beginPath();
        ctx.ellipse(0, 0, headSize, headSize * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head outline
        ctx.strokeStyle = CONFIG.colors.pantherOutline;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ears
        [-1, 1].forEach(function(side) {
            ctx.fillStyle = CONFIG.colors.pantherBody;
            ctx.beginPath();
            ctx.moveTo(headSize * 0.2 * side, -headSize * 0.6);
            ctx.lineTo(headSize * 0.5 * side, -headSize * 1.1);
            ctx.lineTo(headSize * 0.6 * side, -headSize * 0.5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });

        // Muzzle
        ctx.fillStyle = CONFIG.colors.pantherBody;
        ctx.beginPath();
        ctx.ellipse(headSize * 0.5, headSize * 0.1, headSize * 0.4, headSize * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw eyes
        drawEyes(ctx, headSize);

        ctx.restore();
    }

    function drawEyes(ctx, headSize) {
        const eyeY = -headSize * 0.1;
        const eyeSize = headSize * 0.2;

        [-1, 1].forEach(function(side) {
            const eyeX = headSize * 0.15 * side;

            // Eye socket
            ctx.fillStyle = CONFIG.colors.eyeBase;
            ctx.beginPath();
            ctx.ellipse(eyeX, eyeY, eyeSize, eyeSize * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();

            // Eye opening based on state
            const openAmount = state.eyeOpenness;

            if (openAmount > 0.1) {
                // Pupil
                const pupilSize = eyeSize * 0.5 * openAmount;

                // Eye glow based on awakening
                const glowColor = state.awakeningLevel > 0.5 ?
                    CONFIG.colors.eyeAwakened : CONFIG.colors.eyeGlow;

                // Outer glow
                if (state.awakeningLevel > 0 || openAmount > 0.5) {
                    const glowStrength = Math.max(state.awakeningLevel, (openAmount - 0.5) * 2);
                    const eyeGlow = ctx.createRadialGradient(
                        eyeX, eyeY, 0,
                        eyeX, eyeY, eyeSize * 2
                    );

                    // Parse the glow color and add alpha
                    let glowWithAlpha;
                    if (glowColor.startsWith('#')) {
                        const r = parseInt(glowColor.slice(1, 3), 16);
                        const g = parseInt(glowColor.slice(3, 5), 16);
                        const b = parseInt(glowColor.slice(5, 7), 16);
                        glowWithAlpha = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (glowStrength * 0.5) + ')';
                    } else {
                        glowWithAlpha = glowColor;
                    }

                    eyeGlow.addColorStop(0, glowWithAlpha);
                    eyeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    ctx.fillStyle = eyeGlow;
                    ctx.beginPath();
                    ctx.arc(eyeX, eyeY, eyeSize * 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Slit pupil (more open when awakened)
                const slitWidth = eyeSize * 0.15 + (state.awakeningLevel * eyeSize * 0.3);
                ctx.fillStyle = glowColor;
                ctx.beginPath();
                ctx.ellipse(eyeX, eyeY, slitWidth, pupilSize, 0, 0, Math.PI * 2);
                ctx.fill();

                // Catch light
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(eyeX - eyeSize * 0.15, eyeY - eyeSize * 0.2, eyeSize * 0.1, 0, Math.PI * 2);
                ctx.fill();
            }

            // Eyelid (closes based on eye openness)
            if (openAmount < 1) {
                ctx.fillStyle = CONFIG.colors.pantherBody;
                ctx.beginPath();
                ctx.ellipse(eyeX, eyeY - eyeSize * 0.5 * openAmount, eyeSize * 1.1, eyeSize * 0.7 * (1 - openAmount), 0, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    function drawBars(ctx) {
        const barWidth = state.width * CONFIG.bars.width;
        const barSpacing = state.width / CONFIG.bars.count;

        for (let i = 0; i < CONFIG.bars.count; i++) {
            const x = i * barSpacing + barSpacing * 0.5;
            const phase = state.barPhases[i];

            // Subtle bar animation
            const wave = Math.sin(state.angle * 2 + phase) * 2;

            // Bar gradient (darker at top and bottom)
            const barGradient = ctx.createLinearGradient(0, 0, 0, state.height);
            barGradient.addColorStop(0, CONFIG.colors.barColor);
            barGradient.addColorStop(0.5, 'rgba(50, 50, 50, 0.85)');
            barGradient.addColorStop(1, CONFIG.colors.barColor);

            ctx.fillStyle = barGradient;
            ctx.fillRect(x + wave - barWidth / 2, 0, barWidth, state.height);

            // Highlight on bar edge
            ctx.fillStyle = CONFIG.colors.barHighlight;
            ctx.fillRect(x + wave - barWidth / 2, 0, 1, state.height);

            // Show bars fading if world is revealed
            if (state.worldRevealLevel > 0) {
                ctx.globalAlpha = 1 - (state.worldRevealLevel * 0.3);
            }
        }
        ctx.globalAlpha = 1;
    }

    function drawVignette(ctx) {
        // Dark vignette around edges
        const gradient = ctx.createRadialGradient(
            state.centerX, state.centerY, Math.min(state.width, state.height) * 0.3,
            state.centerX, state.centerY, Math.max(state.width, state.height) * 0.7
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, state.width, state.height);
    }

    // ========================================
    // Easing Functions
    // ========================================

    function easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    // ========================================
    // Public API
    // ========================================

    /**
     * Trigger the eye awakening animation
     * "Nur manchmal schiebt der Vorhang der Pupille sich lautlos auf"
     */
    function awakenPanther() {
        if (!state.isAwakening && state.awakeningLevel < 1) {
            state.isAwakening = true;
            state.awakeningStartTime = performance.now();
            return true;
        }
        return false;
    }

    /**
     * Reveal the world beyond the bars
     * "dann geht ein Bild hinein, geht durch der Glieder angespannte Stille"
     */
    function showWorld() {
        state.isShowingWorld = true;
        return true;
    }

    /**
     * Hide the world beyond (return to dormant state)
     */
    function hideWorld() {
        state.isShowingWorld = false;
        // Gradually fade out
        const fadeOut = setInterval(function() {
            state.worldRevealLevel -= 0.02;
            if (state.worldRevealLevel <= 0) {
                state.worldRevealLevel = 0;
                clearInterval(fadeOut);
            }
        }, 16);
        return true;
    }

    /**
     * Set the animation mood/intensity
     * @param {number} level - 0 (lethargic) to 2 (agitated)
     */
    function setMood(level) {
        state.moodLevel = Math.max(0, Math.min(2, level));
        return state.moodLevel;
    }

    /**
     * Get current game state
     */
    function getState() {
        return {
            isRunning: state.isRunning,
            angle: state.angle,
            eyeOpenness: state.eyeOpenness,
            awakeningLevel: state.awakeningLevel,
            worldRevealLevel: state.worldRevealLevel,
            moodLevel: state.moodLevel,
            isAwakening: state.isAwakening,
            isShowingWorld: state.isShowingWorld
        };
    }

    /**
     * Reset the panther to dormant state
     */
    function reset() {
        state.awakeningLevel = 0;
        state.eyeOpenness = 0.3;
        state.isAwakening = false;
        state.isShowingWorld = false;
        state.worldRevealLevel = 0;
        state.moodLevel = 1;
        return true;
    }

    // ========================================
    // Export
    // ========================================

    window.PantherGame = {
        init: init,
        start: start,
        stop: stop,
        awakenPanther: awakenPanther,
        showWorld: showWorld,
        hideWorld: hideWorld,
        setMood: setMood,
        getState: getState,
        reset: reset
    };

})();
