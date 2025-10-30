# 🔧 Notas Técnicas - Fatal T-Error

## 📐 Arquitectura del Código

### Flujo Principal
```
1. DOMContentLoaded → Registrar event listeners
2. Usuario hace clic en "Iniciar" → initGame()
3. initGame() → Inicia logs, salud, glitches, primer escenario
4. launchScenario() → Muestra modal y mini-juego
5. Usuario completa/falla → closeScenario()
6. Repetir hasta completar 4 escenarios o salud = 0
7. victory() o gameOver() → showFinalScreen()
```

### Variables Globales Críticas
```javascript
systemHealth      // 0-100, controla barra de vida
threatsDetected   // Contador de amenazas detectadas
currentScenario   // 0-3, índice del escenario actual
gameActive        // boolean, controla si el juego está activo
score             // Puntuación acumulada
completedScenarios // Array de escenarios completados
failedScenarios   // Array de escenarios fallados
```

### Timers e Intervalos
```javascript
logInterval        // setInterval() para logs automáticos
healthInterval     // setInterval() para reducir salud
scenarioTimeout    // setTimeout() para próximo escenario
glitchInterval     // setTimeout() para glitches aleatorios
[scenario]Interval // setInterval() específico de cada mini-juego
```

⚠️ **IMPORTANTE**: Siempre limpiar intervalos con `clearAllIntervals()` antes de reset.

---

## 🎮 Mini-Juegos: Implementación Detallada

### Ransomware Game
**Mecánica**: Encuentra 5 números entre 100 caracteres binarios

```javascript
Elementos clave:
- binary-matrix: Grid 10x10 de caracteres
- key-char: Clase para caracteres clave
- found: Clase cuando se encuentra

Estado:
- keysToFind: Array con elementos DOM de las claves
- keysFound: Contador 0-5
- ransomwareTimer: Countdown 60s
```

**Modificaciones posibles**:
- Cambiar tamaño matriz: Modificar `totalChars` y CSS grid-template-columns
- Ajustar dificultad: Cambiar número de claves o timer
- Feedback visual: Editar clase `.found` en CSS

### Phishing Game
**Mecánica**: Identificar 5 elementos sospechosos en email

```javascript
Elementos clave:
- suspicious: Clase para elementos clickeables
- data-suspicious="true": Marca elementos correctos
- data-hint: Texto explicativo
- identified: Clase cuando se identifica

Estado:
- phishingFound: Contador 0-5
```

**Modificaciones posibles**:
- Añadir más elementos: Agregar spans con clase `suspicious`
- Cambiar dificultad: Modificar `phishingTotal`
- Personalizar email: Editar HTML del modal-phishing

### Malware Game
**Mecánica**: Cerrar 10 ventanas emergentes antes del timer

```javascript
Elementos clave:
- popup-container: Contenedor posicionamiento absoluto
- popup-window: Ventanas generadas dinámicamente
- popup-close: Botón X para cerrar

Estado:
- popupsClosed: Contador 0-10
- popupsTotal: Total ventanas (modificable)
- malwareTimer: Countdown 45s

Funciones:
- createPopup(): Genera ventana en posición aleatoria
```

**Modificaciones posibles**:
- Más ventanas: Cambiar `popupsTotal`
- Velocidad aparición: Modificar interval en `popupCreationInterval`
- Tamaño ventanas: Editar CSS `.popup-window`

### Data Breach Game
**Mecánica**: Activar 6 defensas en orden correcto

```javascript
Elementos clave:
- defense-item: Cada defensa con data-order
- defense-toggle: Botón para activar
- active/error: Clases de estado

Estado:
- defensesActivated: Contador 0-6
- currentDefenseOrder: Orden esperado (1-6)
- dataBreachTimer: Countdown 90s

Validación:
- Click → Verificar si order === currentDefenseOrder
- Correcto: Activar y incrementar
- Incorrecto: Animación error y -5 salud
```

