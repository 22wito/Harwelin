# 🎃 Fatal T-error
## Simulador Interactivo de Incidentes de Ciberseguridad

![Estado: Comprometido](https://img.shields.io/badge/Estado-COMPROMETIDO-red?style=for-the-badge)
![Amenaza: Crítica](https://img.shields.io/badge/Amenaza-CR%C3%8DTICA-darkred?style=for-the-badge)
![Código: Operacional](https://img.shields.io/badge/C%C3%B3digo-OPERACIONAL-green?style=for-the-badge)

---

## 📋 Descripción del Proyecto

**Fatal T-error** es una experiencia web inmersiva y educativa creada para Halloween. El simulador recrea un incidente crítico provocado por el malware experimental “El Bugger” y reta a los visitantes a neutralizar cuatro vectores de ataque mientras aprenden conceptos esenciales de ciberseguridad.

### 🎯 Objetivos de Aprendizaje
- **Ransomware**: Importancia de los backups y de no ejecutar adjuntos sospechosos.
- **Phishing**: Identificación de correos fraudulentos y prácticas de verificación.
- **Malware**: Diferencias entre virus, troyanos, spyware y keyloggers.
- **Data Breach**: Protección de datos mediante 2FA, VPN y cifrado.

---

## 🎮 Características Clave
- Interfaz de terminal con logs en tiempo real, efecto typewriter, comandos secretos y contador de salud.
- Cuatro mini-juegos distintos que simulan ataques reales (ransomware, phishing, malware y filtración de datos).
- Sistema de puntuación basado en salud restante, amenazas neutralizadas y tiempo de supervivencia.
- Pantalla final con resumen educativo y QR integrado para evaluación.
- Funcionamiento 100% offline (solo se requiere internet para el formulario opcional).

---

## 🛠️ Tecnologías
- **HTML5** para la estructura semántica del simulador.
- **CSS3** con Flexbox, Grid y animaciones (glitch, scanlines, pulse, shake).
- **JavaScript (ES6+)** para la lógica del juego, mini-juegos, timers y comandos.
- **Sin dependencias externas**. Todo el contenido es autónomo.

---

## 📁 Estructura
```
el-bugger-maldito/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── images/
│   └── sounds/
├── docs/
│   ├── AGENTS.md
│   ├── INSTRUCCIONES.md
│   └── FORMULARIO.md
└── README.md
```

- `index.html`: Pantallas (splash, terminal, modales y final).
- `styles.css`: Paleta “terror cibernético”, efectos y layout.
- `script.js`: Lógica de game loop, escenarios y sistema de salud.
- `assets/`: Carpeta para imágenes y sonidos (añadir recursos propios).
- `docs/`: Documentación detallada del montaje, formulario y especificaciones.

---

## 🚀 Ejecución
1. Clona o descarga este repositorio.
2. Abre `index.html` en tu navegador favorito.
3. Activa la pantalla completa (`F11`) para mayor inmersión.
4. Haz clic en **INICIAR PROTOCOLO DE EMERGENCIA** y sigue las instrucciones en pantalla.

### Servidor de desarrollo opcional
```bash
# Python 3
a:
python -m http.server 8080

# Node.js (http-server)
npx http-server
```
Accede a `http://localhost:8080`.

---

## 🧪 Método de Juego
1. **Inicio**: La terminal compromete el sistema y muestra logs en vivo.
2. **Ataques**: Se lanzan escenarios aleatorizados; cada uno reduce salud al activarse.
3. **Mini-juegos**:
   - **Ransomware**: Encuentra los fragmentos correctos de clave en una matriz binaria.
   - **Phishing**: Marca las 5 señales sospechosas en el correo fraudulento.
   - **Malware**: Cierra emergentes antes de que el keylogger complete su instalación.
   - **Data Breach**: Activa protecciones en el orden correcto (firewall → antivirus → VPN → 2FA → cifrado → backup).
4. **Comandos secretos**: `help`, `status`, `neutralize`, `intel`, `clear`.
5. **Final**: Según rendimiento se muestra “Neutralizado” o “Comprometido”, estadística y QR del formulario.

---

## 📊 Sistema de Puntuación
| Acción | Puntos |
| --- | --- |
| Salud restante | 1 punto por cada % |
| Escenario completado | +50 |
| Todos los escenarios superados | +100 |
| Bonus por >50% de salud sin fallos | +50 |
| **Máximo** | **500** |

### Rangos sugeridos
- **400-500**: Experto en Ciberdefensa
- **300-399**: Técnico Avanzado
- **200-299**: Analista Competente
- **100-199**: Recluta en Formación
- **0-99**: Sistema Comprometido

---

## 📚 Documentación Complementaria
- **docs/AGENTS.md**: especificaciones completas para desarrollo.
- **docs/INSTRUCCIONES.md**: montaje físico, actuación y troubleshooting.
- **docs/FORMULARIO.md**: contenido del Google Forms para evaluación.

---

## 👥 Créditos
- **Equipo**: Clase DAW - Instituto `[Nombre]`
- **Materia**: Ciberseguridad en Entornos de las TIC
- **Profesorado**: `[Nombre del profesor]`
- **Fecha**: Halloween 2024

Licencia [MIT](./LICENSE) (añadir si aplica).

---

## ⚠️ Aviso Ético
Este simulador tiene fines **estrictamente educativos**. No utilices las técnicas descritas para actividades maliciosas. La ciberseguridad ética es responsabilidad de todos.

¡Feliz Halloween y que el Bugger no corrompa tus sistemas! 👻
