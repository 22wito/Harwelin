/* eslint-disable no-console */
// Variables globales del sistema
let systemHealth = 100;
let threatsDetected = 0;
let currentScenarioIndex = 0;
let gameActive = false;
let score = 0;
let completedScenarios = 0;
let failedScenarios = 0;
let scenarioQueue = [];
let gameStartTime = null;
let uptimeTimerId = null;
let clockTimerId = null;
let logTimerId = null;
let healthTimerId = null;
let scenarioLaunchTimeoutId = null;
let activeScenario = null;

const scenarios = ["ransomware", "phishing", "malware", "databreach"];

const CONFIG = {
  initialDelay: 5000,
  scenarioInterval: {
    min: 15000,
    max: 30000
  },
  healthDecreaseInterval: 10000,
  logInterval: 3000,
  glitchInterval: {
    min: 8000,
    max: 20000
  }
};

const DOM = {
  splash: document.getElementById("splash-screen"),
  startBtn: document.getElementById("start-btn"),
  terminalScreen: document.getElementById("terminal-screen"),
  logWrapper: document.getElementById("log-wrapper"),
  healthFill: document.getElementById("health-fill"),
  healthValue: document.getElementById("health-value"),
  healthContainer: document.querySelector(".health-container"),
  threatCount: document.getElementById("threat-count"),
  intelList: document.getElementById("intel-list"),
  uptime: document.getElementById("uptime"),
  clock: document.getElementById("clock"),
  terminalInput: document.getElementById("terminal-input"),
  scenarioContainer: document.getElementById("scenario-container"),
  finalScreen: document.getElementById("final-screen"),
  finalTitle: document.getElementById("final-title"),
  finalSummary: document.getElementById("final-summary"),
  finalScore: document.getElementById("final-score"),
  finalThreats: document.getElementById("final-threats"),
  finalTime: document.getElementById("final-time"),
  finalLessons: document.getElementById("final-lessons"),
  restartBtn: document.getElementById("restart-btn"),
  qrPlaceholder: document.getElementById("qr-placeholder"),
  app: document.getElementById("app")
};

const systemLogs = [
  "[CRÍTICO] Proceso desconocido 'bugger.exe' detectado",
  "[ALERTA] Intentos de acceso no autorizado: 127 en los últimos 30s",
  "[ERROR] Firewall deshabilitado por entidad externa",
  "[WARNING] Tráfico de red anómalo detectado",
  "[CRÍTICO] Encriptación de archivos en progreso...",
  "[INFO] Servicio 'VPN_SEGURA' respondió con latencia alta",
  "[ALERTA] Picos de CPU del 92% en servidores de estudiantes",
  "[CRÍTICO] El Bugger fuerza autenticación en modo bypass",
  "[WARNING] Se detectaron macros sospechosas en documentos compartidos",
  "[ALERTA] IP externa 45.122.194.22 solicitó acceso root",
  "[CRÍTICO] Intento de escalada de privilegios en servidor docente",
  "[INFO] Protocolo de emergencia en cola de activación",
  "[WARNING] Contraseñas de alumnos filtradas en pastebin ficticio",
  "[ALERTA] Comportamiento anómalo en switch principal",
  "[ERROR] El Bugger inyectó scripts en servidor web"
];

const educationalIntel = {
  general: [
    "Mantén copias de seguridad desconectadas para emergencias",
    "Verifica la procedencia de todos los adjuntos de correo",
    "Actualiza tus sistemas y antivirus regularmente",
    "Activa la autenticación multifactor en todas tus cuentas"
  ],
  ransomware: [
    "No pagues rescates: no garantiza recuperar los datos",
    "Los backups son tu defensa más fuerte contra el ransomware",
    "Filtra correos para bloquear adjuntos ejecutables sospechosos"
  ],
  phishing: [
    "Comprueba siempre la URL antes de introducir credenciales",
    "Los atacantes abusan del sentido de urgencia para engañar",
    "Cuidado con remitentes similares a entidades oficiales"
  ],
  malware: [
    "Un keylogger registra cada pulsación de teclado",
    "Usa solo software de fuentes confiables y verificadas",
    "Deshabilita ejecución automática de dispositivos USB"
  ],
  databreach: [
    "Las brechas de datos permiten robo de identidad",
    "Cambia tus contraseñas tras confirmar una filtración",
    "Implementa 2FA para mitigar accesos indebidos"
  ]
};

