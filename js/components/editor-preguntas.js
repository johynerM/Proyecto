class EditorPreguntas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.preguntaEditandoId = null;
        this.examenActual = null;
    }
    connectedCallback() {
        this.shadowRoot.addEventListener('click', (e) => {
            if (e.target.dataset.accion === 'eliminar-pregunta') {
                this.dispatchEvent(new CustomEvent('pregunta-eliminar', {
                    detail: { examenId: this.examenActual.id, preguntaId: e.target.dataset.id },
                    bubbles: true,
                    composed: true
                }));
                if (e.target.dataset.accion === 'editar-pregunta') {
                    const p = this.examenActual.preguntas.find(x => x.id === e.target.dataset.id);
                    this.cargarPregunta(p);
                }
                if (e.target.id === 'cancelar-edicion') {
                    this.mostrar(this.examenActual);
                }
            }
        });
        this.shadowRoot.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const datos = Object.fromEntries(new FormData(evento.target));
            const respuestas = [];
            for (let i = 0; i < 4; i++) {
                const texto = datos['respuesta' + i];
                if (texto.trim() !== '') {
                    respuestas.push({
                        id: crypto.randomUUID(),
                        descripcion: texto,
                        correcta: String(i) === datos.correcta
                    });
                }
            }
            const textos = respuestas.map(r => r.descripcion.trim().toLowerCase());
            if (new Set(textos).size !== textos.length) {
                alert('No puede haber respuestas repetidas en una pregunta');
                return;
            }
            if (!respuestas.some(r => r.correcta)) {
                alert('Marca como correcta una respuesta que tenga texto');
                return;
            }

            const pregunta = {
                id: this.preguntaEditandoId ?? crypto.randomUUID(),
                enunciado: datos.enunciado,
                respuestas: respuestas
            };
            this.dispatchEvent(new CustomEvent('pregunta-guardada', {
                detail: { examenId: this.examenActual.id, pregunta: pregunta },
                bubbles: true,
                composed: true
            }));
            evento.target.reset();
        });
    }
    limpiar() {
        this.examenActual = null;
        this.shadowRoot.innerHTML = '';
    }
    cargarPregunta(p) {
        this.preguntaEditandoId = p.id;
        const f = this.shadowRoot.querySelector('form');
        f.elements['enunciado'].value = p.enunciado;
        f.querySelectorAll('input[name^="respuesta"]').forEach(i => (i.value = ''));
        p.respuestas.forEach((r, i) => {
            if (i > 3) return; 
            f.elements['respuesta' + i].value = r.descripcion;
            if (r.correcta) f.querySelector(`input[name="correcta"][value="${i}"]`).checked = true;
        });
        this.shadowRoot.querySelector('#titulo-form').textContent = 'Editar pregunta';
        this.shadowRoot.querySelector('#guardar-pregunta').textContent = 'Guardar cambios';
        this.shadowRoot.querySelector('#cancelar-edicion').hidden = false;
        f.scrollIntoView({ behavior: 'smooth' });
    }
    mostrar(examen) {
        this.preguntaEditandoId = null;
        this.examenActual = examen;
        this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="css/componentes.css">
    <section>
      <h3>${examen.titulo}</h3>

      ${examen.preguntas.length === 0
                ? `<p>Este examen todavía no tiene preguntas</p>`
                : `<ul class="lista-preguntas">
            ${examen.preguntas.map(p => `
              <li>
                ${p.enunciado}
                <button class="btn-eliminar" type="button" data-id="${p.id}" data-accion="eliminar-pregunta">Eliminar</button>
                <button type="button" data-id="${p.id}" data-accion="editar-pregunta">Editar</button>
                <ul class="lista-respuestas">
                  ${p.respuestas.map(r => `
                    <li class="${r.correcta ? 'correcta' : ''}">${r.descripcion} ${r.correcta ? '✔' : ''}</li>
                  `).join('')}
                </ul>
              </li>
            `).join('')}
          </ul>`
            }
      <form class="form-datos">
        <h4 id="titulo-form">Agregar pregunta</h4>

        <label for="enunciado">Pregunta</label>
        <input type="text" name="enunciado" id="enunciado" required>

        <fieldset>
            <legend>Respuestas (marca la correcta)</legend>

            <div>
            <input type="radio" name="correcta" value="0" required>
            <input type="text" name="respuesta0" placeholder="Respuesta 1" required>
            </div>
            <div>
            <input type="radio" name="correcta" value="1">
            <input type="text" name="respuesta1" placeholder="Respuesta 2" required>
            </div>
            <div>
            <input type="radio" name="correcta" value="2">
            <input type="text" name="respuesta2" placeholder="Respuesta 3 (opcional)">
            </div>
            <div>
            <input type="radio" name="correcta" value="3">
            <input type="text" name="respuesta3" placeholder="Respuesta 4 (opcional)">
            </div>
        </fieldset>

        <button type="submit" id="guardar-pregunta">Agregar pregunta</button>
        <button type="button" id="cancelar-edicion" class="btn-secundario" hidden>Cancelar edición</button>
        </form>
    </section>
    `;
    }
};

customElements.define('editor-preguntas', EditorPreguntas);