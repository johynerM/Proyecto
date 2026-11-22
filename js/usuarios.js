import { obtener, guardar } from './servicios/almacenamiento.js';

document.addEventListener('usuario-guardado', (e) => {
  const usuarios = obtener('usuarios');
  const nuevo = { id: crypto.randomUUID(), ...e.detail };
  usuarios.push(nuevo);
  guardar('usuarios', usuarios);
});