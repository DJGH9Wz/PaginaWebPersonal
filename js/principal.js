document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONFIGURACIÓN DE LA RULETA (SLIDER INFINITO)
    const track = document.querySelector('.slider-track');
    
    if (track) {
        // Pausar al pasar el mouse para ver el trabajo a detalle
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        // Reanudar al quitar el mouse
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });

        // Evento al hacer clic en un trabajo de la ruleta
        const items = track.querySelectorAll('.img-item img');
        items.forEach(img => {
            img.addEventListener('click', () => {
                const nombreArchivo = img.getAttribute('alt');
                alert(`Abriendo visualizador para: ${nombreArchivo}\nEstado: Documento Encriptado.`);
                console.log(`%c[SISTEMA] Accediendo a: ${img.src}`, "color: #00d2ff");
            });
        });
    }

    // 2. EFECTO DE ESCRITURA (TERMINAL) EN EL HERO
    const userSpan = document.querySelector('.user-logged');

    if (userSpan) {
        const nombreUsuario = userSpan.textContent;
        userSpan.textContent = "Analizando..."; // Texto temporal
        userSpan.style.color = "#ff4d4d"; // Rojo mientras escanea

        setTimeout(() => {
            userSpan.textContent = "Acceso Concedido";
            userSpan.style.color = "#2ecc71"; // Verde al autorizar
            
            setTimeout(() => {
                userSpan.textContent = nombreUsuario;
                userSpan.style.color = "var(--vault-blue)"; // Color original de tu Vault
                userSpan.style.textShadow = "0 0 10px var(--vault-blue)";
            }, 1000);
        }, 1500);
    }

    // 3. EFECTO DE RESPLANDOR EN TARJETAS DE COLABORADORES
    const cards = document.querySelectorAll('.colaborador-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 210, 255, 0.15) 0%, rgba(17, 24, 39, 1) 80%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = "rgba(17, 24, 39, 0.8)";
        });
    });
});