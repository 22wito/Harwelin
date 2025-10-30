# 🚀 Guía de Inicio Rápido - Fatal T-Error

## ⚡ Inicio Rápido (3 pasos)

### 1. Abrir la Aplicación
```bash
# Opción A: Doble clic en index.html
# El archivo se abrirá en tu navegador predeterminado

# Opción B: Arrastra index.html a tu navegador
```

### 2. Pantalla Completa
```
Presiona F11 (Windows/Linux) o Cmd+Ctrl+F (Mac)
```

### 3. ¡Jugar!
```
Haz clic en "INICIAR PROTOCOLO DE EMERGENCIA"
```

---

## 🎮 Cómo Jugar

### Objetivo
Neutralizar las 4 amenazas del malware "El Bugger" antes de que el sistema colapse (salud llegue a 0%).

### Controles
- **Ratón**: Interactuar con elementos, hacer clic en botones
- **Teclado**: Escribir comandos en el terminal
- **ESC**: Cerrar modales (con penalización)

### Mini-Juegos

#### 🔒 Ransomware
- Encuentra los 5 números entre el código binario
- Pasa el ratón para detectar claves
- Límite: 60 segundos

#### 📧 Phishing
- Identifica 5 elementos sospechosos en el email
- Haz clic en cada uno
- Presta atención a: dominio, urgencia, errores, enlaces

#### ☠️ Malware
- Cierra 10 ventanas emergentes
- Haz clic en la X de cada ventana
- Límite: 45 segundos

#### 🚨 Data Breach
- Activa las 6 defensas EN ORDEN
- Lee las pistas (1️⃣ 2️⃣ 3️⃣...)
- Límite: 90 segundos

### Comandos del Terminal
Escribe en el prompt `SISTEMA_INFECTADO@bugger:~$`:

```bash
help        # Muestra ayuda
status      # Estado del sistema
neutralize  # Intenta neutralizar (aleatorio)
about       # Información del sistema
```

---

## 📊 Sistema de Puntuación

| Acción | Puntos |
|--------|--------|
| Salud restante | 1 punto por cada % |
| Escenario completado | +50 puntos |
| Todos completados | +100 puntos bonus |
| Bonus salud >50% | +50 puntos |
| **Máximo** | **500 puntos** |

### Rankings
- 🏆 400-500: Experto en Ciberdefensa
- 🥈 300-399: Técnico Avanzado
- 🥉 200-299: Analista Competente
- ⚠️ 100-199: Aprendiz en Formación
- ☠️ 0-99: Sistema Comprometido

---

## 🐛 Debugging

Si necesitas probar algo específico, abre la consola del navegador (F12) y usa:

```javascript
// Ver estado actual
FatalTError

// Forzar un escenario específico
FatalTError.forceScenario('ransomware')
FatalTError.forceScenario('phishing')
FatalTError.forceScenario('malware')
FatalTError.forceScenario('databreach')

// Añadir/quitar salud
FatalTError.addHealth(20)
FatalTError.addHealth(-20)

// Efecto glitch
FatalTError.triggerGlitch()

// Reiniciar juego
FatalTError.resetGame()
```

---

## ⚙️ Configuración Avanzada

Para modificar tiempos y dificultad, edita en `script.js`:

```javascript
const CONFIG = {
    initialDelay: 5000,        // Delay antes del primer ataque
    scenarioInterval: {
        min: 15000,            // Mínimo entre escenarios
        max: 30000             // Máximo entre escenarios
    },
    healthDecreaseInterval: 10000,  // -2% cada 10s
    logInterval: 3000,         // Nuevo log cada 3s
};
```

---

## 🎭 Para la Actividad

### Configuración Recomendada
1. Abrir en 2-3 portátiles
2. Pantalla completa (F11)
3. Brillo al máximo
4. Sonido desactivado en el navegador (opcional)
5. Tener backup abierto en otra pestaña

### Tips
- Cada partida dura 5-10 minutos
- Dejar que los visitantes interactúen directamente
- Explicar conceptos mientras juegan
- Al final, dirigir al QR para evaluación

---

## 🆘 Troubleshooting

### La aplicación no carga
- Verifica que todos los archivos estén en la misma carpeta
- Prueba con otro navegador (Chrome, Firefox, Edge)

### Los efectos visuales van lentos
- Cierra otras pestañas del navegador
- Reduce el zoom del navegador (Ctrl+0)

### Los mini-juegos no responden
- Recarga la página (F5)
- Verifica que JavaScript esté habilitado

### Reiniciar manualmente
- F5 para recargar
- O usa el botón "Reiniciar Simulación" al final

---

## 📱 QR para Evaluación

Recuerda colocar el QR code del formulario de Google Forms en:
- Pantalla final de la aplicación
- Cartel impreso visible
- Tablet/móvil de respaldo

---

## ✅ Checklist Pre-Actividad

- [ ] Aplicación carga correctamente
- [ ] Todos los escenarios funcionan
- [ ] Pantalla completa configurada
- [ ] Brillo al máximo
- [ ] Navegador no entra en reposo
- [ ] QR code preparado
- [ ] Backup en otra pestaña

---

**¡Que el Bugger te acompañe! 🐛💀🎃**
