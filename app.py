from flask import Flask, render_template, send_from_directory
import os

# Configuramos static_folder como '.' para que busque en la raíz
app = Flask(__name__, template_folder='.', static_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

# Esta ruta permite que Flask encuentre styles.css, buscar.js, etc., si están sueltos
@app.route('/<path:path>')
def send_file(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run()