const SCENARIOS = {
  ransomware: {
    id: "ransomware",
    title: "Ataque Ransomware",
    description: "Tus archivos han sido cifrados. Encuentra los fragmentos correctos de la clave antes de que expire el contador.",
    duration: 60,
    startPenalty: -15,
    failPenalty: -15,
    successBonus: 0,
    lessons: educationalIntel.ransomware,
    build: setupRansomwareScenario,
    successLog: "[ÉXITO] Clave de descifrado recuperada. Cifrado revertido.",
    failLog: "[CRÍTICO] No se recuperó la clave a tiempo. Archivos perdidos."
  },
  phishing: {
    id: "phishing",
    title: "Phishing Trap",
    description: "Analiza el correo urgente y marca las 5 señales de phishing antes de que sea tarde.",
    duration: 50,
    startPenalty: -15,
    failPenalty: -15,
    successBonus: 0,
    lessons: educationalIntel.phishing,
    build: setupPhishingScenario,
    successLog: "[ÉXITO] Correo fraudulento neutralizado. Credenciales protegidas.",
    failLog: "[CRÍTICO] El usuario hizo clic en el enlace malicioso. Credenciales expuestas."
  },
  malware: {
    id: "malware",
    title: "Malware Injection",
    description: "Cierra los procesos maliciosos antes de que el keylogger se instale por completo.",
    duration: 45,
    startPenalty: -15,
    failPenalty: -20,
    successBonus: 5,
    lessons: educationalIntel.malware,
    build: setupMalwareScenario,
    successLog: "[ÉXITO] Instalación de keylogger detenida. Sistemas limpios.",
    failLog: "[CRÍTICO] Keylogger instalado. Monitoreo continuo comprometido."
  },
  databreach: {
    id: "databreach",
    title: "Data Breach",
    description: "Activa las defensas críticas en el orden correcto para frenar la filtración de datos.",
    duration: 70,
    startPenalty: -15,
    failPenalty: -20,
    successBonus: 10,
    lessons: educationalIntel.databreach,
    build: setupDataBreachScenario,
    successLog: "[ÉXITO] Filtración contenida. Controles restaurados.",
    failLog: "[CRÍTICO] Datos exfiltrados. Usuarios notificados."
  }
};

const audioCache = {
  glitch: createAudio("assets/sounds/glitch.mp3"),
  alert: createAudio("assets/sounds/alert.mp3"),
  typing: createAudio("assets/sounds/typing.mp3"),
  success: createAudio("assets/sounds/success.mp3"),
  fail: createAudio("assets/sounds/fail.mp3")
};

function createAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.preload = "auto";
  audio.volume = 0.6;
  return audio;
}

function playSound(name) {
  const clip = audioCache[name];
  if (!clip) return;
  clip.currentTime = 0;
  clip.play().catch((error) => console.warn("Audio bloqueado por el navegador", error));
}

function ambientSound(intensify = false) {
  const baseVolume = intensify ? 0.12 : 0.04;
  Object.values(audioCache).forEach((clip) => {
    clip.loop = false;
    clip.volume = Math.min(0.8, baseVolume + (intensify ? 0.1 : 0));
  });
}

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function initGame() {
  if (gameActive) return;
  console.log("[DEBUG] Iniciando simulación");
  gameActive = true;
  systemHealth = 100;
  threatsDetected = 0;
  currentScenarioIndex = 0;
  completedScenarios = 0;
  failedScenarios = 0;
  score = 0;
  scenarioQueue = shuffle([...scenarios]);
  gameStartTime = Date.now();

  DOM.splash.classList.add("hidden");
  DOM.splash.classList.remove("active");
  DOM.finalScreen.classList.add("hidden");
  DOM.terminalScreen.classList.remove("hidden");
  DOM.terminalScreen.classList.add("active");
  DOM.logWrapper.innerHTML = "";
  DOM.intelList.innerHTML = "";
  DOM.terminalInput.value = "";
  DOM.qrPlaceholder.innerHTML = "Escanea para evaluar";
  DOM.qrPlaceholder.classList.remove("qr-ready");
  DOM.app.classList.remove("game-over");

  updateThreatCount();
  updateIntel("general");
  updateSystemHealth(0);
  startClock();
  startUptime();
  startLogStream();
  startHealthDecay();
  scheduleNextScenario(CONFIG.initialDelay);
  addSystemLog("[INFO] Protocolo de emergencia iniciado", "success");
  addSystemLog("[ALERTA] El Bugger está desplegando múltiples vectores de ataque", "warning");
  ambientSound(false);
}

