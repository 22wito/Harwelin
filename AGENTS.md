# 🎃 EL BUGGER MALDITO - Sistema de Terror Cibernético Interactivo

## Objetivo del Proyecto
Crear una aplicación web de terror interactiva para Halloween que simule un incidente de ciberseguridad real, donde los usuarios experimenten diferentes tipos de ataques mientras aprenden conceptos de protección digital.

## Arquitectura de la Aplicación

### Estructura de Archivos
```
el-bugger-maldito/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── sounds/
│   │   ├── glitch.mp3
│   │   ├── alert.mp3
│   │   └── typing.mp3
│   └── images/
│       └── bugger-logo.png
├── README.md
├── INSTRUCCIONES.md
└── FORMULARIO.md
```

## Especificaciones Técnicas Detalladas

### 1. HTML (index.html)

#### Estructura Principal
- **Pantalla de Inicio (Splash Screen)**
  - Logo del Bugger (ASCII art animado)
  - Texto: "SISTEMA COMPROMETIDO - DETECTADA AMENAZA CRÍTICA"
  - Botón parpadeante: "INICIAR PROTOCOLO DE EMERGENCIA"
  - Efecto de escaneo de líneas (scanlines)
  - Glitch effect en el fondo

- **Pantalla de Terminal Infectada**
  - Header con información del sistema:
    - Fecha y hora en tiempo real
    - IP falsa (192.168.66.13)
    - Estado: "COMPROMETIDO"
    - Barra de salud del sistema (100% → 0%)
  - Terminal interactiva con:
    - Líneas de log del sistema mostrando actividad del Bugger
    - Mensajes que aparecen automáticamente con efecto typewriter
    - Prompt de comandos: `SISTEMA_INFECTADO@bugger:~$`
  - Panel lateral con "AMENAZAS DETECTADAS" contando los ataques

- **Escenarios de Ataque (Modales/Pantallas Completas)**
  
  **Escenario 1: Ransomware Attack**
  - Pantalla roja parpadeante
  - Imagen de candado grande
  - Texto: "TUS ARCHIVOS HAN SIDO CIFRADOS"
  - Contador regresivo: "03:00 minutos para pagar"
  - Mini-juego: Encontrar la clave de descifrado entre código binario
  - Mensaje educativo: Explicación de ransomware y prevención
  
  **Escenario 2: Phishing Trap**
  - Simular un email falso de "urgente_seguridad@instituto.es"
  - Asunto: "ACCESO SUSPENDIDO - Verificación Requerida"
  - Link sospechoso parpadeante
  - Mini-juego: Identificar señales de phishing (5 elementos)
  - Feedback interactivo al hacer hover sobre elementos sospechosos
  
  **Escenario 3: Malware Injection**
  - Pantalla de código corriendo a alta velocidad
  - Ventanas emergentes infinitas (simuladas)
  - Barra de progreso: "Instalando keylogger.exe... 87%"
  - Mini-juego: Click rápido para "cerrar procesos maliciosos"
  - Mensaje educativo: Tipos de malware y protección
  
  **Escenario 4: Data Breach**
  - Efecto Matrix de datos cayendo
  - Mostrar "datos personales filtrados" (ficticios)
  - Alertas de acceso no autorizado
  - Mini-juego: Activar protecciones (firewall, 2FA, VPN)
  - Educación sobre protección de datos

- **Pantalla Final (Supervivencia/Game Over)**
  - Si sobrevive: "BUGGER NEUTRALIZADO - SISTEMA RESTAURADO"
  - Si falla: "SISTEMA TOTALMENTE COMPROMETIDO"
  - Puntuación basada en:
    - Tiempo de respuesta
    - Amenazas neutralizadas
    - Decisiones correctas
  - Resumen educativo de lo aprendido
  - QR code grande para el formulario de evaluación
  - Botón: "Reiniciar Simulación"

### 2. CSS (styles.css)

#### Temas Visuales
- **Paleta de Colores Terror Cibernético**:
  - Background: `#0a0a0a` (negro profundo)
  - Verde terminal: `#00ff41` (Matrix green)
  - Rojo alerta: `#ff0000` / `#8b0000`
  - Amarillo advertencia: `#ffff00`
  - Azul sistema: `#00ffff`
  - Morado glitch: `#ff00ff`

#### Efectos Obligatorios

