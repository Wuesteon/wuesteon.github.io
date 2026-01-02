/**
 * Der Panther - Terminal Interface
 * Interactive command-line experience based on Rilke's poem
 *
 * "Nur manchmal schiebt der Vorhang der Pupille sich lautlos auf"
 */

(function() {
    'use strict';

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

    // The Poem - Der Panther by Rainer Maria Rilke
    const POEM = {
        stanza1: [
            "Sein Blick ist vom Voruebergehn der Staebe",
            "so mued geworden, dass er nichts mehr haelt.",
            "Ihm ist, als ob es tausend Staebe gaebe",
            "und hinter tausend Staeben keine Welt."
        ],
        stanza2: [
            "Der weiche Gang geschmeidig starker Schritte,",
            "der sich im allerkleinsten Kreise dreht,",
            "ist wie ein Tanz von Kraft um eine Mitte,",
            "in der betaeubt ein grosser Wille steht."
        ],
        stanza3: [
            "Nur manchmal schiebt der Vorhang der Pupille",
            "sich lautlos auf -. Dann geht ein Bild hinein,",
            "geht durch der Glieder angespannte Stille -",
            "und hoert im Herzen auf zu sein."
        ]
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
            description: "Show available commands",
            handler: cmdHelp
        },
        look: {
            description: "Look at the panther",
            handler: cmdLook
        },
        poem: {
            description: "Read the poem",
            handler: cmdPoem
        },
        speak: {
            description: "Speak to the panther",
            handler: cmdSpeak
        },
        open: {
            description: "Try to open the cage",
            handler: cmdOpen
        },
        wake: {
            description: "Try to wake the panther",
            handler: cmdWake
        },
        free: {
            description: "Attempt to free the panther",
            handler: cmdFree
        },
        status: {
            description: "Check your progress",
            handler: cmdStatus
        },
        clear: {
            description: "Clear the terminal",
            handler: cmdClear
        },

        // Hidden/secret commands
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
        const responses = [
            "Der Panther versteht nicht. Oder vielleicht verstehst du nicht.",
            "Unbekannter Befehl. Tippe 'help' fuer Hilfe.",
            "Die Staebe schweigen.",
            "Nichts geschieht."
        ];
        printLine(responses[Math.floor(Math.random() * responses.length)]);
    }

    // ========================================
    // Command Handlers
    // ========================================

    function cmdHelp() {
        printEmpty();
        printLine("=== Der Panther ===", 'system-msg');
        printEmpty();
        printLine("Verfuegbare Befehle:");

        Object.keys(COMMANDS).forEach(function(key) {
            const cmd = COMMANDS[key];
            if (!cmd.hidden && cmd.description) {
                printLine("  " + key + " - " + cmd.description, 'text-muted');
            }
        });

        printEmpty();
        printLine("Es gibt auch verborgene Befehle...", 'text-muted');
    }

    function cmdLook() {
        GameState.hasLooked = true;
        GameState.awareness++;

        const responses = {
            weary: [
                "Der Panther dreht sich in seinem engen Kreis.",
                "Sein Blick gleitet an den Staeben vorbei,",
                "ohne sie wirklich zu sehen.",
                "Die Bewegung ist mechanisch, endlos."
            ],
            curious: [
                "Der Panther haelt inne.",
                "Fuer einen Moment scheint er dich zu bemerken.",
                "Dann setzt er sein Kreisen fort."
            ],
            restless: [
                "Etwas flackert in seinen Augen.",
                "Der Gang wird unruhiger.",
                "Sucht er nach etwas?"
            ],
            awakened: [
                "Der Panther steht still.",
                "Seine Augen sind offen, wach.",
                "Zum ersten Mal scheint er wirklich zu sehen."
            ]
        };

        printEmpty();
        const lines = responses[GameState.pantherMood] || responses.weary;
        lines.forEach(function(line) { printLine(line); });

        // Update canvas if available
        if (canvasAPI && GameState.awareness > 3) {
            canvasAPI.setMood(1.2);
        }
    }

    function cmdPoem() {
        printEmpty();

        if (GameState.poemRevealed === 0) {
            printLine("Die erste Strophe offenbart sich...", 'system-msg');
            printEmpty();
            printPoem(POEM.stanza1);
            GameState.poemRevealed = 1;
            GameState.awareness += 2;
        } else if (GameState.poemRevealed === 1) {
            printLine("Die zweite Strophe...", 'system-msg');
            printEmpty();
            printPoem(POEM.stanza2);
            GameState.poemRevealed = 2;
            GameState.connection++;
        } else if (GameState.poemRevealed === 2) {
            printLine("Die letzte Strophe...", 'system-msg');
            printEmpty();
            printPoem(POEM.stanza3);
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
                printLine("Der Vorhang der Pupille schiebt sich lautlos auf...", 'poem-text');
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
            }, 2000);
        } else {
            printLine("Das vollstaendige Gedicht:", 'system-msg');
            printEmpty();
            printPoem(POEM.stanza1);
            printEmpty();
            printPoem(POEM.stanza2);
            printEmpty();
            printPoem(POEM.stanza3);
            printEmpty();
            printLine("-- Rainer Maria Rilke, 1902", 'text-muted');
        }
    }

    function cmdSpeak() {
        GameState.hasSpoken = true;

        const responses = [
            "Du sprichst leise in die Dunkelheit.",
            "Der Panther dreht nicht einmal den Kopf.",
            "Deine Worte verhallen zwischen den Staeben.",
            "",
            "Vielleicht hoert er. Vielleicht nicht.",
            "Die Sprache der Menschen bedeutet ihm nichts."
        ];

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
            printLine("Du greifst nach den Staeben.");
            printLine("Sie sind kalt, unnachgiebig.");
            printLine("Der Panther beachtet dich nicht.");
        } else if (!GameState.hasAwakened) {
            printLine("Die Staebe lassen sich nicht bewegen.");
            printLine("Aber... sind es wirklich die Staebe,");
            printLine("die ihn gefangen halten?");
            GameState.connection++;
        } else {
            printLine("Die Staebe sind nicht das Gefaengnis.");
            printLine("Das Gefaengnis ist die Wahrnehmung.");
            printLine("Die Mauern stehen im Inneren.");
        }
    }

    function cmdWake() {
        printEmpty();

        if (GameState.pantherMood === 'awakened') {
            printLine("Er ist bereits wach.");
            printLine("Wacher als du vielleicht.");
        } else if (GameState.poemRevealed >= 2) {
            printLine("Etwas regt sich...");
            GameState.pantherMood = 'curious';
            GameState.awareness += 2;

            if (canvasAPI) {
                canvasAPI.setMood(1.5);
                document.body.classList.add('state-awakening');
            }

            setTimeout(function() {
                printLine("Die Augen des Panthers finden deinen Blick.", 'poem-text');
            }, 1500);
        } else {
            printLine("Er schlaeft nicht.");
            printLine("Er ist nur... betaeubt.");
            printLine("'In der betaeubt ein grosser Wille steht.'");
            GameState.awareness++;
        }
    }

    function cmdFree() {
        printEmpty();

        if (GameState.isFreed) {
            printLine("Die Freiheit liegt in dir. Sie war immer da.");
            return;
        }

        if (!GameState.hasAwakened) {
            printLine("Du ruettelst an den Staeben.");
            printLine("Nichts bewegt sich.");
            printEmpty();
            printLine("Lies das Gedicht. Verstehe.", 'text-muted');
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

        const sequence = [
            // Scene 1: Realization
            { delay: 0, action: function() {
                printLine("...", 'system-msg');
            }},
            { delay: 1500, action: function() {
                printEmpty();
                printLine("Du siehst die Staebe.", 'poem-text');
            }},
            { delay: 2500, action: function() {
                printLine("Du siehst den Panther.", 'poem-text');
            }},
            { delay: 3500, action: function() {
                printLine("Du siehst... dich selbst.", 'poem-text');
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
                printLine("Der Panther haelt inne.", 'response');
            }},
            { delay: 7500, action: function() {
                printLine("Er dreht sich um.", 'response');
            }},
            { delay: 9000, action: function() {
                printLine("Langsam.", 'response');
            }},
            { delay: 10500, action: function() {
                printEmpty();
                printLine("Seine Augen finden deine.", 'poem-text');
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
                printLine("Und du verstehst:", 'system-msg');
            }},
            { delay: 15000, action: function() {
                printEmpty();
                printLine("Die Staebe waren nie das Gefaengnis.", 'poem-text');
            }},
            { delay: 17000, action: function() {
                printLine("Das Gefaengnis war der Blick.", 'poem-text');
            }},
            { delay: 19000, action: function() {
                printLine("Der muede, leere Blick.", 'poem-text');
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
                printLine("Hinter den Staeben...", 'response');
            }},
            { delay: 23500, action: function() {
                printLine("war immer eine Welt.", 'response');
            }},
            { delay: 25500, action: function() {
                printEmpty();
                printLine("Du musstest nur sehen.", 'poem-text');
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
                printLine("Die Welt, die du suchst,", 'poem-text');
            }},
            { delay: 31500, action: function() {
                printLine("war nie hinter den Staeben.", 'poem-text');
            }},
            { delay: 33500, action: function() {
                printEmpty();
                printLine("Sie war in dir.", 'poem-text');
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
                printLine("Das Bild verblasst.", 'text-muted');
            }},
            { delay: 41000, action: function() {
                printLine("Der Panther kreist weiter.", 'text-muted');
            }},
            { delay: 43000, action: function() {
                printEmpty();
                printLine("Aber du hast gesehen.", 'poem-text');
            }},

            // Final
            { delay: 57000, action: function() {
                printEmpty();
                printEmpty();
                printLine("-- R.M. Rilke, Der Panther, 1902", 'text-muted');
                printLine("designed by Nils Weiser", 'text-muted');
                document.body.classList.remove('state-seeing');
                if (canvasAPI) {
                    canvasAPI.setMood(1);
                }
            }},
            { delay: 50000, action: function() {
                // Re-enable input
                GameState.cinematicPlaying = false;
                terminalInput.disabled = false;
                terminalInput.focus();
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
        printLine("=== Status ===", 'system-msg');
        printLine("Befehle eingegeben: " + GameState.commandCount, 'text-muted');
        printLine("Gedicht-Strophen gelesen: " + GameState.poemRevealed + "/3", 'text-muted');
        printLine("Verborgene Befehle gefunden: " + GameState.hiddenCommandsFound.length, 'text-muted');
        printLine("Zustand des Panthers: " + GameState.pantherMood, 'text-muted');

        if (GameState.isFreed) {
            printEmpty();
            printLine("Du hast verstanden.", 'poem-text');
        }
    }

    function cmdClear() {
        terminalOutput.innerHTML = '';
        printLine("Terminal geloescht.", 'system-msg');
    }

    // ========================================
    // Hidden Command Handlers
    // ========================================

    function cmdStabe() {
        printEmpty();
        printLine("'Ihm ist, als ob es tausend Staebe gaebe'", 'poem-text');
        printLine("'und hinter tausend Staeben keine Welt.'", 'poem-text');
        printEmpty();
        printLine("Die Staebe sind ueberall und nirgends.", 'text-muted');
        GameState.awareness++;
    }

    function cmdWille() {
        printEmpty();
        printLine("'...in der betaeubt ein grosser Wille steht.'", 'poem-text');
        printEmpty();
        printLine("Der Wille ist noch da.", 'text-muted');
        printLine("Nur betaeubt. Nicht tot.");
        GameState.connection++;

        if (canvasAPI) {
            canvasAPI.setMood(1.3);
        }
    }

    function cmdHerz() {
        printEmpty();
        printLine("'...und hoert im Herzen auf zu sein.'", 'poem-text');
        printEmpty();
        printLine("Das Bild geht durch die angespannte Stille");
        printLine("der Glieder - und endet im Herzen.");
        printLine("Aber was bedeutet es, im Herzen aufzuhoeren?");
        GameState.connection += 2;
    }

    function cmdJardin() {
        printEmpty();
        printLine("Le Jardin des Plantes, Paris.", 'text-muted');
        printLine("Dort sah Rilke den Panther.");
        printLine("1902. Vor mehr als einem Jahrhundert.");
        printEmpty();
        printLine("Das Tier kreist noch immer.");
    }

    function cmdRilke() {
        printEmpty();
        printLine("Rainer Maria Rilke (1875-1926)", 'system-msg');
        printEmpty();
        printLine("Er lernte von Rodin, wirklich zu sehen.");
        printLine("Nicht nur zu schauen - zu sehen.");
        printLine("'Der Panther' war eines seiner 'Dinggedichte' -");
        printLine("Gedichte, die das Wesen eines Dinges erfassen.");
    }

    function cmdTanz() {
        printEmpty();
        printLine("'...ist wie ein Tanz von Kraft um eine Mitte'", 'poem-text');
        printEmpty();
        printLine("Selbst in der Gefangenschaft -");
        printLine("die Kraft bleibt.");
        printLine("Der Tanz geht weiter.");

        if (canvasAPI) {
            // Briefly make movement more graceful
            canvasAPI.setMood(0.7);
            setTimeout(function() {
                canvasAPI.setMood(1);
            }, 5000);
        }
    }

    function cmdPupille() {
        printEmpty();
        printLine("'Nur manchmal schiebt der Vorhang der Pupille", 'poem-text');
        printLine("sich lautlos auf -.'", 'poem-text');
        printEmpty();

        if (GameState.poemRevealed >= 3 && canvasAPI) {
            printLine("Die Augen oeffnen sich...", 'text-muted');
            canvasAPI.awakenPanther();
            document.body.classList.add('state-seeing');
            GameState.hasAwakened = true;
            GameState.seeingCount++;

            setTimeout(function() {
                document.body.classList.remove('state-seeing');
            }, 8000);
        } else {
            printLine("Der Vorhang bleibt geschlossen.", 'text-muted');
            printLine("Noch nicht...");
        }
    }

    function cmdGedicht() {
        printEmpty();
        printLine("Ein Dinggedicht.", 'text-muted');
        printLine("Das Ding spricht durch den Dichter.");
        printLine("Nicht ueber das Ding - durch es.");
        printEmpty();
        printLine("Der Panther hat durch Rilke gesprochen.");
        printLine("Jetzt spricht er durch diese Staebe.");
    }

    function cmdRodin() {
        printEmpty();
        printLine("Auguste Rodin, der Bildhauer.", 'text-muted');
        printLine("Rilke war sein Sekretaer in Paris.");
        printLine("'Il faut travailler' - Man muss arbeiten.");
        printLine("'Il faut regarder' - Man muss sehen.");
        printEmpty();
        printLine("Rodin lehrte ihn, wirklich zu sehen.");
    }

    function cmdNacht() {
        printEmpty();
        printLine("In der Nacht wird der Kaefig kleiner.", 'text-muted');
        printLine("Oder groesser - wer weiss.");
        printLine("Die Dunkelheit hinter den Staeben");
        printLine("ist dieselbe wie die davor.");

        if (canvasAPI) {
            canvasAPI.setMood(0.5);
        }
    }

    function cmdSecrets() {
        printEmpty();
        printLine("=== Verborgene Befehle ===", 'system-msg');
        printLine("Gefunden: " + GameState.hiddenCommandsFound.join(", ") || "(keine)");
        printEmpty();

        if (GameState.hiddenCommandsFound.length >= 5) {
            printLine("Du suchst aufmerksam.", 'text-muted');
            printLine("Das ist gut.");
            printLine("Der Panther bemerkt es.");
        }
    }

    // ========================================
    // Export
    // ========================================

    window.initTerminal = initTerminal;

})();