function resetGame() {
  console.log("[DEBUG] Reiniciando simulación");
  stopAllTimers();
  gameActive = false;
  DOM.terminalScreen.classList.add("hidden");
  DOM.terminalScreen.classList.remove("active");
  DOM.finalScreen.classList.add("hidden");
  DOM.finalScreen.classList.remove("active");
  DOM.splash.classList.remove("hidden");
  DOM.splash.classList.add("active");
}

function startClock() {
  updateClock();
  clearInterval(clockTimerId);
  clockTimerId = setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const formatted = now.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  DOM.clock.textContent = formatted;
}

function startUptime() {
  clearInterval(uptimeTimerId);
  DOM.uptime.textContent = "00:00";
  uptimeTimerId = setInterval(() => {
    if (!gameActive || !gameStartTime) return;
    const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
    DOM.uptime.textContent = formatTime(elapsedSeconds);
  }, 1000);
}

function startLogStream() {
  stopLogStream();
  const firstLog = systemLogs[randomBetween(0, systemLogs.length - 1)];
  addSystemLog(firstLog, "warning");
  logTimerId = setInterval(() => {
    if (!gameActive) return;
    const entry = systemLogs[randomBetween(0, systemLogs.length - 1)];
    const typeChance = Math.random();
    let type = "normal";
    if (typeChance > 0.8) type = "critical";
    else if (typeChance > 0.6) type = "warning";
    addSystemLog(entry, type);
  }, CONFIG.logInterval);
}

function stopLogStream() {
  clearInterval(logTimerId);
  logTimerId = null;
}

function addSystemLog(message, type = "normal") {
  const now = new Date();
  const timestamp = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;

  const timeSpan = document.createElement("span");
  timeSpan.className = "log-timestamp";
  timeSpan.textContent = timestamp;

  const msgSpan = document.createElement("span");
  msgSpan.className = "log-message";
  msgSpan.textContent = message;
  msgSpan.classList.add("typing");

  entry.append(timeSpan, msgSpan);
  DOM.logWrapper.append(entry);
  entry.scrollIntoView({ behavior: "smooth", block: "end" });

  const logs = DOM.logWrapper.querySelectorAll(".log-entry");
  if (logs.length > 50) logs[0].remove();

  playSound("typing");
}

function startHealthDecay() {
  clearInterval(healthTimerId);
  healthTimerId = setInterval(() => {
    if (!gameActive) return;
    updateSystemHealth(-2);
  }, CONFIG.healthDecreaseInterval);
}

function updateSystemHealth(delta) {
  systemHealth = Math.max(0, Math.min(100, systemHealth + delta));
  DOM.healthFill.style.width = `${systemHealth}%`;
  DOM.healthValue.textContent = `${systemHealth}%`;

  if (systemHealth > 60) {
    DOM.healthFill.style.background = "linear-gradient(90deg, #00ff41, #34eb89)";
    DOM.healthContainer.classList.remove("alert-pulse");
  } else if (systemHealth > 20) {
    DOM.healthFill.style.background = "linear-gradient(90deg, #f5d000, #ff8800)";
    DOM.healthContainer.classList.add("alert-pulse");
  } else {
    DOM.healthFill.style.background = "linear-gradient(90deg, #ff8800, #ff0000)";
    DOM.healthContainer.classList.add("alert-pulse");
    DOM.terminalScreen.classList.add("critical-border");
    ambientSound(true);
  }

  if (systemHealth <= 0) {
    triggerGameOver();
  }
}

function updateThreatCount() {
  DOM.threatCount.textContent = threatsDetected.toString();
}

function updateIntel(topic) {
  const list = topic === "general" ? educationalIntel.general : educationalIntel[topic] || [];
  DOM.intelList.innerHTML = "";
  list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    DOM.intelList.append(li);
  });
}

function scheduleNextScenario(delay) {
  clearTimeout(scenarioLaunchTimeoutId);
  if (!gameActive) return;
  if (currentScenarioIndex >= scenarioQueue.length) {
    concludeGame();
    return;
  }
  scenarioLaunchTimeoutId = setTimeout(() => {
    const scenarioName = scenarioQueue[currentScenarioIndex];
    currentScenarioIndex += 1;
    launchScenario(scenarioName);
  }, delay);
}

