
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-vault-form');
    const statusDiv = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('btn-send-contact');
        btn.disabled = true;
        btn.textContent = "Transmitiendo...";

        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value
        };

        try {
            // --- LO QUE CAMBIA: Ahora enviamos los datos al servidor Python ---
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                
                statusDiv.style.display = "block";
                statusDiv.style.backgroundColor = "#d4edda";
                statusDiv.style.color = "#155724";
                statusDiv.textContent = `✅ ${result.status}`; // El mensaje viene de Python

                contactForm.reset();
            } else {
                throw new Error("Fallo en el servidor");
            }

        } catch (error) {
            statusDiv.style.display = "block";
            statusDiv.style.backgroundColor = "#f8d7da";
            statusDiv.style.color = "#721c24";
            statusDiv.textContent = "❌ Error en la conexión con el Core SQL. Reintenta.";
        } finally {
            btn.disabled = false;
            btn.textContent = "Enviar Mensaje";
            
            setTimeout(() => {
                statusDiv.style.display = "none";
            }, 5000);
        }
    });
});