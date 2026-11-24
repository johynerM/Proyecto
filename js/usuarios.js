// lee las funciones de obtener y guardar
import { obtener, guardar } from './servicios/almacenamiento.js';
import { obtenerSesion } from './servicios/autentificaciones.js';

// cuando el formulario avisa que hay un usuario nuevo
document.addEventListener('usuario-guardado', (e) => {
    const datos = e.detail;
    const usuarios = obtener('usuarios');
    // revisa si ya alguien tiene ese correo o identificacion
    const existe = usuarios.some(u => u.id !== datos.id && (u.email === datos.email || u.identificacion === datos.identificacion));
    if (existe) {
        return;
    }
    if (datos.id) {
    const actualizados = usuarios.map(u => u.id === datos.id ? { ...u, ...datos } : u);
    guardar('usuarios', actualizados);
    tabla.render(actualizados);
    return;
    }
    const nuevo = { id: crypto.randomUUID(), ...datos };
    usuarios.push(nuevo);//agrega el usuario a la lista 
    guardar('usuarios', usuarios); // actualiza la lista
    tabla.render(usuarios);
    
});

const tabla = document.querySelector('tabla-usuarios');

tabla.render(obtener('usuarios'))

document.addEventListener('usuario-eliminar', (e) => {
    const sesion = obtenerSesion();

    if (sesion.id === e.detail) {
        alert('No puedes eliminar el usuario con el que iniciaste sesión');
        return;
    }
    if (!confirm('¿Eliminar este usuario?')) {
        return;
    }
    const usuarios = obtener('usuarios');
    const filtrados = usuarios.filter(u => u.id !== e.detail);
    guardar('usuarios', filtrados);
    tabla.render(filtrados);
    
});

document.addEventListener('usuario-editar', (e) => {
    const usuario = obtener('usuarios').find(u => u.id === e.detail);
    document.querySelector('form-usuario').cargar(usuario);
});