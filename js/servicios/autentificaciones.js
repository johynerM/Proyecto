import { obtener } from './almacenamiento.js';

export function iniciarSesion(email, password) {
  const arreglo = obtener('usuarios');
  const usuario = arreglo.find(u => u.email === email && u.password === password);

  if (usuario) {
    sessionStorage.setItem('sesion', JSON.stringify(usuario));
    return usuario;
  } 
    return null;
  }
