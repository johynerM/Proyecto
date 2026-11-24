// el componente para crear el formulario de examenes
class FormExamen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // con esto se crea la zona aislada del shadow DOM y permite entrar con
    this.idEditando = null;
}  

  connectedCallback() { // se escribe el formulario dentro del shadow DOM
    this.shadowRoot.innerHTML = `
    <form>
        <div class="elemento">
            <label for="codigo">Código</label>
            <input type="text" name="codigo" id="codigo" required>
        </div>
        <div class="elemento">
            <label for="titulo">Titulo</label>
            <input type="text" name="titulo" id="titulo" required>
        </div>
        <div class="elemento">
            <label for="tiempo">Tiempo</label>
            <input type="number" name="tiempo" id="tiempo" min="1" required>
        </div>
        <div class="elemento">
            <label for="porcentajeAprobacion"> % Porcentaje de Aprobacion </label>
            <input type="number" name="porcentajeAprobacion" id="porcentajeAprobacion" min="1" max="100" required>
        </div>
        <div class="elemento">
            <label for="descripcion">Descripción</label>
            <textarea name="descripcion" id="descripcion" required></textarea>
        </div>
        <button type="submit">Guardar</button>
    </form>
    `
    const formulario = this.shadowRoot.querySelector('form'); //dentro del shadow

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const datos = Object.fromEntries(new FormData(formulario)); //convierte los campos en objetos 
        if (this.idEditando) {
        datos.id = this.idEditando;
        }
        // si hay un examen nuevo avisa y envia sus datos
        this.dispatchEvent(new CustomEvent('examen-guardado', {
        detail: datos,
        bubbles: true, // sube por la pagina
        composed: true //permite que salga de shadow
        }));
        formulario.reset(); //limpia los datos despues de guardar
        this.idEditando = null;
    });
        
    }    
    // llenado del formulario editado
    cargar(examen) {
    this.idEditando = examen.id;
    this.shadowRoot.querySelector('#codigo').value = examen.codigo;
    this.shadowRoot.querySelector('#titulo').value = examen.titulo;
    this.shadowRoot.querySelector('#tiempo').value = examen.tiempo;
    this.shadowRoot.querySelector('#porcentajeAprobacion').value = examen.porcentajeAprobacion;
    this.shadowRoot.querySelector('#descripcion').value = examen.descripcion;
    }
  }

// Registra la clase form-examen
customElements.define('form-examen', FormExamen);