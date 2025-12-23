document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-vault-form');
    const statusDiv = document.getElementById('form-status');
    const btnSend = document.getElementById('btn-send-contact');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Captura de datos
            const nombre = document.getElementById('contact-name').value;
            const asunto = document.getElementById('contact-subject').value;

            // Simulación de proceso de envío
            btnSend.disabled = true;
            btnSend.innerText = "Sincronizando con Vault...";
            statusDiv.style.display = "block";
            statusDiv.style.backgroundColor = "rgba(0, 210, 255, 0.1)";
            statusDiv.style.color = "#00d2ff";
            statusDiv.innerText = "Encriptando mensaje...";

            setTimeout(() => {
                // Segunda fase de la animación
                statusDiv.innerText = "Señal enviada con éxito. ID: #" + Math.floor(Math.random() * 90000);
                statusDiv.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
                statusDiv.style.color = "#2ecc71";
                
                // Limpiar formulario
                contactForm.reset();
                btnSend.disabled = false;
                btnSend.innerText = "Enviar Mensaje";

                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    statusDiv.style.display = "none";
                }, 5000);

                // Guardar log en el historial del navegador (opcional)
                console.log(`Mensaje de ${nombre} recibido sobre: ${asunto}`);
            }, 2000);
        });
    }

    // Efecto visual para las preguntas frecuentes (Acordeón simple)
    const filasFaq = document.querySelectorAll('tbody tr');
    filasFaq.forEach(fila => {
        fila.style.cursor = "pointer";
        fila.onclick = () => {
            fila.style.backgroundColor = "rgba(0, 210, 255, 0.05)";
            setTimeout(() => {
                fila.style.backgroundColor = "transparent";
            }, 300);
        };
    });
});