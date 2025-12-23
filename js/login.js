document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const statusDiv = document.getElementById('login-status');
    const btnLogin = document.getElementById('btn-login');

    loginForm.addEventListener('submit', async (e) => { // Agregamos async
        e.preventDefault();

        const user = document.getElementById('user').value;
        const pass = document.getElementById('pass').value;

        // 1. Efecto visual de carga
        btnLogin.disabled = true;
        btnLogin.textContent = "ESTABLECIENDO VÍNCULO...";
        statusDiv.style.display = "block";
        statusDiv.style.color = "#ffd700";
        statusDiv.textContent = "Verificando identidad en el Core...";

        try {
            // 2. PETICIÓN REAL A PYTHON
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user, password: pass })
            });

            const result = await response.json();

            if (response.ok) {
                // Éxito
                statusDiv.style.color = "#00ff00";
                statusDiv.textContent = "ACCESO CONCEDIDO. Sincronizando...";
                
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            } else {
                // Error de credenciales (401 Unauthorized)
                throw new Error(result.message || "Credenciales inválidas");
            }

        } catch (error) {
            btnLogin.disabled = false;
            btnLogin.textContent = "Sincronizar con la Bóveda";
            statusDiv.style.color = "#ff4444";
            statusDiv.textContent = `ERROR: ${error.message}`;
        }
    });
});