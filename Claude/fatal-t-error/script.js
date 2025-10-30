// ============================================
// FATAL T-ERROR - SISTEMA DE TERROR CIBERNÉTICO
// Script principal del juego
// ============================================

console.log('🎃 Fatal T-Error v1.0 - Sistema inicializado');
console.log('⚠️ ADVERTENCIA: Sistema comprometido detectado');

// === VARIABLES GLOBALES ===
let systemHealth = 100;
let threatsDetected = 0;
let currentScenario = 0;
let gameActive = false;
let score = 0;
let logInterval = null;
let healthInterval = null;
let scenarioTimeout = null;
let glitchInterval = null;

const scenarios = ['ransomware', 'phishing', 'malware', 'databreach'];
let completedScenarios = [];
let failedScenarios = [];

// === CONFIGURACIÓN ===
const CONFIG = {
    initialDelay: 5000,        // 5s antes del primer ataque
    scenarioInterval: {
        min: 15000,              // 15s mínimo entre escenarios
        max: 30000               // 30s máximo entre escenarios
    },
    healthDecreaseInterval: 10000,  // -2% cada 10s
    logInterval: 3000,         // Nuevo log cada 3s
    glitchInterval: {
        min: 8000,
        max: 20000
    }
};

// === LOGS DEL SISTEMA PREDEFINIDOS ===
const systemLogs = [
    { msg: "Proceso desconocido 'bugger.exe' detectado en memoria", type: "critical" },
    { msg: "Intentos de acceso no autorizado: 127 en los últimos 30s", type: "critical" },
    { msg: "Firewall deshabilitado por entidad externa", type: "critical" },
    { msg: "Tráfico de red anómalo detectado: 15.7GB transferidos", type: "warning" },
    { msg: "Encriptación de archivos en progreso...", type: "critical" },
    { msg: "Puerto 6666 abierto sin autorización", type: "warning" },
    { msg: "Keylogger detectado capturando entradas de teclado", type: "critical" },
    { msg: "Conexión establecida con servidor C&C: 192.168.66.13", type: "critical" },
    { msg: "Proceso de replicación del malware iniciado", type: "warning" },
    { msg: "Antivirus comprometido - Definiciones eliminadas", type: "critical" },
    { msg: "Backdoor instalado en el sistema", type: "critical" },
    { msg: "Escaneo de red en progreso desde este equipo", type: "warning" },
    { msg: "Intento de elevación de privilegios detectado", type: "warning" },
    { msg: "Modificación de registros del sistema", type: "critical" },
    { msg: "Tráfico de red cifrado hacia ubicación desconocida", type: "warning" },
    { msg: "Credenciales de usuario exportadas", type: "critical" },
    { msg: "Base de datos de contraseñas accedida", type: "critical" },
    { msg: "Archivos del sistema siendo modificados", type: "warning" },
    { msg: "Nueva conexión SSH desde IP desconocida", type: "warning" },
    { msg: "Proceso de minería de criptomonedas detectado", type: "warning" }
];

let logIndex = 0;

// === FUNCIONES DE UTILIDAD ===

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function triggerGlitch() {
    console.log('⚡ Glitch effect triggered');
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);
}

function scheduleRandomGlitch() {
    const delay = randomBetween(CONFIG.glitchInterval.min, CONFIG.glitchInterval.max);
    glitchInterval = setTimeout(() => {
        if (gameActive) {
            triggerGlitch();
            scheduleRandomGlitch();
        }
    }, delay);
}

// === SISTEMA DE LOGS ===

function addSystemLog(message, type = 'normal') {
    console.log(`[LOG ${type.toUpperCase()}] ${message}`);
    
    const logsContainer = document.getElementById('terminal-logs');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    
    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';
    timestamp.textContent = `[${getCurrentTime()}]`;
    
    const msgText = document.createElement('span');
    
    // Añadir prefijo según tipo
    let prefix = '';
    switch(type) {
        case 'critical':
            prefix = '[CRÍTICO] ';
            break;
        case 'warning':
            prefix = '[ALERTA] ';
            break;
        case 'success':
            prefix = '[ÉXITO] ';
            break;
        case 'normal':
            prefix = '[INFO] ';
            break;
    }
    
    msgText.textContent = prefix + message;
    
    logEntry.appendChild(timestamp);
    logEntry.appendChild(msgText);
    logsContainer.appendChild(logEntry);
    
    // Limitar a últimas 50 líneas
    const logs = logsContainer.querySelectorAll('.log-entry');
    if (logs.length > 50) {
        logs[0].remove();
    }
    
    // Auto-scroll al final - forzar scroll inmediatamente
    logsContainer.scrollTop = logsContainer.scrollHeight;
    
    // También hacer scroll con requestAnimationFrame para asegurar renderizado
    requestAnimationFrame(() => {
        logsContainer.scrollTop = logsContainer.scrollHeight;
    });
}

function startAutoLogs() {
    logInterval = setInterval(() => {
        if (gameActive && logIndex < systemLogs.length) {
            const log = systemLogs[logIndex];
            addSystemLog(log.msg, log.type);
            logIndex++;
            
            // Si llegamos al final, reiniciar con variaciones
            if (logIndex >= systemLogs.length) {
                logIndex = randomBetween(0, Math.floor(systemLogs.length / 2));
            }
        }
    }, CONFIG.logInterval);
}

// === SISTEMA DE SALUD ===

