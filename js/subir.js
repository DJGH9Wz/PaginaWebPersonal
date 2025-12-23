document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadForm = document.getElementById('upload-form');
    const log = document.getElementById('upload-log');

    const addLog = (msg) => {
        const li = document.createElement('li');
        li.innerText = `> ${msg}`;
        log.appendChild(li);
        log.scrollTop = log.scrollHeight;
    };

    // Control de Clic y Drag & Drop
    dropZone.addEventListener('click', () => fileInput.click());

    ['dragover', 'dragleave', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    dropZone.addEventListener('dragover', () => dropZone.classList.add('drop-zone--over'));
    ['dragleave', 'dragend', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, () => dropZone.classList.remove('drop-zone--over'));
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            fileInput.files = files; // Vinculación física
            actualizarInterfaz(files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            actualizarInterfaz(fileInput.files[0]);
        }
    });

    function actualizarInterfaz(file) {
        if (file.type === "application/pdf") {
            dropZone.querySelector('.drop-zone__prompt').innerHTML = 
                `<span style="color: #2ecc71;">✓ PDF Detectado:</span><br>${file.name}`;
            addLog(`Archivo listo: ${file.name}`);
        } else {
            alert("Solo archivos PDF");
            fileInput.value = "";
        }
    }

    // --- PROCESO DE ENVÍO ---
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!fileInput.files.length) {
            alert("Selecciona un archivo primero");
            return;
        }

        const btn = uploadForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = "SINCRONIZANDO...";
        
        addLog("Conectando con Vault...");

        setTimeout(() => {
            addLog("Guardando en base de datos local...");
            
            // Creamos el objeto del archivo
            const nuevoDoc = {
                nombre: document.getElementById('file-name').value,
                file: fileInput.files[0].name,
                tipo: document.getElementById('file-type').value.toLowerCase(),
                curso: document.getElementById('course').value,
                id: Date.now() // ID único para poder borrarlo después
            };

            // Guardar en LocalStorage
            let boveda = JSON.parse(localStorage.getItem('misArchivos')) || [];
            boveda.unshift(nuevoDoc);
            localStorage.setItem('misArchivos', JSON.stringify(boveda));

            setTimeout(() => {
                addLog("¡Sincronización Exitosa!");
                alert("Archivo guardado. Revisa la pestaña 'Recientes'.");
                
                // Reset total
                uploadForm.reset();
                dropZone.querySelector('.drop-zone__prompt').innerText = "Arrastra tu PDF aquí o haz clic para buscar";
                btn.disabled = false;
                btn.innerText = "Sincronizar con la Bóveda";
            }, 800);
        }, 800);
    });
});