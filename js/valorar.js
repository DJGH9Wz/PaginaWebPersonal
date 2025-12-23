document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('valorar-grid');

    // Lista Maestra (Verifica que estos nombres coincidan con tus archivos .pdf)
    const archivosBase = [
        { id: 'ex1', nombre: "Examen de Unidad 1", file: "examen1.pdf" },
        { id: 'ex2', nombre: "Examen de Unidad 2", file: "examen2.pdf" },
        { id: 'mt1', nombre: "Material de Estudio 1", file: "material1.pdf" },
        { id: 'mt2', nombre: "Material de Estudio 2", file: "material2.pdf" },
        { id: 'mt3', nombre: "Material de Estudio 3", file: "material3.pdf" },
        { id: 'pr1', nombre: "Práctica Calificada 1", file: "practica1.pdf" },
        { id: 'pr2', nombre: "Práctica Calificada 2", file: "practica2.pdf" },
        { id: 'pr3', nombre: "Práctica Calificada 3", file: "practica3.pdf" },
        { id: 't9', nombre: "Crisis Política Perú 2020", file: "T9-Crisis política Perú 2020.pdf" },
        { id: 't10', nombre: "Indicadores Mercado Laboral", file: "T10-Comportamiento de los Indicadores del Mercado Laboral a nivel Nacional I Trimestre 2023.pdf" }
    ];

    const archivosSubidos = JSON.parse(localStorage.getItem('misArchivos')) || [];
    const todos = [...archivosSubidos, ...archivosBase];

    const render = () => {
        const feedback = JSON.parse(localStorage.getItem('vault_feedback')) || {};
        grid.innerHTML = "";

        todos.forEach(doc => {
            const data = feedback[doc.id] || { stars: 0, comment: "" };

            const article = document.createElement('article');
            article.className = "fila-valorar";
            article.innerHTML = `
                <div class="visor-lateral">
                    <iframe src="pdf/${doc.file}#toolbar=0&navpanes=0&view=FitH"></iframe>
                </div>
                <div class="info-lateral">
                    <h3 class="archivo-titulo">${doc.nombre}</h3>
                    
                    <div class="stars-container" id="stars-${doc.id}" data-rating="${data.stars}">
                        ${[1,2,3,4,5].map(n => `
                            <span class="star ${n <= data.stars ? 'active' : ''}" data-value="${n}">★</span>
                        `).join('')}
                    </div>

                    <textarea class="comment-box" id="comm-${doc.id}" placeholder="Escribe tu análisis...">${data.comment}</textarea>
                    
                    <button class="btn-save-feedback" onclick="registrarFeedback('${doc.id}')">
                        Guardar en Bóveda
                    </button>
                </div>
            `;
            grid.appendChild(article);
        });

        inicializarEventosEstrellas();
    };

    function inicializarEventosEstrellas() {
        const containers = document.querySelectorAll('.stars-container');
        containers.forEach(container => {
            const stars = container.querySelectorAll('.star');
            stars.forEach(star => {
                star.onclick = function() {
                    const val = this.getAttribute('data-value');
                    container.setAttribute('data-rating', val);
                    
                    // Actualizar clase visual
                    stars.forEach(s => {
                        if(s.getAttribute('data-value') <= val) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                };
            });
        });
    }

    window.registrarFeedback = (id) => {
        const container = document.getElementById(`stars-${id}`);
        const rating = container.getAttribute('data-rating');
        const comment = document.getElementById(`comm-${id}`).value;

        let db = JSON.parse(localStorage.getItem('vault_feedback')) || {};
        db[id] = { stars: parseInt(rating), comment: comment };
        
        localStorage.setItem('vault_feedback', JSON.stringify(db));
        
        // Feedback visual en el botón
        const btn = container.parentElement.querySelector('.btn-save-feedback');
        btn.innerText = "✓ GUARDADO";
        setTimeout(() => btn.innerText = "Guardar en Bóveda", 2000);
    };

    render();
});