function updateSystemHealth(amount) {
    console.log(`💚 Health update: ${systemHealth} -> ${systemHealth + amount}`);
    systemHealth = Math.max(0, Math.min(100, systemHealth + amount));
    
    const healthBar = document.getElementById('health-bar');
    const healthText = document.getElementById('health-text');
    
    healthBar.style.width = systemHealth + '%';
    healthText.textContent = Math.round(systemHealth) + '%';
    
    // Cambiar estilo según nivel de salud
    if (systemHealth <= 20) {
        healthBar.classList.add('low');
        document.body.style.animation = 'pulse-red 0.5s infinite';
    } else {
        healthBar.classList.remove('low');
        document.body.style.animation = '';
    }
    
    // Game Over si llega a 0
    if (systemHealth <= 0) {
        gameOver();
    }
}

function startHealthDecrease() {
    healthInterval = setInterval(() => {
        if (gameActive) {
            const decrease = -2 - (failedScenarios.length * 0.5); // Más rápido si hay fallos
            updateSystemHealth(decrease);
            addSystemLog(`Integridad del sistema: ${Math.round(systemHealth)}%`, 'warning');
        }
    }, CONFIG.healthDecreaseInterval);
}

// === SISTEMA DE AMENAZAS ===

function updateThreatsCounter() {
    const counter = document.getElementById('threats-counter');
    const number = counter.querySelector('.threat-number');
    number.textContent = threatsDetected;
    
    // Animación de actualización
    number.style.transform = 'scale(1.3)';
    setTimeout(() => {
        number.style.transform = 'scale(1)';
    }, 300);
}

function addThreatToList(threatName) {
    const list = document.getElementById('threats-list');
    const item = document.createElement('div');
    item.className = 'threat-item';
    
    const icons = {
        ransomware: '🔒',
        phishing: '📧',
        malware: '☠️',
        databreach: '🚨'
    };
    
    item.textContent = `${icons[threatName]} ${threatName.toUpperCase()} detectado`;
    list.insertBefore(item, list.firstChild);
}

// === GESTIÓN DE ESCENARIOS ===

function launchScenario(scenarioName) {
    if (!gameActive) return;
    
    console.log(`🎮 Launching scenario: ${scenarioName}`);
    
    threatsDetected++;
    updateThreatsCounter();
    addThreatToList(scenarioName);
    
    addSystemLog(`⚠️ AMENAZA CRÍTICA: ${scenarioName.toUpperCase()} DETECTADO`, 'critical');
    triggerGlitch();
    
    // Reducir salud del sistema
    updateSystemHealth(-15);
    
    // Mostrar modal del escenario
    const modal = document.getElementById(`modal-${scenarioName}`);
    modal.classList.add('active');
    
    // Activar efecto Matrix en el modal (con pequeño delay para asegurar renderizado)
    setTimeout(() => {
        generateModalMatrixEffect(modal);
    }, 100);
    
    // Iniciar mini-juego específico
    switch(scenarioName) {
        case 'ransomware':
            startRansomwareGame();
            break;
        case 'phishing':
            startPhishingGame();
            break;
        case 'malware':
            startMalwareGame();
            break;
        case 'databreach':
            startDataBreachGame();
            break;
    }
}

function closeScenario(scenarioName, success) {
    console.log(`🏁 Closing scenario: ${scenarioName}, success: ${success}`);
    
    const modal = document.getElementById(`modal-${scenarioName}`);
    modal.classList.remove('active');
    
    // Limpiar efecto Matrix del modal
    const matrixBg = modal.querySelector('.modal-matrix-bg');
    if (matrixBg) {
        matrixBg.innerHTML = '';
    }
    
    if (success) {
        score += 50;
        completedScenarios.push(scenarioName);
        addSystemLog(`✓ Amenaza ${scenarioName.toUpperCase()} neutralizada exitosamente`, 'success');
        updateSystemHealth(10); // Bonus de salud
    } else {
        failedScenarios.push(scenarioName);
        addSystemLog(`✗ Fallo al neutralizar ${scenarioName.toUpperCase()} - Sistema comprometido`, 'critical');
        updateSystemHealth(-10); // Penalización adicional
    }
    
    currentScenario++;
    
    // Programar siguiente escenario o finalizar
    if (currentScenario < scenarios.length && gameActive) {
        const delay = randomBetween(CONFIG.scenarioInterval.min, CONFIG.scenarioInterval.max);
        console.log(`⏰ Next scenario in ${delay}ms`);
        scenarioTimeout = setTimeout(() => {
            launchScenario(scenarios[currentScenario]);
        }, delay);
    } else if (currentScenario >= scenarios.length) {
        // Todos los escenarios completados
        setTimeout(() => {
            victory();
        }, 3000);
    }
}

// === MINI-JUEGOS ===

// RANSOMWARE - Encontrar la clave en código binario
let ransomwareTimer = 60;
let ransomwareInterval = null;
let keysToFind = [];
let keysFound = 0;

