// el componente para crear el formulario de usuarios
class FormUsuario extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // con esto se crea la zona aislada del shadow DOM y permite entrar con
    this.idEditando = null;
}  

  connectedCallback() { // se escribe el formulario dentro del shadow DOM
    this.shadowRoot.innerHTML = `
    <form>
        <div class="elemento">
            <label for="identificacion"> Identificacion </label>
            <input type="text" name="identificacion" id="identificacion" required>
        </div>
        <div class="elemento">
            <label for="nombre"> Nombre Completo </label>
            <input type="text" name="nombre" id="nombre" required>
        </div>
        <div class="elemento">
            <label for="correo"> Correo Electronico </label>
            <input type="email" name="email" id="correo" required>
        </div>
        <div class="elemento">
            <label for="telefono"> Numero de Celular </label>
            <input type="tel" name="telefono" id="telefono" required>
        </div>
        <div class="elemento">
            <label for="password"> Contraseña </label>
            <input type="password" name="password" id="password" required>
        </div>
        <div class="elemento">
            <label for="cargo" > Cargo </label>
            <select id="cargo" name="cargo" required>                
                <option value="administrador"> Administrador </option> 
                <option value="docente"> Docente </option> 
            </select>                
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
        // si hay un usuario nuevo avisa y envia sus datos
        this.dispatchEvent(new CustomEvent('usuario-guardado', {
        detail: datos,
        bubbles: true, // sube por la pagina
        composed: true //permite que salga de shadow
        }));
        formulario.reset(); //limpia los datos despues de guardar
        this.idEditando = null;
    });
        
    }    
    // llenado del formulario editado
    cargar(usuario) {
    this.idEditando = usuario.id;
    this.shadowRoot.querySelector('#identificacion').value = usuario.identificacion;
    this.shadowRoot.querySelector('#nombre').value = usuario.nombre;
    this.shadowRoot.querySelector('#correo').value = usuario.email;
    this.shadowRoot.querySelector('#telefono').value = usuario.telefono;
    this.shadowRoot.querySelector('#password').value = usuario.password;
    this.shadowRoot.querySelector('#cargo').value = usuario.cargo;
}
  }

// Registra la clase form-usuario
customElements.define('form-usuario', FormUsuario);