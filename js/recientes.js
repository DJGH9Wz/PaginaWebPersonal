document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BASE DE DATOS DE ARCHIVOS (Aquí agregas tus nuevos PDFs)
    const misArchivos = [
        { nombre: "Examen de Unidad 1", file: "examen1.pdf", tipo: "examen" },
        { nombre: "Examen de Unidad 2", file: "examen2.pdf", tipo: "examen" },
        { nombre: "Guía de Estudio 1", file: "material1.pdf", tipo: "material" },
        { nombre: "Guía de Estudio 2", file: "material2.pdf", tipo: "material" },
        { nombre: "Guía de Estudio 3", file: "material3.pdf", tipo: "material" },
        { nombre: "Práctica Calificada 1", file: "practica1.pdf", tipo: "practica" },
        { nombre: "Práctica Calificada 2", file: "practica2.pdf", tipo: "practica" },
        { nombre: "Práctica Calificada 3", file: "practica3.pdf", tipo: "practica" }
    ];

    const grid = document.getElementById('vault-grid');
    const title = document.getElementById('section-title');

    // 2. FUNCIÓN PARA RENDERIZAR LAS TARJETAS
    const renderArchivos = (filtro = "todos") => {
        grid.innerHTML = ""; // Limpiar pantalla
        
        const filtrados = filtro === "todos" 
            ? misArchivos 
            : misArchivos.filter(a => a.tipo === filtro);

        filtrados.forEach(archivo => {
            const card = document.createElement('div');
            card.className = "contenedor-pdf";
            card.innerHTML = `
                <div class="pdf-info">${archivo.nombre}</div>
                <iframe src="pdf/${archivo.file}#toolbar=0&navpanes=0&view=FitH"></iframe>
                <div style="padding: 10px; text-align:center;">
                    <a href="pdf/${archivo.file}" target="_blank" class="btn-view" style="text-decoration:none; font-size:12px;">Abrir Pantalla Completa</a>
                </div>
            `;
            grid.appendChild(card);
        });

        title.innerText = `Mostrando: ${filtro.toUpperCase()}`;
    };

    // 3. LÓGICA DE LOS BOTONES DE FILTRO
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-category');
            renderArchivos(cat);
            
            // Efecto visual de botón activo
            document.querySelectorAll('.filter-btn').forEach(b => b.style.boxShadow = "none");
            btn.style.boxShadow = "0 0 15px var(--vault-blue)";
        });
    });

    // Carga inicial
    renderArchivos();
});