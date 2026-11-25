import { obtener } from "./servicios/almacenamiento.js";

let examenElegido =null;

const lista = document.querySelector('lista-examenes');
lista.render(obtener('examenes'));

document.addEventListener('examen-elegido', (e) => {
  console.log(e.detail);
  examenElegido = e.detail;
  lista.hidden=true;
  document.getElementById('paso-datos').hidden = false;
});

document.addEventListener('estudiante-confirmado', (e) => {
  const examen = obtener('examenes').find(ex => ex.id === examenElegido);

  document.getElementById('paso-datos').hidden = true;   // oculta el formulario
  document.getElementById('paso-examen').hidden = false; // muestra el examen
  document.querySelector('exam-runner').iniciar(examen, e.detail);
});

document.addEventListener('examen-terminado', (e) => {
  console.log(e.detail);
});