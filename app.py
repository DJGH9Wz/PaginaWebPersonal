from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# 1. Ruta principal (HOME)
@app.route('/')
def index():
    # IMPORTANTE: Asegúrate de que el nombre sea EXACTO (mayúsculas/minúsculas)
    # Si tu archivo se llama 'pagina.html', cámbialo abajo:
    return send_from_directory('.', 'pagina.html')

# 2. Ruta para cualquier otro archivo (Buscar.html, MiPerfil.html, etc.)
@app.route('/<path:path>')
def serve_static(path):
    # Si intentas entrar a /Buscar, le agrega .html automáticamente
    if not path.endswith('.html') and '.' not in path:
        path += '.html'
    return send_from_directory('.', path)

# 3. Ruta para carpetas de recursos
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('css', filename)

if __name__ == '__main__':
    app.run()