**Glitch Effect**
```css
@keyframes glitch {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
}

.glitch {
  animation: glitch 0.3s infinite;
  text-shadow: 
    2px 0 #ff00ff,
    -2px 0 #00ffff;
}
```

**Scanlines (efecto CRT)**
```css
.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent 50%,
    rgba(0, 255, 65, 0.03) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  animation: scanline 8s linear infinite;
}
```

**Typing Effect**
```css
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.typing {
  overflow: hidden;
  border-right: .15em solid #00ff41;
  white-space: nowrap;
  animation: 
    typing 3s steps(40, end),
    blink-caret .75s step-end infinite;
}
```

**Screen Shake**
```css
@keyframes screen-shake {
  0%, 100% { transform: translate(0, 0) }
  10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 5px) }
  20%, 40%, 60%, 80% { transform: translate(5px, -5px) }
}
```

**Pulsating Alert**
```css
@keyframes pulse-red {
  0%, 100% { 
    background-color: rgba(139, 0, 0, 0.3);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
  }
  50% { 
    background-color: rgba(255, 0, 0, 0.6);
    box-shadow: 0 0 40px rgba(255, 0, 0, 0.9);
  }
}
```

#### Componentes Específicos

- **Terminal Window**:
  - Font: `'Courier New', monospace`
  - Padding: 20px
  - Border: 2px solid #00ff41
  - Box-shadow: 0 0 20px rgba(0, 255, 65, 0.5)
  - Overflow-y: auto con scrollbar personalizado

- **System Health Bar**:
  - Height: 30px
  - Background: linear gradient de verde a rojo
  - Animación de descenso progresivo
  - Parpadeo cuando está por debajo del 20%

- **Warning Modals**:
  - Z-index alto (9999)
  - Backdrop blur effect
  - Border roja parpadeante
  - Transform scale animation al aparecer

### 3. JavaScript (script.js)

#### Estructura del Código

**Variables Globales**
```javascript
let systemHealth = 100;
let threatsDetected = 0;
let currentScenario = 0;
let gameActive = false;
let score = 0;
const scenarios = ['ransomware', 'phishing', 'malware', 'databreach'];
```

#### Funciones Principales

**1. Inicialización**
```javascript
function initGame() {
  // Ocultar splash screen
  // Mostrar terminal
  // Iniciar log automático
  // Comenzar countdown de salud del sistema
  // Activar sonidos ambiente
  // Iniciar primer escenario después de 5 segundos
}
```

**2. Sistema de Logs**
```javascript
function addSystemLog(message, type) {
  // type: 'normal', 'warning', 'critical', 'success'
  // Crear elemento de log con timestamp
  // Aplicar color según tipo
  // Añadir efecto typewriter
  // Auto-scroll al final
  // Limitar a últimas 50 líneas
}

// Logs automáticos predefinidos:
const systemLogs = [
  "[CRÍTICO] Proceso desconocido 'bugger.exe' detectado",
  "[ALERTA] Intentos de acceso no autorizado: 127 en los últimos 30s",
  "[ERROR] Firewall deshabilitado por entidad externa",
  "[WARNING] Tráfico de red anómalo detectado",
  "[CRÍTICO] Encriptación de archivos en progreso...",
  // ... más mensajes
];
```

**3. Gestión de Escenarios**
```javascript
function launchScenario(scenarioName) {
  // Detener logs temporalmente
  // Reproducir sonido de alerta
  // Aplicar screen shake
  // Mostrar modal del escenario
  // Iniciar mini-juego específico
  // Reducir salud del sistema (-15%)
}

function closeScenario(success) {
  // Si success: añadir puntos, mensaje positivo
  // Si fail: reducir más salud, mensaje negativo
  // Cerrar modal con animación
  // Continuar logs
  // Programar siguiente escenario (15-30s random)
  // Actualizar contador de amenazas
}
```

**4. Mini-juegos**

**Ransomware - Descifrado**
```javascript
function ransomwareGame() {
  // Generar matriz de 100 caracteres binarios
  // 5 caracteres son la clave (color diferente al hover)
  // Temporizador de 60 segundos
  // Click en todos los caracteres correctos = éxito
  // Feedback visual inmediato
}
```

**Phishing - Detección**
```javascript
function phishingGame() {
  // Mostrar email falso
  // 5 elementos sospechosos marcados con data-suspicious
  // Usuario debe hacer click en todos
  // Tooltip explicativo al hacer hover
  // 3 errores permitidos
  // Elementos: dominio extraño, urgencia, errores ortográficos, 
  //           enlaces sospechosos, remitente no verificado
}
```

