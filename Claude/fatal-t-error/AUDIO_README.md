# 🎵 Configuración de Audio - Fatal T-Error

## Música de Fondo

### 📁 Ubicación del Archivo
Coloca tu archivo de música en:
```
Claude/fatal-t-error/assets/sounds/fondo.mp3
```

### ✅ Requisitos del Archivo
- **Nombre**: `fondo.mp3` (exactamente así, en minúsculas)
- **Formato**: MP3
- **Recomendaciones**:
  - Duración: 2-5 minutos (se reproduce en loop)
  - Bitrate: 128-192 kbps (balance entre calidad y tamaño)
  - Volumen: Normalizado (no muy alto)
  - Estilo: Música ambiental oscura, electrónica inquietante, o terror cibernético

### 🎮 Funcionalidad

#### Reproducción Automática
- ✅ La música **inicia automáticamente** cuando el usuario presiona "INICIAR PROTOCOLO DE EMERGENCIA"
- ✅ Se reproduce en **loop continuo** durante toda la sesión
- ✅ Se **detiene automáticamente** al reiniciar el juego

#### Control de Volumen
- 🔊 Control deslizante visible en la pantalla de inicio
- 📊 Rango: 0-100%
- ⚙️ Volumen inicial: 30% (ajustable en tiempo real)
- 💾 El volumen se mantiene durante toda la sesión

### 🎨 Interfaz de Usuario

El control de volumen aparece en la pantalla de inicio:
```
🔊 Volumen: 30%
[════════○══════════]
```

- Desliza el control para ajustar el volumen
- El porcentaje se actualiza en tiempo real
- Color verde neón acorde con el tema cyberpunk

### 🔧 Implementación Técnica

#### HTML
```html
<audio id="background-music" loop>
    <source src="assets/sounds/fondo.mp3" type="audio/mpeg">
</audio>
```

#### JavaScript
```javascript
// Inicialización
backgroundMusic.volume = 0.3; // 30%

// Reproducción al iniciar juego
backgroundMusic.play();

// Detención al reiniciar
backgroundMusic.pause();
backgroundMusic.currentTime = 0;
```

### 🎵 Sugerencias de Música

#### Estilos Recomendados:
1. **Dark Ambient**: Atmósferas inquietantes y tensas
2. **Cyberpunk**: Sintetizadores oscuros estilo Blade Runner
3. **Industrial**: Sonidos mecánicos y distorsionados
4. **Glitch**: Música electrónica con fallos y errores
5. **Horror Game OST**: Bandas sonoras de juegos de terror

#### Características Ideales:
- 🔴 Baja frecuencia (graves profundos)
- 🟢 Sintetizadores analógicos
- 🟡 Sonidos electrónicos distorsionados
- 🔵 Atmósfera tensa pero no abrumadora
- ⚫ Sin vocals (instrumental)

#### Fuentes Libres de Derechos:
- [Freesound.org](https://freesound.org) - Buscar "dark ambient cyberpunk"
- [Incompetech](https://incompetech.com) - Sección "Darker"
- [Purple Planet Music](https://www.purple-planet.com) - Categoría "Sci-Fi"
- [Free Music Archive](https://freemusicarchive.org) - Tag "dark electronic"

### ⚠️ Solución de Problemas

#### La música no se reproduce
1. **Verifica el nombre**: Debe ser exactamente `fondo.mp3`
2. **Verifica la ruta**: `assets/sounds/fondo.mp3`
3. **Verifica el formato**: MP3 (no M4A, WAV, etc.)
4. **Abre la consola**: Busca mensajes de error
5. **Política de autoplay**: Algunos navegadores bloquean autoplay, el usuario debe interactuar primero (presionar el botón de inicio)

#### El volumen no cambia
1. Verifica que el slider esté visible
2. Abre la consola y busca errores de JavaScript
3. Verifica que `backgroundMusic` no sea `null`

#### El audio está cortado o suena mal
1. Verifica el bitrate del MP3 (mínimo 128 kbps)
2. Asegúrate que el archivo no esté corrupto
3. Prueba con otro archivo MP3

### 📊 Compatibilidad de Navegadores

| Navegador | Formato MP3 | Autoplay* |
|-----------|-------------|-----------|
| Chrome 80+ | ✅ | ✅ |
| Firefox 75+ | ✅ | ✅ |
| Safari 13+ | ✅ | ⚠️ |
| Edge 80+ | ✅ | ✅ |

*El autoplay funciona después de interacción del usuario (click en botón)

### 🎯 Próximas Mejoras Sugeridas

- [ ] Añadir efectos de sonido para cada amenaza
- [ ] Botón de mute/unmute rápido
- [ ] Fade in/out al iniciar/terminar
- [ ] Múltiples pistas de audio aleatorias
- [ ] Intensificación de música según salud del sistema
- [ ] Efectos espaciales (reverb, delay) según escenario

---

## 🚀 Inicio Rápido

1. Descarga o crea un archivo MP3 de música cyberpunk oscura
2. Renómbralo a `fondo.mp3`
3. Colócalo en `Claude/fatal-t-error/assets/sounds/`
4. Abre `index.html` en el navegador
5. Ajusta el volumen con el slider
6. Presiona "INICIAR PROTOCOLO DE EMERGENCIA"
7. ¡Disfruta la experiencia inmersiva! 🎃

---

*Implementado: 31 de Octubre de 2025*  
*Versión: Fatal T-Error v1.1 - Audio Update*
