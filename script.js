/**
 * ESTUDIO CREATIVO AI - SCRIPT LOGIC
 * Plantilla diseñada por el profesor Édgar Herrera - Adaptada para Posters e Invitaciones
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // DOM ELEMENTS SELECTORS
    // ==========================================================================
    const apiKeyInput = document.getElementById('apiKey');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const eyeClosedIcon = document.getElementById('eyeClosedIcon');
    const eyeOpenIcon = document.getElementById('eyeOpenIcon');
    
    const imageModelSelect = document.getElementById('imageModel');
    const designTypeSelect = document.getElementById('designTypeSelect');
    const styleSelect = document.getElementById('styleSelect');
    const titleInput = document.getElementById('titleInput');
    
    const promptJsonTextarea = document.getElementById('promptJson');
    const resetPromptBtn = document.getElementById('resetPromptBtn');
    const jsonStatusSpan = document.getElementById('jsonStatus');
    
    const generateBtn = document.getElementById('generateBtn');
    const btnSpinner = document.getElementById('btnSpinner');
    const btnText = document.getElementById('btnText');
    const downloadBtn = document.getElementById('downloadBtn');
    
    const canvasCard = document.getElementById('canvasCard');
    const canvasPlaceholder = document.getElementById('canvasPlaceholder');
    const generatedImage = document.getElementById('generatedImage');
    const canvasLoading = document.getElementById('canvasLoading');
    const errorBanner = document.getElementById('errorBanner');
    const errorTextSpan = document.getElementById('errorText');

    // Nuevos Selectores
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    const imageSeedInput = document.getElementById('imageSeed');
    const randomSeedBtn = document.getElementById('randomSeedBtn');
    const lockSeedBtn = document.getElementById('lockSeedBtn');
    
    const aspectRatioSelect = document.getElementById('aspectRatioSelect');
    const toggleOverlayCheckbox = document.getElementById('toggleOverlay');
    const canvasTextOverlay = document.getElementById('canvasTextOverlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlaySubtitle = document.getElementById('overlaySubtitle');
    const overlayBadge = document.getElementById('overlayBadge');
    
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    const importJsonBtn = document.getElementById('importJsonBtn');
    const exportJsonBtn = document.getElementById('exportJsonBtn');
    const importFileInput = document.getElementById('importFileInput');
    
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const historyListContainer = document.getElementById('historyListContainer');
    
    const chips = document.querySelectorAll('.chip');

    // ==========================================================================
    // APP STATE & CONSTANTS
    // ==========================================================================
    let currentImageBase64 = null;
    let isJsonValid = true;
    let isSeedLocked = false;

    const defaultPromptObj = {
      "tipo": "cartel_publicitario",
      "estilo": "futurista",
      "tema": {
        "titulo": "Herramientas de IA",
        "subtitulo": "Crea recursos educativos interactivos con inteligencia artificial",
        "marca": "Proyecto Descartes",
        "objetivo": "Promocionar una plataforma educativa basada en inteligencia artificial"
      },
      "escena": {
        "ubicacion": {
          "tipo": "aula_digital_inmersiva",
          "descripcion": "espacio futurista lleno de pantallas holográficas e interfaces flotantes"
        },
        "elementos_principales": [
          "pantallas holográficas",
          "interfaces flotantes",
          "paneles luminosos",
          "recursos educativos interactivos"
        ],
        "paneles_mostrados": [
          "generadores de imágenes",
          "presentaciones",
          "videojuegos educativos",
          "libros interactivos",
          "cuestionarios automáticos",
          "asistentes multimodales de IA"
        ]
      },
      "personajes": {
        "estudiante": {
          "tipo": "joven estudiante",
          "expresion": "fascinado",
          "accion": "observando paneles holográficos"
        },
        "docente": {
          "tipo": "docente",
          "expresion": "sorprendida e inspirada",
          "accion": "interactuando con interfaces de IA"
        }
      },
      "composicion": {
        "sensacion": [
          "innovación",
          "creatividad",
          "educación del futuro"
        ],
        "elementos_flotantes": [
          "redes neuronales brillantes",
          "íconos de chatbots",
          "ondas de audio",
          "diagramas matemáticos",
          "miniaturas de imágenes generadas por IA",
          "fragmentos de código luminoso"
        ],
        "interfaces_visibles": [
          "DescartesJS",
          "herramientas basadas en Pollinations AI"
        ]
      },
      "entorno_visual": {
        "paleta_de_colores": {
          "primarios": [
            "azul eléctrico",
            "violeta neón",
            "amarillo brillante"
          ],
          "secundarios": [
            "cian luminoso",
            "blanco metálico"
          ]
        },
        "efectos": [
          "partículas luminosas",
          "efectos holográficos",
          "iluminación volumétrica",
          "reflejos futuristas"
        ],
        "atmosfera": "tecnológica, dinámica y energética"
      },
      "tipografia": {
        "titulo_principal": {
          "texto": "HERRAMIENTAS DE IA",
          "estilo": "letras 3D futuristas",
          "acabado": [
            "blanco brillante",
            "azul metálico"
          ],
          "ubicacion": "parte superior"
        },
        "frase_publicitaria": {
          "texto": "IMAGINA • CREA • ENSEÑA",
          "tipografia": "moderna y llamativa",
          "ubicacion": "lado izquierdo"
        },
        "firma": {
          "texto": "Proyecto Descartes",
          "ubicacion": "esquina inferior derecha",
          "estilo": "discreto"
        }
      },
      "estilo_visual": {
        "tipo": [
          "hiperrealista",
          "cinematográfico",
          "vibrante"
        ],
        "detalles": [
          "profundidad de campo",
          "detalles ultrafinos",
          "estética educativa futurista",
          "campaña tecnológica de alto impacto"
        ]
      },
      "render": {
        "calidad": "ultra detallada",
        "aspect_ratio": "1:1"
      }
    };

    // Banco de datos para la función "Sorpréndeme"
    const surpriseCombinations = [
      {
        titulo: "Aula del Futuro",
        subtitulo: "Aulas equipadas con asistentes robóticos y realidad mixta interactiva",
        tipo: "cartel_publicitario",
        estilo: "futurista",
        marca: "Proyecto Descartes",
        objetivo: "Visualizar el futuro de la educación secundaria",
        modelo: "flux",
        escena_tipo: "laboratorio holográfico interactivo",
        escena_desc: "estudiantes manipulando moléculas flotantes en 3D con sus manos",
        color_primarios: ["azul cobalto", "cian ciber", "magenta neón"],
        elementos_flotantes: ["átomos brillantes", "código binario", "esferas de energía"],
        efectos: ["luz neón vibrante", "reflejos futuristas", "partículas de polvo luminoso"]
      },
      {
        titulo: "Boda de Ensueño",
        subtitulo: "Acompáñanos a celebrar nuestra unión matrimonial",
        tipo: "tarjeta_de_matrimonio",
        estilo: "vintage",
        marca: "Ana & Carlos",
        objetivo: "Invitar a amigos y familiares a la ceremonia nupcial",
        modelo: "flux",
        escena_tipo: "altar al aire libre decorado con rosas blancas",
        escena_desc: "arco nupcial rodeado de hermosas flores colgantes y linternas encendidas al atardecer",
        color_primarios: ["oro rosa", "blanco marfil", "verde salvia"],
        elementos_flotantes: ["pétalos de rosa cayendo", "destellos de luz dorada", "lazos de encaje"],
        efectos: ["luz natural suave", "iluminación volumétrica", "sombras suaves"]
      },
      {
        titulo: "Mis Quince Años",
        subtitulo: "Una noche mágica que marcará el inicio de un gran viaje",
        tipo: "tarjeta_de_quince_anos",
        estilo: "cyberpunk",
        marca: "Sofía",
        objetivo: "Invitar a mi fiesta de 15 años",
        modelo: "grok-imagine",
        escena_tipo: "salón de eventos con pantallas LED gigantes",
        escena_desc: "una pista de baile holográfica en tonos neón rosa y fucsia con decoración futurista",
        color_primarios: ["magenta neón", "cian ciber", "plata metálico"],
        elementos_flotantes: ["estrellas de neón", "auriculares flotantes", "burbujas brillantes"],
        efectos: ["luz neón vibrante", "reflejos futuristas", "partículas de polvo luminoso"]
      },
      {
        titulo: "Baby Shower de Liam",
        subtitulo: "Celebremos juntos la dulce espera de nuestro bebé",
        tipo: "tarjeta_de_baby_shower",
        estilo: "minimalista",
        marca: "Familia Morales",
        objetivo: "Invitar al baby shower de nuestro hijo",
        modelo: "flux",
        escena_tipo: "habitación de bebé moderna y acogedora",
        escena_desc: "móvil de cuna flotante con nubes, estrellas y lunas de tela pastel en un fondo blanco",
        color_primarios: ["azul pastel", "blanco crema", "gris suave"],
        elementos_flotantes: ["pequeñas nubes", "estrellas doradas", "globos flotantes"],
        efectos: ["luz natural suave", "sombras suaves", "iluminación de estudio dramática"]
      },
      {
        titulo: "Mi Graduación",
        subtitulo: "Celebración del éxito académico y el inicio del futuro profesional",
        tipo: "tarjeta_de_grado",
        estilo: "retro",
        marca: "Clase de Ingeniería 2026",
        objetivo: "Invitar al acto académico y fiesta de graduación",
        modelo: "klein",
        escena_tipo: "campus universitario clásico con columnas de piedra",
        escena_desc: "birretes volando en el aire al atardecer frente a un edificio histórico",
        color_primarios: ["azul marino", "dorado brillante", "blanco"],
        elementos_flotantes: ["birretes flotantes", "diplomas enrollados", "destellos de luz"],
        efectos: ["retroiluminación intensa", "niebla volumétrica misteriosa", "luz natural suave"]
      },
      {
        titulo: "Cumpleaños Feliz",
        subtitulo: "¡Celebremos un año más de risas, locuras y momentos felices!",
        tipo: "tarjeta_de_cumpleanos",
        estilo: "retro",
        marca: "Fiesta de Carlos",
        objetivo: "Invitar a mis amigos a la fiesta de cumpleaños",
        modelo: "nanobanana",
        escena_tipo: "fiesta con pastel de cumpleaños iluminado",
        escena_desc: "globos de colores pastel flotantes, confeti brillante cayendo y luces de guirnalda cálidas",
        color_primarios: ["amarillo mostaza", "turquesa", "naranja coral"],
        elementos_flotantes: ["confeti brillante", "globos de colores", "gorritos de fiesta"],
        efectos: ["retroiluminación intensa", "iluminación volumétrica", "reflejos brillantes"]
      }
    ];

    // Mapeo de resoluciones para la API de Pollinations
    const aspectSizes = {
        "1:1": { width: 1024, height: 1024 },
        "16:9": { width: 1024, height: 576 },
        "9:16": { width: 576, height: 1024 },
        "3:4": { width: 768, height: 1024 },
        "4:3": { width: 1024, height: 768 }
    };

    // ==========================================================================
    // INITIALIZATION, THEME & HISTORY STORAGE
    // ==========================================================================
    // Cargar Clave API de LocalStorage
    const storedApiKey = localStorage.getItem('pollinations_api_key');
    if (storedApiKey) {
        apiKeyInput.value = storedApiKey;
    }

    apiKeyInput.addEventListener('input', () => {
        localStorage.setItem('pollinations_api_key', apiKeyInput.value.trim());
    });

    // Alternar visibilidad de Clave API
    togglePasswordBtn.addEventListener('click', () => {
        if (apiKeyInput.type === 'password') {
            apiKeyInput.type = 'text';
            eyeClosedIcon.style.display = 'none';
            eyeOpenIcon.style.display = 'block';
        } else {
            apiKeyInput.type = 'password';
            eyeClosedIcon.style.display = 'block';
            eyeOpenIcon.style.display = 'none';
        }
    });

    // Inicializar Tema Claro/Oscuro
    const storedTheme = localStorage.getItem('app_theme') || 'dark';
    if (storedTheme === 'light') {
        document.body.classList.add('light-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('app_theme', isLight ? 'light' : 'dark');
        
        if (isLight) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    });

    // Cargar Historial
    renderHistory();

    // ==========================================================================
    // PROMPT DYNAMIC SYNCHRONIZATION
    // ==========================================================================
    
    // Sincroniza controles a Prompt JSON
    function syncControlsToPrompt() {
        let currentPrompt = {};
        
        try {
            currentPrompt = JSON.parse(promptJsonTextarea.value);
        } catch (e) {
            currentPrompt = { ...defaultPromptObj };
        }

        const selectedStyle = styleSelect.value;
        const selectedTitle = titleInput.value.trim() || "Herramientas de IA";
        const selectedAspect = aspectRatioSelect.value;
        const selectedDesignType = designTypeSelect.value;

        currentPrompt.tipo = selectedDesignType;
        currentPrompt.estilo = selectedStyle;
        
        if (currentPrompt.tema) {
            currentPrompt.tema.titulo = selectedTitle;
        }
        if (currentPrompt.tipografia && currentPrompt.tipografia.titulo_principal) {
            currentPrompt.tipografia.titulo_principal.texto = selectedTitle.toUpperCase();
        }
        
        if (!currentPrompt.render) currentPrompt.render = {};
        currentPrompt.render.aspect_ratio = selectedAspect;

        promptJsonTextarea.value = JSON.stringify(currentPrompt, null, 2);
        
        // Actualizar vista previa del lienzo
        updateCanvasAspectAndOverlay();
        setJsonStatus(true);
    }

    // Sincroniza Prompt JSON a controles (y chips)
    function syncPromptToControls() {
        const rawValue = promptJsonTextarea.value;
        
        if (!rawValue.trim()) {
            setJsonStatus(false, "JSON Vacío");
            return;
        }

        try {
            const parsed = JSON.parse(rawValue);
            setJsonStatus(true);

            // Sincronizar Tipo de Diseño Selector
            if (parsed.tipo) {
                const typeOption = Array.from(designTypeSelect.options).find(opt => opt.value === parsed.tipo);
                if (typeOption) {
                    designTypeSelect.value = parsed.tipo;
                } else {
                    designTypeSelect.value = "otro_objeto";
                }
            }

            // Sincronizar Style Selector
            if (parsed.estilo) {
                const styleOption = Array.from(styleSelect.options).find(opt => opt.value === parsed.estilo);
                if (styleOption) {
                    styleSelect.value = parsed.estilo;
                }
            }

            // Sincronizar Title Input
            if (parsed.tema && parsed.tema.titulo) {
                titleInput.value = parsed.tema.titulo;
            }

            // Sincronizar Aspect Ratio Selector
            if (parsed.render && parsed.render.aspect_ratio) {
                const aspectOption = Array.from(aspectRatioSelect.options).find(opt => opt.value === parsed.render.aspect_ratio);
                if (aspectOption) {
                    aspectRatioSelect.value = parsed.render.aspect_ratio;
                }
            }

            // Sincronizar chips
            syncPromptToChips(parsed);

            // Actualizar vista previa del lienzo
            updateCanvasAspectAndOverlay(parsed);

        } catch (error) {
            setJsonStatus(false);
        }
    }

    // Cambia la relación de aspecto del lienzo y actualiza el texto de superposición
    function updateCanvasAspectAndOverlay(parsed = null) {
        if (!parsed) {
            try {
                parsed = JSON.parse(promptJsonTextarea.value);
            } catch (e) {
                parsed = defaultPromptObj;
            }
        }

        const aspectClass = 'aspect-' + aspectRatioSelect.value.replace(':', '-');
        const themeClass = 'theme-' + styleSelect.value;

        // Limpiar clases previas de aspecto y estilo
        canvasCard.className = 'canvas-card ' + aspectClass + ' ' + themeClass;

        // Superponer texto
        const overlayActive = toggleOverlayCheckbox.checked;
        canvasTextOverlay.classList.toggle('active', overlayActive);

        if (overlayActive && parsed) {
            const titleText = parsed.tipografia?.titulo_principal?.texto || titleInput.value.toUpperCase();
            const subtitleText = parsed.tema?.subtitulo || parsed.tipografia?.frase_publicitaria?.texto || "";
            const badgeText = parsed.tema?.marca || parsed.tipografia?.firma?.texto || "PROYECTO DESCARTES";

            overlayTitle.textContent = titleText;
            overlaySubtitle.textContent = subtitleText;
            overlayBadge.textContent = badgeText.toUpperCase();
        }
    }

    // Sincronizar Chips activos basados en el JSON
    function syncPromptToChips(parsed) {
        chips.forEach(chip => {
            const category = chip.closest('.chips-list').dataset.category;
            const val = chip.dataset.value;
            let isActive = false;

            if (parsed) {
                if (category === 'iluminacion' && parsed.entorno_visual?.efectos) {
                    isActive = parsed.entorno_visual.efectos.includes(val);
                } else if (category === 'camara' && parsed.estilo_visual?.tipo) {
                    isActive = parsed.estilo_visual.tipo.includes(val);
                } else if (category === 'efectos' && parsed.entorno_visual?.efectos) {
                    isActive = parsed.entorno_visual.efectos.includes(val);
                }
            }
            chip.classList.toggle('active', isActive);
        });
    }

    // Establece el estado de validación del JSON
    function setJsonStatus(isValid, customMessage = null) {
        isJsonValid = isValid;
        if (isValid) {
            jsonStatusSpan.textContent = "JSON Válido";
            jsonStatusSpan.className = "json-status valid";
            generateBtn.disabled = false;
        } else {
            jsonStatusSpan.textContent = customMessage || "JSON Inválido";
            jsonStatusSpan.className = "json-status invalid";
            generateBtn.disabled = true;
        }
    }

    // Inicializar prompt textarea con el JSON por defecto
    promptJsonTextarea.value = JSON.stringify(defaultPromptObj, null, 2);

    // Eventos de cambios para controles básicos
    styleSelect.addEventListener('change', syncControlsToPrompt);
    designTypeSelect.addEventListener('change', syncControlsToPrompt);
    aspectRatioSelect.addEventListener('change', syncControlsToPrompt);
    titleInput.addEventListener('input', syncControlsToPrompt);
    toggleOverlayCheckbox.addEventListener('change', syncControlsToPrompt);

    // Evento para editor manual de texto JSON
    promptJsonTextarea.addEventListener('input', syncPromptToControls);

    // Evento de restauración
    resetPromptBtn.addEventListener('click', () => {
        styleSelect.selectedIndex = 0;
        designTypeSelect.selectedIndex = 0;
        aspectRatioSelect.selectedIndex = 0;
        titleInput.value = "Herramientas de IA";
        imageSeedInput.value = "";
        isSeedLocked = false;
        lockSeedBtn.textContent = "🔓";
        lockSeedBtn.title = "Bloquear Semilla Actual";
        imageSeedInput.disabled = false;
        
        promptJsonTextarea.value = JSON.stringify(defaultPromptObj, null, 2);
        syncPromptToControls();
        hideError();
    });

    // ==========================================================================
    // SEED & RANDOMIZER & EXPORT/IMPORT & CHIPS EVENTS
    // ==========================================================================
    // Semilla aleatoria
    randomSeedBtn.addEventListener('click', () => {
        if (isSeedLocked) return;
        const randomSeed = Math.floor(Math.random() * 10000000);
        imageSeedInput.value = randomSeed;
    });

    // Bloqueo de semilla
    lockSeedBtn.addEventListener('click', () => {
        isSeedLocked = !isSeedLocked;
        if (isSeedLocked) {
            lockSeedBtn.textContent = "🔒";
            lockSeedBtn.title = "Desbloquear Semilla";
            imageSeedInput.disabled = true;
            if (!imageSeedInput.value.trim()) {
                imageSeedInput.value = Math.floor(Math.random() * 10000000);
            }
        } else {
            lockSeedBtn.textContent = "🔓";
            lockSeedBtn.title = "Bloquear Semilla Actual";
            imageSeedInput.disabled = false;
        }
    });

    // Botón Sorpréndeme (Randomizer)
    surpriseBtn.addEventListener('click', () => {
        const index = Math.floor(Math.random() * surpriseCombinations.length);
        const combo = surpriseCombinations[index];

        // Sincronizar inputs
        titleInput.value = combo.titulo;
        styleSelect.value = combo.estilo;
        designTypeSelect.value = combo.tipo;
        
        const modelOption = Array.from(imageModelSelect.options).find(opt => opt.value === combo.modelo);
        if (modelOption) imageModelSelect.value = combo.modelo;

        // Generar nueva estructura JSON creativa
        let newPrompt = { ...defaultPromptObj };
        newPrompt.tipo = combo.tipo;
        newPrompt.estilo = combo.estilo;
        newPrompt.tema = {
            titulo: combo.titulo,
            subtitulo: combo.subtitulo,
            marca: combo.marca,
            objetivo: combo.objetivo
        };
        newPrompt.tipografia = {
            titulo_principal: {
                texto: combo.titulo.toUpperCase(),
                estilo: combo.estilo === "futurista" ? "letras 3D futuristas" : "fuente estilizada " + combo.estilo,
                acabado: combo.estilo === "futurista" ? ["blanco brillante", "azul metálico"] : ["color sólido contrastante"],
                ubicacion: combo.estilo === "minimalista" ? "parte superior izquierda" : "parte superior"
            },
            frase_publicitaria: {
                texto: combo.subtitulo.split(".")[0].toUpperCase(),
                tipografia: "moderna y llamativa",
                ubicacion: combo.estilo === "minimalista" ? "parte superior izquierda" : "parte inferior"
            },
            firma: {
                texto: combo.marca,
                ubicacion: combo.estilo === "minimalista" ? "inferior izquierda" : "esquina inferior derecha",
                estilo: "discreta"
            }
        };
        
        newPrompt.escena = {
            ubicacion: {
                tipo: combo.escena_tipo,
                descripcion: combo.escena_desc
            },
            elementos_principales: [combo.escena_tipo, combo.escena_desc]
        };

        newPrompt.entorno_visual = {
            paleta_de_colores: {
                primarios: combo.color_primarios,
                secundarios: ["blanco", "negro"]
            },
            efectos: combo.efectos,
            atmosfera: combo.estilo + " y de alto impacto"
        };
        newPrompt.composicion = {
            sensacion: ["creatividad", "inspiración"],
            elementos_flotantes: combo.elementos_flotantes
        };
        newPrompt.render = {
            calidad: "ultra detallada",
            aspect_ratio: aspectRatioSelect.value
        };

        promptJsonTextarea.value = JSON.stringify(newPrompt, null, 2);
        
        // Generar una semilla aleatoria si no está bloqueada
        if (!isSeedLocked) {
            imageSeedInput.value = Math.floor(Math.random() * 10000000);
        }

        // Sincronizar todo de vuelta
        syncPromptToControls();
    });

    // Chips inteligentes
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            let parsed = {};
            try {
                parsed = JSON.parse(promptJsonTextarea.value);
            } catch (e) {
                showError("No se pueden añadir chips a un JSON inválido.");
                return;
            }

            const category = chip.closest('.chips-list').dataset.category;
            const val = chip.dataset.value;
            
            // Inicializar objetos de la estructura si no existen
            if (!parsed.entorno_visual) parsed.entorno_visual = {};
            if (!parsed.entorno_visual.efectos) parsed.entorno_visual.efectos = [];
            if (!parsed.estilo_visual) parsed.estilo_visual = {};
            if (!parsed.estilo_visual.tipo) parsed.estilo_visual.tipo = [];

            if (category === 'iluminacion') {
                const index = parsed.entorno_visual.efectos.indexOf(val);
                if (index > -1) {
                    parsed.entorno_visual.efectos.splice(index, 1);
                } else {
                    parsed.entorno_visual.efectos.push(val);
                }
            } else if (category === 'camara') {
                const index = parsed.estilo_visual.tipo.indexOf(val);
                if (index > -1) {
                    parsed.estilo_visual.tipo.splice(index, 1);
                } else {
                    parsed.estilo_visual.tipo.push(val);
                }
            } else if (category === 'efectos') {
                const index = parsed.entorno_visual.efectos.indexOf(val);
                if (index > -1) {
                    parsed.entorno_visual.efectos.splice(index, 1);
                } else {
                    parsed.entorno_visual.efectos.push(val);
                }
            }

            // Guardar cambios en el textarea y sincronizar de vuelta
            promptJsonTextarea.value = JSON.stringify(parsed, null, 2);
            syncPromptToControls();
        });
    });

    // Exportar JSON
    exportJsonBtn.addEventListener('click', () => {
        const text = promptJsonTextarea.value;
        const blob = new Blob([text], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const cleanTitle = (titleInput.value.trim() || "diseño").toLowerCase().replace(/\s+/g, '_');
        const a = document.createElement('a');
        a.href = url;
        a.download = `estudio_creativo_${cleanTitle}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Importar JSON
    importJsonBtn.addEventListener('click', () => {
        importFileInput.click();
    });

    importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            try {
                // Verificar que sea JSON válido
                JSON.parse(content);
                promptJsonTextarea.value = content;
                syncPromptToControls();
            } catch (err) {
                showError("El archivo seleccionado no contiene una estructura JSON válida.");
            }
        };
        reader.readAsText(file);
        importFileInput.value = ""; // Reiniciar input
    });

    // ==========================================================================
    // UI CONTROL PANEL STATES
    // ==========================================================================
    function disableUI() {
        apiKeyInput.disabled = true;
        imageModelSelect.disabled = true;
        designTypeSelect.disabled = true;
        styleSelect.disabled = true;
        aspectRatioSelect.disabled = true;
        imageSeedInput.disabled = true;
        randomSeedBtn.disabled = true;
        lockSeedBtn.disabled = true;
        titleInput.disabled = true;
        toggleOverlayCheckbox.disabled = true;
        promptJsonTextarea.disabled = true;
        resetPromptBtn.disabled = true;
        generateBtn.disabled = true;
        downloadBtn.disabled = true;
        surpriseBtn.disabled = true;
        importJsonBtn.disabled = true;
        exportJsonBtn.disabled = true;
        clearHistoryBtn.disabled = true;
        
        chips.forEach(c => c.style.pointerEvents = 'none');
        
        btnSpinner.style.display = 'inline-block';
        btnText.textContent = "Generando...";
    }

    function enableUI() {
        apiKeyInput.disabled = false;
        imageModelSelect.disabled = false;
        designTypeSelect.disabled = false;
        styleSelect.disabled = false;
        aspectRatioSelect.disabled = false;
        imageSeedInput.disabled = isSeedLocked;
        randomSeedBtn.disabled = false;
        lockSeedBtn.disabled = false;
        titleInput.disabled = false;
        toggleOverlayCheckbox.disabled = false;
        promptJsonTextarea.disabled = false;
        resetPromptBtn.disabled = false;
        generateBtn.disabled = false;
        surpriseBtn.disabled = false;
        importJsonBtn.disabled = false;
        exportJsonBtn.disabled = false;
        clearHistoryBtn.disabled = false;
        
        chips.forEach(c => c.style.pointerEvents = 'auto');
        
        btnSpinner.style.display = 'none';
        btnText.textContent = "Generando Imagen";
        
        if (currentImageBase64) {
            downloadBtn.disabled = false;
        }
    }

    function showError(message) {
        errorTextSpan.textContent = message;
        errorBanner.classList.add('show');
        
        setTimeout(() => {
            hideError();
        }, 8000);
    }

    function hideError() {
        errorBanner.classList.remove('show');
    }

    // ==========================================================================
    // IMAGE GENERATION & API CALL
    // ==========================================================================
    async function generateImage() {
        const apiKey = apiKeyInput.value.trim();
        const model = imageModelSelect.value;
        const promptText = promptJsonTextarea.value;
        const aspect = aspectRatioSelect.value;
        const seedValue = imageSeedInput.value.trim();

        if (!apiKey) {
            showError("Ingresa tu clave de API de Pollinations para poder realizar la generación.");
            return;
        }

        if (!isJsonValid) {
            showError("Corrige el error de formato JSON en el prompt antes de continuar.");
            return;
        }

        hideError();
        disableUI();
        
        canvasLoading.classList.add('active');
        generatedImage.classList.remove('loaded');

        // Mapear resoluciones del selector
        const sizeObj = aspectSizes[aspect] || { width: 1024, height: 1024 };

        const requestBody = {
            prompt: promptText,
            model: model,
            n: 1,
            width: sizeObj.width,
            height: sizeObj.height,
            quality: "medium",
            response_format: "b64_json",
            user: "",
            image: "",
            safe: ""
        };

        // Incluir semilla si está definida
        if (seedValue) {
            requestBody.seed = parseInt(seedValue);
        }

        try {
            const response = await fetch("https://gen.pollinations.ai/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                let errorDetails = "";
                try {
                    const errorJson = await response.json();
                    errorDetails = errorJson.error?.message || errorJson.message || "";
                } catch (e) {
                    errorDetails = `Código de estado HTTP: ${response.status}`;
                }

                if (response.status === 401) {
                    throw new Error("Clave de API inválida o no autorizada. Revisa tu API_key.");
                } else {
                    throw new Error(`Fallo en la API de Pollinations: ${errorDetails || "Error Desconocido"}`);
                }
            }

            const responseData = await response.json();
            
            if (responseData && responseData.data && responseData.data[0] && responseData.data[0].b64_json) {
                const b64Data = responseData.data[0].b64_json;
                const fullBase64Str = `data:image/png;base64,${b64Data}`;
                
                // Cargar imagen
                generatedImage.src = fullBase64Str;
                
                generatedImage.onload = () => {
                    canvasLoading.classList.remove('active');
                    canvasPlaceholder.style.display = 'none';
                    generatedImage.classList.add('loaded');
                    
                    currentImageBase64 = fullBase64Str;
                    
                    // Añadir esta generación al historial (sin la base64 gigante, con miniatura)
                    const cleanTitle = titleInput.value.trim() || "Diseño sin título";
                    const activeSeed = seedValue || "Aleatoria";
                    const designTypeLabel = designTypeSelect.options[designTypeSelect.selectedIndex].text;
                    addToHistory(promptText, model, styleSelect.value, designTypeLabel, cleanTitle, activeSeed, fullBase64Str);
                    
                    enableUI();
                };

                generatedImage.onerror = () => {
                    throw new Error("La imagen devuelta no se pudo cargar correctamente.");
                };

            } else {
                throw new Error("La respuesta de la API no contiene el formato b64_json esperado.");
            }

        } catch (error) {
            console.error("Generación fallida:", error);
            showError(error.message || "Ha ocurrido un error inesperado al conectar con el servidor.");
            canvasLoading.classList.remove('active');
            enableUI();
        }
    }

    generateBtn.addEventListener('click', generateImage);

    // ==========================================================================
    // HISTORIAL DE GENERACIONES (LOCALSTORAGE OPTIMIZADO)
    // ==========================================================================
    function addToHistory(promptText, model, style, designTypeLabel, title, seed, fullBase64) {
        // Reducir la imagen en un lienzo minúsculo para guardar como miniatura (thumbnails)
        const thumbCanvas = document.createElement('canvas');
        const thumbCtx = thumbCanvas.getContext('2d');
        thumbCanvas.width = 64;
        thumbCanvas.height = 64;
        
        const tempImg = new Image();
        tempImg.onload = () => {
            thumbCtx.drawImage(tempImg, 0, 0, 64, 64);
            const thumbBase64 = thumbCanvas.toDataURL('image/jpeg', 0.6); // jpeg comprimida al 60%
            
            const historyItem = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                promptJson: promptText,
                model: model,
                style: style,
                designTypeLabel: designTypeLabel,
                title: title,
                seed: seed,
                thumbnail: thumbBase64
            };

            let history = JSON.parse(localStorage.getItem('pollinations_history') || '[]');
            history.unshift(historyItem); // Insertar al inicio

            // Limitar a 10 items históricos para no saturar localStorage
            if (history.length > 10) {
                history.pop();
            }

            localStorage.setItem('pollinations_history', JSON.stringify(history));
            renderHistory();
        };
        tempImg.src = fullBase64;
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('pollinations_history') || '[]');
        
        if (history.length === 0) {
            historyListContainer.innerHTML = `<div class="history-empty">No hay diseños generados todavía.</div>`;
            return;
        }

        historyListContainer.innerHTML = "";
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = "history-item";
            div.dataset.id = item.id;
            div.title = "Haz clic para restaurar esta configuración";
            
            const typeLabel = item.designTypeLabel || "Diseño";
            
            div.innerHTML = `
                <img src="${item.thumbnail}" class="history-thumbnail" alt="${item.title}">
                <div class="history-details">
                    <span class="history-item-title">${item.title}</span>
                    <span class="history-item-meta">${typeLabel} • ${item.style} • ${item.model} • Semilla: ${item.seed}</span>
                </div>
            `;

            // Restaurar configuración al hacer clic
            div.addEventListener('click', () => {
                promptJsonTextarea.value = item.promptJson;
                imageModelSelect.value = item.model;
                styleSelect.value = item.style;
                titleInput.value = item.title;
                
                if (item.seed && item.seed !== "Aleatoria") {
                    imageSeedInput.value = item.seed;
                    isSeedLocked = true;
                    lockSeedBtn.textContent = "🔒";
                    lockSeedBtn.title = "Desbloquear Semilla";
                    imageSeedInput.disabled = true;
                } else {
                    imageSeedInput.value = "";
                    isSeedLocked = false;
                    lockSeedBtn.textContent = "🔓";
                    lockSeedBtn.title = "Bloquear Semilla Actual";
                    imageSeedInput.disabled = false;
                }

                syncPromptToControls();
                hideError();
            });

            historyListContainer.appendChild(div);
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que deseas vaciar tu historial de creaciones?")) {
            localStorage.removeItem('pollinations_history');
            renderHistory();
        }
    });

    // ==========================================================================
    // DOWNLOAD LOGIC WITH CANVAS OVERLAY (POSTER & CARD MAKER)
    // ==========================================================================
    function downloadImage() {
        if (!currentImageBase64) return;
        
        const model = imageModelSelect.value;
        const style = styleSelect.value.replace(/\s+/g, '_');
        const designType = designTypeSelect.value.replace(/\s+/g, '_');
        const title = titleInput.value.trim().replace(/\s+/g, '_') || 'diseno';
        const timestamp = new Date().toISOString().slice(0, 10);
        const fileName = `${designType}_${model}_${style}_${title}_${timestamp}.png`;

        // Si la superposición de texto está apagada, descargar la original de IA directamente
        if (!toggleOverlayCheckbox.checked) {
            const downloadLink = document.createElement('a');
            downloadLink.href = currentImageBase64;
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            return;
        }

        // Si está encendida la superposición, dibujamos sobre un canvas
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.naturalWidth || 1024;
            canvas.height = img.naturalHeight || 1024;

            // Dibujar fondo de IA
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Leer JSON para textos actualizados
            let parsed = {};
            try {
                parsed = JSON.parse(promptJsonTextarea.value);
            } catch (e) {
                parsed = defaultPromptObj;
            }

            const titleText = (parsed.tipografia?.titulo_principal?.texto || titleInput.value).toUpperCase();
            const subtitleText = parsed.tema?.subtitulo || parsed.tipografia?.frase_publicitaria?.texto || "";
            const badgeText = (parsed.tema?.marca || parsed.tipografia?.firma?.texto || "PROYECTO DESCARTES").toUpperCase();

            // Configuración del canvas de texto
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const selectedStyle = styleSelect.value;
            const w = canvas.width;
            const h = canvas.height;

            if (selectedStyle === "futurista") {
                // TÍTULO - Parte Superior Centrado
                ctx.font = "800 58px 'Outfit', 'Inter', sans-serif";
                ctx.fillStyle = "#ffffff";
                ctx.shadowColor = "rgba(59, 130, 246, 0.9)";
                ctx.shadowBlur = 24;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillText(titleText, w / 2, 110);

                // SUBTÍTULO - Parte Inferior
                ctx.font = "500 24px 'Inter', sans-serif";
                ctx.fillStyle = "#93c5fd";
                ctx.shadowColor = "rgba(139, 92, 246, 0.7)";
                ctx.shadowBlur = 12;
                ctx.fillText(subtitleText, w / 2, h - 140);

                // FIRMA/BADGE
                ctx.font = "700 16px 'Fira Code', monospace";
                ctx.fillStyle = "#a78bfa";
                ctx.shadowColor = "rgba(139, 92, 246, 0.5)";
                ctx.shadowBlur = 8;
                ctx.fillText(badgeText, w / 2, h - 70);

            } else if (selectedStyle === "retro") {
                // TÍTULO - Sombra 3D
                ctx.font = "900 64px Georgia, serif";
                ctx.shadowBlur = 0;
                
                // Dibujar sombra retro 3D
                ctx.fillStyle = "#78350f";
                ctx.fillText(titleText, (w / 2) + 4, 114);
                ctx.fillStyle = "#f59e0b";
                ctx.fillText(titleText, w / 2, 110);

                // SUBTÍTULO
                ctx.font = "italic 500 26px Georgia, serif";
                ctx.fillStyle = "#fef3c7";
                ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
                ctx.shadowBlur = 8;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.fillText(subtitleText, w / 2, h - 140);

                // BADGE
                ctx.font = "700 18px Georgia, serif";
                ctx.fillStyle = "#fb7185";
                ctx.fillText(badgeText, w / 2, h - 70);

            } else if (selectedStyle === "minimalista") {
                // Alineación a la izquierda
                ctx.textAlign = "left";
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                // TÍTULO
                ctx.font = "300 44px 'Inter', sans-serif";
                ctx.fillStyle = "#ffffff";
                ctx.fillText(titleText, 60, 110);

                // SUBTÍTULO
                ctx.font = "400 22px 'Inter', sans-serif";
                ctx.fillStyle = "#cbd5e1";
                ctx.fillText(subtitleText, 60, 160);

                // BADGE
                ctx.font = "600 18px 'Inter', sans-serif";
                ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                ctx.fillText(badgeText, 60, h - 80);

            } else if (selectedStyle === "vintage") {
                // Marco Vintage Delgado
                ctx.strokeStyle = "rgba(254, 243, 199, 0.25)";
                ctx.lineWidth = 4;
                ctx.strokeRect(30, 30, w - 60, h - 60);

                // TÍTULO
                ctx.font = "700 50px 'Times New Roman', Times, serif";
                ctx.fillStyle = "#fef3c7";
                ctx.fillText(titleText, w / 2, 110);

                // Línea decorativa abajo del título
                ctx.beginPath();
                ctx.moveTo((w / 2) - 150, 150);
                ctx.lineTo((w / 2) + 150, 150);
                ctx.strokeStyle = "rgba(254, 243, 199, 0.3)";
                ctx.lineWidth = 1;
                ctx.stroke();

                // SUBTÍTULO
                ctx.font = "italic 24px 'Times New Roman', serif";
                ctx.fillStyle = "#d97706";
                ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                ctx.shadowBlur = 4;
                ctx.fillText(subtitleText, w / 2, h - 140);

                // BADGE
                ctx.shadowBlur = 0;
                ctx.font = "700 18px 'Times New Roman', serif";
                ctx.fillStyle = "#fef3c7";
                ctx.fillText(badgeText, w / 2, h - 80);

            } else if (selectedStyle === "cyberpunk") {
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                // TÍTULO - Rectángulo con inclinación
                ctx.save();
                ctx.translate(60, 60);
                ctx.rotate(-0.02); // ligera rotación

                ctx.font = "900 36px 'Fira Code', monospace";
                const titleWidth = ctx.measureText(titleText).width;

                // Fondo negro
                ctx.fillStyle = "rgba(10, 14, 23, 0.9)";
                ctx.fillRect(0, 0, titleWidth + 30, 64);
                // Borde izquierdo rosa
                ctx.fillStyle = "#ff00ff";
                ctx.fillRect(0, 0, 6, 64);
                // Textos cian con desfase rosa
                ctx.fillStyle = "#ff00ff";
                ctx.fillText(titleText, 22, 34);
                ctx.fillStyle = "#00ffff";
                ctx.fillText(titleText, 20, 32);
                ctx.restore();

                // SUBTÍTULO
                ctx.save();
                ctx.translate(w - 60, h - 160);
                ctx.rotate(0.015);
                ctx.textAlign = "right";

                ctx.font = "500 20px 'Fira Code', monospace";
                const subWidth = ctx.measureText(subtitleText).width;

                ctx.fillStyle = "rgba(10, 14, 23, 0.85)";
                ctx.fillRect(-subWidth - 30, 0, subWidth + 30, 48);
                ctx.fillStyle = "#00ffff";
                ctx.fillRect(-3, 0, 3, 48);

                ctx.fillStyle = "#ffffff";
                ctx.fillText(subtitleText, -15, 24);
                ctx.restore();

                // BADGE
                ctx.font = "700 16px 'Fira Code', monospace";
                ctx.fillStyle = "#ffff00";
                ctx.fillText("[ " + badgeText + " ]", w / 2, h - 60);
            }

            // Descargar imagen compuesta resultante
            try {
                const combinedBase64 = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = combinedBase64;
                downloadLink.download = fileName;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } catch (err) {
                console.error("Error al componer diseño:", err);
                // Fallback a descarga original si falla la composición
                const downloadLink = document.createElement('a');
                downloadLink.href = currentImageBase64;
                downloadLink.download = fileName;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        };
        img.src = currentImageBase64;
    }

    downloadBtn.addEventListener('click', downloadImage);
    
    // Ejecutar sincronización inicial para establecer todo
    syncPromptToControls();
});