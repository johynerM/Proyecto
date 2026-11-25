import { obtener, guardar } from "./servicios/almacenamiento.js";

let examenElegido = null;

const lista = document.querySelector('lista-examenes');
lista.render(obtener('examenes'));

document.addEventListener('examen-elegido', (e) => {
  console.log(e.detail);
  examenElegido = e.detail;
  lista.hidden = true;
  document.getElementById('paso-datos').hidden = false;
});

document.addEventListener('estudiante-confirmado', (e) => {
  const examen = obtener('examenes').find(ex => ex.id === examenElegido);

  document.getElementById('paso-datos').hidden = true;   // oculta el formulario
  document.getElementById('paso-examen').hidden = false; // muestra el examen
  document.querySelector('exam-runner').iniciar(examen, e.detail);
});

document.addEventListener('examen-terminado', (e) => {
  const { examen, estudiante, respuestas } = e.detail;

  let aciertos = 0;
  examen.preguntas.forEach(p => {
    const elegida = p.respuestas.find(r => r.id === respuestas[p.id]);
    if (elegida && elegida.correcta) {
      aciertos++;
    }
  });

  const porcentaje = Math.round(aciertos / examen.preguntas.length * 100);
  const aprobado = porcentaje >= examen.porcentajeAprobacion;

  const resultado = {
    id: crypto.randomUUID(),
    identificacion: estudiante.identificacion,
    nombre: estudiante.nombre,
    examenId: examen.id,
    titulo: examen.titulo,
    respuestas: respuestas,
    aciertos: aciertos,
    total: examen.preguntas.length,
    porcentaje: porcentaje,
    aprobado: aprobado,
    fecha: new Date().toISOString()
  };

  const resultados = obtener('resultados');
  resultados.push(resultado);
  guardar('resultados', resultados);

  document.getElementById('paso-examen').hidden = true;
  document.getElementById('paso-resultado').hidden = false;
  document.querySelector('resultado-examen').mostrar(resultado);
});
