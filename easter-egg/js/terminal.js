/**
 * Der Panther - Terminal Interface
 * Interactive command-line experience based on Rilke's poem
 *
 * "Nur manchmal schiebt der Vorhang der Pupille sich lautlos auf"
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
    // Analytics Helper
    // ========================================

    function trackEvent(eventName, eventData = {}) {
        if (typeof umami !== 'undefined' && umami.track) {
            umami.track(eventName, eventData);
        }
    }

    // ========================================
    // Game State
    // ========================================

    const GameState = {
        poemRevealed: 0,          // 0-3 stanzas revealed
        hasLooked: false,
        hasSpoken: false,
        hasTriedOpen: false,
        hasAwakened: false,
        isFreed: false,
        commandCount: 0,
        hiddenCommandsFound: [],
        pantherMood: 'weary',     // weary, curious, restless, awakened, free
        awareness: 0,             // Progress counter
        connection: 0,            // Connection with panther
        seeingCount: 0,           // Times SEEING state achieved
        cinematicPlaying: false   // Block input during cinematic
    };

    // Terminal elements
    let terminalOutput = null;
    let terminalInput = null;
    let canvasAPI = null;
    let commandHistory = [];
    let historyIndex = -1;

    // ========================================
    // Command Definitions
    // ========================================

    const COMMANDS = {
        // Basic commands
        help: {
            descriptionKey: "terminal.commands.help",
            handler: cmdHelp
        },
        look: {
            descriptionKey: "terminal.commands.look",
            handler: cmdLook
        },
        poem: {
            descriptionKey: "terminal.commands.poem",
            handler: cmdPoem
        },
        speak: {
            descriptionKey: "terminal.commands.speak",
            handler: cmdSpeak
        },
        open: {
            descriptionKey: "terminal.commands.open",
            handler: cmdOpen
        },
        wake: {
            descriptionKey: "terminal.commands.wake",
            handler: cmdWake
        },
        free: {
            descriptionKey: "terminal.commands.free",
            handler: cmdFree
        },
        status: {
            descriptionKey: "terminal.commands.status",
            handler: cmdStatus
        },
        clear: {
            descriptionKey: "terminal.commands.clear",
            handler: cmdClear
        },

        // Hidden/secret commands
        erwachen: { hidden: true, handler: cmdErwachen },
        ketten: { hidden: true, handler: cmdKetten },
        stabe: { hidden: true, handler: cmdStabe },
        wille: { hidden: true, handler: cmdWille },
        herz: { hidden: true, handler: cmdHerz },
        jardin: { hidden: true, handler: cmdJardin },
        rilke: { hidden: true, handler: cmdRilke },
        tanz: { hidden: true, handler: cmdTanz },
        pupille: { hidden: true, handler: cmdPupille },
        gedicht: { hidden: true, handler: cmdGedicht },
        rodin: { hidden: true, handler: cmdRodin },
        nacht: { hidden: true, handler: cmdNacht },
        secrets: { hidden: true, handler: cmdSecrets }
    };

    // ========================================
    // Initialization
    // ========================================

    function initTerminal(api) {
        canvasAPI = api;
        terminalOutput = document.getElementById('terminal-output');
        terminalInput = document.getElementById('terminal-input');

        if (!terminalInput || !terminalOutput) {
            console.error('Terminal elements not found');
            return;
        }

        // Track easter egg page visit
        trackEvent('easter-egg-visited', {
            timestamp: new Date().toISOString(),
            referrer: document.referrer
        });

        // Input handling
        terminalInput.addEventListener('keydown', handleKeyDown);
        terminalInput.addEventListener('keyup', handleKeyUp);

        // Focus input on click anywhere in terminal
        document.querySelector('.terminal-body').addEventListener('click', function() {
            terminalInput.focus();
        });

        // Initial focus
        terminalInput.focus();

        // Update initial messages with current language
        updateInitialMessages();

        // Listen for language changes
        window.addEventListener('pantherLangChange', function() {
            updateInitialMessages();
        });
    }

    function updateInitialMessages() {
        // Update the initial terminal output with translated text
        const output = document.getElementById('terminal-output');
        if (output) {
            const poem = t('poem.stanza1');
            output.innerHTML = `
                <p class="terminal-line system-msg">
                    <span class="prompt-time">[--:--:--]</span> ${t('terminal.system.initialized')}
                </p>
                <p class="terminal-line system-msg fade-in">
                    <span class="prompt-time">[--:--:--]</span> <span class="text-muted">${poem[0]}</span>
                </p>
                <p class="terminal-line system-msg fade-in">
                    <span class="prompt-time">[--:--:--]</span> <span class="text-muted">${poem[1]}</span>
                </p>
                <p class="terminal-line fade-in delay-1">
                    <span class="prompt-symbol">></span> ${t('terminal.system.typeHelp')}
                </p>
            `;
        }
    }

    function handleKeyDown(e) {
        // Block all input during cinematic sequence
        if (GameState.cinematicPlaying) {
            e.preventDefault();
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            const input = terminalInput.value.trim().toLowerCase();
            if (input) {
                processCommand(input);
                commandHistory.unshift(input);
                historyIndex = -1;
            }
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                terminalInput.value = '';
            }
        }
    }

    function handleKeyUp() {
        // Update cursor visibility
    }

    // ========================================
    // Command Processing
    // ========================================

    function processCommand(input) {
        GameState.commandCount++;

        // Echo user input
        printLine('> ' + input, 'user-input');

        // Check for command
        const cmd = COMMANDS[input];
        if (cmd) {
            if (cmd.hidden && !GameState.hiddenCommandsFound.includes(input)) {
                GameState.hiddenCommandsFound.push(input);
                // Track hidden command discovery
                trackEvent('easter-egg-hidden-command', {
                    command: input,
                    totalFound: GameState.hiddenCommandsFound.length
                });
            }
            // Track command usage (sample rate: every 5th command to avoid spam)
            if (GameState.commandCount % 5 === 0) {
                trackEvent('easter-egg-command-milestone', {
                    commandCount: GameState.commandCount,
                    poemRevealed: GameState.poemRevealed,
                    pantherMood: GameState.pantherMood
                });
            }
            cmd.handler();
        } else {
            // Unknown command
            printUnknown(input);
        }

        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // ========================================
    // Output Functions
    // ========================================

    function printLine(text, className) {
        const line = document.createElement('p');
        line.className = 'terminal-line ' + (className || 'response');
        line.textContent = text;
        terminalOutput.appendChild(line);
    }

    function printLineHTML(html, className) {
        const line = document.createElement('p');
        line.className = 'terminal-line ' + (className || 'response');
        line.innerHTML = html;
        terminalOutput.appendChild(line);
    }

    function printPoem(lines) {
        lines.forEach(function(line) {
            const p = document.createElement('p');
            p.className = 'terminal-line poem-text';
            p.textContent = line;
            terminalOutput.appendChild(p);
        });
    }

    function printEmpty() {
        const line = document.createElement('p');
        line.className = 'terminal-line';
        line.innerHTML = '&nbsp;';
        terminalOutput.appendChild(line);
    }

    function printUnknown(input) {
        const responses = t('terminal.unknown');
        printLine(responses[Math.floor(Math.random() * responses.length)]);
    }

    // ========================================
    // Command Handlers
    // ========================================

    function cmdHelp() {
        printEmpty();
        printLine(t('terminal.system.title'), 'system-msg');
        printEmpty();
        printLine(t('terminal.system.availableCommands'));

        Object.keys(COMMANDS).forEach(function(key) {
            const cmd = COMMANDS[key];
            if (!cmd.hidden && cmd.descriptionKey) {
                printLine("  " + key + " - " + t(cmd.descriptionKey), 'text-muted');
            }
        });

        printEmpty();
        printLine(t('terminal.system.hiddenHint'), 'text-muted');
    }

    function cmdLook() {
        GameState.hasLooked = true;
        GameState.awareness++;

        const responses = t('terminal.responses.look');
        const moodResponses = responses[GameState.pantherMood] || responses.weary;

        printEmpty();
        moodResponses.forEach(function(line) { printLine(line); });

        // Update canvas if available
        if (canvasAPI && GameState.awareness > 3) {
            canvasAPI.setMood(1.2);
        }
    }

    function cmdPoem() {
        printEmpty();

        if (GameState.poemRevealed === 0) {
            printLine(t('terminal.responses.poem.stanza1Intro'), 'system-msg');
            printEmpty();
            printPoem(t('poem.stanza1'));
            GameState.poemRevealed = 1;
            GameState.awareness += 2;
        } else if (GameState.poemRevealed === 1) {
            printLine(t('terminal.responses.poem.stanza2Intro'), 'system-msg');
            printEmpty();
            printPoem(t('poem.stanza2'));
            GameState.poemRevealed = 2;
            GameState.connection++;
        } else if (GameState.poemRevealed === 2) {
            printLine(t('terminal.responses.poem.stanza3Intro'), 'system-msg');
            printEmpty();
            printPoem(t('poem.stanza3'));
            GameState.poemRevealed = 3;
            GameState.connection += 2;

            // Track poem completion
            trackEvent('easter-egg-poem-completed', {
                commandCount: GameState.commandCount,
                timestamp: new Date().toISOString()
            });

            // Trigger awakening after reading full poem
            setTimeout(function() {
                printEmpty();
                printLine(t('terminal.responses.poem.awakening'), 'poem-text');
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                if (canvasAPI) {
                    canvasAPI.awakenPanther();
                    document.body.classList.add('state-seeing');
                    setTimeout(function() {
                        document.body.classList.remove('state-seeing');
                    }, 8000);
                }
                GameState.hasAwakened = true;
                GameState.pantherMood = 'awakened';
                GameState.seeingCount++;

                // Track panther awakening
                trackEvent('panther-awakened', {
                    commandCount: GameState.commandCount,
                    timestamp: new Date().toISOString()
                });
            }, 2000);
        } else {
            printLine(t('terminal.responses.poem.fullPoem'), 'system-msg');
            printEmpty();
            printPoem(t('poem.stanza1'));
            printEmpty();
            printPoem(t('poem.stanza2'));
            printEmpty();
            printPoem(t('poem.stanza3'));
            printEmpty();
            printLine("-- " + t('poem.author'), 'text-muted');
        }
    }

    function cmdSpeak() {
        GameState.hasSpoken = true;

        const responses = t('terminal.responses.speak');

        printEmpty();
        responses.forEach(function(line) {
            if (line === "") {
                printEmpty();
            } else {
                printLine(line);
            }
        });

        GameState.awareness++;
    }

    function cmdOpen() {
        GameState.hasTriedOpen = true;

        printEmpty();

        if (GameState.commandCount < 10) {
            const responses = t('terminal.responses.open.first');
            responses.forEach(function(line) { printLine(line); });
        } else if (!GameState.hasAwakened) {
            const responses = t('terminal.responses.open.second');
            responses.forEach(function(line) { printLine(line); });
            GameState.connection++;
        } else {
            const responses = t('terminal.responses.open.realized');
            responses.forEach(function(line) { printLine(line); });
        }
    }

    function cmdWake() {
        printEmpty();

        if (GameState.pantherMood === 'awakened') {
            const responses = t('terminal.responses.wake.notAwakened');
            responses.forEach(function(line) { printLine(line); });
        } else if (GameState.poemRevealed >= 2) {
            const responses = t('terminal.responses.wake.partial');
            printLine(responses[0]);
            GameState.pantherMood = 'curious';
            GameState.awareness += 2;

            if (canvasAPI) {
                canvasAPI.setMood(1.5);
                document.body.classList.add('state-awakening');
            }

            setTimeout(function() {
                printLine(responses[1], 'poem-text');
            }, 1500);
        } else {
            const responses = t('terminal.responses.wake.awakened');
            responses.forEach(function(line) { printLine(line); });
            GameState.awareness++;
        }
    }

    function cmdFree() {
        printEmpty();

        if (GameState.isFreed) {
            printLine(t('terminal.responses.free.understood'));
            return;
        }

        if (!GameState.hasAwakened) {
            const responses = t('terminal.responses.free.notReady');
            responses.forEach(function(line) { printLine(line); });
            printEmpty();
            printLine(responses[2], 'text-muted');
            GameState.connection++;
        } else {
            // Disable input during cinematic sequence
            terminalInput.disabled = true;
            GameState.isFreed = true;
            GameState.pantherMood = 'free';

            // Track liberation achieved
            trackEvent('easter-egg-liberation', {
                commandCount: GameState.commandCount,
                hiddenCommandsFound: GameState.hiddenCommandsFound.length,
                timestamp: new Date().toISOString()
            });

            // Start cinematic liberation sequence
            cinematicLiberation();
        }
    }

    /**
     * Cinematic liberation sequence - movie-like experience
     */
    function cinematicLiberation() {
        // Block all input
        GameState.cinematicPlaying = true;
        terminalInput.disabled = true;
        terminalInput.blur();

        const cin = t('terminal.responses.cinematic');

        const sequence = [
            // Scene 1: Realization
            { delay: 0, action: function() {
                printLine(cin.dots, 'system-msg');
            }},
            { delay: 1500, action: function() {
                printEmpty();
                printLine(cin.seeBars, 'poem-text');
            }},
            { delay: 2500, action: function() {
                printLine(cin.seePanther, 'poem-text');
            }},
            { delay: 3500, action: function() {
                printLine(cin.seeYourself, 'poem-text');
            }},

            // Scene 2: The turn
            { delay: 5500, action: function() {
                printEmpty();
                printEmpty();
                if (canvasAPI) {
                    canvasAPI.setMood(0.3); // Slow down
                }
            }},
            { delay: 6000, action: function() {
                printLine(cin.pantherPauses, 'response');
            }},
            { delay: 7500, action: function() {
                printLine(cin.turnsAround, 'response');
            }},
            { delay: 9000, action: function() {
                printLine(cin.slowly, 'response');
            }},
            { delay: 10500, action: function() {
                printEmpty();
                printLine(cin.eyesMeet, 'poem-text');
                if (canvasAPI) {
                    canvasAPI.awakenPanther();
                    document.body.classList.add('state-seeing');
                }
            }},

            // Scene 3: The revelation
            { delay: 13000, action: function() {
                printEmpty();
                printEmpty();
            }},
            { delay: 13500, action: function() {
                printLine(cin.understand, 'system-msg');
            }},
            { delay: 15000, action: function() {
                printEmpty();
                printLine(cin.barsNotPrison, 'poem-text');
            }},
            { delay: 17000, action: function() {
                printLine(cin.prisonWasGaze, 'poem-text');
            }},
            { delay: 19000, action: function() {
                printLine(cin.wearyEmptyGaze, 'poem-text');
            }},

            // Scene 4: The world beyond
            { delay: 21500, action: function() {
                printEmpty();
                printEmpty();
                if (canvasAPI) {
                    canvasAPI.showWorld();
                }
            }},
            { delay: 22000, action: function() {
                printLine(cin.behindBars, 'response');
            }},
            { delay: 23500, action: function() {
                printLine(cin.alwaysWorld, 'response');
            }},
            { delay: 25500, action: function() {
                printEmpty();
                printLine(cin.hadToSee, 'poem-text');
            }},

            // Scene 5: The message
            { delay: 28500, action: function() {
                printEmpty();
                printEmpty();
                printEmpty();
            }},
            { delay: 29000, action: function() {
                printLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", 'text-muted');
            }},
            { delay: 29500, action: function() {
                printEmpty();
                printLine(cin.worldYouSeek, 'poem-text');
            }},
            { delay: 31500, action: function() {
                printLine(cin.neverBehindBars, 'poem-text');
            }},
            { delay: 33500, action: function() {
                printEmpty();
                printLine(cin.wasInYou, 'poem-text');
            }},
            { delay: 36000, action: function() {
                printEmpty();
                printLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", 'text-muted');
            }},

            // Scene 6: Return
            { delay: 39000, action: function() {
                printEmpty();
                printEmpty();
            }},
            { delay: 39500, action: function() {
                printLine(cin.imageFades, 'text-muted');
            }},
            { delay: 41000, action: function() {
                printLine(cin.pantherCircles, 'text-muted');
            }},
            { delay: 43000, action: function() {
                printEmpty();
                printLine(cin.butYouSaw, 'poem-text');
            }},

            // Final
            { delay: 47000, action: function() {
                printEmpty();
                printEmpty();
                printLine("-- " + t('poem.author'), 'text-muted');
                printLine(t('ui.credit'), 'text-muted');
                document.body.classList.remove('state-seeing');
                if (canvasAPI) {
                    canvasAPI.setMood(1);
                }
            }},
            { delay: 50000, action: function() {
                // Transition to the chains question
                printEmpty();
                printEmpty();
                printLine(cin.dots, 'system-msg');
            }},
            { delay: 52000, action: function() {
                printEmpty();
                printLine(cin.questionRemains, 'poem-text');
            }},
            { delay: 55000, action: function() {
                printEmpty();
                printLine(cin.readyToAwaken, 'poem-text');
            }},
            { delay: 58000, action: function() {
                printLineHTML(cin.typeAwaken, 'system-msg');
                // Re-enable input so user can type the command
                GameState.cinematicPlaying = false;
                terminalInput.disabled = false;
            }}
        ];

        // Execute sequence
        sequence.forEach(function(step) {
            setTimeout(function() {
                step.action();
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, step.delay);
        });
    }

    function cmdStatus() {
        printEmpty();
        printLine(t('terminal.system.statusTitle'), 'system-msg');
        printLine(t('terminal.status.commandsEntered') + GameState.commandCount, 'text-muted');
        printLine(t('terminal.status.poemStanzas') + GameState.poemRevealed + "/3", 'text-muted');
        printLine(t('terminal.status.hiddenFound') + GameState.hiddenCommandsFound.length, 'text-muted');
        printLine(t('terminal.status.pantherState') + t('terminal.moods.' + GameState.pantherMood), 'text-muted');

        if (GameState.isFreed) {
            printEmpty();
            printLine(t('terminal.status.understood'), 'poem-text');
        }
    }

    function cmdClear() {
        terminalOutput.innerHTML = '';
        printLine(t('terminal.system.cleared'), 'system-msg');
    }

    // ========================================
    // Hidden Command Handlers
    // ========================================

    function cmdStabe() {
        const responses = t('terminal.responses.hidden.stabe');
        printEmpty();
        printLine(responses[0], 'poem-text');
        printLine(responses[1], 'poem-text');
        printEmpty();
        printLine(responses[2], 'text-muted');
        GameState.awareness++;
    }

    function cmdWille() {
        const responses = t('terminal.responses.hidden.wille');
        printEmpty();
        printLine(responses[0], 'poem-text');
        printEmpty();
        printLine(responses[1], 'text-muted');
        printLine(responses[2]);
        GameState.connection++;

        if (canvasAPI) {
            canvasAPI.setMood(1.3);
        }
    }

    function cmdHerz() {
        const responses = t('terminal.responses.hidden.herz');
        printEmpty();
        printLine(responses[0], 'poem-text');
        printEmpty();
        printLine(responses[1]);
        printLine(responses[2]);
        printLine(responses[3]);
        GameState.connection += 2;
    }

    function cmdJardin() {
        const responses = t('terminal.responses.hidden.jardin');
        printEmpty();
        printLine(responses[0], 'text-muted');
        printLine(responses[1]);
        printLine(responses[2]);
        printEmpty();
        printLine(responses[3]);
    }

    function cmdRilke() {
        const responses = t('terminal.responses.hidden.rilke');
        printEmpty();
        printLine(responses[0], 'system-msg');
        printEmpty();
        printLine(responses[1]);
        printLine(responses[2]);
        printLine(responses[3]);
        printLine(responses[4]);
    }

    function cmdTanz() {
        const responses = t('terminal.responses.hidden.tanz');
        printEmpty();
        printLine(responses[0], 'poem-text');
        printEmpty();
        printLine(responses[1]);
        printLine(responses[2]);
        printLine(responses[3]);

        if (canvasAPI) {
            // Briefly make movement more graceful
            canvasAPI.setMood(0.7);
            setTimeout(function() {
                canvasAPI.setMood(1);
            }, 5000);
        }
    }

    function cmdPupille() {
        const responses = t('terminal.responses.hidden.pupille');
        printEmpty();
        printLine(responses.notReady[0], 'poem-text');
        printLine(responses.notReady[1], 'poem-text');
        printEmpty();

        if (GameState.poemRevealed >= 3 && canvasAPI) {
            printLine(responses.ready[0], 'text-muted');
            canvasAPI.awakenPanther();
            document.body.classList.add('state-seeing');
            GameState.hasAwakened = true;
            GameState.seeingCount++;

            setTimeout(function() {
                document.body.classList.remove('state-seeing');
            }, 8000);
        } else {
            printLine(responses.notReady[2], 'text-muted');
            printLine(responses.notReady[3]);
        }
    }

    function cmdGedicht() {
        const responses = t('terminal.responses.hidden.gedicht');
        printEmpty();
        printLine(responses[0], 'text-muted');
        printLine(responses[1]);
        printLine(responses[2]);
        printEmpty();
        printLine(responses[3]);
        printLine(responses[4]);
    }

    function cmdRodin() {
        const responses = t('terminal.responses.hidden.rodin');
        printEmpty();
        printLine(responses[0], 'text-muted');
        printLine(responses[1]);
        printLine(responses[2]);
        printLine(responses[3]);
        printEmpty();
        printLine(responses[4]);
    }

    function cmdNacht() {
        const responses = t('terminal.responses.hidden.nacht');
        printEmpty();
        printLine(responses[0], 'text-muted');
        printLine(responses[1]);
        printLine(responses[2]);
        printLine(responses[3]);

        if (canvasAPI) {
            canvasAPI.setMood(0.5);
        }
    }

    function cmdSecrets() {
        const responses = t('terminal.responses.hidden.secrets');
        printEmpty();
        printLine(t('terminal.system.hiddenTitle'), 'system-msg');
        printLine(t('terminal.status.hiddenFound').replace(': ', ': ') + (GameState.hiddenCommandsFound.join(", ") || "(keine)"));
        printEmpty();

        if (GameState.hiddenCommandsFound.length >= 5) {
            printLine(responses[0], 'text-muted');
            printLine(responses[1]);
            printLine(responses[2]);
        }
    }

    // Awaken command - start the chains liberation experience
    function cmdErwachen() {
        printEmpty();
        printLine(t('terminal.responses.cinematic.youAwaken'), 'poem-text');
        setTimeout(function() {
            if (window.ChainsLiberation && !window.ChainsLiberation.isActive()) {
                window.ChainsLiberation.show();
            }
        }, 1000);
    }

    // Debug command - skip directly to chains liberation
    function cmdKetten() {
        printEmpty();
        printLine(t('terminal.responses.erwachen.direct'), 'system-msg');
        setTimeout(function() {
            if (window.ChainsLiberation && !window.ChainsLiberation.isActive()) {
                window.ChainsLiberation.show();
            }
        }, 500);
    }

    // ========================================
    // Export
    // ========================================

    window.initTerminal = initTerminal;

})();
