document.addEventListener('DOMContentLoaded', () => {
    // 1. REFERENCIAS A LA UI
    const tablaArchivos = document.getElementById('tabla-mis-archivos');
    const tablaFeedback = document.getElementById('tabla-mi-feedback');
    const countFiles = document.getElementById('count-files');
    const countFeedback = document.getElementById('count-feedback');

    // 2. CARGAR ARCHIVOS SUBIDOS (Desde Subir.html)
    const misArchivos = JSON.parse(localStorage.getItem('misArchivos')) || [];
    countFiles.innerText = misArchivos.length;

    if (misArchivos.length === 0) {
        tablaArchivos.innerHTML = '<tr><td colspan="4" style="text-align:center">No has subido archivos aún.</td></tr>';
    } else {
        misArchivos.forEach(file => {
            const row = `<tr>
                <td>${file.nombre}</td>
                <td>${file.curso || 'General'}</td>
                <td>${file.fecha || 'Reciente'}</td>
                <td style="color: #00d2ff">✓ Verificado</td>
            </tr>`;
            tablaArchivos.innerHTML += row;
        });
    }

    // 3. CARGAR FEEDBACK DEJADO (Desde Valorar.html)
    const feedbackData = JSON.parse(localStorage.getItem('vault_feedback')) || {};
    const feedbackKeys = Object.keys(feedbackData);
    countFeedback.innerText = feedbackKeys.length;

    if (feedbackKeys.length === 0) {
        tablaFeedback.innerHTML = '<tr><td colspan="3" style="text-align:center">No has valorado ningún material.</td></tr>';
    } else {
        feedbackKeys.forEach(id => {
            const item = feedbackData[id];
            const estrellas = "⭐".repeat(item.stars);
            
            // Simulación de nombre de archivo (basado en el ID)
            const nombreSimulado = id.toUpperCase(); 

            const row = `<tr>
                <td><strong>${nombreSimulado}</strong></td>
                <td>${estrellas}</td>
                <td style="font-style: italic; color: #aaa;">"${item.comment}"</td>
            </tr>`;
            tablaFeedback.innerHTML += row;
        });
    }
});