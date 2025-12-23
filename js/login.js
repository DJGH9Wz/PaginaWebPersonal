document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const statusDiv = document.getElementById('login-status');
    const btnLogin = document.getElementById('btn-login');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const user = document.getElementById('user').value;
        const pass = document.getElementById('pass').value;

        // 1. Mostrar estado de carga
        btnLogin.disabled = true;
        btnLogin.textContent = "ESTABLECIENDO VÍNCULO...";
        statusDiv.style.display = "block";
        statusDiv.style.color = "#ffd700";
        statusDiv.textContent = "Verificando identidad en el Core...";

        // 2. Simular validación (2 segundos de espera)
        setTimeout(() => {
            // Validación simple para pruebas
            if (user === "admin" && pass === "1234") {
                statusDiv.style.color = "#00ff00";
                statusDiv.textContent = "ACCESO CONCEDIDO. Entrando a la Bóveda...";
                
                // 3. Redirigir al Index después del éxito
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            } else {
                // Si falla
                btnLogin.disabled = false;
                btnLogin.textContent = "Sincronizar con la Bóveda";
                statusDiv.style.color = "#ff4444";
                statusDiv.textContent = "ERROR: Credenciales no reconocidas.";
            }
        }, 2000);
    });
});