class ListaExamenes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render([]);

    this.shadowRoot.addEventListener('click', (e) => {
      const boton = e.target.closest('button');
      if (!boton) return;

      this.dispatchEvent(new CustomEvent('examen-elegido', {
        detail: boton.dataset.id,
        bubbles: true,
        composed: true
      }));
    });
  }

  render(examenes) {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="css/componentes.css" >
    <ul class="lista">
        ${examenes.map(ex => `
          <li class="tarjeta">
            <h2>${ex.titulo}</h2>
            <p>${ex.tiempo} min · Aprobación: ${ex.porcentajeAprobacion}%</p>
            <button type="button" data-id="${ex.id}">Presentar</button>
          </li>
        `).join('')}
      </ul>
    `;
  }
}

customElements.define('lista-examenes', ListaExamenes);