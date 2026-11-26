import { cerrarSesion } from '../servicios/autentificaciones.js';

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="css/componentes.css">
      <nav aria-label="Principal">
        <a href="usuarios.html">Usuarios</a>
        <a href="examenes.html">Exámenes</a>
        <button type="button" id="salir">Cerrar sesión</button>
      </nav>
    `;

    this.shadowRoot.querySelector('#salir').addEventListener('click', () => {
      cerrarSesion();
      window.location.href = 'login.html';
    });
  }
}

customElements.define('app-navbar', Navbar);