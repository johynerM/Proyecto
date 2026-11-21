class FormUsuario extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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
            <input type="email" name="email " id="correo" required>
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
                <option value="administrativo"> Administrativo </option> 
                <option value="docente"> Docente </option> 
            </select>                
        </div>
        <button type="submit">Guardar</button>
    </form>
    `;
  }
}

customElements.define('form-usuario', FormUsuario);