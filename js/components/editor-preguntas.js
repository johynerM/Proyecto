class EditorPreguntas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.examenActual = null;
    }
    connectedCallback() {
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
            if (!respuestas.some(r => r.correcta)) {
                alert('Marca como correcta una respuesta que tenga texto');
                return;
            }

            const pregunta = {
                id: crypto.randomUUID(),
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
    mostrar(examen) {
        this.examenActual = examen;
        this.shadowRoot.innerHTML = `
      <section>
        <h3> ${examen.titulo} </h3>
        ${examen.preguntas.length === 0
                ? `<p>Este examen todavía no tiene preguntas</p>`
                : `<ul>${examen.preguntas.map(p => `<li> ${p.enunciado} </li>`).join('')}</ul>`}
      <form>
        <h4>Agregar pregunta</h4>

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

        <button type="submit">Agregar pregunta</button>
        </form>
    </section>
    `;
    }
};

customElements.define('editor-preguntas', EditorPreguntas);