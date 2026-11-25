// lee las funciones de obtener y guardar
import { obtener, guardar } from './servicios/almacenamiento.js';

const tabla = document.querySelector('tabla-examenes');

// dibuja los examenes guardados al cargar la pagina
tabla.render(obtener('examenes'))

// cuando el formulario avisa que hay un examen nuevo
document.addEventListener('examen-guardado', (e) => {
    const datos = e.detail;
    datos.tiempo = Number(datos.tiempo);
    datos.porcentajeAprobacion = Number(datos.porcentajeAprobacion);
    const examenes = obtener('examenes');

    // revisa si ya existe un examen con ese código
    const existe = examenes.some(ex => ex.id !== datos.id && ex.codigo === datos.codigo);
    if (existe) {
        alert('Ya existe un examen con ese código');
        return;
    }
    // reemplaza por los examenes editados 
    if (datos.id) {
        const actualizados = examenes.map(ex => ex.id === datos.id ? { ...ex, ...datos } : ex);
        guardar('examenes', actualizados);
        tabla.render(actualizados);
        const editor = document.querySelector('editor-preguntas');
        if (editor.examenActual && editor.examenActual.id === datos.id) {
            editor.mostrar(actualizados.find(ex => ex.id === datos.id));
        }
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
    const editor = document.querySelector('editor-preguntas');
    if (editor.examenActual && editor.examenActual.id === e.detail) {
        editor.limpiar();
    }
});

// avisa que se quiere editar un examen
document.addEventListener('examen-editar', (e) => {
    const examen = obtener('examenes').find(ex => ex.id === e.detail); //encuentra al examen
    document.querySelector('form-examen').cargar(examen); // carga el examen
});

document.addEventListener('examen-preguntas', (e) => {
    const examen = obtener('examenes').find(ex => ex.id === e.detail);
    document.querySelector('editor-preguntas').mostrar(examen);
});
document.addEventListener('pregunta-guardada', (e) => {
    const { examenId, pregunta } = e.detail;
    const examenes = obtener('examenes');

    const actualizados = examenes.map(ex =>
        ex.id === examenId ? { ...ex, preguntas: [...ex.preguntas, pregunta] } : ex
    );

    guardar('examenes', actualizados);

    const examen = actualizados.find(ex => ex.id === examenId);
    document.querySelector('editor-preguntas').mostrar(examen);
});

document.addEventListener('pregunta-eliminar', (e) => {
    const { examenId, preguntaId } = e.detail;

    if (!confirm('¿Eliminar esta pregunta?')) {
        return;
    }

    const examenes = obtener('examenes');
    const actualizados = examenes.map(ex =>
        ex.id === examenId
            ? { ...ex, preguntas: ex.preguntas.filter(p => p.id !== preguntaId) }
            : ex
    );

    guardar('examenes', actualizados);

    const examen = actualizados.find(ex => ex.id === examenId);
    document.querySelector('editor-preguntas').mostrar(examen);
});