**Malware - Click Defense**
```javascript
function malwareGame() {
  // Aparecer ventanas emergentes aleatorias (10 total)
  // Click en botón de cerrar antes de que se multipliquen
  // Velocidad aumenta progresivamente
  // Timer: 45 segundos
  // Si no se cierran: se "instala" malware (fail)
}
```

**Data Breach - Activar Defensas**
```javascript
function dataBreachGame() {
  // Panel con 6 toggles de seguridad
  // Opciones: Firewall, Antivirus, 2FA, VPN, Backup, Cifrado
  // Activar todos en el orden correcto (indicado por pistas)
  // Cada acierto: +puntos, cada error: -tiempo
  // 90 segundos límite
}
```

**5. Sistema de Salud**
```javascript
function updateSystemHealth(amount) {
  // Actualizar variable systemHealth
  // Animar barra visual
  // Cambiar colores según nivel
  // Si <= 20%: añadir parpadeo rojo en toda pantalla
  // Si <= 0: triggerear game over
}

function healthDecrease() {
  // Intervalo cada 10 segundos
  // -2% salud automático (amenaza activa)
  // Acelerar si hay escenarios fallidos acumulados
}
```

**6. Sistema de Puntuación**
```javascript
function calculateScore() {
  // Puntos base: systemHealth restante
  // +50 por cada escenario superado
  // +100 por completar todos los escenarios
  // +tiempo bonus si sobrevive con >50% salud
  // Máximo: 500 puntos
}
```

**7. Pantalla Final**
```javascript
function showFinalScreen(survived) {
  // Detener todos los timers
  // Calcular puntuación final
  // Generar resumen:
  //   - Amenazas neutralizadas vs detectadas
  //   - Conceptos aprendidos (lista)
  //   - Tiempo de supervivencia
  // Mostrar QR del formulario
  // Mensaje motivacional educativo
  // Botón restart
}
```

**8. Efectos de Audio**
```javascript
function playSound(soundName) {
  // soundName: 'glitch', 'alert', 'typing', 'success', 'fail'
  // Control de volumen
  // No solapar sonidos
}

function ambientSound() {
  // Loop de sonido de ordenador procesando
  // Volumen bajo constante
  // Intensificar en momentos críticos
}
```

**9. Utilidades**
```javascript
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function formatTime(seconds) {
  // Formato MM:SS
}

function generateQRCode(url) {
  // Generar QR del formulario usando librería
  // O mostrar texto: "Escanea para evaluar"
}
```

#### Event Listeners Necesarios
```javascript
// Iniciar juego
document.getElementById('start-btn').addEventListener('click', initGame);

// Comandos en terminal (Easter eggs)
document.getElementById('terminal-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const command = e.target.value.toLowerCase();
    if (command === 'help') showHelp();
    if (command === 'status') showSystemStatus();
    if (command === 'neutralize') {
      // Intento de neutralizar (mini-juego extra)
    }
  }
});

// Cerrar modales con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && gameActive) {
    // Cerrar modal actual (penalización)
  }
});

// Reiniciar juego
document.getElementById('restart-btn').addEventListener('click', resetGame);
```

#### Configuración de Timing
```javascript
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
```

## Contenido Educativo a Incluir

### Mensajes por Escenario

**Ransomware**
- Definición: Malware que cifra archivos y exige rescate
- Prevención: Backups regulares, no abrir adjuntos sospechosos
- Dato real: WannaCry afectó 200,000 equipos en 2017

**Phishing**
- Definición: Suplantación de identidad para robar datos
- Señales: Urgencia, errores ortográficos, dominios extraños
- Prevención: Verificar remitente, no hacer click en enlaces

**Malware**
- Tipos: Virus, troyanos, spyware, keyloggers, rootkits
- Propagación: Descargas, USBs, sitios comprometidos
- Protección: Antivirus actualizado, descargas de fuentes oficiales

**Data Breach**
- Definición: Acceso no autorizado a información sensible
- Impacto: Robo de identidad, fraude financiero
- Defensas: 2FA, contraseñas fuertes, VPN en redes públicas

## Requisitos Técnicos

### Compatibilidad
- Navegadores: Chrome, Firefox, Edge, Safari (últimas 2 versiones)
- Responsive: Escritorio prioritario (1920x1080), tablet secundario
- No requiere conexión a internet (excepto para QR)