function startRansomwareGame() {
    console.log('🔒 Starting Ransomware game');
    
    ransomwareTimer = 60;
    keysToFind = [];
    keysFound = 0;
    
    // Generar matriz de binarios
    const matrix = document.getElementById('binary-matrix');
    matrix.innerHTML = '';
    
    const totalChars = 100;
    const keyPositions = [];
    
    // Seleccionar 5 posiciones aleatorias para las claves
    while (keyPositions.length < 5) {
        const pos = randomBetween(0, totalChars - 1);
        if (!keyPositions.includes(pos)) {
            keyPositions.push(pos);
        }
    }
    
    // Generar caracteres
    for (let i = 0; i < totalChars; i++) {
        const char = document.createElement('div');
        char.className = 'binary-char';
        
        if (keyPositions.includes(i)) {
            // Las claves son números del 2-9 (NO binarios)
            char.textContent = randomBetween(2, 9);
            char.classList.add('key-char');
            char.dataset.key = 'true';
            keysToFind.push(char);
        } else {
            // El resto son 0 o 1 (binarios)
            char.textContent = randomBetween(0, 1);
        }
        
        char.addEventListener('click', () => {
            if (char.dataset.key === 'true' && !char.classList.contains('found')) {
                char.classList.add('found');
                keysFound++;
                document.getElementById('keys-found').textContent = keysFound;
                document.getElementById('ransomware-progress').style.width = (keysFound / 5 * 100) + '%';
                
                if (keysFound === 5) {
                    clearInterval(ransomwareInterval);
                    closeScenario('ransomware', true);
                }
            }
        });
        
        matrix.appendChild(char);
    }
    
    // Timer
    document.getElementById('ransomware-timer').textContent = formatTime(ransomwareTimer);
    ransomwareInterval = setInterval(() => {
        ransomwareTimer--;
        document.getElementById('ransomware-timer').textContent = formatTime(ransomwareTimer);
        
        if (ransomwareTimer <= 0) {
            clearInterval(ransomwareInterval);
            closeScenario('ransomware', false);
        }
    }, 1000);
}

// PHISHING - Identificar elementos sospechosos
let phishingFound = 0;
const phishingTotal = 5;

function startPhishingGame() {
    console.log('📧 Starting Phishing game');
    
    phishingFound = 0;
    document.getElementById('phishing-found').textContent = '0';
    
    // Generar email aleatorio
    generateRandomPhishingEmail();
    
    // Resetear elementos sospechosos
    const suspiciousElements = document.querySelectorAll('#modal-phishing .suspicious');
    suspiciousElements.forEach(element => {
        element.classList.remove('identified');
        element.style.pointerEvents = 'auto';
        
        // Remover event listener anterior si existe
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        
        newElement.addEventListener('click', function handleClick() {
            if (this.dataset.suspicious === 'true' && !this.classList.contains('identified')) {
                this.classList.add('identified');
                phishingFound++;
                document.getElementById('phishing-found').textContent = phishingFound;
                
                // Mostrar hint
                const hint = this.dataset.hint;
                addSystemLog(`✓ Identificado: ${hint}`, 'success');
                
                if (phishingFound === phishingTotal) {
                    setTimeout(() => {
                        closeScenario('phishing', true);
                    }, 1000);
                }
            }
        });
    });
}

