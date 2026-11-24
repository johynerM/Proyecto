// lee las funciones de obtener y guardar
import { obtener, guardar } from './servicios/almacenamiento.js';
import { obtenerSesion } from './servicios/autentificaciones.js';

const tabla = document.querySelector('tabla-examenes');

// dibuja los examenes guardados al cargar la pagina
tabla.render(obtener('examenes'))

// cuando el formulario avisa que hay un examen nuevo
document.addEventListener('examen-guardado', (e) => {
    const datos = e.detail;
    datos.tiempo= Number(datos.tiempo);
    datos.porcentajeAprobacion = Number(datos.porcentajeAprobacion);
    const examenes = obtener('examenes');
    
    // revisa si ya alguien tiene ese correo o identificacion
    const existe = examenes.some(ex => ex.id !== datos.id && ex.codigo === datos.codigo);
        if (existe) {
        alert('Ya existe un examen con ese código');
        return;
    }
    // reemplaza por los examenes editados 
    if (datos.id) {
    const actualizados = examenes.map(u => ex.id === datos.id ? { ...u, ...datos } : u);
    guardar('examenes', actualizados);
    tabla.render(actualizados);
    return;
    }
    // genera los examenes nuevos 
    const nuevo = { id: crypto.randomUUID(), ...datos, preguntas: [] };
    
    examenes.push(nuevo);//agrega el examen a la lista 
    guardar('examenes', examenes); // actualiza la lista
    tabla.render(examenes);
    
})

// eliminar examen
document.addEventListener('examen-eliminar', (e) => {

    // pregunta antes de eliminar para confirmar la accion
    if (!confirm('¿Eliminar este examen?')) {
        return;
    }
    // actualiza la tabla
    const examenes = obtener('examenes');
    const filtrados = examenes.filter(ex => ex.id !== e.detail);
    guardar('examenes', filtrados);
    tabla.render(filtrados);
    
});

// avisa que se quiere editar un examen
document.addEventListener('examen-editar', (e) => {
    const examen = obtener('examenes').find(ex => ex.id === e.detail); //encuentra al examen
    document.querySelector('form-examen').cargar(examen); // carga el examen
});