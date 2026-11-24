class TablaUsuarios extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
    connectedCallback() {
      this.render([]);
      this.shadowRoot.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const accion = e.target.dataset.accion;
        if (accion === 'actualizar') {
          this.dispatchEvent(new CustomEvent('usuario-editar', { detail: id, bubbles: true, composed: true }));
        }
        if (accion === 'eliminar') {
          this.dispatchEvent(new CustomEvent('usuario-eliminar', { detail: id, bubbles: true, composed: true }));
        }
      });
    }
    render(usuarios) {
      this.shadowRoot.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>identificacion</th>
            <th>nombre</th>
            <th>email</th>
            <th>cargo</th>
            <th>telefono</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          ${usuarios.map(u => `
  <tr>
    <td>${u.identificacion}</td>
    <td>${u.nombre}</td>
    <td>${u.email}</td>
    <td>${u.cargo}</td>
    <td>${u.telefono}</td>  
    <td><button data-id="${u.id}" data-accion="actualizar">Actualizar</button>
    <button data-id="${u.id}" data-accion="eliminar">Eliminar</button>  </td>
  </tr>
`).join('')}
        </tbody>
      </table>
    `;
    }
  }

customElements.define('tabla-usuarios', TablaUsuarios);