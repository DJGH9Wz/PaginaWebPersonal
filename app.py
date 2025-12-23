from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')

# --- CONFIGURACIÓN DE BASE DE DATOS ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vault.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- MODELOS SQL ---

# Modelo para los mensajes de la página de contacto
class Mensaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    email = db.Column(db.String(100))
    asunto = db.Column(db.String(100))
    contenido = db.Column(db.Text)

# Modelo para los usuarios del Login
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# --- INICIALIZACIÓN DE LA BÓVEDA ---
with app.app_context():
    db.create_all()
    # Creamos un usuario administrador por defecto si no existe
    if not Usuario.query.filter_by(username='admin').first():
        admin_default = Usuario(username='admin', password='1234') # Cambia esto después
        db.session.add(admin_default)
        db.session.commit()
        print("SISTEMA: Usuario 'admin' creado exitosamente.")

# --- RUTAS DE NAVEGACIÓN ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Contacto.html')
def contacto_page():
    return render_template('Contacto.html')

@app.route('/Login.html')
def login_page():
    return render_template('Login.html')

# --- RUTAS DE LA API (Lógica SQL) ---

# API para el Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(username=data.get('username'), password=data.get('password')).first()
    
    if user:
        return jsonify({"status": "success", "message": "Conexión establecida"}), 200
    else:
        return jsonify({"status": "error", "message": "Credenciales inválidas"}), 401

# API para el Formulario de Contacto
@app.route('/api/contacto', methods=['POST'])
def recibir_contacto():
    try:
        data = request.json
        nuevo_mensaje = Mensaje(
            nombre=data['name'],
            email=data['email'],
            asunto=data['subject'],
            contenido=data['message']
        )
        db.session.add(nuevo_mensaje)
        db.session.commit()
        return jsonify({"status": "Transmisión guardada en SQL con éxito"})
    except Exception as e:
        return jsonify({"status": "Error en el Core SQL", "details": str(e)}), 500

# --- GESTIÓN DE ARCHIVOS (PDF Y ESTÁTICOS) ---

@app.route('/pdf/<path:filename>')
def serve_pdf(filename):
    # Asegúrate de tener una carpeta llamada 'pdf' en tu proyecto
    return send_from_directory('pdf', filename)

@app.route('/<path:path>')
def static_proxy(path):
    # Esto sirve CSS, JS e imágenes que estén en la raíz
    return send_from_directory('.', path)

# --- ARRANQUE DEL SISTEMA ---
if __name__ == '__main__':
    # Usamos host='0.0.0.0' para facilitar pruebas en red local si fuera necesario
    app.run(debug=True, port=5000)