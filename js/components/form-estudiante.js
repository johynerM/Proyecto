class FormEstudiante extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <form>
        <div>
          <label for="identificacion">Identificación</label>
          <input type="text" id="identificacion" name="identificacion" required>
        </div>
        <div>
          <label for="nombre">Nombre completo</label>
          <input type="text" id="nombre" name="nombre" required>
        </div>
        <button type="submit">Comenzar examen</button>
      </form>
    `;

    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const datos = Object.fromEntries(new FormData(e.target));
      this.dispatchEvent(new CustomEvent('estudiante-confirmado', {
        detail: datos,
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define('form-estudiante', FormEstudiante);