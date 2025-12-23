from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

# NUEVA RUTA ESPECÍFICA PARA LA CARPETA PDF
@app.route('/pdf/<path:filename>')
def serve_pdf(filename):
    # Esto busca el archivo dentro de la carpeta 'pdf' en tu proyecto
    return send_from_directory('pdf', filename)

# Ruta comodín para el resto (CSS, JS sueltos)
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)