// Generar email de phishing aleatorio
function generateRandomPhishingEmail() {
    const emails = [
        // Email 1: Instituto - Verificación de seguridad
        {
            from: 'urgente_seguridad@institutto.es',
            fromHint: 'Dominio mal escrito (institutto en vez de instituto)',
            to: 'tu_email@instituto.es',
            subject: '⚠️ URGENTE: ACCESO SUSPENDIDO - Verificación Requerida INMEDIATA',
            subjectHint: 'Lenguaje de urgencia extrema',
            date: 'Hoy, 23:47',
            body: `
                <p>Estimado usuario,</p>
                <p class="suspicious" data-suspicious="true" data-hint="Errores ortográficos graves">
                    Hemos detectado <strong>activvidad sospechoza</strong> en su cuenta. 
                    Por razones de seguirdad, su aceso ha sido temporalmente suspendido.
                </p>
                <p>
                    Para <strong>reactivar su cuenta inmediatamente</strong>, debe verificar 
                    su identidad haciendo clic en el siguiente enlace:
                </p>
                <p class="center">
                    <a href="#" class="phishing-link suspicious" 
                       data-suspicious="true" data-hint="URL sospechosa (no coincide con dominio oficial)">
                        🔗 http://instituto-verificacion-segura.tk/login.php
                    </a>
                </p>
                <p class="suspicious" data-suspicious="true" data-hint="Presión de tiempo para no pensar">
                    <strong>⏰ ADVERTENCIA:</strong> Si no verifica su identidad en las próximas 
                    2 horas, su cuenta será <span class="critical">ELIMINADA PERMANENTEMENTE</span>.
                </p>
                <p>Atentamente,<br>
                <span style="color: #888;">Equipo de Seguridad del Instituto</span></p>
            `
        },
        // Email 2: Banco - Premio millonario
        {
            from: 'notificaciones@bancosantander-secure.com',
            fromHint: 'Dominio sospechoso (bancosantander-secure.com no es oficial)',
            to: 'tu_email@gmail.com',
            subject: '🎉 ¡FELICIDADES! Has ganado 50.000€ - Reclama tu premio',
            subjectHint: 'Promesa de dinero fácil (demasiado bueno para ser verdad)',
            date: 'Hoy, 08:15',
            body: `
                <p>Estimado cliente,</p>
                <p>
                    ¡Enhorabuena! Ha sido seleccionado como ganador de nuestro 
                    <strong>sorteo anual de clientes Premium</strong>.
                </p>
                <p class="suspicious" data-suspicious="true" data-hint="Errores gramaticales y ortográficos">
                    Su premio de <strong>50.000€</strong> esta esperando ser reclamado. 
                    Para resivir el dinero, deve completar la verificacion de identidad.
                </p>
                <p class="center">
                    <a href="#" class="phishing-link suspicious" 
                       data-suspicious="true" data-hint="URL con dominio extraño (.tk es sospechoso)">
                        🔗 https://premio-banco-santander.tk/verificar/ganador
                    </a>
                </p>
                <p class="suspicious" data-suspicious="true" data-hint="Presión temporal injustificada">
                    <strong>⏰ IMPORTANTE:</strong> Tiene solo <span class="critical">24 HORAS</span> 
                    para reclamar su premio, después será asignado a otro cliente.
                </p>
                <p>Cordialmente,<br>
                <span style="color: #888;">Departamento de Premios - Banco Santander</span></p>
            `
        },
        // Email 3: Amazon - Paquete retenido
        {
            from: 'envios@amazon-delivery.net',
            fromHint: 'Dominio falso (amazon-delivery.net no es de Amazon)',
            to: 'cliente@email.com',
            subject: '📦 Tu paquete está retenido - Acción requerida',
            subjectHint: 'Urgencia artificial sobre un paquete inexistente',
            date: 'Hoy, 14:32',
            body: `
                <p>Hola,</p>
                <p>
                    Su paquete con número de seguimiento <strong>#ES2847291</strong> 
                    ha sido retenido en nuestro centro de distribución.
                </p>
                <p class="suspicious" data-suspicious="true" data-hint="Faltas de ortografía evidentes">
                    Para liberar el envio, deve abonar las tasas aduaneras pendientes 
                    de <strong>2,95€</strong>. Si no paga en 48 horas, el paquete sera devuelto.
                </p>
                <p class="center">
                    <a href="#" class="phishing-link suspicious" 
                       data-suspicious="true" data-hint="URL sospechosa (no es dominio oficial de Amazon)">
                        🔗 http://amazon-tasas-envio.ml/pagar?id=ES2847291
                    </a>
                </p>
                <p class="suspicious" data-suspicious="true" data-hint="Amenaza de pérdida para crear urgencia">
                    <strong>⚠️ ATENCIÓN:</strong> Si no realiza el pago antes de 
                    <span class="critical">48 HORAS</span>, su paquete será destruido 
                    y no podrá reclamar reembolso.
                </p>
                <p>Saludos,<br>
                <span style="color: #888;">Centro de Logística Amazon</span></p>
            `
        }
    ];
    
    // Seleccionar email aleatorio
    const selectedEmail = emails[randomBetween(0, emails.length - 1)];
    
    // Generar HTML del email
    const emailHTML = `
        <div class="email-header">
            <div class="email-buttons">
                <button class="email-btn">← Volver</button>
                <button class="email-btn">Responder</button>
                <button class="email-btn critical">⚠️ Reportar Spam</button>
            </div>
        </div>
        
        <div class="email-metadata">
            <div class="email-field">
                <strong>De:</strong> 
                <span class="suspicious" data-suspicious="true" data-hint="${selectedEmail.fromHint}">
                    ${selectedEmail.from}
                </span>
            </div>
            <div class="email-field">
                <strong>Para:</strong> ${selectedEmail.to}
            </div>
            <div class="email-field">
                <strong>Asunto:</strong> 
                <span class="suspicious" data-suspicious="true" data-hint="${selectedEmail.subjectHint}">
                    ${selectedEmail.subject}
                </span>
            </div>
            <div class="email-field">
                <strong>Fecha:</strong> ${selectedEmail.date}
            </div>
        </div>
        
        <div class="email-body">
            ${selectedEmail.body}
            
            <div class="email-footer">
                <small style="color: #666;">
                    Este es un mensaje automático. No responda a este correo.
                </small>
            </div>
        </div>
    `;
    
    // Insertar en el contenedor
    document.getElementById('phishing-email-container').innerHTML = emailHTML;
}

// MALWARE - Cerrar ventanas emergentes
let malwareTimer = 45;
let malwareInterval = null;
let popupsClosed = 0;
let popupsTotal = 20;
let popupCreationInterval = null;

function startMalwareGame() {
    console.log('☠️ Starting Malware game');
    
    malwareTimer = 45;
    popupsClosed = 0;
    document.getElementById('popups-closed').textContent = '0';
    document.getElementById('malware-timer').textContent = formatTime(malwareTimer);
    
    const modal = document.getElementById('modal-malware');
    
    // Generar efecto de código cayendo
    generateCodeRainEffect();
    
    let popupsCreated = 0;
    
    // Crear ventanas emergentes progresivamente
    popupCreationInterval = setInterval(() => {
        if (popupsCreated < popupsTotal) {
            createPopup(modal);
            popupsCreated++;
        } else {
            clearInterval(popupCreationInterval);
        }
    }, 800);
    
    // Timer
    malwareInterval = setInterval(() => {
        malwareTimer--;
        document.getElementById('malware-timer').textContent = formatTime(malwareTimer);
        
        if (malwareTimer <= 0) {
            clearInterval(malwareInterval);
            clearInterval(popupCreationInterval);
            closeScenario('malware', false);
        }
    }, 1000);
}

