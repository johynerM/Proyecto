import { obtener } from "./servicios/almacenamiento.js";

const lista = document.querySelector('lista-examenes');
lista.render(obtener('examenes'));

document.addEventListener('examen-elegido', (e) => {
  console.log(e.detail);
});