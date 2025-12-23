from flask import Flask, render_template, request, jsonify, send_from_directory, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os

# --- CONFIGURACIÓN DE RUTAS DINÁMICAS ---
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, 
            template_folder=basedir, 
            static_folder=basedir, 
            static_url_path='')

# Clave secreta para que las sesiones (login) funcionen en la nube
app.secret_key = 'vault_of_djins_secret_2025' 

# --- CONFIGURACIÓN DE BASE DE DATOS ---
# Guardamos la DB en la carpeta 'instance' o raíz de forma segura
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'vault.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- MODELOS SQL ---
class Mensaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    email = db.Column(db.String(100))
    asunto = db.Column(db.String(100))
    contenido = db.Column(db.Text)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# --- INICIALIZACIÓN ---
with app.app_context():
    db.create_all()
    if not Usuario.query.filter_by(username='admin').first():
        admin_default = Usuario(username='admin', password='1234')
        db.session.add(admin_default)
        db.session.commit()

# --- RUTAS DE NAVEGACIÓN ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Contacto.html')
def contacto_page():
    return render_template('Contacto.html')

@app.route('/Login.html')
def login_page():
    # Si ya está logueado, lo mandamos al index
    if 'usuario' in session:
        return redirect(url_for('index'))
    return render_template('Login.html')

@app.route('/logout')
def logout():
    session.pop('usuario', None)
    return redirect(url_for('index'))

# --- RUTAS DE LA API ---

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(username=data.get('username'), password=data.get('password')).first()
    
    if user:
        session['usuario'] = user.username # Inicia la sesión
        return jsonify({"status": "success", "message": "Conexión establecida"}), 200
    else:
        return jsonify({"status": "error", "message": "Credenciales inválidas"}), 401

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

# --- GESTIÓN DE ARCHIVOS ---

@app.route('/pdf/<path:filename>')
def serve_pdf(filename):
    # Esto busca en la carpeta /pdf dentro de tu proyecto
    pdf_path = os.path.join(basedir, 'pdf')
    return send_from_directory(pdf_path, filename)

@app.route('/<path:path>')
def static_proxy(path):
    # Servir archivos estáticos (CSS, JS, imágenes)
    return send_from_directory(basedir, path)

# --- ARRANQUE ---
if __name__ == '__main__':
    app.run(debug=True)