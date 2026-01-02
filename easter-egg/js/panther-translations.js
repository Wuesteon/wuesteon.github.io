/**
 * Panther Easter Egg - Multi-language Translations
 * Supports: German (de), English (en), Spanish (es), French (fr), Italian (it), Portuguese (pt)
 */

(function() {
    'use strict';

    const SUPPORTED_LANGS = ['de', 'en', 'es', 'fr', 'it', 'pt'];
    let currentLang = 'de';

    // ========================================
    // Translations
    // ========================================

    const TRANSLATIONS = {
        // ============================================================
        // GERMAN (Original)
        // ============================================================
        de: {
            // === POEM: Der Panther by Rainer Maria Rilke ===
            poem: {
                title: "Der Panther",
                subtitle: "Im Jardin des Plantes, Paris",
                author: "R.M. Rilke, Der Panther, 1902",
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
            },

            // === TERMINAL SYSTEM MESSAGES ===
            terminal: {
                system: {
                    title: "=== Der Panther ===",
                    availableCommands: "Verfuegbare Befehle:",
                    hiddenHint: "Es gibt auch verborgene Befehle...",
                    statusTitle: "=== Status ===",
                    cleared: "Terminal geloescht.",
                    hiddenTitle: "=== Verborgene Befehle ===",
                    initialized: "System initialisiert...",
                    typeHelp: "Tippe 'help' fuer Befehle."
                },
                commands: {
                    help: "Zeige verfuegbare Befehle",
                    look: "Betrachte den Panther",
                    poem: "Lies das Gedicht",
                    speak: "Sprich zum Panther",
                    open: "Versuche den Kaefig zu oeffnen",
                    wake: "Versuche den Panther zu wecken",
                    free: "Versuche den Panther zu befreien",
                    status: "Pruefe deinen Fortschritt",
                    clear: "Loesche das Terminal"
                },
                status: {
                    commandsEntered: "Befehle eingegeben: ",
                    poemStanzas: "Gedicht-Strophen gelesen: ",
                    hiddenFound: "Verborgene Befehle gefunden: ",
                    pantherState: "Zustand des Panthers: ",
                    understood: "Du hast verstanden."
                },
                moods: {
                    weary: "muede",
                    curious: "neugierig",
                    restless: "unruhig",
                    awakened: "erwacht"
                },
                unknown: [
                    "Der Panther versteht nicht. Oder vielleicht verstehst du nicht.",
                    "Unbekannter Befehl. Tippe 'help' fuer Hilfe.",
                    "Die Staebe schweigen.",
                    "Nichts geschieht."
                ],
                responses: {
                    look: {
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
                    },
                    poem: {
                        stanza1Intro: "Die erste Strophe offenbart sich...",
                        stanza2Intro: "Die zweite Strophe...",
                        stanza3Intro: "Die letzte Strophe...",
                        fullPoem: "Das vollstaendige Gedicht:",
                        awakening: "Der Vorhang der Pupille schiebt sich lautlos auf..."
                    },
                    speak: [
                        "Du sprichst leise in die Dunkelheit.",
                        "Der Panther dreht nicht einmal den Kopf.",
                        "Deine Worte verhallen zwischen den Staeben.",
                        "Vielleicht hoert er. Vielleicht nicht.",
                        "Die Sprache der Menschen bedeutet ihm nichts."
                    ],
                    open: {
                        first: [
                            "Du greifst nach den Staeben.",
                            "Sie sind kalt, unnachgiebig.",
                            "Der Panther beachtet dich nicht."
                        ],
                        second: [
                            "Die Staebe lassen sich nicht bewegen.",
                            "Aber... sind es wirklich die Staebe,",
                            "die ihn gefangen halten?"
                        ],
                        realized: [
                            "Die Staebe sind nicht das Gefaengnis.",
                            "Das Gefaengnis ist die Wahrnehmung.",
                            "Die Mauern stehen im Inneren."
                        ]
                    },
                    wake: {
                        notAwakened: [
                            "Er ist bereits wach.",
                            "Wacher als du vielleicht."
                        ],
                        partial: [
                            "Etwas regt sich...",
                            "Die Augen des Panthers finden deinen Blick."
                        ],
                        awakened: [
                            "Er schlaeft nicht.",
                            "Er ist nur... betaeubt.",
                            "'In der betaeubt ein grosser Wille steht.'"
                        ]
                    },
                    free: {
                        understood: "Die Freiheit liegt in dir. Sie war immer da.",
                        notReady: [
                            "Du ruettelst an den Staeben.",
                            "Nichts bewegt sich.",
                            "Lies das Gedicht. Verstehe."
                        ]
                    },
                    hidden: {
                        stabe: [
                            "'Ihm ist, als ob es tausend Staebe gaebe'",
                            "'und hinter tausend Staeben keine Welt.'",
                            "Die Staebe sind ueberall und nirgends."
                        ],
                        wille: [
                            "'...in der betaeubt ein grosser Wille steht.'",
                            "Der Wille ist noch da.",
                            "Nur betaeubt. Nicht tot."
                        ],
                        herz: [
                            "'...und hoert im Herzen auf zu sein.'",
                            "Das Bild geht durch die angespannte Stille",
                            "der Glieder - und endet im Herzen.",
                            "Aber was bedeutet es, im Herzen aufzuhoeren?"
                        ],
                        jardin: [
                            "Le Jardin des Plantes, Paris.",
                            "Dort sah Rilke den Panther.",
                            "1902. Vor mehr als einem Jahrhundert.",
                            "Das Tier kreist noch immer."
                        ],
                        rilke: [
                            "Rainer Maria Rilke (1875-1926)",
                            "Er lernte von Rodin, wirklich zu sehen.",
                            "Nicht nur zu schauen - zu sehen.",
                            "'Der Panther' war eines seiner 'Dinggedichte' -",
                            "Gedichte, die das Wesen eines Dinges erfassen."
                        ],
                        tanz: [
                            "'...ist wie ein Tanz von Kraft um eine Mitte'",
                            "Selbst in der Gefangenschaft -",
                            "die Kraft bleibt.",
                            "Der Tanz geht weiter."
                        ],
                        pupille: {
                            notReady: [
                                "'Nur manchmal schiebt der Vorhang der Pupille",
                                "sich lautlos auf -.'",
                                "Der Vorhang bleibt geschlossen.",
                                "Noch nicht..."
                            ],
                            ready: [
                                "Die Augen oeffnen sich..."
                            ]
                        },
                        gedicht: [
                            "Ein Dinggedicht.",
                            "Das Ding spricht durch den Dichter.",
                            "Nicht ueber das Ding - durch es.",
                            "Der Panther hat durch Rilke gesprochen.",
                            "Jetzt spricht er durch diese Staebe."
                        ],
                        rodin: [
                            "Auguste Rodin, der Bildhauer.",
                            "Rilke war sein Sekretaer in Paris.",
                            "'Il faut travailler' - Man muss arbeiten.",
                            "'Il faut regarder' - Man muss sehen.",
                            "Rodin lehrte ihn, wirklich zu sehen."
                        ],
                        nacht: [
                            "In der Nacht wird der Kaefig kleiner.",
                            "Oder groesser - wer weiss.",
                            "Die Dunkelheit hinter den Staeben",
                            "ist dieselbe wie die davor."
                        ],
                        secrets: [
                            "Du suchst aufmerksam.",
                            "Das ist gut.",
                            "Der Panther bemerkt es."
                        ]
                    },
                    cinematic: {
                        dots: "...",
                        seeBars: "Du siehst die Staebe.",
                        seePanther: "Du siehst den Panther.",
                        seeYourself: "Du siehst... dich selbst.",
                        pantherPauses: "Der Panther haelt inne.",
                        turnsAround: "Er dreht sich um.",
                        slowly: "Langsam.",
                        eyesMeet: "Seine Augen finden deine.",
                        understand: "Und du verstehst:",
                        barsNotPrison: "Die Staebe waren nie das Gefaengnis.",
                        prisonWasGaze: "Das Gefaengnis war der Blick.",
                        wearyEmptyGaze: "Der muede, leere Blick.",
                        behindBars: "Hinter den Staeben...",
                        alwaysWorld: "war immer eine Welt.",
                        hadToSee: "Du musstest nur sehen.",
                        worldYouSeek: "Die Welt, die du suchst,",
                        neverBehindBars: "war nie hinter den Staeben.",
                        wasInYou: "Sie war in dir.",
                        imageFades: "Das Bild verblasst.",
                        pantherCircles: "Der Panther kreist weiter.",
                        butYouSaw: "Aber du hast gesehen.",
                        questionRemains: "Doch eine Frage bleibt...",
                        readyToAwaken: "Bist du bereit zu erwachen?",
                        typeAwaken: "Tippe <span class='cmd-highlight'>erwachen</span> um fortzufahren.",
                        youAwaken: "Du erwachst..."
                    },
                    erwachen: {
                        direct: "Direkt zur Befreiung..."
                    },
                    deadPanther: "Der Panther liegt still. Die Hoffnung erloschen."
                }
            },

            // === CHAINS LIBERATION ===
            chains: {
                question: "Bist du bereit die Staebe zu sprengen?",
                buttons: {
                    ja: "JA",
                    nein: "NEIN",
                    zurueck: "ZURUECK",
                    ichLausche: "ICH LAUSCHE"
                },
                soundHint: "Fuer die volle Erfahrung: Ton an",
                ritual: {
                    line1: "Um zu hoeren, was die Staebe fluestern,",
                    line2: "musst du lauschen koennen."
                },
                threshold: {
                    line1: "Wer die Staebe sieht,",
                    line2: "hat sie schon halb durchbrochen.",
                    holdInstruction: "Halte gedrueckt, um die Staebe zu sprengen"
                },
                chainWords: [
                    "Die Staebe",
                    "Tausend Staebe",
                    "Keine Welt",
                    "Du sollst...",
                    "Man macht das nicht",
                    "Was denken die Leute?",
                    "Sei vernuenftig",
                    "Unrealistisch",
                    "Fueg dich ein",
                    "Der enge Kreis",
                    "Betaeubt",
                    "Mueder Blick",
                    "Erwartungen",
                    "Pflicht",
                    "Immer",
                    "Niemals",
                    "Angst",
                    "Zweifel",
                    "Nicht gut genug",
                    "Zu spaet",
                    "Zu alt",
                    "Zu jung",
                    "Sicherheit",
                    "Komfortzone",
                    "Normal sein",
                    "Funktionieren",
                    "Anpassen",
                    "Schweigen"
                ],
                cinematic: {
                    phase1: "Im Inneren deines Geistes...",
                    phase2: "Neuronen, gefangen in alten Mustern.",
                    phase3: "Die Synapsen beginnen zu brechen.",
                    phase4: "Alte Gedanken loesen sich auf.",
                    phase5: "Neue Verbindungen entstehen.",
                    phase6: "Der Vorhang der Pupille oeffnet sich.",
                    phase7: "Du siehst klar.",
                    phase8: "Du warst nie gefangen.",
                    phase9: "Frei."
                },
                aftermath: {
                    quote: "\"Wir sitzen in einer Hoehle und halten Schatten fuer die Wirklichkeit.\"",
                    author: "-- Platon"
                }
            },

            // === UI ===
            ui: {
                credit: "designed by Nils Weiser"
            }
        },

        // ============================================================
        // ENGLISH
        // ============================================================
        en: {
            poem: {
                title: "The Panther",
                subtitle: "In the Jardin des Plantes, Paris",
                author: "R.M. Rilke, The Panther, 1902",
                stanza1: [
                    "His vision, from the constantly passing bars,",
                    "has grown so weary that it cannot hold",
                    "anything else. It seems to him there are",
                    "a thousand bars; and behind the bars, no world."
                ],
                stanza2: [
                    "The lithe swinging of that rhythmical easy stride",
                    "which circles down to the smallest hub",
                    "is like a dance of strength around a center",
                    "in which a mighty will stands paralyzed."
                ],
                stanza3: [
                    "Only at times the curtain of the pupils",
                    "silently parts --. Then an image enters,",
                    "goes through the tensed stillness of the limbs --",
                    "and ceases to be, inside the heart."
                ]
            },

            terminal: {
                system: {
                    title: "=== The Panther ===",
                    availableCommands: "Available commands:",
                    hiddenHint: "There are also hidden commands...",
                    statusTitle: "=== Status ===",
                    cleared: "Terminal cleared.",
                    hiddenTitle: "=== Hidden Commands ===",
                    initialized: "System initialized...",
                    typeHelp: "Type 'help' for commands."
                },
                commands: {
                    help: "Show available commands",
                    look: "Look at the panther",
                    poem: "Read the poem",
                    speak: "Speak to the panther",
                    open: "Try to open the cage",
                    wake: "Try to wake the panther",
                    free: "Attempt to free the panther",
                    status: "Check your progress",
                    clear: "Clear the terminal"
                },
                status: {
                    commandsEntered: "Commands entered: ",
                    poemStanzas: "Poem stanzas read: ",
                    hiddenFound: "Hidden commands found: ",
                    pantherState: "Panther's state: ",
                    understood: "You have understood."
                },
                moods: {
                    weary: "weary",
                    curious: "curious",
                    restless: "restless",
                    awakened: "awakened"
                },
                unknown: [
                    "The panther does not understand. Or perhaps you do not.",
                    "Unknown command. Type 'help' for help.",
                    "The bars remain silent.",
                    "Nothing happens."
                ],
                responses: {
                    look: {
                        weary: [
                            "The panther circles in his narrow space.",
                            "His gaze slides past the bars,",
                            "without truly seeing them.",
                            "The movement is mechanical, endless."
                        ],
                        curious: [
                            "The panther pauses.",
                            "For a moment he seems to notice you.",
                            "Then he continues his circling."
                        ],
                        restless: [
                            "Something flickers in his eyes.",
                            "His stride becomes more restless.",
                            "Is he searching for something?"
                        ],
                        awakened: [
                            "The panther stands still.",
                            "His eyes are open, awake.",
                            "For the first time he seems to truly see."
                        ]
                    },
                    poem: {
                        stanza1Intro: "The first stanza reveals itself...",
                        stanza2Intro: "The second stanza...",
                        stanza3Intro: "The final stanza...",
                        fullPoem: "The complete poem:",
                        awakening: "The curtain of the pupils silently parts..."
                    },
                    speak: [
                        "You speak softly into the darkness.",
                        "The panther does not even turn his head.",
                        "Your words fade between the bars.",
                        "Perhaps he hears. Perhaps not.",
                        "Human language means nothing to him."
                    ],
                    open: {
                        first: [
                            "You reach for the bars.",
                            "They are cold, unyielding.",
                            "The panther pays you no attention."
                        ],
                        second: [
                            "The bars will not move.",
                            "But... are they really the bars",
                            "that keep him captive?"
                        ],
                        realized: [
                            "The bars are not the prison.",
                            "The prison is perception.",
                            "The walls stand within."
                        ]
                    },
                    wake: {
                        notAwakened: [
                            "He is already awake.",
                            "More awake than you, perhaps."
                        ],
                        partial: [
                            "Something stirs...",
                            "The panther's eyes find your gaze."
                        ],
                        awakened: [
                            "He does not sleep.",
                            "He is only... paralyzed.",
                            "'In which a mighty will stands paralyzed.'"
                        ]
                    },
                    free: {
                        understood: "Freedom lies within you. It always has.",
                        notReady: [
                            "You rattle the bars.",
                            "Nothing moves.",
                            "Read the poem. Understand."
                        ]
                    },
                    hidden: {
                        stabe: [
                            "'It seems to him there are a thousand bars'",
                            "'and behind the bars, no world.'",
                            "The bars are everywhere and nowhere."
                        ],
                        wille: [
                            "'...in which a mighty will stands paralyzed.'",
                            "The will is still there.",
                            "Only paralyzed. Not dead."
                        ],
                        herz: [
                            "'...and ceases to be, inside the heart.'",
                            "The image passes through the tensed stillness",
                            "of the limbs - and ends in the heart.",
                            "But what does it mean to cease in the heart?"
                        ],
                        jardin: [
                            "Le Jardin des Plantes, Paris.",
                            "There Rilke saw the panther.",
                            "1902. More than a century ago.",
                            "The animal still circles."
                        ],
                        rilke: [
                            "Rainer Maria Rilke (1875-1926)",
                            "He learned from Rodin to truly see.",
                            "Not just to look - to see.",
                            "'The Panther' was one of his 'thing poems' -",
                            "Poems that capture the essence of a thing."
                        ],
                        tanz: [
                            "'...is like a dance of strength around a center'",
                            "Even in captivity -",
                            "the strength remains.",
                            "The dance continues."
                        ],
                        pupille: {
                            notReady: [
                                "'Only at times the curtain of the pupils",
                                "silently parts --.'",
                                "The curtain remains closed.",
                                "Not yet..."
                            ],
                            ready: [
                                "The eyes open..."
                            ]
                        },
                        gedicht: [
                            "A thing poem.",
                            "The thing speaks through the poet.",
                            "Not about the thing - through it.",
                            "The panther has spoken through Rilke.",
                            "Now he speaks through these bars."
                        ],
                        rodin: [
                            "Auguste Rodin, the sculptor.",
                            "Rilke was his secretary in Paris.",
                            "'Il faut travailler' - One must work.",
                            "'Il faut regarder' - One must see.",
                            "Rodin taught him to truly see."
                        ],
                        nacht: [
                            "At night the cage grows smaller.",
                            "Or larger - who knows.",
                            "The darkness behind the bars",
                            "is the same as that in front."
                        ],
                        secrets: [
                            "You search carefully.",
                            "That is good.",
                            "The panther notices."
                        ]
                    },
                    cinematic: {
                        dots: "...",
                        seeBars: "You see the bars.",
                        seePanther: "You see the panther.",
                        seeYourself: "You see... yourself.",
                        pantherPauses: "The panther pauses.",
                        turnsAround: "He turns around.",
                        slowly: "Slowly.",
                        eyesMeet: "His eyes find yours.",
                        understand: "And you understand:",
                        barsNotPrison: "The bars were never the prison.",
                        prisonWasGaze: "The prison was the gaze.",
                        wearyEmptyGaze: "The weary, empty gaze.",
                        behindBars: "Behind the bars...",
                        alwaysWorld: "there was always a world.",
                        hadToSee: "You just had to see.",
                        worldYouSeek: "The world you seek",
                        neverBehindBars: "was never behind the bars.",
                        wasInYou: "It was within you.",
                        imageFades: "The image fades.",
                        pantherCircles: "The panther continues to circle.",
                        butYouSaw: "But you have seen.",
                        questionRemains: "Yet a question remains...",
                        readyToAwaken: "Are you ready to awaken?",
                        typeAwaken: "Type <span class='cmd-highlight'>erwachen</span> to continue.",
                        youAwaken: "You awaken..."
                    },
                    erwachen: {
                        direct: "Straight to liberation..."
                    },
                    deadPanther: "The panther lies still. Hope extinguished."
                }
            },

            chains: {
                question: "Are you ready to break the bars?",
                buttons: {
                    ja: "YES",
                    nein: "NO",
                    zurueck: "BACK",
                    ichLausche: "I LISTEN"
                },
                soundHint: "For the full experience: Sound on",
                ritual: {
                    line1: "To hear what the bars whisper,",
                    line2: "you must be able to listen."
                },
                threshold: {
                    line1: "Who sees the bars",
                    line2: "has already half broken them.",
                    holdInstruction: "Hold to break the bars"
                },
                chainWords: [
                    "The bars",
                    "A thousand bars",
                    "No world",
                    "You should...",
                    "One doesn't do that",
                    "What will people think?",
                    "Be reasonable",
                    "Unrealistic",
                    "Fit in",
                    "The narrow circle",
                    "Paralyzed",
                    "Weary gaze",
                    "Expectations",
                    "Duty",
                    "Always",
                    "Never",
                    "Fear",
                    "Doubt",
                    "Not good enough",
                    "Too late",
                    "Too old",
                    "Too young",
                    "Security",
                    "Comfort zone",
                    "Be normal",
                    "Function",
                    "Conform",
                    "Silence"
                ],
                cinematic: {
                    phase1: "Inside your mind...",
                    phase2: "Neurons, trapped in old patterns.",
                    phase3: "The synapses begin to break.",
                    phase4: "Old thoughts dissolve.",
                    phase5: "New connections form.",
                    phase6: "The curtain of the pupils opens.",
                    phase7: "You see clearly.",
                    phase8: "You were never trapped.",
                    phase9: "Free."
                },
                aftermath: {
                    quote: "\"We sit in a cave and mistake shadows for reality.\"",
                    author: "-- Plato"
                }
            },

            ui: {
                credit: "designed by Nils Weiser"
            }
        },

        // ============================================================
        // SPANISH
        // ============================================================
        es: {
            poem: {
                title: "La Pantera",
                subtitle: "En el Jardin des Plantes, Paris",
                author: "R.M. Rilke, La Pantera, 1902",
                stanza1: [
                    "De tanto pasar frente a los barrotes",
                    "su mirada se ha cansado tanto que ya nada retiene.",
                    "Le parece que hubiera mil barrotes",
                    "y detras de mil barrotes ningun mundo."
                ],
                stanza2: [
                    "El suave andar de pasos flexibles y fuertes,",
                    "que gira en el circulo mas estrecho,",
                    "es como una danza de fuerza en torno a un centro",
                    "en el que una gran voluntad esta adormecida."
                ],
                stanza3: [
                    "Solo a veces el telon de las pupilas",
                    "se abre en silencio --. Entonces entra una imagen,",
                    "atraviesa la tensa quietud de los miembros --",
                    "y deja de existir en el corazon."
                ]
            },

            terminal: {
                system: {
                    title: "=== La Pantera ===",
                    availableCommands: "Comandos disponibles:",
                    hiddenHint: "Tambien hay comandos ocultos...",
                    statusTitle: "=== Estado ===",
                    cleared: "Terminal limpiada.",
                    hiddenTitle: "=== Comandos Ocultos ===",
                    initialized: "Sistema inicializado...",
                    typeHelp: "Escribe 'help' para los comandos."
                },
                commands: {
                    help: "Mostrar comandos disponibles",
                    look: "Mirar a la pantera",
                    poem: "Leer el poema",
                    speak: "Hablar a la pantera",
                    open: "Intentar abrir la jaula",
                    wake: "Intentar despertar a la pantera",
                    free: "Intentar liberar a la pantera",
                    status: "Ver tu progreso",
                    clear: "Limpiar el terminal"
                },
                status: {
                    commandsEntered: "Comandos introducidos: ",
                    poemStanzas: "Estrofas leidas: ",
                    hiddenFound: "Comandos ocultos encontrados: ",
                    pantherState: "Estado de la pantera: ",
                    understood: "Has comprendido."
                },
                moods: {
                    weary: "cansada",
                    curious: "curiosa",
                    restless: "inquieta",
                    awakened: "despierta"
                },
                unknown: [
                    "La pantera no entiende. O quizas tu no entiendes.",
                    "Comando desconocido. Escribe 'help' para ayuda.",
                    "Los barrotes permanecen en silencio.",
                    "Nada sucede."
                ],
                responses: {
                    look: {
                        weary: [
                            "La pantera gira en su estrecho espacio.",
                            "Su mirada se desliza junto a los barrotes,",
                            "sin verlos realmente.",
                            "El movimiento es mecanico, interminable."
                        ],
                        curious: [
                            "La pantera se detiene.",
                            "Por un momento parece notarte.",
                            "Luego continua su girar."
                        ],
                        restless: [
                            "Algo parpadea en sus ojos.",
                            "Su paso se vuelve mas inquieto.",
                            "Busca algo?"
                        ],
                        awakened: [
                            "La pantera esta quieta.",
                            "Sus ojos estan abiertos, despiertos.",
                            "Por primera vez parece ver de verdad."
                        ]
                    },
                    poem: {
                        stanza1Intro: "La primera estrofa se revela...",
                        stanza2Intro: "La segunda estrofa...",
                        stanza3Intro: "La estrofa final...",
                        fullPoem: "El poema completo:",
                        awakening: "El telon de las pupilas se abre en silencio..."
                    },
                    speak: [
                        "Hablas suavemente en la oscuridad.",
                        "La pantera ni siquiera gira la cabeza.",
                        "Tus palabras se desvanecen entre los barrotes.",
                        "Quizas escucha. Quizas no.",
                        "El lenguaje humano no significa nada para ella."
                    ],
                    open: {
                        first: [
                            "Alcanzas los barrotes.",
                            "Estan frios, inflexibles.",
                            "La pantera no te presta atencion."
                        ],
                        second: [
                            "Los barrotes no se mueven.",
                            "Pero... son realmente los barrotes",
                            "los que la mantienen cautiva?"
                        ],
                        realized: [
                            "Los barrotes no son la prision.",
                            "La prision es la percepcion.",
                            "Los muros estan dentro."
                        ]
                    },
                    wake: {
                        notAwakened: [
                            "Ya esta despierta.",
                            "Mas despierta que tu, quizas."
                        ],
                        partial: [
                            "Algo se mueve...",
                            "Los ojos de la pantera encuentran tu mirada."
                        ],
                        awakened: [
                            "No duerme.",
                            "Solo esta... adormecida.",
                            "'En el que una gran voluntad esta adormecida.'"
                        ]
                    },
                    free: {
                        understood: "La libertad esta dentro de ti. Siempre estuvo.",
                        notReady: [
                            "Sacudes los barrotes.",
                            "Nada se mueve.",
                            "Lee el poema. Comprende."
                        ]
                    },
                    hidden: {
                        stabe: [
                            "'Le parece que hubiera mil barrotes'",
                            "'y detras de mil barrotes ningun mundo.'",
                            "Los barrotes estan en todas partes y en ninguna."
                        ],
                        wille: [
                            "'...una gran voluntad esta adormecida.'",
                            "La voluntad sigue ahi.",
                            "Solo adormecida. No muerta."
                        ],
                        herz: [
                            "'...y deja de existir en el corazon.'",
                            "La imagen atraviesa la tensa quietud",
                            "de los miembros - y termina en el corazon.",
                            "Pero que significa dejar de existir en el corazon?"
                        ],
                        jardin: [
                            "Le Jardin des Plantes, Paris.",
                            "Alli vio Rilke a la pantera.",
                            "1902. Hace mas de un siglo.",
                            "El animal sigue girando."
                        ],
                        rilke: [
                            "Rainer Maria Rilke (1875-1926)",
                            "Aprendio de Rodin a ver de verdad.",
                            "No solo mirar - ver.",
                            "'La Pantera' fue uno de sus 'poemas-cosa' -",
                            "Poemas que capturan la esencia de algo."
                        ],
                        tanz: [
                            "'...es como una danza de fuerza en torno a un centro'",
                            "Incluso en cautiverio -",
                            "la fuerza permanece.",
                            "La danza continua."
                        ],
                        pupille: {
                            notReady: [
                                "'Solo a veces el telon de las pupilas",
                                "se abre en silencio --.'",
                                "El telon permanece cerrado.",
                                "Todavia no..."
                            ],
                            ready: [
                                "Los ojos se abren..."
                            ]
                        },
                        gedicht: [
                            "Un poema-cosa.",
                            "La cosa habla a traves del poeta.",
                            "No sobre la cosa - a traves de ella.",
                            "La pantera ha hablado a traves de Rilke.",
                            "Ahora habla a traves de estos barrotes."
                        ],
                        rodin: [
                            "Auguste Rodin, el escultor.",
                            "Rilke fue su secretario en Paris.",
                            "'Il faut travailler' - Hay que trabajar.",
                            "'Il faut regarder' - Hay que ver.",
                            "Rodin le enseno a ver de verdad."
                        ],
                        nacht: [
                            "De noche la jaula se hace mas pequena.",
                            "O mas grande - quien sabe.",
                            "La oscuridad detras de los barrotes",
                            "es la misma que la de delante."
                        ],
                        secrets: [
                            "Buscas con atencion.",
                            "Eso esta bien.",
                            "La pantera lo nota."
                        ]
                    },
                    cinematic: {
                        dots: "...",
                        seeBars: "Ves los barrotes.",
                        seePanther: "Ves la pantera.",
                        seeYourself: "Te ves... a ti mismo.",
                        pantherPauses: "La pantera se detiene.",
                        turnsAround: "Se da la vuelta.",
                        slowly: "Lentamente.",
                        eyesMeet: "Sus ojos encuentran los tuyos.",
                        understand: "Y comprendes:",
                        barsNotPrison: "Los barrotes nunca fueron la prision.",
                        prisonWasGaze: "La prision era la mirada.",
                        wearyEmptyGaze: "La mirada cansada y vacia.",
                        behindBars: "Detras de los barrotes...",
                        alwaysWorld: "siempre hubo un mundo.",
                        hadToSee: "Solo tenias que ver.",
                        worldYouSeek: "El mundo que buscas",
                        neverBehindBars: "nunca estuvo detras de los barrotes.",
                        wasInYou: "Estaba dentro de ti.",
                        imageFades: "La imagen se desvanece.",
                        pantherCircles: "La pantera sigue girando.",
                        butYouSaw: "Pero tu has visto.",
                        questionRemains: "Pero queda una pregunta...",
                        readyToAwaken: "Estas listo para despertar?",
                        typeAwaken: "Escribe <span class='cmd-highlight'>erwachen</span> para continuar.",
                        youAwaken: "Despiertas..."
                    },
                    erwachen: {
                        direct: "Directo a la liberacion..."
                    },
                    deadPanther: "La pantera yace inmovil. La esperanza extinguida."
                }
            },

            chains: {
                question: "Estas listo para romper los barrotes?",
                buttons: {
                    ja: "SI",
                    nein: "NO",
                    zurueck: "VOLVER",
                    ichLausche: "ESCUCHO"
                },
                soundHint: "Para la experiencia completa: Sonido activado",
                ritual: {
                    line1: "Para escuchar lo que susurran los barrotes,",
                    line2: "debes poder escuchar."
                },
                threshold: {
                    line1: "Quien ve los barrotes",
                    line2: "ya los ha roto a medias.",
                    holdInstruction: "Manten presionado para romper los barrotes"
                },
                chainWords: [
                    "Los barrotes",
                    "Mil barrotes",
                    "Ningun mundo",
                    "Debes...",
                    "Eso no se hace",
                    "Que pensara la gente?",
                    "Se razonable",
                    "Irrealista",
                    "Adaptate",
                    "El circulo estrecho",
                    "Adormecida",
                    "Mirada cansada",
                    "Expectativas",
                    "Deber",
                    "Siempre",
                    "Nunca",
                    "Miedo",
                    "Duda",
                    "No soy suficiente",
                    "Demasiado tarde",
                    "Demasiado viejo",
                    "Demasiado joven",
                    "Seguridad",
                    "Zona de confort",
                    "Ser normal",
                    "Funcionar",
                    "Conformarse",
                    "Silencio"
                ],
                cinematic: {
                    phase1: "Dentro de tu mente...",
                    phase2: "Neuronas, atrapadas en viejos patrones.",
                    phase3: "Las sinapsis comienzan a romperse.",
                    phase4: "Los viejos pensamientos se disuelven.",
                    phase5: "Nuevas conexiones se forman.",
                    phase6: "El telon de las pupilas se abre.",
                    phase7: "Ves con claridad.",
                    phase8: "Nunca estuviste atrapado.",
                    phase9: "Libre."
                },
                aftermath: {
                    quote: "\"Estamos sentados en una caverna y confundimos sombras con la realidad.\"",
                    author: "-- Platon"
                }
            },

            ui: {
                credit: "designed by Nils Weiser"
            }
        },

        // ============================================================
        // FRENCH
        // ============================================================
        fr: {
            poem: {
                title: "La Panthere",
                subtitle: "Au Jardin des Plantes, Paris",
                author: "R.M. Rilke, La Panthere, 1902",
                stanza1: [
                    "Son regard est, du passage des barreaux,",
                    "si fatigue qu'il ne retient plus rien.",
                    "Il lui semble qu'il y a mille barreaux",
                    "et derriere mille barreaux pas de monde."
                ],
                stanza2: [
                    "La demarche souple des pas puissants et souples,",
                    "qui tourne dans le plus petit des cercles,",
                    "est comme une danse de force autour d'un centre",
                    "ou une grande volonte reste engourdie."
                ],
                stanza3: [
                    "Parfois seulement le rideau des pupilles",
                    "se leve en silence --. Alors une image entre,",
                    "traverse le silence tendu des membres --",
                    "et cesse d'etre dans le coeur."
                ]
            },

            terminal: {
                system: {
                    title: "=== La Panthere ===",
                    availableCommands: "Commandes disponibles:",
                    hiddenHint: "Il y a aussi des commandes cachees...",
                    statusTitle: "=== Statut ===",
                    cleared: "Terminal efface.",
                    hiddenTitle: "=== Commandes Cachees ===",
                    initialized: "Systeme initialise...",
                    typeHelp: "Tapez 'help' pour les commandes."
                },
                commands: {
                    help: "Afficher les commandes disponibles",
                    look: "Regarder la panthere",
                    poem: "Lire le poeme",
                    speak: "Parler a la panthere",
                    open: "Essayer d'ouvrir la cage",
                    wake: "Essayer de reveiller la panthere",
                    free: "Tenter de liberer la panthere",
                    status: "Verifier votre progression",
                    clear: "Effacer le terminal"
                },
                status: {
                    commandsEntered: "Commandes entrees: ",
                    poemStanzas: "Strophes lues: ",
                    hiddenFound: "Commandes cachees trouvees: ",
                    pantherState: "Etat de la panthere: ",
                    understood: "Vous avez compris."
                },
                moods: {
                    weary: "lasse",
                    curious: "curieuse",
                    restless: "agitee",
                    awakened: "eveillee"
                },
                unknown: [
                    "La panthere ne comprend pas. Ou peut-etre vous ne comprenez pas.",
                    "Commande inconnue. Tapez 'help' pour l'aide.",
                    "Les barreaux restent silencieux.",
                    "Rien ne se passe."
                ],
                responses: {
                    look: {
                        weary: [
                            "La panthere tourne dans son espace etroit.",
                            "Son regard glisse le long des barreaux,",
                            "sans vraiment les voir.",
                            "Le mouvement est mecanique, sans fin."
                        ],
                        curious: [
                            "La panthere s'arrete.",
                            "Un instant elle semble vous remarquer.",
                            "Puis elle reprend son tour."
                        ],
                        restless: [
                            "Quelque chose scintille dans ses yeux.",
                            "Sa demarche devient plus agitee.",
                            "Cherche-t-elle quelque chose?"
                        ],
                        awakened: [
                            "La panthere reste immobile.",
                            "Ses yeux sont ouverts, eveilles.",
                            "Pour la premiere fois elle semble vraiment voir."
                        ]
                    },
                    poem: {
                        stanza1Intro: "La premiere strophe se revele...",
                        stanza2Intro: "La deuxieme strophe...",
                        stanza3Intro: "La derniere strophe...",
                        fullPoem: "Le poeme complet:",
                        awakening: "Le rideau des pupilles se leve en silence..."
                    },
                    speak: [
                        "Vous parlez doucement dans l'obscurite.",
                        "La panthere ne tourne meme pas la tete.",
                        "Vos mots s'evanouissent entre les barreaux.",
                        "Peut-etre entend-elle. Peut-etre pas.",
                        "Le langage humain ne signifie rien pour elle."
                    ],
                    open: {
                        first: [
                            "Vous saisissez les barreaux.",
                            "Ils sont froids, inflexibles.",
                            "La panthere ne vous prete aucune attention."
                        ],
                        second: [
                            "Les barreaux ne bougent pas.",
                            "Mais... sont-ce vraiment les barreaux",
                            "qui la retiennent captive?"
                        ],
                        realized: [
                            "Les barreaux ne sont pas la prison.",
                            "La prison est la perception.",
                            "Les murs sont a l'interieur."
                        ]
                    },
                    wake: {
                        notAwakened: [
                            "Elle est deja eveillee.",
                            "Plus eveillee que vous, peut-etre."
                        ],
                        partial: [
                            "Quelque chose remue...",
                            "Les yeux de la panthere trouvent votre regard."
                        ],
                        awakened: [
                            "Elle ne dort pas.",
                            "Elle est seulement... engourdie.",
                            "'Ou une grande volonte reste engourdie.'"
                        ]
                    },
                    free: {
                        understood: "La liberte est en vous. Elle l'a toujours ete.",
                        notReady: [
                            "Vous secouez les barreaux.",
                            "Rien ne bouge.",
                            "Lisez le poeme. Comprenez."
                        ]
                    },
                    hidden: {
                        stabe: [
                            "'Il lui semble qu'il y a mille barreaux'",
                            "'et derriere mille barreaux pas de monde.'",
                            "Les barreaux sont partout et nulle part."
                        ],
                        wille: [
                            "'...une grande volonte reste engourdie.'",
                            "La volonte est toujours la.",
                            "Seulement engourdie. Pas morte."
                        ],
                        herz: [
                            "'...et cesse d'etre dans le coeur.'",
                            "L'image traverse le silence tendu",
                            "des membres - et finit dans le coeur.",
                            "Mais que signifie cesser d'etre dans le coeur?"
                        ],
                        jardin: [
                            "Le Jardin des Plantes, Paris.",
                            "La Rilke vit la panthere.",
                            "1902. Il y a plus d'un siecle.",
                            "L'animal tourne encore."
                        ],
                        rilke: [
                            "Rainer Maria Rilke (1875-1926)",
                            "Il apprit de Rodin a vraiment voir.",
                            "Pas seulement regarder - voir.",
                            "'La Panthere' fut l'un de ses 'poemes-choses' -",
                            "Poemes qui capturent l'essence d'une chose."
                        ],
                        tanz: [
                            "'...est comme une danse de force autour d'un centre'",
                            "Meme en captivite -",
                            "la force demeure.",
                            "La danse continue."
                        ],
                        pupille: {
                            notReady: [
                                "'Parfois seulement le rideau des pupilles",
                                "se leve en silence --.'",
                                "Le rideau reste ferme.",
                                "Pas encore..."
                            ],
                            ready: [
                                "Les yeux s'ouvrent..."
                            ]
                        },
                        gedicht: [
                            "Un poeme-chose.",
                            "La chose parle a travers le poete.",
                            "Pas sur la chose - a travers elle.",
                            "La panthere a parle a travers Rilke.",
                            "Maintenant elle parle a travers ces barreaux."
                        ],
                        rodin: [
                            "Auguste Rodin, le sculpteur.",
                            "Rilke fut son secretaire a Paris.",
                            "'Il faut travailler' - Il faut travailler.",
                            "'Il faut regarder' - Il faut voir.",
                            "Rodin lui apprit a vraiment voir."
                        ],
                        nacht: [
                            "La nuit la cage retrecit.",
                            "Ou s'agrandit - qui sait.",
                            "L'obscurite derriere les barreaux",
                            "est la meme que devant."
                        ],
                        secrets: [
                            "Vous cherchez attentivement.",
                            "C'est bien.",
                            "La panthere le remarque."
                        ]
                    },
                    cinematic: {
                        dots: "...",
                        seeBars: "Vous voyez les barreaux.",
                        seePanther: "Vous voyez la panthere.",
                        seeYourself: "Vous voyez... vous-meme.",
                        pantherPauses: "La panthere s'arrete.",
                        turnsAround: "Elle se retourne.",
                        slowly: "Lentement.",
                        eyesMeet: "Ses yeux trouvent les votres.",
                        understand: "Et vous comprenez:",
                        barsNotPrison: "Les barreaux n'etaient jamais la prison.",
                        prisonWasGaze: "La prison etait le regard.",
                        wearyEmptyGaze: "Le regard las et vide.",
                        behindBars: "Derriere les barreaux...",
                        alwaysWorld: "il y avait toujours un monde.",
                        hadToSee: "Il suffisait de voir.",
                        worldYouSeek: "Le monde que vous cherchez",
                        neverBehindBars: "n'etait jamais derriere les barreaux.",
                        wasInYou: "Il etait en vous.",
                        imageFades: "L'image s'estompe.",
                        pantherCircles: "La panthere continue de tourner.",
                        butYouSaw: "Mais vous avez vu.",
                        questionRemains: "Mais une question demeure...",
                        readyToAwaken: "Etes-vous pret a vous eveiller?",
                        typeAwaken: "Tapez <span class='cmd-highlight'>erwachen</span> pour continuer.",
                        youAwaken: "Vous vous eveillez..."
                    },
                    erwachen: {
                        direct: "Directement a la liberation..."
                    },
                    deadPanther: "La panthere gît immobile. L'espoir eteint."
                }
            },

            chains: {
                question: "Etes-vous pret a briser les barreaux?",
                buttons: {
                    ja: "OUI",
                    nein: "NON",
                    zurueck: "RETOUR",
                    ichLausche: "J'ECOUTE"
                },
                soundHint: "Pour l'experience complete: Son active",
                ritual: {
                    line1: "Pour entendre ce que murmurent les barreaux,",
                    line2: "vous devez pouvoir ecouter."
                },
                threshold: {
                    line1: "Qui voit les barreaux",
                    line2: "les a deja a moitie brises.",
                    holdInstruction: "Maintenez appuye pour briser les barreaux"
                },
                chainWords: [
                    "Les barreaux",
                    "Mille barreaux",
                    "Pas de monde",
                    "Tu dois...",
                    "Ca ne se fait pas",
                    "Que penseront les gens?",
                    "Sois raisonnable",
                    "Irrealiste",
                    "Conforme-toi",
                    "Le cercle etroit",
                    "Engourdie",
                    "Regard las",
                    "Attentes",
                    "Devoir",
                    "Toujours",
                    "Jamais",
                    "Peur",
                    "Doute",
                    "Pas assez bien",
                    "Trop tard",
                    "Trop vieux",
                    "Trop jeune",
                    "Securite",
                    "Zone de confort",
                    "Etre normal",
                    "Fonctionner",
                    "Se conformer",
                    "Silence"
                ],
                cinematic: {
                    phase1: "A l'interieur de votre esprit...",
                    phase2: "Neurones, pieges dans d'anciens schemas.",
                    phase3: "Les synapses commencent a se briser.",
                    phase4: "Les vieilles pensees se dissolvent.",
                    phase5: "De nouvelles connexions se forment.",
                    phase6: "Le rideau des pupilles s'ouvre.",
                    phase7: "Vous voyez clairement.",
                    phase8: "Vous n'avez jamais ete piege.",
                    phase9: "Libre."
                },
                aftermath: {
                    quote: "\"Nous sommes assis dans une caverne et prenons les ombres pour la realite.\"",
                    author: "-- Platon"
                }
            },

            ui: {
                credit: "designed by Nils Weiser"
            }
        },

        // ============================================================
        // ITALIAN
        // ============================================================
        it: {
            poem: {
                title: "La Pantera",
                subtitle: "Nel Jardin des Plantes, Parigi",
                author: "R.M. Rilke, La Pantera, 1902",
                stanza1: [
                    "Il suo sguardo, dal passare delle sbarre,",
                    "si e cosi stancato che non trattiene piu nulla.",
                    "Gli sembra che ci siano mille sbarre",
                    "e dietro mille sbarre nessun mondo."
                ],
                stanza2: [
                    "Il morbido passo di passi flessibili e forti,",
                    "che gira nel piu piccolo dei cerchi,",
                    "e come una danza di forza attorno a un centro",
                    "in cui una grande volonta sta intorpidita."
                ],
                stanza3: [
                    "Solo a volte il sipario delle pupille",
                    "si alza in silenzio --. Allora un'immagine entra,",
                    "attraversa la quiete tesa delle membra --",
                    "e cessa di esistere nel cuore."
                ]
            },

            terminal: {
                system: {
                    title: "=== La Pantera ===",
                    availableCommands: "Comandi disponibili:",
                    hiddenHint: "Ci sono anche comandi nascosti...",
                    statusTitle: "=== Stato ===",
                    cleared: "Terminale pulito.",
                    hiddenTitle: "=== Comandi Nascosti ===",
                    initialized: "Sistema inizializzato...",
                    typeHelp: "Digita 'help' per i comandi."
                },
                commands: {
                    help: "Mostra i comandi disponibili",
                    look: "Guarda la pantera",
                    poem: "Leggi la poesia",
                    speak: "Parla alla pantera",
                    open: "Prova ad aprire la gabbia",
                    wake: "Prova a svegliare la pantera",
                    free: "Tenta di liberare la pantera",
                    status: "Controlla i tuoi progressi",
                    clear: "Pulisci il terminale"
                },
                status: {
                    commandsEntered: "Comandi inseriti: ",
                    poemStanzas: "Strofe lette: ",
                    hiddenFound: "Comandi nascosti trovati: ",
                    pantherState: "Stato della pantera: ",
                    understood: "Hai capito."
                },
                moods: {
                    weary: "stanca",
                    curious: "curiosa",
                    restless: "inquieta",
                    awakened: "sveglia"
                },
                unknown: [
                    "La pantera non capisce. O forse non capisci tu.",
                    "Comando sconosciuto. Digita 'help' per aiuto.",
                    "Le sbarre rimangono silenziose.",
                    "Non succede nulla."
                ],
                responses: {
                    look: {
                        weary: [
                            "La pantera gira nel suo spazio stretto.",
                            "Il suo sguardo scivola lungo le sbarre,",
                            "senza vederle veramente.",
                            "Il movimento e meccanico, infinito."
                        ],
                        curious: [
                            "La pantera si ferma.",
                            "Per un momento sembra notarti.",
                            "Poi riprende a girare."
                        ],
                        restless: [
                            "Qualcosa brilla nei suoi occhi.",
                            "Il suo passo diventa piu inquieto.",
                            "Sta cercando qualcosa?"
                        ],
                        awakened: [
                            "La pantera sta ferma.",
                            "I suoi occhi sono aperti, svegli.",
                            "Per la prima volta sembra vedere davvero."
                        ]
                    },
                    poem: {
                        stanza1Intro: "La prima strofa si rivela...",
                        stanza2Intro: "La seconda strofa...",
                        stanza3Intro: "L'ultima strofa...",
                        fullPoem: "La poesia completa:",
                        awakening: "Il sipario delle pupille si alza in silenzio..."
                    },
                    speak: [
                        "Parli piano nell'oscurita.",
                        "La pantera non gira nemmeno la testa.",
                        "Le tue parole svaniscono tra le sbarre.",
                        "Forse ascolta. Forse no.",
                        "Il linguaggio umano non significa nulla per lei."
                    ],
                    open: {
                        first: [
                            "Afferri le sbarre.",
                            "Sono fredde, inflessibili.",
                            "La pantera non ti presta attenzione."
                        ],
                        second: [
                            "Le sbarre non si muovono.",
                            "Ma... sono davvero le sbarre",
                            "che la tengono prigioniera?"
                        ],
                        realized: [
                            "Le sbarre non sono la prigione.",
                            "La prigione e la percezione.",
                            "I muri sono dentro."
                        ]
                    },
                    wake: {
                        notAwakened: [
                            "E gia sveglia.",
                            "Piu sveglia di te, forse."
                        ],
                        partial: [
                            "Qualcosa si muove...",
                            "Gli occhi della pantera trovano il tuo sguardo."
                        ],
                        awakened: [
                            "Non dorme.",
                            "E solo... intorpidita.",
                            "'In cui una grande volonta sta intorpidita.'"
                        ]
                    },
                    free: {
                        understood: "La liberta e dentro di te. Lo e sempre stata.",
                        notReady: [
                            "Scuoti le sbarre.",
                            "Nulla si muove.",
                            "Leggi la poesia. Capisci."
                        ]
                    },
                    hidden: {
                        stabe: [
                            "'Gli sembra che ci siano mille sbarre'",
                            "'e dietro mille sbarre nessun mondo.'",
                            "Le sbarre sono ovunque e da nessuna parte."
                        ],
                        wille: [
                            "'...una grande volonta sta intorpidita.'",
                            "La volonta e ancora la.",
                            "Solo intorpidita. Non morta."
                        ],
                        herz: [
                            "'...e cessa di esistere nel cuore.'",
                            "L'immagine attraversa la quiete tesa",
                            "delle membra - e finisce nel cuore.",
                            "Ma cosa significa cessare di esistere nel cuore?"
                        ],
                        jardin: [
                            "Le Jardin des Plantes, Parigi.",
                            "La Rilke vide la pantera.",
                            "1902. Piu di un secolo fa.",
                            "L'animale gira ancora."
                        ],
                        rilke: [
                            "Rainer Maria Rilke (1875-1926)",
                            "Imparo da Rodin a vedere davvero.",
                            "Non solo guardare - vedere.",
                            "'La Pantera' fu una delle sue 'poesie-cosa' -",
                            "Poesie che catturano l'essenza di una cosa."
                        ],
                        tanz: [
                            "'...e come una danza di forza attorno a un centro'",
                            "Anche in cattivita -",
                            "la forza rimane.",
                            "La danza continua."
                        ],
                        pupille: {
                            notReady: [
                                "'Solo a volte il sipario delle pupille",
                                "si alza in silenzio --.'",
                                "Il sipario rimane chiuso.",
                                "Non ancora..."
                            ],
                            ready: [
                                "Gli occhi si aprono..."
                            ]
                        },
                        gedicht: [
                            "Una poesia-cosa.",
                            "La cosa parla attraverso il poeta.",
                            "Non della cosa - attraverso di essa.",
                            "La pantera ha parlato attraverso Rilke.",
                            "Ora parla attraverso queste sbarre."
                        ],
                        rodin: [
                            "Auguste Rodin, lo scultore.",
                            "Rilke fu il suo segretario a Parigi.",
                            "'Il faut travailler' - Bisogna lavorare.",
                            "'Il faut regarder' - Bisogna vedere.",
                            "Rodin gli insegno a vedere davvero."
                        ],
                        nacht: [
                            "Di notte la gabbia si restringe.",
                            "O si allarga - chi lo sa.",
                            "L'oscurita dietro le sbarre",
                            "e la stessa di quella davanti."
                        ],
                        secrets: [
                            "Cerchi attentamente.",
                            "Questo e bene.",
                            "La pantera lo nota."
                        ]
                    },
                    cinematic: {
                        dots: "...",
                        seeBars: "Vedi le sbarre.",
                        seePanther: "Vedi la pantera.",
                        seeYourself: "Vedi... te stesso.",
                        pantherPauses: "La pantera si ferma.",
                        turnsAround: "Si gira.",
                        slowly: "Lentamente.",
                        eyesMeet: "I suoi occhi trovano i tuoi.",
                        understand: "E capisci:",
                        barsNotPrison: "Le sbarre non erano mai la prigione.",
                        prisonWasGaze: "La prigione era lo sguardo.",
                        wearyEmptyGaze: "Lo sguardo stanco e vuoto.",
                        behindBars: "Dietro le sbarre...",
                        alwaysWorld: "c'era sempre un mondo.",
                        hadToSee: "Dovevi solo vedere.",
                        worldYouSeek: "Il mondo che cerchi",
                        neverBehindBars: "non era mai dietro le sbarre.",
                        wasInYou: "Era dentro di te.",
                        imageFades: "L'immagine svanisce.",
                        pantherCircles: "La pantera continua a girare.",
                        butYouSaw: "Ma tu hai visto.",
                        questionRemains: "Ma resta una domanda...",
                        readyToAwaken: "Sei pronto a risvegliarti?",
                        typeAwaken: "Digita <span class='cmd-highlight'>erwachen</span> per continuare.",
                        youAwaken: "Ti risvegli..."
                    },
                    erwachen: {
                        direct: "Diretto alla liberazione..."
                    },
                    deadPanther: "La pantera giace immobile. La speranza estinta."
                }
            },

            chains: {
                question: "Sei pronto a spezzare le sbarre?",
                buttons: {
                    ja: "SI",
                    nein: "NO",
                    zurueck: "INDIETRO",
                    ichLausche: "ASCOLTO"
                },
                soundHint: "Per l'esperienza completa: Audio attivo",
                ritual: {
                    line1: "Per sentire cio che sussurrano le sbarre,",
                    line2: "devi essere capace di ascoltare."
                },
                threshold: {
                    line1: "Chi vede le sbarre",
                    line2: "le ha gia spezzate a meta.",
                    holdInstruction: "Tieni premuto per spezzare le sbarre"
                },
                chainWords: [
                    "Le sbarre",
                    "Mille sbarre",
                    "Nessun mondo",
                    "Devi...",
                    "Non si fa",
                    "Cosa pensera la gente?",
                    "Sii ragionevole",
                    "Irrealistico",
                    "Adattati",
                    "Il cerchio stretto",
                    "Intorpidita",
                    "Sguardo stanco",
                    "Aspettative",
                    "Dovere",
                    "Sempre",
                    "Mai",
                    "Paura",
                    "Dubbio",
                    "Non abbastanza bravo",
                    "Troppo tardi",
                    "Troppo vecchio",
                    "Troppo giovane",
                    "Sicurezza",
                    "Zona di comfort",
                    "Essere normale",
                    "Funzionare",
                    "Conformarsi",
                    "Silenzio"
                ],
                cinematic: {
                    phase1: "Dentro la tua mente...",
                    phase2: "Neuroni, intrappolati in vecchi schemi.",
                    phase3: "Le sinapsi iniziano a rompersi.",
                    phase4: "I vecchi pensieri si dissolvono.",
                    phase5: "Nuove connessioni si formano.",
                    phase6: "Il sipario delle pupille si apre.",
                    phase7: "Vedi chiaramente.",
                    phase8: "Non sei mai stato intrappolato.",
                    phase9: "Libero."
                },
                aftermath: {
                    quote: "\"Siamo seduti in una caverna e scambiamo le ombre per la realta.\"",
                    author: "-- Platone"
                }
            },

            ui: {
                credit: "designed by Nils Weiser"
            }
        },

        // ============================================================
        // PORTUGUESE
        // ============================================================
        pt: {
            poem: {
                title: "A Pantera",
                subtitle: "No Jardin des Plantes, Paris",
                author: "R.M. Rilke, A Pantera, 1902",
                stanza1: [
                    "Seu olhar, de tanto passar pelas grades,",
                    "ficou tao cansado que nada mais retem.",
                    "Parece-lhe que ha mil grades",
                    "e atras de mil grades nenhum mundo."
                ],
                stanza2: [
                    "O andar suave de passos flexiveis e fortes,",
                    "que gira no menor dos circulos,",
                    "e como uma danca de forca ao redor de um centro",
                    "onde uma grande vontade permanece entorpecida."
                ],
                stanza3: [
                    "So as vezes a cortina das pupilas",
                    "se abre em silencio --. Entao uma imagem entra,",
                    "atravessa a quietude tensa dos membros --",
                    "e deixa de existir no coracao."
                ]
            },

            terminal: {
                system: {
                    title: "=== A Pantera ===",
                    availableCommands: "Comandos disponiveis:",
                    hiddenHint: "Tambem ha comandos ocultos...",
                    statusTitle: "=== Status ===",
                    cleared: "Terminal limpo.",
                    hiddenTitle: "=== Comandos Ocultos ===",
                    initialized: "Sistema inicializado...",
                    typeHelp: "Digite 'help' para comandos."
                },
                commands: {
                    help: "Mostrar comandos disponiveis",
                    look: "Olhar para a pantera",
                    poem: "Ler o poema",
                    speak: "Falar com a pantera",
                    open: "Tentar abrir a jaula",
                    wake: "Tentar acordar a pantera",
                    free: "Tentar libertar a pantera",
                    status: "Verificar seu progresso",
                    clear: "Limpar o terminal"
                },
                status: {
                    commandsEntered: "Comandos inseridos: ",
                    poemStanzas: "Estrofes lidas: ",
                    hiddenFound: "Comandos ocultos encontrados: ",
                    pantherState: "Estado da pantera: ",
                    understood: "Voce entendeu."
                },
                moods: {
                    weary: "cansada",
                    curious: "curiosa",
                    restless: "inquieta",
                    awakened: "desperta"
                },
                unknown: [
                    "A pantera nao entende. Ou talvez voce nao entenda.",
                    "Comando desconhecido. Digite 'help' para ajuda.",
                    "As grades permanecem em silencio.",
                    "Nada acontece."
                ],
                responses: {
                    look: {
                        weary: [
                            "A pantera gira em seu espaco estreito.",
                            "Seu olhar desliza pelas grades,",
                            "sem realmente ve-las.",
                            "O movimento e mecanico, infinito."
                        ],
                        curious: [
                            "A pantera para.",
                            "Por um momento ela parece nota-lo.",
                            "Entao continua a girar."
                        ],
                        restless: [
                            "Algo brilha em seus olhos.",
                            "Seu passo fica mais inquieto.",
                            "Ela esta procurando algo?"
                        ],
                        awakened: [
                            "A pantera fica parada.",
                            "Seus olhos estao abertos, despertos.",
                            "Pela primeira vez ela parece ver de verdade."
                        ]
                    },
                    poem: {
                        stanza1Intro: "A primeira estrofe se revela...",
                        stanza2Intro: "A segunda estrofe...",
                        stanza3Intro: "A estrofe final...",
                        fullPoem: "O poema completo:",
                        awakening: "A cortina das pupilas se abre em silencio..."
                    },
                    speak: [
                        "Voce fala suavemente na escuridao.",
                        "A pantera nem vira a cabeca.",
                        "Suas palavras se dissipam entre as grades.",
                        "Talvez ela ouca. Talvez nao.",
                        "A linguagem humana nao significa nada para ela."
                    ],
                    open: {
                        first: [
                            "Voce alcanca as grades.",
                            "Elas sao frias, inflexiveis.",
                            "A pantera nao lhe da atencao."
                        ],
                        second: [
                            "As grades nao se movem.",
                            "Mas... sao realmente as grades",
                            "que a mantem cativa?"
                        ],
                        realized: [
                            "As grades nao sao a prisao.",
                            "A prisao e a percepcao.",
                            "Os muros estao dentro."
                        ]
                    },
                    wake: {
                        notAwakened: [
                            "Ela ja esta acordada.",
                            "Mais acordada que voce, talvez."
                        ],
                        partial: [
                            "Algo se move...",
                            "Os olhos da pantera encontram seu olhar."
                        ],
                        awakened: [
                            "Ela nao dorme.",
                            "Ela esta apenas... entorpecida.",
                            "'Onde uma grande vontade permanece entorpecida.'"
                        ]
                    },
                    free: {
                        understood: "A liberdade esta dentro de voce. Sempre esteve.",
                        notReady: [
                            "Voce chacoalha as grades.",
                            "Nada se move.",
                            "Leia o poema. Entenda."
                        ]
                    },
                    hidden: {
                        stabe: [
                            "'Parece-lhe que ha mil grades'",
                            "'e atras de mil grades nenhum mundo.'",
                            "As grades estao em toda parte e em lugar nenhum."
                        ],
                        wille: [
                            "'...uma grande vontade permanece entorpecida.'",
                            "A vontade ainda esta la.",
                            "Apenas entorpecida. Nao morta."
                        ],
                        herz: [
                            "'...e deixa de existir no coracao.'",
                            "A imagem atravessa a quietude tensa",
                            "dos membros - e termina no coracao.",
                            "Mas o que significa deixar de existir no coracao?"
                        ],
                        jardin: [
                            "Le Jardin des Plantes, Paris.",
                            "La Rilke viu a pantera.",
                            "1902. Ha mais de um seculo.",
                            "O animal ainda gira."
                        ],
                        rilke: [
                            "Rainer Maria Rilke (1875-1926)",
                            "Ele aprendeu com Rodin a ver de verdade.",
                            "Nao apenas olhar - ver.",
                            "'A Pantera' foi um de seus 'poemas-coisa' -",
                            "Poemas que capturam a essencia de algo."
                        ],
                        tanz: [
                            "'...e como uma danca de forca ao redor de um centro'",
                            "Mesmo em cativeiro -",
                            "a forca permanece.",
                            "A danca continua."
                        ],
                        pupille: {
                            notReady: [
                                "'So as vezes a cortina das pupilas",
                                "se abre em silencio --.'",
                                "A cortina permanece fechada.",
                                "Ainda nao..."
                            ],
                            ready: [
                                "Os olhos se abrem..."
                            ]
                        },
                        gedicht: [
                            "Um poema-coisa.",
                            "A coisa fala atraves do poeta.",
                            "Nao sobre a coisa - atraves dela.",
                            "A pantera falou atraves de Rilke.",
                            "Agora ela fala atraves destas grades."
                        ],
                        rodin: [
                            "Auguste Rodin, o escultor.",
                            "Rilke foi seu secretario em Paris.",
                            "'Il faut travailler' - E preciso trabalhar.",
                            "'Il faut regarder' - E preciso ver.",
                            "Rodin o ensinou a ver de verdade."
                        ],
                        nacht: [
                            "A noite a jaula fica menor.",
                            "Ou maior - quem sabe.",
                            "A escuridao atras das grades",
                            "e a mesma que na frente."
                        ],
                        secrets: [
                            "Voce procura atentamente.",
                            "Isso e bom.",
                            "A pantera percebe."
                        ]
                    },
                    cinematic: {
                        dots: "...",
                        seeBars: "Voce ve as grades.",
                        seePanther: "Voce ve a pantera.",
                        seeYourself: "Voce ve... voce mesmo.",
                        pantherPauses: "A pantera para.",
                        turnsAround: "Ela se vira.",
                        slowly: "Lentamente.",
                        eyesMeet: "Seus olhos encontram os seus.",
                        understand: "E voce entende:",
                        barsNotPrison: "As grades nunca foram a prisao.",
                        prisonWasGaze: "A prisao era o olhar.",
                        wearyEmptyGaze: "O olhar cansado e vazio.",
                        behindBars: "Atras das grades...",
                        alwaysWorld: "sempre houve um mundo.",
                        hadToSee: "Voce so precisava ver.",
                        worldYouSeek: "O mundo que voce procura",
                        neverBehindBars: "nunca esteve atras das grades.",
                        wasInYou: "Estava dentro de voce.",
                        imageFades: "A imagem desvanece.",
                        pantherCircles: "A pantera continua girando.",
                        butYouSaw: "Mas voce viu.",
                        questionRemains: "Mas uma pergunta permanece...",
                        readyToAwaken: "Voce esta pronto para despertar?",
                        typeAwaken: "Digite <span class='cmd-highlight'>erwachen</span> para continuar.",
                        youAwaken: "Voce desperta..."
                    },
                    erwachen: {
                        direct: "Direto para a libertacao..."
                    },
                    deadPanther: "A pantera jaz imóvel. A esperanca extinta."
                }
            },

            chains: {
                question: "Voce esta pronto para quebrar as grades?",
                buttons: {
                    ja: "SIM",
                    nein: "NAO",
                    zurueck: "VOLTAR",
                    ichLausche: "EU ESCUTO"
                },
                soundHint: "Para a experiencia completa: Som ligado",
                ritual: {
                    line1: "Para ouvir o que as grades sussurram,",
                    line2: "voce precisa ser capaz de escutar."
                },
                threshold: {
                    line1: "Quem ve as grades",
                    line2: "ja as quebrou pela metade.",
                    holdInstruction: "Segure para quebrar as grades"
                },
                chainWords: [
                    "As grades",
                    "Mil grades",
                    "Nenhum mundo",
                    "Voce deve...",
                    "Isso nao se faz",
                    "O que vao pensar?",
                    "Seja razoavel",
                    "Irrealista",
                    "Adapte-se",
                    "O circulo estreito",
                    "Entorpecida",
                    "Olhar cansado",
                    "Expectativas",
                    "Dever",
                    "Sempre",
                    "Nunca",
                    "Medo",
                    "Duvida",
                    "Nao sou bom o suficiente",
                    "Tarde demais",
                    "Velho demais",
                    "Jovem demais",
                    "Seguranca",
                    "Zona de conforto",
                    "Ser normal",
                    "Funcionar",
                    "Conformar-se",
                    "Silencio"
                ],
                cinematic: {
                    phase1: "Dentro da sua mente...",
                    phase2: "Neuronios, presos em velhos padroes.",
                    phase3: "As sinapses comecam a se romper.",
                    phase4: "Velhos pensamentos se dissolvem.",
                    phase5: "Novas conexoes se formam.",
                    phase6: "A cortina das pupilas se abre.",
                    phase7: "Voce ve claramente.",
                    phase8: "Voce nunca esteve preso.",
                    phase9: "Livre."
                },
                aftermath: {
                    quote: "\"Estamos sentados em uma caverna e confundimos sombras com a realidade.\"",
                    author: "-- Platao"
                }
            },

            ui: {
                credit: "designed by Nils Weiser"
            }
        }
    };

    // ========================================
    // Helper Functions
    // ========================================

    /**
     * Get initial language based on priority:
     * 1. localStorage pantherLang
     * 2. localStorage lang (main site)
     * 3. Browser language
     * 4. Default 'de'
     */
    function getInitialLang() {
        const pantherLang = localStorage.getItem('pantherLang');
        if (pantherLang && SUPPORTED_LANGS.includes(pantherLang)) {
            return pantherLang;
        }

        const siteLang = localStorage.getItem('lang');
        if (siteLang && SUPPORTED_LANGS.includes(siteLang)) {
            return siteLang;
        }

        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LANGS.includes(browserLang)) {
            return browserLang;
        }

        return 'de';
    }

    /**
     * Get current language
     */
    function getLang() {
        return currentLang;
    }

    /**
     * Set language and persist to localStorage
     */
    function setLang(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.warn('Unsupported language:', lang);
            return;
        }

        currentLang = lang;
        localStorage.setItem('pantherLang', lang);

        // Dispatch event for components to react
        window.dispatchEvent(new CustomEvent('pantherLangChange', {
            detail: { lang }
        }));
    }

    /**
     * Get translation by dot-notation key
     * Example: t('terminal.system.title') returns "=== Der Panther ==="
     */
    function t(key) {
        const keys = key.split('.');
        let value = TRANSLATIONS[currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to German
                value = TRANSLATIONS['de'];
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object' && fallbackKey in value) {
                        value = value[fallbackKey];
                    } else {
                        console.warn('Translation not found:', key);
                        return key;
                    }
                }
                break;
            }
        }

        return value;
    }

    /**
     * Get supported languages
     */
    function getSupportedLangs() {
        return SUPPORTED_LANGS;
    }

    // Initialize language
    currentLang = getInitialLang();

    // ========================================
    // Export
    // ========================================

    window.PantherI18n = {
        t: t,
        getLang: getLang,
        setLang: setLang,
        getSupportedLangs: getSupportedLangs,
        TRANSLATIONS: TRANSLATIONS
    };

})();
