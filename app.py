from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, template_folder='.', static_folder='.')

@app.route('/')
def index():
    # Buscará automáticamente index.html en la raíz
    return render_template('index.html')

@app.route('/<path:path>')
def static_proxy(path):
    # Esto sirve archivos CSS, JS e imágenes
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run()