class EditorPreguntas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.examenActual = null; 
  }

  mostrar(examen) {
    this.examenActual = examen;
    this.shadowRoot.innerHTML = `
      <section>
        <h3> ${examen.titulo} </h3>
        ${ examen.preguntas.length === 0
            ? `<p>Este examen todavía no tiene preguntas</p>`
            : `<ul>${ examen.preguntas.map(p => `<li> ${p.enunciado} </li>`).join('') }</ul>` }
      </section>
    `;
  }
}

customElements.define('editor-preguntas', EditorPreguntas);