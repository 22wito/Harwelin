# 🎃 Fatal T-error
## Simulador Interactivo de Incidentes de Ciberseguridad

![Estado: Comprometido](https://img.shields.io/badge/Estado-COMPROMETIDO-red?style=for-the-badge)
![Amenaza: Crítica](https://img.shields.io/badge/Amenaza-CR%C3%8DTICA-darkred?style=for-the-badge)
![Código: Operacional](https://img.shields.io/badge/C%C3%B3digo-OPERACIONAL-green?style=for-the-badge)

---

## 📋 Descripción del Proyecto

**Fatal T-error** es una aplicación web interactiva de terror educativo creada para la actividad de Halloween del módulo de Ciberseguridad en Entornos de las TIC.

La aplicación simula un **incidente de ciberseguridad real** donde un malware experimental llamado "El Bugger" ha comprometido los sistemas de un instituto. Los usuarios deben enfrentar cuatro escenarios de ataque diferentes mientras aprenden conceptos fundamentales de ciberseguridad.

### 🎯 Objetivos Educativos

- **Ransomware**: Comprender el cifrado malicioso y la importancia de backups
- **Phishing**: Identificar señales de suplantación de identidad
- **Malware**: Conocer tipos de software malicioso y su propagación
- **Data Breach**: Entender la protección de datos personales

---

## 🎮 Características Principales

### 🖥️ Interfaz de Terminal Hackeada
- Sistema de logs en tiempo real con efecto typewriter
- Barra de salud del sistema que desciende progresivamente
- Comandos interactivos del terminal
- Efectos visuales glitch y scanlines (estilo CRT)

### 💀 Cuatro Escenarios de Terror Cibernético
1. **Ransomware Attack**: Encuentra la clave de descifrado en código binario
2. **Phishing Trap**: Identifica 5 señales de un email fraudulento
3. **Malware Injection**: Cierra ventanas emergentes antes de que se multipliquen
4. **Data Breach**: Activa las defensas del sistema en el orden correcto

### 🎨 Efectos Visuales Inmersivos
- Animaciones de glitch RGB
- Pantalla parpadeante en momentos críticos
- Screen shake durante alertas
- Transiciones suaves entre escenarios
- Paleta de colores estilo Matrix/terminal

### 🏆 Sistema de Puntuación
- Puntos basados en salud del sistema restante
- Bonificaciones por escenarios completados
- Tiempo de supervivencia
- Ranking de mejor desempeño

### 📱 Integración con Formulario
- QR code para evaluación inmediata
- Pantalla final con resumen educativo
- Estadísticas de la partida

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Animaciones, Grid, Flexbox, Custom Properties
- **JavaScript (Vanilla)**: Lógica del juego, eventos, manipulación del DOM
- **Sin dependencias externas**: 100% autónomo y offline-first

### Características Técnicas
- ✅ Responsive Design
- ✅ Cross-browser compatible
- ✅ Optimizado para rendimiento (60fps)
- ✅ No requiere conexión a internet (excepto para QR)
- ✅ Código limpio y comentado en español

---

## 📁 Estructura del Proyecto

```
el-bugger-maldito/
│
├── index.html              # Estructura principal de la aplicación
├── styles.css              # Estilos y animaciones
├── script.js               # Lógica del juego y eventos
│
├── assets/                 # Recursos multimedia
│   ├── sounds/            # Efectos de sonido (opcional)
│   │   ├── glitch.mp3
│   │   ├── alert.mp3
│   │   └── typing.mp3
│   └── images/            # Imágenes y logos
│       └── bugger-logo.png
│
├── docs/                   # Documentación del proyecto
│   ├── README.md          # Este archivo
│   ├── AGENTS.md          # Instrucciones para Copilot
│   ├── INSTRUCCIONES.md   # Guía de montaje y actuación
│   └── FORMULARIO.md      # Estructura del Google Forms
│
└── LICENSE                # Licencia MIT
```

---

## 🚀 Instalación y Uso

### Opción 1: Uso Directo (Recomendado)
1. **Descargar el proyecto**
   ```bash
   # Si está en GitHub
   git clone https://github.com/usuario/el-bugger-maldito.git
   
   # O descargar ZIP y extraer
   ```

2. **Abrir la aplicación**
   - Navegar a la carpeta del proyecto
   - Hacer doble clic en `index.html`
   - Se abrirá en el navegador predeterminado

3. **Pantalla completa**
   - Presionar `F11` para modo fullscreen
   - Presionar `ESC` para salir

### Opción 2: Servidor Local (Para desarrollo)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Luego abrir en navegador:
http://localhost:8000
```

### Requisitos del Sistema
- **Navegador**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **Resolución mínima**: 1280x720px (recomendado 1920x1080px)
- **RAM**: 4GB mínimo
- **JavaScript**: Habilitado (obligatorio)

---

## 🎮 Cómo Jugar

### 1. Inicio
- Haz clic en "INICIAR PROTOCOLO DE EMERGENCIA"
- Observa cómo el sistema es infectado por El Bugger

### 2. Durante el Juego
- **Lee los logs del sistema**: Aparecen automáticamente
- **Monitorea la barra de salud**: No dejes que llegue a 0%
- **Responde a los ataques**: Cada escenario aparecerá automáticamente
- **Completa los mini-juegos**: Tienes tiempo limitado

### 3. Comandos del Terminal (Easter Eggs)
Escribe en el prompt `SISTEMA_INFECTADO@bugger:~$`:
- `help` - Muestra ayuda
- `status` - Estado actual del sistema
- `neutralize` - Intenta neutralizar el Bugger (mini-juego secreto)

### 4. Final
- **Sobrevives**: Si completas todos los escenarios
- **Game Over**: Si la salud llega a 0%
- **Evaluación**: Escanea el QR para evaluar la experiencia

---

## 📊 Sistema de Puntuación

| Acción | Puntos |
|--------|--------|
| Salud del sistema restante | 1 punto por cada % |
| Escenario completado | +50 puntos |
| Todos los escenarios superados | +100 puntos |
| Bonus de tiempo (>50% salud) | +50 puntos |
| **Máximo posible** | **500 puntos** |

### Ranking
- 🏆 **400-500**: Experto en Ciberdefensa
- 🥈 **300-399**: Técnico Avanzado
- 🥉 **200-299**: Analista Competente
- ⚠️ **100-199**: Aprendiz en Formación
- ☠️ **0-99**: Sistema Comprometido

---

## 🎭 Uso en la Actividad

Este proyecto está diseñado para ser usado como estación interactiva en el **Túnel del Terror Tecnológico** de Halloween.

### Configuración Recomendada
- **2-3 portátiles**: Con la aplicación abierta
- **1 proyector**: Para proyectar en pared (opcional)
- **Iluminación**: LEDs rojos y verdes
- **Ambientación**: Cables, carteles de advertencia
- **Personal**: 2 personas actuando como "técnicos de ciberdefensa"

Para instrucciones detalladas de montaje y actuación, consultar **[INSTRUCCIONES.md](docs/INSTRUCCIONES.md)**

---

## 🧪 Testing y Validación

### Test Cases Ejecutados
- ✅ Completar los 4 escenarios exitosamente
- ✅ Fallar todos los escenarios (game over)
- ✅ Combinación de éxitos y fallos
- ✅ Comandos del terminal
- ✅ Funcionalidad del QR code
- ✅ Modo inactivo (logs continúan)
- ✅ Diferentes resoluciones de pantalla
- ✅ Compatibilidad cross-browser

### Rendimiento
- Carga inicial: < 2 segundos
- FPS constantes: 60fps
- Sin memory leaks en sesiones de 30+ minutos
- Funciona offline después de la carga inicial

---

## 📝 Conceptos de Ciberseguridad Enseñados

### 1. Ransomware
- **Qué es**: Malware que cifra archivos y exige rescate
- **Cómo prevenirlo**: Backups regulares, no abrir adjuntos sospechosos
- **Caso real**: WannaCry 2017 - 200,000+ equipos afectados

### 2. Phishing
- **Qué es**: Suplantación de identidad para robar credenciales
- **Señales de alerta**: Urgencia, errores ortográficos, dominios extraños
- **Prevención**: Verificar remitente, no hacer clic en enlaces sospechosos

### 3. Malware
- **Tipos**: Virus, troyanos, spyware, keyloggers, rootkits
- **Propagación**: Descargas, USBs infectados, sitios comprometidos
- **Protección**: Antivirus actualizado, descargas solo de fuentes oficiales

### 4. Data Breach
- **Qué es**: Acceso no autorizado a datos sensibles
- **Consecuencias**: Robo de identidad, fraude financiero
- **Defensas**: 2FA, contraseñas fuertes, VPN en redes públicas

---

## 🤝 Contribuciones y Créditos

### Equipo de Desarrollo
- **Desarrollador Principal**: [Tu Nombre]
- **Diseño de Experiencia**: [Nombre del Compañero]
- **Testing y QA**: [Nombre]

### Contexto Académico
- **Instituto**: [Nombre del Instituto]
- **Curso**: Desarrollo de Aplicaciones Web (DAW)
- **Módulo**: Ciberseguridad en Entornos de las TIC
- **Profesor**: [Nombre del Profesor]
- **Fecha**: Halloween 2024

### Agradecimientos
- A todos los visitantes que probaron y evaluaron la aplicación
- A los compañeros de clase por el feedback
- A la comunidad de ciberseguridad por la inspiración

---

## 📜 Licencia

Este proyecto está bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2024 [Tu Nombre/Equipo]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🔗 Enlaces Útiles

- 📖 **Documentación completa**: [AGENTS.md](docs/AGENTS.md)
- 🎬 **Guía de montaje**: [INSTRUCCIONES.md](docs/INSTRUCCIONES.md)
- 📝 **Formulario de evaluación**: [FORMULARIO.md](docs/FORMULARIO.md)
- 🌐 **Repositorio GitHub**: [github.com/usuario/el-bugger-maldito](#)
- 📧 **Contacto**: tu-email@instituto.edu

---

## 📞 Soporte y Contacto

### Durante la Actividad
Si encuentras algún problema:
1. Revisar la sección de **Troubleshooting** en [INSTRUCCIONES.md](docs/INSTRUCCIONES.md)
2. Recargar la página (F5)
3. Usar portátil de backup
4. Contactar al profesor responsable

### Post-Actividad
Para dudas, sugerencias o colaboraciones:
- **Email**: [tu-email]@instituto.edu
- **GitHub Issues**: [Link al repositorio]
- **Horario de consultas**: [Especificar]

---

## 🔮 Futuras Mejoras

### Versión 2.0 (Ideas)
- [ ] Modo multijugador cooperativo
- [ ] Más escenarios (SQL Injection, DDoS, Zero-Day)
- [ ] Sistema de niveles de dificultad
- [ ] Leaderboard global online
- [ ] Versión mobile responsive completa
- [ ] Efectos de sonido profesionales
- [ ] Modo "Campaña" con historia progresiva
- [ ] Integración con plataforma educativa (Moodle)
- [ ] Certificado digital descargable
- [ ] Estadísticas avanzadas por usuario

---

## 🎓 Recursos de Aprendizaje

### Para Profundizar en Ciberseguridad
- **INCIBE**: https://www.incibe.es/
- **OWASP**: https://owasp.org/
- **CIS Controls**: https://www.cisecurity.org/
- **Cybersecurity & Infrastructure Security Agency (CISA)**: https://www.cisa.gov/

### Cursos Recomendados
- Google Cybersecurity Professional Certificate
- CompTIA Security+
- Certified Ethical Hacker (CEH)
- SANS Cyber Aces Tutorials

---

## 🐛 Reporte de Bugs

Si encuentras algún error o bug:
1. Anotar el comportamiento esperado vs actual
2. Captura de pantalla si es posible
3. Navegador y versión utilizada
4. Pasos para reproducir el error
5. Reportar via GitHub Issues o email

---

## 🌟 Valoración y Feedback

### Formulario de Evaluación
👉 [Escanea el QR en la aplicación] o visita: [Link del formulario]

Tu opinión nos ayuda a:
- Mejorar futuras versiones
- Entender qué funciona bien
- Identificar áreas de mejora
- Validar el aprendizaje adquirido

---

<div align="center">

## ⚠️ ADVERTENCIA FINAL ⚠️

**Este es un proyecto educativo con fines demostrativos.**

El código y técnicas mostradas son para **aprendizaje y concienciación** sobre ciberseguridad.

**NO utilizar este conocimiento para actividades maliciosas o ilegales.**

La ciberseguridad ética es nuestra responsabilidad.

---

### 🎃 ¡FELIZ HALLOWEEN Y QUE EL BUGGER NO TE ATRAPE! 👻

**"La mejor defensa es el conocimiento"**

---

Hecho con 💀 y ☕ por el equipo de DAW  
© 2024 - Todos los derechos reservados bajo licencia MIT

</div>