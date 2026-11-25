class ExamRunner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  iniciar(examen, estudiante) {
    this.examen = examen;
    this.estudiante = estudiante;

    this.shadowRoot.innerHTML = `
      <header>
        <h2>${examen.titulo}</h2>
        <p>Preguntas: ${examen.preguntas.length} · Para aprobar: ${examen.porcentajeAprobacion}%</p>
      </header>

      <form>
        ${ examen.preguntas.map((p, i) => `
          <fieldset>
            <legend>${i + 1}. ${p.enunciado}</legend>
            ${ p.respuestas.map(r => `
              <div>
                <input type="radio" id="${p.id}-${r.id}" name="${p.id}" value="${r.id}" required>
                <label for="${p.id}-${r.id}">${r.descripcion}</label>
              </div>
            `).join('') }
          </fieldset>
        `).join('') }
        <button type="submit">Terminar</button>
      </form>
    `;

    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const respuestas = Object.fromEntries(new FormData(e.target));
      this.dispatchEvent(new CustomEvent('examen-terminado', {
        detail: { examen, estudiante, respuestas },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define('exam-runner', ExamRunner);