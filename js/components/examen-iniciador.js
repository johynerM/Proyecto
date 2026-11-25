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
        <p>Tiempo restante: <strong id="reloj" role="timer">--:--</strong></p>
        </header>

      <form>
        ${examen.preguntas.map((p, i) => `
          <fieldset>
            <legend>${i + 1}. ${p.enunciado}</legend>
            ${p.respuestas.map(r => `
              <div>
                <input type="radio" id="${p.id}-${r.id}" name="${p.id}" value="${r.id}" required>
                <label for="${p.id}-${r.id}">${r.descripcion}</label>
              </div>
            `).join('')}
          </fieldset>
        `).join('')}
        <button type="submit">Terminar</button>
      </form>
    `;
    clearInterval(this.intervalo);

    const fin = Date.now() + examen.tiempo * 60000;
    const reloj = this.shadowRoot.querySelector('#reloj');

    const actualizar = () => {
      const restante = Math.max(0, fin - Date.now());
      const min = Math.floor(restante / 60000);
      const seg = Math.floor((restante % 60000) / 1000);
      reloj.textContent = `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;

      if (restante === 0) {
        this.terminar();
      }
      
    };

    actualizar();
    this.intervalo = setInterval(actualizar, 1000);
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.terminar();
    })};
    terminar() {
      clearInterval(this.intervalo);

      const formulario = this.shadowRoot.querySelector('form');
      const respuestas = Object.fromEntries(new FormData(formulario));

      this.dispatchEvent(new CustomEvent('examen-terminado', {
        detail: { examen: this.examen, estudiante: this.estudiante, respuestas },
        bubbles: true,
        composed: true
      }));
    }    
  }


customElements.define('exam-runner', ExamRunner);