**Modificaciones posibles**:
- Cambiar orden: Modificar `data-order` en HTML
- Más defensas: Añadir elementos con orden secuencial
- Sin pistas: Ocultar `.defense-hint`

---

## 🎨 Sistema de Estilos

### CSS Custom Properties (Variables)
```css
--bg-black: #0a0a0a           /* Fondo principal */
--terminal-green: #00ff41      /* Verde Matrix */
--alert-red: #ff0000           /* Rojo alertas */
--dark-red: #8b0000            /* Rojo oscuro */
--warning-yellow: #ffff00      /* Amarillo advertencias */
--system-blue: #00ffff         /* Azul sistema */
--glitch-purple: #ff00ff       /* Morado glitches */
```

Para cambiar paleta completa, edita estas variables en `:root`.

### Animaciones Clave
```css
@keyframes glitch        /* Efecto RGB shift */
@keyframes scanline      /* Líneas CRT */
@keyframes pulse-red     /* Pulsación roja */
@keyframes screen-shake  /* Temblor pantalla */
@keyframes blink         /* Parpadeo */
@keyframes fadeIn        /* Aparición suave */
@keyframes scaleIn       /* Aparición con escala */
```

**Rendimiento**: Todas las animaciones usan `transform` y `opacity` (GPU aceleradas).

### Responsive Breakpoints
```css
@media (max-width: 1200px)  /* Tablet landscape */
@media (max-width: 768px)   /* Mobile */
```

---

## 🔊 Sistema de Audio (Futuro)

### Implementación Sugerida
```javascript
const sounds = {
    glitch: new Audio('assets/sounds/glitch.mp3'),
    alert: new Audio('assets/sounds/alert.mp3'),
    typing: new Audio('assets/sounds/typing.mp3'),
    success: new Audio('assets/sounds/success.mp3'),
    fail: new Audio('assets/sounds/fail.mp3')
};

function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(e => console.log('Audio blocked:', e));
    }
}
```

**Dónde añadir**:
- `initGame()`: Sonido de inicio
- `launchScenario()`: Alert sound
- `closeScenario()`: Success/fail según resultado
- `triggerGlitch()`: Glitch sound
- `updateSystemHealth()`: Warning cuando baja de 20%

⚠️ **Nota**: Navegadores bloquean audio sin interacción del usuario.

---

## 📊 Sistema de Puntuación

### Fórmula de Cálculo
```javascript
Puntos Base = systemHealth (0-100)
+ (completedScenarios.length × 50)
+ (todos completados ? 100 : 0)
+ (systemHealth > 50 ? 50 : 0)
= Máximo 500 puntos
```

### Desglose Máximo
```
100 pts - Salud final 100%
200 pts - 4 escenarios × 50
100 pts - Bonus todos completados
50 pts  - Bonus tiempo (>50% salud)
50 pts  - Margen extra
────────
500 pts TOTAL
```

### Rankings
Editar en función `getScoreRank()` para personalizar.

---

## 🐛 Debugging y Testing

### Console Commands
```javascript
// Acceso al objeto global
window.FatalTError

// Props útiles
.systemHealth
.threatsDetected
.completedScenarios
.failedScenarios

// Métodos útiles
.forceScenario('nombre')
.addHealth(±amount)
.triggerGlitch()
.resetGame()
```

### Testing Checklist
```
□ Completar todos los escenarios exitosamente
□ Fallar todos los escenarios (verificar game over)
□ Dejar timer a 0 en cada mini-juego
□ Probar comandos terminal (help, status, neutralize, about)
□ Verificar que salud no baja de 0 ni sube de 100
□ Comprobar que logs no exceden 50 entradas
□ Reiniciar juego y verificar reset completo
□ Probar en diferentes navegadores
□ Probar en diferentes resoluciones
□ Verificar memoria (no memory leaks)
```

