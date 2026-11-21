import { obtenerSesion } from "./autentificaciones.js";

const sesion = obtenerSesion();

if (!sesion) {
  window.location.href = 'login.html';
}