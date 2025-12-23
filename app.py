from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, 
            static_folder='.', 
            template_folder='.')

# Ruta principal: Carga tu página de inicio
@app.route('/')
def index():
    # Cambia 'pagina.html' por el nombre real de tu archivo de inicio
    return send_from_directory('.', 'pagina.html')

# Ruta para servir cualquier otro archivo HTML automáticamente
@app.route('/<path:path>')
def serve_html(path):
    if not path.endswith('.html'):
        path += '.html'
    return send_from_directory('.', path)

# Ruta para carpetas de recursos (js, css, img, pdf)
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('css', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)