### Problemas Comunes

**Problema**: Los intervalos no se limpian
```javascript
Solución: Asegurar clearAllIntervals() antes de reset/game over
```

**Problema**: Logs duplicados
```javascript
Solución: Verificar que no hay múltiples intervalos activos
```

**Problema**: Modal no se cierra
```javascript
Solución: Verificar que se llama closeScenario() correctamente
```

**Problema**: Salud negativa
```javascript
Solución: Math.max(0, ...) en updateSystemHealth()
```

---

## 🚀 Optimizaciones

### Performance
1. **Limitar logs**: Máximo 50 entradas en terminal
2. **Usar transform**: Para animaciones (GPU)
3. **requestAnimationFrame**: Para animaciones complejas (futuro)
4. **Evitar reflows**: Batch DOM updates

### Memoria
1. **Limpiar intervalos**: Siempre clearInterval/clearTimeout
2. **Remove event listeners**: En closeScenario si es necesario
3. **Vaciar containers**: innerHTML = '' antes de generar nuevo contenido

### Carga
1. **Inline CSS/JS**: Ya implementado (sin external dependencies)
2. **Preload crítico**: HTML inline en body
3. **Lazy load**: Generar modales dinámicamente (futuro)

---

## 🔮 Futuras Mejoras

### Prioridad Alta
- [ ] Sistema de audio completo
- [ ] Modo multijugador (websockets)
- [ ] Más escenarios (SQL Injection, DDoS, Social Engineering)
- [ ] Dificultades (Fácil, Normal, Difícil)

### Prioridad Media
- [ ] Leaderboard online (Firebase/backend)
- [ ] Estadísticas detalladas por usuario
- [ ] Certificado descargable
- [ ] Modo campaña con historia

### Prioridad Baja
- [ ] Easter eggs ocultos
- [ ] Achievements/badges
- [ ] Skin/temas personalizables
- [ ] Integración con LMS (Moodle)

---

## 📝 Estándares de Código

### Comentarios
```javascript
// Comentarios en español para claridad educativa
// Usar // para línea, /* */ para bloques
// TODO: para tareas pendientes
// FIXME: para bugs conocidos
// XXX: para secciones críticas
```

### Nomenclatura
```javascript
// Variables: camelCase
let systemHealth = 100;

// Constantes: UPPER_SNAKE_CASE o camelCase para objetos
const MAX_HEALTH = 100;
const CONFIG = { ... };

// Funciones: camelCase, verbos
function updateSystemHealth() { }

// Clases CSS: kebab-case
.modal-scenario { }

// IDs: kebab-case
#main-screen { }
```

### Estructura de Funciones
```javascript
function nombreFuncion(param1, param2) {
    // 1. Validación de parámetros
    // 2. Logging/debugging
    // 3. Lógica principal
    // 4. Side effects (DOM, intervals)
    // 5. Return si aplica
}
```

---

## 📚 Referencias y Recursos

### Documentación
- MDN Web Docs: https://developer.mozilla.org
- CSS Tricks: https://css-tricks.com
- JavaScript.info: https://javascript.info

### Inspiración Visual
- Hackertyper.net - Efecto terminal
- Matrix Code Rain - Efecto matriz
- Windows 98 - Estética retro

### Ciberseguridad
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- NIST Cybersecurity: https://www.nist.gov/cybersecurity
- INCIBE: https://www.incibe.es

---

## 📄 Licencia y Créditos

### Proyecto Educativo
Este código es libre para uso educativo y debe ser modificado libremente.

### Créditos
- Concepto: Basado en incidentes reales de ciberseguridad
- Diseño: Inspirado en terminales Unix y cultura hacker
- Educación: INCIBE, OWASP, NIST

---

**Última actualización**: Octubre 2024
**Versión**: 1.0.0
**Mantenedor**: Equipo Fatal T-Error

💀 ¡Feliz hacking ético! 🎃
