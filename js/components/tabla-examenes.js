// creacion de la clase tabla-examen
class TablaExamen extends HTMLElement {
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
          this.dispatchEvent(new CustomEvent('examen-editar', { detail: id, bubbles: true, composed: true }));
        }
        if (accion === 'eliminar') {
          this.dispatchEvent(new CustomEvent('examen-eliminar', { detail: id, bubbles: true, composed: true }));
        }
        if (accion === 'preguntas') {
          this.dispatchEvent(new CustomEvent('examen-preguntas', { detail: id, bubbles: true, composed: true }));
        }
      });
    }
    // creacion de la tabla de examen recibidos
    render(examen) {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/componentes.css">
      <div class="tabla-scroll">
      <table class="tabla">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Titulo</th>
            <th>Tiempo</th>
            <th>Aprobacion</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          ${examen.map(ex => `
  <tr>
    <td>${ex.codigo}</td>
    <td>${ex.titulo}</td>
    <td>${ex.tiempo} min</td>
    <td>${ex.porcentajeAprobacion}%</td>
    <td>
      <button class="btn-editar" data-id="${ex.id}" data-accion="actualizar">Actualizar</button>
      <button class="btn-eliminar" data-id="${ex.id}" data-accion="eliminar">Eliminar</button>
      <button data-id="${ex.id}" y data-accion="preguntas"> Preguntas </button>  
    </td>
  </tr>
`).join('')}
        </tbody>
      </table>
    </div>
    `;
    }
  }

customElements.define('tabla-examenes', TablaExamen);