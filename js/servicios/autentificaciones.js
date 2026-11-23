// trae la informacion obtenida desde el localstorage con almacenamiento
import { obtener } from './almacenamiento.js';

// validaciones de correo y contraseña
export function iniciarSesion(email, password) {
  const arreglo = obtener('usuarios'); // lista de usuarios
  const usuario = arreglo.find(u => u.email === email && u.password === password);

  if (usuario) {
    sessionStorage.setItem('sesion', JSON.stringify(usuario)); // se guarda la sesion en el sesionstorage
    return usuario;
  } 
    return null;
  }

// devuelve el usuario con sesion activa o null si no esta
export function obtenerSesion(){
    const texto = sessionStorage.getItem('sesion');
    return texto ? JSON.parse(texto) : null;
};

// se cierra la sesion y borra el dato guardado
export function cerrarSesion(){
    sessionStorage.removeItem('sesion');
}
