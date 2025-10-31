# 🔊 Assets de Audio

## 🎵 **REQUERIDO: Música de Fondo**

### **fondo.mp3** ⭐ IMPORTANTE
**Este archivo DEBE estar presente para la música de fondo**
- **Nombre exacto**: `fondo.mp3` (en minúsculas)
- **Formato**: MP3
- **Función**: Música de fondo continua durante toda la sesión
- **Características**:
  - Se reproduce en loop automático
  - Volumen ajustable (0-100%) desde la interfaz
  - Inicia al presionar "INICIAR PROTOCOLO DE EMERGENCIA"

**📁 Coloca tu archivo aquí**: `fondo.mp3`

**📖 Documentación completa**: Ver `AUDIO_README.md` en la raíz del proyecto

---

## 👹 **REQUERIDO: Screamer (Susto)**

### **scream.mp3** ⭐ IMPORTANTE
**Audio del screamer que se reproduce al fallar 3 veces en ransomware**
- **Nombre exacto**: `scream.mp3` (en minúsculas)
- **Formato**: MP3
- **Función**: Sonido de grito/susto
- **Características**:
  - Se activa automáticamente al fallar 3 veces en binarios
  - Duración recomendada: 2-3 segundos
  - Volumen alto para efecto sorpresa

### **scream.mp4** ⭐ IMPORTANTE
**Video del screamer que se muestra al fallar 3 veces en ransomware**
- **Nombre exacto**: `scream.mp4` (en minúsculas)
- **Formato**: MP4
- **Función**: Video de susto en pantalla completa
- **Características**:
  - Se muestra en pantalla completa
  - Duración recomendada: 2-3 segundos
  - Imagen impactante (cara terrorífica, etc.)

**⚠️ Penalización**: Después del screamer se restan **5 segundos** del tiempo restante

**📁 Coloca tus archivos aquí**: `scream.mp3` y `scream.mp4`

---

## 🔊 Efectos de Sonido Adicionales (Opcional - Futuras versiones)

La aplicación también puede tener estos efectos opcionales:

## Archivos de Sonido Recomendados

### glitch.mp3
- Efecto de interferencia estática/glitch
- Duración: 1-2 segundos
- Se reproduce en transiciones y momentos críticos

### alert.mp3
- Sonido de alarma de sistema crítico
- Duración: 2-3 segundos
- Se reproduce cuando aparecen los escenarios de ataque

### typing.mp3
- Sonido de teclas de teclado
- Duración: 0.5-1 segundo
- Opcional para el terminal

### success.mp3
- Sonido de éxito ("ding")
- Duración: 1 segundo
- Se reproduce al completar escenarios exitosamente

### fail.mp3
- Sonido de error ("buzzer")
- Duración: 1-2 segundos
- Se reproduce al fallar escenarios

## Fuentes Recomendadas para Obtener Sonidos

1. **Freesound.org** (licencia Creative Commons)
2. **Zapsplat.com** (sonidos gratuitos)
3. **Mixkit.co** (efectos de sonido libres)
4. **YouTube Audio Library**

## Nota
Si no añades archivos de audio, la aplicación funcionará igualmente bien solo con efectos visuales.
