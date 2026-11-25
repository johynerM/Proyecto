import { obtener, guardar } from "./servicios/almacenamiento.js";

let examenElegido = null;

const lista = document.querySelector('lista-examenes');
lista.render(obtener('examenes'));

document.addEventListener('examen-elegido', (e) => {
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
    const elegida = respuestas[p.id]; // id de la respuesta que marcó el estudiante
    const respuesta = p.respuestas.find(r => r.id === elegida);
    if (respuesta && respuesta.correcta) {
      aciertos++;
    }
  });

  const total = examen.preguntas.length;
  const porcentaje = total === 0 ? 0 : Math.round((aciertos / total) * 100);
  const aprobado = porcentaje >= examen.porcentajeAprobacion;

  const resultado = {
    id: crypto.randomUUID(),
    identificacion: estudiante.identificacion,
    nombre: estudiante.nombre,
    examenId: examen.id,
    titulo: examen.titulo,
    respuestas,
    aciertos,
    total,
    porcentaje,
    aprobado,
    fecha: new Date().toISOString()
  };

  const resultados = obtener('resultados');
  resultados.push(resultado);
  guardar('resultados', resultados);


  document.querySelector('#paso-examen').hidden = true;
  document.querySelector('#paso-resultado').hidden = false;
  document.querySelector('resultado-examen').mostrar(resultado);
});