function launchScenario(name) {
  if (!gameActive || activeScenario) return;
  const config = SCENARIOS[name];
  if (!config) return;

  threatsDetected += 1;
  updateThreatCount();
  updateIntel(name);
  updateSystemHealth(config.startPenalty);
  addSystemLog(`[ATAQUE] ${config.title.toUpperCase()} detectado`, "critical");
  playSound("alert");
  applyScreenShake();

  DOM.scenarioContainer.innerHTML = "";
  DOM.scenarioContainer.classList.remove("hidden");

  const modal = document.createElement("div");
  modal.className = `scenario-modal scenario-${name}`;

  const header = document.createElement("div");
  header.className = "scenario-header";
  const title = document.createElement("h2");
  title.className = "scenario-title";
  title.textContent = config.title;
  const countdown = document.createElement("span");
  countdown.className = "countdown";
  countdown.textContent = formatTime(config.duration);
  header.append(title, countdown);

  const description = document.createElement("p");
  description.className = "scenario-description";
  description.textContent = config.description;

  const body = document.createElement("div");
  body.className = "scenario-body";

  const footer = document.createElement("div");
  footer.className = "scenario-actions";
  const timerBar = document.createElement("div");
  timerBar.className = "timer-bar";
  const timerFill = document.createElement("div");
  timerFill.className = "timer-fill";
  timerBar.append(timerFill);
  const education = document.createElement("p");
  education.className = "education-box";
  education.textContent = config.lessons[0] || "Mantén la calma y aplica los protocolos.";
  footer.append(timerBar, education);

  modal.append(header, description, body, footer);
  DOM.scenarioContainer.append(modal);

  const scenarioState = {
    name,
    config,
    countdown,
    timerFill,
    education,
    timeLeft: config.duration,
    timerId: null,
    lessonIndex: 0,
    cleanup: () => {}
  };

  const onSuccess = () => finishScenario(true, scenarioState);
  const onFail = () => finishScenario(false, scenarioState);

  scenarioState.cleanup = config.build(body, { onSuccess, onFail, educationNode: education, config });
  startScenarioTimer(scenarioState, onFail);
  activeScenario = scenarioState;
}

function startScenarioTimer(state, onTimeout) {
  clearInterval(state.timerId);
  state.timeLeft = state.config.duration;
  state.countdown.textContent = formatTime(state.timeLeft);
  state.timerFill.style.transform = "scaleX(1)";

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    if (state.timeLeft < 0) {
      clearInterval(state.timerId);
      onTimeout();
      return;
    }
    state.countdown.textContent = formatTime(state.timeLeft);
    const progress = state.timeLeft / state.config.duration;
    state.timerFill.style.transform = `scaleX(${Math.max(progress, 0)})`;

    if (state.timeLeft % 15 === 0) {
      state.lessonIndex = (state.lessonIndex + 1) % state.config.lessons.length;
      state.education.textContent = state.config.lessons[state.lessonIndex];
    }
  }, 1000);
}

function finishScenario(success, state) {
  if (!activeScenario || state.name !== activeScenario.name) return;
  console.log(`[DEBUG] Escenario ${state.name} finalizado`, success);
  clearInterval(state.timerId);
  if (typeof state.cleanup === "function") state.cleanup();
  DOM.scenarioContainer.classList.add("hidden");
  DOM.scenarioContainer.innerHTML = "";

  if (success) {
    completedScenarios += 1;
    score += 50 + state.config.successBonus;
    addSystemLog(state.config.successLog, "success");
    playSound("success");
  } else {
    failedScenarios += 1;
    updateSystemHealth(state.config.failPenalty);
    addSystemLog(state.config.failLog, "critical");
    playSound("fail");
  }

  activeScenario = null;
  if (!gameActive) return;

  if (systemHealth <= 0) return;

  if (currentScenarioIndex >= scenarioQueue.length) {
    concludeGame();
  } else {
    const delay = randomBetween(CONFIG.scenarioInterval.min, CONFIG.scenarioInterval.max);
    scheduleNextScenario(delay);
  }
}

function concludeGame() {
  console.log("[DEBUG] Concluyendo juego");
  const survived = failedScenarios < scenarios.length && systemHealth > 0;
  gameActive = false;
  stopAllTimers();
  showFinalScreen(survived);
}

