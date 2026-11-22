import { obtener, guardar } from './servicios/almacenamiento.js';

document.addEventListener('usuario-guardado', (e) => {
    const usuarios = obtener('usuarios');
    const nuevo = { id: crypto.randomUUID(), ...e.detail };
    const existe = usuarios.some(u => u.email === nuevo.email || u.identificacion === nuevo.identificacion);
    if (existe) {
        return;
    }
    usuarios.push(nuevo);
    guardar('usuarios', usuarios);
});