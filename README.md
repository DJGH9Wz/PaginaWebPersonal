🛡️ ProyectoIndividual — Vault of Djins (Flask + SQL + HTML/CSS/JS)
Sistema de gestión y bóveda digital multipágina diseñada para la organización de activos (PDFs), con autenticación de operador, sistema de mensajería y estética de terminal de alta seguridad.

🌐 Demo
Deploy en PythonAnywhere: https://Djins.pythonanywhere.com

🧭 Secciones (rutas)
/ — Panel Principal (Buscador de archivos y acceso al sistema).

/Login.html — Acceso al Core (Autenticación de operador mediante SQL).

/Contacto.html — Transmisión de datos (Formulario de contacto vinculado a la base de datos).

/Subir.html — Gestión de Activos (Sección privada para subir nuevos PDFs).

/pdf/<filename> — Recuperación de archivos (Ruta dinámica para visualizar documentos).

✨ Características
Autenticación SQL: Sistema de login real que valida credenciales contra una base de datos.

Persistencia de Mensajería: Los formularios de contacto no solo se envían, se almacenan en el Core SQL.

Buscador Dinámico: Filtro en tiempo real para localizar activos específicos dentro de la bóveda.

Estética Cyberpunk: Interfaz diseñada con temática de terminal técnica, fuentes monoespaciadas y efectos visuales de carga.

Backend Robusto: Manejo de sesiones para proteger secciones privadas del sitio.

🧰 Tecnologías
Backend: Python + Flask (Servidor y lógica de rutas en app.py).

Base de Datos: SQL (SQLite a través de SQLAlchemy para persistencia de datos).

Frontend: HTML5, CSS3 (Diseño responsivo), JavaScript (Fetch API para peticiones asíncronas).

📁 Estructura del proyecto
VaultOfDjins/
├─ app.py               # Motor principal y configuración de base de datos
├─ requirements.txt      # Librerías necesarias (Flask, Flask-SQLAlchemy)
├─ vault.db             # Base de Datos SQL (Generada automáticamente)
├─ pdf/                 # Repositorio de archivos digitales
├─ static/              # Estilos CSS, lógica JS e imágenes
└─ templates/			# Vistas HTML (index, login, contacto, etc.)
