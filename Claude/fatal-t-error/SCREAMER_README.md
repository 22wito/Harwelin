# 👹 Sistema de Screamer - Fatal T-Error

## Descripción

Se ha implementado un sistema de **screamer (susto)** que se activa durante el mini-juego de Ransomware cuando el usuario falla al hacer click en números binarios (0 o 1) en lugar de los números clave (2-9).

---

## 🎮 Mecánica del Juego

### Funcionamiento

1. **Mini-juego Ransomware**: El usuario debe encontrar 5 números NO binarios (2-9) entre una matriz de 100 caracteres (mayormente 0 y 1)

2. **Sistema de Fallos**:
   - ✅ **Click correcto**: En número clave (2-9) → Se marca como encontrado
   - ❌ **Click incorrecto**: En número binario (0-1) → Se cuenta como fallo
   - 🔴 **Efecto visual**: El número parpadeará en rojo al fallar

3. **Penalización por 3 Fallos**:
   - Al tercer fallo en números binarios:
     - ⚡ Se activa el **SCREAMER**
     - 👹 Aparece video + audio de susto
     - ⏱️ Se **restan 5 segundos** del tiempo restante
     - 🔄 El contador de fallos se resetea a 0
     - 🎮 El juego continúa (si queda tiempo)

4. **Game Over**:
   - Si el tiempo llega a 0 después del screamer → Pierdes el ransomware
   - Si completas los 5 números antes de que se acabe el tiempo → Ganas

---

## 📁 Archivos Requeridos

### 1. **scream.mp3** ⭐
**Ubicación**: `Claude/fatal-t-error/assets/sounds/scream.mp3`

**Características**:
- Formato: MP3
- Duración: 2-3 segundos
- Tipo: Grito, sonido terrorífico
- Volumen: Alto (efecto sorpresa)

**Sugerencias**:
- Grito femenino agudo (clásico de películas de terror)
- Sonido distorsionado electrónico
- Mezcla de gritos + glitch
- Efectos de error del sistema

### 2. **scream.mp4** ⭐
**Ubicación**: `Claude/fatal-t-error/assets/sounds/scream.mp4`

**Características**:
- Formato: MP4
- Duración: 2-3 segundos (sincronizado con audio)
- Resolución: Mínimo 720p (mejor 1080p)
- Tipo: Imagen terrorífica que ocupa pantalla completa

**Sugerencias de Contenido**:
- 👹 Cara terrorífica/demonio
- 💀 Calavera con efecto glitch
- 🦇 Criatura de terror
- 🎃 Calabaza animada terrorífica
- 👾 Error del sistema con cara distorsionada
- 🔴 Pantalla roja con símbolo de peligro

**Sitios para Encontrar**:
- Pixabay.com (buscar "horror face", "scary")
- Pexels.com (videos gratuitos de terror)
- Mixkit.co (efectos visuales)
- Crear propio con After Effects

---

## 🎨 Implementación Técnica

### HTML
```html
<!-- SCREAMER MODAL -->
<div id="screamer-modal" class="screamer-modal">
    <video id="screamer-video" class="screamer-video" muted>
        <source src="assets/sounds/scream.mp4" type="video/mp4">
    </video>
    <audio id="screamer-audio">
        <source src="assets/sounds/scream.mp3" type="audio/mpeg">
    </audio>
</div>
```

### CSS
```css
.screamer-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 99999; /* Por encima de todo */
}

.screamer-modal.active {
    display: flex;
}

.screamer-video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Pantalla completa */
}
```

### JavaScript - Lógica Principal
```javascript
// Variables globales
let ransomwareFails = 0; // Contador de fallos

// En el click de números binarios (incorrectos)
if (char.dataset.key !== 'true') {
    ransomwareFails++;
    addSystemLog(`✗ Error: Número binario (${ransomwareFails}/3)`, 'critical');
    
    if (ransomwareFails >= 3) {
        clearInterval(ransomwareInterval);
        
        triggerScreamer(() => {
            // Después del screamer
            ransomwareTimer = Math.max(0, ransomwareTimer - 5); // -5 segundos
            ransomwareFails = 0; // Reset
            
            // Continuar o terminar
            if (ransomwareTimer <= 0) {
                closeScenario('ransomware', false);
            } else {
                // Reanudar timer
                ransomwareInterval = setInterval(() => { /*...*/ }, 1000);
            }
        });
    }
}
```

