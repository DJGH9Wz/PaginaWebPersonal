document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('vault-grid');
    const title = document.getElementById('section-title');

    // 1. BASE DE DATOS INICIAL (Basada en tu carpeta real)
    const archivosBase = [
        { nombre: "Examen de Unidad 1", file: "examen1.pdf", tipo: "examen" },
        { nombre: "Examen de Unidad 2", file: "examen2.pdf", tipo: "examen" },
        { nombre: "Guía de Material 1", file: "material1.pdf", tipo: "material" },
        { nombre: "Guía de Material 2", file: "material2.pdf", tipo: "material" },
        { nombre: "Guía de Material 3", file: "material3.pdf", tipo: "material" },
        { nombre: "Práctica Calificada 1", file: "practica1.pdf", tipo: "practica" },
        { nombre: "Práctica Calificada 2", file: "practica2.pdf", tipo: "practica" },
        { nombre: "Práctica Calificada 3", file: "practica3.pdf", tipo: "practica" },
        { nombre: "Crisis Política Perú 2020", file: "T9-Crisis política Perú 2020.pdf", tipo: "material" },
        { nombre: "Indicadores Mercado Laboral", file: "T10-Comportamiento de los Indicadores del Mercado Laboral a nivel Nacional I Trimestre 2023.pdf", tipo: "material" }
    ];

    const renderArchivos = (filtro = "todos") => {
        grid.innerHTML = "";
        
        // 2. RECUPERAR LO SUBIDO POR EL FORMULARIO
        const archivosSubidos = JSON.parse(localStorage.getItem('misArchivos')) || [];
        
        // 3. COMBINAR (Nuevos arriba, base abajo)
        const listaCompleta = [...archivosSubidos, ...archivosBase];

        // 4. APLICAR FILTRO
        const filtrados = filtro === "todos" 
            ? listaCompleta 
            : listaCompleta.filter(a => a.tipo === filtro);

        if (filtrados.length === 0) {
            grid.innerHTML = `<p style="color:#666; grid-column:1/-1; text-align:center; padding:50px;">No se encontraron registros en la categoría ${filtro}.</p>`;
        }

        // 5. GENERAR CARTAS
        filtrados.forEach(archivo => {
            const card = document.createElement('div');
            card.className = "contenedor-pdf";
            card.innerHTML = `
                <div class="pdf-info">${archivo.nombre}</div>
                <iframe src="pdf/${archivo.file}#toolbar=0&navpanes=0&view=FitH"></iframe>
                <div style="padding: 10px; text-align:center;">
                    <a href="pdf/${archivo.file}" target="_blank" class="btn-view" style="text-decoration:none; font-size:12px; color:var(--vault-blue);">
                        DETALLES DEL ARCHIVO
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });

        title.innerText = `Mostrando: ${filtro.toUpperCase()}`;
    };

    // BOTONES DE FILTRADO
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-category');
            renderArchivos(cat);
            
            // Efecto visual
            document.querySelectorAll('.filter-btn').forEach(b => b.style.boxShadow = "none");
            btn.style.boxShadow = "0 0 15px var(--vault-blue)";
        });
    });

    renderArchivos();
});