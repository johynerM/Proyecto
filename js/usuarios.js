// lee las funciones de obtener y guardar
import { obtener, guardar } from './servicios/almacenamiento.js';
import { obtenerSesion } from './servicios/autentificaciones.js';
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
    tabla.render(usuarios);
});

const tabla = document.querySelector('tabla-usuarios');

tabla.render(obtener('usuarios'))

document.addEventListener('usuario-eliminar', (e) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    const usuarios = obtener('usuarios');
    const filtrados = usuarios.filter(u => u.id !== e.detail);
    guardar('usuarios', filtrados);
    tabla.render(filtrados);
    if (e.detail=== obtenerSesion('id')) {
        return
    }
});