// Generar efecto de código corriendo a alta velocidad
function generateCodeRainEffect() {
    const codeRain = document.querySelector('.code-rain');
    if (!codeRain) return;
    
    codeRain.innerHTML = '';
    const codeSnippets = [
        'system32.dll',
        'keylogger.exe',
        'malware_injection',
        '0x7FFE0000',
        'HKEY_LOCAL_MACHINE',
        'rootkit_module',
        'process_injection',
        'credential_harvester',
        'network_scanner',
        'payload_delivery'
    ];
    
    // Crear múltiples columnas de código
    for (let i = 0; i < 15; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            left: ${i * 7}%;
            top: -100%;
            font-family: 'Courier New', monospace;
            font-size: 0.8em;
            color: var(--terminal-green);
            opacity: 0.8;
            animation: matrixRain ${randomBetween(3, 6)}s linear infinite;
            animation-delay: ${randomBetween(0, 20) * 0.1}s;
        `;
        column.textContent = codeSnippets[randomBetween(0, codeSnippets.length - 1)];
        codeRain.appendChild(column);
    }
}

function createPopup(modal) {
    const popup = document.createElement('div');
    popup.className = 'popup-window';
    
    // Reproducir sonido de apertura de ventana de Windows
    playWindowOpenSound();
    
    // Obtener el modal-content como contenedor
    const modalContent = modal.querySelector('.modal-content');
    
    // Dimensiones del popup
    const popupWidth = 250;
    const popupHeight = 150;
    
    // Obtener dimensiones del contenedor
    const containerWidth = modalContent.clientWidth || 800;
    const containerHeight = modalContent.clientHeight || 600;
    
    // Calcular máximos seguros
    const maxLeft = Math.max(20, containerWidth - popupWidth - 20);
    const maxTop = Math.max(100, containerHeight - popupHeight - 100); // Dejar espacio abajo para instrucciones
    
    // Posición aleatoria (evitando zona superior donde están las instrucciones)
    const left = randomBetween(20, maxLeft);
    const top = randomBetween(100, maxTop); // Empezar desde 100px para evitar header e instrucciones
    
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
    
    const messages = [
        '¡Has ganado un iPhone!',
        'Tu PC está infectado',
        'Actualización urgente requerida',
        'Haz clic aquí para continuar',
        'Error crítico del sistema',
        'Alerta de seguridad',
        'Descarga bloqueada',
        'Conexión perdida',
        'Windows Defender alerta',
        'Virus detectado',
        '💰 Reclama tu premio AHORA',
        '🚨 Sistema comprometido',
        '⚠️ Acción inmediata requerida',
        '🔒 Contraseña expirada',
        '📧 Nuevo mensaje urgente',
        '🎁 Regalo exclusivo para ti',
        '💳 Verifica tu cuenta',
        '⏰ Oferta por tiempo limitado',
        '🛡️ Actualización de seguridad',
        '📱 Sincronización requerida'
    ];
    
    popup.innerHTML = `
        <div class="popup-header">
            <span class="popup-title">${messages[randomBetween(0, messages.length - 1)]}</span>
            <button class="popup-close">×</button>
        </div>
        <div class="popup-body">
            ⚠️ Acción requerida inmediatamente
        </div>
    `;
    
    modalContent.appendChild(popup);
    
    popup.querySelector('.popup-close').addEventListener('click', () => {
        popup.remove();
        popupsClosed++;
        document.getElementById('popups-closed').textContent = popupsClosed;
        
        if (popupsClosed === popupsTotal) {
            clearInterval(malwareInterval);
            clearInterval(popupCreationInterval);
            closeScenario('malware', true);
        }
    });
}

// Función para reproducir sonido de apertura de ventana de Windows XP
function playWindowOpenSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const currentTime = audioContext.currentTime;
        
        // Crear dos osciladores para el sonido característico de Windows XP
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Configurar sonido tipo "ding" de Windows XP (dos tonos armónicos)
        osc1.type = 'sine';
        osc2.type = 'sine';
        
        // Primera nota (más grave)
        osc1.frequency.setValueAtTime(800, currentTime);
        osc1.frequency.exponentialRampToValueAtTime(800, currentTime + 0.08);
        
        // Segunda nota (más aguda, armónico)
        osc2.frequency.setValueAtTime(1200, currentTime);
        osc2.frequency.exponentialRampToValueAtTime(1200, currentTime + 0.08);
        
        // Envelope suave para simular el "ding" de Windows XP
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.15);
        
        osc1.start(currentTime);
        osc1.stop(currentTime + 0.15);
        osc2.start(currentTime);
        osc2.stop(currentTime + 0.15);
    } catch (error) {
        console.log('Audio no disponible:', error);
    }
}

// DATA BREACH - Activar defensas en orden
let dataBreachTimer = 90;
let dataBreachInterval = null;
let defensesActivated = 0;
let currentDefenseOrder = 1;

function startDataBreachGame() {
    console.log('🚨 Starting Data Breach game');
    
    dataBreachTimer = 90;
    defensesActivated = 0;
    currentDefenseOrder = 1;
    document.getElementById('defenses-activated').textContent = '0';
    document.getElementById('databreach-timer').textContent = formatTime(dataBreachTimer);
    
    // Generar efecto Matrix
    generateMatrixEffect();
    
    // Desordenar defensas aleatoriamente
    const defenseGrid = document.querySelector('#modal-databreach .defense-grid');
    const defenseItems = Array.from(document.querySelectorAll('#modal-databreach .defense-item'));
    
    // Algoritmo Fisher-Yates para mezclar aleatoriamente
    for (let i = defenseItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [defenseItems[i], defenseItems[j]] = [defenseItems[j], defenseItems[i]];
    }
    
    // Limpiar el grid y volver a añadir en orden aleatorio
    defenseGrid.innerHTML = '';
    defenseItems.forEach(item => {
        defenseGrid.appendChild(item);
    });
    
    // Resetear defensas y añadir event listeners
    defenseItems.forEach(item => {
        item.classList.remove('active', 'error');
        const button = item.querySelector('.defense-toggle');
        button.disabled = false;
        button.textContent = 'ACTIVAR';
        
        // Clonar botón para remover event listeners previos
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Añadir event listener al botón nuevo
        newButton.addEventListener('click', function() {
            const defenseItem = this.closest('.defense-item');
            const order = parseInt(defenseItem.dataset.order);
            
            if (order === currentDefenseOrder) {
                // Correcto
                defenseItem.classList.add('active');
                this.disabled = true;
                this.textContent = '✓ ACTIVO';
                defensesActivated++;
                currentDefenseOrder++;
                document.getElementById('defenses-activated').textContent = defensesActivated;
                
                addSystemLog(`✓ ${defenseItem.dataset.name.toUpperCase()} activado correctamente`, 'success');
                
                if (defensesActivated === 6) {
                    clearInterval(dataBreachInterval);
                    closeScenario('databreach', true);
                }
            } else {
                // Incorrecto
                defenseItem.classList.add('error');
                setTimeout(() => {
                    defenseItem.classList.remove('error');
                }, 500);
                addSystemLog(`✗ Orden incorrecto - Sigue las pistas`, 'warning');
                updateSystemHealth(-5);
            }
        });
    });
    
    // Timer
    dataBreachInterval = setInterval(() => {
        dataBreachTimer--;
        document.getElementById('databreach-timer').textContent = formatTime(dataBreachTimer);
        
        if (dataBreachTimer <= 0) {
            clearInterval(dataBreachInterval);
            closeScenario('databreach', false);
        }
    }, 1000);
}

function generateMatrixEffect() {
    const columns = document.querySelectorAll('.matrix-column');
    columns.forEach((column, index) => {
        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        let text = '';
        for (let i = 0; i < 50; i++) {
            text += chars[randomBetween(0, chars.length - 1)] + '<br>';
        }
        column.innerHTML = text;
        column.style.animationDelay = (index * 0.5) + 's';
    });
}

// === SISTEMA DE PUNTUACIÓN ===

function calculateScore() {
    let finalScore = Math.round(systemHealth); // Puntos base por salud restante
    finalScore += completedScenarios.length * 50; // +50 por cada escenario completado
    
    if (completedScenarios.length === scenarios.length) {
        finalScore += 100; // Bonus por completar todos
    }
    
    if (systemHealth > 50) {
        finalScore += 50; // Bonus de tiempo/salud
    }
    
    return Math.min(finalScore, 500); // Máximo 500 puntos
}

// === PANTALLAS FINALES ===

function gameOver() {
    console.log('💀 GAME OVER');
    gameActive = false;
    clearAllIntervals();
    
    setTimeout(() => {
        showFinalScreen(false);
    }, 2000);
}

function victory() {
    console.log('🎉 VICTORY!');
    gameActive = false;
    clearAllIntervals();
    showFinalScreen(true);
}

function showFinalScreen(survived) {
    console.log('📊 Showing final screen, survived:', survived);
    
    // Ocultar pantalla principal
    document.getElementById('main-screen').classList.remove('active');
    
    // Mostrar pantalla final
    const finalScreen = document.getElementById('final-screen');
    const finalContent = document.getElementById('final-content');
    
    finalScreen.classList.add('active');
    
    if (!survived) {
        finalContent.classList.add('failed');
    }
    
    const finalScore = calculateScore();
    
    // Generar contenido
    let html = `
        <h1 class="final-title ${survived ? 'success' : 'failed'}">
            ${survived ? '✅ BUGGER NEUTRALIZADO' : '☠️ SISTEMA TOTALMENTE COMPROMETIDO'}
        </h1>
        
        <p style="font-size: 1.3em; margin: 20px 0;">
            ${survived 
                ? 'Has logrado detener al Bugger y restaurar el sistema' 
                : 'El Bugger ha tomado control total del sistema'}
        </p>
        
        <div class="final-score">
            <div>PUNTUACIÓN FINAL</div>
            <div class="score-number">${finalScore} / 500</div>
            <div>${getScoreRank(finalScore)}</div>
        </div>
        
        <div class="final-stats">
            <h3>📊 ESTADÍSTICAS DE LA MISIÓN</h3>
            <div class="stat-item">
                🎯 Amenazas neutralizadas: <strong>${completedScenarios.length} / ${scenarios.length}</strong>
            </div>
            <div class="stat-item">
                ⚠️ Amenazas fallidas: <strong>${failedScenarios.length}</strong>
            </div>
            <div class="stat-item">
                💚 Salud final del sistema: <strong>${Math.round(systemHealth)}%</strong>
            </div>
            <div class="stat-item">
                🛡️ Amenazas detectadas: <strong>${threatsDetected}</strong>
            </div>
        </div>
        
        <div class="concepts-learned">
            <h3>📚 CONCEPTOS APRENDIDOS</h3>
            <ul>
                <li><strong>Ransomware:</strong> Malware que cifra archivos y exige rescate</li>
                <li><strong>Phishing:</strong> Suplantación de identidad para robar credenciales</li>
                <li><strong>Malware:</strong> Software malicioso (virus, troyanos, spyware)</li>
                <li><strong>Data Breach:</strong> Acceso no autorizado a información sensible</li>
                <li><strong>2FA:</strong> Autenticación de dos factores para mayor seguridad</li>
                <li><strong>VPN:</strong> Red privada virtual para cifrar conexiones</li>
            </ul>
        </div>
        
        <div class="qr-section">
            <h3>📱 EVALÚA ESTA EXPERIENCIA</h3>
            <p style="color: black;">Escanea el código QR para completar el formulario de evaluación</p>
            <div class="qr-code">
                <img src="assets/images/qr_formulario.png" alt="QR Formulario" style="width: 200px; height: 200px; border: 3px solid #000; border-radius: 10px; background: white; padding: 10px;">
            </div>
            <p style="color: #666; font-size: 0.9em;">
                Tu opinión nos ayuda a mejorar la experiencia
            </p>
        </div>
        
        <button class="restart-button" id="restart-btn-final">
            🔄 REINICIAR SIMULACIÓN
        </button>
        
        <div style="margin-top: 30px; padding: 20px; background: rgba(0,255,65,0.1); border-radius: 5px;">
            <p style="font-size: 1.1em; line-height: 1.6;">
                💡 <strong>Recuerda:</strong> Estas amenazas son reales y ocurren todos los días.<br>
                Mantén tu software actualizado, usa contraseñas fuertes únicas,<br>
                habilita 2FA siempre que puedas y mantén copias de seguridad regulares.
            </p>
        </div>
    `;
    
    finalContent.innerHTML = html;
    
    // Event listener para reiniciar
    document.getElementById('restart-btn-final').addEventListener('click', resetGame);
}

function getScoreRank(score) {
    if (score >= 400) return '🏆 EXPERTO EN CIBERDEFENSA';
    if (score >= 300) return '🥈 TÉCNICO AVANZADO';
    if (score >= 200) return '🥉 ANALISTA COMPETENTE';
    if (score >= 100) return '⚠️ APRENDIZ EN FORMACIÓN';
    return '☠️ SISTEMA COMPROMETIDO';
}

// === COMANDOS DEL TERMINAL ===

function handleTerminalCommand(command) {
    const input = document.getElementById('terminal-input');
    const cmd = command.toLowerCase().trim();
    
    addSystemLog(`> ${command}`, 'normal');
    
    switch(cmd) {
        case 'help':
            addSystemLog('Comandos disponibles:', 'success');
            addSystemLog('  help - Muestra esta ayuda', 'normal');
            addSystemLog('  status - Estado del sistema', 'normal');
            addSystemLog('  neutralize - Intentar neutralizar amenaza', 'normal');
            addSystemLog('  about - Información del sistema', 'normal');
            break;
            
        case 'status':
            addSystemLog(`Estado del sistema: ${systemHealth > 50 ? 'CRÍTICO' : 'FATAL'}`, 'warning');
            addSystemLog(`Salud: ${Math.round(systemHealth)}%`, 'normal');
            addSystemLog(`Amenazas: ${threatsDetected}`, 'normal');
            addSystemLog(`Escenarios completados: ${completedScenarios.length}/${scenarios.length}`, 'normal');
            break;
            
        case 'neutralize':
            addSystemLog('Iniciando protocolo de neutralización...', 'warning');
            setTimeout(() => {
                if (Math.random() > 0.7) {
                    addSystemLog('✓ Neutralización parcial exitosa (+5% salud)', 'success');
                    updateSystemHealth(5);
                } else {
                    addSystemLog('✗ Neutralización fallida - El Bugger se adaptó', 'critical');
                    updateSystemHealth(-3);
                }
            }, 2000);
            break;
            
        case 'about':
            addSystemLog('=== FATAL T-ERROR v1.0 ===', 'success');
            addSystemLog('Sistema de simulación de incidentes de ciberseguridad', 'normal');
            addSystemLog('Proyecto educativo - Halloween 2025', 'normal');
            addSystemLog('Creado con 💀 y ☕', 'normal');
            break;
            
        default:
            addSystemLog(`Comando no reconocido: ${cmd}`, 'warning');
            addSystemLog('Escribe "help" para ver comandos disponibles', 'normal');
    }
    
    input.value = '';
}

// === FUNCIONES DE CONTROL ===

function clearAllIntervals() {
    if (logInterval) clearInterval(logInterval);
    if (healthInterval) clearInterval(healthInterval);
    if (scenarioTimeout) clearTimeout(scenarioTimeout);
    if (glitchInterval) clearTimeout(glitchInterval);
    if (ransomwareInterval) clearInterval(ransomwareInterval);
    if (malwareInterval) clearInterval(malwareInterval);
    if (popupCreationInterval) clearInterval(popupCreationInterval);
    if (dataBreachInterval) clearInterval(dataBreachInterval);
}

function resetGame() {
    console.log('🔄 Resetting game');
    
    // Reset variables
    systemHealth = 100;
    threatsDetected = 0;
    currentScenario = 0;
    gameActive = false;
    score = 0;
    completedScenarios = [];
    failedScenarios = [];
    logIndex = 0;
    
    // Limpiar intervalos
    clearAllIntervals();
    
    // Reset UI
    document.getElementById('health-bar').style.width = '100%';
    document.getElementById('health-text').textContent = '100%';
    document.getElementById('threats-counter').querySelector('.threat-number').textContent = '0';
    document.getElementById('threats-list').innerHTML = '';
    document.getElementById('terminal-logs').innerHTML = '';
    document.body.style.animation = '';
    
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Ocultar modales
    document.querySelectorAll('.modal-scenario').forEach(modal => {
        modal.classList.remove('active');
    });
    
    // Mostrar splash screen
    document.getElementById('splash-screen').classList.add('active');
}

function initGame() {
    console.log('🎮 Initializing game...');
    
    gameActive = true;
    
    // Ocultar splash screen
    document.getElementById('splash-screen').classList.remove('active');
    
    // Mostrar pantalla principal
    document.getElementById('main-screen').classList.add('active');
    
    // Mensaje inicial
    addSystemLog('Sistema de defensa iniciado', 'success');
    addSystemLog('Analizando amenazas...', 'warning');
    addSystemLog('⚠️ ALERTA: Malware "El Bugger" detectado', 'critical');
    addSystemLog('Nivel de amenaza: MÁXIMO', 'critical');
    addSystemLog('Iniciando protocolos de emergencia...', 'warning');
    
    // Iniciar sistemas
    startAutoLogs();
    startHealthDecrease();
    scheduleRandomGlitch();
    
    // Actualizar reloj en tiempo real
    setInterval(() => {
        document.getElementById('system-time').textContent = getCurrentTime();
    }, 1000);
    
    // Primer escenario después de 5 segundos
    setTimeout(() => {
        launchScenario(scenarios[currentScenario]);
    }, CONFIG.initialDelay);
    
    console.log('✅ Game initialized successfully');
}

// === EVENT LISTENERS ===

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded');
    
    // Botón de inicio
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', initGame);
    }
    
    // Input del terminal
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = e.target.value;
                if (command.trim()) {
                    handleTerminalCommand(command);
                }
            }
        });
    }
    
    // Tecla ESC para cerrar modales (con penalización)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameActive) {
            const activeModal = document.querySelector('.modal-scenario.active');
            if (activeModal) {
                addSystemLog('⚠️ Intento de evasión detectado - Penalización aplicada', 'warning');
                updateSystemHealth(-10);
            }
        }
    });
    
    // Actualizar hora inicial
    document.getElementById('system-time').textContent = getCurrentTime();
    
    console.log('✅ Event listeners registered');
});

// === EFECTO MATRIX DE FONDO ===
let matrixInterval = null;

// Generar efecto Matrix en los modales
function generateModalMatrixEffect(modal) {
    const matrixBg = modal.querySelector('.modal-matrix-bg');
    if (!matrixBg) {
        console.error('❌ No se encontró .modal-matrix-bg en el modal');
        return;
    }
    
    console.log('🎨 Generando efecto Matrix en modal');
    
    // Limpiar efecto anterior si existe
    matrixBg.innerHTML = '';
    
    // Crear más columnas para efecto continuo
    const numColumns = Math.floor(window.innerWidth / 15); // Más columnas (cada 15px en lugar de 20px)
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    console.log(`📊 Creando ${numColumns} columnas Matrix`);
    
    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 15}px`; // Columnas más juntas
        
        // Duración más larga y variada para efecto más natural
        const duration = randomBetween(15, 30); // 15-30 segundos
        const delay = -(randomBetween(0, duration)); // Delay negativo para que empiecen en diferentes posiciones
        
        column.style.animationDuration = `${duration}s`;
        column.style.animationDelay = `${delay}s`;
        
        // Generar más texto para columnas más largas
        let text = '';
        const length = randomBetween(30, 60); // Textos más largos
        for (let j = 0; j < length; j++) {
            text += characters[randomBetween(0, characters.length - 1)] + '\n';
        }
        column.textContent = text;
        
        matrixBg.appendChild(column);
    }
}