### Función triggerScreamer()
```javascript
function triggerScreamer(callback) {
    const screamerModal = document.getElementById('screamer-modal');
    const screamerVideo = document.getElementById('screamer-video');
    const screamerAudio = document.getElementById('screamer-audio');
    
    // Mostrar modal
    screamerModal.classList.add('active');
    
    // Reproducir video y audio
    screamerVideo.play();
    screamerAudio.play();
    
    // Ocultar después de 2.5 segundos
    setTimeout(() => {
        screamerModal.classList.remove('active');
        screamerVideo.pause();
        screamerAudio.pause();
        
        if (callback) callback();
    }, 2500);
}
```

---

## 🎯 Flujo Completo del Screamer

```
Usuario juega Ransomware
    ↓
Click en número binario (0 o 1)
    ↓
Fallo registrado (1/3, 2/3, 3/3)
    ↓
Al tercer fallo:
    ↓
[PAUSA DEL TIMER]
    ↓
🎥 SCREAMER: Video + Audio (2.5s)
    ↓
[PANTALLA COMPLETA NEGRA CON VIDEO]
    ↓
Usuario se asusta 👹
    ↓
Screamer termina
    ↓
⏱️ Restar 5 segundos del tiempo
    ↓
🔄 Reset contador de fallos a 0
    ↓
¿Tiempo > 0?
    ├── SÍ → [REANUDAR TIMER] → Juego continúa
    └── NO  → [GAME OVER] → Pierde ransomware
```

---

## ⚠️ Advertencias y Consideraciones

### Para Desarrolladores:
- ✅ Video debe tener `muted` para permitir autoplay
- ✅ Audio se reproduce por separado para control de volumen
- ✅ z-index: 99999 asegura que esté por encima de todo
- ✅ Callback permite ejecutar código después del screamer

### Para Usuarios:
- 🔊 **Volumen**: Asegúrate de tener volumen adecuado para el susto
- ⚠️ **Sensibilidad**: El screamer puede asustar, úsalo con precaución
- 🎮 **Estrategia**: Identifica bien los números NO binarios antes de hacer click
- 📊 **Logs**: El sistema muestra "Error: Número binario (X/3)" en los logs

### Mejoras Futuras:
- [ ] Múltiples screamers aleatorios
- [ ] Intensidad variable según salud del sistema
- [ ] Sonido 3D espacial
- [ ] Vibración en dispositivos móviles (Vibration API)
- [ ] Efectos de post-procesado (distorsión, glitch)
- [ ] Analytics de sustos por usuario

---

## 🧪 Testing

### Cómo Probar:
1. Inicia el juego
2. Espera al escenario de Ransomware
3. Haz click **3 veces en números 0 o 1** (binarios)
4. El screamer se activará automáticamente
5. Verifica que:
   - ✅ Video se reproduce
   - ✅ Audio suena
   - ✅ Se restan 5 segundos
   - ✅ El juego continúa (si hay tiempo)

### Debugging:
```javascript
// En la consola del navegador:
window.FatalTError.triggerScreamer(() => {
    console.log('Screamer terminado!');
});
```

---

## 📊 Métricas de Penalización

| Evento | Penalización | Efecto |
|--------|-------------|--------|
| 1er fallo | Ninguna | Solo log de advertencia |
| 2do fallo | Ninguna | Log de advertencia |
| 3er fallo | **-5 segundos** | Screamer + pérdida de tiempo |
| Tiempo = 0 | **Game Over** | Pierde el ransomware |

---

## 🎃 Sugerencias de Screamers

### Opción 1: Clásico
- Video: Cara de chica de "The Ring" con efecto glitch
- Audio: Grito agudo femenino

### Opción 2: Cyberpunk
- Video: Pantalla roja "ERROR CRÍTICO" con calavera pixelada
- Audio: Alarma electrónica distorsionada + glitch

### Opción 3: Moderno
- Video: Jeff the Killer / Creepypasta
- Audio: Sonido distorsionado + risa demoníaca

### Opción 4: Personalizado
- Video: Logo de "El Bugger" animado terroríficamente
- Audio: Voz distorsionada diciendo "SISTEMA COMPROMETIDO"

---

## 🚀 Inicio Rápido

1. **Descarga o crea**:
   - `scream.mp3` (grito/sonido de terror, 2-3s)
   - `scream.mp4` (video terrorífico, 2-3s)

2. **Coloca en**:
   - `Claude/fatal-t-error/assets/sounds/`

3. **Prueba**:
   - Inicia el juego
   - Ransomware → Click 3 veces en 0 o 1
   - ¡Disfruta el susto! 👹

---

*Implementado: 31 de Octubre de 2025 - Halloween Edition* 🎃  
*Versión: Fatal T-Error v1.2 - Screamer Update*
