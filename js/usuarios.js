// lee las funciones de obtener y guardar
import { obtener, guardar } from './servicios/almacenamiento.js';
import { obtenerSesion } from './servicios/autentificaciones.js';

const tabla = document.querySelector('tabla-usuarios');

// dibuja los usuarios guardados al cargar la pagina
tabla.render(obtener('usuarios'))

// cuando el formulario avisa que hay un usuario nuevo
document.addEventListener('usuario-guardado', (e) => {
    const datos = e.detail;
    const usuarios = obtener('usuarios');
    
    // revisa si ya alguien tiene ese correo o identificacion
    const existe = usuarios.some(u => u.id !== datos.id && (u.email === datos.email || u.identificacion === datos.identificacion));
    if (existe) {
         alert('Ya existe un usuario con ese código');
        return;
    }
    // reemplaza por los usuarios editados 
    if (datos.id) {
    const actualizados = usuarios.map(u => u.id === datos.id ? { ...u, ...datos } : u);
    guardar('usuarios', actualizados);
    tabla.render(actualizados);
    return;
    }
    // genera los usuarios nuevos 
    const nuevo = { id: crypto.randomUUID(), ...datos };
    usuarios.push(nuevo);//agrega el usuario a la lista 
    guardar('usuarios', usuarios); // actualiza la lista
    tabla.render(usuarios);
    
})

// eliminar usuario
document.addEventListener('usuario-eliminar', (e) => {
    const sesion = obtenerSesion();

    // bloquea eliminar el usuario activo en el momento
    if (sesion.id === e.detail) {
        alert('No puedes eliminar el usuario con el que iniciaste sesión');
        return;
    } // pregunta antes de eliminar para confirmar la accion
    if (!confirm('¿Eliminar este usuario?')) {
        return;
    }
    // actualiza la tabla
    const usuarios = obtener('usuarios');
    const filtrados = usuarios.filter(u => u.id !== e.detail);
    guardar('usuarios', filtrados);
    tabla.render(filtrados);
    
});

// avisa que se quiere editar un usuario
document.addEventListener('usuario-editar', (e) => {
    const usuario = obtener('usuarios').find(u => u.id === e.detail); //encuentra al usuario
    document.querySelector('form-usuario').cargar(usuario); // carga el usuario
});