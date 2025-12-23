document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const resultsContainer = document.getElementById('search-results');
    const counterText = document.getElementById('search-counter');
    const btnSearch = document.getElementById('btn-ejecutar-busqueda');
    const btnReset = document.getElementById('btn-limpiar-busqueda');

    // Referencias a los inputs
    const inputTexto = document.getElementById('filter-text');
    const selectCurso = document.getElementById('filter-course');
    const selectTipo = document.getElementById('filter-type');

    const archivosBase = [
        { id: 'ex1', nombre: "Examen Parcial - Cálculo A", file: "examen1.pdf", tipo: "examen", curso: "Cálculo A", fecha: "15/11/2024" },
        { id: 'ex2', nombre: "Examen Unidad 2", file: "examen2.pdf", tipo: "examen", curso: "Cálculo A", fecha: "20/12/2024" },
        { id: 'pr3', nombre: "Práctica 3 - Discretas", file: "practica3.pdf", tipo: "practica", curso: "Estructuras Discretas", fecha: "20/10/2024" },
        { id: 't9', nombre: "Crisis Política Perú 2020", file: "material4.pdf", tipo: "material", curso: "Realidad Nacional", fecha: "05/10/2024" },
        { id: 't10', nombre: "Indicadores Mercado Laboral", file: "material5.pdf", tipo: "material", curso: "Estadística", fecha: "28/09/2024" }
    ];

    const ejecutarFiltro = () => {
        // VALIDACIÓN: Verificamos que los elementos existan antes de leer su .value
        if (!inputTexto || !selectCurso || !selectTipo) {
            console.error("Error: No se encontraron los campos del formulario en el HTML.");
            return;
        }

        const texto = inputTexto.value.toLowerCase();
        const curso = selectCurso.value;
        const tipo = selectTipo.value;

        const subidos = JSON.parse(localStorage.getItem('misArchivos')) || [];
        const todos = [...subidos, ...archivosBase];

        const filtrados = todos.filter(doc => {
            const matchTexto = doc.nombre.toLowerCase().includes(texto);
            const matchCurso = curso === "" || doc.curso === curso;
            const matchTipo = tipo === "" || doc.tipo.toLowerCase().includes(tipo.toLowerCase());
            return matchTexto && matchCurso && matchTipo;
        });

        mostrarResultados(filtrados);
    };

    const mostrarResultados = (lista) => {
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = "";
        counterText.innerHTML = `Se encontraron <strong>${lista.length} archivos</strong>`;

        lista.forEach(doc => {
            const card = document.createElement('article');
            card.className = "secundario";
            card.innerHTML = `
                <h3 class="archivo-titulo">📄 ${doc.nombre}</h3>
                <div class="vista-previa-pdf" style="text-align: center; padding: 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" style="width:40px;">
                    <p><strong>Curso:</strong> ${doc.curso}</p>
                    <p><strong>Tipo:</strong> ${doc.tipo}</p>
                </div>
                <div class="valoracion-container">
                    <a href="pdf/${doc.file}" target="_blank" class="btn-voto btn-util" style="text-decoration:none; display:block; text-align:center;">Ver PDF</a>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    };

    // Botón Buscar
    if (btnSearch) {
        btnSearch.onclick = ejecutarFiltro;
    }

    // Botón Limpiar
    if (btnReset) {
        btnReset.onclick = () => {
            setTimeout(ejecutarFiltro, 100);
        };
    }

    // Carga inicial
    ejecutarFiltro();
});