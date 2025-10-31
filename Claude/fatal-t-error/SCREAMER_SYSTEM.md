# 🎃 Sistema de Screamer - Ransomware

## 📋 Mecánica Actualizada

### Funcionamiento del Screamer en Ransomware

El screamer ahora se activa **en cada fallo**, no solo al tercer fallo:

#### 🎯 Reglas del Juego

1. **Objetivo**: Encontrar 5 claves numéricas (números del 2-9) entre 100 caracteres binarios (0 y 1)

2. **Al Acertar** (Click en clave correcta):
   - ✅ Se marca la clave como encontrada
   - ✅ Progreso aumenta (barra verde)
   - ✅ Mensaje: "Clave X/5 encontrada"
   - ✅ Si completas las 5 claves = VICTORIA

3. **Al Fallar** (Click en número binario 0 o 1):
   - ❌ Contador de fallos aumenta (X/3)
   - 👹 **SCREAMER SE ACTIVA INMEDIATAMENTE** (1.5 segundos)
   - 🔄 La matriz binaria se **regenera completamente** con nuevos números aleatorios
   - 🎯 Las 5 claves cambian de posición
   - ⏰ El timer continúa corriendo
   - 🔁 El juego continúa (si no es el tercer fallo)

4. **Al Tercer Fallo**:
   - 👹 SCREAMER se activa
   - 💀 Después del screamer: **GAME OVER del minijuego**
   - ❌ Ransomware te gana
   - 💔 Pierdes -15% de salud del sistema
   - 📊 Se marca como escenario fallido

---

## ⚙️ Implementación Técnica

### Funciones Principales

#### `generateBinaryMatrix()`
```javascript
- Genera matriz de 100 caracteres
- 5 claves aleatorias (números 2-9)
- 95 caracteres binarios (0 o 1) ALEATORIOS
- Se ejecuta en: inicio del juego y después de cada fallo
```

#### `handleBinaryClick(e)`
```javascript
- Detecta si el click es en clave o binario
- Si es CLAVE: marca como encontrada, suma progreso
- Si es BINARIO: 
  1. Incrementa contador de fallos
  2. Activa screamer (1.5s)
  3. Si fallos < 3: regenera matriz y continúa
  4. Si fallos = 3: cierra escenario como fallido
```

#### `triggerScreamer(callback)`
```javascript
- Duración: 1.5 segundos (reducido para múltiples activaciones)
- Muestra video en pantalla completa
- Reproduce audio a volumen máximo
- Ejecuta callback al finalizar
```

---

## 🎬 Flujo de Juego

### Escenario Normal (Victoria)
```
Inicio → Fallo 1 (screamer) → Regenera matriz → 
Fallo 2 (screamer) → Regenera matriz → 
Encuentra todas las claves → VICTORIA ✅
```

### Escenario de Derrota (3 Fallos)
```
Inicio → Fallo 1 (screamer) → Regenera matriz → 
Fallo 2 (screamer) → Regenera matriz → 
Fallo 3 (screamer) → GAME OVER ❌ (-15% salud)
```

---

## 📊 Logs del Sistema

Durante el juego verás estos mensajes en el terminal:

### Aciertos:
- `✓ Clave 1/5 encontrada`
- `✓ Clave 2/5 encontrada`
- ...etc

### Fallos:
- `☠️ ERROR: Código incorrecto seleccionado (Fallo 1/3)`
- `🔄 Sistema regenerando códigos de descifrado... (Fallo 1/3)`

### Screamer:
- `👹 SCREAMER ACTIVADO!`
- `✅ Video reproduciendo correctamente`
- `🔚 Finalizando screamer...`

### Derrota:
- `💀 3 FALLOS - RANSOMWARE COMPLETADO. ARCHIVOS CIFRADOS.`

---

## 🎮 Experiencia del Usuario

### Tensión Progresiva
1. **Primer fallo**: Sorpresa inicial con el screamer
2. **Segundo fallo**: Presión aumenta, sabe que un fallo más = derrota
3. **Tercer fallo**: Screamer final y pérdida del minijuego

### Regeneración de Matriz
- Cada fallo cambia completamente los números binarios (0 y 1)
- Las 5 claves se reubican en nuevas posiciones aleatorias
- Esto aumenta la dificultad y evita memorización

### Duración del Screamer
- **1.5 segundos**: Suficiente para el susto, no demasiado largo
- Permite que el juego fluya rápidamente
- 3 screamers en total pueden sumar 4.5 segundos de "pérdida" de tiempo

---

## 🔧 Archivos Modificados

### script.js
- Nueva función: `generateBinaryMatrix()`
- Nueva función: `handleBinaryClick(e)`
- Modificada: `startRansomwareGame()`
- Modificada: `triggerScreamer()` - duración reducida a 1.5s

### index.html
- Video del screamer apunta a: `assets/images/scream.mp4`
- Atributos: `playsinline preload="auto"`

---

## 🎃 Halloween Vibes

Este sistema crea una experiencia de terror progresivo:
- El usuario nunca sabe cuándo fallará
- Cada fallo es un susto inmediato
- La presión aumenta con cada fallo
- La regeneración de la matriz añade dificultad
- El timer sigue corriendo durante todo

**¡Perfecto para una experiencia de Halloween interactiva! 👻**

---

**Última actualización**: 31 de octubre de 2025
**Versión**: 2.0 - Sistema de Screamer Múltiple
