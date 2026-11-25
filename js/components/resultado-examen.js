class ResultadoExamen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  mostrar(r) {
    this.shadowRoot.innerHTML = `
      <section aria-live="polite">
        <h2>Resultado: ${r.titulo}</h2>
        <p>${r.nombre} · ${r.identificacion}</p>
        <p>Aciertos: ${r.aciertos} de ${r.total}</p>
        <p>Porcentaje: ${r.porcentaje}%</p>
        <p>${ r.aprobado ? 'Aprobado por chayanne' : 'Cagaste bien feo manito/a' }</p>
        <button type="button" id="volver">Volver al inicio</button>
      </section>
    `;

    this.shadowRoot.querySelector('#volver').addEventListener('click', () => {
      window.location.reload();
    });
  }
}

customElements.define('resultado-examen', ResultadoExamen);