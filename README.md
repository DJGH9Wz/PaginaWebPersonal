# 🛡️ Vault of Djins
## Digital Asset Vault — Flask • SQL • HTML/CSS/JS

**Vault of Djins** es un sistema web multipágina diseñado como una **bóveda digital de alta seguridad** para la gestión y consulta de activos (**PDFs**).  
Integra **autenticación de operadores**, **persistencia de datos en SQL** y una **interfaz inspirada en terminales técnicas de seguridad**.

---

## 🌐 Demo en Producción

🔗 **PythonAnywhere Deploy**  
👉 https://djins.pythonanywhere.com/

---

## 🧭 Rutas y Secciones Principales

| Ruta | Descripción |
|------|-------------|
| `/` | **Panel Principal** — Buscador de archivos y acceso al sistema |
| `/Login.html` | **Autenticación** — Login de operador validado contra SQL |
| `/Contacto.html` | **Mensajería Persistente** — Formulario almacenado en base de datos |
| `/Subir.html` | **Gestión de Activos** — Área privada para subir PDFs |
| `/pdf/<filename>` | **Recuperación Dinámica** — Visualización de documentos |

---

## ✨ Funcionalidades Destacadas

### 🔐 Autenticación SQL Real
Validación de credenciales directamente contra la base de datos.

### 💾 Persistencia de Mensajes
Los mensajes enviados desde el formulario de contacto se almacenan en el **Core SQL**.

### 🔎 Buscador Dinámico
Filtrado en tiempo real de activos disponibles dentro de la bóveda.

### 🖥️ Estética Cyberpunk / Terminal
Diseño visual basado en interfaces técnicas, con **tipografía monoespaciada** y efectos de carga.

### 🧠 Gestión de Sesiones
Protección de rutas privadas mediante control de sesiones en **Flask**.

---

## 🧰 Tecnologías Utilizadas

### Backend
- **Python 3**
- **Flask**
- **Flask-SQLAlchemy**

### Base de Datos
- **SQLite**  
  Persistencia local, autogenerada

### Frontend
- **HTML5**
- **CSS3** — Diseño responsivo
- **JavaScript** — Fetch API para comunicación asíncrona

---

## 📁 Estructura del Proyecto

```bash
VaultOfDjins/
├─ app.py               # Motor principal, rutas y configuración SQL
├─ requirements.txt     # Dependencias del proyecto
├─ vault.db             # Base de datos (autogenerada)
├─ pdf/                 # Repositorio de activos digitales (PDFs)
├─ static/              # CSS, JavaScript e imágenes
└─ templates/           # Vistas HTML (index, login, contacto, subir, etc.)