function startMatrixEffect() {
    const matrixBg = document.getElementById('matrix-bg-effect');
    if (!matrixBg) return;
    
    // Limpiar efecto anterior si existe
    matrixBg.innerHTML = '';
    
    // Activar visibilidad
    matrixBg.classList.add('active');
    
    // Crear columnas de código cayendo
    const numColumns = Math.floor(window.innerWidth / 20);
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20}px`;
        column.style.animationDuration = `${randomBetween(10, 20)}s`;
        column.style.animationDelay = `${randomBetween(0, 50) * 0.1}s`;
        
        // Generar texto aleatorio
        let text = '';
        const length = randomBetween(10, 30);
        for (let j = 0; j < length; j++) {
            text += characters[randomBetween(0, characters.length - 1)] + '\n';
        }
        column.textContent = text;
        
        matrixBg.appendChild(column);
    }
}

function stopMatrixEffect() {
    const matrixBg = document.getElementById('matrix-bg-effect');
    if (!matrixBg) return;
    
    matrixBg.classList.remove('active');
    
    // Limpiar después de la transición
    setTimeout(() => {
        matrixBg.innerHTML = '';
    }, 500);
}

// === EXPORTS (para debugging en consola) ===
window.FatalTError = {
    systemHealth,
    threatsDetected,
    score,
    completedScenarios,
    failedScenarios,
    forceScenario: (name) => launchScenario(name),
    addHealth: (amount) => updateSystemHealth(amount),
    triggerGlitch,
    resetGame,
    startMatrixEffect,
    stopMatrixEffect
};

console.log('💀 Fatal T-Error cargado. Usa window.FatalTError para debugging');