function triggerGameOver() {
  if (!gameActive) return;
  console.log("[DEBUG] Game over");
  gameActive = false;
  stopAllTimers();
  DOM.app.classList.add("game-over");
  addSystemLog("[CRÍTICO] Salud del sistema agotada. El Bugger tomó el control.", "critical");
  showFinalScreen(false);
}

function stopAllTimers() {
  clearInterval(uptimeTimerId);
  clearInterval(clockTimerId);
  clearInterval(logTimerId);
  clearInterval(healthTimerId);
  clearTimeout(scenarioLaunchTimeoutId);
  uptimeTimerId = null;
  clockTimerId = null;
  logTimerId = null;
  healthTimerId = null;
  scenarioLaunchTimeoutId = null;
  if (activeScenario) {
    clearInterval(activeScenario.timerId);
    if (typeof activeScenario.cleanup === "function") activeScenario.cleanup();
    activeScenario = null;
  }
}

function showFinalScreen(survived) {
  const finalScore = calculateScore();
  const totalThreats = completedScenarios + failedScenarios;
  const timeSurvived = gameStartTime ? formatTime(Math.floor((Date.now() - gameStartTime) / 1000)) : "00:00";

  DOM.terminalScreen.classList.add("hidden");
  DOM.terminalScreen.classList.remove("active");
  DOM.finalScreen.classList.remove("hidden");
  DOM.finalScreen.classList.add("active");

  DOM.finalTitle.textContent = survived ? "BUGGER NEUTRALIZADO" : "SISTEMA TOTALMENTE COMPROMETIDO";
  DOM.finalSummary.textContent = survived
    ? "Has mantenido la integridad del sistema y neutralizado al Bugger."
    : "El Bugger dominó los sistemas, pero has recogido valiosa inteligencia.";

  DOM.finalScore.textContent = `${finalScore} / 500`;
  DOM.finalThreats.textContent = `${completedScenarios} / ${totalThreats}`;
  DOM.finalTime.textContent = timeSurvived;

  DOM.finalLessons.innerHTML = "";
  const lessonsTitle = document.createElement("h3");
  lessonsTitle.textContent = "Conceptos clave recordados";
  const lessonList = document.createElement("ul");
  new Set([
    ...educationalIntel.ransomware,
    ...educationalIntel.phishing,
    ...educationalIntel.malware,
    ...educationalIntel.databreach
  ]).forEach((lesson) => {
    const li = document.createElement("li");
    li.textContent = lesson;
    lessonList.append(li);
  });
  DOM.finalLessons.append(lessonsTitle, lessonList);

  generateQRCode("https://forms.gle/tu-formulario");
}

