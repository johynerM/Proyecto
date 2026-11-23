class TablaUsuarios extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render([]);
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
    <td><button>Actualizar</button>
    <button>Eliminar</button>  </td>
  </tr>
`).join('')}
        </tbody>
      </table>
    `;
    }
}

customElements.define('tabla-usuarios', TablaUsuarios);