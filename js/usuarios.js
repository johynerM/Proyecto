// lee las funciones de obtener y guardar
import { obtener, guardar } from './servicios/almacenamiento.js';

// cuando el formulario avisa que hay un usuario nuevo
document.addEventListener('usuario-guardado', (e) => {
    const usuarios = obtener('usuarios');
    const nuevo = { id: crypto.randomUUID(), ...e.detail };
    // revisa si ya alguien tiene ese correo o identificacion
    const existe = usuarios.some(u => u.email === nuevo.email || u.identificacion === nuevo.identificacion);
    if (existe) {
        return;
    }
    usuarios.push(nuevo); //agrega el usuario a la lista 
    guardar('usuarios', usuarios); // actualiza la lista
});

const tabla = document.querySelector('tabla-usuarios');

tabla.render(obtener('usuarios'))