### Performance
- Carga inicial: < 3 segundos
- Animaciones: 60fps constantes
- Sin memory leaks en sesiones largas (30+ minutos)

### Accesibilidad
- Contraste alto por defecto (tema oscuro)
- Tamaños de fuente legibles (mín 16px)
- Botones grandes (mín 44x44px)
- Tooltips informativos

## Assets a Crear

### Sonidos (Opcional - pueden ser efectos CSS si no hay audio)
- glitch.mp3: Sonido de interferencia estática
- alert.mp3: Alarma de sistema crítico
- typing.mp3: Teclas de teclado
- success.mp3: Ding de éxito
- fail.mp3: Buzzer de error

### Imágenes/ASCII Art
- Logo del Bugger (ASCII o texto estilizado)
- Icono de candado (ransomware)
- Icono de email (phishing)
- Icono de calavera/bug (malware)
- Icono de escudo roto (data breach)

## Testing

### Casos de Prueba
1. Completar todos los escenarios exitosamente
2. Fallar todos los escenarios (game over)
3. Mezcla de éxitos y fallos
4. Probar todos los comandos del terminal
5. Verificar que el QR/link del formulario funciona
6. Dejar el juego inactivo (debe continuar logs)
7. Probar en diferentes resoluciones

## Documentación Adicional

### README.md
Debe incluir:
- Título y descripción del proyecto
- Contexto de la actividad de Halloween
- Instrucciones de instalación
- Cómo ejecutar localmente
- Tecnologías utilizadas
- Créditos del equipo
- Licencia (MIT o similar)

### INSTRUCCIONES.md
Para la puesta en escena:
- Configuración del espacio físico
- Lista de materiales necesarios
- Orden de montaje
- Script de interacción con visitantes
- Troubleshooting común

### FORMULARIO.md
Contenido del Google Forms:
- Preguntas de evaluación numeradas
- Escalas de valoración (1-5) con descripciones
- Pregunta abierta final
- Texto introductorio del formulario
- Mensaje de agradecimiento final

## Prioridades de Implementación

### Fase 1 (MVP - Mínimo Viable)
1. Pantalla de inicio funcional
2. Terminal con logs automáticos
3. Un escenario completo (ransomware)
4. Sistema de salud básico
5. Pantalla final con QR

### Fase 2 (Completo)
6. Los 4 escenarios funcionando
7. Todos los efectos visuales
8. Sistema de puntuación
9. Comandos de terminal

### Fase 3 (Polish)
10. Sonidos
11. Optimizaciones de rendimiento
12. Easter eggs
13. Responsive completo

## Consejos para la Actuación

**Rol: Técnicos de Ciberdefensa Corrompidos**
- Estar sentados frente a portátiles con la aplicación
- Actuar nerviosos, tecleando frenéticamente
- Narrar en voz alta lo que ocurre: "¡No, no, se está extendiendo!"
- Interactuar con visitantes: "¿Puedes ayudarnos a neutralizar esto?"
- Dejar que visitantes prueben los mini-juegos
- Explicar conceptos mientras juegan

**Ambientación Recomendada**
- Luces rojas/verdes intermitentes
- Cables por el suelo
- Carteles: "CENTRO DE CIBERDEFENSA", "ACCESO RESTRINGIDO"
- Sonido de ventiladores de PC al máximo
- Proyectar la aplicación en pantalla grande si es posible

## Métricas de Éxito

- **Impacto**: 80% de visitantes califican "susto/impacto" con 4 o 5
- **Aprendizaje**: 90% pueden mencionar al menos 2 conceptos aprendidos
- **Diversión**: 75% califican "experiencia general" con 4 o 5
- **Funcionalidad**: 0 crashes durante toda la sesión

---

## Notas Finales para Copilot

- Priorizar funcionalidad sobre perfección visual
- Código debe ser limpio y comentado
- Usar ES6+ features (const, let, arrow functions, template literals)
- No usar frameworks externos (vanilla JS)
- CSS moderno (Grid, Flexbox, Custom Properties)
- Código debe ser fácilmente modificable para ajustes de última hora
- Incluir muchos console.log para debugging
- Comentarios en español
- Variables y funciones en inglés (buena práctica)

**IMPORTANTE**: La aplicación debe funcionar 100% offline después de cargarla. No dependencies externas excepto opcional QR code generator.