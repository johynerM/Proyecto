# Plataforma para exámenes – Acme School

Plataforma web para que los estudiantes presenten exámenes en línea y para que el personal administre usuarios y exámenes. Proyecto individual del skill de JavaScript.

> Autor: _Martinez Cepeda Johyner Steven_ · Repositorio: `ProyectoAcmeschool_JavaScript_MartinezJohyner`

## Tecnologías

- HTML, CSS y JavaScript puro (sin frameworks)
- JavaScript modularizado (`type="module"`)
- Web Components con Shadow DOM
- Datos en JSON usando `localStorage` y `sessionStorage`
- Diseño responsive y accesible

## Cómo ejecutarlo

1. Abrir la carpeta del proyecto en VS Code.
2. Iniciar **Live Server** (puerto 5500).
3. Abrir `http://127.0.0.1:5500/index.html`.

Los módulos se cargan como módulos ES, por eso **no funcionan abriendo el archivo con doble clic**: se necesita un servidor local.

### Acceso de administrador

Al abrir `login.html` por primera vez, si no hay usuarios se crea uno inicial:

| Correo | Contraseña |
| --- | --- |
| andgil@acme.edu | 4321 |

## Módulos

| Módulo | Página | Acceso |
| --- | --- | --- |
| Login | `login.html` | Público (entrada a los módulos privados) |
| Gestión de usuarios | `usuarios.html` | Privado (requiere sesión) |
| Gestión de exámenes | `examenes.html` | Privado (requiere sesión) |
| Resolución de exámenes | `index.html` | Público (sin login) |

### 1. Login
Correo y contraseña. Al iniciar sesión se guarda una copia del usuario en `sessionStorage`.

### 2. Gestión de usuarios
CRUD con identificación, nombre completo, correo, teléfono, cargo (administrador o docente) y contraseña. Valida que no se repitan el correo ni la identificación.

### 3. Gestión de exámenes
CRUD con código, título, tiempo (minutos), porcentaje de aprobación y descripción. Cada examen tiene preguntas y cada pregunta varias respuestas, con **una sola correcta**. Se pueden agregar, editar y eliminar preguntas, y no se permiten respuestas repetidas dentro de una misma pregunta.

### 4. Resolución de exámenes
1. Lista de exámenes (título, tiempo y % de aprobación). El botón *Presentar* queda deshabilitado si el examen no tiene preguntas.
2. El estudiante ingresa identificación y nombre completo (con opción de volver a la lista).
3. Examen con encabezado, preguntas enumeradas, una sola respuesta por pregunta, reloj en tiempo real y barra de progreso del tiempo.
4. Al terminar (o al llegar el reloj a 0) se muestra el porcentaje de aciertos y el mensaje de aprobado o no aprobado. El resultado se guarda en `localStorage`.

## Estructura

```
Proyecto/
├── index.html
├── login.html
├── usuarios.html
├── examenes.html
├── datos.json            (ejemplo de la estructura de datos)
├── css/
│   ├── style.css         (variables, fuentes y reglas base de la página)
│   └── componentes.css   (estilos de los Web Components)
└── js/
    ├── login.js, usuarios.js, examenes.js, index.js
    ├── servicios/
    │   ├── almacenamiento.js
    │   ├── autentificaciones.js
    │   └── protecciones.js
    └── components/
        ├── navbar.js, form-usuario.js, tabla-usuarios.js
        ├── form-examenes.js, tabla-examenes.js, editor-preguntas.js
        └── lista-examenes.js, form-estudiante.js,
            examen-iniciador.js, resultado-examen.js
```

## Arquitectura

- **Los componentes solo dibujan y avisan.** Son Web Components (Shadow DOM abierto) que emiten `CustomEvent` con `bubbles` y `composed` en `true`. No tocan `localStorage` (única excepción: `<app-navbar>` llama a `cerrarSesion()`).
- **El archivo de cada página decide.** `usuarios.js`, `examenes.js` e `index.js` escuchan los eventos en `document`, validan, guardan con `obtener` y `guardar`, y vuelven a dibujar.
- **Servicios compartidos:**
  - `almacenamiento.js`: `obtener(clave)` devuelve el arreglo (o `[]`) y `guardar(clave, datos)`.
  - `autentificaciones.js`: `iniciarSesion`, `obtenerSesion`, `cerrarSesion`.
  - `protecciones.js`: redirige a `login.html` si no hay sesión (se usa en `usuarios.html` y `examenes.html`, no en `index.html`).
- **Flujo del módulo público:** `index.html` cambia de pantalla con el atributo `hidden` (`#paso-datos`, `#paso-examen`, `#paso-resultado`).

### Eventos principales

| Componente | Eventos |
| --- | --- |
| `form-usuario` | `usuario-guardado` |
| `tabla-usuarios` | `usuario-editar`, `usuario-eliminar` |
| `form-examenes` | `examen-guardado` |
| `tabla-examenes` | `examen-editar`, `examen-eliminar`, `examen-preguntas` |
| `editor-preguntas` | `pregunta-guardada`, `pregunta-eliminar` |
| `lista-examenes` | `examen-elegido` |
| `form-estudiante` | `estudiante-confirmado`, `volver-lista` |
| `exam-runner` | `examen-terminado` |


## Diseño

- Paleta **Índigo y Coral**: base `#312E81`, acento `#F43F5E`, fondo `#F8FAFC`.
- Fuentes: *Bricolage Grotesque* (títulos) y *Public Sans* (texto).
- Variables CSS en `:root` de `style.css`, que los Web Components heredan.
- Botones normales en índigo con letra blanca; el coral se usa solo como acento y en el botón principal grande ("Terminar"), por contraste.
- Animaciones: entrada suave entre pantallas, transiciones en botones y campos, parpadeo del reloj en el último minuto y barra de tiempo.

## Accesibilidad

- Etiquetas `label` asociadas a cada campo y `aria-label` en radios y respuestas.
- Foco visible (`:focus-visible`) en enlaces, botones y campos.
- Reloj con `role="timer"` y aviso único a lectores de pantalla cuando falta un minuto.
- Resultado anunciado con `aria-live="polite"`.
- Respeta `prefers-reduced-motion`.
- Diseño responsive con `@media` para pantallas pequeñas.

## Limitaciones conocidas

Es un proyecto académico, por eso:

- **Las contraseñas se guardan en texto plano** en `localStorage`. En un sistema real deben guardarse con hash en un servidor.
- **Las respuestas correctas son visibles** en el Local Storage, así que un estudiante con conocimientos técnicos podría verlas.
- **El reloj se reinicia si se recarga la página** durante un examen.
- Los datos viven solo en el navegador: no se comparten entre equipos y se pierden si se borra el almacenamiento.
- La protección de rutas es solo del lado del cliente.