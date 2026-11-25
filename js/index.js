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
  console.log(examenElegido, e.detail);
});