// creacion de la clase tabla-usuario
class TablaUsuarios extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
    connectedCallback() {
      this.render([]);
      // listener de las acciones de los botones 
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
    // creacion de la tabla de usuarios recibidos
    render(usuarios) {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/componentes.css">
      <div class="tabla-scroll">
      <table class="tabla">
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
    <td>
      <div class="acciones">
        <button class="btn-editar" data-id="${u.id}" data-accion="actualizar">Actualizar</button>
        <button class="btn-eliminar" data-id="${u.id}" data-accion="eliminar">Eliminar</button>  
      </div>
    </td>
  </tr>
  
`).join('')}
        </tbody>
      </table>
      </div>
    `;
    }
  }

customElements.define('tabla-usuarios', TablaUsuarios);