function calculateScore() {
  let total = systemHealth;
  total += completedScenarios * 50;
  if (completedScenarios === scenarios.length) total += 100;
  if (systemHealth > 50 && failedScenarios === 0) total += 50;
  total = Math.min(500, Math.max(0, total));
  score = total;
  return total;
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function formatTime(seconds) {
  const mins = Math.floor(Math.max(seconds, 0) / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(Math.max(seconds, 0) % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function applyScreenShake() {
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 500);
}

function setupRansomwareScenario(container, { onSuccess, onFail }) {
  const grid = document.createElement("div");
  grid.className = "ransomware-grid";
  const binary = Array.from({ length: 100 }, () => (Math.random() > 0.5 ? "1" : "0"));
  const keyIndexes = new Set();
  while (keyIndexes.size < 5) {
    keyIndexes.add(randomBetween(0, 99));
  }

  let found = 0;
  let mistakes = 0;

  binary.forEach((bit, index) => {
    const cell = document.createElement("div");
    cell.className = "ransomware-cell";
    cell.textContent = bit;
    if (keyIndexes.has(index)) cell.classList.add("key-fragment");
    cell.addEventListener("click", () => {
      if (!gameActive || !activeScenario) return;
      if (cell.classList.contains("found") || cell.classList.contains("wrong")) return;
      if (keyIndexes.has(index)) {
        cell.classList.add("found");
        found += 1;
        addSystemLog(`[INFO] Fragmento de clave ${found}/5 asegurado`, "success");
        playSound("success");
        if (found === keyIndexes.size) {
          onSuccess();
        }
      } else {
        mistakes += 1;
        cell.classList.add("wrong");
        addSystemLog("[WARNING] Fragmento inválido seleccionado", "warning");
        if (mistakes >= 5) onFail();
      }
    });
    grid.append(cell);
  });

  container.append(grid);
  return () => {
    grid.querySelectorAll(".ransomware-cell").forEach((cell) => {
      cell.replaceWith(cell.cloneNode(true));
    });
  };
}

function setupPhishingScenario(container, { onSuccess, onFail, educationNode }) {
  const progress = document.createElement("div");
  progress.className = "phishing-progress";
  Array.from({ length: 5 }).forEach(() => {
    const span = document.createElement("span");
    progress.append(span);
  });

  const email = document.createElement("div");
  email.className = "phishing-email";

  const suspiciousFields = [
    {
      label: "Remitente",
      value: "urgente_seguridad@instituto-es.com",
      tooltip: "Dominio sospechoso muy similar al oficial",
      suspicious: true
    },
    {
      label: "Asunto",
      value: "ACCESO SUSPENDIDO - Verificación Requerida",
      tooltip: "Uso de mayúsculas y urgencia",
      suspicious: true
    },
    {
      label: "Hora",
      value: "03:12 AM",
      tooltip: "Envíos a horas inusuales",
      suspicious: true
    },
    {
      label: "Mensaje",
      value: "Hemos detectado actividad no autorizada. Verifica tu cuenta en los próximos 5 minutos.",
      tooltip: "Presión para actuar de inmediato",
      suspicious: true
    },
    {
      label: "Enlace",
      value: "https://instituto.es.seguridad-alerta.com",
      tooltip: "Enlace redirige a dominio distinto",
      suspicious: true
    },
    {
      label: "Firma",
      value: "Departamento de Seguridad - Instituto",
      tooltip: "Sin datos de contacto verificables",
      suspicious: false
    }
  ];

  let hits = 0;
  let mistakes = 0;

  suspiciousFields.forEach((item) => {
    const wrap = document.createElement("div");
    wrap.className = "email-field";
    wrap.dataset.suspicious = item.suspicious.toString();
    const strong = document.createElement("strong");
    strong.textContent = `${item.label}: `;
    const span = document.createElement("span");
    span.textContent = item.value;
    wrap.append(strong, span);
    if (item.suspicious) {
      const tip = document.createElement("span");
      tip.className = "tooltip";
      tip.textContent = item.tooltip;
      wrap.append(tip);
    }

    wrap.addEventListener("click", () => {
      if (!gameActive || !activeScenario) return;
      if (wrap.classList.contains("flagged")) return;
      const suspicious = wrap.dataset.suspicious === "true";
      if (suspicious) {
        hits += 1;
        wrap.classList.add("flagged");
        addSystemLog(`[INFO] Indicador de phishing identificado (${hits}/5)`, "success");
        progress.children[hits - 1].classList.add("active");
        if (hits >= 5) onSuccess();
      } else {
        mistakes += 1;
        wrap.classList.add("incorrect");
        addSystemLog("[ERROR] Señal legítima marcada como phishing", "warning");
        if (mistakes >= 3) onFail();
      }
    });

    email.append(wrap);
  });

  const bodyMsg = document.createElement("div");
  bodyMsg.className = "email-body";
  bodyMsg.innerHTML = "Hola,<br><br>Tu acceso ha sido bloqueado temporalmente. Necesitamos que <strong>verifiques tus datos</strong> de inmediato.";
  email.append(bodyMsg);

  container.append(progress, email);

  return () => {
    educationNode.textContent = "Recuerda: verifica remitente, URL y tono del mensaje.";
  };
}

function setupMalwareScenario(container, { onSuccess, onFail }) {
  const progressInfo = document.createElement("p");
  progressInfo.textContent = "Cierra las ventanas emergentes antes de que el Malware alcance el 100%.";
  const popupGrid = document.createElement("div");
  popupGrid.className = "popup-grid";

  container.append(progressInfo, popupGrid);

  let totalSpawned = 0;
  let closed = 0;
  let spawnIntervalId = null;
  const maxPopups = 10;
  const activePopups = new Set();

  const spawnPopup = () => {
    if (!gameActive || !activeScenario) return;
    if (totalSpawned >= maxPopups) {
      if (activePopups.size === 0 && closed >= maxPopups) onSuccess();
      return;
    }
    totalSpawned += 1;
    const popup = document.createElement("div");
    popup.className = "popup-field";
    popup.style.left = `${randomBetween(5, 60)}%`;
    popup.style.top = `${randomBetween(5, 70)}%`;
    popup.innerHTML = "Instalando keylogger.exe<br><small>Progreso 87%</small>";

    const closeBtn = document.createElement("button");
    closeBtn.className = "popup-close";
    closeBtn.type = "button";
    closeBtn.textContent = "✕";
    closeBtn.addEventListener("click", () => {
      popup.remove();
      activePopups.delete(popup);
      closed += 1;
      addSystemLog(`[INFO] Proceso malicioso finalizado (${closed}/${maxPopups})`, "success");
      if (closed >= maxPopups && activePopups.size === 0) onSuccess();
    });

    popup.append(closeBtn);
    popupGrid.append(popup);
    activePopups.add(popup);

    // Si la ventana permanece demasiado tiempo, falla
    setTimeout(() => {
      if (activePopups.has(popup)) {
        addSystemLog("[CRÍTICO] Proceso malicioso persistió demasiado tiempo", "critical");
        onFail();
      }
    }, randomBetween(4000, 6000));
  };

  spawnIntervalId = setInterval(spawnPopup, 1000);
  spawnPopup();

  return () => {
    clearInterval(spawnIntervalId);
    popupGrid.innerHTML = "";
    activePopups.clear();
  };
}

function setupDataBreachScenario(container, { onSuccess, onFail, educationNode }) {
  const intro = document.createElement("p");
  intro.textContent = "Activa los toggles de defensa en el orden correcto según las pistas.";
  const defensePanel = document.createElement("div");
  defensePanel.className = "defense-panel";

  const defenses = [
    { key: "firewall", label: "Firewall" },
    { key: "antivirus", label: "Antivirus" },
    { key: "2fa", label: "2FA" },
    { key: "vpn", label: "VPN" },
    { key: "backup", label: "Backup" },
    { key: "encryption", label: "Cifrado" }
  ];

  const correctOrder = ["firewall", "antivirus", "vpn", "2fa", "encryption", "backup"];
  let currentIndex = 0;
  let remainingTimeBoost = 0;

  const clue = document.createElement("p");
  clue.className = "clue-text";
  clue.textContent = "Pista: Empieza por la barrera exterior y termina protegiendo la información.";

  defenses.forEach((item) => {
    const toggle = document.createElement("div");
    toggle.className = "defense-toggle";
    toggle.dataset.key = item.key;
    toggle.textContent = item.label;

    toggle.addEventListener("click", () => {
      if (!gameActive || !activeScenario) return;
      const expected = correctOrder[currentIndex];
      if (item.key === expected) {
        toggle.classList.add("active");
        currentIndex += 1;
        addSystemLog(`[INFO] Defensa ${item.label} activada (${currentIndex}/${correctOrder.length})`, "success");
        if (currentIndex >= correctOrder.length) onSuccess();
      } else {
        toggle.classList.add("incorrect");
        setTimeout(() => toggle.classList.remove("incorrect"), 1200);
        addSystemLog(`[WARNING] Defensa ${item.label} activada fuera de orden`, "warning");
        remainingTimeBoost += 5;
        penalizeScenarioTime(5);
        if (remainingTimeBoost >= 15) onFail();
      }
    });

    defensePanel.append(toggle);
  });

  container.append(intro, defensePanel, clue);

  return () => {
    educationNode.textContent = "Las defensas en capas mitigan filtraciones masivas.";
  };
}

function penalizeScenarioTime(seconds) {
  if (!activeScenario) return;
  activeScenario.timeLeft = Math.max(0, activeScenario.timeLeft - seconds);
  activeScenario.countdown.textContent = formatTime(activeScenario.timeLeft);
  const progress = activeScenario.timeLeft / activeScenario.config.duration;
  activeScenario.timerFill.style.transform = `scaleX(${Math.max(progress, 0)})`;
  if (activeScenario.timeLeft <= 0) {
    finishScenario(false, activeScenario);
  }
}

function generateQRCode(url) {
  DOM.qrPlaceholder.innerHTML = "";
  DOM.qrPlaceholder.classList.add("qr-ready");
  const size = 21;
  const qrGrid = document.createElement("div");
  qrGrid.style.display = "grid";
  qrGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  qrGrid.style.width = "100%";
  qrGrid.style.height = "100%";
  qrGrid.style.gap = "1px";

  const seed = Array.from(url).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const cell = document.createElement("div");
      cell.style.background = ((row * size + col + seed) % 3 === 0) ? "#00ff41" : "transparent";
      if (row < 3 && col < 3) cell.style.background = "#00ff41";
      if (row < 3 && col >= size - 3) cell.style.background = "#00ff41";
      if (row >= size - 3 && col < 3) cell.style.background = "#00ff41";
      cell.style.width = "100%";
      cell.style.height = "100%";
      qrGrid.append(cell);
    }
  }
  DOM.qrPlaceholder.append(qrGrid);
}

function handleTerminalCommand(command) {
  const sanitized = command.trim().toLowerCase();
  if (!sanitized) return;
  addSystemLog(`$ ${sanitized}`, "normal");

  switch (sanitized) {
    case "help":
      addSystemLog("Comandos disponibles: help, status, neutralize, intel, clear", "success");
      break;
    case "status":
      addSystemLog(`Salud: ${systemHealth}%, Amenazas: ${completedScenarios + failedScenarios}/${scenarioQueue.length}`, "warning");
      break;
    case "neutralize":
      launchNeutralizeChallenge();
      break;
    case "intel":
      addSystemLog("Intel disponible actualizada en el panel lateral.", "info");
      updateIntel("general");
      break;
    case "clear":
      DOM.logWrapper.innerHTML = "";
      addSystemLog("Terminal limpiado", "info");
      break;
    default:
      addSystemLog("Comando desconocido. Escribe 'help' para asistencia.", "warning");
      break;
  }
}

function launchNeutralizeChallenge() {
  if (!gameActive) {
    addSystemLog("Los protocolos solo funcionan durante la simulación.", "warning");
    return;
  }
  if (activeScenario) {
    addSystemLog("No puedes neutralizar mientras gestionas una amenaza activa.", "warning");
    return;
  }

  const questionContainer = document.createElement("div");
  questionContainer.className = "scenario-modal neutralize-modal";
  questionContainer.innerHTML = `
    <div class="scenario-header">
      <h2 class="scenario-title">Protocolo de Neutralización</h2>
      <span class="countdown">00:20</span>
    </div>
    <p class="scenario-description">Responde correctamente para recuperar estabilidad del sistema.</p>
    <div class="scenario-body">
      <p>Selecciona la medida más efectiva para detener un ataque de phishing en curso:</p>
      <div class="defense-panel neutralize-options">
        <button class="btn" data-correct="false">Restaurar un backup completo</button>
        <button class="btn" data-correct="true">Bloquear el dominio sospechoso y avisar a los usuarios</button>
        <button class="btn" data-correct="false">Reiniciar todos los equipos</button>
        <button class="btn" data-correct="false">Deshabilitar temporalmente la red WiFi</button>
      </div>
    </div>
  `;

  DOM.scenarioContainer.innerHTML = "";
  DOM.scenarioContainer.append(questionContainer);
  DOM.scenarioContainer.classList.remove("hidden");

  let timeLeft = 20;
  const countdown = questionContainer.querySelector(".countdown");
  const timerId = setInterval(() => {
    timeLeft -= 1;
    countdown.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerId);
      closeNeutralize(false);
    }
  }, 1000);

  const closeNeutralize = (success) => {
    clearInterval(timerId);
    DOM.scenarioContainer.classList.add("hidden");
    DOM.scenarioContainer.innerHTML = "";
    if (success) {
      addSystemLog("[ÉXITO] Dominio malicioso bloqueado. El Bugger pierde terreno.", "success");
      updateSystemHealth(10);
      score += 20;
      playSound("success");
    } else {
      addSystemLog("[WARNING] El tiempo expiró. El Bugger sigue atacando.", "warning");
      updateSystemHealth(-5);
    }
  };

  questionContainer.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isCorrect = btn.dataset.correct === "true";
      closeNeutralize(isCorrect);
    });
  });
}

function handleKeydown(event) {
  if (event.key === "Escape" && gameActive && activeScenario) {
    addSystemLog("[ALERTA] Escenario abortado manualmente. Penalización aplicada.", "critical");
    finishScenario(false, activeScenario);
  }
}

DOM.startBtn.addEventListener("click", initGame);
DOM.restartBtn.addEventListener("click", () => {
  resetGame();
});

DOM.terminalInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const { value } = event.target;
    event.target.value = "";
    handleTerminalCommand(value);
  }
});

document.addEventListener("keydown", handleKeydown);

// Limpieza al salir de la pestaña
window.addEventListener("beforeunload", () => {
  stopAllTimers();
});

console.log("[DEBUG] Script del Bugger inicializado");
