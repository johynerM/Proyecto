//  llamamos la sesion activa 
import { obtenerSesion } from "./autentificaciones.js";

// revisa si esta activo o no la sesion
const sesion = obtenerSesion();


// si no esta activa lo devuelve al login
if (!sesion) {
  window.location.href = 'login.html';
}