document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-vault-form');
    const statusDiv = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Bloquear botón mientras envía
        const btn = document.getElementById('btn-send-contact');
        btn.disabled = true;
        btn.textContent = "Transmitiendo...";

        // Capturar datos
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value
        };

        try {
            // Simulamos una pequeña espera de red
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mostramos éxito
            statusDiv.style.display = "block";
            statusDiv.style.backgroundColor = "#d4edda";
            statusDiv.style.color = "#155724";
            statusDiv.textContent = "✅ ¡Señal enviada! La Bóveda procesará tu mensaje pronto.";

            contactForm.reset();
        } catch (error) {
            statusDiv.style.display = "block";
            statusDiv.style.backgroundColor = "#f8d7da";
            statusDiv.style.color = "#721c24";
            statusDiv.textContent = "❌ Error en la transmisión. Intenta de nuevo.";
        } finally {
            btn.disabled = false;
            btn.textContent = "Enviar Mensaje";
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                statusDiv.style.display = "none";
            }, 5000);
        }
    });
});